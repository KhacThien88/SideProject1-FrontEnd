import React, { useState, useMemo } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  ArrowLeft,
  MapPin,
  Building2,
  DollarSign,
  Clock,
  Users,
  Calendar,
  ExternalLink,
  Bookmark,
  Share2,
  CheckCircle,
  AlertCircle,
  Star,
  Eye,
  Download,
  MessageCircle,
  Briefcase
} from 'lucide-react';
import type { JobMatchResult, Job } from '../../types/jobMatching';
import { 
  formatSalary, 
  calculateTimeAgo, 
  getMatchScoreColor, 
  getMatchScoreText,
  highlightMatchedSkills,
  generateMockJobs,
  generateMockJobMatchResults
} from '../../utils/jobMatchingUtils';
import { cn } from '../../utils/cn';
import { useTranslation } from '../../hooks/useTranslation';

interface JobDetailViewProps {
  jobId?: string;
  jobMatchResult?: JobMatchResult;
  onBack?: () => void;
  onSave?: (job: Job) => void;
  onApply?: (jobId: string) => void;
  onShare?: (job: Job) => void;
  isSaved?: boolean;
  className?: string;
}

export const JobDetailView: React.FC<JobDetailViewProps> = ({
  jobMatchResult,
  onBack,
  onSave = () => {},
  onApply = () => {},
  onShare = () => {},
  isSaved = false,
  className
}) => {
  const { getContent } = useTranslation();
  
  // Mock data for development - replace with actual data fetching
  const mockJobs = useMemo(() => generateMockJobs(1), []);
  const mockResults = useMemo(() => generateMockJobMatchResults(mockJobs), [mockJobs]);
  const result = jobMatchResult || mockResults[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'company'>('overview');

  if (!result) {
    return (
      <div className="text-center py-12">
        <div className="text-lg font-semibold text-neutral-900 mb-2">{getContent('jobs.details.jobNotFound')}</div>
        <div className="text-neutral-600 mb-4">{getContent('jobs.details.jobNotFoundDescription')}</div>
        <Button variant="primary" onClick={onBack}>
          {getContent('jobs.details.backToResults')}
        </Button>
      </div>
    );
  }

  const { job, matchScore, skillsMatch, experienceMatch, locationMatch, salaryMatch, overallAnalysis } = result;
  const scoreColorClass = getMatchScoreColor(matchScore);
  const highlightedSkills = highlightMatchedSkills(job.skills, skillsMatch.matched);

  const handleSave = () => onSave(job);
  const handleApply = () => onApply(job.id);
  const handleShare = () => onShare(job);

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center gap-4">
        {onBack && (
          <Button variant="tertiary" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {getContent('common.back')}
          </Button>
        )}
        <div className="flex-1">
          <div className="text-sm text-neutral-600">{getContent('jobs.details.title')}</div>
          <div className="text-xl font-bold text-neutral-900">{job.title}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header Card */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                {job.company.logo ? (
                  <img 
                    src={job.company.logo} 
                    alt={job.company.name}
                    className="w-6 h-6 rounded-lg object-cover border border-neutral-200"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                )}
                
                <div>
                  <div className="text-xl font-bold text-neutral-900 mb-1">{job.title}</div>
                  <div className="flex items-center gap-4 text-neutral-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium text-sm">{job.company.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location.city}, {job.location.country}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-neutral-500" />
                      <span>{getContent('jobs.details.postedAgo')} {calculateTimeAgo(job.postedDate, getContent)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-neutral-500" />
                      <span>247 {getContent('jobs.details.views')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-neutral-500" />
                      <span>12 {getContent('jobs.details.applicants')}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <div className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold",
                  scoreColorClass
                )}>
                  {matchScore}% {getContent('jobs.details.match')}
                </div>
                <span className="text-sm text-neutral-500">
                  {getMatchScoreText(matchScore, getContent)}
                </span>
              </div>
            </div>

            {/* Job Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="primary" className="capitalize">
                {job.type.replace('-', ' ')}
              </Badge>
              {job.location.remote && <Badge variant="info">{getContent('jobs.details.remote')}</Badge>}
              {job.location.hybrid && <Badge variant="info">{getContent('jobs.details.hybrid')}</Badge>}
              {job.tags.map(tag => (
                <Badge key={tag} variant="accent" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-neutral-50 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-neutral-600 mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm font-medium">{getContent('jobs.details.salary')}</span>
                </div>
                <div className="font-semibold text-neutral-900 text-sm">
                  {formatSalary(job.salary.min, job.salary.max, job.salary.currency, job.salary.period, getContent)}
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-neutral-600 mb-1">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm font-medium">{getContent('jobs.details.experience')}</span>
                </div>
                <div className="font-semibold text-neutral-900 text-sm">{job.requirements.experience}</div>
              </div>
              
              {job.deadline && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-neutral-600 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{getContent('jobs.details.deadline')}</span>
                  </div>
                  <div className="font-semibold text-neutral-900">
                    {new Date(job.deadline).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3 mt-6">
                <div className="flex items-center gap-4">
              <Button
                variant="primary"
                onClick={handleApply}
                className="flex items-center gap-2 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                {getContent('jobs.details.applyNow')}
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleSave}
                className={cn(
                  "flex items-center gap-2 text-sm",
                  isSaved && "bg-warning-100 text-warning-700 border-warning-300"
                )}
              >
                <Bookmark className={cn("w-4 h-4", isSaved && "fill-current")} />
                {isSaved ? getContent('jobs.details.saved') : getContent('jobs.details.saveJob')}
              </Button>
              </div>
             <div className="flex items-center gap-2"> 
              <Button
                variant="tertiary"
                onClick={handleShare}
                className="flex items-center gap-2 text-sm"
              >
                <Share2 className="w-4 h-4" />
                {getContent('jobs.details.share')}
              </Button>
              
              <Button variant="tertiary" className="flex items-center gap-2 text-sm">
                <MessageCircle className="w-4 h-4" />
                {getContent('jobs.details.contact')}
              </Button>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <Card>
            <div className="border-b border-neutral-200">
              <nav className="flex">
                {[
                  { key: 'overview', label: getContent('jobs.details.tabs.overview') },
                  { key: 'requirements', label: getContent('jobs.details.tabs.requirements') },
                  { key: 'company', label: getContent('jobs.details.tabs.company') }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={cn(
                      "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                      activeTab === tab.key
                        ? "border-primary-500 text-primary-600"
                        : "border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <div className="text-lg font-semibold text-neutral-900 mb-3">{getContent('jobs.details.jobDescription')}</div>
                    <div className="prose prose-neutral max-w-none">
                      <div>{job.description}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-lg font-semibold text-neutral-900 mb-3">{getContent('jobs.details.benefitsPerks')}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {job.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success-600" />
                          <span className="text-neutral-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'requirements' && (
                <div className="space-y-6">
                  <div>
                    <div className="text-lg font-semibold text-neutral-900 mb-3">{getContent('jobs.details.essentialRequirements')}</div>
                    <ul className="space-y-2">
                      {job.requirements.essential.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-success-600 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="text-lg font-semibold text-neutral-900 mb-3">{getContent('jobs.details.preferredQualifications')}</div>
                    <ul className="space-y-2">
                      {job.requirements.preferred.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Star className="w-4 h-4 text-warning-500 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="text-lg font-semibold text-neutral-900 mb-3">{getContent('jobs.details.requiredSkills')}</div>
                    <div className="flex flex-wrap gap-2">
                      {highlightedSkills.map(({ skill, matched }, index) => (
                        <Badge
                          key={index}
                          variant={matched ? "success" : "neutral"}
                          className={matched ? "ring-2 ring-success-300" : "opacity-70"}
                        >
                          {skill}
                          {matched && <CheckCircle className="w-3 h-3 ml-1" />}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'company' && (
                <div className="space-y-6">
                  <div>
                    <div className="text-lg font-semibold text-neutral-900 mb-3">{getContent('jobs.details.about')} {job.company.name}</div>
                    <div className="text-neutral-700">
                      {job.company.name} is a leading company in the {job.company.industry} industry. 
                      We are committed to innovation and excellence in everything we do.
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-neutral-700 mb-1">{getContent('jobs.details.industry')}</div>
                      <div className="text-neutral-900">{job.company.industry}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-700 mb-1">{getContent('jobs.details.companySize')}</div>
                      <div className="text-neutral-900 capitalize">{job.company.size}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-700 mb-1">{getContent('jobs.details.location')}</div>
                      <div className="text-neutral-900">{job.company.location}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Match Analysis */}
          <Card className="p-6">
            <div className="text-lg font-semibold text-neutral-900 mb-4">{getContent('jobs.details.matchAnalysis')}</div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700">{getContent('jobs.details.requiredSkills')}</span>
                  <span className="text-sm font-semibold text-success-600">{skillsMatch.percentage}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-success-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${skillsMatch.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-neutral-600 mt-1">
                  {skillsMatch.matched.length} {getContent('jobs.details.skillsMatched').replace('{total}', job.skills.length.toString())}
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700">{getContent('jobs.details.experience')}</span>
                  <span className="text-sm font-semibold text-warning-600">{experienceMatch.score}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-warning-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${experienceMatch.score}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700">{getContent('jobs.details.location')}</span>
                  <span className="text-sm font-semibold text-primary-600">{locationMatch.score}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${locationMatch.score}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700">{getContent('jobs.details.salary')}</span>
                  <span className="text-sm font-semibold text-secondary-600">{salaryMatch.score}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-secondary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${salaryMatch.score}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-neutral-50 rounded-lg">
              <div className="text-xs font-medium text-neutral-700 mb-1">{getContent('jobs.details.aiAnalysis')}</div>
              <div className="text-xs text-neutral-600">{overallAnalysis}</div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <div className="text-lg font-semibold text-neutral-900 mb-4">{getContent('jobs.details.quickActions')}</div>
            <div className="space-y-3">
              <Button variant="primary" className="w-full justify-start text-sm" onClick={handleApply}>
                <ExternalLink className="w-4 h-4 mr-2" />
                {getContent('jobs.details.applyNow')}
              </Button>
              <Button variant="secondary" className="w-full justify-start text-sm" onClick={handleSave}>
                <Bookmark className="w-4 h-4 mr-2" />
                {getContent('jobs.details.saveForLater')}
              </Button>
              <Button variant="tertiary" className="w-full justify-start text-sm">
                <Download className="w-4 h-4 mr-2" />
                {getContent('jobs.details.downloadJD')}
              </Button>
              <Button variant="tertiary" className="w-full justify-start text-sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                {getContent('jobs.details.shareJob')}
              </Button>
            </div>
          </Card>

          {/* Application Tips */}
          <Card className="p-6">
            <div className="text-lg font-semibold text-neutral-900 mb-4">{getContent('jobs.details.applicationTips')}</div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium text-neutral-900">{getContent('jobs.details.highlightMatchingSkills')}</div>
                  <div className="text-neutral-600">{getContent('jobs.details.emphasizeExperience')} {skillsMatch.matched.slice(0, 3).join(', ')}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-warning-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium text-neutral-900">{getContent('jobs.details.addressSkillGaps')}</div>
                  <div className="text-neutral-600">{getContent('jobs.details.considerLearningPlans')} {skillsMatch.missing.slice(0, 2).join(', ')}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Star className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium text-neutral-900">{getContent('jobs.details.standOut')}</div>
                  <div className="text-neutral-600">{getContent('jobs.details.customizeApplication')} {job.company.name}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};