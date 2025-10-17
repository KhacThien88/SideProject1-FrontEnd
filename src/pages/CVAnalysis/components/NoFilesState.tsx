import React from 'react';
import { Card } from '../../../components/ui/Card';
import { FileText } from 'lucide-react';

export const NoFilesState: React.FC = () => {
  return (
    <Card className="p-12 text-center border-dashed border-2 border-neutral-200">
      <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <FileText className="w-10 h-10 text-primary-600" />
      </div>
      <div className="text-xl font-semibold text-neutral-900 mb-2">No Resumes Uploaded</div>
      <div className="text-neutral-600">Upload your first resume to get started with AI-powered analysis.</div>
    </Card>
  );
};