/**
 * Universal subtitle detection for any video platform
 */

export const findSubtitles = (): string | null => {
  const subtitleSelectors = [
    // Generic selectors
    '[class*="subtitle"]',
    '[class*="caption"]',
    '[class*="text-track"]',
    '[class*="cue"]',
    '[data-testid*="subtitle"]',
    '[data-testid*="caption"]',
    '[aria-label*="subtitle"]',
    '[aria-label*="caption"]',

    // Platform-specific selectors
    '.ytp-caption-segment', // YouTube
    '[data-uia*="subtitle"]', // Netflix
    '.player-caption', // Generic player
    '.video-caption', // Generic video
    '.subtitle-text', // Generic
    '.caption-text', // Generic

    // High z-index elements (subtitles are usually on top)
    '[style*="z-index"]',
  ];

  // Try each selector until we find subtitles
  for (const selector of subtitleSelectors) {
    try {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        const textContent = Array.from(elements)
          .map((el) => el.textContent?.trim())
          .filter((text) => text && text.length > 0)
          .join(' ');

        if (textContent) {
          console.log(`Found subtitles using selector: ${selector}`);
          return textContent;
        }
      }
    } catch (error) {
      console.warn(`Error with selector ${selector}:`, error);
    }
  }

  console.log('No subtitles found');
  return null;
};

export const getPlatform = (): string => {
  const hostname = window.location.hostname.toLowerCase();

  if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) return 'youtube';
  if (hostname.includes('netflix.com')) return 'netflix';
  if (hostname.includes('hulu.com')) return 'hulu';
  if (hostname.includes('disney.com')) return 'disney';
  if (hostname.includes('amazon.com')) return 'amazon';
  if (hostname.includes('vimeo.com')) return 'vimeo';
  if (hostname.includes('twitch.tv')) return 'twitch';

  return 'generic';
};

export const isVideoPaused = (): boolean => {
  const video = document.querySelector('video');
  return video ? video.paused : false;
};
