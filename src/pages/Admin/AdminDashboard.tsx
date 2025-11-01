import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api';
import type { DashboardStats, SystemHealthResponse } from '../../services/api';
import { useApiStatus } from '../../hooks/api/useApiStatus';
import { ErrorMessage } from '../../components/shared/ErrorMessage';
import { designSystem } from '../../styles/tokens';

export const AdminDashboard: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // API states
  const statsStatus = useApiStatus<DashboardStats>();
  const healthStatus = useApiStatus<SystemHealthResponse>();

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Load dashboard statistics
        statsStatus.execute(() => adminService.getDashboardStats());
        
        // Load system health
        healthStatus.execute(() => adminService.getSystemHealth());
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadDashboardData();
  }, [refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-orange-600 bg-orange-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getHealthStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={designSystem.typography.h1}>
              Admin Dashboard
            </h1>
            <p className={designSystem.typography.body}>
              System overview and management tools
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className={designSystem.buttons.secondary}
            disabled={statsStatus.isLoading || healthStatus.isLoading}
          >
            {(statsStatus.isLoading || healthStatus.isLoading) && (
              <div className={`${designSystem.loading.spinner} mr-2`} />
            )}
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Error Messages */}
      {statsStatus.error && (
        <ErrorMessage 
          error="Failed to load dashboard statistics" 
          retryAction={() => statsStatus.execute(() => adminService.getDashboardStats())}
          className="mb-6"
        />
      )}

      {healthStatus.error && (
        <ErrorMessage 
          error="Failed to load system health" 
          retryAction={() => healthStatus.execute(() => adminService.getSystemHealth())}
          className="mb-6"
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* System Health Status */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className={designSystem.typography.h3}>System Health</h2>
            
            {healthStatus.isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className={designSystem.loading.spinnerLarge} />
              </div>
            ) : healthStatus.data ? (
              <div className="mt-4 space-y-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getHealthStatusColor(healthStatus.data.status)}`}>
                  <span className="mr-2">{getHealthStatusIcon(healthStatus.data.status)}</span>
                  {healthStatus.data.status.charAt(0).toUpperCase() + healthStatus.data.status.slice(1)}
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Database</span>
                    <span className={`text-xs px-2 py-1 rounded ${getHealthStatusColor(healthStatus.data.services?.database || 'unknown')}`}>
                      {healthStatus.data.services?.database || 'unknown'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">S3 Storage</span>
                    <span className={`text-xs px-2 py-1 rounded ${getHealthStatusColor(healthStatus.data.services?.s3 || 'unknown')}`}>
                      {healthStatus.data.services?.s3 || 'unknown'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">AI Services</span>
                    <span className={`text-xs px-2 py-1 rounded ${getHealthStatusColor(healthStatus.data.services?.ai_services || 'unknown')}`}>
                      {healthStatus.data.services?.ai_services || 'unknown'}
                    </span>
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <p className="text-xs text-gray-500">
                    Last updated: {new Date(healthStatus.data.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No health data available
              </div>
            )}
          </div>
        </div>

        {/* Dashboard Statistics */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className={designSystem.typography.h3}>Dashboard Statistics</h2>
            
            {statsStatus.isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className={designSystem.loading.spinnerLarge} />
              </div>
            ) : statsStatus.data ? (
              <div className="mt-6">
                {/* User Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {statsStatus.data.total_users || 0}
                    </div>
                    <div className="text-sm text-blue-800">Total Users</div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {statsStatus.data.active_users_today || 0}
                    </div>
                    <div className="text-sm text-green-800">Active Users</div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {statsStatus.data.role_breakdown?.candidate || 0}
                    </div>
                    <div className="text-sm text-purple-800">Candidates</div>
                  </div>
                  
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {statsStatus.data.role_breakdown?.recruiter || 0}
                    </div>
                    <div className="text-sm text-orange-800">Recruiters</div>
                  </div>
                </div>

                {/* Application Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <div className="text-lg font-semibold text-indigo-900">CVs Processed</div>
                    <div className="text-2xl font-bold text-indigo-600 mt-1">
                      {statsStatus.data.total_users || 0}
                    </div>
                    <div className="text-sm text-indigo-700 mt-1">
                      New this week: {statsStatus.data.new_users_this_week || 0}
                    </div>
                  </div>
                  
                  <div className="bg-teal-50 rounded-lg p-4">
                    <div className="text-lg font-semibold text-teal-900">Active Today</div>
                    <div className="text-2xl font-bold text-teal-600 mt-1">
                      {statsStatus.data.active_users_today || 0}
                    </div>
                    <div className="text-sm text-teal-700 mt-1">
                      New today: {statsStatus.data.new_users_today || 0}
                    </div>
                  </div>
                  
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="text-lg font-semibold text-pink-900">This Month</div>
                    <div className="text-2xl font-bold text-pink-600 mt-1">
                      {statsStatus.data.new_users_this_month || 0}
                    </div>
                    <div className="text-sm text-pink-700 mt-1">
                      New users
                    </div>
                  </div>
                </div>

                {/* Status Breakdown */}
                <div className="border-t pt-6">
                  <h3 className={designSystem.typography.h4}>User Status Breakdown</h3>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">
                        {statsStatus.data.status_breakdown?.active || 0}
                      </div>
                      <div className="text-sm text-gray-600">Active</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-orange-600">
                        {statsStatus.data.status_breakdown?.inactive || 0}
                      </div>
                      <div className="text-sm text-gray-600">Inactive</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-red-600">
                        {statsStatus.data.status_breakdown?.suspended || 0}
                      </div>
                      <div className="text-sm text-gray-600">Suspended</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No statistics available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className={`${designSystem.buttons.primary} justify-center`}>
          👥 User Management
        </button>
        <button className={`${designSystem.buttons.secondary} justify-center`}>
          📄 CV Administration
        </button>
        <button className={`${designSystem.buttons.secondary} justify-center`}>
          📊 Analytics
        </button>
        <button className={`${designSystem.buttons.secondary} justify-center`}>
          🔍 Audit Logs
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
