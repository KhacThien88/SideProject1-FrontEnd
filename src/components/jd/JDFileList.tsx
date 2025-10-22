import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { jdUploadService } from '../../services/api';
import type { JDFileInfo, JDListFilters } from '../../services/api';
import { StatusDisplay } from '../shared/StatusDisplay';
import { ErrorMessage } from '../shared/ErrorMessage';
import { usePaginatedApiStatus } from '../../hooks/api/useApiStatus';
import { designSystem } from '../../styles/tokens';
// import { Button } from '../ui/Button';

export interface JDFileListProps {
  onFileSelect?: (file: JDFileInfo) => void;
  onCreateJobProfile?: (fileId: string) => void;
  onDelete?: (fileId: string) => void;
  onReprocess?: (fileId: string) => void;
  filters?: Partial<JDListFilters>;
  refreshTrigger?: number;
  className?: string;
}

export const JDFileList: React.FC<JDFileListProps> = ({
  onFileSelect,
  onCreateJobProfile,
  onDelete,
  onReprocess,
  filters = {},
  refreshTrigger,
  className = '',
}) => {
  const { t } = useTranslation();
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  
  const {
    items: files,
    total,
    page,
    hasNext,
    hasPrev,
    isLoading,
    error,
    loadPage,
    nextPage,
    prevPage,
  } = usePaginatedApiStatus<JDFileInfo>(1, 20);

  // Load files on component mount and filter changes
  useEffect(() => {
    const currentFilters: JDListFilters = {
      ...filters,
      search: searchTerm || undefined,
      status: (statusFilter as any) || undefined,
    };

    loadPage((page, limit) => 
      jdUploadService.getJDList(page, limit, currentFilters)
        .then(response => ({
          items: response.jd_files,
          total: response.total,
          page: response.page,
          limit: response.limit,
          hasNext: response.has_next,
          hasPrev: response.has_prev,
        }))
    );
  }, [loadPage, searchTerm, statusFilter, refreshTrigger, filters]);

  const handleSelectFile = (fileId: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(fileId)) {
      newSelected.delete(fileId);
    } else {
      newSelected.add(fileId);
    }
    setSelectedFiles(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedFiles.size === files.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(files.map(f => f.file_id)));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedFiles.size === 0 || !onDelete) return;
    
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa ${selectedFiles.size} file đã chọn?`
    );
    
    if (confirmed) {
      for (const fileId of selectedFiles) {
        try {
          await onDelete(fileId);
        } catch (error) {
          console.error('Failed to delete file:', fileId, error);
        }
      }
      setSelectedFiles(new Set());
      // Refresh list
      loadPage((page, limit) => 
        jdUploadService.getJDList(page, limit, filters)
          .then(response => ({
            items: response.jd_files,
            total: response.total,
            page: response.page,
            limit: response.limit,
            hasNext: response.has_next,
            hasPrev: response.has_prev,
          }))
      );
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'Hôm nay ' + date.toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffInDays === 1) {
      return 'Hôm qua';
    } else if (diffInDays < 7) {
      return `${diffInDays} ngày trước`;
    } else {
      return date.toLocaleDateString('vi-VN');
    }
  };

  if (error) {
    return (
      <div className={className}>
        <ErrorMessage
          error={error}
          type="server"
          retryAction={() => loadPage((page, limit) => 
            jdUploadService.getJDList(page, limit, filters)
              .then(response => ({
                items: response.jd_files,
                total: response.total,
                page: response.page,
                limit: response.limit,
                hasNext: response.has_next,
                hasPrev: response.has_prev,
              }))
          )}
        />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Danh sách Job Description ({total} files)
          </h2>
          
          {selectedFiles.size > 0 && onDelete && (
            <button
              onClick={handleBulkDelete}
              className={designSystem.buttons.danger}
            >
              🗑️ {t('apiIntegration.jdUpload.deleteSelected')} ({selectedFiles.size})
            </button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên file, công ty, vị trí..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={designSystem.forms.input}
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={designSystem.forms.select}
            >
              <option value="">{t('jdFileManagement.allStatuses')}</option>
              <option value="uploaded">{t('status.uploaded')}</option>
              <option value="processing">{t('status.processing')}</option>
              <option value="processed">{t('status.processed')}</option>
              <option value="failed">{t('status.failed')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">{t('jdFileManagement.loading')}</span>
        </div>
      )}

      {/* File List */}
      {!isLoading && (
        <>
          {files.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Chưa có file nào
              </h3>
              <p className="text-gray-500">
                Upload file Job Description để bắt đầu
              </p>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={files.length > 0 && selectedFiles.size === files.length}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Chọn tất cả
                  </span>
                </div>
              </div>

              {/* File Items */}
              <div className="divide-y divide-gray-200">
                {files.map((file) => (
                  <div
                    key={file.file_id}
                    className={`px-6 py-4 hover:bg-gray-50 transition-colors ${
                      selectedFiles.has(file.file_id) ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Checkbox */}
                      <div className="flex-shrink-0 mt-1">
                        <input
                          type="checkbox"
                          checked={selectedFiles.has(file.file_id)}
                          onChange={() => handleSelectFile(file.file_id)}
                          className={designSystem.forms.checkbox}
                        />
                      </div>

                      {/* File Icon */}
                      <div className="flex-shrink-0">
                        <div className="text-3xl">
                          {jdUploadService.getFileTypeIcon(file.file_type)}
                        </div>
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <button
                              onClick={() => onFileSelect?.(file)}
                              className="text-left"
                            >
                              <h3 className="text-sm font-medium text-gray-900 truncate hover:text-blue-600 transition-colors">
                                {file.filename}
                              </h3>
                            </button>
                            
                            {file.position_title && (
                              <p className="text-sm text-gray-600 mt-1">
                                <span className="font-medium">Vị trí:</span> {file.position_title}
                              </p>
                            )}
                            
                            {file.company_name && (
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Công ty:</span> {file.company_name}
                              </p>
                            )}

                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>{formatFileSize(file.file_size)}</span>
                              <span>•</span>
                              <span>{formatDate(file.uploaded_at)}</span>
                              {file.processed_at && (
                                <>
                                  <span>•</span>
                                  <span>Xử lý: {formatDate(file.processed_at)}</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 ml-4">
                            {/* Status */}
                            <StatusDisplay
                              status={file.status as any}
                              size="sm"
                              variant="badge"
                            />

                            {/* Actions */}
                            <div className="flex space-x-1">
                              {file.status === 'processed' && onCreateJobProfile && (
                                <button
                                  onClick={() => onCreateJobProfile(file.file_id)}
                                  className="p-1 text-green-600 hover:text-green-800 transition-colors"
                                  title={t('jdFileManagement.actions.createJobProfile')}
                                >
                                  <span className="text-sm">➕</span>
                                </button>
                              )}
                              
                              {file.status === 'failed' && onReprocess && (
                                <button
                                  onClick={() => onReprocess(file.file_id)}
                                  className="p-1 text-orange-600 hover:text-orange-800 transition-colors"
                                  title="Xử lý lại"
                                >
                                  <span className="text-sm">🔄</span>
                                </button>
                              )}
                              
                              <button
                                onClick={() => window.open(file.file_url, '_blank')}
                                className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                                title="Xem file"
                              >
                                <span className="text-sm">👁️</span>
                              </button>
                              
                              {onDelete && (
                                <button
                                  onClick={() => onDelete(file.file_id)}
                                  className="p-1 text-red-600 hover:text-red-800 transition-colors"
                                  title={t('jdFileManagement.actions.deleteFile')}
                                >
                                  <span className="text-sm">🗑️</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {total > 20 && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Hiển thị {((page - 1) * 20) + 1} - {Math.min(page * 20, total)} của {total} files
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => prevPage()}
                        disabled={!hasPrev}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Trước
                      </button>
                      <span className="px-3 py-1 text-sm text-gray-700">
                        Trang {page}
                      </span>
                      <button
                        onClick={() => nextPage()}
                        disabled={!hasNext}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Sau
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default JDFileList;
