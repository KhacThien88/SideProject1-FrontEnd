import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import type { JobProfile, CreateJobProfileData, ExperienceLevel } from '../../../types/jobPosting';
import { useTranslation } from '../../../hooks/useTranslation';

interface CreateJobProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateJobProfileData) => Promise<void>;
  editingProfile?: JobProfile | null;
}

export const CreateJobProfileModal: React.FC<CreateJobProfileModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingProfile,
}) => {
  const { getContent } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState<ExperienceLevel>('2+ years');
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [preferredSkills, setPreferredSkills] = useState<string[]>([]);
  const [newRequiredSkill, setNewRequiredSkill] = useState('');
  const [newPreferredSkill, setNewPreferredSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingProfile) {
      setTitle(editingProfile.title);
      setDescription(editingProfile.description);
      setExperience(editingProfile.experience);
      setRequiredSkills(editingProfile.requiredSkills);
      setPreferredSkills(editingProfile.preferredSkills);
    } else {
      resetForm();
    }
  }, [editingProfile, isOpen]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setExperience('2+ years');
    setRequiredSkills([]);
    setPreferredSkills([]);
    setNewRequiredSkill('');
    setNewPreferredSkill('');
  };

  const handleAddRequiredSkill = () => {
    if (newRequiredSkill.trim() && !requiredSkills.includes(newRequiredSkill.trim())) {
      setRequiredSkills([...requiredSkills, newRequiredSkill.trim()]);
      setNewRequiredSkill('');
    }
  };

  const handleAddPreferredSkill = () => {
    if (newPreferredSkill.trim() && !preferredSkills.includes(newPreferredSkill.trim())) {
      setPreferredSkills([...preferredSkills, newPreferredSkill.trim()]);
      setNewPreferredSkill('');
    }
  };

  const handleRemoveRequiredSkill = (skill: string) => {
    setRequiredSkills(requiredSkills.filter(s => s !== skill));
  };

  const handleRemovePreferredSkill = (skill: string) => {
    setPreferredSkills(preferredSkills.filter(s => s !== skill));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || requiredSkills.length === 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        experience,
        requiredSkills,
        preferredSkills,
      });
      resetForm();
      onClose();
    } catch (error) {
      console.error('Failed to submit job profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-neutral-900">
            {editingProfile ? getContent('jobPostings.editJobProfile') : getContent('jobPostings.createJobProfile')}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">
              {getContent('jobPostings.jobTitle')}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={getContent('jobPostings.jobTitlePlaceholder')}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">
              {getContent('jobPostings.description')}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={getContent('jobPostings.descriptionPlaceholder')}
              rows={3}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
              required
            />
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">
              {getContent('jobPostings.experienceLevel')}
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value as ExperienceLevel)}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            >
              <option value="0-1 years">0-1 {getContent('jobPostings.years')}</option>
              <option value="1-2 years">1-2 {getContent('jobPostings.years')}</option>
              <option value="2+ years">2+ {getContent('jobPostings.years')}</option>
              <option value="3+ years">3+ {getContent('jobPostings.years')}</option>
              <option value="5+ years">5+ {getContent('jobPostings.years')}</option>
            </select>
          </div>

          {/* Required Skills */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">
              {getContent('jobPostings.requiredSkills')}
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newRequiredSkill}
                onChange={(e) => setNewRequiredSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRequiredSkill())}
                placeholder={getContent('jobPostings.addSkillPlaceholder')}
                className="flex-1 px-4 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <Button
                type="button"
                onClick={handleAddRequiredSkill}
                variant="secondary"
                size="sm"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-md"
              >
                <Plus className="w-4 h-4 mr-2" />
                {getContent('jobPostings.add')}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveRequiredSkill(skill)}
                    className="hover:text-purple-900"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
            {requiredSkills.length === 0 && (
              <div className="text-sm text-neutral-500 italic">{getContent('jobPostings.noSkillsAdded')}</div>
            )}
          </div>

          {/* Preferred Skills */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">
              {getContent('jobPostings.preferredSkills')}
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newPreferredSkill}
                onChange={(e) => setNewPreferredSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPreferredSkill())}
                placeholder={getContent('jobPostings.addSkillPlaceholder')}
                className="flex-1 px-4 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <Button
                type="button"
                onClick={handleAddPreferredSkill}
                variant="secondary"
                size="sm"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-md"
              >
                <Plus className="w-4 h-4 mr-2" />
                {getContent('jobPostings.add')}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {preferredSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemovePreferredSkill(skill)}
                    className="hover:text-emerald-900"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
            {preferredSkills.length === 0 && (
              <div className="text-sm text-neutral-500 italic">{getContent('jobPostings.noSkillsAdded')}</div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-neutral-200">
            <Button
              type="button"
              onClick={onClose}
              variant="tertiary"
              size="md"
              className="flex-1"
            >
              {getContent('jobPostings.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !title.trim() || !description.trim() || requiredSkills.length === 0}
              variant="secondary"
              size="md"
              className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-md"
            >
              {isSubmitting
                ? getContent('jobPostings.saving')
                : editingProfile
                ? getContent('jobPostings.saveChanges')
                : getContent('jobPostings.createProfile')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
