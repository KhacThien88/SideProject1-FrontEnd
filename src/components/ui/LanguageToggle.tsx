import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { cn } from '../../utils/cn';

interface LanguageToggleProps {
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className }) => {
  const { changeLanguage, currentLanguage } = useTranslation();

  return (
    <div className={cn('flex items-center bg-neutral-100 rounded-lg p-1', className)}>
      <button
        onClick={() => changeLanguage('vi')}
        className={cn(
          'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
          currentLanguage === 'vi'
            ? 'bg-white text-neutral-900 shadow-sm'
            : 'text-neutral-600 hover:text-neutral-900'
        )}
      >
        VI
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={cn(
          'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
          currentLanguage === 'en'
            ? 'bg-white text-neutral-900 shadow-sm'
            : 'text-neutral-600 hover:text-neutral-900'
        )}
      >
        EN
      </button>
    </div>
  );
};