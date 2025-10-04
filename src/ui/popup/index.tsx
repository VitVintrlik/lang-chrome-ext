import React from 'react';
import { createRoot } from 'react-dom/client';

function Popup() {
  return (
    <div style={{ width: '300px', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Netflix Subtitle Translator</h2>
      <p>Translate subtitles on Netflix with AI</p>
      <button
        onClick={() => console.log('Translate clicked')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#e50914',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Start Translation
      </button>
    </div>
  );
}

const container = document.getElementById('popup-root');
if (container) {
  const root = createRoot(container);
  root.render(<Popup />);
}
