import React from 'react';
import type { PrivacySettings } from '../../../types/settings';

interface PrivacyTabProps {
  settings: PrivacySettings;
  onUpdate: (settings: Partial<PrivacySettings>) => void;
}

export const PrivacyTab: React.FC<PrivacyTabProps> = ({ settings, onUpdate }) => {
  return (
    <div className="space-y-8">
      {/* Data Retention Period */}
      <div>
        <div className="font-semibold text-neutral-900 mb-2">Data Retention Period</div>
        <div className="text-sm text-neutral-600 mb-4">
          How long should we keep your uploaded resumes?
        </div>
        <select
          value={settings.dataRetentionPeriod}
          onChange={(e) => onUpdate({ dataRetentionPeriod: e.target.value as PrivacySettings['dataRetentionPeriod'] })}
          className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          <option value="30">30 days</option>
          <option value="60">60 days</option>
          <option value="90">90 days</option>
          <option value="180">180 days</option>
          <option value="365">365 days</option>
        </select>
      </div>

      {/* Share Anonymous Analytics */}
      <div className="flex items-center justify-between py-4 border-b border-neutral-200">
        <div className="flex-1">
          <div className="font-medium text-neutral-900">Share Anonymous Analytics</div>
          <div className="text-sm text-neutral-600 mt-1">
            Help us improve by sharing anonymous usage data
          </div>
        </div>
        
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.shareAnonymousAnalytics}
            onChange={(e) => onUpdate({ shareAnonymousAnalytics: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-primary-500 peer-checked:to-secondary-500"></div>
        </label>
      </div>

      {/* Auto-delete Old Data */}
      <div className="flex items-center justify-between py-4">
        <div className="flex-1">
          <div className="font-medium text-neutral-900">Auto-delete Old Data</div>
          <div className="text-sm text-neutral-600 mt-1">
            Automatically delete data after retention period
          </div>
        </div>
        
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.autoDeleteOldData}
            onChange={(e) => onUpdate({ autoDeleteOldData: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-primary-500 peer-checked:to-secondary-500"></div>
        </label>
      </div>
    </div>
  );
};
