import React, { useState } from 'react';
import SubtitleOverlay from '../ui/overlay/SubtitleOverlay';
import { findSubtitles, getPlatform } from '../utils/subtitleDetector';

export default function RootOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [subtitleText, setSubtitleText] = useState('');

  const showOverlay = () => {
    const subtitles = findSubtitles() || 'No subtitle text found';
    setSubtitleText(subtitles);
    setIsVisible(true);
  };

  const closeOverlay = () => setIsVisible(false);

  // Expose a function for popup messaging
  React.useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'SELECT_TEXT') {
        showOverlay();
        sendResponse({ success: true });
      }
    });
  }, []);

  return (
    <SubtitleOverlay isVisible={isVisible} subtitleText={subtitleText} onClose={closeOverlay} />
  );
}
