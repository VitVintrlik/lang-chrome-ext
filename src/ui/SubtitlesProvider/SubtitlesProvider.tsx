import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { getCurrentSubtitleText } from '../../utils/subtitleDetector';

const SubtitlesContext = createContext({});

export const useSubtitles = () => useContext(SubtitlesContext);

export const SubtitlesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [subtitles, setSubtitles] = useState<string | undefined>();

  useEffect(() => {
    const subtitles = getCurrentSubtitleText();
    console.log('Detected subtitles:', subtitles);
    setSubtitles(subtitles);
  });

  return <SubtitlesContext.Provider value={{ subtitles }}>{children}</SubtitlesContext.Provider>;
};
