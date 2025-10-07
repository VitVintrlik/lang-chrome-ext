// Background script entry point
console.log('Netflix Subtitle Translator - Background script loaded');

// Basic message handling setup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);

  // TODO: Handle translation requests, storage, etc.
  sendResponse({ status: 'received' });
});

// Basic storage setup
chrome.storage.local.get(['settings'], (result) => {
  console.log('Current settings:', result.settings);
});
