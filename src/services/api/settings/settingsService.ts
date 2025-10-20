import type { SettingsData, UserProfile, NotificationSettings, PrivacySettings, AppearanceSettings } from '../../../types/settings';
import { TokenManager } from '../authService';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SETTINGS_CACHE_KEY = 'user_settings_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

class SettingsService {
  // Get all settings - Now fetches real user data from backend with caching
  async getSettings(): Promise<SettingsData> {
    // Try to get cached data first
    const cached = this.getCachedSettings();
    if (cached) {
      // Return cached data immediately, then refresh in background
      this.refreshSettingsInBackground();
      return cached;
    }

    // If no cache, fetch from backend
    return this.fetchSettings();
  }

  private getCachedSettings(): SettingsData | null {
    try {
      const cached = localStorage.getItem(SETTINGS_CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is still valid
      if (now - timestamp < CACHE_DURATION) {
        return data;
      }

      // Cache expired
      localStorage.removeItem(SETTINGS_CACHE_KEY);
      return null;
    } catch (error) {
      console.error('Error reading cache:', error);
      return null;
    }
  }

  private setCachedSettings(data: SettingsData): void {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error writing cache:', error);
    }
  }

  private async refreshSettingsInBackground(): Promise<void> {
    try {
      const data = await this.fetchSettings();
      this.setCachedSettings(data);
    } catch (error) {
      console.error('Background refresh failed:', error);
    }
  }

  private async fetchSettings(): Promise<SettingsData> {
    const token = TokenManager.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

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

      return settingsData;
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
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

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.statusText}`);
      }

      // Clear cache after update to force refresh
      localStorage.removeItem(SETTINGS_CACHE_KEY);
      
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
      'HR Manager': 'hr_manager',
      'Talent Acquisition': 'recruiter',
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
}

export const settingsService = new SettingsService();
export default settingsService;
