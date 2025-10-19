import React from 'react';
import { Briefcase } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

interface SavedJobsEmptyStateProps {
  hasActiveFilters: boolean;
  clearFilters: () => void;
  getContent: (key: string) => string;
}

export const SavedJobsEmptyState: React.FC<SavedJobsEmptyStateProps> = ({
  hasActiveFilters,
  clearFilters,
  getContent,
}) => {
  return (
    <Card className="p-12 text-center">
      <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Briefcase className="w-10 h-10 text-primary-600" />
      </div>
      <div className="text-xl font-semibold text-neutral-900 mb-2">
        {hasActiveFilters
          ? getContent('savedJobs.noResultsFilters')
          : getContent('savedJobs.noSavedYet')}
      </div>
      <div className="text-neutral-600 mb-4">{getContent('savedJobs.noSavedDescription')}</div>
      {hasActiveFilters && (
        <Button variant="primary" onClick={clearFilters}>
          {getContent('savedJobs.clearFilters')}
        </Button>
      )}
    </Card>
  );
};
