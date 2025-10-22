import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api';
import type { 
  AdminUser, 
  UserListFilters,
  CreateUserRequest,
  UpdateUserRequest,
  BulkUserOperation,
  BulkOperationResult
} from '../../services/api';
import { useApiStatus, usePaginatedApiStatus } from '../../hooks/api/useApiStatus';
import { ErrorMessage } from '../../components/shared/ErrorMessage';
import { designSystem } from '../../styles/tokens';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: CreateUserRequest | UpdateUserRequest) => Promise<void>;
  user?: AdminUser | null;
  isLoading?: boolean;
}

const UserModal: React.FC<UserModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  user = null, 
  isLoading = false 
}) => {
  // const { t } = useTranslation(); // Commented out to avoid unused variable  
  const [formData, setFormData] = useState<CreateUserRequest | UpdateUserRequest>({
    email: '',
    full_name: '',
    phone: '',
    role: 'candidate',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        full_name: user.full_name,
        phone: user.phone || '',
        role: user.role,
      });
    } else {
      setFormData({
        email: '',
        full_name: '',
        phone: '',
        role: 'candidate',
        password: '',
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className={designSystem.typography.h3}>
          {user ? 'Edit User' : 'Create New User'}
        </h3>
        
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email*
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={designSystem.forms.input}
              required
              disabled={!!user} // Disable email editing for existing users
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name*
            </label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => handleInputChange('full_name', e.target.value)}
              className={designSystem.forms.input}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={designSystem.forms.input}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role*
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className={designSystem.forms.select}
              required
            >
              <option value="candidate">Candidate</option>
              <option value="recruiter">Recruiter</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          {!user && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password*
              </label>
              <input
                type="password"
                value={(formData as CreateUserRequest).password || ''}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={designSystem.forms.input}
                required
                minLength={8}
              />
              <p className="mt-1 text-xs text-gray-500">
                Minimum 8 characters required
              </p>
            </div>
          )}
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={designSystem.buttons.secondary}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={designSystem.buttons.primary}
              disabled={isLoading}
            >
              {isLoading && (
                <div className={`${designSystem.loading.buttonLoading} mr-2`} />
              )}
              {user ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const UserManagement: React.FC = () => {
  // const { t } = useTranslation(); // Commented out to avoid unused variable
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<UserListFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // API states
  const createUserStatus = useApiStatus<AdminUser>();
  const updateUserStatus = useApiStatus<AdminUser>();
  const deleteUserStatus = useApiStatus<{ message: string }>();
  const bulkOperationStatus = useApiStatus<BulkOperationResult>();
  
  // Paginated user list
  const {
    items: users,
    total,
    page,
    hasNext,
    hasPrev,
    isLoading,
    error,
    loadPage,
    nextPage,
    prevPage,
  } = usePaginatedApiStatus<AdminUser>(1, 20);

  // Load users with current filters
  useEffect(() => {
    const currentFilters: UserListFilters = {
      ...filters,
      search: searchTerm || undefined,
    };

    loadPage((page, limit) => 
      adminService.getUsers(page, limit, currentFilters)
        .then(response => ({
          items: response.users,
          total: response.total,
          hasMore: response.has_next
        }))
    );
  }, [filters, searchTerm, refreshTrigger]);

  const handleCreateUser = async (userData: CreateUserRequest) => {
    try {
      await createUserStatus.execute(() => adminService.createUser(userData));
      setShowUserModal(false);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (userData: UpdateUserRequest) => {
    if (!editingUser) return;
    
    try {
      await updateUserStatus.execute(() => adminService.updateUser(editingUser.user_id, userData));
      setShowUserModal(false);
      setEditingUser(null);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await deleteUserStatus.execute(() => adminService.deleteUser(userId));
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleBulkOperation = async (operation: BulkUserOperation) => {
    if (selectedUsers.size === 0) return;
    
    const confirmMessage = operation.action === 'delete' 
      ? `Are you sure you want to delete ${selectedUsers.size} users?`
      : `Are you sure you want to ${operation.action} ${selectedUsers.size} users?`;
      
    if (!confirm(confirmMessage)) return;

    try {
      const operationData: BulkUserOperation = {
        ...operation,
        user_ids: Array.from(selectedUsers)
      };
      
      await bulkOperationStatus.execute(() => adminService.bulkUserOperation(operationData));
      setSelectedUsers(new Set());
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error performing bulk operation:', error);
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map(user => user.user_id)));
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'recruiter': return 'bg-blue-100 text-blue-800';
      case 'candidate': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={designSystem.typography.h1}>User Management</h1>
            <p className={designSystem.typography.body}>
              Manage users, roles, and permissions
            </p>
          </div>
          <button
            onClick={() => setShowUserModal(true)}
            className={designSystem.buttons.primary}
          >
            + Create User
          </button>
        </div>
      </div>

      {/* Error Messages */}
      {error && (
        <ErrorMessage 
          error="Failed to load users" 
          retryAction={() => setRefreshTrigger(prev => prev + 1)}
          className="mb-6"
        />
      )}

      {createUserStatus.error && (
        <ErrorMessage 
          error={createUserStatus.error}
          retryAction={() => setRefreshTrigger(prev => prev + 1)}
          className="mb-6"
        />
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={designSystem.forms.input}
            />
          </div>
          
          <div>
            <select
              value={filters.role || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, role: (e.target.value as any) || undefined }))}
              className={designSystem.forms.select}
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="recruiter">Recruiter</option>
              <option value="candidate">Candidate</option>
            </select>
          </div>
          
          <div>
            <select
              value={filters.status || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, status: (e.target.value as any) || undefined }))}
              className={designSystem.forms.select}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
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
      {selectedUsers.size > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800">
              {selectedUsers.size} users selected
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleBulkOperation({ action: 'activate', operation: 'activate', user_ids: [] })}
                className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                disabled={bulkOperationStatus.isLoading}
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkOperation({ action: 'deactivate', operation: 'deactivate', user_ids: [] })}
                className="text-sm px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                disabled={bulkOperationStatus.isLoading}
              >
                Deactivate
              </button>
              <button
                onClick={() => handleBulkOperation({ action: 'delete', operation: 'delete', user_ids: [] })}
                className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                disabled={bulkOperationStatus.isLoading}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className={designSystem.loading.spinnerLarge} />
          </div>
        ) : users.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedUsers.size === users.length && users.length > 0}
                        onChange={handleSelectAll}
                        className={designSystem.forms.checkbox}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.user_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.has(user.user_id)}
                          onChange={() => handleSelectUser(user.user_id)}
                          className={designSystem.forms.checkbox}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.full_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                          {user.phone && (
                            <div className="text-sm text-gray-400">
                              {user.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.last_login 
                          ? new Date(user.last_login).toLocaleDateString()
                          : 'Never'
                        }
                      </td>
                      <td className="px-6 py-4 text-sm font-medium space-x-2">
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setShowUserModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.user_id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          disabled={deleteUserStatus.isLoading}
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
                Showing {((page - 1) * 20) + 1} to {Math.min(page * 20, total)} of {total} users
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
              <span className="text-4xl">👥</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Users Found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || Object.keys(filters).length > 0
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first user'
              }
            </p>
            <button
              onClick={() => setShowUserModal(true)}
              className={designSystem.buttons.primary}
            >
              Create First User
            </button>
          </div>
        )}
      </div>

      {/* User Modal */}
      <UserModal
        isOpen={showUserModal}
        onClose={() => {
          setShowUserModal(false);
          setEditingUser(null);
        }}
        onSave={async (userData: CreateUserRequest | UpdateUserRequest) => {
          if (editingUser) {
            await handleUpdateUser(userData as UpdateUserRequest);
          } else {
            await handleCreateUser(userData as CreateUserRequest);
          }
        }}
        user={editingUser}
        isLoading={createUserStatus.isLoading || updateUserStatus.isLoading}
      />
    </div>
  );
};

export default UserManagement;
