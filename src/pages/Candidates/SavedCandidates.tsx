import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Users,
  X
} from 'lucide-react';
import { DashboardHeader } from '../../components/layout/DashboardHeader';
import { DashboardSidebar } from '../../components/layout/DashboardSidebar';
import { CandidateMatchCard } from '../CandidateMatching/components/CandidateMatchCard';
import type { CandidateMatch, MatchFilters, MatchSortOption } from '../../types/candidateMatch';
import { candidateMatchService } from '../../services/api/candidateMatch/candidateMatchService';
import { jobPostingService } from '../../services/api/jobPosting/jobPostingService';
import { useTranslation } from '../../hooks/useTranslation';
import { useToast } from '../../contexts/ToastContext';
import { useRouter } from '../../components/Router';
import { Button } from '../../components/ui/Button';

export const SavedCandidates: React.FC = () => {
  const { getContent } = useTranslation();
  const { showSuccessToast, showErrorToast } = useToast();
  const { navigate } = useRouter();

  const [allCandidates, setAllCandidates] = useState<CandidateMatch[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<CandidateMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Additional filter states
  const [minSkillMatches, setMinSkillMatches] = useState(0);
  const [maxSkillMatches, setMaxSkillMatches] = useState(20);

  useEffect(() => {
    loadSavedCandidates();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [allCandidates, filters, sortOption, searchQuery, minSkillMatches, maxSkillMatches]);

  const loadSavedCandidates = async () => {
    try {
      setLoading(true);
      // Get all job profiles
      const jobsResponse = await jobPostingService.getJobProfiles();
      
      // Get all candidates from all jobs and filter saved ones
      const allMatches: CandidateMatch[] = [];
      for (const job of jobsResponse.profiles) {
        const matchesResponse = await candidateMatchService.getCandidateMatches(job.profile_id);
        // Only include saved candidates (isSaved === true)
        const savedMatches = matchesResponse.matches.filter((m: CandidateMatch) => m.isSaved);
        allMatches.push(...savedMatches);
      }

      setAllCandidates(allMatches);
    } catch (error) {
      console.error('Error loading saved candidates:', error);
      showErrorToast(getContent('savedCandidates.errors.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...allCandidates];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.candidateName.toLowerCase().includes(query) ||
          c.currentRole.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query) ||
          c.matchedSkills.some((s) => s.toLowerCase().includes(query))
      );
    }

    // Apply status filter - REMOVED (now using isSaved filter at load time)

    // Apply match score filter
    if (filters.minMatchScore !== undefined) {
      filtered = filtered.filter((c) => c.matchScore >= filters.minMatchScore!);
    }

    if (filters.maxMatchScore !== undefined) {
      filtered = filtered.filter((c) => c.matchScore <= filters.maxMatchScore!);
    }

    // Apply experience filter
    if (filters.experienceYears?.min !== undefined) {
      filtered = filtered.filter((c) => c.yearsOfExperience >= filters.experienceYears!.min!);
    }

    if (filters.experienceYears?.max !== undefined) {
      filtered = filtered.filter((c) => c.yearsOfExperience <= filters.experienceYears!.max!);
    }

    // Apply skill count filter
    if (minSkillMatches > 0) {
      filtered = filtered.filter((c) => c.matchedSkills.length >= minSkillMatches);
    }

    if (maxSkillMatches < 20) {
      filtered = filtered.filter((c) => c.matchedSkills.length <= maxSkillMatches);
    }

    // Apply skills filter
    if (filters.skills && filters.skills.length > 0) {
      filtered = filtered.filter((c) =>
        filters.skills!.some((skill) => c.matchedSkills.includes(skill))
      );
    }

    // Apply location filter
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
      setAllCandidates((prev) =>
        prev.map((c) => (c.id === candidateId ? updated : c))
      );
      showSuccessToast(getContent('savedCandidates.success.saveToggled'));
    } catch (error) {
      showErrorToast(getContent('savedCandidates.errors.saveFailed'));
    }
  };

  const handleDownloadResume = async (resumeUrl: string) => {
    try {
      await candidateMatchService.downloadResume(resumeUrl);
      showSuccessToast(getContent('savedCandidates.success.resumeDownloaded'));
    } catch (error) {
      showErrorToast(getContent('savedCandidates.errors.downloadFailed'));
    }
  };

  const handleViewDetails = (candidateId: string) => {
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
    setMinSkillMatches(0);
    setMaxSkillMatches(20);
    setSearchQuery('');
  };

  const hasActiveFilters =
    filters.minMatchScore! > 0 ||
    filters.maxMatchScore! < 100 ||
    filters.experienceYears?.min! > 0 ||
    filters.experienceYears?.max! < 20 ||
    minSkillMatches > 0 ||
    maxSkillMatches < 20 ||
    filters.skills!.length > 0 ||
    filters.location!.length > 0 ||
    searchQuery.length > 0;

  const uniqueLocations = Array.from(new Set(allCandidates.map((c) => c.location)));
  const allSkills = Array.from(new Set(allCandidates.flatMap((c) => c.matchedSkills)));

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
    <div className="flex h-screen bg-neutral-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8">
            {/* Search and Filters Bar */}
            <div className="flex items-center gap-4 mb-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder={getContent('savedCandidates.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

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
                {getContent('savedCandidates.filters')}
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
                <option value="matchScore">{getContent('savedCandidates.sort.matchScore')}</option>
                <option value="experience">{getContent('savedCandidates.sort.experience')}</option>
                <option value="appliedDate">{getContent('savedCandidates.sort.appliedDate')}</option>
                <option value="name">{getContent('savedCandidates.sort.name')}</option>
              </select>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="bg-gradient-to-br from-white via-primary-50/30 to-secondary-50/30 rounded-2xl border border-neutral-200 shadow-lg p-6 mb-6 animate-slide-down">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    {getContent('savedCandidates.filters')}
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary-50 transition-all"
                    >
                      <X className="w-4 h-4" />
                      {getContent('savedCandidates.clearFilters')}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Match Score Filter */}
                  <div className="bg-white rounded-xl p-4 border border-neutral-200 hover:border-primary-300 transition-all">
                    <label className="block text-sm font-semibold text-neutral-800 mb-3">
                      {getContent('savedCandidates.filterMatchScore')}
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
                      {getContent('savedCandidates.filterExperience')}
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                        {filters.experienceYears?.min || 0} - {filters.experienceYears?.max || 20} {getContent('savedCandidates.years')}
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
                              min: parseInt(e.target.value),
                            },
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
                              max: parseInt(e.target.value),
                            },
                          })
                        }
                        className="w-full accent-secondary-500"
                      />
                    </div>
                  </div>

                  {/* Skill Matches Filter */}
                  <div className="bg-white rounded-xl p-4 border border-neutral-200 hover:border-primary-300 transition-all">
                    <label className="block text-sm font-semibold text-neutral-800 mb-3">
                      {getContent('savedCandidates.filterSkillMatches')}
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                        {minSkillMatches} - {maxSkillMatches}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={minSkillMatches}
                        onChange={(e) => setMinSkillMatches(parseInt(e.target.value))}
                        className="w-full accent-primary-500"
                      />
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={maxSkillMatches}
                        onChange={(e) => setMaxSkillMatches(parseInt(e.target.value))}
                        className="w-full accent-secondary-500"
                      />
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div className="bg-white rounded-xl p-4 border border-neutral-200 hover:border-primary-300 transition-all">
                    <label className="block text-sm font-semibold text-neutral-800 mb-3">
                      {getContent('savedCandidates.filterLocation')}
                    </label>
                    <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                      {uniqueLocations.map((location) => (
                        <label key={location} className="flex items-center gap-2 cursor-pointer group hover:bg-primary-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={filters.location?.includes(location)}
                            onChange={(e) => {
                              const newLocation = e.target.checked
                                ? [...(filters.location || []), location]
                                : (filters.location || []).filter((l) => l !== location);
                              setFilters({ ...filters, location: newLocation });
                            }}
                            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                          />
                          <span className="text-sm text-neutral-700">{location}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Skills Filter */}
                  <div className="bg-white rounded-xl p-4 border border-neutral-200 hover:border-primary-300 transition-all md:col-span-2 lg:col-span-4">
                    <label className="block text-sm font-semibold text-neutral-800 mb-3">
                      {getContent('savedCandidates.filterSkills')}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 max-h-32 overflow-y-auto custom-scrollbar">
                      {allSkills.slice(0, 10).map((skill) => (
                        <label key={skill} className="flex items-center gap-2 cursor-pointer group hover:bg-primary-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={filters.skills?.includes(skill)}
                            onChange={(e) => {
                              const newSkills = e.target.checked
                                ? [...(filters.skills || []), skill]
                                : (filters.skills || []).filter((s) => s !== skill);
                              setFilters({ ...filters, skills: newSkills });
                            }}
                            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 accent-primary-500"
                          />
                          <span className="text-sm text-neutral-700 group-hover:text-primary-700 transition-colors">{skill}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Candidates Grid */}
            {filteredCandidates.length === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
                <Users className="w-16 h-16 rounded-2xl p-2 bg-gradient-to-b from-primary-500 to-secondary-500 text-white mx-auto mb-4" />
                <div className="text-2xl font-semibold text-neutral-800 mb-2">
                  {getContent('savedCandidates.noCandidates')}
                </div>
                <p className="text-neutral-600">
                  {hasActiveFilters
                    ? getContent('savedCandidates.noResultsFilters')
                    : getContent('savedCandidates.noSavedYet')}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                  >
                    {getContent('savedCandidates.clearFilters')}
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
