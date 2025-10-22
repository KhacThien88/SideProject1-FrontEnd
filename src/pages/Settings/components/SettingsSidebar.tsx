import React from 'react';
import { User, Bell, Lock, Database, Palette } from 'lucide-react';
import type { SettingsTab } from '../../../types/settings';
import { useTranslation } from '../../../hooks/useTranslation';

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeTab, onTabChange }) => {
  const { getContent } = useTranslation();
  
  const tabs = [
    { id: 'profile' as const, label: getContent('settings.tabs.profile'), icon: User },
    { id: 'notifications' as const, label: getContent('settings.tabs.notifications'), icon: Bell },
    { id: 'privacy' as const, label: getContent('settings.tabs.privacy'), icon: Lock },
    { id: 'data' as const, label: getContent('settings.tabs.data'), icon: Database },
    { id: 'appearance' as const, label: getContent('settings.tabs.appearance'), icon: Palette },
  ];

  return (
    <div className="p-4">
      <div className="space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md' 
                  : 'text-neutral-700 hover:bg-neutral-100/80'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
