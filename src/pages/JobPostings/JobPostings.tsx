import React, { useState, useEffect } from 'react';
import { Search, Plus, Briefcase } from 'lucide-react';
import { DashboardHeader } from '../../components/layout/DashboardHeader';
import { DashboardSidebar } from '../../components/layout/DashboardSidebar';
import { useTranslation } from '../../hooks/useTranslation';
import { useToast } from '../../contexts/ToastContext';
import { useRouter } from '../../components/Router';
import { jobPostingService } from '../../services/api/jobPosting/jobPostingService';
import type { JobProfile, CreateJobProfileData } from '../../types/jobPosting';
import { JobPostingCard } from './components/JobPostingCard';
import { CreateJobProfileModal } from './components/CreateJobProfileModal';

export const JobPostings: React.FC = () => {
  const { getContent } = useTranslation();
  const { showSuccessToast, showErrorToast } = useToast();
  const { navigate } = useRouter();
  
  const [jobProfiles, setJobProfiles] = useState<JobProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<JobProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<JobProfile | null>(null);

  useEffect(() => {
    loadJobProfiles();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = jobProfiles.filter(
        profile =>
          profile.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.requiredSkills.some(skill => 
            skill.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          profile.preferredSkills.some(skill => 
            skill.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      setFilteredProfiles(filtered);
    } else {
      setFilteredProfiles(jobProfiles);
    }
  }, [searchQuery, jobProfiles]);

  const loadJobProfiles = async () => {
    try {
      setIsLoading(true);
      const profiles = await jobPostingService.getJobProfiles();
      setJobProfiles(profiles);
      setFilteredProfiles(profiles);
    } catch (error) {
      showErrorToast(getContent('jobPostings.loadError'));
      console.error('Failed to load job profiles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrUpdate = async (data: CreateJobProfileData) => {
    try {
      if (editingProfile) {
        await jobPostingService.updateJobProfile(editingProfile.id, data);
        showSuccessToast(getContent('jobPostings.updateSuccess'));
      } else {
        await jobPostingService.createJobProfile(data);
        showSuccessToast(getContent('jobPostings.createSuccess'));
      }
      await loadJobProfiles();
      setIsModalOpen(false);
      setEditingProfile(null);
    } catch (error) {
      showErrorToast(getContent('jobPostings.saveError'));
      console.error('Failed to save job profile:', error);
    }
  };

  const handleEdit = (id: string) => {
    const profile = jobProfiles.find(p => p.id === id);
    if (profile) {
      setEditingProfile(profile);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(getContent('jobPostings.deleteConfirm'))) {
      return;
    }

    try {
      await jobPostingService.deleteJobProfile(id);
      showSuccessToast(getContent('jobPostings.deleteSuccess'));
      await loadJobProfiles();
    } catch (error) {
      showErrorToast(getContent('jobPostings.deleteError'));
      console.error('Failed to delete job profile:', error);
    }
  };

  const handleViewMatches = (id: string) => {
    console.log('Navigating to matches for job:', id);
    const matchesUrl = `/dashboard/job-postings/${id}/matches`;
    console.log('Navigation URL:', matchesUrl);
    navigate(matchesUrl);
  };

  const handleOpenCreateModal = () => {
    setEditingProfile(null);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-primary-50/30 via-white to-secondary-50/30">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search and Create */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={getContent('jobPostings.searchPlaceholder')}
                  className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              <button
                onClick={handleOpenCreateModal}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-medium whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                {getContent('jobPostings.createJobProfile')}
              </button>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredProfiles.length === 0 && !searchQuery && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-10 h-10 text-primary-600" />
                </div>
                <div className="text-xl font-semibold text-neutral-900 mb-2">
                  {getContent('jobPostings.noJobsTitle')}
                </div>
                <div className="text-neutral-600 mb-6">
                  {getContent('jobPostings.noJobsSubtitle')}
                </div>
                <button
                  onClick={handleOpenCreateModal}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:shadow-lg transition-all inline-flex items-center gap-2 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  {getContent('jobPostings.createFirstJob')}
                </button>
              </div>
            )}

            {/* No Search Results */}
            {!isLoading && filteredProfiles.length === 0 && searchQuery && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-neutral-400" />
                </div>
                <div className="text-xl font-semibold text-neutral-900 mb-2">
                  {getContent('jobPostings.noResultsTitle')}
                </div>
                <div className="text-neutral-600">
                  {getContent('jobPostings.noResultsSubtitle')}
                </div>
              </div>
            )}

            {/* Job Profiles Grid */}
            {!isLoading && filteredProfiles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProfiles.map((profile) => (
                  <JobPostingCard
                    key={profile.id}
                    jobProfile={profile}
                    onViewMatches={handleViewMatches}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}

            {/* Create/Edit Modal */}
            <CreateJobProfileModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setEditingProfile(null);
              }}
              onSubmit={handleCreateOrUpdate}
              editingProfile={editingProfile}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
