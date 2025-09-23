import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { vi } from './locales/vi';
import { en } from './locales/en';

const resources = {
  vi: {
    translation: vi,
  },
  en: {
    translation: en,
  },
};

// Pick saved language from localStorage if available
const savedLanguage = ((): 'vi' | 'en' => {
  try {
    const v = localStorage.getItem('preferred-language');
    return (v === 'en' ? 'en' : 'vi');
  } catch {
    return 'vi';
  }
})();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // default language
    fallbackLng: 'vi',
    returnObjects: true,
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
