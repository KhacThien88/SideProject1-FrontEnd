import React, { useState, useEffect } from 'react';
import { Search, Plus, Briefcase } from 'lucide-react';
import { Layout } from '../../components/common/Layout';
import { Container } from '../../components/common/Container';
import { Button } from '../../components/ui/Button';
import { DashboardHeader } from '../../components/layout/DashboardHeader';
import { DashboardSidebar } from '../../components/layout/DashboardSidebar';
import { useTranslation } from '../../hooks/useTranslation';
import { useToast } from '../../contexts/ToastContext';
import { useRouter } from '../../components/Router';
import { jobPostingService } from '../../services/api/jobPosting/jobPostingService';
import type { JobProfile, CreateJobProfileData } from '../../types/jobPosting';
import { JobPostingCard } from './components/JobPostingCard';
import { CreateJobProfileModal } from './components/CreateJobProfileModal';
import { JDUploadOptionsModal } from '../JDAnalysis/components';
import Footer from '../../components/layout/Footer';

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
  const [showUploadModal, setShowUploadModal] = useState(false);

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
      const response = await jobPostingService.getJobProfiles();
      
      // Convert API response to component state format
      const profiles: JobProfile[] = response.profiles.map(profile => ({
        id: profile.profile_id,
        title: profile.title,
        description: profile.description,
        experience: profile.requirements?.experience || 'Not specified',
        requiredSkills: profile.requirements?.skills || [],
        preferredSkills: profile.requirements?.preferred_skills || [],
        activeMatches: profile.applications_count || 0,
        createdAt: new Date(profile.created_at),
        updatedAt: new Date(profile.updated_at),
        status: profile.status,
      }));
      
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
    // Show upload options modal for new job postings
    setShowUploadModal(true);
  };

  return (
    <Layout className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      <div className="flex min-h-screen">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          
          <main className="flex-1 overflow-auto pb-15">
            <div className="py-8">
              <Container maxWidth="2xl" className="space-y-6 sm:space-y-8">
                {/* Search and Create */}
                <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
                  <div className="flex flex-col sm:flex-row gap-4">
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
                    <Button
                      onClick={handleOpenCreateModal}
                      variant="secondary"
                      size="md"
                      className="text-white whitespace-nowrap bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-lg"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      {getContent('jobPostings.createJobProfile')}
                    </Button>
                  </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                  <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                    <div className="flex items-center justify-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {!isLoading && filteredProfiles.length === 0 && !searchQuery && (
                  <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
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
                      <Button
                        onClick={handleOpenCreateModal}
                        variant="secondary"
                        size="md"
                        className="text-white shadow-lg bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        {getContent('jobPostings.createFirstJob')}
                      </Button>
                    </div>
                  </div>
                )}

                {/* No Search Results */}
                {!isLoading && filteredProfiles.length === 0 && searchQuery && (
                  <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                    <div className="text-center py-20">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-10 h-10 text-white" />
                      </div>
                      <div className="text-xl font-semibold text-neutral-900 mb-2">
                        {getContent('jobPostings.noResultsTitle')}
                      </div>
                      <div className="text-neutral-600">
                        {getContent('jobPostings.noResultsSubtitle')}
                      </div>
                    </div>
                  </div>
                )}

                {/* Job Profiles Grid */}
                {!isLoading && filteredProfiles.length > 0 && (
                  <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
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
                  </div>
                )}

                {/* Upload Options Modal */}
                <JDUploadOptionsModal
                  isOpen={showUploadModal}
                  onClose={() => setShowUploadModal(false)}
                />

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
              </Container>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </Layout>
  );
};
