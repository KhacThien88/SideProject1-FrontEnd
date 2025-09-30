import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { Button } from '../../ui/Button';
import { ProgressBar } from '../../ui/ProgressBar';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { 
  Upload, 
  FileSearch, 
  BarChart3, 
  CheckCircle2, 
  X,
  Clock,
  Pause,
  Play,
  RotateCw
} from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface AnalysisProgress {
  stage: 'upload' | 'extract' | 'analyze' | 'complete';
  percentage: number;
  estimatedTime?: number;
}

interface ProgressTrackerProps {
  progress: AnalysisProgress;
  fileName: string;
  onCancel?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onRetry?: () => void;
  className?: string;
  isPaused?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}

interface StageInfo {
  key: AnalysisProgress['stage'];
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

const STAGES: StageInfo[] = [
  {
    key: 'upload',
    label: 'Uploading',
    description: 'Uploading your CV to our secure servers',
    icon: Upload,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    key: 'extract',
    label: 'Extracting',
    description: 'Extracting text and data from your document',
    icon: FileSearch,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100'
  },
  {
    key: 'analyze',
    label: 'Analyzing',
    description: 'Analyzing your skills, experience, and qualifications',
    icon: BarChart3,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    key: 'complete',
    label: 'Complete',
    description: 'Analysis completed successfully',
    icon: CheckCircle2,
    color: 'text-success-600',
    bgColor: 'bg-success-100'
  }
];

const formatTime = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  progress,
  fileName,
  onCancel,
  onPause,
  onResume,
  onRetry,
  className,
  isPaused = false,
  hasError = false,
  errorMessage,
}) => {
  const { t } = useTranslation();
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Get current stage info
  const currentStageIndex = STAGES.findIndex(stage => stage.key === progress.stage);
  const currentStage = STAGES[currentStageIndex];

  // Timer for elapsed time
  useEffect(() => {
    if (!isPaused && !hasError && progress.stage !== 'complete') {
      timerRef.current = window.setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, hasError, progress.stage]);

  // Animate progress percentage
  useEffect(() => {
    const targetPercentage = progress.percentage;
    const startPercentage = animatedPercentage;
    const difference = targetPercentage - startPercentage;
    const duration = 500; // Animation duration in ms
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progressRatio, 3);
      
      const currentPercentage = startPercentage + (difference * easeOut);
      setAnimatedPercentage(currentPercentage);

      if (progressRatio < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [progress.percentage]);

  // Calculate overall progress
  const overallProgress = (currentStageIndex / (STAGES.length - 1)) * 100;

  return (
    <div className={cn('bg-white rounded-xl shadow-brand p-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">
            {t.cvAnalysis?.progress?.title || 'Analyzing Your CV'}
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            {fileName}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {progress.stage !== 'complete' && !hasError && (
            <>
              {isPaused ? (
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={onResume}
                  className="flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Resume</span>
                </Button>
              ) : (
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={onPause}
                  className="flex items-center space-x-2"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </Button>
              )}
              
              <Button
                variant="tertiary"
                size="sm"
                onClick={onCancel}
                className="flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </Button>
            </>
          )}
          
          {hasError && onRetry && (
            <Button
              variant="primary"
              size="sm"
              onClick={onRetry}
              className="flex items-center space-x-2"
            >
              <RotateCw className="w-4 h-4" />
              <span>Retry</span>
            </Button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {hasError && errorMessage && (
        <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg">
          <p className="text-error-800">{errorMessage}</p>
        </div>
      )}

      {/* Overall Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-neutral-700">
            Overall Progress
          </span>
          <span className="text-sm text-neutral-500">
            {Math.round(animatedPercentage)}%
          </span>
        </div>
        <ProgressBar
          value={animatedPercentage}
          size="lg"
          variant={hasError ? 'error' : isPaused ? 'warning' : 'primary'}
          animated={!isPaused && !hasError}
          striped={isPaused}
        />
      </div>

      {/* Stage Progress */}
      <div className="space-y-4 mb-8">
        {STAGES.map((stage, index) => {
          const isActive = stage.key === progress.stage;
          const isCompleted = index < currentStageIndex || progress.stage === 'complete';
          const isPending = index > currentStageIndex;
          const Icon = stage.icon;

          return (
            <div
              key={stage.key}
              className={cn(
                'flex items-center p-4 rounded-lg border transition-all duration-300',
                isActive ? 'border-primary-200 bg-primary-50 shadow-sm' :
                isCompleted ? 'border-success-200 bg-success-50' :
                'border-neutral-200 bg-neutral-50'
              )}
            >
              <div className={cn(
                'flex items-center justify-center w-10 h-10 rounded-full mr-4 transition-all duration-300',
                isActive ? stage.bgColor :
                isCompleted ? 'bg-success-500' :
                'bg-neutral-200'
              )}>
                {isActive && !hasError && !isPaused ? (
                  <LoadingSpinner 
                    size="sm" 
                    variant={isCompleted ? 'secondary' : 'primary'} 
                  />
                ) : (
                  <Icon className={cn(
                    'w-5 h-5',
                    isActive ? stage.color :
                    isCompleted ? 'text-white' :
                    'text-neutral-500'
                  )} />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={cn(
                    'font-medium',
                    isActive ? stage.color :
                    isCompleted ? 'text-success-600' :
                    'text-neutral-600'
                  )}>
                    {stage.label}
                  </h3>
                  
                  {isActive && (
                    <div className="flex items-center space-x-2 text-xs text-neutral-500">
                      {isPaused && (
                        <span className="px-2 py-1 bg-warning-100 text-warning-700 rounded-full">
                          Paused
                        </span>
                      )}
                      {hasError && (
                        <span className="px-2 py-1 bg-error-100 text-error-700 rounded-full">
                          Error
                        </span>
                      )}
                    </div>
                  )}
                  
                  {isCompleted && (
                    <CheckCircle2 className="w-5 h-5 text-success-500" />
                  )}
                </div>
                
                <p className="text-sm text-neutral-600 mt-1">
                  {stage.description}
                </p>
                
                {isActive && progress.estimatedTime && progress.estimatedTime > 0 && (
                  <div className="flex items-center space-x-4 mt-2 text-xs text-neutral-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>ETA: {formatTime(progress.estimatedTime)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>Elapsed: {formatTime(timeElapsed)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Summary */}
      <div className="border-t border-neutral-200 pt-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-neutral-600">
              Status: 
              <span className={cn(
                'ml-1 font-medium',
                hasError ? 'text-error-600' :
                isPaused ? 'text-warning-600' :
                progress.stage === 'complete' ? 'text-success-600' :
                'text-primary-600'
              )}>
                {hasError ? 'Failed' :
                 isPaused ? 'Paused' :
                 progress.stage === 'complete' ? 'Completed' :
                 currentStage?.label || 'Processing'}
              </span>
            </span>
            
            <span className="text-neutral-600">
              Time: <span className="font-medium">{formatTime(timeElapsed)}</span>
            </span>
          </div>
          
          {progress.stage === 'complete' && (
            <div className="flex items-center space-x-1 text-success-600">
              <CheckCircle2 className="w-4 h-4" />
              <span className="font-medium">Analysis Complete!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};