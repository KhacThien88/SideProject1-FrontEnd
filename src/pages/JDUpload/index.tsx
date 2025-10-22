import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { JDUploadZone } from '../../components/jd/JDUploadZone';
import { JDFileList } from '../../components/jd/JDFileList';
import { jdUploadService } from '../../services/api';
import type { JDUploadRequest, JDFileInfo } from '../../services/api';
import { ErrorMessage } from '../../components/shared/ErrorMessage';
import { useErrorHandler } from '../../components/shared/ErrorMessage';

export const JDUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { error, handleError, clearError } = useErrorHandler();
  
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showMetadataForm, setShowMetadataForm] = useState(false);
  const [defaultMetadata, setDefaultMetadata] = useState<JDUploadRequest['metadata']>({
    job_type: 'FULL_TIME',
    experience_level: 'MIDDLE',
    priority: 'normal',
  });

  const handleUploadComplete = useCallback((fileId: string, response: any) => {
    console.log('Upload completed:', fileId, response);
    
    // Refresh the file list
    setRefreshTrigger(prev => prev + 1);
    
    // Show success notification
    // You could implement a toast notification here
  }, []);

  const handleUploadError = useCallback((error: any) => {
    handleError(error);
  }, [handleError]);

  const handleFileSelect = useCallback((file: JDFileInfo) => {
    // Navigate to JD detail view
    navigate(`/jd/${file.file_id}`);
  }, [navigate]);

  const handleCreateJobProfile = useCallback(async (fileId: string) => {
    try {
      const result = await jdUploadService.createJobProfileFromJD(fileId);
      
      if (result.success) {
        // Navigate to job profile page
        navigate(`/jobs/profiles/${result.job_profile_id}`);
      }
    } catch (error: any) {
      handleError(error);
    }
  }, [navigate, handleError]);

  const handleDelete = useCallback(async (fileId: string) => {
    const confirmed = window.confirm('Bạn có chắc muốn xóa file này?');
    
    if (confirmed) {
      try {
        await jdUploadService.deleteJD(fileId);
        setRefreshTrigger(prev => prev + 1);
      } catch (error: any) {
        handleError(error);
      }
    }
  }, [handleError]);

  const handleReprocess = useCallback(async (fileId: string) => {
    try {
      await jdUploadService.reprocessJD(fileId);
      
      // Refresh list to show updated status
      setRefreshTrigger(prev => prev + 1);
      
      // Show success message
      console.log('File reprocessing started');
    } catch (error: any) {
      handleError(error);
    }
  }, [handleError]);

  const handleMetadataSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setShowMetadataForm(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                📋 Job Description Upload
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Upload và quản lý file Job Description để tạo thông tin tuyển dụng
              </p>
            </div>
            
            <button
              onClick={() => setShowMetadataForm(!showMetadataForm)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              ⚙️ Cài đặt mặc định
            </button>
          </div>
        </div>

        {/* Global Error */}
        {error && (
          <div className="mb-6">
            <ErrorMessage
              error={error}
              dismissAction={clearError}
              variant="banner"
            />
          </div>
        )}

        {/* Metadata Form */}
        {showMetadataForm && (
          <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Thông tin mặc định cho Job Description
            </h2>
            
            <form onSubmit={handleMetadataSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                    Tên công ty
                  </label>
                  <input
                    type="text"
                    id="company_name"
                    value={defaultMetadata?.company_name || ''}
                    onChange={(e) => setDefaultMetadata(prev => ({ ...prev, company_name: e.target.value }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Nhập tên công ty"
                  />
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Phòng ban
                  </label>
                  <input
                    type="text"
                    id="department"
                    value={defaultMetadata?.department || ''}
                    onChange={(e) => setDefaultMetadata(prev => ({ ...prev, department: e.target.value }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Nhập phòng ban"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Địa điểm
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={defaultMetadata?.location || ''}
                    onChange={(e) => setDefaultMetadata(prev => ({ ...prev, location: e.target.value }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Nhập địa điểm làm việc"
                  />
                </div>

                <div>
                  <label htmlFor="job_type" className="block text-sm font-medium text-gray-700">
                    Loại công việc
                  </label>
                  <select
                    id="job_type"
                    value={defaultMetadata?.job_type || 'FULL_TIME'}
                    onChange={(e) => setDefaultMetadata(prev => ({ 
                      ...prev, 
                      job_type: e.target.value as any 
                    }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="FULL_TIME">Toàn thời gian</option>
                    <option value="PART_TIME">Bán thời gian</option>
                    <option value="CONTRACT">Hợp đồng</option>
                    <option value="INTERNSHIP">Thực tập</option>
                    <option value="FREELANCE">Freelance</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="experience_level" className="block text-sm font-medium text-gray-700">
                    Cấp độ kinh nghiệm
                  </label>
                  <select
                    id="experience_level"
                    value={defaultMetadata?.experience_level || 'MIDDLE'}
                    onChange={(e) => setDefaultMetadata(prev => ({ 
                      ...prev, 
                      experience_level: e.target.value as any 
                    }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="ENTRY">Entry Level</option>
                    <option value="JUNIOR">Junior</option>
                    <option value="MIDDLE">Middle</option>
                    <option value="SENIOR">Senior</option>
                    <option value="LEAD">Lead</option>
                    <option value="EXECUTIVE">Executive</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                    Độ ưu tiên
                  </label>
                  <select
                    id="priority"
                    value={defaultMetadata?.priority || 'normal'}
                    onChange={(e) => setDefaultMetadata(prev => ({ 
                      ...prev, 
                      priority: e.target.value as any 
                    }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="low">Thấp</option>
                    <option value="normal">Bình thường</option>
                    <option value="high">Cao</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowMetadataForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Lưu cài đặt
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Upload Zone */}
        <div className="mb-8">
          <JDUploadZone
            onUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
            allowMultiple={true}
            maxFiles={10}
            defaultMetadata={defaultMetadata}
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Thao tác nhanh
          </h2>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button
              onClick={() => navigate('/jobs/create')}
              className="flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              ➕ Tạo job thủ công
            </button>
            
            <button
              onClick={() => navigate('/jobs')}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              📋 Quản lý jobs
            </button>
            
            <button
              onClick={() => navigate('/jobs/templates')}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              📄 Templates
            </button>
            
            <button
              onClick={() => navigate('/analytics/jobs')}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              📊 Thống kê
            </button>
          </div>
        </div>

        {/* File List */}
        <JDFileList
          onFileSelect={handleFileSelect}
          onCreateJobProfile={handleCreateJobProfile}
          onDelete={handleDelete}
          onReprocess={handleReprocess}
          refreshTrigger={refreshTrigger}
        />

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            💡 Hướng dẫn sử dụng
          </h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• <strong>Upload file:</strong> Kéo thả hoặc click để chọn file JD (PDF, DOC, DOCX)</p>
            <p>• <strong>Xử lý tự động:</strong> Hệ thống sẽ tự động trích xuất thông tin từ file</p>
            <p>• <strong>Tạo job:</strong> Sau khi xử lý xong, click nút ➕ để tạo job profile</p>
            <p>• <strong>Quản lý:</strong> Xem chi tiết, chỉnh sửa hoặc xóa file trong danh sách</p>
            <p>• <strong>Lỗi xử lý:</strong> File lỗi có thể được xử lý lại bằng nút 🔄</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JDUploadPage;
