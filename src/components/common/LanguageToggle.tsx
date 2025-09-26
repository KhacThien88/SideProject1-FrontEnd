import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { cn } from '../../utils/cn';

interface LanguageToggleProps {
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className }) => {
  const { changeLanguage, currentLanguage } = useTranslation();

  return (
    <div className={cn(
      'relative flex items-center bg-gradient-to-r from-neutral-100/95 to-neutral-50/95 backdrop-blur-md rounded-3xl p-2 border border-neutral-200/70 shadow-soft-lg hover:shadow-brand-md transition-all duration-500 group',
      className
    )}>
      {/* Enhanced sliding background with 3D effect */}
      <div 
        className={cn(
          'absolute top-2 w-12 h-10 bg-gradient-to-br from-white via-primary-50/80 to-secondary-50/60 rounded-2xl shadow-soft-md border border-primary-200/60 transition-all duration-700 ease-out transform',
          'before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary-100/40 before:via-white/60 before:to-secondary-100/30 before:rounded-2xl before:opacity-80',
          'after:absolute after:inset-0 after:bg-gradient-to-t after:from-transparent after:via-white/20 after:to-white/40 after:rounded-2xl',
          currentLanguage === 'vi' 
            ? 'left-2 rotate-0 scale-100' 
            : 'left-14 rotate-1 scale-105'
        )}
      />
      
      {/* Enhanced glow ring for active state */}
      <div 
        className={cn(
          'absolute top-1.5 w-13 h-11 rounded-2xl transition-all duration-700 ease-out',
          'bg-gradient-to-r from-primary-400/30 via-secondary-400/20 to-accent-400/30 blur-md animate-pulse',
          currentLanguage === 'vi' 
            ? 'left-1.5 opacity-100' 
            : 'left-13.5 opacity-100'
        )}
      />
      
      <button
        onClick={() => changeLanguage('vi')}
        className={cn(
          // Enhanced dimensions and positioning
          'relative z-20 w-12 h-10 flex items-center justify-center text-sm font-bold rounded-2xl transition-all duration-500 transform-gpu',
          // Enhanced typography with better contrast
          'font-mono tracking-widest',
          // Enhanced active/inactive states with 3D effects
          currentLanguage === 'vi'
            ? 'text-primary-800 scale-110 drop-shadow-lg transform rotate-0 translate-y-0'
            : 'text-neutral-400 hover:text-primary-600 hover:scale-105 hover:rotate-1 hover:-translate-y-0.5'
        )}
        aria-label="Chuyển sang tiếng Việt"
      >
        <span className={cn(
          'relative z-30 transition-all duration-300',
          currentLanguage === 'vi' 
            ? 'font-black text-shadow-sm' 
            : 'font-bold'
        )}>
          VI
        </span>
        
        {/* Active state inner glow */}
        {currentLanguage === 'vi' && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-200/40 to-secondary-200/30 rounded-2xl blur-sm opacity-60 animate-pulse" />
        )}
      </button>
      
      <button
        onClick={() => changeLanguage('en')}
        className={cn(
          // Enhanced dimensions and positioning
          'relative z-20 w-12 h-10 flex items-center justify-center text-sm font-bold rounded-2xl transition-all duration-500 transform-gpu',
          // Enhanced typography with better contrast
          'font-mono tracking-widest',
          // Enhanced active/inactive states with 3D effects
          currentLanguage === 'en'
            ? 'text-primary-800 scale-110 drop-shadow-lg transform rotate-0 translate-y-0'
            : 'text-neutral-400 hover:text-primary-600 hover:scale-105 hover:rotate-1 hover:-translate-y-0.5'
        )}
        aria-label="Switch to English"
      >
        <span className={cn(
          'relative z-30 transition-all duration-300',
          currentLanguage === 'en' 
            ? 'font-black text-shadow-sm' 
            : 'font-bold'
        )}>
          EN
        </span>
        
        {/* Active state inner glow */}
        {currentLanguage === 'en' && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-200/40 to-secondary-200/30 rounded-2xl blur-sm opacity-60 animate-pulse" />
        )}
      </button>

      {/* Enhanced outer glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-300/20 via-secondary-300/15 to-accent-300/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
      
      {/* Floating particles effect */}
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.5s'}} />
      <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-secondary-400 rounded-full opacity-50 animate-pulse" style={{animationDelay: '1.5s'}} />
      
      {/* Enhanced reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/30 rounded-3xl pointer-events-none" />
    </div>
  );
};
