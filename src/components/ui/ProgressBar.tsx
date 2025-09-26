import React from 'react';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  label?: string;
  className?: string;
  animated?: boolean;
  striped?: boolean;
}

const sizeClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

const variantClasses = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
  secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600',
  accent: 'bg-gradient-to-r from-accent-500 to-accent-600',
  success: 'bg-gradient-to-r from-success-500 to-success-600',
  warning: 'bg-gradient-to-r from-warning-500 to-warning-600',
  error: 'bg-gradient-to-r from-error-500 to-error-600',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = 'md',
  variant = 'primary',
  showLabel = false,
  label,
  className,
  animated = false,
  striped = false,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-neutral-700">
            {label || 'Progress'}
          </span>
          <span className="text-sm text-neutral-500">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div
        className={cn(
          'w-full bg-neutral-200 rounded-full overflow-hidden shadow-inner',
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden',
            variantClasses[variant],
            animated && 'animate-pulse',
            striped && 'bg-stripes'
          )}
          style={{ width: `${percentage}%` }}
        >
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;