import React, { useState, useCallback } from 'react';
import { Container } from '../../components/common/Container';
import { JobMatchingResults } from './JobMatchingResults';
import { JobDetailView } from './JobDetailView';
import { JobFilters } from '../../components/JobMatching/JobFilters';
import type { JobSearchFilters, Job } from '../../types/jobMatching';
import { useToast } from '../../contexts/ToastContext';

type ViewMode = 'search' | 'detail';

export const JobMatching: React.FC = () => {
  const { showSuccessToast, showInfoToast } = useToast();
  
  const [viewMode, setViewMode] = useState<ViewMode>('search');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobSearchFilters>({});
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleFiltersChange = useCallback((newFilters: JobSearchFilters) => {
    setFilters(newFilters);
  }, []);

  const handleJobSave = useCallback((job: Job) => {
    setSavedJobIds(prev => {
      const isAlreadySaved = prev.includes(job.id);
      if (isAlreadySaved) {
        showInfoToast('Job removed', `${job.title} removed from saved jobs`);
        return prev.filter(id => id !== job.id);
      } else {
        showSuccessToast('Job saved', `${job.title} added to saved jobs`);
        return [...prev, job.id];
      }
    });
  }, [showSuccessToast, showInfoToast]);

  const handleJobApply = useCallback((jobId: string) => {
    // In a real app, this would redirect to application page or open external URL
    showInfoToast('Application', 'Redirecting to application page...');
    console.log('Applying to job:', jobId);
  }, [showInfoToast]);

  const handleJobShare = useCallback((job: Job) => {
    // In a real app, this would open share modal or copy to clipboard
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job at ${job.company.name}: ${job.title}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showSuccessToast('Link copied', 'Job link copied to clipboard');
    }
  }, [showSuccessToast]);

  const handleJobViewDetails = useCallback((jobId: string) => {
    setSelectedJobId(jobId);
    setViewMode('detail');
  }, []);

  const handleBackToResults = useCallback(() => {
    setViewMode('search');
    setSelectedJobId(null);
  }, []);

  return (
    <Container className="py-8">
      <div className="w-full mx-auto">
        {viewMode === 'search' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-4">
                <JobFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                />
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              <JobMatchingResults
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onJobSave={handleJobSave}
                onJobApply={handleJobApply}
                onJobShare={handleJobShare}
                onJobViewDetails={handleJobViewDetails}
                savedJobIds={savedJobIds}
              />
            </div>
          </div>
        ) : (
          <JobDetailView
            jobId={selectedJobId || undefined}
            onBack={handleBackToResults}
            onSave={handleJobSave}
            onApply={handleJobApply}
            onShare={handleJobShare}
            isSaved={selectedJobId ? savedJobIds.includes(selectedJobId) : false}
          />
        )}

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden fixed bottom-4 right-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-2a2 2 0 011-1.732l1 1.732m-2 0L9 19.732m1-1.732L10 18m-2.732-1L7 16m0 0l1 1.732L8 18m0 0L9 19.732M8 18L7 16" />
            </svg>
          </button>
        </div>
      </div>
    </Container>
  );
};