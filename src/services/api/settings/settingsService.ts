import type { SettingsData, UserProfile, NotificationSettings, PrivacySettings, AppearanceSettings } from '../../../types/settings';
import { TokenManager } from '../authService';
import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SETTINGS_CACHE_KEY_PREFIX = 'user_settings_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export interface UpdateProfileRequest {
  full_name?: string;
  phone?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  experience_years?: number;
  education?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
}

export interface NotificationSettingsRequest {
  enabled_channels: {
    email: boolean;
    in_app: boolean;
    sms: boolean;
  };
  enabled_events: {
    new_job_match: boolean;
    application_status: boolean;
    profile_views: boolean;
    messages: boolean;
    system: boolean;
  };
  frequency: 'immediate' | 'daily' | 'weekly';
  quiet_hours: {
    enabled: boolean;
    start_time: string;
    end_time: string;
  };
}

export interface PrivacySettingsRequest {
  profile_visibility: 'public' | 'private' | 'contacts_only';
  show_contact_info: boolean;
  show_work_history: boolean;
  show_education: boolean;
  allow_recruiter_contact: boolean;
  data_sharing_consent: boolean;
}

export interface AppearanceSettingsRequest {
  theme: 'light' | 'dark' | 'system';
  language: 'vi' | 'en';
  font_size: 'small' | 'medium' | 'large';
  color_scheme: string;
  compact_mode: boolean;
}

class SettingsService {
  // Keep track of an in-flight fetch to de-duplicate concurrent requests
  private _inflightFetch: Promise<SettingsData> | null = null;
  // Track last successful fetch timestamp (in ms) to avoid repeated refreshes
  private _lastFetchAt: number | null = null;
  // Minimum interval between background refreshes to allow (e.g., 10 seconds)
  private readonly MIN_REFRESH_INTERVAL_MS = 10 * 1000;
  // Get all settings - Now fetches real user data from backend with caching
  async getSettings(): Promise<SettingsData> {
    // Try to get cached data first (per-user cache)
    const cached = this.getCachedSettings();
    if (cached) {
      // Return cached data immediately, then refresh in background
      this.refreshSettingsInBackground();
      return cached;
    }

    // If no cache, fetch from backend
    return this.fetchSettings();
  }

  // Derive per-user cache key from stored user info (matches header behavior)
  private getUserIdFromToken(): string | null {
    try {
      const stored = TokenManager.getUserInfo?.();
      if (stored) {
        const id = stored.id || stored.user_id || stored.sub || stored.email || stored.uuid;
        if (id) return String(id);
      }

      const token = TokenManager.getAccessToken();
      if (!token) return null;
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      return (payload.sub || payload.user_id || payload.id || payload.email) ?? null;
    } catch (err) {
      return null;
    }
  }

  private getCacheKey(): string | null {
    const userId = this.getUserIdFromToken();
    if (!userId) return null;
    return `${SETTINGS_CACHE_KEY_PREFIX}_${userId}`;
  }

  private getCachedSettings(): SettingsData | null {
    try {
      const key = this.getCacheKey();
      if (!key) return null;

      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is still valid
      if (now - timestamp < CACHE_DURATION) {
        return data;
      }

      // Cache expired
      localStorage.removeItem(key);
      return null;
    } catch (error) {
      console.error('Error reading cache:', error);
      return null;
    }
  }

  private setCachedSettings(data: SettingsData): void {
    try {
      const key = this.getCacheKey();
      if (!key) return;

      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error writing cache:', error);
    }
  }

  // Force refresh and return fresh data (useful for updating UI)
  async refreshSettings(): Promise<SettingsData> {
    const fresh = await this.fetchSettings();
    this.setCachedSettings(fresh);
    return fresh;
  }

  // Clear cache for current user (call on logout/login)
  clearCacheForCurrentUser(): void {
    try {
      const key = this.getCacheKey();
      if (!key) return;
      localStorage.removeItem(key);
    } catch (err) {
      console.error('Failed to clear settings cache:', err);
    }
  }

  private async refreshSettingsInBackground(): Promise<void> {
    try {
      // If we've fetched recently, skip a background refresh to avoid extra network calls
      const now = Date.now();
      if (this._lastFetchAt && now - this._lastFetchAt < this.MIN_REFRESH_INTERVAL_MS) {
        return;
      }

      const data = await this.fetchSettings();
      this.setCachedSettings(data);
    } catch (error) {
      console.error('Background refresh failed:', error);
    }
  }

