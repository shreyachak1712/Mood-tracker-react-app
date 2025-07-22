import React from 'react';

function EntryList({ entries, onDelete, onEdit }) {
  return (
    <div>
      <h3>Past Entries:</h3>
      {entries.length === 0 && <p>No entries yet.</p>}
      <ul>
        {entries.map((e) => (
          <li key={e.id} className="entry">
            <div>
              <p>
                <strong>{e.mood}</strong> - {e.entry}
              </p>
              <small>{e.date}</small>
            </div>
            <div className="actions">
              <button className="edit" onClick={() => onEdit(e)}>✏️</button>
              <button className="delete" onClick={() => onDelete(e.id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EntryList;
