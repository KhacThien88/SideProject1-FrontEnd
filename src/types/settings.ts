// Settings types and interfaces

export interface UserProfile {
  fullName: string;
  email: string;
  company: string;
  role: string;
  avatar?: string;
}

export interface NotificationSettings {
  emailAlerts: boolean;
  pushNotifications: boolean;
  weeklyReports: boolean;
  analysisComplete: boolean;
}

export interface PrivacySettings {
  dataRetentionPeriod: '30' | '60' | '90' | '180' | '365';
  shareAnonymousAnalytics: boolean;
  autoDeleteOldData: boolean;
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'auto';
  language: 'en' | 'vi';
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
}

export interface SettingsData {
  profile: UserProfile;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  appearance: AppearanceSettings;
}

export type SettingsTab = 'profile' | 'notifications' | 'privacy' | 'data' | 'appearance';
