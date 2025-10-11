import React from 'react';
import { User, Bell, Lock, Database, Palette } from 'lucide-react';
import type { SettingsTab } from '../../../types/settings';

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'privacy' as const, label: 'Privacy & Security', icon: Lock },
    { id: 'data' as const, label: 'Data Management', icon: Database },
    { id: 'appearance' as const, label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-neutral-200/50">
      <div className="space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
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
