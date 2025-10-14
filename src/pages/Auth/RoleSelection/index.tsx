import React, { useState } from 'react';
import { useRouter } from '../../../components/Router';
import { useAuth } from '../../../contexts/auth/AuthContext';
import { useTranslation } from '../../../hooks/useTranslation';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { toast } from 'react-toastify';

// User role options
type UserRole = 'candidate' | 'recruiter';

interface RoleSelectionState {
  email?: string;
  name?: string;
  googleId?: string;
  avatar?: string;
  googleToken?: string;
}

export const RoleSelectionPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { navigate } = useRouter();
  const { completeGoogleRegistration } = useAuth();
  const { getContent } = useTranslation();

  // Get user data from sessionStorage (since we use custom Router)
  const userState: RoleSelectionState | null = React.useMemo(() => {
    try {
      const json = sessionStorage.getItem('roleSelectionState');
      return json ? JSON.parse(json) : null;
    } catch {
      return null;
    }
  }, []);

  // Redirect if no user data
  React.useEffect(() => {
    if (!userState?.email || !userState?.googleToken) {
      navigate('/login');
    }
  }, [userState, navigate]);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleSubmit = async () => {
    if (!selectedRole || !userState) {
      toast.error(getContent('auth.roleSelection.pleaseSelectRole'));
      return;
    }

    setIsSubmitting(true);

    try {
      // Complete Google registration with selected role
      await completeGoogleRegistration({
        email: userState.email!,
        name: userState.name!,
        googleId: userState.googleId!,
        avatar: userState.avatar,
        googleToken: userState.googleToken!,
        role: selectedRole,
      });

      toast.success(getContent('auth.roleSelection.registrationSuccess'));
      
      // Redirect based on role
      const redirectPath = selectedRole === 'candidate' ? '/dashboard' : '/dashboard';
      // Clear persisted state and navigate
      sessionStorage.removeItem('roleSelectionState');
      navigate(redirectPath);
      
    } catch (error: any) {
      console.error('Role selection error:', error);
      toast.error(error.message || getContent('auth.roleSelection.registrationFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    sessionStorage.removeItem('roleSelectionState');
    navigate('/login');
  };

  if (!userState?.email || !userState?.googleToken) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-white to-secondary-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/25 to-secondary-200/25 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary-200/25 to-primary-200/25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-100/15 to-secondary-100/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-secondary-600/10 to-primary-600/10">
        <div className="w-full max-w-lg">
          {/* Header with enhanced styling */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
              {getContent('auth.roleSelection.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
              {getContent('auth.roleSelection.subtitle')}
            </p>
            
            {/* Compact user header: avatar + name + email (no card container) */}
            <div className="mt-8 flex items-center justify-center space-x-4">
              <div className="relative">
                {userState.avatar ? (
                  <img
                    src={userState.avatar}
                    alt={userState.name}
                    className="w-12 h-12 rounded-full shadow-md ring-2 ring-white object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                      const fallback = document.getElementById('avatar-fallback');
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div id="avatar-fallback" className={`w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center ring-2 ring-white shadow-md ${userState.avatar ? 'hidden' : ''}`}>
                  <span className="text-white font-semibold">
                    {userState.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white"></div>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">{userState.name}</p>
                <p className="text-sm text-gray-500">{userState.email}</p>
              </div>
            </div>
          </div>

          {/* Role Selection Cards */}
          <div className="space-y-6 mb-10">
            {/* Candidate Role */}
            <div
              onClick={() => handleRoleSelect('candidate')}
              className={`
                group relative p-8 rounded-3xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1
                ${selectedRole === 'candidate'
                  ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-primary-100/50 shadow-2xl shadow-primary-200/50'
                  : 'border-gray-200/60 bg-white/80 backdrop-blur-sm hover:border-primary-300/60 hover:shadow-xl hover:shadow-primary-100/30'
                }
              `}
            >
              <div className="flex items-start space-x-6">
                <div className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg
                  ${selectedRole === 'candidate' 
                    ? 'bg-gradient-to-br from-primary-500 to-primary-600 shadow-primary-200' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-primary-100 group-hover:to-primary-200'
                  }
                `}>
                  <svg
                    className={`w-8 h-8 transition-colors duration-300 ${
                      selectedRole === 'candidate' ? 'text-white' : 'text-gray-600 group-hover:text-primary-600'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                    selectedRole === 'candidate' ? 'text-primary-700' : 'text-gray-900 group-hover:text-primary-700'
                  }`}>
                    {getContent('auth.roleSelection.candidate.title')}
                  </h3>
                  <p className={`text-sm mb-4 transition-colors duration-300 ${
                    selectedRole === 'candidate' ? 'text-primary-600' : 'text-gray-600 group-hover:text-primary-600'
                  }`}>
                    {getContent('auth.roleSelection.candidate.description')}
                  </p>
                  <ul className="space-y-2">
                    {[
                      getContent('auth.roleSelection.candidate.features.uploadCV'),
                      getContent('auth.roleSelection.candidate.features.jobMatching'),
                      getContent('auth.roleSelection.candidate.features.applyJobs')
                    ].map((feature, index) => (
                      <li key={index} className={`flex items-center text-sm transition-colors duration-300 ${
                        selectedRole === 'candidate' ? 'text-primary-600' : 'text-gray-500 group-hover:text-primary-500'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-3 transition-colors duration-300 ${
                          selectedRole === 'candidate' ? 'bg-primary-500' : 'bg-gray-400 group-hover:bg-primary-400'
                        }`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Selection indicator */}
              {selectedRole === 'candidate' && (
                <div className="absolute top-6 right-6 animate-pulse">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Recruiter Role */}
            <div
              onClick={() => handleRoleSelect('recruiter')}
              className={`
                group relative p-8 rounded-3xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1
                ${selectedRole === 'recruiter'
                  ? 'border-secondary-500 bg-gradient-to-br from-secondary-50 to-secondary-100/50 shadow-2xl shadow-secondary-200/50'
                  : 'border-gray-200/60 bg-white/80 backdrop-blur-sm hover:border-secondary-300/60 hover:shadow-xl hover:shadow-secondary-100/30'
                }
              `}
            >
              <div className="flex items-start space-x-6">
                <div className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg
                  ${selectedRole === 'recruiter' 
                    ? 'bg-gradient-to-br from-secondary-500 to-secondary-600 shadow-secondary-200' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-secondary-100 group-hover:to-secondary-200'
                  }
                `}>
                  <svg
                    className={`w-8 h-8 transition-colors duration-300 ${
                      selectedRole === 'recruiter' ? 'text-white' : 'text-gray-600 group-hover:text-secondary-600'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                    selectedRole === 'recruiter' ? 'text-secondary-700' : 'text-gray-900 group-hover:text-secondary-700'
                  }`}>
                    {getContent('auth.roleSelection.recruiter.title')}
                  </h3>
                  <p className={`text-sm mb-4 transition-colors duration-300 ${
                    selectedRole === 'recruiter' ? 'text-secondary-600' : 'text-gray-600 group-hover:text-secondary-600'
                  }`}>
                    {getContent('auth.roleSelection.recruiter.description')}
                  </p>
                  <ul className="space-y-2">
                    {[
                      getContent('auth.roleSelection.recruiter.features.postJobs'),
                      getContent('auth.roleSelection.recruiter.features.searchCandidates'),
                      getContent('auth.roleSelection.recruiter.features.manageApplications')
                    ].map((feature, index) => (
                      <li key={index} className={`flex items-center text-sm transition-colors duration-300 ${
                        selectedRole === 'recruiter' ? 'text-secondary-600' : 'text-gray-500 group-hover:text-secondary-500'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-3 transition-colors duration-300 ${
                          selectedRole === 'recruiter' ? 'bg-secondary-500' : 'bg-gray-400 group-hover:bg-secondary-400'
                        }`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Selection indicator */}
              {selectedRole === 'recruiter' && (
                <div className="absolute top-6 right-6 animate-pulse">
                  <div className="w-8 h-8 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-6">
            <button
              onClick={handleSubmit}
              disabled={!selectedRole || isSubmitting}
              className={`
                w-full py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 transform
                ${!selectedRole || isSubmitting
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                }
              `}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-3">
                  <LoadingSpinner size="sm" variant="neutral" />
                  <span>{getContent('auth.roleSelection.completing')}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>{getContent('auth.roleSelection.continueButton')}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </button>

            <button
              onClick={handleBackToLogin}
              disabled={isSubmitting}
              className="w-full text-center text-gray-500 hover:text-gray-700 transition-colors duration-200 py-3 font-medium"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>{getContent('auth.roleSelection.backToLogin')}</span>
              </div>
            </button>
          </div>

          {/* Help text removed as requested */}
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
