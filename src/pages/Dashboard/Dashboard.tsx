import React from 'react';
import { Container } from '../../components/common/Container';
import { Layout } from '../../components/common/Layout';
import { DashboardSidebar } from '../../components/layout/DashboardSidebar';
import { DashboardHeader } from '../../components/layout/DashboardHeader';
import { MetricsCards } from './components/MetricsCards';
import { MonthlyApplicationsChart } from './components/MonthlyApplicationsChart';
import { SkillsChart } from './components/SkillsChart';
import { RecentResumes } from './components/RecentResumes';
import { ProcessingQueue } from './components/ProcessingQueue';
import { ScoreDistribution } from './components/ScoreDistribution';

export const Dashboard: React.FC = () => {

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
          <main className="flex-1 overflow-auto">
            <div className="py-8">
              <Container maxWidth="2xl" className="space-y-6 sm:space-y-8">

                {/* Metrics Cards */}
                <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
                  <MetricsCards />
                </div>
                
                {/* Top Row - Processing Queue and Recent Resumes */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
                  <ProcessingQueue />
                  <RecentResumes />
                </div>
                
                {/* Charts Section - Monthly Applications and Skills */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 animate-slide-up" style={{animationDelay: '0.3s'}}>
                  <MonthlyApplicationsChart />
                  <SkillsChart />
                </div>
                
                {/* Score Distribution Section */}
                <div className="animate-slide-up" style={{animationDelay: '0.4s'}}>
                  <ScoreDistribution />
                </div>
              </Container>
            </div>
          </main>
        </div>
       
      </div>
    
    </Layout>
  );
};