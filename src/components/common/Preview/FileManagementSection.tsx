import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ProgressBar } from '../../ui/ProgressBar';
import { FileText, X, RefreshCw, Eye } from 'lucide-react';
import { CV_ANALYSIS_CONFIG } from '../../../types/cvAnalysis';
import type { UploadedFile, FileAction, AnalysisHandler } from '../../../types/cvAnalysis';

interface FileManagementSectionProps {
  uploadedFiles: UploadedFile[];
  isProcessing: boolean;
  onRemoveFile: FileAction;
  onReplaceFile: FileAction;
  onClearAllFiles: () => void;
  onStartAnalysis: AnalysisHandler;
  formatFileSize: (bytes: number) => string;
}

export const FileManagementSection: React.FC<FileManagementSectionProps> = ({
  uploadedFiles,
  isProcessing,
  onRemoveFile,
  onReplaceFile,
  onClearAllFiles,
  onStartAnalysis,
  formatFileSize
}) => {
  if (uploadedFiles.length === 0) {
    return null;
  }

  return (
    <Card className="p-8">
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold text-neutral-900">
            Selected Files ({uploadedFiles.length}/{CV_ANALYSIS_CONFIG.MAX_FILES})
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={onClearAllFiles}
              variant="tertiary"
              size="sm"
              className="text-neutral-600"
            >
              Clear All
            </Button>
            <Button
              onClick={onStartAnalysis}
              disabled={isProcessing || uploadedFiles.every(f => f.status !== 'completed')}
              variant="primary"
              className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
            >
              {isProcessing && <LoadingSpinner size="sm" />}
              <span>{isProcessing ? 'Analyzing...' : 'Analyze Files'}</span>
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4">
          {uploadedFiles.map((file) => (
            <div key={file.id} className="bg-neutral-50/80 rounded-xl p-4 border border-neutral-200/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900 truncate">{file.name}</p>
                    <p className="text-sm text-neutral-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {/* Status Badge */}
                  <Badge 
                    variant={
                      file.status === 'completed' ? 'success' :
                      file.status === 'error' ? 'error' :
                      file.status === 'processing' ? 'warning' :
                      'info'
                    }
                    size="sm"
                    dot={file.status === 'uploading' || file.status === 'processing'}
                  >
                    {file.status === 'completed' ? 'Ready' :
                     file.status === 'error' ? 'Error' :
                     file.status === 'processing' ? 'Processing' :
                     'Uploading'}
                  </Badge>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-1">
                    {file.url && (
                      <button
                        onClick={() => window.open(file.url, '_blank')}
                        className="p-2 text-neutral-400 hover:text-primary-500 rounded transition-all duration-200 hover:bg-primary-50"
                        title="Preview file"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => onReplaceFile(file.id)}
                      className="p-2 text-neutral-400 hover:text-secondary-500 rounded transition-all duration-200 hover:bg-secondary-50"
                      title="Replace file"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => onRemoveFile(file.id)}
                      className="p-2 text-neutral-400 hover:text-red-500 rounded transition-all duration-200 hover:bg-red-50"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Upload Progress */}
              {file.status === 'uploading' && file.uploadProgress !== undefined && (
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">Uploading...</span>
                    <span className="text-neutral-600">{Math.round(file.uploadProgress)}%</span>
                  </div>
                  <ProgressBar 
                    value={file.uploadProgress} 
                    variant="primary" 
                    size="sm" 
                    animated 
                  />
                </div>
              )}

              {/* Error Message */}
              {file.status === 'error' && file.error && (
                <div className="mt-3 p-2 bg-error-50 border border-error-200 rounded text-sm text-error-700">
                  {file.error}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};