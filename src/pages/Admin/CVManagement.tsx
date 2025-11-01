import React, { useState, useEffect } from 'react';
import { cvAdminService } from '../../services/api';
import type { 
  AdminCVInfo, 
  CVAdminListFilters,
  CVUpdateRequest,
  BulkCVOperation,
  BulkCVOperationResult,
  CVQualityReport
} from '../../services/api';
import { useApiStatus, usePaginatedApiStatus } from '../../hooks/api/useApiStatus';
import { ErrorMessage } from '../../components/shared/ErrorMessage';
import { designSystem } from '../../styles/tokens';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cvData: CVUpdateRequest) => Promise<void>;
  cv?: AdminCVInfo | null;
  isLoading?: boolean;
}

const CVModal: React.FC<CVModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  cv = null, 
  isLoading = false 
}) => {
  // const { t } = useTranslation(); // Commented out to avoid unused variable
  const [formData, setFormData] = useState<CVUpdateRequest>({
    filename: '',
    status: 'uploaded', // Fixed: 'pending' is not valid, use 'uploaded' instead
    quality_score: 0,
    tags: [],
    notes: ''
  });

  useEffect(() => {
    if (cv) {
      setFormData({
        filename: cv.filename,
        status: cv.status,
        quality_score: cv.quality_score || 0,
        tags: cv.tags || [],
        notes: cv.notes || ''
      });
    }
  }, [cv]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <h3 className={designSystem.typography.h3}>
          {cv ? 'Edit CV' : 'CV Details'}
        </h3>
        
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filename
            </label>
            <input
              type="text"
              value={formData.filename}
              onChange={(e) => handleInputChange('filename', e.target.value)}
              className={designSystem.forms.input}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className={designSystem.forms.select}
              required
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="processed">Processed</option>
              <option value="failed">Failed</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quality Score (0-100)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.quality_score}
              onChange={(e) => handleInputChange('quality_score', parseInt(e.target.value) || 0)}
              className={designSystem.forms.input}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={(formData.tags || []).join(', ')}
              onChange={(e) => handleTagsChange(e.target.value)}
              className={designSystem.forms.input}
              placeholder="e.g. experienced, senior, frontend"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className={designSystem.forms.textarea}
              rows={3}
              placeholder="Add administrative notes..."
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={designSystem.buttons.secondary}
              disabled={isLoading}
            >
              {cv ? 'Cancel' : 'Close'}
            </button>
            {cv && (
              <button
                type="submit"
                className={designSystem.buttons.primary}
                disabled={isLoading}
              >
                {isLoading && (
                  <div className={`${designSystem.loading.buttonLoading} mr-2`} />
                )}
                Update CV
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export const CVManagement: React.FC = () => {
  // const { t } = useTranslation(); // Commented out to avoid unused variable
  const [selectedCVs, setSelectedCVs] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<CVAdminListFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showCVModal, setShowCVModal] = useState(false);
  const [editingCV, setEditingCV] = useState<AdminCVInfo | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  // const [qualityReport, setQualityReport] = useState<CVQualityReport | null>(null); // Commented out unused

  // API states
  const updateCVStatus = useApiStatus<AdminCVInfo>();
  const deleteCVStatus = useApiStatus<{ message: string }>();
  const bulkOperationStatus = useApiStatus<BulkCVOperationResult>();
  const qualityReportStatus = useApiStatus<CVQualityReport>();
  
  // Paginated CV list
  const {
    items: cvs,
    total,
    page,
    hasNext,
    hasPrev,
    isLoading,
    error,
    loadPage,
    nextPage,
    prevPage,
  } = usePaginatedApiStatus<AdminCVInfo>(1, 20);

  // Load CVs with current filters
  useEffect(() => {
    const currentFilters: CVAdminListFilters = {
      ...filters,
      search: searchTerm || undefined,
    };

    loadPage((page, limit) => 
      cvAdminService.getCVList(page, limit, currentFilters)
        .then(response => ({
          items: response.cvs,
          total: response.total,
          hasMore: response.has_next
        }))
    );
  }, [filters, searchTerm, refreshTrigger]);

  // Load quality report
  useEffect(() => {
    qualityReportStatus.execute(() => cvAdminService.getCVQualityReport('all'));
  }, [refreshTrigger]);

  const handleUpdateCV = async (cvData: CVUpdateRequest) => {
    if (!editingCV) return;
    
    try {
      await updateCVStatus.execute(() => cvAdminService.updateCV(editingCV.cv_id, cvData));
      setShowCVModal(false);
      setEditingCV(null);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error updating CV:', error);
    }
  };

  const handleDeleteCV = async (cvId: string) => {
    if (!confirm('Are you sure you want to delete this CV?')) return;
    
    try {
      await deleteCVStatus.execute(() => cvAdminService.deleteCV(cvId));
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error deleting CV:', error);
    }
  };

  const handleBulkOperation = async (operation: BulkCVOperation) => {
    if (selectedCVs.size === 0) return;
    
    const confirmMessage = operation.action === 'delete' 
      ? `Are you sure you want to delete ${selectedCVs.size} CVs?`
      : `Are you sure you want to ${operation.action} ${selectedCVs.size} CVs?`;
      
    if (!confirm(confirmMessage)) return;

    try {
      const operationData: BulkCVOperation = {
        ...operation,
        cv_ids: Array.from(selectedCVs)
      };
      
      await bulkOperationStatus.execute(() => cvAdminService.bulkCVOperation(operationData));
      setSelectedCVs(new Set());
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error performing bulk operation:', error);
    }
  };

  const handleSelectCV = (cvId: string) => {
    setSelectedCVs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cvId)) {
        newSet.delete(cvId);
      } else {
        newSet.add(cvId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedCVs.size === cvs.length) {
      setSelectedCVs(new Set());
    } else {
      setSelectedCVs(new Set(cvs.map(cv => cv.cv_id)));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'archived': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={designSystem.typography.h1}>CV Management</h1>
            <p className={designSystem.typography.body}>
              Administer CVs, quality scores, and processing status
            </p>
          </div>
          <button
            onClick={() => setRefreshTrigger(prev => prev + 1)}
            className={designSystem.buttons.secondary}
            disabled={isLoading}
          >
            {isLoading && (
              <div className={`${designSystem.loading.spinner} mr-2`} />
            )}
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Error Messages */}
      {error && (
        <ErrorMessage 
          error="Failed to load CVs" 
          retryAction={() => setRefreshTrigger(prev => prev + 1)}
          className="mb-6"
        />
      )}

      {updateCVStatus.error && (
        <ErrorMessage 
          error={updateCVStatus.error}
          retryAction={() => setRefreshTrigger(prev => prev + 1)}
          className="mb-6"
        />
      )}

      {/* Quality Report */}
      {qualityReportStatus.data && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm font-medium text-gray-700">Total CVs</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {qualityReportStatus.data.total_cvs}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm font-medium text-gray-700">Avg Quality Score</div>
            <div className={`text-2xl font-bold mt-1 ${getQualityColor(qualityReportStatus.data.average_score)}`}>
              {qualityReportStatus.data.average_score.toFixed(1)}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm font-medium text-gray-700">High Quality CVs</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {qualityReportStatus.data.high_quality_count}
            </div>
            <div className="text-xs text-gray-500">Score ≥ 80</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm font-medium text-gray-700">Processing Queue</div>
            <div className="text-2xl font-bold text-orange-600 mt-1">
              {qualityReportStatus.data.pending_count}
            </div>
            <div className="text-xs text-gray-500">Pending</div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search CVs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={designSystem.forms.input}
            />
          </div>
          
          <div>
            <select
              value={filters.status || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, status: (e.target.value as any) || undefined }))}
              className={designSystem.forms.select}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="processed">Processed</option>
              <option value="failed">Failed</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          
          <div>
            <select
              value={filters.quality_range || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, quality_range: (e.target.value as any) || undefined }))}
              className={designSystem.forms.select}
            >
              <option value="">All Quality</option>
              <option value="high">High (80-100)</option>
              <option value="medium">Medium (60-79)</option>
              <option value="low">Low (0-59)</option>
            </select>
          </div>
          
          <div>
            <input
              type="date"
              value={filters.uploaded_after || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, uploaded_after: e.target.value || undefined }))}
              className={designSystem.forms.input}
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setFilters({});
                setSearchTerm('');
              }}
              className={designSystem.buttons.secondary}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Operations */}
      {selectedCVs.size > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800">
              {selectedCVs.size} CVs selected
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleBulkOperation({ action: 'reprocess', operation: 'reprocess', cv_ids: [] })}
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                disabled={bulkOperationStatus.isLoading}
              >
                Reprocess
              </button>
              <button
                onClick={() => handleBulkOperation({ action: 'archive', operation: 'archive', cv_ids: [] })}
                className="text-sm px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                disabled={bulkOperationStatus.isLoading}
              >
                Archive
              </button>
              <button
                onClick={() => handleBulkOperation({ action: 'delete', operation: 'delete', cv_ids: [] })}
                className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                disabled={bulkOperationStatus.isLoading}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CV Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className={designSystem.loading.spinnerLarge} />
          </div>
        ) : cvs.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedCVs.size === cvs.length && cvs.length > 0}
                        onChange={handleSelectAll}
                        className={designSystem.forms.checkbox}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CV Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quality
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uploaded
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cvs.map((cv) => (
                    <tr key={cv.cv_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedCVs.has(cv.cv_id)}
                          onChange={() => handleSelectCV(cv.cv_id)}
                          className={designSystem.forms.checkbox}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {cv.filename}
                          </div>
                          <div className="text-sm text-gray-500">
                            {cv.candidate_name || 'Unknown candidate'}
                          </div>
                          <div className="text-xs text-gray-400">
                            ID: {cv.cv_id.slice(0, 8)}...
                          </div>
                          {cv.tags && cv.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {cv.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className="inline-flex px-1 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                                  {tag}
                                </span>
                              ))}
                              {cv.tags.length > 3 && (
                                <span className="text-xs text-gray-500">+{cv.tags.length - 3} more</span>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(cv.status)}`}>
                          {cv.status.charAt(0).toUpperCase() + cv.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-sm font-medium ${getQualityColor(cv.quality_score || 0)}`}>
                          {cv.quality_score || 0}/100
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className={`h-2 rounded-full ${
                              (cv.quality_score || 0) >= 80 ? 'bg-green-500' :
                              (cv.quality_score || 0) >= 60 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${cv.quality_score || 0}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(cv.uploaded_at).toLocaleDateString()}
                        <br />
                        <span className="text-xs">
                          {new Date(cv.uploaded_at).toLocaleTimeString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium space-x-2">
                        <button
                          onClick={() => {
                            setEditingCV(cv);
                            setShowCVModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            setEditingCV(cv);
                            setShowCVModal(true);
                          }}
                          className="text-green-600 hover:text-green-800 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCV(cv.cv_id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          disabled={deleteCVStatus.isLoading}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((page - 1) * 20) + 1} to {Math.min(page * 20, total)} of {total} CVs
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => prevPage()}
                  disabled={!hasPrev}
                  className={`px-3 py-1 text-sm border rounded ${
                    hasPrev 
                      ? 'border-gray-300 hover:bg-gray-50' 
                      : 'border-gray-200 text-gray-400 cursor-not-allowed'
                  } transition-colors`}
                >
                  Previous
                </button>
                <button
                  onClick={() => nextPage()}
                  disabled={!hasNext}
                  className={`px-3 py-1 text-sm border rounded ${
                    hasNext 
                      ? 'border-gray-300 hover:bg-gray-50' 
                      : 'border-gray-200 text-gray-400 cursor-not-allowed'
                  } transition-colors`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <span className="text-4xl">📄</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No CVs Found</h3>
            <p className="text-gray-500">
              {searchTerm || Object.keys(filters).length > 0
                ? 'Try adjusting your search or filters'
                : 'No CVs available for administration'
              }
            </p>
          </div>
        )}
      </div>

      {/* CV Modal */}
      <CVModal
        isOpen={showCVModal}
        onClose={() => {
          setShowCVModal(false);
          setEditingCV(null);
        }}
        onSave={handleUpdateCV}
        cv={editingCV}
        isLoading={updateCVStatus.isLoading}
      />
    </div>
  );
};

export default CVManagement;
