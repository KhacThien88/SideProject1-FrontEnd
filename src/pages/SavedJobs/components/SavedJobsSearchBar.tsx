import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

interface SavedJobsSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showFilters: boolean;
  toggleFilters: () => void;
  hasActiveFilters: boolean;
  sortOption: string;
  setSortOption: (option: any) => void;
  getContent: (key: string) => string;
}

export const SavedJobsSearchBar: React.FC<SavedJobsSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  showFilters,
  toggleFilters,
  hasActiveFilters,
  sortOption,
  setSortOption,
  getContent,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          placeholder={getContent('savedJobs.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant={showFilters || hasActiveFilters ? 'secondary' : 'tertiary'}
          onClick={toggleFilters}
          className={cn(
            'flex items-center gap-2 relative',
            showFilters || hasActiveFilters
              ? 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white border-transparent shadow-md'
              : ''
          )}
        >
          <Filter className="w-5 h-5" />
          {getContent('savedJobs.filters')}
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
          )}
        </Button>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-3 border border-neutral-300 rounded-xl bg-white font-medium text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:border-primary-300 hover:bg-primary-50/30 cursor-pointer shadow-sm"
        >
          <option value="matchScore">{getContent('savedJobs.sort.matchScore')}</option>
          <option value="recent">{getContent('savedJobs.sort.recent')}</option>
          <option value="salaryHigh">{getContent('savedJobs.sort.salaryHigh')}</option>
          <option value="salaryLow">{getContent('savedJobs.sort.salaryLow')}</option>
          <option value="company">{getContent('savedJobs.sort.company')}</option>
        </select>
      </div>
    </div>
  );
};
