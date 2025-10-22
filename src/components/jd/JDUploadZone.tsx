import React, { useCallback, useState, useRef } from 'react';
import type { DragEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { jdUploadService } from '../../services/api';
import type { JDUploadRequest, UploadProgress } from '../../services/api';
import { UploadProgress as UploadProgressComponent } from '../shared/UploadProgress';
import { ErrorMessage } from '../shared/ErrorMessage';
import { designSystem } from '../../styles/tokens';
// import { Button } from '../ui/Button';

export interface JDUploadZoneProps {
  onUploadComplete?: (fileId: string, response: any) => void;
  onUploadError?: (error: any) => void;
  allowMultiple?: boolean;
  maxFiles?: number;
  defaultMetadata?: JDUploadRequest['metadata'];
  className?: string;
}

export interface UploadingFile {
  file: File;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  fileId?: string;
  error?: string;
}

export const JDUploadZone: React.FC<JDUploadZoneProps> = ({
  onUploadComplete,
  onUploadError,
  allowMultiple = true,
  maxFiles = 10,
  defaultMetadata,
  className = '',
}) => {
  const { t } = useTranslation();
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File validation
  const validateFiles = useCallback((files: File[]) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/rtf'
    ];

    return files.filter(file => allowedTypes.includes(file.type));
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setValidationError(null);

    // Validate files
    const invalidFiles: string[] = [];
    acceptedFiles.forEach(file => {
      const validation = jdUploadService.validateFile(file);
      if (!validation.valid) {
        invalidFiles.push(`${file.name}: ${validation.error}`);
      }
    });

    if (invalidFiles.length > 0) {
      setValidationError(`Một số file không hợp lệ:\n${invalidFiles.join('\n')}`);
      return;
    }

    // Check max files limit
    if (uploadingFiles.length + acceptedFiles.length > maxFiles) {
      setValidationError(`Chỉ có thể upload tối đa ${maxFiles} files cùng lúc`);
      return;
    }

    // Initialize uploading files
    const newUploadingFiles: UploadingFile[] = acceptedFiles.map(file => ({
      file,
      progress: 0,
      status: 'uploading',
    }));

    setUploadingFiles(prev => [...prev, ...newUploadingFiles]);

    // Upload files one by one
    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i];
      const uploadIndex = uploadingFiles.length + i;

      try {
        const uploadRequest: JDUploadRequest = {
          file,
          metadata: defaultMetadata,
        };

        const result = await jdUploadService.uploadJD(
          uploadRequest,
          (progress: UploadProgress) => {
            setUploadingFiles(prev => {
              const updated = [...prev];
              if (updated[uploadIndex]) {
                updated[uploadIndex] = {
                  ...updated[uploadIndex],
                  progress: progress.percentage,
                };
              }
              return updated;
            });
          }
        );

        // Update to completed status
        setUploadingFiles(prev => {
          const updated = [...prev];
          if (updated[uploadIndex]) {
            updated[uploadIndex] = {
              ...updated[uploadIndex],
              status: 'completed',
              progress: 100,
              fileId: result.file_id,
            };
          }
          return updated;
        });

        onUploadComplete?.(result.file_id, result);
      } catch (error: any) {
        // Update to failed status
        setUploadingFiles(prev => {
          const updated = [...prev];
          if (updated[uploadIndex]) {
            updated[uploadIndex] = {
              ...updated[uploadIndex],
              status: 'failed',
              error: error.message || 'Upload failed',
            };
          }
          return updated;
        });

        onUploadError?.(error);
      }
    }
  }, [uploadingFiles.length, maxFiles, defaultMetadata, onUploadComplete, onUploadError]);

  // Drag and drop handlers
  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = validateFiles(files);
    
    if (validFiles.length === 0) {
      setValidationError('Không có file hợp lệ nào được chọn');
      return;
    }

    if (files.length !== validFiles.length) {
      setValidationError('Một số file không được hỗ trợ đã bị loại bỏ');
    }

    onDrop(validFiles);
  }, [validateFiles, onDrop]);

  // File input handler
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = validateFiles(files);
    
    if (validFiles.length > 0) {
      onDrop(validFiles);
    }
    
    // Reset input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [validateFiles, onDrop]);

  const handleZoneClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const retryUpload = useCallback(async (index: number) => {
    const fileToRetry = uploadingFiles[index];
    if (!fileToRetry || fileToRetry.status !== 'failed') return;

    setUploadingFiles(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        status: 'uploading',
        progress: 0,
        error: undefined,
      };
      return updated;
    });

    try {
      const uploadRequest: JDUploadRequest = {
        file: fileToRetry.file,
        metadata: defaultMetadata,
      };

      const result = await jdUploadService.uploadJD(
        uploadRequest,
        (progress: UploadProgress) => {
          setUploadingFiles(prev => {
            const updated = [...prev];
            updated[index] = {
              ...updated[index],
              progress: progress.percentage,
            };
            return updated;
          });
        }
      );

      setUploadingFiles(prev => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          status: 'completed',
          progress: 100,
          fileId: result.file_id,
        };
        return updated;
      });

      onUploadComplete?.(result.file_id, result);
    } catch (error: any) {
      setUploadingFiles(prev => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          status: 'failed',
          error: error.message || 'Retry failed',
        };
        return updated;
      });

      onUploadError?.(error);
    }
  }, [uploadingFiles, defaultMetadata, onUploadComplete, onUploadError]);

  const removeFile = useCallback((index: number) => {
    setUploadingFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearCompleted = useCallback(() => {
    setUploadingFiles(prev => prev.filter(file => file.status !== 'completed'));
  }, []);

  const clearAll = useCallback(() => {
    setUploadingFiles([]);
    setValidationError(null);
  }, []);

  return (
    <div className={`w-full ${className}`}>
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleZoneClick}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={allowMultiple}
          accept=".pdf,.doc,.docx,.txt,.rtf"
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="text-6xl">📄</div>
          
          {isDragOver ? (
            <div>
              <p className="text-lg font-medium text-blue-600 mb-2">
                Thả file vào đây để upload
              </p>
            </div>
          ) : (
            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Tải lên Job Description
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Kéo thả file vào đây hoặc click để chọn file
              </p>
              <div className="flex flex-col items-center space-y-2">
                <button
                  type="button"
                  className={designSystem.buttons.primary}
                >
                  📁 Chọn file
                </button>
                <p className="text-xs text-gray-500">
                  Hỗ trợ: PDF, DOC, DOCX, TXT, RTF (tối đa 10MB)
                </p>
                {allowMultiple && (
                  <p className="text-xs text-gray-500">
                    Có thể chọn nhiều file cùng lúc (tối đa {maxFiles} files)
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Validation Error */}
      {validationError && (
        <div className="mt-4">
          <ErrorMessage
            error={validationError}
            type="validation"
            dismissAction={() => setValidationError(null)}
            variant="card"
          />
        </div>
      )}

      {/* Upload Progress */}
      {uploadingFiles.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Upload Progress ({uploadingFiles.length} files)
            </h3>
            <div className="flex space-x-2">
              {uploadingFiles.some(f => f.status === 'completed') && (
                <button
                  onClick={clearCompleted}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {t('jdFileManagement.actions.clearCompleted')}
                </button>
              )}
              <button
                onClick={clearAll}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                {t('jdFileManagement.actions.clearAll')}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {uploadingFiles.map((uploadingFile, index) => (
              <UploadProgressComponent
                key={`${uploadingFile.file.name}-${index}`}
                progress={uploadingFile.progress}
                filename={uploadingFile.file.name}
                status={uploadingFile.status}
                fileSize={uploadingFile.file.size}
                showDetails={true}
                onRetry={uploadingFile.status === 'failed' ? () => retryUpload(index) : undefined}
                onCancel={
                  uploadingFile.status === 'uploading' 
                    ? () => removeFile(index) 
                    : undefined
                }
              />
            ))}
          </div>

          {/* Summary */}
          <div className="mt-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>
                Hoàn thành: {uploadingFiles.filter(f => f.status === 'completed').length}
              </span>
              <span>
                Thất bại: {uploadingFiles.filter(f => f.status === 'failed').length}
              </span>
              <span>
                Đang xử lý: {uploadingFiles.filter(f => f.status === 'uploading' || f.status === 'processing').length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JDUploadZone;
