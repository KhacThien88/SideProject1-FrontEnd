import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { ProgressBar } from '../../ui/ProgressBar';
import { Clock } from 'lucide-react';
import type { AnalysisProgress } from '../../../types/cvAnalysis';
import { useTranslation } from '../../../hooks/useTranslation';

interface AnalysisProgressSectionProps {
  analysisProgress: AnalysisProgress | null;
}

export const AnalysisProgressSection: React.FC<AnalysisProgressSectionProps> = ({
  analysisProgress
}) => {
  const { getContent } = useTranslation();
  
  if (!analysisProgress) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold text-neutral-900">{getContent('cvAnalysis.progress.analyzingFiles')}</div>
        <Badge variant="info" size="sm" dot>
          {analysisProgress.stage === 'upload' ? getContent('cvAnalysis.progress.uploading') :
           analysisProgress.stage === 'extract' ? getContent('cvAnalysis.progress.extracting') :
           analysisProgress.stage === 'analyze' ? getContent('cvAnalysis.progress.analyzing') :
           getContent('cvAnalysis.progress.completing')}
        </Badge>
      </div>
      
      <div className="space-y-4 mb-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-neutral-600">
              {getContent('cvAnalysis.progress.processing')}: {analysisProgress.currentFile}
            </span>
            <span className="text-neutral-600">
              {Math.round(analysisProgress.percentage)}%
            </span>
          </div>
          <ProgressBar 
            value={analysisProgress.percentage} 
            variant="secondary" 
            size="md" 
            animated 
          />
        </div>
        
        {analysisProgress.estimatedTime && (
          <div className="flex items-center text-sm text-neutral-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{getContent('cvAnalysis.progress.estimatedTime')}: {Math.ceil(analysisProgress.estimatedTime / 1000)}s</span>
          </div>
        )}
      </div>
    </Card>
  );
};