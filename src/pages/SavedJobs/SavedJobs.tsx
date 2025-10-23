import React, { useEffect, useMemo, useState } from 'react';
import { BookmarkMinus } from 'lucide-react';
import { DashboardSidebar } from '../../components/layout/DashboardSidebar';
import { DashboardHeader } from '../../components/layout/DashboardHeader';
import { Button } from '../../components/ui/Button';
import { JobCard } from '../../components/JobMatching/JobCard';
import { useTranslation } from '../../hooks/useTranslation';
import { useToast } from '../../contexts/ToastContext';
import { savedJobsService } from '../../services/api/jobs/savedJobsService';
import type { SavedJobItem, Job } from '../../types/jobMatching';
import { useRouter } from '../../components/Router';

// Import extracted components
import { SavedJobsSearchBar } from './components/SavedJobsSearchBar';
import { SavedJobsFilters } from './components/SavedJobsFilters';
import { SavedJobsEmptyState } from './components/SavedJobsEmptyState';
import Footer from '../../components/layout/Footer';

interface JobFiltersState {
  jobTypes: Job['type'][];
  locations: string[];
  remoteOnly: boolean;
  minMatchScore: number;
  maxMatchScore: number;
  minSalary?: number;
  maxSalary?: number;
}

export const SavedJobs: React.FC = () => {
  const { getContent } = useTranslation();
  const { showSuccessToast, showErrorToast, showInfoToast } = useToast();
  const { navigate } = useRouter();

  const [savedJobs, setSavedJobs] = useState<SavedJobItem[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<SavedJobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<JobFiltersState>({
    jobTypes: [],
    locations: [],
    remoteOnly: false,
    minMatchScore: 0,
    maxMatchScore: 100,
    minSalary: undefined,
    maxSalary: undefined,
  });

  const [sortOption, setSortOption] = useState<'matchScore' | 'recent' | 'salaryHigh' | 'salaryLow' | 'company'>('matchScore');

  useEffect(() => {
    loadSavedJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [savedJobs, searchQuery, filters, sortOption]);

  const loadSavedJobs = async () => {
    try {
      setLoading(true);
      const response = await savedJobsService.getSavedJobs();
      
      // Convert API response to component state format
      const jobs: SavedJobItem[] = response.saved_jobs.map(savedJob => ({
        job: {
          id: savedJob.job_id,
          title: savedJob.job_info.title,
          company: {
            id: 'unknown',
            name: savedJob.job_info.company,
            logo: undefined,
            size: undefined,
            industry: undefined,
            location: undefined,
          },
          description: savedJob.job_info.description,
          shortDescription: undefined,
          requirements: {
            essential: [],
            preferred: [],
            experience: '',
            education: undefined,
          },
          benefits: [],
          location: {
            city: savedJob.job_info.location,
            country: 'Unknown',
            remote: false,
            hybrid: undefined,
          },
          salary: savedJob.job_info.salary_range ? {
            min: savedJob.job_info.salary_range.min,
            max: savedJob.job_info.salary_range.max,
            currency: savedJob.job_info.salary_range.currency,
            period: 'yearly' as const,
          } : {
            min: undefined,
            max: undefined,
            currency: 'USD',
            period: 'yearly' as const,
          },
          type: savedJob.job_info.job_type as any,
          postedDate: savedJob.saved_at,
          deadline: undefined,
          applicationUrl: undefined,
          tags: savedJob.tags || [],
          skills: [],
        },
        matchScore: 0, // Default value since not provided in API
        skillsMatch: {
          matched: [],
          missing: [],
          percentage: 0,
        },
        experienceMatch: {
          score: 0,
          analysis: '',
        },
        locationMatch: {
          score: 0,
          distance: undefined,
        },
        salaryMatch: {
          score: 0,
          comparison: 'within' as const,
        },
        overallAnalysis: '',
        recommendationLevel: 'medium' as const,
        savedAt: savedJob.saved_at,
        isSaved: true,
        notes: savedJob.notes,
        userTags: savedJob.tags,
      }));
      
      setSavedJobs(jobs);
    } catch (error) {
      console.error('Error loading saved jobs:', error);
      showErrorToast(getContent('savedJobs.errors.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let results = [...savedJobs];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter((item) => {
        const { job } = item;
        return (
          job.title.toLowerCase().includes(query) ||
          job.company.name.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.skills.some((skill) => skill.toLowerCase().includes(query)) ||
          job.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      });
    }

    if (filters.jobTypes.length > 0) {
      results = results.filter((item) => filters.jobTypes.includes(item.job.type));
    }

    if (filters.locations.length > 0) {
      results = results.filter((item) => {
        const locationLabel = `${item.job.location.city}, ${item.job.location.country}`;
        return filters.locations.includes(locationLabel);
      });
    }

    if (filters.remoteOnly) {
      results = results.filter((item) => item.job.location.remote);
    }

    if (filters.minMatchScore > 0) {
      results = results.filter((item) => item.matchScore >= filters.minMatchScore);
    }

    if (filters.maxMatchScore < 100) {
      results = results.filter((item) => item.matchScore <= filters.maxMatchScore);
    }

    if (filters.minSalary) {
      results = results.filter((item) => {
        const salary = item.job.salary;
        const salaryValue = salary.min ?? salary.max ?? 0;
        return salaryValue >= filters.minSalary!;
      });
    }

    if (filters.maxSalary) {
      results = results.filter((item) => {
        const salary = item.job.salary;
        const salaryValue = salary.max ?? salary.min ?? 0;
        return salaryValue <= filters.maxSalary!;
      });
    }

    results.sort((a, b) => {
      switch (sortOption) {
        case 'recent':
          return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
        case 'salaryHigh': {
          const salaryA = a.job.salary.max ?? a.job.salary.min ?? 0;
          const salaryB = b.job.salary.max ?? b.job.salary.min ?? 0;
          return salaryB - salaryA;
        }
        case 'salaryLow': {
          const salaryA = a.job.salary.min ?? a.job.salary.max ?? 0;
          const salaryB = b.job.salary.min ?? b.job.salary.max ?? 0;
          return salaryA - salaryB;
        }
        case 'company':
          return a.job.company.name.localeCompare(b.job.company.name);
        case 'matchScore':
        default:
          return b.matchScore - a.matchScore;
      }
    });

    setFilteredJobs(results);
  };

  const handleUnsaveJob = async (jobId: string) => {
    try {
      await savedJobsService.removeSavedJob(jobId);
      setSavedJobs((prev) => prev.filter((job) => job.job.id !== jobId));
      showSuccessToast(getContent('savedJobs.success.removed'));
    } catch (error) {
      console.error('Error removing saved job:', error);
      showErrorToast(getContent('savedJobs.errors.removeFailed'));
    }
  };

  const handleViewDetails = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };

  const handleApplyJob = (jobId: string) => {
    showInfoToast(getContent('savedJobs.actions.applyTitle'), getContent('savedJobs.actions.applyMessage'));
    console.log('Applying to job:', jobId);
  };

  const handleShareJob = (job: Job) => {
    const shareMessage = getContent('savedJobs.actions.shareMessage')
      ?.replace('{jobTitle}', job.title)
      ?.replace('{companyName}', job.company.name);

    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: shareMessage || job.title,
        url: `${window.location.origin}/job/${job.id}`,
      }).catch((error) => {
        console.warn('Share failed:', error);
      });
      return;
    }

    navigator.clipboard
      .writeText(`${window.location.origin}/job/${job.id}`)
      .then(() => {
        showSuccessToast(
          getContent('savedJobs.success.shareTitle'),
          getContent('savedJobs.success.shareCopied')
        );
      })
      .catch((error) => {
        console.error('Share failed:', error);
        showErrorToast(getContent('savedJobs.errors.shareFailed'));
      });
  };

  const clearFilters = () => {
    setFilters({
      jobTypes: [],
      locations: [],
      remoteOnly: false,
      minMatchScore: 0,
      maxMatchScore: 100,
      minSalary: undefined,
      maxSalary: undefined,
    });
    setSearchQuery('');
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.jobTypes.length > 0 ||
      filters.locations.length > 0 ||
      filters.remoteOnly ||
      filters.minMatchScore > 0 ||
      filters.maxMatchScore < 100 ||
      (filters.minSalary ?? 0) > 0 ||
      (filters.maxSalary ?? 0) > 0 ||
      searchQuery.length > 0
    );
  }, [filters, searchQuery]);

  const uniqueJobTypes = useMemo(
    () => Array.from(new Set(savedJobs.map((job) => job.job.type))).sort(),
    [savedJobs]
  );

  const uniqueLocations = useMemo(
    () =>
      Array.from(
        new Set(savedJobs.map((job) => `${job.job.location.city}, ${job.job.location.country}`))
      ).sort(),
    [savedJobs]
  );

  if (loading) {
    return (
      <div className="flex h-screen">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-neutral-600">{getContent('common.loading')}</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-auto pb-20">
          <div className="max-w-7xl mx-auto p-8 space-y-8">
            {/* Search and Controls */}
            <SavedJobsSearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showFilters={showFilters}
              toggleFilters={() => setShowFilters((prev) => !prev)}
              hasActiveFilters={hasActiveFilters}
              sortOption={sortOption}
              setSortOption={setSortOption}
              getContent={getContent}
            />

            {/* Filters Panel */}
            {showFilters && (
              <SavedJobsFilters
                filters={filters}
                setFilters={setFilters}
                hasActiveFilters={hasActiveFilters}
                clearFilters={clearFilters}
                uniqueJobTypes={uniqueJobTypes}
                uniqueLocations={uniqueLocations}
                getContent={getContent}
              />
            )}

            {/* Results Count and Clear Filters */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-600">
                {getContent('savedJobs.resultsCount')
                  .replace('{count}', String(filteredJobs.length))
                  .replace('{total}', String(savedJobs.length))}
              </p>
              {hasActiveFilters && (
                <Button variant="tertiary" size="sm" onClick={clearFilters} className="flex items-center gap-2">
                  <BookmarkMinus className="w-4 h-4" />
                  {getContent('savedJobs.clearFilters')}
                </Button>
              )}
            </div>

            {/* Jobs List or Empty State */}
            {filteredJobs.length === 0 ? (
              <SavedJobsEmptyState
                hasActiveFilters={hasActiveFilters}
                clearFilters={clearFilters}
                getContent={getContent}
              />
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.job.id}
                    job={job}
                    onSave={(jobInfo) => handleUnsaveJob(jobInfo.id)}
                    onApply={(jobId) => handleApplyJob(jobId)}
                    onShare={(jobInfo) => handleShareJob(jobInfo)}
                    onViewDetails={() => handleViewDetails(job.job.id)}
                    isSaved
                  />
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default SavedJobs;
