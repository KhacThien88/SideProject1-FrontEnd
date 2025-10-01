import React from 'react';
import { JobMatching } from '../src/pages/JobMatching';
import { ToastProvider } from '../src/contexts/ToastContext';
import { LanguageProvider } from '../src/contexts/LanguageContext';

export const JobMatchingDemo: React.FC = () => {
  return (
    <LanguageProvider>
      <ToastProvider>
        <div className="min-h-screen bg-neutral-50">
          <JobMatching />
        </div>
      </ToastProvider>
    </LanguageProvider>
  );
};

export default JobMatchingDemo;