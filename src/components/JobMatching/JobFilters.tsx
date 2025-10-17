import React, { useState, useMemo, useCallback } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  MapPin, 
  DollarSign, 
  Briefcase, 
  TrendingUp, 
  Building2,
  Hash,
  Clock,
  X,
  ChevronDown,
  ChevronUp,
  Search
} from 'lucide-react';
import type { JobSearchFilters, JobFiltersProps } from '../../types/jobMatching';
import { JOB_MATCHING_CONFIG } from '../../types/jobMatching';
import { cn } from '../../utils/cn';

export const JobFilters: React.FC<JobFiltersProps> = ({
  filters,
  onFiltersChange,
  availableSkills = JOB_MATCHING_CONFIG.POPULAR_SKILLS,
  availableLocations = ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Singapore', 'Bangkok'],
  className
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    location: true,
    salary: true,
    jobType: true,
    experience: false,
    company: false,
    skills: false,
    posted: false
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [skillSearchTerm, setSkillSearchTerm] = useState('');
  const [locationSearchTerm, setLocationSearchTerm] = useState('');

  const filteredSkills = useMemo(() => {
    return availableSkills.filter(skill =>
      skill.toLowerCase().includes(skillSearchTerm.toLowerCase())
    );
  }, [availableSkills, skillSearchTerm]);

  const filteredLocations = useMemo(() => {
    return availableLocations.filter(location =>
      location.toLowerCase().includes(locationSearchTerm.toLowerCase())
    );
  }, [availableLocations, locationSearchTerm]);

  const toggleSection = useCallback((section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

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
    setSearchTerm('');
    setSkillSearchTerm('');
    setLocationSearchTerm('');
  }, [onFiltersChange]);

  const activeFiltersCount = useMemo(() => {
    return Object.keys(filters).length;
  }, [filters]);

  const renderSectionHeader = (title: string, icon: React.ReactNode, sectionKey: string) => (
    <button
      onClick={() => toggleSection(sectionKey)}
      className="flex items-center justify-between w-full p-3 text-left hover:bg-neutral-50 transition-colors"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium text-neutral-900">{title}</span>
      </div>
      {expandedSections[sectionKey] ? (
        <ChevronUp className="w-4 h-4 text-neutral-500" />
      ) : (
        <ChevronDown className="w-4 h-4 text-neutral-500" />
      )}
    </button>
  );

  return (
    <Card className={cn("", className)}>
      {/* Header */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-neutral-900">Filters</div>
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">{activeFiltersCount}</Badge>
              <Button
                variant="tertiary"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs"
              >
                Clear All
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="p-4 border-b border-neutral-200">
          <div className="text-sm font-medium text-neutral-700 mb-2">Active Filters:</div>
          <div className="flex flex-wrap gap-2">
            {filters.keywords && (
              <Badge variant="primary" className="flex items-center gap-1">
                Keywords: {filters.keywords}
                <button onClick={() => removeFilter('keywords')}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            
            {filters.location?.city && (
              <Badge variant="primary" className="flex items-center gap-1">
                Location: {filters.location.city}
                <button onClick={() => removeFilter('location')}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            
            {filters.jobType?.map(type => (
              <Badge key={type} variant="primary" className="flex items-center gap-1">
                {type.replace('-', ' ')}
                <button onClick={() => removeFilter('jobType', type)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            
            {filters.skills?.map(skill => (
              <Badge key={skill} variant="primary" className="flex items-center gap-1">
                {skill}
                <button onClick={() => removeFilter('skills', skill)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="divide-y divide-neutral-200">
        {/* Keywords Search */}
        <div>
          {renderSectionHeader('Keywords', <Search className="w-4 h-4" />, 'keywords')}
          {expandedSections.keywords && (
            <div className="p-4">
              <input
                type="text"
                placeholder="Search job titles, companies, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => updateFilters({ keywords: searchTerm })}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    updateFilters({ keywords: searchTerm });
                  }
                }}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          )}
        </div>

        {/* Location Filter */}
        <div>
          {renderSectionHeader('Location', <MapPin className="w-4 h-4" />, 'location')}
          {expandedSections.location && (
            <div className="p-4 space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={locationSearchTerm}
                  onChange={(e) => setLocationSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 mb-3"
                />
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {filteredLocations.map(location => (
                    <label key={location} className="flex items-center">
                      <input
                        type="radio"
                        name="location"
                        checked={filters.location?.city === location}
                        onChange={() => updateFilters({ 
                          location: { ...filters.location, city: location } 
                        })}
                        className="mr-2"
                      />
                      <span className="text-sm">{location}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remote"
                  checked={filters.location?.remote || false}
                  onChange={(e) => updateFilters({
                    location: { ...filters.location, remote: e.target.checked }
                  })}
                  className="mr-2"
                />
                <label htmlFor="remote" className="text-sm">Remote work</label>
              </div>
            </div>
          )}
        </div>

        {/* Salary Range */}
        <div>
          {renderSectionHeader('Salary Range', <DollarSign className="w-4 h-4" />, 'salary')}
          {expandedSections.salary && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Min Salary
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.salary?.min || ''}
                    onChange={(e) => updateFilters({
                      salary: { 
                        ...filters.salary, 
                        min: e.target.value ? parseInt(e.target.value) : undefined 
                      }
                    })}
                    className="w-full px-2 py-1 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Max Salary
                  </label>
                  <input
                    type="number"
                    placeholder="∞"
                    value={filters.salary?.max || ''}
                    onChange={(e) => updateFilters({
                      salary: { 
                        ...filters.salary, 
                        max: e.target.value ? parseInt(e.target.value) : undefined 
                      }
                    })}
                    className="w-full px-2 py-1 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <select
                value={filters.salary?.currency || 'USD'}
                onChange={(e) => updateFilters({
                  salary: { ...filters.salary, currency: e.target.value }
                })}
                className="w-full px-2 py-1 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="USD">USD</option>
                <option value="VND">VND</option>
              </select>
            </div>
          )}
        </div>

        {/* Job Type */}
        <div>
          {renderSectionHeader('Job Type', <Briefcase className="w-4 h-4" />, 'jobType')}
          {expandedSections.jobType && (
            <div className="p-4 space-y-2">
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
          )}
        </div>

        {/* Experience Level */}
        <div>
          {renderSectionHeader('Experience Level', <TrendingUp className="w-4 h-4" />, 'experience')}
          {expandedSections.experience && (
            <div className="p-4 space-y-2">
              {JOB_MATCHING_CONFIG.EXPERIENCE_LEVELS.map(({ value, label }) => (
                <label key={value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.experienceLevel?.includes(value as any) || false}
                    onChange={(e) => {
                      const currentLevels = filters.experienceLevel || [];
                      const newLevels = e.target.checked
                        ? [...currentLevels, value as any]
                        : currentLevels.filter(level => level !== value);
                      updateFilters({ experienceLevel: newLevels.length > 0 ? newLevels : undefined });
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Company Size */}
        <div>
          {renderSectionHeader('Company Size', <Building2 className="w-4 h-4" />, 'company')}
          {expandedSections.company && (
            <div className="p-4 space-y-2">
              {JOB_MATCHING_CONFIG.COMPANY_SIZES.map(({ value, label }) => (
                <label key={value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.companySize?.includes(value as any) || false}
                    onChange={(e) => {
                      const currentSizes = filters.companySize || [];
                      const newSizes = e.target.checked
                        ? [...currentSizes, value as any]
                        : currentSizes.filter(size => size !== value);
                      updateFilters({ companySize: newSizes.length > 0 ? newSizes : undefined });
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Skills */}
        <div>
          {renderSectionHeader('Skills', <Hash className="w-4 h-4" />, 'skills')}
          {expandedSections.skills && (
            <div className="p-4 space-y-3">
              <input
                type="text"
                placeholder="Search skills..."
                value={skillSearchTerm}
                onChange={(e) => setSkillSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                {filteredSkills.map(skill => (
                  <Button
                    key={skill}
                    variant={filters.skills?.includes(skill) ? "primary" : "tertiary"}
                    size="sm"
                    onClick={() => {
                      const currentSkills = filters.skills || [];
                      const newSkills = currentSkills.includes(skill)
                        ? currentSkills.filter(s => s !== skill)
                        : [...currentSkills, skill];
                      updateFilters({ skills: newSkills.length > 0 ? newSkills : undefined });
                    }}
                    className="text-xs"
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Date Posted */}
        <div>
          {renderSectionHeader('Date Posted', <Clock className="w-4 h-4" />, 'posted')}
          {expandedSections.posted && (
            <div className="p-4 space-y-2">
              {[
                { value: '24h', label: 'Last 24 hours' },
                { value: '7d', label: 'Last 7 days' },
                { value: '30d', label: 'Last 30 days' },
                { value: '90d', label: 'Last 90 days' }
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center">
                  <input
                    type="radio"
                    name="postedWithin"
                    checked={filters.postedWithin === value}
                    onChange={() => updateFilters({ postedWithin: value as any })}
                    className="mr-2"
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};