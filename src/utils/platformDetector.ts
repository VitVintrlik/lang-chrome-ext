export enum Platform {
  YOUTUBE = 'youtube',
  NETFLIX = 'netflix',
  HBO = 'hbo',
  DISNEY = 'disney',
  PRIME = 'prime',
  HULU = 'hulu',
  UNKNOWN = 'unknown',
}

const platformMap: [Platform, string[]][] = [
  [Platform.YOUTUBE, ['youtube.com', 'youtu.be']],
  [Platform.NETFLIX, ['netflix.com']],
  [Platform.HBO, ['hbo.com', 'max.com']],
  [Platform.DISNEY, ['disneyplus.com']],
  [Platform.PRIME, ['amazon.com', 'primevideo.com']],
  [Platform.HULU, ['hulu.com']],
];

export const detectPlatform = (): Platform => {
  const host = window.location.hostname.toLowerCase();

  for (const [platform, domains] of platformMap) {
    if (domains.some((domain) => host.includes(domain))) {
      return platform;
    }
  }

  return Platform.UNKNOWN;
};
