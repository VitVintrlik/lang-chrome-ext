import React from 'react';
import { createRoot } from 'react-dom/client';

function Options() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Netflix Subtitle Translator Settings</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Translation Settings</h3>
        <label>
          Target Language:
          <select style={{ marginLeft: '10px', padding: '5px' }}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Display Options</h3>
        <label>
          <input type="checkbox" defaultChecked />
          Show original subtitle alongside translation
        </label>
      </div>

      <button 
        onClick={() => console.log('Settings saved')}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#e50914', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Save Settings
      </button>
    </div>
  );
}

const container = document.getElementById('options-root');
if (container) {
  const root = createRoot(container);
  root.render(<Options />);
}