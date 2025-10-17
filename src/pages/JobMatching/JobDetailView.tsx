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
  // Mock data for development - replace with actual data fetching
  const mockJobs = useMemo(() => generateMockJobs(1), []);
  const mockResults = useMemo(() => generateMockJobMatchResults(mockJobs), [mockJobs]);
  const result = jobMatchResult || mockResults[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'company' | 'similar'>('overview');

  if (!result) {
    return (
      <div className="text-center py-12">
        <div className="text-lg font-semibold text-neutral-900 mb-2">Job not found</div>
        <div className="text-neutral-600 mb-4">The job you're looking for doesn't exist or has been removed.</div>
        <Button variant="primary" onClick={onBack}>
          Back to Results
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

  const similarJobs = useMemo(() => generateMockJobs(3), []);

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center gap-4">
        {onBack && (
          <Button variant="tertiary" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        )}
        <div className="flex-1">
          <div className="text-sm text-neutral-600">Job Details</div>
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
                      <span>Posted {calculateTimeAgo(job.postedDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-neutral-500" />
                      <span>247 views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-neutral-500" />
                      <span>12 applicants</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <div className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold",
                  scoreColorClass
                )}>
                  {matchScore}% match
                </div>
                <span className="text-sm text-neutral-500">
                  {getMatchScoreText(matchScore)}
                </span>
              </div>
            </div>

            {/* Job Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="primary" className="capitalize">
                {job.type.replace('-', ' ')}
              </Badge>
              {job.location.remote && <Badge variant="info">Remote</Badge>}
              {job.location.hybrid && <Badge variant="info">Hybrid</Badge>}
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
                  <span className="text-sm font-medium">Salary</span>
                </div>
                <div className="font-semibold text-neutral-900 text-sm">
                  {formatSalary(job.salary.min, job.salary.max, job.salary.currency, job.salary.period)}
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-neutral-600 mb-1">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm font-medium">Experience</span>
                </div>
                <div className="font-semibold text-neutral-900 text-sm">{job.requirements.experience}</div>
              </div>
              
              {job.deadline && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-neutral-600 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Deadline</span>
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
                Apply Now
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
                {isSaved ? 'Saved' : 'Save Job'}
              </Button>
              </div>
             <div className="flex items-center gap-2"> 
              <Button
                variant="tertiary"
                onClick={handleShare}
                className="flex items-center gap-2 text-sm"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              
              <Button variant="tertiary" className="flex items-center gap-2 text-sm">
                <MessageCircle className="w-4 h-4" />
                Contact
              </Button>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <Card>
            <div className="border-b border-neutral-200">
              <nav className="flex">
                {[
                  { key: 'overview', label: 'Overview' },
                  { key: 'requirements', label: 'Requirements' },
                  { key: 'company', label: 'Company' },
                  { key: 'similar', label: 'Similar Jobs' }
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
                    <div className="text-lg font-semibold text-neutral-900 mb-3">Job Description</div>
                    <div className="prose prose-neutral max-w-none">
                      <div>{job.description}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-lg font-semibold text-neutral-900 mb-3">Benefits & Perks</div>
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
                    <div className="text-lg font-semibold text-neutral-900 mb-3">Essential Requirements</div>
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
                    <div className="text-lg font-semibold text-neutral-900 mb-3">Preferred Qualifications</div>
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
                    <div className="text-lg font-semibold text-neutral-900 mb-3">Required Skills</div>
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
                    <div className="text-lg font-semibold text-neutral-900 mb-3">About {job.company.name}</div>
                    <div className="text-neutral-700">
                      {job.company.name} is a leading company in the {job.company.industry} industry. 
                      We are committed to innovation and excellence in everything we do.
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-neutral-700 mb-1">Industry</div>
                      <div className="text-neutral-900">{job.company.industry}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-700 mb-1">Company Size</div>
                      <div className="text-neutral-900 capitalize">{job.company.size}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-700 mb-1">Location</div>
                      <div className="text-neutral-900">{job.company.location}</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'similar' && (
                <div className="space-y-4">
                  <div className="text-lg font-semibold text-neutral-900">Similar Jobs</div>
                  <div className="space-y-4">
                    {similarJobs.map(similarJob => (
                      <div key={similarJob.id} className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-semibold text-neutral-900">{similarJob.title}</div>
                            <div className="text-neutral-600">{similarJob.company.name}</div>
                            <div className="flex items-center gap-4 text-sm text-neutral-500 mt-1">
                              <span>{similarJob.location.city}</span>
                              <span>{formatSalary(similarJob.salary.min, similarJob.salary.max, similarJob.salary.currency, similarJob.salary.period)}</span>
                            </div>
                          </div>
                          <Button variant="tertiary" size="sm">View</Button>
                        </div>
                      </div>
                    ))}
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
            <div className="text-lg font-semibold text-neutral-900 mb-4">Match Analysis</div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700">Skills Match</span>
                  <span className="text-sm font-semibold text-success-600">{skillsMatch.percentage}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-success-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${skillsMatch.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-neutral-600 mt-1">
                  {skillsMatch.matched.length} of {job.skills.length} skills matched
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700">Experience</span>
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
                  <span className="text-sm font-medium text-neutral-700">Location</span>
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
                  <span className="text-sm font-medium text-neutral-700">Salary</span>
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
              <div className="text-xs font-medium text-neutral-700 mb-1">AI Analysis</div>
              <div className="text-xs text-neutral-600">{overallAnalysis}</div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <div className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</div>
            <div className="space-y-3">
              <Button variant="primary" className="w-full justify-start text-sm" onClick={handleApply}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Apply Now
              </Button>
              <Button variant="secondary" className="w-full justify-start text-sm" onClick={handleSave}>
                <Bookmark className="w-4 h-4 mr-2" />
                Save for later
              </Button>
              <Button variant="tertiary" className="w-full justify-start text-sm">
                <Download className="w-4 h-4 mr-2" />
                Download JD
              </Button>
              <Button variant="tertiary" className="w-full justify-start text-sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Job
              </Button>
            </div>
          </Card>

          {/* Application Tips */}
          <Card className="p-6">
            <div className="text-lg font-semibold text-neutral-900 mb-4">Application Tips</div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium text-neutral-900">Highlight matching skills</div>
                  <div className="text-neutral-600">Emphasize your {skillsMatch.matched.slice(0, 3).join(', ')} experience</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-warning-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium text-neutral-900">Address skill gaps</div>
                  <div className="text-neutral-600">Consider mentioning your learning plans for {skillsMatch.missing.slice(0, 2).join(', ')}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Star className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium text-neutral-900">Stand out</div>
                  <div className="text-neutral-600">Customize your application for {job.company.name}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};