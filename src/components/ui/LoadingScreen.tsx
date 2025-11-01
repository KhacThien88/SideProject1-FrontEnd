import React from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface LoadingScreenProps {
  message?: string;
}

/**
 * Simple loading screen component
 * Shows a clean spinner with optional message
 * Supports i18n translations
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message
}) => {
  const { t } = useTranslation();
  
  // Use provided message or fallback to default translation
  const displayMessage = message || t.common.loadingScreen.loading;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-4">
        {/* Simple spinning loader */}
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
        
        {/* Loading message */}
        <p className="text-sm text-neutral-600 font-medium animate-pulse">
          {displayMessage}
        </p>
      </div>
    </div>
  );
};
