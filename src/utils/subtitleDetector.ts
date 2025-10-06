import { detectPlatform, Platform } from './platformDetector';

export const PLATFORM_SELECTORS: Record<Platform, string[]> = {
  [Platform.YOUTUBE]: ['.ytp-caption-segment', '.caption-window', '.ytp-caption-window-container'],
  [Platform.NETFLIX]: [
    '.player-timedtext-text-container',
    '.player-timedtext span',
    '[class*="timedtext"]',
  ],
  [Platform.HBO]: ['.bitmovin-ui-subtitle-label', '[class*="subtitle"]'],
  [Platform.DISNEY]: ['.dss-subtitle-renderer-cue', '[class*="subtitle"]'],
  [Platform.PRIME]: ['.atvwebplayersdk-captions-text', '[class*="caption"]'],
  [Platform.HULU]: ['.caption-text-window', '[class*="caption"]'],
  [Platform.UNKNOWN]: [],
};

function findSubtitleElement() {
  const platform = detectPlatform();

  if (platform && PLATFORM_SELECTORS[platform]) {
    for (const selector of PLATFORM_SELECTORS[platform]) {
      const el = document.querySelector(selector);
      if (el && isValidSubtitleElement(el)) {
        return el;
      }
    }
  }

  //TODO fallback to heuristic analysis if no platform-specific selector matched
}

function isValidSubtitleElement(el: Element) {
  if (!el) return false;

  // Must be visible
  const style = window.getComputedStyle(el);
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
    return false;
  }

  // Check if it contains text (directly or in children)
  const hasText = el.textContent && el.textContent.trim().length > 0;

  // Check positioning (subtitles are usually absolutely/fixed positioned)
  const isPositioned = ['absolute', 'fixed'].includes(style.position);

  return hasText && isPositioned;
}

export function getCurrentSubtitleText() {
  const subtitleEl = findSubtitleElement();
  console.log('Detected subtitle element:', subtitleEl);

  if (!subtitleEl) return '';

  return subtitleEl.textContent?.trim() || '';
}
