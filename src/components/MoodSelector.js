import React from 'react';

const moods = ['😊', '😢', '😠', '😴', '😕'];

function MoodSelector({ selectedMood, onMoodSelect }) {
  return (
    <div>
      <h3>Select Your Mood:</h3>
      {moods.map((m) => (
        <button
          key={m}
          onClick={() => onMoodSelect(m)}
          style={{
            fontSize: '1.5rem',
            margin: '5px',
            backgroundColor: selectedMood === m ? '#d0f0c0' : 'white',
          }}
        >
          {m}
        </button>
      ))}
    </div>
  );
}

export default MoodSelector;
