import React from 'react';
import { BookmarkMinus } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { formatSalary } from '../../../utils/jobMatchingUtils';
import type { Job } from '../../../types/jobMatching';

interface JobFiltersState {
  jobTypes: Job['type'][];
  locations: string[];
  remoteOnly: boolean;
  minMatchScore: number;
  maxMatchScore: number;
  minSalary?: number;
  maxSalary?: number;
}

interface SavedJobsFiltersProps {
  filters: JobFiltersState;
  setFilters: React.Dispatch<React.SetStateAction<JobFiltersState>>;
  hasActiveFilters: boolean;
  clearFilters: () => void;
  uniqueJobTypes: Job['type'][];
  uniqueLocations: string[];
  getContent: (key: string) => string;
}

export const SavedJobsFilters: React.FC<SavedJobsFiltersProps> = ({
  filters,
  setFilters,
  hasActiveFilters,
  clearFilters,
  uniqueJobTypes,
  uniqueLocations,
  getContent,
}) => {
  return (
    <Card className="p-6 space-y-6 animate-slide-down">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          {getContent('savedJobs.filters')}
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary-50 transition-all"
          >
            <BookmarkMinus className="w-4 h-4" />
            {getContent('savedJobs.clearFilters')}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Match Score Filter */}
        <div className="bg-white rounded-xl p-4 border border-neutral-200 hover:border-primary-300 transition-all">
          <label className="block text-sm font-semibold text-neutral-800 mb-3">
            {getContent('savedJobs.filterMatchScore')}
          </label>
          <div className="text-center mb-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {filters.minMatchScore}% - {filters.maxMatchScore}%
            </span>
          </div>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="100"
              value={filters.minMatchScore}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, minMatchScore: Number(e.target.value) }))
              }
              className="w-full accent-primary-500"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={filters.maxMatchScore}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxMatchScore: Number(e.target.value) }))
              }
              className="w-full accent-secondary-500"
            />
          </div>
        </div>

        {/* Salary Filter */}
        <div className="bg-white rounded-xl p-4 border border-neutral-200 hover:border-primary-300 transition-all">
          <label className="block text-sm font-semibold text-neutral-800 mb-3">
            {getContent('savedJobs.filterSalary')}
          </label>
          <div className="text-center mb-3">
            <span className="text-lg font-semibold text-neutral-800">
              {filters.minSalary
                ? formatSalary(filters.minSalary, undefined, 'USD')
                : getContent('savedJobs.salaryAny')}{' '}
              -{' '}
              {filters.maxSalary
                ? formatSalary(undefined, filters.maxSalary, 'USD')
                : getContent('savedJobs.salaryAny')}
            </span>
          </div>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="200000"
              step="5000"
              value={filters.minSalary ?? 0}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  minSalary: Number(e.target.value) || undefined,
                }))
              }
              className="w-full accent-primary-500"
            />
            <input
              type="range"
              min="0"
              max="200000"
              step="5000"
              value={filters.maxSalary ?? 0}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  maxSalary: Number(e.target.value) || undefined,
                }))
              }
              className="w-full accent-secondary-500"
            />
          </div>
        </div>

        {/* Job Type Filter */}
        <div className="bg-white rounded-xl p-4 border border-neutral-200 hover:border-primary-300 transition-all">
          <label className="block text-sm font-semibold text-neutral-800 mb-3">
            {getContent('savedJobs.filterJobType')}
          </label>
          <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
            {uniqueJobTypes.map((type) => (
              <label key={type} className="flex items-center gap-2 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  checked={filters.jobTypes.includes(type)}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      jobTypes: e.target.checked
                        ? [...prev.jobTypes, type]
                        : prev.jobTypes.filter((item) => item !== type),
                    }))
                  }
                />
                <span className="capitalize">{type.replace('-', ' ')}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div className="bg-white rounded-xl p-4 border border-neutral-200 hover:border-primary-300 transition-all">
          <label className="block text-sm font-semibold text-neutral-800 mb-3">
            {getContent('savedJobs.filterLocation')}
          </label>
          <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
            {uniqueLocations.map((location) => (
              <label key={location} className="flex items-center gap-2 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  checked={filters.locations.includes(location)}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      locations: e.target.checked
                        ? [...prev.locations, location]
                        : prev.locations.filter((item) => item !== location),
                    }))
                  }
                />
                <span>{location}</span>
              </label>
            ))}
          </div>

          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mt-4">
            <input
              type="checkbox"
              className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              checked={filters.remoteOnly}
              onChange={(e) => setFilters((prev) => ({ ...prev, remoteOnly: e.target.checked }))}
            />
            {getContent('savedJobs.filterRemoteOnly')}
          </label>
        </div>
      </div>
    </Card>
  );
};
