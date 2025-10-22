import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { DashboardHeader } from '../../components/layout/DashboardHeader';
import { DashboardSidebar } from '../../components/layout/DashboardSidebar';
import { Layout } from '../../components/common/Layout';
import { Container } from '../../components/common/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SettingsSidebar } from './components/SettingsSidebar';
import { ProfileTab } from './components/ProfileTab';
import { NotificationsTab } from './components/NotificationsTab';
import { PrivacyTab } from './components/PrivacyTab';
import { DataManagementTab } from './components/DataManagementTab';
import { AppearanceTab } from './components/AppearanceTab';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useToast } from '../../contexts/ToastContext';
import { useTranslation } from '../../hooks/useTranslation';
import { settingsService } from '../../services/api/settings/settingsService';
import type { SettingsData, SettingsTab } from '../../types/settings';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [isLoading] = useState(false); // Changed to false - render UI immediately
  const [isSaving, setIsSaving] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();
  const { changeLanguage, getContent } = useTranslation();

  // Load settings on mount - non-blocking
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // Don't block UI rendering
      const data = await settingsService.getSettings();
      setSettings(data);
    } catch (error) {
      showErrorToast(getContent('settings.loadError'));
      console.error('Error loading settings:', error);
    }
  };

  const handleSaveChanges = async () => {
    if (!settings) return;

    try {
      setIsSaving(true);
      
      // Store the new language if changing appearance
      const newLanguage = activeTab === 'appearance' ? settings.appearance.language : null;
      
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
          // Apply language change when saving appearance settings
          changeLanguage(settings.appearance.language);
          break;
      }

      // Wait a bit for language change to complete, then show toast in NEW language
      if (newLanguage) {
        setTimeout(() => {
          // Get the success message in the NEW language
          const successMsg = newLanguage === 'vi' 
            ? 'Đã lưu cài đặt thành công' 
            : 'Settings saved successfully';
          showSuccessToast(successMsg);
        }, 100);
      } else {
        showSuccessToast(getContent('settings.saveSuccess'));
      }
    } catch (error) {
      showErrorToast(getContent('settings.saveError'));
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
      showSuccessToast(getContent('settings.data.exportSuccess'));
    } catch (error) {
      showErrorToast(getContent('settings.saveError'));
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
            showSuccessToast(getContent('settings.data.importSuccess'));
          } catch (error) {
            showErrorToast(getContent('settings.saveError'));
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleResetSettings = async () => {
    if (window.confirm(getContent('settings.data.resetConfirm'))) {
      try {
        await settingsService.resetSettings();
        await loadSettings();
        showSuccessToast(getContent('settings.saveSuccess'));
      } catch (error) {
        showErrorToast(getContent('settings.saveError'));
        console.error('Error resetting settings:', error);
      }
    }
  };

  const handleDeleteAllData = async () => {
    const confirmed = window.confirm(getContent('settings.data.deleteConfirm'));
    
    if (confirmed) {
      const doubleConfirm = window.confirm(getContent('settings.data.deleteDoubleConfirm'));
      
      if (doubleConfirm) {
        try {
          await settingsService.deleteAllData();
          showSuccessToast(getContent('settings.saveSuccess'));
          // Redirect to login or home
          window.location.href = '/login';
        } catch (error) {
          showErrorToast(getContent('settings.saveError'));
          console.error('Error deleting data:', error);
        }
      }
    }
  };

  if (isLoading) {
    return (
      <Layout className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
        <div className="flex min-h-screen">
          <DashboardSidebar />
          <div className="flex-1 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      <div className="flex min-h-screen">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          
          <main className="flex-1 overflow-auto">
            <div className="py-8">
              <Container maxWidth="2xl">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Sidebar */}
                  <div className="lg:col-span-1">
                    <Card className="p-0 overflow-hidden">
                      <SettingsSidebar 
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                      />
                    </Card>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-3">
                    <Card className="p-8">
                      {/* Tab Title & Save Button */}
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-3xl font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                          {activeTab === 'profile' && getContent('settings.tabs.profile')}
                          {activeTab === 'notifications' && getContent('settings.tabs.notifications')}
                          {activeTab === 'privacy' && getContent('settings.tabs.privacy')}
                          {activeTab === 'data' && getContent('settings.tabs.data')}
                          {activeTab === 'appearance' && getContent('settings.tabs.appearance')}
                        </h3>

                        {activeTab !== 'data' && (
                          <Button
                            onClick={handleSaveChanges}
                            disabled={isSaving}
                            variant="primary"
                            size="md"
                            className="flex items-center gap-2"
                          >
                            {isSaving ? (
                              <>
                                <LoadingSpinner size="sm" variant="neutral" />
                                <span>{getContent('settings.saving')}</span>
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                <span>{getContent('settings.saveChanges')}</span>
                              </>
                            )}
                          </Button>
                        )}
                      </div>

                      {/* Tab Content */}
                      <div>
                        {activeTab === 'profile' && settings && (
                          <ProfileTab
                            profile={settings.profile}
                            onUpdate={async (updates) => {
                              setSettings(prev => prev ? { ...prev, profile: { ...prev.profile, ...updates } } : null);
                            }}
                          />
                        )}

                        {activeTab === 'notifications' && settings && (
                          <NotificationsTab
                            settings={settings.notifications}
                            onUpdate={(updates) => {
                              setSettings(prev => prev ? { ...prev, notifications: { ...prev.notifications, ...updates } } : null);
                            }}
                          />
                        )}

                        {activeTab === 'privacy' && settings && (
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

                        {activeTab === 'appearance' && settings && (
                          <AppearanceTab
                            settings={settings.appearance}
                            onUpdate={(updates) => {
                              setSettings(prev => prev ? { ...prev, appearance: { ...prev.appearance, ...updates } } : null);
                            }}
                          />
                        )}
                        
                        {/* Loading skeleton for when data is being fetched */}
                        {!settings && activeTab !== 'data' && (
                          <div className="space-y-6 animate-pulse">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <div className="h-4 bg-neutral-200 rounded w-20"></div>
                                <div className="h-10 bg-neutral-200 rounded"></div>
                              </div>
                              <div className="space-y-2">
                                <div className="h-4 bg-neutral-200 rounded w-20"></div>
                                <div className="h-10 bg-neutral-200 rounded"></div>
                              </div>
                              <div className="space-y-2">
                                <div className="h-4 bg-neutral-200 rounded w-20"></div>
                                <div className="h-10 bg-neutral-200 rounded"></div>
                              </div>
                              <div className="space-y-2">
                                <div className="h-4 bg-neutral-200 rounded w-20"></div>
                                <div className="h-10 bg-neutral-200 rounded"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              </Container>    
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};
