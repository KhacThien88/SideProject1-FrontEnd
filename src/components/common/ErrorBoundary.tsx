import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { errorMonitor } from '@/utils/errorMonitoring';

interface Props {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, errorInfo: ErrorInfo) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  level?: 'fatal' | 'error' | 'warning';
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });

    errorMonitor.captureError(error, {
      component: errorInfo.componentStack?.split('\n')[1]?.trim(),
      page: window.location.pathname,
      metadata: {
        componentStack: errorInfo.componentStack,
      },
    });

    this.props.onError?.(error, errorInfo);

    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary] Error caught:', error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error, this.state.errorInfo!);
      }

      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">
              Đã xảy ra lỗi
            </h2>

            <p className="text-gray-600 text-center mb-4">
              Chúng tôi xin lỗi vì sự bất tiện này. Đã có lỗi xảy ra trong ứng dụng.
            </p>

            {import.meta.env.DEV && (
              <div className="bg-gray-100 rounded p-3 mb-4 overflow-auto max-h-40">
                <p className="text-sm font-mono text-red-600 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Thử lại
              </button>

              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface FeatureErrorBoundaryProps {
  children: ReactNode;
  featureName: string;
  fallbackMessage?: string;
}

export const FeatureErrorBoundary: React.FC<FeatureErrorBoundaryProps> = ({
  children,
  featureName,
  fallbackMessage,
}) => {
  return (
    <ErrorBoundary
      level="error"
      onError={(_error) => {
        // Feature tag set via context
      }}
      fallback={
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-yellow-600 mt-0.5 mr-3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-yellow-800">
                Tính năng tạm thời không khả dụng
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                {fallbackMessage || `Chức năng "${featureName}" hiện không khả dụng. Vui lòng thử lại sau.`}
              </p>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundary;
