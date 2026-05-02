'use client';

import { useLanguage } from '@/contexts/language-context';
import { useEffect, useState } from 'react';

export function useTranslate() {
  const { t, translate, currentLanguage, setLanguage, isTranslating } = useLanguage();
  const [translatedTexts, setTranslatedTexts] = useState<Record<string, string>>({});

  const translateText = async (text: string): Promise<string> => {
    if (currentLanguage === 'en') {
      return text;
    }
    return await translate(text);
  };

  const tt = (text: string): string => {
    if (currentLanguage === 'en') {
      return text;
    }
    return t(text);
  };

  const Translate = ({ text, fallback = '' }: { text: string; fallback?: string }) => {
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
      let mounted = true;
      
      const doTranslate = async () => {
        if (currentLanguage === 'en') {
          setDisplayText(text);
          return;
        }
        
        const cached = t(text);
        if (cached !== text) {
          setDisplayText(cached);
          return;
        }
        
        setDisplayText(fallback || text);
        const translated = await translateText(text);
        if (mounted) {
          setDisplayText(translated);
        }
      };
      
      doTranslate();
      
      return () => {
        mounted = false;
      };
    }, [text, currentLanguage, t, translateText, fallback]);

    return <>{displayText}</>;
  };

  return {
    t: tt,
    translate: translateText,
    Translate,
    currentLanguage,
    setLanguage,
    isTranslating,
  };
}
