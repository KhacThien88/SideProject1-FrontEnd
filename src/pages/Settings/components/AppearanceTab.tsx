import React from 'react';
import type { AppearanceSettings } from '../../../types/settings';
import { useTranslation } from '../../../hooks/useTranslation';

interface AppearanceTabProps {
  settings: AppearanceSettings;
  onUpdate: (settings: Partial<AppearanceSettings>) => void;
}

export const AppearanceTab: React.FC<AppearanceTabProps> = ({ settings, onUpdate }) => {
  const { getContent, currentLanguage } = useTranslation();

  return (
    <div className="space-y-8">
      {/* Language Selection */}
      <div>
        <div className="font-semibold text-neutral-900 mb-2">
          {getContent('settings.appearance.language')}
        </div>
        <select
          value={settings.language}
          onChange={(e) => onUpdate({ language: e.target.value as 'en' | 'vi' })}
          className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          <option value="en">{currentLanguage === 'en' ? 'English' : 'Tiếng Anh'}</option>
          <option value="vi">{currentLanguage === 'en' ? 'Vietnamese' : 'Tiếng Việt'}</option>
        </select>
      </div>
    </div>
  );
};
