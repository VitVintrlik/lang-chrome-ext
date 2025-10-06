import { Languages } from '../enums/Languages';

type TokenizerFn = (text: string) => string[];

const japaneseTokenizer = (text: string): string[] => {
  if (!Intl.Segmenter) {
    throw new Error('Intl.Segmenter not supported in this browser');
  }
  const segmenter = new Intl.Segmenter(Languages.Japanese, { granularity: 'word' });
  const segments = Array.from(segmenter.segment(text));
  return segments.filter((s) => s.isWordLike).map((s) => s.segment);
};

const tokenizers: Record<Languages, TokenizerFn> = {
  [Languages.Japanese]: japaneseTokenizer,
  [Languages.English]: (text: string) => text.split(/\s+/),
};

export const tokenize = (text: string, lang: Languages) => {
  const tokenizerFunction = tokenizers[lang];
  if (!tokenizerFunction) throw new Error(`No tokenizer registered for language ${lang}`);
  return tokenizerFunction(text);
};
