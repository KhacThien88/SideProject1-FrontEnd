import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { 
  MapPin, 
  Building2, 
  DollarSign, 
  Clock, 
  Bookmark, 
  ExternalLink,
  Share2,
  Star,
  Users
} from 'lucide-react';
import type { JobCardProps } from '../../types/jobMatching';
import { 
  formatSalary, 
  calculateTimeAgo, 
  getMatchScoreColor, 
  getMatchScoreText,
  highlightMatchedSkills 
} from '../../utils/jobMatchingUtils';
import { cn } from '../../utils/cn';

export const JobCard: React.FC<JobCardProps> = ({
  job: jobResult,
  onSave,
  onApply,
  onShare,
  onViewDetails,
  isSaved = false,
  className
}) => {
  const { job, matchScore, skillsMatch, locationMatch } = jobResult;

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave(job);
  };

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    onApply(job.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare(job);
  };

  const handleViewDetails = () => {
    onViewDetails(job.id);
  };

  const highlightedSkills = highlightMatchedSkills(job.skills, skillsMatch.matched);
  const scoreColorClass = getMatchScoreColor(matchScore);

  return (
    <div onClick={handleViewDetails} className="cursor-pointer">
      <Card 
        className={cn(
          "p-6 hover:shadow-brand-md transition-all duration-200 border-l-4",
          matchScore >= 80 ? "border-l-success-500" : 
          matchScore >= 60 ? "border-l-warning-500" : "border-l-neutral-300",
          className
        )}
      >
      {/* Header with Match Score */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-lg font-semibold text-neutral-900 truncate">
              {job.title}
            </div>
            {job.tags.includes('featured') && (
              <Badge variant="accent" size="sm">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            {job.tags.includes('urgent') && (
              <Badge variant="error" size="sm">
                Urgent
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-neutral-600 mb-3">
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              <span className="font-medium">{job.company.name}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location.city}, {job.location.country}</span>
              {job.location.remote && (
                <Badge variant="info" size="sm" className="ml-1">Remote</Badge>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{calculateTimeAgo(job.postedDate)}</span>
            </div>
          </div>
        </div>
        
        {/* Match Score */}
        <div className="flex flex-col items-end gap-2 ml-4">
          <div className={cn(
            "px-3 py-1 rounded-full text-sm font-semibold",
            scoreColorClass
          )}>
            {matchScore}% match
          </div>
          <span className="text-xs text-neutral-500">
            {getMatchScoreText(matchScore)}
          </span>
        </div>
      </div>

      {/* Job Description */}
      <div className="text-neutral-700 text-sm mb-4 line-clamp-2">
        {job.shortDescription || job.description.substring(0, 150) + '...'}
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-neutral-500" />
          <span className="text-neutral-700">
            {formatSalary(job.salary.min, job.salary.max, job.salary.currency, job.salary.period)}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-neutral-500" />
          <span className="text-neutral-700 capitalize">
            {job.type.replace('-', ' ')}
          </span>
        </div>
        
        {job.company.size && (
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-neutral-500" />
            <span className="text-neutral-700 capitalize">
              {job.company.size} company
            </span>
          </div>
        )}
        
        {locationMatch.distance !== undefined && locationMatch.distance > 0 && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-neutral-500" />
            <span className="text-neutral-700">
              {locationMatch.distance}km away
            </span>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="mb-4">
        <div className="text-sm font-medium text-neutral-700 mb-2">Required Skills:</div>
        <div className="flex flex-wrap gap-2">
          {highlightedSkills.slice(0, 6).map(({ skill, matched }, index) => (
            <Badge
              key={index}
              variant={matched ? "success" : "neutral"}
              size="sm"
              className={matched ? "ring-1 ring-success-300" : "opacity-70"}
            >
              {skill}
            </Badge>
          ))}
          {job.skills.length > 6 && (
            <Badge variant="neutral" size="sm" className="opacity-70">
              +{job.skills.length - 6} more
            </Badge>
          )}
        </div>
        
        {skillsMatch.matched.length > 0 && (
          <div className="text-xs text-success-600 mt-1">
            {skillsMatch.matched.length} of {job.skills.length} skills matched ({skillsMatch.percentage}%)
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleApply}
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Apply Now
          </Button>
          
          <Button
            variant="tertiary"
            size="sm"
            onClick={handleSave}
            className={cn(
              "flex items-center gap-2",
              isSaved && "text-warning-600 bg-warning-50"
            )}
          >
            <Bookmark className={cn(
              "w-4 h-4",
              isSaved && "fill-current"
            )} />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
        </div>
        
        <Button
          variant="tertiary"
          size="sm"
          onClick={handleShare}
          className="flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>
      </Card>
    </div>
  );
};