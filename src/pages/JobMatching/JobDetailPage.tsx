import React, { useState, useMemo } from 'react';
import { JobDetailView } from './JobDetailView';
import type { JobMatchResult, Job } from '../../types/jobMatching';
import { 
  generateMockJobs, 
  generateMockJobMatchResults 
} from '../../utils/jobMatchingUtils';
import { useToast } from '../../contexts/ToastContext';

interface JobDetailPageProps {
  jobId?: string;
  jobMatchResult?: JobMatchResult;
  onBack?: () => void;
  className?: string;
}

export const JobDetailPage: React.FC<JobDetailPageProps> = ({
  jobId,
  jobMatchResult: providedJobResult,
  onBack,
  className
}) => {
  const { showSuccessToast, showInfoToast } = useToast();
  
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);

  // Use provided job result or generate mock data
  const { jobMatchResult, isLoading } = useMemo(() => {
    if (providedJobResult) {
      return { jobMatchResult: providedJobResult, isLoading: false };
    }
    
    if (!jobId) return { jobMatchResult: null, isLoading: false };
    
    // Generate mock jobs and find the one with matching ID
    const mockJobs = generateMockJobs(20);
    const mockResults = generateMockJobMatchResults(mockJobs);
    
    const result = mockResults.find(r => r.job.id === jobId);
    
    return {
      jobMatchResult: result || null,
      isLoading: false
    };
  }, [jobId, providedJobResult]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // Default behavior - could emit an event or use history API
      window.history.back();
    }
  };

  const handleJobSave = (job: Job) => {
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
  };

  const handleJobApply = () => {
    const job = jobMatchResult?.job;
    if (job) {
      // In real app, this would open application form or redirect to external URL
      if (job.applicationUrl) {
        window.open(job.applicationUrl, '_blank');
      } else {
        showInfoToast('Application', 'Opening application form...');
      }
    }
  };

  const handleJobShare = (job: Job) => {
    const shareData = {
      title: `${job.title} at ${job.company.name}`,
      text: `Check out this job opportunity: ${job.title} at ${job.company.name}`,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData);
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      showSuccessToast('Link copied', 'Job link copied to clipboard');
    }
  };

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <div className="text-neutral-600">Loading job details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!jobMatchResult) {
    return (
      <div className="py-8">
        <div className="text-center py-12">
          <div className="text-6xl text-neutral-300 mb-4">🔍</div>
          <div className="text-2xl font-bold text-neutral-900 mb-2">Job Not Found</div>
          <div className="text-neutral-600 mb-6">
            The job you're looking for doesn't exist or has been removed.
          </div>
          <button
            onClick={handleBack}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <JobDetailView
        jobMatchResult={jobMatchResult}
        onBack={handleBack}
        onSave={handleJobSave}
        onApply={handleJobApply}
        onShare={handleJobShare}
        isSaved={savedJobIds.includes(jobMatchResult.job.id)}
      />
    </div>
  );
};