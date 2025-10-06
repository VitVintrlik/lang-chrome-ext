import { useMemo } from 'react';
import { tokenize } from '../utils/languageTokenizers';
import { Languages } from '../enums/Languages';

export const useTokenizedSubtitle = (subtitle?: string, lang: Languages = Languages.Japanese) => {
  return useMemo(() => {
    if (!subtitle) return undefined;
    return tokenize(subtitle, lang);
  }, [subtitle, lang]);
};
