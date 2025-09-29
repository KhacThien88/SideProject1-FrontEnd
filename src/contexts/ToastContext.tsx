import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from '../components/ui/Toast';
import type { ToastProps } from '../components/ui/Toast';

interface ToastContextType {
  showToast: (toast: Omit<ToastProps, 'id' | 'onClose'>) => string;
  hideToast: (id: string) => void;
  showErrorToast: (title: string, message?: string, duration?: number) => string;
  showSuccessToast: (title: string, message?: string, duration?: number) => string;
  showWarningToast: (title: string, message?: string, duration?: number) => string;
  showInfoToast: (title: string, message?: string, duration?: number) => string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastWithId extends ToastProps {
  id: string;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastWithId[]>([]);

  const showToast = useCallback((toast: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastWithId = {
      ...toast,
      id,
      onClose: (toastId: string) => hideToast(toastId),
    };

    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showErrorToast = useCallback((title: string, message?: string, duration = 4000) => {
    return showToast({
      type: 'error',
      title,
      message,
      duration,
    });
  }, [showToast]);

  const showSuccessToast = useCallback((title: string, message?: string, duration = 2000) => {
    return showToast({
      type: 'success',
      title,
      message,
      duration,
    });
  }, [showToast]);

  const showWarningToast = useCallback((title: string, message?: string, duration = 3000) => {
    return showToast({
      type: 'warning',
      title,
      message,
      duration,
    });
  }, [showToast]);

  const showInfoToast = useCallback((title: string, message?: string, duration = 3000) => {
    return showToast({
      type: 'info',
      title,
      message,
      duration,
    });
  }, [showToast]);

  const contextValue: ToastContextType = {
    showToast,
    hideToast,
    showErrorToast,
    showSuccessToast,
    showWarningToast,
    showInfoToast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            style={{
              transform: `translateY(${index * 4}px)`,
              zIndex: 50 - index,
            }}
          >
            <Toast {...toast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};