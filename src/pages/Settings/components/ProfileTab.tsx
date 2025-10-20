import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { UserProfile } from '../../../types/settings';
import { useTranslation } from '../../../hooks/useTranslation';
import { createFocusEffect } from '../../../utils/focusEffects';

interface ProfileTabProps {
  profile: UserProfile;
  onUpdate: (profile: Partial<UserProfile>) => Promise<void>;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ profile, onUpdate }) => {
  const { getContent } = useTranslation();
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
    <div className="space-y-6 mb-4">
      {/* Profile Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {getContent('settings.profile.fullName')}
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className={`w-full px-4 py-2.5 border border-neutral-300 rounded-xl transition-all ${createFocusEffect.input('md', 'primary')}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {getContent('settings.profile.email')}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full px-4 py-2.5 border border-neutral-300 rounded-xl transition-all ${createFocusEffect.input('md', 'primary')}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {getContent('settings.profile.company')}
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            className={`w-full px-4 py-2.5 border border-neutral-300 rounded-xl transition-all ${createFocusEffect.input('md', 'primary')}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {getContent('settings.profile.role')}
          </label>
          <div className={`w-full px-4 py-2.5 border border-neutral-300 rounded-xl transition-all ${createFocusEffect.input('md', 'primary')}`}>
            {formData.role}
          </div>
        </div>

      </div>

      {/* Change Password Section */}
      <div className="pt-4 border-t border-neutral-200">
        <button
          onClick={() => setShowPasswordChange(!showPasswordChange)}
          className={`text-primary-600 hover:text-primary-700 font-medium text-sm ${createFocusEffect.input('sm', 'primary')}`}
        >
          {showPasswordChange ? getContent('settings.profile.cancelPasswordChange') : getContent('settings.profile.changePassword')}
        </button>

        {showPasswordChange && (
          <div className="mt-4 space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {getContent('settings.profile.currentPassword')}
              </label>
              <input
                type={showPassword.current ? 'text' : 'password'}
                value={passwords.current}
                onChange={(e) => handlePasswordChange('current', e.target.value)}
                className={`w-full px-4 py-2.5 pr-12 border border-neutral-300 rounded-xl transition-all ${createFocusEffect.input('md', 'primary')}`}
                placeholder={getContent('settings.profile.currentPassword')}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className={`absolute right-4 top-10 text-neutral-500 hover:text-neutral-700 ${createFocusEffect.input('sm', 'primary')}`}
              >
                {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {getContent('settings.profile.newPassword')}
              </label>
              <input
                type={showPassword.new ? 'text' : 'password'}
                value={passwords.new}
                onChange={(e) => handlePasswordChange('new', e.target.value)}
                className={`w-full px-4 py-2.5 pr-12 border border-neutral-300 rounded-xl transition-all ${createFocusEffect.input('md', 'primary')}`}
                placeholder={getContent('settings.profile.newPassword')}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className={`absolute right-4 top-10 text-neutral-500 hover:text-neutral-700 ${createFocusEffect.input('sm', 'primary')}`}
              >
                {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {getContent('settings.profile.confirmPassword')}
              </label>
              <input
                type={showPassword.confirm ? 'text' : 'password'}
                value={passwords.confirm}
                onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                className={`w-full px-4 py-2.5 pr-12 border border-neutral-300 rounded-xl transition-all ${createFocusEffect.input('md', 'primary')}`}
                placeholder={getContent('settings.profile.confirmPassword')}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className={`absolute right-4 top-10 text-neutral-500 hover:text-neutral-700 ${createFocusEffect.input('sm', 'primary')}`}
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
