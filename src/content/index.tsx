import React from 'react';
import { createRoot } from 'react-dom/client';
import { getPlatform } from '../utils/subtitleDetector';
import RootOverlay from './RootOverlay';

import '../index.css';

const container = document.createElement('div');
container.id = 'subtitle-translator-overlay';
document.body.appendChild(container);

const reactRoot = createRoot(container);
reactRoot.render(<RootOverlay />);

// Detect platform and notify background
const platform = getPlatform();
console.log(`Platform detected: ${platform}`);

chrome.runtime.sendMessage({
  type: 'platform_detected',
  platform: platform,
  url: window.location.href,
});
