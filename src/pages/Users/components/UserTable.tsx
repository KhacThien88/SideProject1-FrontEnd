import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import {
  Mail,
  Shield,
  User,
  Briefcase,
  UserPlus,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  Key,
  MoreVertical,
} from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

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

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onSuspend: (user: User) => void;
  onActivate: (user: User) => void;
  onResetPassword: (user: User) => void;
  onAddUser?: () => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  onSuspend,
  onActivate,
  onResetPassword,
  onAddUser,
}) => {
  const { t } = useTranslation();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return Shield;
      case 'recruiter':
        return Briefcase;
      case 'candidate':
        return User;
      default:
        return User;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'recruiter':
        return 'bg-purple-100 text-purple-700';
      case 'candidate':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getRoleIconBgColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-600';
      case 'recruiter':
        return 'bg-purple-100 text-purple-600';
      case 'candidate':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-neutral-100 text-neutral-600';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-neutral-100 text-neutral-700';
      case 'suspended':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} giây trước`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} ngày trước`;
    }

    // Nếu quá 7 ngày, hiển thị ngày tháng
    return formatDate(dateString);
  };

  if (users.length === 0) {
    return (
      <Card className="p-12">
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {/* Text Content */}
          <div>
            <div className="text-xl font-semibold text-neutral-900 mb-2">
              {t.users.empty.title}
            </div>
            <p className="text-neutral-600 mb-2">
              {t.users.empty.description}
            </p>
            <p className="text-sm text-neutral-500">
              Try adjusting your search filters or add new users to get started
            </p>
          </div>

          {/* Action Button */}
          {onAddUser && (
            <div>
              <button
                onClick={onAddUser}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Add New User
              </button>
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
      <Card>
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-4 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider w-[24%]">
                  {t.users.table.user}
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider w-[15%]">
                  {t.users.table.role}
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider w-[13%]">
                  {t.users.table.status}
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider w-[15%]">
                  {t.users.table.joined}
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider w-[18%]">
                  {t.users.table.lastLogin}
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider w-[15%]">
                  {t.users.table.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {users.map((user) => {
                const RoleIcon = getRoleIcon(user.role);
                const roleIconBg = getRoleIconBgColor(user.role);
                return (
                  <tr key={user.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${roleIconBg}`}>
                          <RoleIcon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-neutral-900 truncate">
                            {user.fullName}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-neutral-500">
                            <Mail className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge className={`text-xs ${getRoleBadgeColor(user.role)}`}>
                        {t.users.roles[user.role]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge className={`text-xs ${getStatusBadgeColor(user.status)}`}>
                        {t.users.status[user.status]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-neutral-600">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-neutral-600">
                      {user.lastLogin ? getRelativeTime(user.lastLogin) : t.users.table.never}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="tertiary"
                          onClick={() => onEdit(user)}
                          className="p-1.5"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Button>

                        {user.status === 'suspended' ? (
                          <Button
                            variant="tertiary"
                            onClick={() => onActivate(user)}
                            className="p-1.5 text-green-600 hover:bg-green-50"
                            title="Activate"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </Button>
                        ) : (
                          <Button
                            variant="tertiary"
                            onClick={() => onSuspend(user)}
                            className="p-1.5 text-orange-600 hover:bg-orange-50"
                            title="Suspend"
                          >
                            <Ban className="w-3.5 h-3.5" />
                          </Button>
                        )}

                        <div className="relative">
                          <Button
                            variant="tertiary"
                            onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                            className="p-1.5"
                            title="More"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </Button>

                          {openMenuId === user.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setOpenMenuId(null)}
                              />
                              <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-20">
                                <button
                                  onClick={() => {
                                    onResetPassword(user);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                                >
                                  <Key className="w-4 h-4" />
                                  Reset Password
                                </button>
                                <button
                                  onClick={() => {
                                    onDelete(user);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete User
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden divide-y divide-neutral-200">
          {users.map((user) => {
            const RoleIcon = getRoleIcon(user.role);
            const roleIconBg = getRoleIconBgColor(user.role);
            return (
              <div key={user.id} className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${roleIconBg}`}>
                    <RoleIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-neutral-900">{user.fullName}</h3>
                    <div className="flex items-center gap-1 text-sm text-neutral-500 mt-1">
                      <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className={`text-xs ${getRoleBadgeColor(user.role)}`}>
                    {t.users.roles[user.role]}
                  </Badge>
                  <Badge className={`text-xs ${getStatusBadgeColor(user.status)}`}>
                    {t.users.status[user.status]}
                  </Badge>
                </div>

                <div className="text-xs text-neutral-600 space-y-1 mb-3">
                  <div>
                    {t.users.table.joined}: {formatDate(user.createdAt)}
                  </div>
                  <div>
                    {t.users.table.lastLogin}:{' '}
                    {user.lastLogin ? getRelativeTime(user.lastLogin) : t.users.table.never}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => onEdit(user)} className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  {user.status === 'suspended' ? (
                    <Button
                      variant="secondary"
                      onClick={() => onActivate(user)}
                      className="flex-1 text-green-600"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Activate
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      onClick={() => onSuspend(user)}
                      className="flex-1 text-orange-600"
                    >
                      <Ban className="w-4 h-4 mr-2" />
                      Suspend
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
