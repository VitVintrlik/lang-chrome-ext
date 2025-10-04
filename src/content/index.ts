import React from 'react'
import { createRoot } from 'react-dom/client'
import SubtitleOverlay from '../ui/overlay/SubtitleOverlay'
import { findSubtitles, getPlatform, isVideoPaused } from '../utils/subtitleDetector'

// Content script entry point for video platforms
console.log('Subtitle Translator - Content script loaded');

// Initialize React overlay system
let reactRoot: any = null
let isOverlayVisible = false

const initializeOverlay = () => {
  // Create container for React component
  const container = document.createElement('div')
  container.id = 'subtitle-translator-overlay'
  document.body.appendChild(container)
  
  // Create React root
  reactRoot = createRoot(container)
  
  // Initial render
  renderOverlay()
}

const renderOverlay = () => {
  if (!reactRoot) return
  
  reactRoot.render(
    React.createElement(SubtitleOverlay, {
      isVisible: isOverlayVisible,
      subtitleText: "",
      onClose: closeOverlay
    })
  )
}

const showOverlay = () => {
  const subtitleText = findSubtitles()
  const platform = getPlatform()
  
  console.log(`Platform: ${platform}, Subtitles found:`, subtitleText)
  
  isOverlayVisible = true
  renderOverlay()
  
  // Update with actual subtitle text
  if (reactRoot) {
    reactRoot.render(
      React.createElement(SubtitleOverlay, {
        isVisible: isOverlayVisible,
        subtitleText: subtitleText || 'No subtitle text found',
        onClose: closeOverlay
      })
    )
  }
}

const closeOverlay = () => {
  isOverlayVisible = false
  renderOverlay()
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SELECT_TEXT') {
    console.log('Select text requested')
    showOverlay()
    sendResponse({ success: true })
  }
})

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeOverlay)
} else {
  initializeOverlay()
}

// Detect platform and notify background
const platform = getPlatform()
console.log(`Platform detected: ${platform}`)

chrome.runtime.sendMessage({ 
  type: 'platform_detected',
  platform: platform,
  url: window.location.href 
});
