import React from 'react';

export type ErrorType = 
  | 'network' | 'validation' | 'authentication' | 'authorization' | 'server' 
  | 'file_upload' | 'file_processing' | 'rate_limit' | 'timeout' | 'unknown';

export interface ErrorMessageProps {
  error: string | Error | null;
  type?: ErrorType;
  title?: string;
  retryAction?: () => void;
  dismissAction?: () => void;
  showDetails?: boolean;
  variant?: 'inline' | 'card' | 'toast' | 'banner';
  severity?: 'error' | 'warning' | 'info';
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  type = 'unknown',
  title,
  retryAction,
  dismissAction,
  showDetails = false,
  variant = 'inline',
  severity = 'error',
  className = '',
}) => {
  if (!error) return null;

  const errorMessage = error instanceof Error ? error.message : error;

  const getErrorConfig = () => {
    const configs = {
      network: {
        icon: '🌐',
        title: 'Lỗi kết nối mạng',
        suggestion: 'Vui lòng kiểm tra kết nối internet và thử lại.',
        canRetry: true,
      },
      validation: {
        icon: '⚠️',
        title: 'Dữ liệu không hợp lệ',
        suggestion: 'Vui lòng kiểm tra lại thông tin đã nhập.',
        canRetry: false,
      },
      authentication: {
        icon: '🔒',
        title: 'Lỗi xác thực',
        suggestion: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.',
        canRetry: false,
      },
      authorization: {
        icon: '🚫',
        title: 'Không có quyền truy cập',
        suggestion: 'Bạn không có quyền thực hiện thao tác này.',
        canRetry: false,
      },
      server: {
        icon: '🔧',
        title: 'Lỗi máy chủ',
        suggestion: 'Có lỗi xảy ra trên máy chủ, vui lòng thử lại sau.',
        canRetry: true,
      },
      file_upload: {
        icon: '📁',
        title: 'Lỗi tải file',
        suggestion: 'Không thể tải file lên, vui lòng kiểm tra định dạng và kích thước file.',
        canRetry: true,
      },
      file_processing: {
        icon: '⚙️',
        title: 'Lỗi xử lý file',
        suggestion: 'Không thể xử lý file, vui lòng thử với file khác.',
        canRetry: true,
      },
      rate_limit: {
        icon: '⏱️',
        title: 'Quá nhiều yêu cầu',
        suggestion: 'Bạn đã gửi quá nhiều yêu cầu, vui lòng đợi một lúc.',
        canRetry: false,
      },
      timeout: {
        icon: '⏰',
        title: 'Hết thời gian chờ',
        suggestion: 'Yêu cầu mất quá nhiều thời gian, vui lòng thử lại.',
        canRetry: true,
      },
      unknown: {
        icon: '❓',
        title: 'Lỗi không xác định',
        suggestion: 'Có lỗi xảy ra, vui lòng thử lại hoặc liên hệ hỗ trợ.',
        canRetry: true,
      },
    };

    return configs[type];
  };

  const getSeverityStyles = () => {
    const styles = {
      error: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        iconColor: 'text-red-400',
        titleColor: 'text-red-800',
        textColor: 'text-red-700',
        buttonBg: 'bg-red-100 hover:bg-red-200',
        buttonText: 'text-red-800',
      },
      warning: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        iconColor: 'text-yellow-400',
        titleColor: 'text-yellow-800',
        textColor: 'text-yellow-700',
        buttonBg: 'bg-yellow-100 hover:bg-yellow-200',
        buttonText: 'text-yellow-800',
      },
      info: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        iconColor: 'text-blue-400',
        titleColor: 'text-blue-800',
        textColor: 'text-blue-700',
        buttonBg: 'bg-blue-100 hover:bg-blue-200',
        buttonText: 'text-blue-800',
      },
    };

    return styles[severity];
  };

  const config = getErrorConfig();
  const styles = getSeverityStyles();
  const displayTitle = title || config.title;

  const renderContent = () => (
    <>
      {/* Icon and Title */}
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${styles.iconColor}`}>
          <span className="text-lg">{config.icon}</span>
        </div>
        <div className="ml-3 flex-1">
          <h3 className={`text-sm font-medium ${styles.titleColor}`}>
            {displayTitle}
          </h3>
          <div className={`mt-2 text-sm ${styles.textColor}`}>
            <p>{errorMessage}</p>
            {config.suggestion && (
              <p className="mt-1 text-xs opacity-80">
                {config.suggestion}
              </p>
            )}
          </div>

          {/* Details */}
          {showDetails && error instanceof Error && (
            <details className="mt-2">
              <summary className={`cursor-pointer text-xs ${styles.textColor} opacity-60`}>
                Chi tiết lỗi
              </summary>
              <pre className={`mt-1 text-xs ${styles.textColor} opacity-60 whitespace-pre-wrap`}>
                {error.stack}
              </pre>
            </details>
          )}

          {/* Actions */}
          {(retryAction || dismissAction) && (
            <div className="mt-3 flex space-x-3">
              {retryAction && config.canRetry && (
                <button
                  onClick={retryAction}
                  className={`
                    inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md
                    ${styles.buttonBg} ${styles.buttonText} transition-colors duration-200
                  `}
                >
                  🔄 Thử lại
                </button>
              )}
              {dismissAction && (
                <button
                  onClick={dismissAction}
                  className={`text-xs ${styles.textColor} opacity-60 hover:opacity-80 transition-opacity`}
                >
                  Đóng
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Close button */}
        {dismissAction && variant !== 'inline' && (
          <div className="ml-auto pl-3">
            <button
              onClick={dismissAction}
              className={`
                inline-flex rounded-md p-1.5 ${styles.iconColor} hover:opacity-60 
                focus:outline-none transition-opacity
              `}
            >
              <span className="sr-only">Đóng</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );

  // Variant-specific rendering
  if (variant === 'toast') {
    return (
      <div className={`
        max-w-sm w-full ${styles.bg} shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 ${className}
      `}>
        <div className="p-4">
          {renderContent()}
        </div>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`${styles.bg} ${styles.border} border-l-4 p-4 ${className}`}>
        {renderContent()}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`
        ${styles.bg} ${styles.border} border rounded-lg p-4 shadow-sm ${className}
      `}>
        {renderContent()}
      </div>
    );
  }

  // Default inline variant
  return (
    <div className={`${styles.bg} rounded-md p-4 ${className}`}>
      {renderContent()}
    </div>
  );
};

// Helper component for API errors
export const APIErrorMessage: React.FC<{
  error: any;
  retryAction?: () => void;
  className?: string;
}> = ({ error, retryAction, className }) => {
  const getErrorType = (error: any): ErrorType => {
    if (!error) return 'unknown';
    
    const status = error.response?.status;
    const message = error.message?.toLowerCase() || '';

    if (status === 401) return 'authentication';
    if (status === 403) return 'authorization';
    if (status === 429) return 'rate_limit';
    if (status >= 500) return 'server';
    if (status >= 400 && status < 500) return 'validation';
    if (message.includes('network') || message.includes('fetch')) return 'network';
    if (message.includes('timeout')) return 'timeout';
    
    return 'unknown';
  };

  const errorType = getErrorType(error);
  const errorMessage = error?.response?.data?.detail || error?.message || 'Có lỗi xảy ra';

  return (
    <ErrorMessage
      error={errorMessage}
      type={errorType}
      retryAction={retryAction}
      variant="card"
      className={className}
    />
  );
};

// Hook for handling errors in components
export const useErrorHandler = () => {
  const [error, setError] = React.useState<any>(null);

  const handleError = React.useCallback((error: any) => {
    console.error('Error occurred:', error);
    setError(error);
  }, []);

  const clearError = React.useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError,
  };
};

export default ErrorMessage;
