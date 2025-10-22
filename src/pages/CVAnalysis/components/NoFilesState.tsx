import React from 'react';
import { Card } from '../../../components/ui/Card';
import { FileText } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

export const NoFilesState: React.FC = () => {
  const { getContent } = useTranslation();
  
  return (
    <Card className="p-12 text-center mb-4">
      <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <FileText className="w-10 h-10 text-primary-600" />
      </div>
      <div className="text-xl font-semibold text-neutral-900 mb-2">{getContent('cvAnalysis.noResumesUploaded')}</div>
      <div className="text-neutral-600 mb-4">{getContent('cvAnalysis.noResumesUploadedDescription')}</div>
    </Card>
  );
};