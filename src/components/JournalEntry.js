import React from 'react';

function JournalEntry({ entry, onChange }) {
  return (
    <div>
      <h3>Your Thoughts:</h3>
      <textarea
        value={entry}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write how you feel..."
      />
    </div>
  );
}

export default JournalEntry;
