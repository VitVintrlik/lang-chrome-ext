import React, { useEffect, useState } from 'react';
import { SubtitlesProvider } from './SubtitlesProvider';
import PageOverlay from './overlay/PageOverlay';
import WordSelector from './WordSelector/WordSelector';

export default function RootOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  const showOverlay = () => {
    setIsVisible(true);
  };

  const closeOverlay = () => setIsVisible(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'SELECT_TEXT') {
        showOverlay();
        sendResponse({ success: true });
      }
    });
  }, []);

  console.log('isVisible', isVisible);

  return isVisible ? (
    <SubtitlesProvider>
      <PageOverlay onClose={closeOverlay}>
        <WordSelector />
      </PageOverlay>
    </SubtitlesProvider>
  ) : null;
}
