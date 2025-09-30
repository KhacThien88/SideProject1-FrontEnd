import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { Button } from '../../ui/Button';
import { ProgressBar } from '../../ui/ProgressBar';
import { 
  Upload, 
  File, 
  X, 
  Check, 
  AlertCircle, 
  FileText, 
  Download,
  Eye,
  RefreshCw
} from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  file: File;
  uploadProgress?: number;
  status?: 'uploading' | 'completed' | 'error';
  error?: string;
}

interface DropzoneUploaderProps {
  onFilesUploaded: (files: UploadedFile[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  acceptedTypes?: string[]; // ['pdf', 'doc', 'docx']
  className?: string;
  disabled?: boolean;
}

const FILE_TYPE_MAP: Record<string, string[]> = {
  pdf: ['application/pdf'],
  doc: ['application/msword'],
  docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  if (extension === 'pdf') return <FileText className="w-8 h-8 text-red-500" />;
  if (extension === 'doc' || extension === 'docx') return <FileText className="w-8 h-8 text-blue-500" />;
  return <File className="w-8 h-8 text-neutral-500" />;
};

export const DropzoneUploader: React.FC<DropzoneUploaderProps> = ({
  onFilesUploaded,
  maxFiles = 3,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['pdf', 'doc', 'docx'],
  className,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get accepted MIME types
  const acceptedMimeTypes = acceptedTypes.flatMap(type => FILE_TYPE_MAP[type] || []);

  // Validate file
  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize) {
      return `File size exceeds ${formatFileSize(maxFileSize)} limit`;
    }

    // Check file type
    if (!acceptedMimeTypes.includes(file.type)) {
      return `File type not supported. Accepted formats: ${acceptedTypes.join(', ').toUpperCase()}`;
    }

    return null;
  };

  // Handle file processing
  const processFiles = useCallback(async (fileList: FileList) => {
    const files = Array.from(fileList);
    const errors: string[] = [];
    const validFiles: File[] = [];

    // Check total files limit
    if (uploadedFiles.length + files.length > maxFiles) {
      errors.push(`Maximum ${maxFiles} files allowed`);
      setValidationErrors(errors);
      return;
    }

    // Validate each file
    files.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);

    // Create uploaded file objects
    const newUploadedFiles: UploadedFile[] = validFiles.map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      file,
      uploadProgress: 0,
      status: 'uploading',
    }));

    // Add to uploaded files
    const updatedFiles = [...uploadedFiles, ...newUploadedFiles];
    setUploadedFiles(updatedFiles);

    // Simulate upload progress
    for (const uploadedFile of newUploadedFiles) {
      await simulateUpload(uploadedFile);
    }

    // Call parent callback with completed files
    const completedFiles = updatedFiles.filter(f => f.status === 'completed');
    onFilesUploaded(completedFiles);
  }, [uploadedFiles, maxFiles, maxFileSize, acceptedMimeTypes, onFilesUploaded]);

  // Simulate upload progress
  const simulateUpload = async (file: UploadedFile) => {
    const updateProgress = (progress: number) => {
      setUploadedFiles(prev => prev.map(f => 
        f.id === file.id 
          ? { ...f, uploadProgress: progress }
          : f
      ));
    };

    // Simulate progress
    for (let progress = 0; progress <= 100; progress += 10) {
      updateProgress(progress);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Mark as completed
    setUploadedFiles(prev => prev.map(f => 
      f.id === file.id 
        ? { ...f, status: 'completed', uploadProgress: 100 }
        : f
    ));
  };

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles, disabled]);

  // Handle file input change
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  }, [processFiles]);

  // Handle file removal
  const handleRemoveFile = (fileId: string) => {
    const updatedFiles = uploadedFiles.filter(f => f.id !== fileId);
    setUploadedFiles(updatedFiles);
    
    // Revoke object URL to prevent memory leaks
    const fileToRemove = uploadedFiles.find(f => f.id === fileId);
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.url);
    }
    
    onFilesUploaded(updatedFiles.filter(f => f.status === 'completed'));
  };

  // Handle retry upload
  const handleRetryUpload = async (fileId: string) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (!file) return;

    setUploadedFiles(prev => prev.map(f => 
      f.id === fileId 
        ? { ...f, status: 'uploading', uploadProgress: 0, error: undefined }
        : f
    ));

    await simulateUpload(file);
  };

  // Open file selector
  const openFileSelector = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  // Download file
  const handleDownloadFile = (file: UploadedFile) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasFiles = uploadedFiles.length > 0;
  const canUploadMore = uploadedFiles.length < maxFiles;

  return (
    <div className={cn('w-full', className)}>
      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-error-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-error-800 mb-1">Upload Errors</h4>
              <ul className="text-sm text-error-700 space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Dropzone */}
      {canUploadMore && (
        <div
          className={cn(
            'relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200',
            dragActive ? 'border-primary-400 bg-primary-50' : 'border-neutral-300 hover:border-primary-300',
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-neutral-50'
          )}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileSelector}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedMimeTypes.join(',')}
            onChange={handleFileInputChange}
            className="hidden"
            disabled={disabled}
          />
          
          <div className="space-y-6">
            <div className={cn(
              'w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-colors duration-200',
              dragActive ? 'bg-primary-500' : 'bg-primary-100'
            )}>
              <Upload className={cn(
                'w-10 h-10 transition-colors duration-200',
                dragActive ? 'text-white' : 'text-primary-600'
              )} />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {dragActive 
                  ? 'Drop files here'
                  : 'Drag & drop your resume files here, or click to browse'
                }
              </h3>
              
              <div className="text-sm text-neutral-500 space-y-1 mb-6">
                <p>Supports PDF, DOC, and DOCX files • Max 10MB per file</p>
              </div>
            </div>
            
            <Button
              variant="primary"
              size="lg"
              onClick={(e) => {
                e.stopPropagation();
                openFileSelector();
              }}
              disabled={disabled}
              className="inline-flex items-center space-x-2 px-8 py-3"
            >
              <span>Choose Files</span>
            </Button>
          </div>
        </div>
      )}

      {/* Uploaded Files List */}
      {hasFiles && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-neutral-900">
              Uploaded Files
            </h4>
            {canUploadMore && (
              <Button
                variant="tertiary"
                size="sm"
                onClick={openFileSelector}
                disabled={disabled}
                className="flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Add More</span>
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-brand transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    {getFileIcon(file.name)}
                    <div className="min-w-0 flex-1">
                      <h5 className="text-sm font-medium text-neutral-900 truncate">
                        {file.name}
                      </h5>
                      <p className="text-xs text-neutral-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-2">
                    {file.status === 'completed' && (
                      <>
                        <button
                          onClick={() => handleDownloadFile(file)}
                          className="p-1 text-neutral-500 hover:text-primary-600 transition-colors duration-200"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <div className="p-1 text-success-500">
                          <Check className="w-4 h-4" />
                        </div>
                      </>
                    )}
                    
                    {file.status === 'error' && (
                      <button
                        onClick={() => handleRetryUpload(file.id)}
                        className="p-1 text-error-500 hover:text-error-600 transition-colors duration-200"
                        title="Retry"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleRemoveFile(file.id)}
                      className="p-1 text-neutral-500 hover:text-error-600 transition-colors duration-200"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Progress Bar */}
                {file.status === 'uploading' && (
                  <div className="mb-2">
                    <ProgressBar
                      value={file.uploadProgress || 0}
                      size="sm"
                      variant="primary"
                      animated
                    />
                  </div>
                )}
                
                {/* Status */}
                <div className="flex items-center justify-between text-xs">
                  <span className={cn(
                    'font-medium',
                    file.status === 'completed' ? 'text-success-600' :
                    file.status === 'uploading' ? 'text-primary-600' :
                    file.status === 'error' ? 'text-error-600' :
                    'text-neutral-600'
                  )}>
                    {file.status === 'completed' ? 'Upload Complete' :
                     file.status === 'uploading' ? `Uploading... ${file.uploadProgress || 0}%` :
                     file.status === 'error' ? (file.error || 'Upload Failed') :
                     'Ready'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};