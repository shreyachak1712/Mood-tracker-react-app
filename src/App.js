import React, { useState, useEffect } from 'react';
import MoodSelector from './components/MoodSelector';
import JournalEntry from './components/JournalEntry';
import EntryList from './components/EntryList';
import MoodChart from './components/MoodChart';
import './App.css';

function App() {
  const [mood, setMood] = useState('');
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState('');
  const [filterMood, setFilterMood] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Load entries & draft from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('journalEntries');
    if (saved) setEntries(JSON.parse(saved));

    const draft = localStorage.getItem('draft');
    if (draft) {
      const { mood: savedMood, entry: savedEntry } = JSON.parse(draft);
      setMood(savedMood || '');
      setEntry(savedEntry || '');
    }

    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') setDarkMode(true);
  }, []);

  // Save draft
  useEffect(() => {
    localStorage.setItem('draft', JSON.stringify({ mood, entry }));
  }, [mood, entry]);

  // Apply dark mode class on body
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleSubmit = () => {
    if (!mood || !entry) return;

    if (editingId) {
      const updated = entries.map(e =>
        e.id === editingId ? { ...e, mood, entry, date: new Date().toLocaleString() } : e
      );
      setEntries(updated);
      localStorage.setItem('journalEntries', JSON.stringify(updated));
      setEditingId(null);
    } else {
      const newEntry = {
        id: Date.now(),
        mood,
        entry,
        date: new Date().toLocaleString(),
      };
      const updated = [newEntry, ...entries];
      setEntries(updated);
      localStorage.setItem('journalEntries', JSON.stringify(updated));
    }

    setMood('');
    setEntry('');
    localStorage.removeItem('draft');
  };

  const handleDelete = (id) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem('journalEntries', JSON.stringify(updated));
  };

  const handleEdit = (entryObj) => {
    setMood(entryObj.mood);
    setEntry(entryObj.entry);
    setEditingId(entryObj.id);
  };

  const filteredEntries = entries.filter((e) =>
    (filterMood ? e.mood === filterMood : true) &&
    (search ? e.entry.toLowerCase().includes(search.toLowerCase()) : true)
  );

  return (
    <div className="container">
      <button onClick={() => setDarkMode(!darkMode)} className="mode-toggle">
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <h1>Mood Journal</h1>

      <MoodSelector selectedMood={mood} onMoodSelect={setMood} />
      <JournalEntry entry={entry} onChange={setEntry} />
      <button onClick={handleSubmit}>{editingId ? 'Update Entry' : 'Save Entry'}</button>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search entries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setFilterMood(e.target.value)} value={filterMood}>
          <option value="">All Moods</option>
          <option value="😊">😊</option>
          <option value="😢">😢</option>
          <option value="😠">😠</option>
          <option value="😴">😴</option>
          <option value="😕">😕</option>
        </select>
      </div>

      <EntryList entries={filteredEntries} onDelete={handleDelete} onEdit={handleEdit} />
      <MoodChart entries={entries} />
    </div>
  );
}

export default App;
