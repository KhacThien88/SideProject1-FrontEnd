import React from 'react';
import { useTranslation } from 'react-i18next';

export interface UploadProgressProps {
  progress: number; // 0-100
  filename: string;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  fileSize?: number;
  uploadedSize?: number;
  estimatedTimeRemaining?: number;
  showDetails?: boolean;
  onCancel?: () => void;
  onRetry?: () => void;
  className?: string;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({
  progress,
  filename,
  status,
  fileSize,
  uploadedSize,
  estimatedTimeRemaining,
  showDetails = true,
  onCancel,
  onRetry,
  className = '',
}) => {
  const { t } = useTranslation();
  const getStatusColor = (): string => {
    switch (status) {
      case 'uploading':
        return 'bg-blue-500';
      case 'processing':
        return 'bg-orange-500';
      case 'completed':
        return 'bg-green-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (): string => {
    switch (status) {
      case 'uploading':
        return t('uploadProgress.status.uploading');
      case 'processing':
        return t('uploadProgress.status.processing');
      case 'completed':
        return t('uploadProgress.status.completed');
      case 'failed':
        return t('uploadProgress.status.failed');
      default:
        return t('uploadProgress.status.unknown');
    }
  };

  const getStatusIcon = (): string => {
    switch (status) {
      case 'uploading':
        return '📤';
      case 'processing':
        return '⚙️';
      case 'completed':
        return '✅';
      case 'failed':
        return '❌';
      default:
        return '❓';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${Math.round(remainingSeconds)}s`;
  };

  return (
    <div className={`bg-white rounded-lg border shadow-sm p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getStatusIcon()}</span>
          <span className="font-medium text-gray-900 truncate max-w-xs">
            {filename}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            status === 'completed' ? 'bg-green-100 text-green-800' :
            status === 'failed' ? 'bg-red-100 text-red-800' :
            status === 'processing' ? 'bg-orange-100 text-orange-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {getStatusText()}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">
            {Math.round(progress)}%
          </span>
          {showDetails && fileSize && (
            <span className="text-sm text-gray-500">
              {uploadedSize ? formatFileSize(uploadedSize) : '0 Bytes'} / {formatFileSize(fileSize)}
            </span>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getStatusColor()}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {/* Details */}
      {showDetails && (
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div>
            {estimatedTimeRemaining && status === 'uploading' && (
              <span>{t('uploadProgress.details.remaining')}: {formatTime(estimatedTimeRemaining)}</span>
            )}
            {status === 'processing' && (
              <span>{t('uploadProgress.details.processing')}</span>
            )}
            {status === 'completed' && (
              <span>{t('uploadProgress.details.completed')}</span>
            )}
            {status === 'failed' && (
              <span>{t('uploadProgress.details.failed')}</span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            {(status === 'uploading' || status === 'processing') && onCancel && (
              <button
                onClick={onCancel}
                className="text-xs text-gray-500 hover:text-red-600 transition-colors"
              >
                {t('uploadProgress.actions.cancel')}
              </button>
            )}
            {status === 'failed' && onRetry && (
              <button
                onClick={onRetry}
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
              >
                {t('uploadProgress.actions.retry')}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Animated loading variant for when progress is indeterminate
export const IndeterminateProgress: React.FC<{
  filename: string;
  message: string;
  className?: string;
}> = ({ filename, message, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg border shadow-sm p-4 ${className}`}>
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
        <div className="flex-1">
          <div className="font-medium text-gray-900 truncate">{filename}</div>
          <div className="text-sm text-gray-500">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default UploadProgress;
