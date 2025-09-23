import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export const LanguageToggle: React.FC = () => {
  const { changeLanguage, currentLanguage } = useTranslation();
  
  const handleLanguageChange = (lang: 'vi' | 'en') => {
    changeLanguage(lang);
  };
  
  return (
    <div className="flex items-center space-x-1 bg-neutral-100 rounded-lg p-1">
      <button
        onClick={() => handleLanguageChange('vi')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
          currentLanguage === 'vi'
            ? 'bg-primary-500 text-white shadow-sm'
            : 'text-neutral-600 hover:text-primary-500 hover:bg-white'
        }`}
      >
        VN
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
          currentLanguage === 'en'
            ? 'bg-primary-500 text-white shadow-sm'
            : 'text-neutral-600 hover:text-primary-500 hover:bg-white'
        }`}
      >
        EN
      </button>
    </div>
  );
};
