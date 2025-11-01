import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api';
import type { 
  AuditLogEntry, 
  AuditLogFilters 
} from '../../services/api';
import { usePaginatedApiStatus } from '../../hooks/api/useApiStatus';
import { ErrorMessage } from '../../components/shared/ErrorMessage';
import { designSystem } from '../../styles/tokens';

export const AuditLogs: React.FC = () => {
  // const { t } = useTranslation(); // Commented out to avoid unused variable
  const [filters, setFilters] = useState<AuditLogFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Paginated audit logs
  const {
    items: logs,
    total,
    page,
    hasNext,
    hasPrev,
    isLoading,
    error,
    loadPage,
    nextPage,
    prevPage,
  } = usePaginatedApiStatus<AuditLogEntry>(1, 50);

  // Load logs with current filters
  useEffect(() => {
    const currentFilters: AuditLogFilters = {
      ...filters,
      search: searchTerm || undefined,
    };

    loadPage((page, limit) => 
      adminService.getAuditLogs(page, limit, currentFilters)
        .then(response => ({
          items: response.logs,
          total: response.total,
          hasMore: response.has_next
        }))
    );
  }, [filters, searchTerm, refreshTrigger]);

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create': return 'bg-green-100 text-green-800';
      case 'update': return 'bg-blue-100 text-blue-800';
      case 'delete': return 'bg-red-100 text-red-800';
      case 'login': return 'bg-purple-100 text-purple-800';
      case 'logout': return 'bg-gray-100 text-gray-800';
      case 'upload': return 'bg-orange-100 text-orange-800';
      case 'download': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create': return '➕';
      case 'update': return '✏️';
      case 'delete': return '🗑️';
      case 'login': return '🔐';
      case 'logout': return '🚪';
      case 'upload': return '📤';
      case 'download': return '📥';
      case 'view': return '👁️';
      case 'export': return '📊';
      default: return '📝';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={designSystem.typography.h1}>Audit Logs</h1>
            <p className={designSystem.typography.body}>
              Track system activities and user actions
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

      {/* Error Message */}
      {error && (
        <ErrorMessage 
          error="Failed to load audit logs" 
          retryAction={() => setRefreshTrigger(prev => prev + 1)}
          className="mb-6"
        />
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={designSystem.forms.input}
            />
          </div>
          
          <div>
            <select
              value={filters.action || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, action: e.target.value || undefined }))}
              className={designSystem.forms.select}
            >
              <option value="">All Actions</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
              <option value="upload">Upload</option>
              <option value="download">Download</option>
              <option value="view">View</option>
              <option value="export">Export</option>
            </select>
          </div>
          
          <div>
            <select
              value={filters.resource || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, resource: e.target.value || undefined }))}
              className={designSystem.forms.select}
            >
              <option value="">All Resources</option>
              <option value="user">Users</option>
              <option value="cv">CVs</option>
              <option value="job">Jobs</option>
              <option value="application">Applications</option>
              <option value="system">System</option>
            </select>
          </div>
          
          <div>
            <input
              type="date"
              value={filters.date_from || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, date_from: e.target.value || undefined }))}
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

      {/* Audit Logs Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className={designSystem.loading.spinnerLarge} />
          </div>
        ) : logs.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resource
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {logs.map((log) => {
                    const { date, time } = formatTimestamp(log.timestamp);
                    return (
                      <tr 
                        key={log.id} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedLog(log)}
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{date}</div>
                          <div className="text-xs text-gray-500">{time}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{getActionIcon(log.action)}</span>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActionColor(log.action)}`}>
                              {log.action}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {log.user_email}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {log.user_id}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {log.resource}
                          </div>
                          {log.resource_id && (
                            <div className="text-xs text-gray-500">
                              ID: {log.resource_id}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {log.ip_address}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 truncate max-w-xs">
                            {log.details || 'No additional details'}
                          </div>
                          {log.metadata && Object.keys(log.metadata).length > 0 && (
                            <div className="text-xs text-blue-600 mt-1">
                              + {Object.keys(log.metadata).length} metadata fields
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((page - 1) * 50) + 1} to {Math.min(page * 50, total)} of {total} logs
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
              <span className="text-4xl">📋</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Audit Logs Found</h3>
            <p className="text-gray-500">
              {searchTerm || Object.keys(filters).length > 0
                ? 'Try adjusting your search or filters'
                : 'No audit logs available at this time'
              }
            </p>
          </div>
        )}
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className={designSystem.typography.h3}>Audit Log Details</h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Timestamp</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedLog.timestamp).toLocaleString()}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Action</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <span className="text-lg">{getActionIcon(selectedLog.action)}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActionColor(selectedLog.action)}`}>
                      {selectedLog.action}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">User</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedLog.user_email}</p>
                  <p className="text-xs text-gray-500">ID: {selectedLog.user_id}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">IP Address</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedLog.ip_address}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Resource</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedLog.resource}</p>
                  {selectedLog.resource_id && (
                    <p className="text-xs text-gray-500">ID: {selectedLog.resource_id}</p>
                  )}
                </div>
              </div>
              
              {selectedLog.details && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Details</label>
                  <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded">
                    {selectedLog.details}
                  </p>
                </div>
              )}
              
              {selectedLog.metadata && Object.keys(selectedLog.metadata).length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Metadata</label>
                  <div className="mt-1 bg-gray-50 p-3 rounded">
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                      {JSON.stringify(selectedLog.metadata, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className={designSystem.buttons.secondary}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
