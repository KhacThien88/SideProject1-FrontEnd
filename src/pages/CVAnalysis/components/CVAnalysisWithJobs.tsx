import React, { useMemo, useState, useCallback } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { JobCard } from '../../../components/JobMatching/JobCard';
import { JobRecommendationFilters } from './JobRecommendationFilters';
import { JobDetailPage } from '../../JobMatching/JobDetailPage';
import { 
  FileText, 
  Download,
  Star,
  TrendingUp,
  Users,
  MapPin,
  Award,
  Filter
} from 'lucide-react';
import type { DetailedAnalysisResult } from '../../../types/cvAnalysis';
import type { JobSearchFilters, JobMatchResult } from '../../../types/jobMatching';
import { 
  generateMockJobs, 
  filterJobs
} from '../../../utils/jobMatchingUtils';
import { useToast } from '../../../contexts/ToastContext';

interface CVAnalysisWithJobsProps {
  analysisResults: DetailedAnalysisResult[];
  onJobSave?: (jobId: string) => void;
  onJobApply?: (jobId: string) => void;
  onJobShare?: (jobId: string) => void;
  onJobViewDetails?: (jobId: string) => void;
  savedJobIds?: string[];
}

export const CVAnalysisWithJobs: React.FC<CVAnalysisWithJobsProps> = ({
  analysisResults,
  onJobSave = () => {},
  onJobApply = () => {},
  onJobShare = () => {},
  onJobViewDetails = () => {},
  savedJobIds = []
}) => {
  const { showSuccessToast, showInfoToast } = useToast();
  const [searchFilters, setSearchFilters] = useState<JobSearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJobResult, setSelectedJobResult] = useState<JobMatchResult | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

  // Generate all job recommendations based on CV analysis
  const allJobRecommendations = useMemo(() => {
    if (analysisResults.length === 0) return [];
    
    // Take the first CV result as primary (in real app, might combine multiple CVs)
    const primaryCV = analysisResults[0];
    
    // Generate more jobs for better filtering experience
    const mockJobs = generateMockJobs(30);
    
    // Filter and rank jobs based on CV skills
    const rankedJobs = mockJobs.map(job => {
      // Calculate match score based on detected skills
      const matchedSkills = job.skills.filter(jobSkill =>
        primaryCV.detectedSkills.some(cvSkill => 
          cvSkill.name.toLowerCase().includes(jobSkill.toLowerCase()) ||
          jobSkill.toLowerCase().includes(cvSkill.name.toLowerCase())
        )
      );
      
      const skillsMatchPercentage = Math.round((matchedSkills.length / job.skills.length) * 100);
      const overallMatch = Math.min(95, Math.max(40, skillsMatchPercentage + Math.random() * 20));
      
      return {
        job,
        matchScore: Math.round(overallMatch),
        skillsMatch: {
          matched: matchedSkills,
          missing: job.skills.filter(skill => !matchedSkills.includes(skill)),
          percentage: skillsMatchPercentage
        },
        experienceMatch: {
          score: 70 + Math.floor(Math.random() * 25),
          analysis: 'Your experience level matches the job requirements'
        },
        locationMatch: {
          score: job.location.remote ? 100 : 75 + Math.floor(Math.random() * 25),
          distance: job.location.remote ? 0 : Math.floor(Math.random() * 50)
        },
        salaryMatch: {
          score: 80 + Math.floor(Math.random() * 20),
          comparison: 'within' as const
        },
        overallAnalysis: `Strong match based on your ${primaryCV.detectedSkills.slice(0, 3).map(s => s.name).join(', ')} skills`,
        recommendationLevel: overallMatch >= 80 ? 'high' as const : overallMatch >= 60 ? 'medium' as const : 'low' as const
      };
    });
    
    // Sort by match score
    return rankedJobs.sort((a, b) => b.matchScore - a.matchScore);
  }, [analysisResults]);

  // Apply filters to job recommendations
  const filteredJobRecommendations = useMemo(() => {
    if (Object.keys(searchFilters).length === 0) {
      return allJobRecommendations.slice(0, 12);
    }
    
    const filtered = filterJobs(allJobRecommendations, searchFilters);
    return filtered.slice(0, 20);
  }, [allJobRecommendations, searchFilters]);

  const detectedSkills = useMemo(() => {
    if (analysisResults.length === 0) return [];
    return analysisResults[0].detectedSkills.map(skill => skill.name);
  }, [analysisResults]);

  const handleFiltersChange = useCallback((newFilters: JobSearchFilters) => {
    setSearchFilters(newFilters);
  }, []);

  const handleJobViewDetailsLocal = useCallback((jobId: string) => {
    const jobResult = allJobRecommendations.find(jr => jr.job.id === jobId);
    if (jobResult) {
      setSelectedJobResult(jobResult);
      setViewMode('detail');
    }
    onJobViewDetails(jobId);
  }, [allJobRecommendations, onJobViewDetails]);

  const handleBackToList = useCallback(() => {
    setSelectedJobResult(null);
    setViewMode('list');
  }, []);

  const handleJobSave = (job: any) => {
    onJobSave(job.id);
    showSuccessToast('Job saved', `${job.title} has been saved to your favorites`);
  };

  const handleJobApply = (jobId: string) => {
    onJobApply(jobId);
    showInfoToast('Application', 'Redirecting to application page...');
  };

  const handleJobShare = (job: any) => {
    onJobShare(job.id);
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
  };

  if (analysisResults.length === 0) {
    return null;
  }

  const primaryCV = analysisResults[0];

  // Separate CV Analysis section - always visible
  const cvAnalysisSection = (
    <div className="space-y-8">
      {/* CV Analysis Summary */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-900 mb-1">CV Analysis Complete</div>
              <div className="text-neutral-600">
                Analyzed {analysisResults.length} resume{analysisResults.length > 1 ? 's' : ''} • 
                Found {primaryCV.detectedSkills.length} skills • 
                {allJobRecommendations.length} job matches
              </div>
            </div>
          </div>
          
          <Button
            variant="tertiary"
            size="sm"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* CV Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-primary-600" />
              <span className="font-medium text-primary-800">Overall Score</span>
            </div>
            <div className="text-2xl font-bold text-primary-900">{primaryCV.overallScore}%</div>
          </div>
          
          <div className="bg-gradient-to-r from-success-50 to-success-100 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-success-600" />
              <span className="font-medium text-success-800">Skills Detected</span>
            </div>
            <div className="text-2xl font-bold text-success-900">{primaryCV.detectedSkills.length}</div>
          </div>
          
          <div className="bg-gradient-to-r from-warning-50 to-warning-100 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-warning-600" />
              <span className="font-medium text-warning-800">Experience Level</span>
            </div>
            <div className="text-2xl font-bold text-warning-900">{primaryCV.experience}%</div>
          </div>
          
          <div className="bg-gradient-to-r from-secondary-50 to-secondary-100 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-secondary-600" />
              <span className="font-medium text-secondary-800">Job Matches</span>
            </div>
            <div className="text-2xl font-bold text-secondary-900">{allJobRecommendations.length}</div>
          </div>
        </div>

        {/* Detected Skills */}
        <div className="mb-6">
          <div className="text-lg font-semibold text-neutral-900 mb-3">Detected Skills</div>
          <div className="flex flex-wrap gap-2">
            {primaryCV.detectedSkills.map((skill, index) => (
              <Badge
                key={index}
                variant="primary"
                className="flex items-center gap-1"
              >
                {skill.name}
                <span className="text-xs opacity-75">({skill.confidence}%)</span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-lg">
          <div>
            <div className="text-sm font-medium text-neutral-700 mb-1">Candidate</div>
            <div className="text-neutral-900">{primaryCV.contactInfo.name}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-700 mb-1">Location</div>
            <div className="text-neutral-900">{primaryCV.contactInfo.location}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-700 mb-1">Email</div>
            <div className="text-neutral-900">{primaryCV.contactInfo.email}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-700 mb-1">Phone</div>
            <div className="text-neutral-900">{primaryCV.contactInfo.phone}</div>
          </div>
        </div>
      </Card>
    </div>
  );

  // Job Recommendations Section (conditional - can be list or detail)

  // Job Recommendations Section (can be list or detail)
  const jobRecommendationsSection = viewMode === 'detail' && selectedJobResult ? (
    <JobDetailPage
      jobMatchResult={selectedJobResult}
      onBack={handleBackToList}
      className="mt-8"
    />
  ) : (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-2xl font-bold text-neutral-900 mb-1">Recommended Jobs</div>
          <div className="text-neutral-600">
            Based on your CV analysis, here are {filteredJobRecommendations.length} jobs that match your profile
            {Object.keys(searchFilters).length > 0 && ` (filtered from ${allJobRecommendations.length} total)`}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="tertiary" 
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {Object.keys(searchFilters).length > 0 && (
              <Badge variant="primary" size="sm">{Object.keys(searchFilters).length}</Badge>
            )}
          </Button>
          <Button variant="primary" size="sm">
            <Star className="w-4 h-4 mr-2" />
            Save Search
          </Button>
        </div>
      </div>

      {/* Filters Component */}
      {showFilters && (
        <div className="mb-6">
          <JobRecommendationFilters
            filters={searchFilters}
            onFiltersChange={handleFiltersChange}
            detectedSkills={detectedSkills}
          />
        </div>
      )}

      {/* No Results Message */}
      {filteredJobRecommendations.length === 0 && Object.keys(searchFilters).length > 0 && (
        <Card className="p-8 text-center">
          <div className="text-neutral-500 mb-4">
            <Filter className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <div className="text-lg font-medium">No jobs match your current filters</div>
            <div className="text-sm">Try adjusting your filters to see more results</div>
          </div>
          <Button 
            variant="secondary" 
            onClick={() => setSearchFilters({})}
          >
            Clear All Filters
          </Button>
        </Card>
      )}

      {/* Job Cards */}
      {filteredJobRecommendations.length > 0 && (
        <div className="space-y-4">
          {filteredJobRecommendations.map((jobResult) => (
            <JobCard
              key={jobResult.job.id}
              job={jobResult}
              onSave={handleJobSave}
              onApply={handleJobApply}
              onShare={handleJobShare}
              onViewDetails={handleJobViewDetailsLocal}
              isSaved={savedJobIds.includes(jobResult.job.id)}
            />
          ))}
        </div>
      )}

      {/* View More Jobs */}
      {filteredJobRecommendations.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="secondary" size="lg">
            View All Matching Jobs ({allJobRecommendations.length}+)
          </Button>
        </div>
      )}
    </div>
  );

  // Return combined view
  return (
    <div>
      {cvAnalysisSection}
      {jobRecommendationsSection}
    </div>
  );
};