import React from 'react';
import { DashboardHeader } from '../../components/layout/DashboardHeader';
import { DashboardSidebar } from '../../components/layout/DashboardSidebar';

export const CandidateManagement: React.FC = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-primary-50/30 via-white to-secondary-50/30">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold text-neutral-900">Candidate Management</h1>
          <p className="text-neutral-600 mt-2">Coming soon...</p>
        </main>
      </div>
    </div>
  );
};
