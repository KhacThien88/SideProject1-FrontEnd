import React from 'react';
import { Card } from '../../../components/ui/Card';
import { CV_ANALYSIS_CONFIG } from '../../../types/cvAnalysis';

interface JobSelectionSectionProps {
  selectedJobPosition: string;
  onJobPositionChange: (position: string) => void;
}

export const JobSelectionSection: React.FC<JobSelectionSectionProps> = ({
  selectedJobPosition,
  onJobPositionChange
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold text-neutral-900 mb-1">Target Position</div>
          <div className="text-sm text-neutral-600">Select the job position to analyze CV compatibility</div>
        </div>
        <div className="min-w-0 flex-1 max-w-xs ml-6">
          <select 
            value={selectedJobPosition}
            onChange={(e) => onJobPositionChange(e.target.value)}
            className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
          >
            {CV_ANALYSIS_CONFIG.JOB_POSITIONS.map((position: string) => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  );
};