  private async fetchSettings(): Promise<SettingsData> {
    // If a fetch is already in progress, return the same promise to avoid duplicate network requests
    if (this._inflightFetch) return this._inflightFetch;

    const token = TokenManager.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const promise = (async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const userData = await response.json();

      // Map backend data to frontend settings structure
      const settingsData: SettingsData = {
        profile: {
          fullName: userData.full_name || userData.name || '',
          email: userData.email || '',
          company: userData.company || '',
          role: this.mapBackendRole(userData.role),
        },
        notifications: {
          emailAlerts: true,
          pushNotifications: false,
          weeklyReports: true,
          analysisComplete: true,
        },
        privacy: {
          dataRetentionPeriod: '90',
          shareAnonymousAnalytics: false,
          autoDeleteOldData: true,
        },
        appearance: {
          theme: 'light',
          language: (localStorage.getItem('language') as 'en' | 'vi') || 'vi',
          dateFormat: 'MM/DD/YYYY',
        },
      };

  // Cache the data
  this.setCachedSettings(settingsData);
  // Update last fetch timestamp
  this._lastFetchAt = Date.now();

  return settingsData;
      } catch (error) {
        console.error('Error fetching settings:', error);
        throw error;
      } finally {
        // Clear inflight reference when done so subsequent calls can start a new fetch
        this._inflightFetch = null;
      }
    })();

    this._inflightFetch = promise;
    return promise;
  }

  // Helper method to map backend role to frontend display role
  private mapBackendRole(backendRole: string): string {
    const roleMap: Record<string, string> = {
      'candidate': 'Candidate',
      'recruiter': 'Recruiter',
      'admin': 'Admin',
      'hr_manager': 'HR Manager',
    };
    return roleMap[backendRole] || 'HR Manager';
  }

  // Update profile - Now calls real backend API
  async updateProfile(profile: Partial<UserProfile>): Promise<void> {
    const token = TokenManager.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    try {
      // Map frontend profile to backend format
      const updateData: any = {};
      
      if (profile.fullName !== undefined) {
        updateData.full_name = profile.fullName;
      }
      if (profile.email !== undefined) {
        updateData.email = profile.email;
      }
      if (profile.company !== undefined) {
        updateData.company = profile.company;
      }
      if (profile.role !== undefined) {
        updateData.role = this.mapFrontendRoleToBackend(profile.role);
      }

      const response = await axios.put(`${API_BASE_URL}/users/profile`, updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error(`Failed to update profile: ${response.statusText}`);
      }

        // Clear cache after update to force refresh (per-user)
        const key = this.getCacheKey();
        if (key) localStorage.removeItem(key);
      
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  // Helper method to map frontend role to backend role
  private mapFrontendRoleToBackend(frontendRole: string): string {
    const roleMap: Record<string, string> = {
      'Candidate': 'candidate',
      'Recruiter': 'recruiter',
      'Admin': 'admin',
    };
    return roleMap[frontendRole] || 'candidate';
  }

  // Update notifications
  async updateNotifications(notifications: Partial<NotificationSettings>): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Notifications updated:', notifications);
        resolve();
      }, 500);
    });
  }

  // Update privacy settings
  async updatePrivacy(privacy: Partial<PrivacySettings>): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Privacy updated:', privacy);
        resolve();
      }, 500);
    });
  }

  // Update appearance settings
  async updateAppearance(appearance: Partial<AppearanceSettings>): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Appearance updated:', appearance);
        resolve();
      }, 500);
    });
  }

  // Export user data
  async exportUserData(dataTypes: string[] = ['profile', 'applications', 'saved_jobs'], format: 'json' | 'csv' | 'pdf' = 'json'): Promise<{
    request_id: string;
    status: string;
    estimated_completion_time: string;
  }> {
    const token = TokenManager.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/users/export-data`, {
        data_types: dataTypes,
        format: format
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to export user data:', error);
      throw new Error(error.response?.data?.detail || 'Failed to export data');
    }
  }

  // Legacy export method for backward compatibility
  async exportData(): Promise<Blob> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          exportDate: new Date().toISOString(),
          userData: {
            profile: {},
            settings: {},
            analytics: {},
          },
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        resolve(blob);
      }, 1000);
    });
  }

  // Delete all user data
  async deleteAllData(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('All data deleted');
        resolve();
      }, 1000);
    });
  }

  // Reset settings to default
  async resetSettings(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Settings reset to default');
        resolve();
      }, 500);
    });
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (currentPassword === 'wrong') {
          reject(new Error('Current password is incorrect'));
        } else {
          console.log('Password changed successfully to:', newPassword);
          resolve();
        }
      }, 500);
    });
  }

  // Legacy methods for backward compatibility
  async getCurrentUser(): Promise<any> {
    const settings = await this.getSettings();
    return {
      id: '1',
      name: settings.profile.fullName,
      email: settings.profile.email,
      role: settings.profile.role.toLowerCase(),
      settings: {
        theme: settings.appearance.theme,
        language: settings.appearance.language,
        notifications: {
          email: settings.notifications.emailAlerts,
          push: settings.notifications.pushNotifications,
          jobAlerts: settings.notifications.analysisComplete,
        },
        privacy: {
          profileVisible: !settings.privacy.shareAnonymousAnalytics,
          showEmail: false,
          showPhone: true,
        },
      },
    };
  }

  async updateCurrentUser(userData: any): Promise<any> {
    if (userData.name) {
      await this.updateProfile({ fullName: userData.name });
    }
    if (userData.email) {
      await this.updateProfile({ email: userData.email });
    }
    return this.getCurrentUser();
  }

  async updateUserSettings(settings: any): Promise<any> {
    if (settings.theme) {
      await this.updateAppearance({ theme: settings.theme });
      document.documentElement.setAttribute('data-theme', settings.theme);
    }
    return settings;
  }

  // Helper methods for settings management
  getDefaultSettings(): any {
    return {
      user_id: '',
      profile: {
        theme: 'light',
        language: 'vi',
        timezone: 'Asia/Ho_Chi_Minh'
      },
      notifications: {
        email: true,
        push: true,
        job_alerts: true,
        application_updates: true,
        profile_views: false
      },
      privacy: {
        profile_visible: true,
        show_email: false,
        show_phone: false,
        show_location: true
      },
      appearance: {
        theme: 'light',
        font_size: 'medium',
        color_scheme: 'blue'
      },
      updated_at: new Date().toISOString()
    };
  }

  // Apply theme to document
  applyTheme(theme: 'light' | 'dark' | 'system'): void {
    const root = document.documentElement;
    
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? 'dark' : 'light';
    }

    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // Get current theme
  getCurrentTheme(): 'light' | 'dark' | 'system' {
    return (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'light';
  }
}

export const settingsService = new SettingsService();
export default settingsService;
