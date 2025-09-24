import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  changeLanguage: (lang: string) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize with saved language from localStorage
  const [language, setLanguage] = useState<string>(() => {
    try {
      const savedLang = localStorage.getItem('preferred-language');
      return savedLang === 'en' ? 'en' : 'vi';
    } catch {
      return 'vi';
    }
  });

  const changeLanguage = (lang: string) => {
    // Update state immediately for synchronous UI updates
    setLanguage(lang);
    
    // Save to localStorage for persistence
    try {
      localStorage.setItem('preferred-language', lang);
    } catch (error) {
      console.warn('Failed to save language preference:', error);
    }
    
    // Force re-render of all components by triggering a custom event
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: lang } 
    }));
  };

  // Listen for language changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'preferred-language' && e.newValue) {
        setLanguage(e.newValue === 'en' ? 'en' : 'vi');
      }
    };

    const handleLanguageChange = (e: CustomEvent) => {
      // Ensure all components are notified of language changes
      setLanguage(e.detail.language);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};