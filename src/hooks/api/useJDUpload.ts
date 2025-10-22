import { useState, useCallback } from 'react';
import { jdUploadService } from '../../services/api';
import type {
  JDUploadRequest,
  JDUploadResponse,
  JDUploadStatusResponse,
  JDListFilters,
  UploadProgress,
  BulkUploadResult,
} from '../../services/api';
import { useApiStatus, usePaginatedApiStatus } from './useApiStatus';

export interface UseJDUploadOptions {
  onUploadComplete?: (fileId: string, response: JDUploadResponse) => void;
  onUploadError?: (error: any) => void;
  onUploadProgress?: (progress: UploadProgress) => void;
  autoRefreshList?: boolean;
}

export const useJDUpload = (options: UseJDUploadOptions = {}) => {
  const { onUploadComplete, onUploadProgress, autoRefreshList = true } = options;
  
  const uploadStatus = useApiStatus<JDUploadResponse>();
  const statusStatus = useApiStatus<JDUploadStatusResponse>();
  const bulkUploadStatus = useApiStatus<BulkUploadResult>();
  const deleteStatus = useApiStatus<{ message: string }>();
  const reprocessStatus = useApiStatus<{ message: string }>();
  
  const [uploadingFiles, setUploadingFiles] = useState<Map<string, UploadProgress>>(new Map());

  /**
   * Upload single JD file
   */
  const uploadJD = useCallback(async (
    file: File,
    metadata?: JDUploadRequest['metadata']
  ) => {
    const uploadRequest: JDUploadRequest = { file, metadata };
    
    const result = await uploadStatus.execute(async () => {
      return jdUploadService.uploadJD(uploadRequest, (progress) => {
        setUploadingFiles(prev => new Map(prev.set(file.name, progress)));
        onUploadProgress?.(progress);
      });
    });

    if (result) {
      onUploadComplete?.(result.file_id, result);
      // Remove from uploading files after completion
      setUploadingFiles(prev => {
        const newMap = new Map(prev);
        newMap.delete(file.name);
        return newMap;
      });
    }

    return result;
  }, [uploadStatus, onUploadComplete, onUploadProgress]);

  /**
   * Get JD upload status
   */
  const getJDUploadStatus = useCallback(async (fileId: string) => {
    return statusStatus.execute(() => jdUploadService.getJDUploadStatus(fileId));
  }, [statusStatus]);

  /**
   * Delete JD file
   */
  const deleteJD = useCallback(async (fileId: string) => {
    const result = await deleteStatus.execute(() => jdUploadService.deleteJD(fileId));
    
    if (result && autoRefreshList) {
      // Trigger list refresh if needed
      // This would typically be handled by the parent component
    }
    
    return result;
  }, [deleteStatus, autoRefreshList]);

  /**
   * Reprocess JD file
   */
  const reprocessJD = useCallback(async (fileId: string) => {
    return reprocessStatus.execute(() => jdUploadService.reprocessJD(fileId));
  }, [reprocessStatus]);

  /**
   * Bulk upload multiple JD files
   */
  const bulkUploadJDs = useCallback(async (
    files: File[],
    commonMetadata?: JDUploadRequest['metadata']
  ) => {
    return bulkUploadStatus.execute(async () => {
      return jdUploadService.bulkUploadJDs(
        files,
        commonMetadata,
        (fileProgress, overallProgress) => {
          // Update individual file progress
          setUploadingFiles(prev => new Map(prev.set(fileProgress.filename, fileProgress)));
          
          // Call progress callback with overall progress
          onUploadProgress?.({
            ...fileProgress,
            percentage: Math.round((overallProgress.completed / overallProgress.total) * 100),
          });
        }
      );
    });
  }, [bulkUploadStatus, onUploadProgress]);

  /**
   * Create job profile from JD
   */
  const createJobProfileFromJD = useCallback(async (
    fileId: string,
    profileData?: {
      title?: string;
      description?: string;
      requirements?: any;
      location?: string;
      salary_range?: {
        min: number;
        max: number;
        currency: string;
      };
    }
  ) => {
    return jdUploadService.createJobProfileFromJD(fileId, profileData);
  }, []);

  /**
   * Validate file before upload
   */
  const validateFile = useCallback((file: File) => {
    return jdUploadService.validateFile(file);
  }, []);

  /**
   * Get file info with extracted data
   */
  const getJDFileInfo = useCallback(async (fileId: string) => {
    return statusStatus.execute(() => jdUploadService.getJDFileInfo(fileId));
  }, [statusStatus]);

  /**
   * Cancel ongoing uploads
   */
  const cancelUploads = useCallback(() => {
    setUploadingFiles(new Map());
    uploadStatus.reset();
    bulkUploadStatus.reset();
  }, [uploadStatus, bulkUploadStatus]);

  /**
   * Reset all states
   */
  const reset = useCallback(() => {
    uploadStatus.reset();
    statusStatus.reset();
    bulkUploadStatus.reset();
    deleteStatus.reset();
    reprocessStatus.reset();
    setUploadingFiles(new Map());
  }, [uploadStatus, statusStatus, bulkUploadStatus, deleteStatus, reprocessStatus]);

  // Helper functions
  const getUploadProgress = useCallback((filename: string) => {
    return uploadingFiles.get(filename);
  }, [uploadingFiles]);

  const isUploading = useCallback(() => {
    return uploadStatus.isLoading || bulkUploadStatus.isLoading || uploadingFiles.size > 0;
  }, [uploadStatus.isLoading, bulkUploadStatus.isLoading, uploadingFiles.size]);

  const getUploadingFilesCount = useCallback(() => {
    return uploadingFiles.size;
  }, [uploadingFiles.size]);

  return {
    // States
    uploadStatus: uploadStatus.status,
    statusStatus: statusStatus.status,
    bulkUploadStatus: bulkUploadStatus.status,
    deleteStatus: deleteStatus.status,
    reprocessStatus: reprocessStatus.status,
    
    // Data
    uploadResult: uploadStatus.data,
    fileStatus: statusStatus.data,
    bulkUploadResult: bulkUploadStatus.data,
    
    // Flags
    isUploading: isUploading(),
    isGettingStatus: statusStatus.isLoading,
    isDeleting: deleteStatus.isLoading,
    isReprocessing: reprocessStatus.isLoading,
    
    // Uploading files tracking
    uploadingFiles: Array.from(uploadingFiles.entries()).map(([fileName, progress]) => ({
      ...progress,
      filename: fileName,
    })),
    uploadingFilesCount: getUploadingFilesCount(),
    
    // Actions
    uploadJD,
    getJDUploadStatus,
    deleteJD,
    reprocessJD,
    bulkUploadJDs,
    createJobProfileFromJD,
    validateFile,
    getJDFileInfo,
    cancelUploads,
    reset,
    
    // Helpers
    getUploadProgress,
    
    // Errors
    uploadError: uploadStatus.error,
    statusError: statusStatus.error,
    bulkUploadError: bulkUploadStatus.error,
    deleteError: deleteStatus.error,
    reprocessError: reprocessStatus.error,
  };
};

