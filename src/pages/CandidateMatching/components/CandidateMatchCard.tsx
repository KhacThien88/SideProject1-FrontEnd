import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Download,
  CheckCircle,
  Clock,
  Star,
  TrendingUp
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import type { CandidateMatch } from '../../../types/candidateMatch';
import { useTranslation } from '../../../hooks/useTranslation';

interface CandidateMatchCardProps {
  candidate: CandidateMatch;
  onToggleSave: (id: string) => void;
  onDownloadResume: (resumeUrl: string) => void;
  onViewDetails: (id: string) => void;
}

export const CandidateMatchCard: React.FC<CandidateMatchCardProps> = ({
  candidate,
  onToggleSave,
  onDownloadResume,
  onViewDetails,
}) => {
  const { getContent } = useTranslation();

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-neutral-600 bg-neutral-50 border-neutral-200';
  };

  return (
    <Card variant="default" hover={true} className="bg-white backdrop-blur-sm group p-6">
      {/* Header: Avatar + Basic Info + Match Score */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="relative">
          <img
            src={candidate.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.candidateName)}&background=random`}
            alt={candidate.candidateName}
            className="w-16 h-16 rounded-full object-cover border-2 border-neutral-200 shadow-md group-hover:shadow-lg transition-shadow"
          />
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold shadow-sm ${getMatchScoreColor(candidate.matchScore)}`}>
            {candidate.matchScore}
          </div>
        </div>

        {/* Basic Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <button
              onClick={() => onViewDetails(candidate.id)}
              className="font-semibold text-lg text-neutral-900 hover:text-primary-600 transition-colors truncate"
            >
              {candidate.candidateName}
            </button>
          </div>
          
          <div className="text-sm text-neutral-600 mb-2">{candidate.currentRole}</div>
          
          {/* Contact Info */}
          <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
            <div className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span className="truncate max-w-[180px]">{candidate.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>{candidate.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{candidate.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Match Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-neutral-200">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-primary-600 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-lg font-bold">{candidate.matchScore}%</span>
          </div>
          <div className="text-xs text-neutral-500">{getContent('candidateMatches.overallMatch')}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-secondary-600 mb-1">
            <CheckCircle className="w-4 h-4" />
            <span className="text-lg font-bold">{candidate.skillsMatch}%</span>
          </div>
          <div className="text-xs text-neutral-500">{getContent('candidateMatches.skillsMatch')}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-accent-600 mb-1">
            <Briefcase className="w-4 h-4" />
            <span className="text-lg font-bold">{candidate.yearsOfExperience}y</span>
          </div>
          <div className="text-xs text-neutral-500">{getContent('candidateMatches.experience')}</div>
        </div>
      </div>

      {/* Professional Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-neutral-700">
          <Briefcase className="w-4 h-4 text-neutral-400" />
          <span>{candidate.yearsOfExperience} {getContent('candidateMatches.yearsExperience')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-700">
          <GraduationCap className="w-4 h-4 text-neutral-400" />
          <span>{candidate.education}</span>
        </div>
      </div>

      {/* Matched Skills */}
      <div className="mb-4">
        <div className="text-xs font-medium text-neutral-700 mb-2">
          {getContent('candidateMatches.matchedSkills')} ({candidate.matchedSkills.length})
        </div>
        <div className="flex flex-wrap gap-2">
          {candidate.matchedSkills.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {candidate.matchedSkills.length > 5 && (
            <span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-xs font-medium">
              +{candidate.matchedSkills.length - 5} {getContent('candidateMatches.more')}
            </span>
          )}
        </div>
      </div>

      {/* Missing Skills */}
      {candidate.missingSkills.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-medium text-neutral-700 mb-2">
            {getContent('candidateMatches.missingSkills')}
          </div>
          <div className="flex flex-wrap gap-2">
            {candidate.missingSkills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {candidate.summary && (
        <div className="mb-4 pb-4 border-b border-neutral-200">
          <div className="text-sm text-neutral-600 line-clamp-2">
            {candidate.summary}
          </div>
        </div>
      )}

      {/* Applied Date */}
      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-4">
        <Clock className="w-3.5 h-3.5" />
        <span>
          {getContent('candidateMatches.appliedOn')} {new Date(candidate.appliedDate).toLocaleDateString()}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Button
          onClick={() => onDownloadResume(candidate.resumeUrl)}
          variant="secondary"
          size="md"
          className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-md"
        >
          <Download className="w-4 h-4 mr-2" />
          {getContent('candidateMatches.downloadResume')}
        </Button>

        <button
          onClick={() => onToggleSave(candidate.id)}
          className={`p-2.5 border rounded-xl transition-all ${
            candidate.isSaved
              ? 'bg-yellow-50 border-yellow-400 text-yellow-600 hover:bg-yellow-100'
              : 'border-neutral-300 text-neutral-400 hover:bg-neutral-50 hover:text-yellow-500'
          }`}
          title={candidate.isSaved ? getContent('candidateMatches.unsave') : getContent('candidateMatches.save')}
        >
          <Star className={`w-4 h-4 ${candidate.isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>
    </Card>
  );
};
