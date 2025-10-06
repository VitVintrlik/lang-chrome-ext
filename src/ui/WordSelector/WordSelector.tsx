import React from 'react';
import { useSubtitles } from '../SubtitlesProvider';
import { useTokenizedSubtitle } from '../../hooks/useTokenizedSubtitle';

const WordSelector = () => {
  const { subtitles } = useSubtitles();
  const tokens = useTokenizedSubtitle(subtitles);
  console.log('tokens', { tokens, subtitles });

  return (
    <div className="subtitle-overlay">
      {tokens
        ? tokens.map((token, i) => (
            <span
              key={i}
              className="subtitle-token"
              onClick={() => console.log('translate', token)}
            >
              {token}
            </span>
          ))
        : 'loading'}
    </div>
  );
};

export default WordSelector;
