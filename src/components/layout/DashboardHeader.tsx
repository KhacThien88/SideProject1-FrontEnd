import React from 'react';
import { useRouter } from '../../components/Router';
import { Button } from '../../components/ui/Button';
import { useTranslation } from '../../hooks/useTranslation';
import { useHeaderVisibility } from '../../hooks/useHeaderVisibility';
import { useAuth } from '../../contexts/auth/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import {
  Bell,
  Search,
  User,
  LogOut,
} from 'lucide-react';

export const DashboardHeader: React.FC = () => {
  const { navigate } = useRouter();
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { showSuccessToast } = useToast();
  const { isVisible } = useHeaderVisibility({
    threshold: 80,
    hideDelay: 200,
    showOnHoverZone: 80
  });

  const handleUserClick = () => {
    navigate('/dashboard/settings');
  };
  // Get current path to determine active page
  const currentPath = window.location.pathname;

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return t.dashboard.header.user.name;
    return user.full_name || user.email.split('@')[0];
  };

  // Get user role display
  const getUserRoleDisplay = () => {
    if (!user) return t.dashboard.header.user.role;
    // Sử dụng i18n key từ users.roles
    const roleKey = user.role as 'admin' | 'recruiter' | 'candidate';
    return t.users.roles[roleKey] || user.role;
  };

  // Handle logout - Fast and responsive with toast notification
  const handleLogout = () => {
    // Show success toast
    showSuccessToast(t.auth.logoutSuccess);
    // Logout and redirect immediately - no waiting
    logout();
    navigate('/login');
  };

  // Get current page header content based on path
  const getCurrentPageHeader = () => {
    if (currentPath === '/dashboard') return t.pages.dashboard.header;
    if (currentPath === '/cv-analysis') return t.pages.cvAnalysis.header;
    if (currentPath === '/dashboard/candidates') return t.pages.candidates.header;
  if (currentPath === '/dashboard/saved-jobs') return t.pages.savedJobs.header;
    if (currentPath === '/dashboard/job-postings') return t.pages.jobPostings.header;
    if (currentPath === '/dashboard/analytics') return t.pages.analytics.header;
    if (currentPath === '/dashboard/settings') return t.pages.settings.header;
    return t.pages.dashboard.header; // default
  };

  const currentHeader = getCurrentPageHeader();

  return (
    <>
      {/* Hover zone at top of screen when header is hidden */}
      {!isVisible && (
        <div
          className="fixed top-0 left-0 w-full h-20 z-50 pointer-events-auto"
          style={{ background: 'transparent' }}
        />
      )}

      <header className={`bg-gradient-to-tr from-primary-100 via-white to-secondary-50 backdrop-blur-xl border-b border-neutral-200/60 shadow-soft sticky top-0 z-40 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
        <div className="px-4 sm:px-6 py-1">
          <div className="flex items-center justify-between gap-2">
            {/* Left side - Page Title */}
            <div className="flex items-center space-x-4 min-w-0">
              <div className="flex flex-col min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold truncate">
                  <span className="text-brand-gradient-primary bg-clip-text text-transparent">{currentHeader.title}</span>
                  <span className="text-neutral-800 ml-1">{currentHeader.subtitle}</span>
                </h3>
                <div className="text-md text-neutral-500 font-medium hidden sm:block truncate">
                  {currentHeader.description}
                </div>
              </div>
            </div>

            {/* Right side - Enhanced Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">

              {/* Mobile Search Button */}
              <button className="md:hidden p-2.5 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300">
                <Search className="w-5 h-5" />
              </button>

              {/* Enhanced Notifications */}
              <button className="relative p-2.5 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-accent-500 to-secondary-500 text-white text-xs rounded-full flex items-center justify-center font-semibold shadow-lg">3</span>
              </button>

              {/* Enhanced User Menu - Responsive */}
              <div 
                onClick={handleUserClick}
                className="flex items-center space-x-2 sm:space-x-3 bg-neutral-50/50 backdrop-blur-sm rounded-xl p-1.5 sm:p-2 hover:bg-neutral-100/50 transition-all duration-300 group cursor-pointer">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-gradient-primary rounded-lg flex items-center justify-center shadow-brand-sm group-hover:shadow-brand-md transition-all duration-300">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="hidden lg:block min-w-0">
                  <div className="text-sm font-semibold text-neutral-900 truncate">{getUserDisplayName()}</div>
                  <div className="text-xs text-neutral-500 font-medium truncate">{getUserRoleDisplay()}</div>
                </div>
              </div>

              {/* Action Buttons - Responsive */}
              <div className="flex items-center">
                <Button
                  variant="tertiary"
                  size="sm"
                  className="focus-ring text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 hidden sm:flex"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden lg:inline">{t.dashboard.header.actions.logout}</span>
                </Button>

                {/* Mobile Logout */}
                <button
                  className="sm:hidden p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};