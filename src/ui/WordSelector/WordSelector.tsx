import React, { useEffect, useState } from 'react';
import { useSubtitles } from '../SubtitlesProvider';
import { useTokenizedSubtitle } from '../../hooks/useTokenizedSubtitle';

import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  //@ts-ignore
  apiKey: process.env.GEMINI_API_KEY,
});

async function explainKanji(kanji: string, sentence: string) {
  const prompt = `
Explain the kanji ${kanji} as it appears in this sentence: "${sentence}".
Respond in this exact format:
Kanji: [character]
Meaning: [short meaning]
Readings: [onyomi, kunyomi, specify which is used here]
Sentence: [sentence with translation]
Context: [short explanation of its role in the sentence]
Nuance: [brief usage nuance or feeling]
Mnemonic: [short, visual or logical way to remember it]
Keep the total length under 100 words.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  console.log(response.text);
  return response.text;
}

function WordSelector() {
  const { subtitles } = useSubtitles();
  const tokens = useTokenizedSubtitle(subtitles);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="subtitle-overlay"
      style={{
        fontSize: '40px',
        lineHeight: 'normal',
        fontWeight: 'bolder',
        color: '#ffffff',
        textShadow: '#000000 0px 0px 7px',
        fontFamily: 'Netflix Sans, Helvetica Neue, Helvetica, Arial, sans-serif',
      }}
    >
      {tokens && subtitles
        ? tokens.map((token, i) => (
            <span
              key={i}
              className="subtitle-token"
              onClick={() => explainKanji(token, subtitles)}
              onMouseEnter={() => setHoveredIndex(i)}
              style={{
                backgroundColor: hoveredIndex === i ? 'blue' : 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
              }}
            >
              {token}
            </span>
          ))
        : 'loading'}
    </div>
  );
}

export default WordSelector;
