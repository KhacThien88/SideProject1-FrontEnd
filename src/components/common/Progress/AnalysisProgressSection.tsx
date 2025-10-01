import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { ProgressBar } from '../../ui/ProgressBar';
import { Clock } from 'lucide-react';
import type { AnalysisProgress } from '../../../types/cvAnalysis';

interface AnalysisProgressSectionProps {
  analysisProgress: AnalysisProgress | null;
}

export const AnalysisProgressSection: React.FC<AnalysisProgressSectionProps> = ({
  analysisProgress
}) => {
  if (!analysisProgress) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold text-neutral-900">Analyzing Files</div>
        <Badge variant="info" size="sm" dot>
          {analysisProgress.stage === 'upload' ? 'Uploading' :
           analysisProgress.stage === 'extract' ? 'Extracting' :
           analysisProgress.stage === 'analyze' ? 'Analyzing' :
           'Completing'}
        </Badge>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-neutral-600">
              Processing: {analysisProgress.currentFile}
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
            <span>Estimated time remaining: {Math.ceil(analysisProgress.estimatedTime / 1000)}s</span>
          </div>
        )}
      </div>
    </Card>
  );
};