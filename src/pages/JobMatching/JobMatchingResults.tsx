import React, { useState, useMemo, useCallback } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { JobCard } from '../../components/JobMatching/JobCard';
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Grid, 
  List,
  Download,
  RefreshCw
} from 'lucide-react';
import type { 
  JobMatchResult, 
  JobSearchFilters, 
  Job
} from '../../types/jobMatching';
import { 
  sortJobs, 
  paginateResults, 
  generateMockJobs, 
  generateMockJobMatchResults 
} from '../../utils/jobMatchingUtils';
import { cn } from '../../utils/cn';

interface JobMatchingResultsProps {
  searchResults?: JobMatchResult[];
  filters?: JobSearchFilters;
  isLoading?: boolean;
  onFiltersChange?: (filters: JobSearchFilters) => void;
  onJobSave?: (job: Job) => void;
  onJobApply?: (jobId: string) => void;
  onJobShare?: (job: Job) => void;
  onJobViewDetails?: (jobId: string) => void;
  savedJobIds?: string[];
  className?: string;
}

export const JobMatchingResults: React.FC<JobMatchingResultsProps> = ({
  searchResults,
  filters = {},
  isLoading = false,
  onFiltersChange,
  onJobSave = () => {},
  onJobApply = () => {},
  onJobShare = () => {},
  onJobViewDetails = () => {},
  savedJobIds = [],
  className
}) => {
  // Mock data for development - replace with actual data
  const mockJobs = useMemo(() => generateMockJobs(50), []);
  const mockResults = useMemo(() => generateMockJobMatchResults(mockJobs), [mockJobs]);
  const results = searchResults || mockResults;

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<JobSearchFilters['sortBy']>('relevance');
  const [sortOrder, setSortOrder] = useState<JobSearchFilters['sortOrder']>('desc');
  const [showFilters, setShowFilters] = useState(false);

  const resultsPerPage = 20;

  // Sort and paginate results
  const { paginatedResults, pagination } = useMemo(() => {
    const sorted = sortJobs(results, sortBy, sortOrder);
    const paginated = paginateResults(sorted, currentPage, resultsPerPage);
    
    return {
      paginatedResults: paginated.jobs,
      pagination: paginated.pagination
    };
  }, [results, sortBy, sortOrder, currentPage]);

  const handleSortChange = useCallback((newSortBy: JobSearchFilters['sortBy']) => {
    if (newSortBy === sortBy) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  }, [sortBy]);

  const handleExportResults = useCallback(() => {
    // Implementation for exporting results
    console.log('Exporting results...');
  }, []);

  const handleRefreshResults = useCallback(() => {
    // Implementation for refreshing results
    console.log('Refreshing results...');
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <div className="text-neutral-600">Searching for matching jobs...</div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Search className="w-10 h-10 text-primary-600" />
        </div>
        <div className="text-xl font-semibold text-neutral-900 mb-2">No Jobs Found</div>
        <div className="text-neutral-600 mb-4">
          We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.
        </div>
        <Button
          variant="primary"
          onClick={() => onFiltersChange?.({})}
          className="mt-4"
        >
          Clear All Filters
        </Button>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Search Results Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="text-2xl font-bold text-neutral-900">Job Search Results</div>
          <div className="text-neutral-600 mt-1">
            Found {results.length} job{results.length !== 1 ? 's' : ''} matching your profile
            {filters.keywords && (
              <span> for "<span className="font-medium">{filters.keywords}</span>"</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="tertiary"
            size="sm"
            onClick={handleRefreshResults}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          
          <Button
            variant="tertiary"
            size="sm"
            onClick={handleExportResults}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Controls Bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left side - Filters */}
          <div className="flex items-center gap-3">
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            
            {/* Active filters display */}
            {Object.keys(filters).length > 0 && (
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <span>{Object.keys(filters).length} filter{Object.keys(filters).length !== 1 ? 's' : ''} applied</span>
                {onFiltersChange && (
                  <button
                    onClick={() => onFiltersChange({})}
                    className="text-primary-600 hover:text-primary-700 underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right side - Sort and View */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as JobSearchFilters['sortBy'])}
                className="text-sm border border-neutral-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="relevance">Relevance</option>
                <option value="match-score">Match Score</option>
                <option value="date">Date Posted</option>
                <option value="salary">Salary</option>
              </select>
              
              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="p-1 hover:bg-neutral-100 rounded"
              >
                {sortOrder === 'asc' ? (
                  <SortAsc className="w-4 h-4 text-neutral-600" />
                ) : (
                  <SortDesc className="w-4 h-4 text-neutral-600" />
                )}
              </button>
            </div>
            
            <div className="flex items-center border border-neutral-300 rounded-md">
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 hover:bg-neutral-100",
                  viewMode === 'list' && "bg-primary-100 text-primary-600"
                )}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 hover:bg-neutral-100",
                  viewMode === 'grid' && "bg-primary-100 text-primary-600"
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Job Results */}
      <div className={cn(
        viewMode === 'grid' 
          ? "grid grid-cols-1 lg:grid-cols-2 gap-6" 
          : "space-y-4"
      )}>
        {paginatedResults.map((jobResult) => (
          <JobCard
            key={jobResult.job.id}
            job={jobResult}
            onSave={onJobSave}
            onApply={onJobApply}
            onShare={onJobShare}
            onViewDetails={onJobViewDetails}
            isSaved={savedJobIds.includes(jobResult.job.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-neutral-600">
              Showing {((currentPage - 1) * resultsPerPage) + 1} to {Math.min(currentPage * resultsPerPage, pagination.totalCount)} of {pagination.totalCount} results
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="tertiary"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={!pagination.hasPreviousPage}
              >
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(
                    pagination.totalPages - 4,
                    Math.max(1, currentPage - 2)
                  )) + i;
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={cn(
                        "w-8 h-8 text-sm rounded-md",
                        pageNum === currentPage
                          ? "bg-primary-600 text-white"
                          : "hover:bg-neutral-100 text-neutral-600"
                      )}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <Button
                variant="tertiary"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                disabled={!pagination.hasNextPage}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};