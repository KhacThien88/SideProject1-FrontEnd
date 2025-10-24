import React from 'react';
import { Container } from '../../components/common/Container';
import { Layout } from '../../components/common/Layout';
import { DashboardSidebar } from '../../components/layout/DashboardSidebar';
import { DashboardHeader } from '../../components/layout/DashboardHeader';
import { MetricsCards } from './components/MetricsCards';
import { MonthlyApplicationsChart } from './components/MonthlyApplicationsChart';
import { SkillsChart } from './components/SkillsChart';
import { RecentResumes } from './components/RecentResumes';
import { RecentCandidates } from './components/RecentCandidates';
import { ProcessingQueue } from './components/ProcessingQueue';
import { ScoreDistribution } from './components/ScoreDistribution';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../contexts/auth/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const userRole = user?.role?.toLowerCase();

  // Determine which components to show based on role
  // Admin: all components
  const showProcessingQueue = userRole === 'admin';
  const showRecentResumes = userRole === 'admin';
  const showRecentCandidates = userRole === 'recruiter';
  const showMonthlyApplications = userRole === 'admin' || userRole === 'recruiter';
  const showSkillsChart = userRole === 'admin' || userRole === 'candidate';
  const showScoreDistribution = userRole === 'admin' || userRole === 'candidate';

  return (
    <Layout className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <DashboardHeader />
          
          {/* Dashboard Content */}
          <main className="flex-1 overflow-auto pb-20">
            <div className="py-8">
              <Container maxWidth="2xl" className="space-y-6 sm:space-y-8">

                {/* Metrics Cards - Always show for all roles */}
                <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
                  <MetricsCards />
                </div>
                
                {/* Top Row - Admin: ProcessingQueue + RecentResumes, Recruiter: RecentCandidates */}
                {(showProcessingQueue || showRecentResumes || showRecentCandidates) && (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
                    {showProcessingQueue && <ProcessingQueue />}
                    {showRecentResumes && <RecentResumes />}
                    {showRecentCandidates && <RecentCandidates />}
                  </div>
                )}
                
                {/* Charts Section - Monthly Applications and Skills */}
                {(showMonthlyApplications || showSkillsChart) && (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 animate-slide-up" style={{animationDelay: '0.3s'}}>
                    {showMonthlyApplications && <MonthlyApplicationsChart />}
                    {showSkillsChart && <SkillsChart />}
                  </div>
                )}
                
                {/* Score Distribution Section - Admin & Candidate */}
                {showScoreDistribution && (
                  <div className="animate-slide-up" style={{animationDelay: '0.4s'}}>
                    <ScoreDistribution />
                  </div>
                )}
              </Container>
            </div>
          </main>
          <Footer />
        </div>
       
      </div>
    
    </Layout>
  );
};