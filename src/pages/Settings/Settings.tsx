import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { DashboardHeader } from '../../components/layout/DashboardHeader';
import { DashboardSidebar } from '../../components/layout/DashboardSidebar';
import { SettingsSidebar } from './components/SettingsSidebar';
import { ProfileTab } from './components/ProfileTab';
import { NotificationsTab } from './components/NotificationsTab';
import { PrivacyTab } from './components/PrivacyTab';
import { DataManagementTab } from './components/DataManagementTab';
import { AppearanceTab } from './components/AppearanceTab';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useToast } from '../../contexts/ToastContext';
import { settingsService } from '../../services/api/settings/settingsService';
import type { SettingsData, SettingsTab } from '../../types/settings';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const data = await settingsService.getSettings();
      setSettings(data);
    } catch (error) {
      showErrorToast('Failed to load settings');
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!settings) return;

    try {
      setIsSaving(true);
      
      // Update based on active tab
      switch (activeTab) {
        case 'profile':
          await settingsService.updateProfile(settings.profile);
          break;
        case 'notifications':
          await settingsService.updateNotifications(settings.notifications);
          break;
        case 'privacy':
          await settingsService.updatePrivacy(settings.privacy);
          break;
        case 'appearance':
          await settingsService.updateAppearance(settings.appearance);
          break;
      }

      showSuccessToast('Settings saved successfully');
    } catch (error) {
      showErrorToast('Failed to save settings');
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportData = async () => {
    try {
      const blob = await settingsService.exportData();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `settings-export-${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showSuccessToast('Data exported successfully');
    } catch (error) {
      showErrorToast('Failed to export data');
      console.error('Error exporting data:', error);
    }
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            console.log('Imported data:', data);
            showSuccessToast('Data imported successfully');
          } catch (error) {
            showErrorToast('Invalid file format');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleResetSettings = async () => {
    if (window.confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      try {
        await settingsService.resetSettings();
        await loadSettings();
        showSuccessToast('Settings reset successfully');
      } catch (error) {
        showErrorToast('Failed to reset settings');
        console.error('Error resetting settings:', error);
      }
    }
  };

  const handleDeleteAllData = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete ALL your data? This action is PERMANENT and cannot be undone.'
    );
    
    if (confirmed) {
      const doubleConfirm = window.confirm(
        'This will permanently delete all your data including resumes, analysis results, and settings. Type DELETE to confirm.'
      );
      
      if (doubleConfirm) {
        try {
          await settingsService.deleteAllData();
          showSuccessToast('All data deleted successfully');
          // Redirect to login or home
          window.location.href = '/login';
        } catch (error) {
          showErrorToast('Failed to delete data');
          console.error('Error deleting data:', error);
        }
      }
    }
  };

  if (isLoading || !settings) {
    return (
      <div className="flex h-screen">
        <DashboardSidebar />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-primary-50/30 via-white to-secondary-50/30">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                Settings
              </h1>
              <p className="text-neutral-600">
                Manage your account preferences and application settings.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <SettingsSidebar 
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-soft border border-neutral-200/50">
                  {/* Tab Title & Save Button */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-neutral-900">
                      {activeTab === 'profile' && 'Profile'}
                      {activeTab === 'notifications' && 'Notifications'}
                      {activeTab === 'privacy' && 'Privacy & Security'}
                      {activeTab === 'data' && 'Data Management'}
                      {activeTab === 'appearance' && 'Appearance'}
                    </h2>

                    {activeTab !== 'data' && (
                      <button
                        onClick={handleSaveChanges}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSaving ? (
                          <>
                            <LoadingSpinner size="sm" variant="neutral" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Save Changes</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Tab Content */}
                  <div>
                    {activeTab === 'profile' && (
                      <ProfileTab
                        profile={settings.profile}
                        onUpdate={async (updates) => {
                          setSettings(prev => prev ? { ...prev, profile: { ...prev.profile, ...updates } } : null);
                        }}
                      />
                    )}

                    {activeTab === 'notifications' && (
                      <NotificationsTab
                        settings={settings.notifications}
                        onUpdate={(updates) => {
                          setSettings(prev => prev ? { ...prev, notifications: { ...prev.notifications, ...updates } } : null);
                        }}
                      />
                    )}

                    {activeTab === 'privacy' && (
                      <PrivacyTab
                        settings={settings.privacy}
                        onUpdate={(updates) => {
                          setSettings(prev => prev ? { ...prev, privacy: { ...prev.privacy, ...updates } } : null);
                        }}
                      />
                    )}

                    {activeTab === 'data' && (
                      <DataManagementTab
                        onExport={handleExportData}
                        onImport={handleImportData}
                        onReset={handleResetSettings}
                        onDeleteAll={handleDeleteAllData}
                      />
                    )}

                    {activeTab === 'appearance' && (
                      <AppearanceTab
                        settings={settings.appearance}
                        onUpdate={(updates) => {
                          setSettings(prev => prev ? { ...prev, appearance: { ...prev.appearance, ...updates } } : null);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
