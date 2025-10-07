import React from 'react';
import { createRoot } from 'react-dom/client';
import RootOverlay from '../../ui';

import '../../styles/index.css';

const container = document.createElement('div');
container.id = 'subtitle-translator-overlay';
document.body.appendChild(container);

const reactRoot = createRoot(container);
reactRoot.render(<RootOverlay />);

console.log('Content script loaded - development mode');
