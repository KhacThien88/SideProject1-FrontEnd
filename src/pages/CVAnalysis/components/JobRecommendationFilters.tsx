import React, { useState, useCallback, useMemo } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { 
  Filter, 
  X, 
  MapPin, 
  DollarSign, 
  Briefcase,
  Star,
  TrendingUp,
  Building2,
  Search
} from 'lucide-react';
import type { JobSearchFilters } from '../../../types/jobMatching';
import { JOB_MATCHING_CONFIG } from '../../../types/jobMatching';
import { cn } from '../../../utils/cn';
import { useTranslation } from '../../../hooks/useTranslation';

interface JobRecommendationFiltersProps {
  filters: JobSearchFilters;
  onFiltersChange: (filters: JobSearchFilters) => void;
  detectedSkills?: string[];
  className?: string;
}

export const JobRecommendationFilters: React.FC<JobRecommendationFiltersProps> = ({
  filters,
  onFiltersChange,
  detectedSkills = [],
  className
}) => {
  const { getContent } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState(filters.keywords || '');

  const updateFilters = useCallback((updates: Partial<JobSearchFilters>) => {
    const newFilters = { ...filters, ...updates };
    onFiltersChange(newFilters);
  }, [filters, onFiltersChange]);

  const removeFilter = useCallback((filterKey: keyof JobSearchFilters, value?: any) => {
    const newFilters = { ...filters };
    
    if (Array.isArray(newFilters[filterKey]) && value !== undefined) {
      const filteredArray = (newFilters[filterKey] as any[]).filter(item => item !== value);
      if (filteredArray.length === 0) {
        delete newFilters[filterKey];
      } else {
        (newFilters as any)[filterKey] = filteredArray;
      }
    } else {
      delete newFilters[filterKey];
    }
    
    onFiltersChange(newFilters);
  }, [filters, onFiltersChange]);

  const clearAllFilters = useCallback(() => {
    onFiltersChange({});
    setSearchKeywords('');
  }, [onFiltersChange]);

  const activeFiltersCount = useMemo(() => {
    return Object.keys(filters).length;
  }, [filters]);

  const handleKeywordsSubmit = () => {
    updateFilters({ keywords: searchKeywords.trim() || undefined });
  };

  const handleKeywordsKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleKeywordsSubmit();
    }
  };

  // Combine detected skills with popular skills, prioritizing detected ones
  const availableSkills = useMemo(() => {
    const detectedSet = new Set(detectedSkills.map(s => s.toLowerCase()));
    const popularSkills = JOB_MATCHING_CONFIG.POPULAR_SKILLS.filter(
      skill => !detectedSet.has(skill.toLowerCase())
    );
    return [...detectedSkills, ...popularSkills];
  }, [detectedSkills]);

  return (
    <Card className={cn("", className)}>
      {/* Header */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-600" />
            <div className="font-semibold text-neutral-900">{getContent('jobs.filters.filterRecommendations')}</div>
            {activeFiltersCount > 0 && (
              <Badge variant="primary" size="sm">{activeFiltersCount}</Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button
                variant="tertiary"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs"
              >
                {getContent('common.clearAll')}
              </Button>
            )}
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden"
            >
              {isExpanded ? getContent('common.viewLess') : getContent('common.viewMore')}
            </Button>
          </div>
        </div>
      </div>

      {/* Active filters */}
      {activeFiltersCount > 0 && (
        <div className="p-4 border-b border-neutral-200 bg-neutral-50">
          <div className="text-sm font-medium text-neutral-700 mb-2">{getContent('jobs.filters.activeFilters')}:</div>
          <div className="flex flex-wrap gap-2">
            {filters.keywords && (
              <Badge variant="primary" className="flex items-center gap-1">
                "{filters.keywords}"
                <button onClick={() => removeFilter('keywords')}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            
            {filters.location?.city && (
              <Badge variant="primary" className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {filters.location.city}
                <button onClick={() => removeFilter('location')}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            
            {filters.location?.remote && (
              <Badge variant="info" className="flex items-center gap-1">
                {getContent('jobs.filters.remote')}
                <button onClick={() => updateFilters({ 
                  location: { ...filters.location, remote: false } 
                })}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            
            {filters.jobType?.map(type => (
              <Badge key={type} variant="primary" className="flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                {type.replace('-', ' ')}
                <button onClick={() => removeFilter('jobType', type)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            
            {filters.skills?.map(skill => (
              <Badge key={skill} variant="success" className="flex items-center gap-1">
                {skill}
                <button onClick={() => removeFilter('skills', skill)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            
            {(filters.salary?.min || filters.salary?.max) && (
              <Badge variant="primary" className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                {filters.salary?.min && `${filters.salary.min}+`}
                {filters.salary?.min && filters.salary?.max && '-'}
                {filters.salary?.max && `${filters.salary.max}`}
                <button onClick={() => removeFilter('salary')}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Filter Controls */}
      <div className={cn(
        "space-y-4 p-4",
        !isExpanded && "hidden lg:block"
      )}>
        {/* Keywords Search */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            <Search className="w-4 h-4 inline mr-1" />
            {getContent('jobs.filters.searchKeywords')}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={getContent('jobs.filters.jobTitleCompanySkills')}
              value={searchKeywords}
              onChange={(e) => setSearchKeywords(e.target.value)}
              onKeyPress={handleKeywordsKeyPress}
              className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={handleKeywordsSubmit}
            >
              {getContent('jobs.filters.search')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              {getContent('jobs.filters.location')}
            </label>
            <select
              value={filters.location?.city || ''}
              onChange={(e) => updateFilters({
                location: { 
                  ...filters.location, 
                  city: e.target.value || undefined 
                }
              })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">{getContent('jobs.filters.anyLocation')}</option>
              <option value="Ho Chi Minh City">Ho Chi Minh City</option>
              <option value="Hanoi">Hanoi</option>
              <option value="Da Nang">Da Nang</option>
              <option value="Singapore">Singapore</option>
              <option value="Bangkok">Bangkok</option>
            </select>
            
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="remote-work"
                checked={filters.location?.remote || false}
                onChange={(e) => updateFilters({
                  location: { ...filters.location, remote: e.target.checked }
                })}
                className="mr-2"
              />
              <label htmlFor="remote-work" className="text-sm text-neutral-700">
                {getContent('jobs.filters.includeRemoteWork')}
              </label>
            </div>
          </div>

          {/* Job Type Filter */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              <Briefcase className="w-4 h-4 inline mr-1" />
              {getContent('jobs.filters.jobType')}
            </label>
            <div className="space-y-2">
              {JOB_MATCHING_CONFIG.JOB_TYPES.map(({ value, label }) => (
                <label key={value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.jobType?.includes(value as any) || false}
                    onChange={(e) => {
                      const currentTypes = filters.jobType || [];
                      const newTypes = e.target.checked
                        ? [...currentTypes, value as any]
                        : currentTypes.filter(type => type !== value);
                      updateFilters({ jobType: newTypes.length > 0 ? newTypes : undefined });
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            <DollarSign className="w-4 h-4 inline mr-1" />
            {getContent('jobs.filters.salaryRange')}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="number"
                placeholder={getContent('jobs.filters.minSalary')}
                value={filters.salary?.min || ''}
                onChange={(e) => updateFilters({
                  salary: { 
                    ...filters.salary, 
                    min: e.target.value ? parseInt(e.target.value) : undefined 
                  }
                })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <input
                type="number"
                placeholder={getContent('jobs.filters.maxSalary')}
                value={filters.salary?.max || ''}
                onChange={(e) => updateFilters({
                  salary: { 
                    ...filters.salary, 
                    max: e.target.value ? parseInt(e.target.value) : undefined 
                  }
                })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            <TrendingUp className="w-4 h-4 inline mr-1" />
            {getContent('jobs.filters.experienceLevel')}
          </label>
          <div className="flex flex-wrap gap-2">
            {JOB_MATCHING_CONFIG.EXPERIENCE_LEVELS.map(({ value, label }) => (
              <Button
                key={value}
                variant={filters.experienceLevel?.includes(value as any) ? "primary" : "tertiary"}
                size="sm"
                onClick={() => {
                  const currentLevels = filters.experienceLevel || [];
                  const newLevels = currentLevels.includes(value as any)
                    ? currentLevels.filter(level => level !== value)
                    : [...currentLevels, value as any];
                  updateFilters({ experienceLevel: newLevels.length > 0 ? newLevels : undefined });
                }}
                className="text-xs"
              >
                {label.split(' ')[0]} {/* Show only first part of label */}
              </Button>
            ))}
          </div>
        </div>

        {/* Company Size */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            <Building2 className="w-4 h-4 inline mr-1" />
            {getContent('jobs.filters.companySize')}
          </label>
          <div className="flex flex-wrap gap-2">
            {JOB_MATCHING_CONFIG.COMPANY_SIZES.map(({ value}) => (
              <Button
                key={value}
                variant={filters.companySize?.includes(value as any) ? "primary" : "tertiary"}
                size="sm"
                onClick={() => {
                  const currentSizes = filters.companySize || [];
                  const newSizes = currentSizes.includes(value as any)
                    ? currentSizes.filter(size => size !== value)
                    : [...currentSizes, value as any];
                  updateFilters({ companySize: newSizes.length > 0 ? newSizes : undefined });
                }}
                className="text-xs"
              >
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Skills Based on CV */}
        {availableSkills.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              <Star className="w-4 h-4 inline mr-1" />
              {getContent('jobs.filters.skills')} {detectedSkills.length > 0 && getContent('jobs.filters.skillsFromCV')}
            </label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {availableSkills.slice(0, 20).map(skill => {
                const isDetected = detectedSkills.includes(skill);
                const isSelected = filters.skills?.includes(skill);
                
                return (
                  <Button
                    key={skill}
                    variant={isSelected ? "primary" : isDetected ? "secondary" : "tertiary"}
                    size="sm"
                    onClick={() => {
                      const currentSkills = filters.skills || [];
                      const newSkills = currentSkills.includes(skill)
                        ? currentSkills.filter(s => s !== skill)
                        : [...currentSkills, skill];
                      updateFilters({ skills: newSkills.length > 0 ? newSkills : undefined });
                    }}
                    className={cn(
                      "text-xs",
                      isDetected && "ring-1 ring-success-300"
                    )}
                  >
                    {skill}
                    {isDetected && <Star className="w-3 h-3 ml-1 fill-current" />}
                  </Button>
                );
              })}
            </div>
            {detectedSkills.length > 0 && (
              <div className="text-xs text-success-600 my-2">
                <Star className="w-3 h-3 inline mr-1" />
                {getContent('jobs.filters.skillsWithStar')}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};