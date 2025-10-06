import React, { useEffect, useState } from 'react';
import PageOverlay from '../ui/overlay/PageOverlay';
import { SubtitlesProvider } from '../ui/SubtitlesProvider';
import WordSelector from '../ui/WordSelector/WordSelector';

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
