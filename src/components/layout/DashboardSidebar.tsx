import React, { useState, useMemo } from 'react';
import { useRouter } from '../Router';
import { Button } from '../ui/Button';
import { 
  LayoutDashboard, 
  FileSearch, 
  Users, 
  Briefcase, 
  Bookmark,
  BarChart3, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Shield,
  FileText,
  Upload,
  MessageCircle,
  Activity
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../contexts/auth/AuthContext';

interface SidebarItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  isActive?: boolean;
  badge?: string;
  color?: string;
  roles: Array<'candidate' | 'recruiter' | 'admin'>; // Roles có quyền truy cập
}

export const DashboardSidebar: React.FC = () => {
  const { navigate } = useRouter();
  const { t, language } = useTranslation();
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(() => {
  const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true';
  });

  // Get current path to determine active item
  const currentPath = window.location.pathname;

  // Get current page subscription based on path
  const getCurrentPageSubscription = () => {
    if (currentPath === '/dashboard') return t.pages.dashboard.subscription;
    if (currentPath === '/cv-analysis') return t.pages.cvAnalysis.subscription;
    if (currentPath === '/dashboard/candidates') return t.pages.candidates.subscription;
    if (currentPath === '/dashboard/saved-jobs') return t.pages.savedJobs.subscription;
    if (currentPath === '/dashboard/job-postings') return t.pages.jobPostings.subscription;
    if (currentPath === '/dashboard/analytics') return t.pages.analytics.subscription;
    if (currentPath === '/dashboard/settings') return t.pages.settings.subscription;
    
    // Admin routes
    if (currentPath === '/admin/dashboard') return 'System Administration';
    if (currentPath === '/admin/users') return 'User Management';
    if (currentPath === '/admin/cvs') return 'CV Management';
    if (currentPath === '/admin/audit-logs') return 'Audit & Security';
    
    // API Integration routes
    if (currentPath === '/jd-upload') return 'Job Description Upload';
    if (currentPath === '/text-extraction') return 'Document Processing';
    if (currentPath === '/feedback') return 'User Feedback';
    
    return t.pages.dashboard.subscription; // default
  };

  // Define all sidebar items with role-based access
  const allSidebarItems: SidebarItem[] = [
    // ============ CANDIDATE NAVIGATION ============
    {
      key: 'dashboard',
      label: t.dashboard.sidebar.navigation.dashboard,
      icon: LayoutDashboard,
      href: '/dashboard',
      isActive: currentPath === '/dashboard',
      color: 'primary',
      roles: ['admin', 'candidate', 'recruiter'] // Tất cả roles
    },
    {
      key: 'cv-analysis',
      label: t.dashboard.sidebar.navigation.cvAnalysis,
      icon: FileSearch,
      href: '/cv-analysis',
      isActive: currentPath === '/cv-analysis',
      color: 'secondary',
      roles: ['candidate'] // Candidate: Phân tích CV
    },
    {
      key: 'saved-jobs',
      label: t.dashboard.sidebar.navigation.savedJobs,
      icon: Bookmark,
      href: '/dashboard/saved-jobs',
      isActive: currentPath === '/dashboard/saved-jobs',
      color: 'accent',
      roles: ['candidate'] // Candidate: Các job đã save
    },
    // ============ RECRUITER (HR) NAVIGATION ============
    {
      key: 'job-postings',
      label: t.dashboard.sidebar.navigation.jobPostings,
      icon: Briefcase,
      href: '/dashboard/job-postings',
      isActive: currentPath === '/dashboard/job-postings',
      color: 'secondary',
      roles: ['recruiter'] // HR: Đăng tin tuyển dụng
    },
    {
      key: 'candidates',
      label: t.dashboard.sidebar.navigation.candidates,
      icon: Users,
      href: '/dashboard/candidates',
      isActive: currentPath === '/dashboard/candidates',
      badge: '12',
      color: 'accent',
      roles: ['recruiter'] // HR: Ứng viên đã save
    },

    // ============ ADMIN NAVIGATION ============
    {
      key: 'admin-dashboard',
      label: 'Admin Dashboard',
      icon: Shield,
      href: '/admin/dashboard',
      isActive: currentPath === '/admin/dashboard',
      color: 'danger',
      roles: ['admin'] // Admin: Dashboard quản trị
    },
    {
      key: 'admin-users',
      label: 'User Management',
      icon: Users,
      href: '/admin/users',
      isActive: currentPath === '/admin/users',
      color: 'danger',
      roles: ['admin'] // Admin: Quản lý users
    },
    {
      key: 'admin-cvs',
      label: 'CV Management',
      icon: FileText,
      href: '/admin/cvs',
      isActive: currentPath === '/admin/cvs',
      color: 'danger',
      roles: ['admin'] // Admin: Quản lý CVs
    },
    {
      key: 'admin-audit',
      label: 'Audit Logs',
      icon: Activity,
      href: '/admin/audit-logs',
      isActive: currentPath === '/admin/audit-logs',
      color: 'danger',
      roles: ['admin'] // Admin: Audit logs
    },
    {
      key: 'users',
      label: t.dashboard.sidebar.navigation.users,
      icon: Users,
      href: '/dashboard/users',
      isActive: currentPath === '/dashboard/users',
      color: 'accent',
      roles: ['admin'] // Admin: Quản lý user theo role (legacy)
    },

    // ============ SHARED NAVIGATION (ALL ROLES) ============
    {
      key: 'analytics',
      label: t.dashboard.sidebar.navigation.analytics,
      icon: BarChart3,
      href: '/dashboard/analytics',
      isActive: currentPath === '/dashboard/analytics',
      color: 'primary',
      roles: ['candidate', 'recruiter', 'admin'] // Tất cả roles
    },
    {
      key: 'settings',
      label: t.dashboard.sidebar.navigation.settings,
      icon: Settings,
      href: '/dashboard/settings',
      isActive: currentPath === '/dashboard/settings',
      color: 'neutral',
      roles: ['candidate', 'recruiter', 'admin'] // Tất cả roles
    }
  ];

  // Filter sidebar items based on user role
  const sidebarItems = useMemo(() => {
    if (!user) return [];
    return allSidebarItems.filter(item => item.roles.includes(user.role));
  }, [user?.role, currentPath, language]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNavigation = (href: string) => {
    navigate(href);
    // Don't auto-expand when collapsed - keep sidebar state as is
  };

  const toggleSidebar = () => {
    setIsCollapsed(prev => {
      localStorage.setItem('sidebarCollapsed', String(!prev));
      return !prev;
    });
  };

  return (
    <>
      {/* Sidebar Spacer - giữ chỗ để main content không bị shift */}
      <div className={cn(
        'transition-all duration-500 ease-out flex-shrink-0',
        isCollapsed ? 'w-16' : 'w-60'
      )} />

      {/* Main Sidebar - luôn fixed để tránh layout shift */}
      <div 
        className={cn(
          'fixed left-0 top-0 bg-gradient-to-b from-primary-50 via-white/95 to-secondary-50 backdrop-blur-xl border-r border-neutral-200/60 shadow-soft flex flex-col min-h-screen transition-all duration-500 ease-out',
          isCollapsed ? 'w-16' : 'w-60',
          'z-[40]'
        )}
      >
        {/* Enhanced Header */}
        <div className={cn(
          'border-b border-neutral-200/60',
          isCollapsed ? 'p-3' : 'p-2'
        )}>
          <div className="flex items-center justify-between">
            {!isCollapsed ? (
              <>
                <div className="flex items-center space-x-3 group min-w-0">
                  <div className="w-12 h-12 bg-brand-gradient-primary rounded-2xl flex items-center justify-center shadow-brand-md group-hover:shadow-brand-lg transition-all duration-300 hover-scale flex-shrink-0">
                    <span className="text-white font-bold text-xl">T</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xl font-bold truncate">
                      <span className="text-brand-gradient-primary bg-clip-text text-transparent">TalentFit</span>
                      <span className="text-neutral-800 ml-1">AI</span>
                    </span>
                    <span className="text-sm text-neutral-500 font-medium truncate">{getCurrentPageSubscription()}</span>
                  </div>
                </div>
                
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={toggleSidebar}
                  className="focus-ring p-2 flex-shrink-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <div className="flex justify-center w-full">
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={toggleSidebar}
                  className="focus-ring p-2"
                  title={t.dashboard.sidebar.expand}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

      {/* Enhanced Navigation */}
      <nav className={cn(
        'flex-1 space-y-2 overflow-y-auto',
        isCollapsed ? 'p-1' : 'p-2'
      )}>
        <div className="space-y-1">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  'w-full flex items-center text-left transition-all duration-300 group relative overflow-hidden',
                  'focus-ring',
                  isCollapsed
                    ? 'justify-center px-2 py-3 rounded-xl'
                    : 'space-x-4 px-2 py-3 rounded-2xl',
                  item.isActive 
                    ? 'bg-brand-gradient-primary text-white shadow-brand-md' 
                    : 'text-neutral-600 hover:bg-primary-50/60 hover:text-primary-700'
                )}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
                title={isCollapsed ? item.label : undefined}
              >
                {/* Background gradient for active item */}
                {item.isActive && (
                  <div className="absolute inset-0 bg-brand-gradient-primary rounded-xl sm:rounded-2xl"></div>
                )}
                
                {/* Icon container với size cố định */}
                <div className={cn(
                  'relative z-10 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0',
                  'w-10 h-10', // Size cố định không thay đổi
                  item.isActive 
                    ? 'bg-white/20 backdrop-blur-sm' 
                    : 'bg-primary-100 group-hover:bg-primary-200'
                )}>
                  <Icon className={cn(
                    'w-5 h-5 transition-all duration-300', // Icon size cố định
                    item.isActive 
                      ? 'text-white' 
                      : 'text-primary-600 group-hover:text-primary-700'
                  )} />
                </div>
                
                {/* Chỉ hiện text và badge khi không collapsed */}
                {!isCollapsed && (
                  <div className="relative z-10 flex-1 flex items-center justify-between min-w-0">
                    <span className="font-semibold text-base truncate">{item.label}</span>
                    {item.badge && (
                      <span className={cn(
                        'px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-300 flex-shrink-0 ml-2',
                        item.isActive 
                          ? 'bg-white/20 text-white backdrop-blur-sm' 
                          : 'bg-primary-100 text-primary-700 group-hover:bg-primary-200'
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}

                {/* Hover indicator */}
                {!item.isActive && (
                  <div className="absolute left-0 top-1/2 w-1 h-0 bg-brand-gradient-primary rounded-r-full transform -translate-y-1/2 group-hover:h-8 transition-all duration-300"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>
      </div>
    </>
  );
};