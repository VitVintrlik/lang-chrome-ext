import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function Popup() {
  const [isSelecting, setIsSelecting] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    chrome.storage.local.get(['language'], (result) => {
      if (result.language) setLanguage(result.language);
    });
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    chrome.storage.local.set({ language: newLanguage });
  };

  const handleSelectText = async () => {
    try {
      setIsSelecting(true);
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!tab.id) {
        console.error('No active tab found');
        return;
      }

      const response = await chrome.tabs.sendMessage(tab.id, { type: 'SELECT_TEXT' });

      if (response?.success) {
        console.log('Select text command sent successfully');
      } else {
        console.error('Failed to send select text command');
      }
    } catch (error) {
      console.error('Error sending select text command:', error);
    } finally {
      setIsSelecting(false);
    }
  };

  return (
    <div className="w-80 p-6 font-sans">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Subtitle Translator</h2>
      <p className="text-gray-600 mb-4">Translate subtitles on any video platform with AI</p>

      <div className="mb-4">
        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
          Target Language
        </label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">English</option>
          <option value="ja">Japanese</option>
        </select>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleSelectText}
          disabled={isSelecting}
          className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
            isSelecting
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isSelecting ? 'Selecting...' : 'Select Text'}
        </button>

        <button
          onClick={() => console.log('Settings clicked')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Settings
        </button>
      </div>
    </div>
  );
}

const container = document.getElementById('popup-root');
if (container) {
  const root = createRoot(container);
  root.render(<Popup />);
}
