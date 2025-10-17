import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { MoreHorizontal, Eye, Download, Trash2, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

interface Resume {
  id: string;
  name: string;
  uploadedAt: string;
  status: 'processing' | 'completed' | 'error';
  score?: number;
  matchPercentage?: number;
}

export const RecentResumes: React.FC = () => {
  const { t } = useTranslation();
  
  // Only show final results (completed/error) - no processing states
  const recentResumes: Resume[] = [
    {
      id: '1',
      name: 'John_Doe_Resume.pdf',
      uploadedAt: '2 minutes ago',
      status: 'completed',
      score: 85,
      matchPercentage: 92
    },
    {
      id: '2',
      name: 'Michael_Johnson_Resume.pdf',
      uploadedAt: '12 minutes ago',
      status: 'completed',
      score: 78,
      matchPercentage: 85
    },
    {
      id: '3',
      name: 'Emma_Wilson_CV.pdf',
      uploadedAt: '20 minutes ago',
      status: 'error'
    },
    {
      id: '4',
      name: 'David_Brown_Resume.pdf',
      uploadedAt: '25 minutes ago',
      status: 'completed',
      score: 91,
      matchPercentage: 88
    },
    {
      id: '5',
      name: 'Lisa_Anderson_CV.pdf',
      uploadedAt: '35 minutes ago',
      status: 'completed',
      score: 73,
      matchPercentage: 79
    }
  ];

  const getStatusIcon = (status: Resume['status']) => {
    switch (status) {
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusText = (status: Resume['status']) => {
    switch (status) {
      case 'processing':
        return t.dashboard.processingQueue.states.processing;
      case 'completed':
        return t.dashboard.processingQueue.states.completed;
      case 'error':
        return t.dashboard.processingQueue.states.error;
    }
  };

  const getStatusBadgeClass = (status: Resume['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  return (
    <Card variant="default" hover={true} className="bg-white backdrop-blur-sm group p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-base sm:text-lg font-bold text-neutral-900 truncate">{t.dashboard.recentResumes.title}</div>
            <div className="text-xs sm:text-sm text-neutral-600 truncate">{t.dashboard.recentResumes.subtitle}</div>
          </div>
        </div>
        <button className="p-2 hover:bg-accent-50 rounded-xl transition-colors duration-300 group flex-shrink-0">
          <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-accent-600" />
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {recentResumes.map((resume) => (
          <div key={resume.id} className="p-3 sm:p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-start mb-2">
              {/* Icon */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-violet-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white"/>
              </div>
            {/* Title */}
            <div className="ml-4 mb-2">
              <div className="text-sm font-medium text-gray-900">{resume.name}</div>
            </div>
             {/* Badge */}
            <div className="ml-4 mb-2">
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusBadgeClass(resume.status)}`}>
                {getStatusIcon(resume.status)}
                <span>{getStatusText(resume.status)}</span>
              </div>
            </div>
            </div>
            {/* Time and Scores */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="text-xs text-gray-500 flex-shrink-0">{resume.uploadedAt}</span>
              {resume.status === 'completed' && (
                <>
                  <span className="text-xs text-gray-500 hidden sm:inline">•</span>
                  <span className="text-xs text-gray-700 flex-shrink-0">{t.dashboard.recentResumes.score}: {resume.score}/100</span>
                  <span className="text-xs text-gray-500 hidden sm:inline">•</span>
                  <span className="text-xs text-gray-700 flex-shrink-0">{t.dashboard.recentResumes.match}: {resume.matchPercentage}%</span>
                </>
              )}
               {/* Action Buttons */}
              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                {resume.status === 'completed' && (
                  <>
                    <button className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </>
                )}
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
             
          </div>
          
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-200/60">
        <Button 
          variant="secondary" 
          size="sm" 
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-brand-sm hover:shadow-brand-md focus-ring"
        >
          {t.dashboard.recentResumes.viewAll} ({recentResumes.length + 128} {t.dashboard.recentResumes.total})
        </Button>
      </div>
    </Card>
  );
};