/**
 * Hook for managing JD file list with pagination and filters
 */
export const useJDFileList = (initialFilters?: Partial<JDListFilters>) => {
  const [filters, setFilters] = useState<Partial<JDListFilters>>(initialFilters || {});
  
  const {
    items: files,
    total,
    page,
    limit,
    hasNext,
    hasPrev,
    isLoading,
    error,
    loadPage,
    nextPage,
    prevPage,
    goToPage,
    reset,
  } = usePaginatedApiStatus<any>(1, 20);

  /**
   * Load JD files with current filters
   */
  const loadJDFiles = useCallback((newPage?: number) => {
    return loadPage(
      (page, limit) => 
        jdUploadService.getJDList(page, limit, filters)
          .then(response => ({
            items: response.jd_files,
            total: response.total,
            page: response.page,
            limit: response.limit,
            hasNext: response.has_next,
            hasPrev: response.has_prev,
          })),
      newPage
    );
  }, [loadPage, filters]);

  /**
   * Update filters and reload
   */
  const updateFilters = useCallback((newFilters: Partial<JDListFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    
    // Reload with new filters
    loadPage(
      (page, limit) => 
        jdUploadService.getJDList(page, limit, { ...filters, ...newFilters })
          .then(response => ({
            items: response.jd_files,
            total: response.total,
            page: response.page,
            limit: response.limit,
            hasNext: response.has_next,
            hasPrev: response.has_prev,
          }))
    );
  }, [loadPage, filters]);

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    setFilters({});
    loadPage(
      (page, limit) => 
        jdUploadService.getJDList(page, limit, {})
          .then(response => ({
            items: response.jd_files,
            total: response.total,
            page: response.page,
            limit: response.limit,
            hasNext: response.has_next,
            hasPrev: response.has_prev,
          }))
    );
  }, [loadPage]);

  /**
   * Refresh current page
   */
  const refresh = useCallback(() => {
    loadJDFiles();
  }, [loadJDFiles]);

  return {
    // List data
    files,
    total,
    page,
    limit,
    hasNext,
    hasPrev,
    
    // States
    isLoading,
    error,
    
    // Filters
    filters,
    
    // Actions
    loadJDFiles,
    nextPage: () => nextPage(),
    prevPage: () => prevPage(),
    goToPage: (targetPage: number) => goToPage(
      (page, limit) => 
        jdUploadService.getJDList(page, limit, filters)
          .then(response => ({
            items: response.jd_files,
            total: response.total,
            page: response.page,
            limit: response.limit,
            hasNext: response.has_next,
            hasPrev: response.has_prev,
          })),
      targetPage
    ),
    updateFilters,
    clearFilters,
    refresh,
    reset,
  };
};
