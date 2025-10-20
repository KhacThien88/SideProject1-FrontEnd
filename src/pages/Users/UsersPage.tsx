import React, { useState } from 'react';
import { DashboardSidebar } from '../../components/layout/DashboardSidebar';
import { DashboardHeader } from '../../components/layout/DashboardHeader';
import { Layout } from '../../components/common/Layout';
import { Container } from '../../components/common/Container';
import { Button } from '../../components/ui/Button';
import { UserPlus } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useToast } from '../../contexts/ToastContext';
import { UserStats } from './components/UserStats';
import { UserFilters } from './components/UserFilters';
import { UserTable } from './components/UserTable';
import { UserModal } from './components/UserModal';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'candidate' | 'recruiter' | 'admin';
  isEmailVerified: boolean;
  createdAt: string;
  lastLogin?: string;
  status: 'active' | 'inactive' | 'suspended';
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    fullName: 'John Doe',
    role: 'candidate',
    isEmailVerified: true,
    createdAt: '2024-01-15',
    lastLogin: '2024-10-18',
    status: 'active'
  },
  {
    id: '2',
    email: 'jane.smith@company.com',
    fullName: 'Jane Smith',
    role: 'recruiter',
    isEmailVerified: true,
    createdAt: '2024-02-20',
    lastLogin: '2024-10-17',
    status: 'active'
  },
  {
    id: '3',
    email: 'admin@talentfit.com',
    fullName: 'Admin User',
    role: 'admin',
    isEmailVerified: true,
    createdAt: '2023-12-01',
    lastLogin: '2024-10-19',
    status: 'active'
  }
];

export const UsersPage: React.FC = () => {
  const { t } = useTranslation();
  const { showSuccessToast, showErrorToast } = useToast();
  const [users] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'candidate' | 'recruiter' | 'admin'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'candidate' as 'candidate' | 'recruiter' | 'admin',
    status: 'active' as 'active' | 'inactive' | 'suspended'
  });

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Action handlers
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      password: '',
      role: user.role,
      status: user.status
    });
    setIsModalOpen(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({
      fullName: '',
      email: '',
      password: '',
      role: 'candidate',
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const handleSaveUser = () => {
    if (!formData.fullName || !formData.email || (!editingUser && !formData.password)) {
      showErrorToast('Please fill all required fields');
      return;
    }

    if (editingUser) {
      showSuccessToast(`Updated ${formData.fullName}`, 'User information has been updated');
    } else {
      showSuccessToast(`Created ${formData.fullName}`, 'New user has been created');
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setShowPassword(false);
  };

  const handleDelete = (user: User) => {
    if (window.confirm(`Are you sure you want to delete ${user.fullName}?`)) {
      showSuccessToast(`Deleted ${user.fullName}`, 'User has been removed');
    }
  };

  const handleSuspend = (user: User) => {
    showSuccessToast(`Suspended ${user.fullName}`, 'User account has been suspended');
  };

  const handleActivate = (user: User) => {
    showSuccessToast(`Activated ${user.fullName}`, 'User account has been activated');
  };

  const handleResetPassword = (user: User) => {
    showSuccessToast(`Password reset sent`, `Reset link sent to ${user.email}`);
  };

  return (
    <Layout className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50">
      <div className="flex min-h-screen mb-10">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <DashboardHeader />

          {/* Users Content */}
          <main className="flex-1 overflow-auto">
            <div className="py-8">
              <Container maxWidth="2xl" className="space-y-6 sm:space-y-8">
                {/* Stats Cards */}
                <UserStats
                  totalUsers={users.length}
                  candidatesCount={users.filter((u) => u.role === 'candidate').length}
                  recruitersCount={users.filter((u) => u.role === 'recruiter').length}
                  adminsCount={users.filter((u) => u.role === 'admin').length}
                />

                {/* Filters */}
                <UserFilters
                  searchQuery={searchQuery}
                  filterRole={filterRole}
                  filterStatus={filterStatus}
                  onSearchChange={setSearchQuery}
                  onRoleChange={(value) => setFilterRole(value as any)}
                  onStatusChange={(value) => setFilterStatus(value as any)}
                />

                {/* Add User Button */}
                <div className="flex justify-end items-center">
                  <Button
                    variant="primary"
                    onClick={handleAddUser}
                    className="flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    {t.users.addUser}
                  </Button>
                </div>

                {/* Users Table */}
                <UserTable
                  users={filteredUsers}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onSuspend={handleSuspend}
                  onActivate={handleActivate}
                  onResetPassword={handleResetPassword}
                  onAddUser={handleAddUser}
                />
              </Container>
            </div>
          </main>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      <UserModal
        isOpen={isModalOpen}
        editingUser={editingUser}
        formData={formData}
        showPassword={showPassword}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        onFormChange={setFormData}
        onTogglePassword={() => setShowPassword(!showPassword)}
      />
    </Layout>
  );
};
