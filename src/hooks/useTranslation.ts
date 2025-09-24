import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { en } from '../i18n/locales/en';
import { vi } from '../i18n/locales/vi';
import type { ContentTaxonomy } from '../i18n/types/content';

const translations: Record<string, ContentTaxonomy> = {
  en,
  vi,
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  
  const { language, changeLanguage } = context;
  const t = translations[language] || translations.en;
  
  const getContent = (key: string) => {
    const keys = key.split('.');
    let result: any = t;
    for (const k of keys) {
      result = result?.[k];
    }
    return result;
  };
  
  return { 
    t, 
    language, 
    currentLanguage: language,
    changeLanguage,
    getContent 
  };
};