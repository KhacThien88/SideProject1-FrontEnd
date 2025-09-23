import { useTranslation as useI18nTranslation } from 'react-i18next';
import type { ContentTaxonomy } from '../i18n/types/content';

export const useTranslation = () => {
  const { t, i18n, ready } = useI18nTranslation();
  
  const changeLanguage = (lang: 'vi' | 'en') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };
  
  const getCurrentLanguage = () => i18n.language as 'vi' | 'en';
  
  const getContent = (key: keyof ContentTaxonomy): any => {
    if (!ready) {
      return {};
    }
    const content = t(key, { returnObjects: true });
    return content || {};
  };
  
  const tContent = (key: string) => {
    if (!ready) {
      return key;
    }
    return t(key);
  };
  
  return {
    t: tContent,
    changeLanguage,
    getCurrentLanguage,
    getContent,
    currentLanguage: getCurrentLanguage(),
    ready,
  };
};
