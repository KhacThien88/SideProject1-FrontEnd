import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { MoreHorizontal, Clock, AlertCircle, CheckCircle, Trash2, FileText } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

interface QueueItem {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  uploadedAt: string;
  progress?: number;
}

export const ProcessingQueue: React.FC = () => {
  const { t } = useTranslation();
  
  // Mock data - showing all processing states
  const queueItems: QueueItem[] = [
    {
      id: '1',
      name: 'Alice_Johnson_Resume.pdf',
      status: 'processing',
      uploadedAt: '1 minute ago',
      progress: 65
    },
    {
      id: '2', 
      name: 'Bob_Smith_CV.docx',
      status: 'pending',
      uploadedAt: '3 minutes ago'
    },
    {
      id: '3',
      name: 'Carol_Davis_Resume.pdf', 
      status: 'processing',
      uploadedAt: '5 minutes ago',
      progress: 23
    },
    {
      id: '4',
      name: 'Daniel_Wilson_CV.pdf',
      status: 'completed',
      uploadedAt: '8 minutes ago'
    },
    {
      id: '5',
      name: 'Eva_Martinez_Resume.pdf',
      status: 'pending',
      uploadedAt: '10 minutes ago'
    }
  ];

  const getStatusIcon = (status: QueueItem['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'processing':
        return <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusText = (status: QueueItem['status']) => {
    switch (status) {
      case 'pending':
        return t.dashboard.processingQueue.states.pending;
      case 'processing':
        return t.dashboard.processingQueue.states.processing;
      case 'completed':
        return t.dashboard.processingQueue.states.completed;
      case 'error':
        return t.dashboard.processingQueue.states.error;
    }
  };

  const getStatusBadgeClass = (status: QueueItem['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  const activeCount = queueItems.filter(item => item.status === 'processing' || item.status === 'pending').length;

  return (
    <Card variant="default" hover={true} className="bg-white backdrop-blur-sm group p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-base sm:text-lg font-bold text-neutral-900 truncate">{t.dashboard.processingQueue.title}</div>
            <div className="text-xs sm:text-sm text-neutral-600 truncate">{activeCount} {t.dashboard.processingQueue.subtitle}</div>
          </div>
        </div>
        <button className="p-2 hover:bg-primary-50 rounded-xl transition-colors duration-300 group flex-shrink-0">
          <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-primary-600" />
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {queueItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 sm:p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors gap-3">
            <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
              {/* File Icon */}
               <div className="w-8 h-8 sm:w-10 sm:h-10 bg-violet-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white"/>
              </div>

              {/* Queue Item Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <div className="text-sm font-medium text-gray-900 truncate flex-shrink-0">{item.name}</div>
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border self-start ${getStatusBadgeClass(item.status)}`}>
                    {getStatusIcon(item.status)}
                    <span>{getStatusText(item.status)}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
                  <span className="text-xs text-gray-500 flex-shrink-0">{item.uploadedAt}</span>
                  {item.status === 'processing' && item.progress && (
                    <>
                      <span className="text-xs text-gray-500 hidden sm:inline">•</span>
                      <span className="text-xs text-gray-700 flex-shrink-0">{item.progress}% {t.dashboard.processingQueue.progress}</span>
                    </>
                  )}
                </div>
                {/* Progress bar for processing items */}
                {item.status === 'processing' && item.progress && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" 
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-200/60">
        <Button 
          variant="secondary" 
          size="sm" 
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-brand-sm hover:shadow-brand-lg focus-ring transition-all duration-300"
        >
          {t.dashboard.processingQueue.viewAll} ({queueItems.length + 45} {t.dashboard.processingQueue.total})
        </Button>
      </div>
    </Card>
  );
};