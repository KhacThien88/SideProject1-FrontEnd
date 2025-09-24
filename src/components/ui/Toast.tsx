import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ToastProps {
  id: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose?: (id: string) => void;
}

const typeConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-success-50 border-success-200',
    iconColor: 'text-success-600',
    titleColor: 'text-success-800',
    messageColor: 'text-success-700',
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-error-50 border-error-200',
    iconColor: 'text-error-600',
    titleColor: 'text-error-800',
    messageColor: 'text-error-700',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-warning-50 border-warning-200',
    iconColor: 'text-warning-600',
    titleColor: 'text-warning-800',
    messageColor: 'text-warning-700',
  },
  info: {
    icon: Info,
    bgColor: 'bg-info-50 border-info-200',
    iconColor: 'text-info-600',
    titleColor: 'text-info-800',
    messageColor: 'text-info-700',
  },
};

export const Toast: React.FC<ToastProps> = ({
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const config = typeConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.(id);
    }, 300);
  };

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ease-out',
        isVisible
          ? 'translate-x-0 opacity-100 scale-100'
          : 'translate-x-full opacity-0 scale-95'
      )}
    >
      <div
        className={cn(
          'p-4 rounded-xl border shadow-soft-lg backdrop-blur-sm glass-effect',
          config.bgColor
        )}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Icon className={cn('w-5 h-5', config.iconColor)} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className={cn('text-sm font-semibold', config.titleColor)}>
              {title}
            </h4>
            {message && (
              <p className={cn('mt-1 text-sm', config.messageColor)}>
                {message}
              </p>
            )}
          </div>
          
          <button
            onClick={handleClose}
            className={cn(
              'flex-shrink-0 p-1 rounded-lg transition-colors duration-200 hover:bg-black/5',
              config.iconColor
            )}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;