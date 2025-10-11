import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { UserProfile } from '../../../types/settings';

interface ProfileTabProps {
  profile: UserProfile;
  onUpdate: (profile: Partial<UserProfile>) => Promise<void>;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ profile, onUpdate }) => {
  const [formData, setFormData] = useState(profile);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: keyof typeof passwords, value: string) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Company
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value)}
            className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          >
            <option value="HR Manager">HR Manager</option>
            <option value="Recruiter">Recruiter</option>
            <option value="Talent Acquisition">Talent Acquisition</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="pt-6 border-t border-neutral-200">
        <button
          onClick={() => setShowPasswordChange(!showPasswordChange)}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          {showPasswordChange ? 'Cancel Password Change' : 'Change Password'}
        </button>

        {showPasswordChange && (
          <div className="mt-4 space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Current Password
              </label>
              <input
                type={showPassword.current ? 'text' : 'password'}
                value={passwords.current}
                onChange={(e) => handlePasswordChange('current', e.target.value)}
                className="w-full px-4 py-2.5 pr-12 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-4 top-10 text-neutral-500 hover:text-neutral-700"
              >
                {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                New Password
              </label>
              <input
                type={showPassword.new ? 'text' : 'password'}
                value={passwords.new}
                onChange={(e) => handlePasswordChange('new', e.target.value)}
                className="w-full px-4 py-2.5 pr-12 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-4 top-10 text-neutral-500 hover:text-neutral-700"
              >
                {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Confirm New Password
              </label>
              <input
                type={showPassword.confirm ? 'text' : 'password'}
                value={passwords.confirm}
                onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                className="w-full px-4 py-2.5 pr-12 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-4 top-10 text-neutral-500 hover:text-neutral-700"
              >
                {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
