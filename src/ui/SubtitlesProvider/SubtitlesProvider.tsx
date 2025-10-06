import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { getCurrentSubtitleText } from '../../utils/subtitleDetector';

type SubtitlesContextValue = {
  subtitles?: string;
};

const SubtitlesContext = createContext<SubtitlesContextValue | undefined>(undefined);

export const useSubtitles = (): SubtitlesContextValue => {
  const context = useContext(SubtitlesContext);
  if (!context) {
    throw new Error('useSubtitles must be used within a SubtitlesProvider');
  }
  return context;
};

type SubtitlesProviderProps = {
  children: ReactNode;
};

export const SubtitlesProvider: FC<SubtitlesProviderProps> = ({ children }) => {
  const [subtitles, setSubtitles] = useState<string | undefined>();

  useEffect(() => {
    const current = getCurrentSubtitleText();
    setSubtitles(current);
  }, []);

  return <SubtitlesContext.Provider value={{ subtitles }}>{children}</SubtitlesContext.Provider>;
};
