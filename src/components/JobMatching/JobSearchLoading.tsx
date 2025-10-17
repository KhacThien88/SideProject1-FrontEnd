import React from 'react';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { cn } from '../../utils/cn';

interface JobCardSkeletonProps {
  className?: string;
}

export const JobCardSkeleton: React.FC<JobCardSkeletonProps> = ({ className }) => {
  return (
    <div className={cn("p-6 bg-white border border-neutral-200 rounded-lg animate-pulse", className)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-5 bg-neutral-200 rounded w-48"></div>
            <div className="h-4 bg-neutral-200 rounded w-16"></div>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <div className="h-4 bg-neutral-200 rounded w-32"></div>
            <div className="h-4 bg-neutral-200 rounded w-24"></div>
            <div className="h-4 bg-neutral-200 rounded w-20"></div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="h-8 bg-neutral-200 rounded-full w-20"></div>
          <div className="h-3 bg-neutral-200 rounded w-16"></div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-neutral-200 rounded w-full"></div>
        <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="h-4 bg-neutral-200 rounded w-32"></div>
        <div className="h-4 bg-neutral-200 rounded w-24"></div>
        <div className="h-4 bg-neutral-200 rounded w-28"></div>
        <div className="h-4 bg-neutral-200 rounded w-20"></div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <div className="h-4 bg-neutral-200 rounded w-24 mb-2"></div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-6 bg-neutral-200 rounded-full w-16"></div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <div className="flex items-center gap-2">
          <div className="h-8 bg-neutral-200 rounded w-24"></div>
          <div className="h-8 bg-neutral-200 rounded w-20"></div>
        </div>
        <div className="h-8 bg-neutral-200 rounded w-16"></div>
      </div>
    </div>
  );
};

interface JobSearchLoadingProps {
  count?: number;
  className?: string;
}

export const JobSearchLoading: React.FC<JobSearchLoadingProps> = ({ 
  count = 6, 
  className 
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Loading header */}
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <div className="text-neutral-600">Searching for matching jobs...</div>
          <div className="text-sm text-neutral-500 mt-1">This may take a few moments</div>
        </div>
      </div>
      
      {/* Skeleton cards */}
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

interface FiltersSidebarSkeletonProps {
  className?: string;
}

export const FiltersSidebarSkeleton: React.FC<FiltersSidebarSkeletonProps> = ({ className }) => {
  return (
    <div className={cn("bg-white border border-neutral-200 rounded-lg animate-pulse", className)}>
      {/* Header */}
      <div className="p-4 border-b border-neutral-200">
        <div className="h-6 bg-neutral-200 rounded w-16"></div>
      </div>
      
      {/* Filter sections */}
      <div className="divide-y divide-neutral-200">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-4">
            <div className="h-5 bg-neutral-200 rounded w-24 mb-3"></div>
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-neutral-200 rounded"></div>
                  <div className="h-4 bg-neutral-200 rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSearchLoading;