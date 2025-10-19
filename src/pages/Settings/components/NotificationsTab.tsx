import React from 'react';
import type { NotificationSettings } from '../../../types/settings';
import { useTranslation } from '../../../hooks/useTranslation';

interface NotificationsTabProps {
  settings: NotificationSettings;
  onUpdate: (settings: Partial<NotificationSettings>) => void;
}

export const NotificationsTab: React.FC<NotificationsTabProps> = ({ settings, onUpdate }) => {
  const { getContent } = useTranslation();
  
  const notifications = [
    {
      key: 'emailAlerts' as const,
      title: getContent('settings.notifications.emailAlerts'),
      description: getContent('settings.notifications.emailAlertsDesc'),
    },
    {
      key: 'pushNotifications' as const,
      title: getContent('settings.notifications.pushNotifications'),
      description: getContent('settings.notifications.pushNotificationsDesc'),
    },
    {
      key: 'weeklyReports' as const,
      title: getContent('settings.notifications.weeklyReports'),
      description: getContent('settings.notifications.weeklyReportsDesc'),
    },
    {
      key: 'analysisComplete' as const,
      title: getContent('settings.notifications.analysisComplete'),
      description: getContent('settings.notifications.analysisCompleteDesc'),
    },
  ];

  const handleToggle = (key: keyof NotificationSettings) => {
    onUpdate({ [key]: !settings[key] });
  };

  return (
    <div className="space-y-6">
      {notifications.map((notification) => (
        <div
          key={notification.key}
          className="flex items-center justify-between py-4 border-b border-neutral-200 last:border-0"
        >
          <div className="flex-1">
            <div className="font-medium text-neutral-900">{notification.title}</div>
            <div className="text-sm text-neutral-600 mt-1">{notification.description}</div>
          </div>
          
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings[notification.key]}
              onChange={() => handleToggle(notification.key)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-primary-500 peer-checked:to-secondary-500"></div>
          </label>
        </div>
      ))}
    </div>
  );
};
