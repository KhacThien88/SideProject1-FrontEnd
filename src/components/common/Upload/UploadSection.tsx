import React, { useRef } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Upload, Plus, AlertCircle } from 'lucide-react';
import { CV_ANALYSIS_CONFIG } from '../../../types/cvAnalysis';
import type { ValidationError } from '../../../types/cvAnalysis';
import { useTranslation } from '../../../hooks/useTranslation';

interface UploadSectionProps {
  dragActive: boolean;
  validationErrors: ValidationError[];
  uploadedFilesCount: number;
  onDrag: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatFileSize: (bytes: number) => string;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  dragActive,
  validationErrors,
  uploadedFilesCount,
  onDrag,
  onDrop,
  onFileInput,
  formatFileSize
}) => {
  const { getContent } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChooseFiles = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="p-8">
      <div 
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-primary-400 bg-primary-50/50 shadow-brand-lg scale-[1.02]' 
            : 'border-neutral-300 hover:border-primary-300 hover:bg-primary-50/20 hover:shadow-brand'
        }`}
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
      >
        <div className="space-y-6">
          <div className="flex justify-center">
            <label htmlFor="resume-upload">
              <div className={`w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                dragActive ? 'scale-110 animate-pulse' : ''
              }`}>
                <Upload className="w-8 h-8 text-white" />
              </div>
            </label>
          </div>
          
          <div>
            <div className="text-xl font-semibold text-neutral-900 mb-2">
              {getContent('cvAnalysis.upload.title')}
            </div>
            <p className="text-neutral-600 mb-2">
              {dragActive 
                ? getContent('cvAnalysis.upload.dropHere')
                : getContent('cvAnalysis.upload.dragAndDrop')}
            </p>
            <p className="text-sm text-neutral-500">
              {getContent('cvAnalysis.upload.supports')} • {getContent('cvAnalysis.upload.maxSize')} {formatFileSize(CV_ANALYSIS_CONFIG.MAX_FILE_SIZE)} {getContent('cvAnalysis.upload.upTo')} {CV_ANALYSIS_CONFIG.MAX_FILES} {getContent('cvAnalysis.files')}
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={onFileInput}
            className="hidden"
            id="resume-upload"
          />
          <Button
            variant="primary"
            size="lg"
            className="inline-flex items-center px-6 py-3 cursor-pointer bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
            onClick={handleChooseFiles}
            disabled={uploadedFilesCount >= CV_ANALYSIS_CONFIG.MAX_FILES}
          >
            <Plus className="w-5 h-5 mr-2" />
            {getContent('cvAnalysis.upload.chooseFiles')}
          </Button>
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="mt-6 p-4 bg-error-50 border border-error-200 rounded-lg">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 text-error-600 mr-2" />
            <div className="font-medium text-error-800">{getContent('cvAnalysis.upload.uploadIssues')}</div>
          </div>
          <ul className="text-sm text-error-700 space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index}>• {error.file}: {error.message}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};