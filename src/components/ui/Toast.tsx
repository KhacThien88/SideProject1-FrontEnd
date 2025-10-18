import React, { useEffect, useState, useRef } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ToastProps {
  id: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose?: (id: string) => void;
  pauseOnHover?: boolean;
  showProgress?: boolean;
}

const typeConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50 border-l-4 border-l-green-500 shadow-lg',
    iconColor: 'text-green-500',
    titleColor: 'text-green-800',
    messageColor: 'text-green-700',
    progressColor: 'bg-green-500',
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-red-50 border-l-4 border-l-red-500 shadow-lg',
    iconColor: 'text-red-500',
    titleColor: 'text-red-800',
    messageColor: 'text-red-700',
    progressColor: 'bg-red-500',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50 border-l-4 border-l-yellow-500 shadow-lg',
    iconColor: 'text-yellow-500',
    titleColor: 'text-yellow-800',
    messageColor: 'text-yellow-700',
    progressColor: 'bg-yellow-500',
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50 border-l-4 border-l-blue-500 shadow-lg',
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-800',
    messageColor: 'text-blue-700',
    progressColor: 'bg-blue-500',
  },
};

export const Toast: React.FC<ToastProps> = ({
  id,
  type = 'info',
  title,
  message,
  duration = 3000,
  onClose,
  pauseOnHover = true,
  showProgress = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(duration);

  const config = typeConfig[type];
  const Icon = config.icon;

  const startTimer = () => {
    if (duration <= 0) return;
    
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      handleClose();
    }, remainingTimeRef.current);
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
    }
  };



  useEffect(() => {
    if (!isPaused) {
      startTimer();
    } else {
      pauseTimer();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPaused, duration]);

  // Progress bar animation
  useEffect(() => {
    if (!showProgress || duration <= 0) return;

    let animationId: number | null = null;
    const startTime = Date.now();
    
    const animateProgress = () => {
      if (isPaused) {
        // Continue animation loop even when paused
        animationId = requestAnimationFrame(animateProgress);
        return;
      }
      
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      const progressPercent = (remaining / duration) * 100;
      
      setProgress(progressPercent);
      
      if (remaining > 0 && isVisible) {
        animationId = requestAnimationFrame(animateProgress);
      }
    };
    
    // Start animation immediately
    animateProgress();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [duration, showProgress, isVisible]); // Removed isPaused from dependencies

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.(id);
    }, 300);
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  return (
    <div
      className={cn(
        'max-w-sm w-full transform transition-all duration-300 ease-out mb-4',
        isVisible
          ? 'translate-x-0 opacity-100 scale-100'
          : 'translate-x-full opacity-0 scale-95'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn(
          'relative p-4 rounded-lg bg-white border overflow-hidden',
          config.bgColor
        )}
      >
        <div className="flex items-center justify-start space-x-3 mb-2">
          <div className="flex-shrink-0">
            <Icon className={cn('w-5 h-5', config.iconColor)} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className={cn('text-sm font-medium leading-5', config.titleColor)}>
              {title}
            </div>
            {message && (
              <div className={cn('text-sm leading-4', config.messageColor)}>
                {message}
              </div>
            )}
          </div>
          
          <button
            onClick={handleClose}
            className={cn(
              'flex-shrink-0 p-1 rounded-md transition-colors duration-200 hover:bg-gray-100',
              'text-gray-400 hover:text-gray-600'
            )}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Progress Bar */}
        {showProgress && duration > 0 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
            <div
              className={cn('h-full transition-all duration-100 linear', config.progressColor)}
              style={{
                width: `${progress}%`,
                transition: isPaused ? 'none' : 'width 100ms linear'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Toast;