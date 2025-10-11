import React from 'react';
import type { NotificationSettings } from '../../../types/settings';

interface NotificationsTabProps {
  settings: NotificationSettings;
  onUpdate: (settings: Partial<NotificationSettings>) => void;
}

export const NotificationsTab: React.FC<NotificationsTabProps> = ({ settings, onUpdate }) => {
  const notifications = [
    {
      key: 'emailAlerts' as const,
      title: 'Email Alerts',
      description: 'Receive email notifications for important updates',
    },
    {
      key: 'pushNotifications' as const,
      title: 'Push Notifications',
      description: 'Get push notifications in your browser',
    },
    {
      key: 'weeklyReports' as const,
      title: 'Weekly Reports',
      description: 'Weekly summary of your recruitment analytics',
    },
    {
      key: 'analysisComplete' as const,
      title: 'Analysis Complete',
      description: 'Notification when resume analysis is complete',
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
