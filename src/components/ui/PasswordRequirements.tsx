import React from 'react';
import { Check, X } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface PasswordRequirement {
  label: string;
  isValid: boolean;
}

interface PasswordRequirementsProps {
  password: string;
  isVisible: boolean;
}

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ 
  password, 
  isVisible 
}) => {
  const { getContent } = useTranslation();

  // Password validation rules
  const requirements: PasswordRequirement[] = [
    {
      label: getContent('passwordRequirements.requirements.minLength'),
      isValid: password.length >= 8
    },
    {
      label: getContent('passwordRequirements.requirements.uppercase'),
      isValid: /[A-Z]/.test(password)
    },
    {
      label: getContent('passwordRequirements.requirements.lowercase'), 
      isValid: /[a-z]/.test(password)
    },
    {
      label: getContent('passwordRequirements.requirements.number'),
      isValid: /\d/.test(password)
    },
    {
      label: getContent('passwordRequirements.requirements.special'),
      isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
  ];

  // Calculate password strength
  const validCount = requirements.filter(req => req.isValid).length;
  const getStrengthKey = () => {
    if (validCount === requirements.length) return 'passwordRequirements.strengthLevels.strong';
    if (validCount >= 3) return 'passwordRequirements.strengthLevels.medium';
    return 'passwordRequirements.strengthLevels.weak';
  };
  const strength = getContent(getStrengthKey());
  
  const getStrengthColor = () => {
    if (validCount === requirements.length) return 'text-green-600';
    if (validCount >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStrengthBgColor = () => {
    if (validCount === requirements.length) return 'bg-green-50 border-green-200';
    if (validCount >= 3) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  if (!isVisible) return null;

  return (
    <div className="absolute left-0 top-0 z-50 w-70 -ml-72">
      <div className={`bg-white rounded-lg shadow-lg border-2 p-2 ${getStrengthBgColor()}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-gray-800">
            {getContent('passwordRequirements.title')}
          </div>
          <div className={`text-xs font-medium ${getStrengthColor()}`}>
            {strength}
          </div>
        </div>

        {/* Requirements List */}
        <div className="space-y-2">
          {requirements.map((requirement, index) => (
            <div 
              key={index}
              className="flex items-center space-x-2 text-xs"
            >
              <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                requirement.isValid 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {requirement.isValid ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <X className="w-3 h-3" />
                )}
              </div>
              <span className={requirement.isValid ? 'text-green-700' : 'text-gray-600'}>
                {requirement.label}
              </span>
            </div>
          ))}
        </div>

        {/* Strength Bar */}
        <div className="mt-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-600">{getContent('passwordRequirements.strength')}</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  validCount === requirements.length ? 'bg-green-500' :
                  validCount >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${(validCount / requirements.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRequirements;
