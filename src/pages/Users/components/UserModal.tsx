import React from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useTranslation } from '../../../hooks/useTranslation';
import { createFocusEffect } from '../../../utils/focusEffects';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'candidate' | 'recruiter' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
}

interface FormData {
  fullName: string;
  email: string;
  password: string;
  role: 'candidate' | 'recruiter' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
}

interface UserModalProps {
  isOpen: boolean;
  editingUser: User | null;
  formData: FormData;
  showPassword: boolean;
  onClose: () => void;
  onSave: () => void;
  onFormChange: (data: FormData) => void;
  onTogglePassword: () => void;
}

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  editingUser,
  formData,
  showPassword,
  onClose,
  onSave,
  onFormChange,
  onTogglePassword,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl animate-fade-in">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="text-xl font-semibold text-neutral-900">
            {editingUser ? t.users.editUser : t.users.addUser}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              {t.users.table.user} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => onFormChange({ ...formData, fullName: e.target.value })}
              className={`w-full px-3 py-2 border border-neutral-300 rounded-lg transition-all duration-200 ${createFocusEffect.input('md', 'primary')}`}
              placeholder="Enter full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onFormChange({ ...formData, email: e.target.value })}
              className={`w-full px-3 py-2 border border-neutral-300 rounded-lg transition-all duration-200 ${createFocusEffect.email()}`}
              placeholder="Enter email address"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Password {!editingUser && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => onFormChange({ ...formData, password: e.target.value })}
                className={`w-full px-3 py-2 pr-10 border border-neutral-300 rounded-lg transition-all duration-200 ${createFocusEffect.password()}`}
                placeholder={editingUser ? 'Leave blank to keep current' : 'Enter password'}
              />
              <button
                type="button"
                onClick={onTogglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              {t.users.table.role} <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                onFormChange({
                  ...formData,
                  role: e.target.value as 'candidate' | 'recruiter' | 'admin',
                })
              }
              className={`w-full px-3 py-2 border border-neutral-300 rounded-lg bg-white transition-all duration-200 ${createFocusEffect.input('md', 'primary')}`}
            >
              <option value="candidate">{t.users.stats.candidates}</option>
              <option value="recruiter">{t.users.stats.recruiters}</option>
              <option value="admin">{t.users.stats.admins}</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              {t.users.table.status} <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                onFormChange({
                  ...formData,
                  status: e.target.value as 'active' | 'inactive' | 'suspended',
                })
              }
              className={`w-full px-3 py-2 border border-neutral-300 rounded-lg bg-white transition-all duration-200 ${createFocusEffect.input('md', 'primary')}`}
            >
              <option value="active">{t.users.status.active}</option>
              <option value="inactive">{t.users.status.inactive}</option>
              <option value="suspended">{t.users.status.suspended}</option>
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex gap-3 p-6 border-t border-neutral-200">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" onClick={onSave} className="flex-1">
            {editingUser ? 'Update' : 'Create'}
          </Button>
        </div>
      </div>
    </div>
  );
};
