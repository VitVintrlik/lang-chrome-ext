// Content script entry point for Netflix
console.log('Netflix Subtitle Translator - Content script loaded');

// Basic Netflix detection
if (window.location.hostname.includes('netflix.com')) {
  console.log('Netflix detected - initializing subtitle translator');
  
  // TODO: Add subtitle detection, tooltip injection, etc.
  
  // Basic message to background
  chrome.runtime.sendMessage({ 
    type: 'netflix_detected',
    url: window.location.href 
  });
}
