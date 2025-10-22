import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/auth/AuthContext';

export interface AdminLayoutProps {
  children?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Check admin privileges
  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login', { state: { from: location } });
    }
  }, [user, navigate, location]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('adminAuth.verifying')}</p>
        </div>
      </div>
    );
  }

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: '📊',
      description: 'Tổng quan hệ thống',
    },
    {
      name: 'Quản lý người dùng',
      path: '/admin/users',
      icon: '👥',
      description: 'Quản lý tài khoản người dùng',
    },
    {
      name: 'Quản lý CV',
      path: '/admin/cvs',
      icon: '📄',
      description: 'Quản lý và phân tích CV',
    },
    {
      name: 'Quản lý công việc',
      path: '/admin/jobs',
      icon: '💼',
      description: 'Quản lý tin tuyển dụng',
    },
    {
      name: 'Phản hồi',
      path: '/admin/feedback',
      icon: '💬',
      description: 'Quản lý phản hồi người dùng',
    },
    {
      name: 'Text Extraction',
      path: '/admin/textract',
      icon: '📝',
      description: 'Giám sát trích xuất văn bản',
    },
    {
      name: 'Báo cáo',
      path: '/admin/analytics',
      icon: '📈',
      description: 'Báo cáo và thống kê',
    },
    {
      name: 'Hệ thống',
      path: '/admin/system',
      icon: '⚙️',
      description: 'Cài đặt và giám sát hệ thống',
    },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          {/* Logo */}
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-gray-900">
                🔧 Admin Panel
              </h1>
            </div>

            {/* Navigation */}
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`
                    group w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive(item.path)
                      ? 'bg-blue-100 text-blue-900 border-r-4 border-blue-600'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                  title={item.description}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span className="flex-1 text-left">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* User info and logout */}
          <div className="flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {user.full_name?.charAt(0) || 'A'}
                  </span>
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700">
                  {user.full_name}
                </p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-3 text-gray-400 hover:text-gray-600 transition-colors"
                title="Đăng xuất"
              >
                <span className="text-lg">🚪</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      <div className="md:hidden">
        {/* Mobile menu button and overlay would go here */}
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Page header */}
              <div className="mb-8">
                <nav className="flex text-sm text-gray-500 mb-4">
                  <span>Admin</span>
                  {location.pathname !== '/admin' && (
                    <>
                      <span className="mx-2">/</span>
                      <span className="capitalize">
                        {location.pathname.split('/').filter(Boolean).slice(1).join(' / ')}
                      </span>
                    </>
                  )}
                </nav>
              </div>

              {/* Page content */}
              <div className="bg-white shadow rounded-lg">
                {children || <Outlet />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
