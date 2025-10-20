import React from 'react';

// Mini loading spinner for inline use
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div className="inline-flex items-center justify-center">
      <div className={`${sizeClasses[size]} border-primary-200 border-t-primary-600 rounded-full animate-spin`}></div>
    </div>
  );
};

// Page loading with custom message
export const PageLoading: React.FC<{ message?: string }> = ({ 
  message = 'Đang tải dữ liệu...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-primary-600 border-r-secondary-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="text-sm text-neutral-600 font-medium">{message}</p>
    </div>
  );
};

// Section loading (for partial page updates)
export const SectionLoading: React.FC<{ message?: string; height?: string }> = ({ 
  message = 'Đang tải...', 
  height = '400px' 
}) => {
  return (
    <div 
      className="flex flex-col items-center justify-center space-y-4 bg-gradient-to-br from-neutral-50/50 to-primary-50/20 rounded-xl"
      style={{ minHeight: height }}
    >
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-primary-600 border-r-secondary-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="text-sm text-neutral-600 font-medium">{message}</p>
    </div>
  );
};

// Button loading state
export const ButtonLoading: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <LoadingSpinner size="sm" />
      <span>Đang xử lý...</span>
    </div>
  );
};

// Skeleton loading for lists
export const SkeletonList: React.FC<{ items?: number }> = ({ items = 3 }) => {
  return (
    <div className="space-y-4">
      {[...Array(items)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="flex space-x-4">
            <div className="w-12 h-12 bg-neutral-200 rounded-lg"></div>
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
              <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Card skeleton loading
export const SkeletonCard: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4">
        <div className="h-6 bg-neutral-200 rounded w-1/3"></div>
        <div className="space-y-3">
          <div className="h-4 bg-neutral-200 rounded"></div>
          <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
          <div className="h-4 bg-neutral-200 rounded w-4/6"></div>
        </div>
        <div className="flex space-x-2 pt-2">
          <div className="h-8 w-20 bg-neutral-200 rounded"></div>
          <div className="h-8 w-20 bg-neutral-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};
