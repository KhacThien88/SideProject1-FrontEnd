import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Filter,
  Users,
  Target,
  X
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { DashboardHeader } from '../../components/layout/DashboardHeader';
import { DashboardSidebar } from '../../components/layout/DashboardSidebar';
import { CandidateMatchCard } from './components/CandidateMatchCard';
import type { CandidateMatch, MatchFilters, MatchSortOption } from '../../types/candidateMatch';
import { candidateMatchService } from '../../services/api/candidateMatch/candidateMatchService';
import { jobPostingService } from '../../services/api/jobPosting/jobPostingService';
import type { JobProfile } from '../../types/jobPosting';
import { useTranslation } from '../../hooks/useTranslation';
import { useToast } from '../../contexts/ToastContext';
import { useRouter } from '../../components/Router';
import { Button } from '../../components/ui/Button';

export const JobMatches: React.FC = () => {
  const { currentRoute, navigate } = useRouter();
  const { getContent } = useTranslation();
  const { showSuccessToast, showErrorToast } = useToast();

  // Extract job ID from route: /dashboard/job-postings/{id}/matches
  const getJobIdFromRoute = () => {
    const parts = currentRoute.split('/');
    const matchesIndex = parts.indexOf('matches');
    if (matchesIndex > 0) {
      return parts[matchesIndex - 1];
    }
    return null;
  };

  const id = getJobIdFromRoute();

  const [jobProfile, setJobProfile] = useState<JobProfile | null>(null);
  const [candidates, setCandidates] = useState<CandidateMatch[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<CandidateMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState<MatchFilters>({
    minMatchScore: 0,
    maxMatchScore: 100,
    experienceYears: {
      min: 0,
      max: 20,
    },
    skills: [],
    location: [],
  });

  const [sortOption, setSortOption] = useState<MatchSortOption>('matchScore');

  useEffect(() => {
    console.log('JobMatches mounted, currentRoute:', currentRoute);
    console.log('Extracted job ID:', id);
    loadData();
  }, [id]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [candidates, filters, sortOption]);

  const loadData = async () => {
    if (!id) {
      console.error('No job ID found in route:', currentRoute);
      return;
    }

    console.log('Loading data for job ID:', id);
    try {
      setLoading(true);
      const [job, matches] = await Promise.all([
        jobPostingService.getJobProfile(id),
        candidateMatchService.getCandidateMatches(id),
      ]);

      if (!job) {
        showErrorToast(getContent('candidateMatches.errors.jobNotFound'));
        navigate('/dashboard/job-postings');
        return;
      }

      setJobProfile(job);
      setCandidates(matches);
    } catch (error) {
      console.error('Error loading candidates:', error);
      showErrorToast(getContent('candidateMatches.errors.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...candidates];

    // Apply filters
    if (filters.minMatchScore !== undefined) {
      filtered = filtered.filter((c) => c.matchScore >= filters.minMatchScore!);
    }

    if (filters.maxMatchScore !== undefined) {
      filtered = filtered.filter((c) => c.matchScore <= filters.maxMatchScore!);
    }

    if (filters.experienceYears?.min !== undefined) {
      filtered = filtered.filter((c) => c.yearsOfExperience >= filters.experienceYears!.min!);
    }

    if (filters.experienceYears?.max !== undefined) {
      filtered = filtered.filter((c) => c.yearsOfExperience <= filters.experienceYears!.max!);
    }

    if (filters.skills && filters.skills.length > 0) {
      filtered = filtered.filter((c) =>
        filters.skills!.some((skill) => c.matchedSkills.includes(skill))
      );
    }

    if (filters.location && filters.location.length > 0) {
      filtered = filtered.filter((c) => filters.location!.includes(c.location));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'matchScore':
          return b.matchScore - a.matchScore;
        case 'experience':
          return b.yearsOfExperience - a.yearsOfExperience;
        case 'appliedDate':
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
        case 'name':
          return a.candidateName.localeCompare(b.candidateName);
        default:
          return 0;
      }
    });

    setFilteredCandidates(filtered);
  };

  const handleToggleSave = async (candidateId: string) => {
    try {
      const updated = await candidateMatchService.toggleSaved(candidateId);
      setCandidates((prev) =>
        prev.map((c) => (c.id === candidateId ? updated : c))
      );
      showSuccessToast(getContent('candidateMatches.success.saveToggled'));
    } catch (error) {
      showErrorToast(getContent('candidateMatches.errors.saveFailed'));
    }
  };

  const handleDownloadResume = async (resumeUrl: string) => {
    try {
      await candidateMatchService.downloadResume(resumeUrl);
      showSuccessToast(getContent('candidateMatches.success.resumeDownloaded'));
    } catch (error) {
      showErrorToast(getContent('candidateMatches.errors.downloadFailed'));
    }
  };

  const handleViewDetails = (candidateId: string) => {
    // Navigate to candidate detail page
    navigate(`/dashboard/candidates/${candidateId}`);
  };

  const clearFilters = () => {
    setFilters({
      minMatchScore: 0,
      maxMatchScore: 100,
      experienceYears: {
        min: 0,
        max: 20,
      },
      skills: [],
      location: [],
    });
  };

  const hasActiveFilters =
    filters.minMatchScore! > 0 ||
    filters.maxMatchScore! < 100 ||
    filters.experienceYears?.min! > 0 ||
    filters.experienceYears?.max! < 20 ||
    filters.skills!.length > 0 ||
    filters.location!.length > 0;

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

  if (!jobProfile) {
    return null;
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8">
            {/* Back Button */}
            <Button
              onClick={() => navigate('/dashboard/job-postings')}
              variant="tertiary"
              size="md"
              className="mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              {getContent('candidateMatches.backToJobs')}
            </Button>

            {/* Job Header */}
            <Card variant="default" hover={true} className="bg-white backdrop-blur-sm group mb-8 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 via-secondary-500 via-primary-500 to-secondary-600 bg-clip-text text-transparent mb-2">
                    {jobProfile.title}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span>{jobProfile.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{filteredCandidates.length} {getContent('candidateMatches.totalMatches')}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold bg-gradient-to-r from-secondary-600 via-primary-500/60 via-secondary-500/60 to-primary-600 bg-clip-text text-transparent">
                    {filteredCandidates.length}
                  </div>
                  <div className="text-sm font-semibold text-neutral-800">
                    {getContent('candidateMatches.totalMatches')}
                  </div>
                </div>
              </div>
              
              {/* Required Skills */}
              <div>
                <div className="text-sm font-semibold text-neutral-800 mb-3">
                  {getContent('candidateMatches.requiredSkills')}
                </div>
                <div className="flex flex-wrap gap-2">
                  {jobProfile.requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            {/* Filters Bar */}
            <div className="flex items-center gap-4 mb-6">
              {/* Filter Button */}
              <Button
                variant={showFilters || hasActiveFilters ? 'secondary' : 'tertiary'}
                onClick={() => setShowFilters(!showFilters)}
                className={`relative ${
                  showFilters || hasActiveFilters
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white border-transparent shadow-md'
                    : ''
                }`}
              >
                <Filter className="w-5 h-5 mr-2" />
                {getContent('candidateMatches.filters')}
                {hasActiveFilters && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                )}
              </Button>

              {/* Sort */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as MatchSortOption)}
                className="px-4 py-3 border border-neutral-300 rounded-xl bg-white font-medium text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:border-primary-300 hover:bg-primary-50/30 cursor-pointer shadow-sm"
              >
                <option value="matchScore">{getContent('candidateMatches.sort.matchScore')}</option>
                <option value="experience">{getContent('candidateMatches.sort.experience')}</option>
                <option value="appliedDate">{getContent('candidateMatches.sort.appliedDate')}</option>
                <option value="name">{getContent('candidateMatches.sort.name')}</option>
              </select>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="bg-gradient-to-br from-white via-primary-50/30 to-secondary-50/30 rounded-2xl border border-neutral-200 shadow-lg p-6 mb-6 animate-slide-down">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    {getContent('candidateMatches.filters')}
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary-50 transition-all"
                    >
                      <X className="w-4 h-4" />
                      {getContent('candidateMatches.clearFilters')}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Match Score Filter */}
                  <div className="bg-white rounded-xl p-4 border border-neutral-200 hover:border-primary-300 transition-all">
                    <label className="block text-sm font-semibold text-neutral-800 mb-3">
                      {getContent('candidateMatches.filterMatchScore')}
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
                          setFilters({ ...filters, minMatchScore: parseInt(e.target.value) })
                        }
                        className="w-full accent-primary-500"
                      />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={filters.maxMatchScore}
                        onChange={(e) =>
                          setFilters({ ...filters, maxMatchScore: parseInt(e.target.value) })
                        }
                        className="w-full accent-secondary-500"
                      />
                    </div>
                  </div>

                  {/* Experience Filter */}
                  <div className="bg-white rounded-xl p-4 border border-neutral-200 hover:border-primary-300 transition-all">
                    <label className="block text-sm font-semibold text-neutral-800 mb-3">
                      {getContent('candidateMatches.filterExperience')}
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                        {filters.experienceYears?.min || 0} - {filters.experienceYears?.max || 20} {getContent('candidateMatches.years')}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={filters.experienceYears?.min || 0}
                        onChange={(e) =>
                          setFilters({ 
                            ...filters, 
                            experienceYears: { 
                              ...filters.experienceYears, 
                              min: parseInt(e.target.value) 
                            } 
                          })
                        }
                        className="w-full accent-primary-500"
                      />
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={filters.experienceYears?.max || 20}
                        onChange={(e) =>
                          setFilters({ 
                            ...filters, 
                            experienceYears: { 
                              ...filters.experienceYears, 
                              max: parseInt(e.target.value) 
                            } 
                          })
                        }
                        className="w-full accent-secondary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Candidates Grid */}
            {filteredCandidates.length === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
                <Users className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                  {getContent('candidateMatches.noCandidates')}
                </h4>
                <p className="text-neutral-600">
                  {hasActiveFilters
                    ? getContent('candidateMatches.noResultsFilters')
                    : getContent('candidateMatches.noMatches')}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                  >
                    {getContent('candidateMatches.clearFilters')}
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCandidates.map((candidate) => (
                  <CandidateMatchCard
                    key={candidate.id}
                    candidate={candidate}
                    onToggleSave={handleToggleSave}
                    onDownloadResume={handleDownloadResume}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
