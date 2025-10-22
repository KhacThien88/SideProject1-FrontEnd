import React from 'react';
import { useTranslation } from 'react-i18next';
import { designSystem } from '../../styles/tokens';

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">{t('nav.language')}:</span>
      <div className="flex space-x-1">
        <button
          onClick={() => changeLanguage('vi')}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            currentLanguage === 'vi'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } ${designSystem.focusStates.button}`}
        >
          Tiếng Việt
        </button>
        <button
          onClick={() => changeLanguage('en')}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            currentLanguage === 'en'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } ${designSystem.focusStates.button}`}
        >
          English
        </button>
      </div>
    </div>
  );
};

// Test component để verify i18n functionality
export const I18nTestComponent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-4 bg-gray-50 rounded-lg space-y-2">
      <h3 className="font-semibold text-gray-900">i18n Test</h3>
      <div className="space-y-1 text-sm">
        <p><strong>Upload Status:</strong> {t('uploadProgress.status.uploading')}</p>
        <p><strong>Processing:</strong> {t('uploadProgress.status.processing')}</p>
        <p><strong>Completed:</strong> {t('uploadProgress.status.completed')}</p>
        <p><strong>Failed:</strong> {t('uploadProgress.status.failed')}</p>
        <p><strong>Admin Verifying:</strong> {t('adminAuth.verifying')}</p>
        <p><strong>JD Loading:</strong> {t('jdFileManagement.loading')}</p>
      </div>
      <LanguageSwitcher />
    </div>
  );
};

export default LanguageSwitcher;
