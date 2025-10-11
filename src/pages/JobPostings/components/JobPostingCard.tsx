import React from 'react';
import { Briefcase, Clock, Users, Eye, Edit, Trash2, MoreVertical } from 'lucide-react';
import type { JobProfile } from '../../../types/jobPosting';
import { useTranslation } from '../../../hooks/useTranslation';

interface JobPostingCardProps {
  jobProfile: JobProfile;
  onViewMatches: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const JobPostingCard: React.FC<JobPostingCardProps> = ({
  jobProfile,
  onViewMatches,
  onEdit,
  onDelete,
}) => {
  const { getContent } = useTranslation();
  const [showMenu, setShowMenu] = React.useState(false);

  // Color mapping for skill badges
  const getSkillColor = (skill: string, isRequired: boolean) => {
    const colors = {
      JavaScript: 'bg-yellow-100 text-yellow-700',
      React: 'bg-blue-100 text-blue-700',
      'Node.js': 'bg-green-100 text-green-700',
      Python: 'bg-indigo-100 text-indigo-700',
      HTML: 'bg-orange-100 text-orange-700',
      CSS: 'bg-pink-100 text-pink-700',
      TypeScript: 'bg-blue-100 text-blue-700',
      PostgreSQL: 'bg-cyan-100 text-cyan-700',
      Django: 'bg-emerald-100 text-emerald-700',
      Redis: 'bg-red-100 text-red-700',
      Docker: 'bg-sky-100 text-sky-700',
      Kubernetes: 'bg-purple-100 text-purple-700',
      AWS: 'bg-amber-100 text-amber-700',
      'Vue.js': 'bg-teal-100 text-teal-700',
      Sass: 'bg-fuchsia-100 text-fuchsia-700',
      'Machine Learning': 'bg-violet-100 text-violet-700',
      SQL: 'bg-lime-100 text-lime-700',
      Statistics: 'bg-rose-100 text-rose-700',
      TensorFlow: 'bg-orange-100 text-orange-700',
      PyTorch: 'bg-red-100 text-red-700',
      R: 'bg-blue-100 text-blue-700',
    };
    
    return colors[skill as keyof typeof colors] || (isRequired ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700');
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-lg transition-all duration-200">
      {/* Header with Icon and Menu */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-semibold text-neutral-900 text-lg">{jobProfile.title}</div>
            <div className="text-sm text-neutral-500">{getContent('jobPostings.jobProfile')}</div>
          </div>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-neutral-600" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-10">
              <button
                onClick={() => {
                  onEdit(jobProfile.id);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-50 flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                {getContent('jobPostings.edit')}
              </button>
              <button
                onClick={() => {
                  onDelete(jobProfile.id);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                {getContent('jobPostings.delete')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="text-sm text-neutral-600 mb-4">
        {jobProfile.description}
      </div>

      {/* Experience and Active Matches */}
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <Clock className="w-4 h-4" />
          <span>{getContent('jobPostings.experience')}</span>
          <span className="font-medium text-neutral-900">{jobProfile.experience}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <Users className="w-4 h-4" />
          <span>{getContent('jobPostings.activeMatches')}</span>
          <span className="font-medium text-neutral-900">{jobProfile.activeMatches}</span>
        </div>
      </div>

      {/* Required Skills */}
      <div className="mb-3">
        <div className="text-xs font-medium text-neutral-700 mb-2">
          {getContent('jobPostings.requiredSkills')}
        </div>
        <div className="flex flex-wrap gap-2">
          {jobProfile.requiredSkills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className={`px-3 py-1 rounded-lg text-xs font-medium ${getSkillColor(skill, true)}`}
            >
              {skill}
            </span>
          ))}
          {jobProfile.requiredSkills.length > 4 && (
            <span className="px-3 py-1 rounded-lg text-xs font-medium bg-neutral-100 text-neutral-700">
              +{jobProfile.requiredSkills.length - 4} {getContent('jobPostings.more')}
            </span>
          )}
        </div>
      </div>

      {/* Preferred Skills */}
      <div className="mb-6">
        <div className="text-xs font-medium text-neutral-700 mb-2">
          {getContent('jobPostings.preferredSkills')}
        </div>
        <div className="flex flex-wrap gap-2">
          {jobProfile.preferredSkills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className={`px-3 py-1 rounded-lg text-xs font-medium ${getSkillColor(skill, false)}`}
            >
              {skill}
            </span>
          ))}
          {jobProfile.preferredSkills.length > 3 && (
            <span className="px-3 py-1 rounded-lg text-xs font-medium bg-neutral-100 text-neutral-700">
              +{jobProfile.preferredSkills.length - 3} {getContent('jobPostings.more')}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
        <button
          onClick={() => onViewMatches(jobProfile.id)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-all text-sm font-medium text-neutral-700"
        >
          <Eye className="w-4 h-4" />
          {getContent('jobPostings.viewMatches')}
        </button>
        <button
          onClick={() => onEdit(jobProfile.id)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:shadow-lg transition-all text-sm font-medium"
        >
          <Edit className="w-4 h-4" />
          {getContent('jobPostings.edit')}
        </button>
        <button
          onClick={() => onDelete(jobProfile.id)}
          className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
