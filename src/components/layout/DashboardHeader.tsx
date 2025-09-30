import React from 'react';
import { useRouter } from '../../components/Router';
import { Button } from '../../components/ui/Button';
import { useTranslation } from '../../hooks/useTranslation';
import { useHeaderVisibility } from '../../hooks/useHeaderVisibility';
import { 
  Bell, 
  Search, 
  User, 
  LogOut,
  ChevronDown
} from 'lucide-react';

export const DashboardHeader: React.FC = () => {
  const { navigate } = useRouter();
  const { t } = useTranslation();
  const { isVisible } = useHeaderVisibility({
    threshold: 80,
    hideDelay: 200,
    showOnHoverZone: 80
  });

  return (
    <>
      {/* Hover zone at top of screen when header is hidden */}
      {!isVisible && (
        <div 
          className="fixed top-0 left-0 w-full h-20 z-50 pointer-events-auto"
          style={{ background: 'transparent' }}
        />
      )}
      
      <header className={`bg-gradient-to-tr from-primary-100 via-white to-secondary-50 backdrop-blur-xl border-b border-neutral-200/60 shadow-soft sticky top-0 z-40 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
      <div className="px-4 sm:px-6 py-1">
        <div className="flex items-center justify-between gap-2">
          {/* Left side - Page Title */}
          <div className="flex items-center space-x-4 min-w-0">
            <div className="flex flex-col min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold truncate">
                <span className="text-brand-gradient-primary bg-clip-text text-transparent">{t.dashboard.header.title}</span>
                <span className="text-neutral-800 ml-1">{t.dashboard.header.subtitle}</span>
              </h2>
              <div className="text-md text-neutral-500 font-medium hidden sm:block truncate">
                {t.dashboard.header.description}
              </div>
            </div>
          </div>

          {/* Right side - Enhanced Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Enhanced Search - Responsive */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder={t.dashboard.header.search.placeholder}
                className="p-3 w-64 lg:w-80 border border-neutral-200 rounded-xl bg-neutral-50/50 backdrop-blur-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 focus:bg-white transition-all duration-300 text-neutral-700 text-sm"
              />
            </div>

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
            <div className="flex items-center space-x-2 sm:space-x-3 bg-neutral-50/50 backdrop-blur-sm rounded-xl p-1.5 sm:p-2 hover:bg-neutral-100/50 transition-all duration-300 group cursor-pointer">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-gradient-primary rounded-lg flex items-center justify-center shadow-brand-sm group-hover:shadow-brand-md transition-all duration-300">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="hidden lg:block min-w-0">
                <div className="text-sm font-semibold text-neutral-900 truncate">{t.dashboard.header.user.name}</div>
                <div className="text-xs text-neutral-500 font-medium truncate">{t.dashboard.header.user.role}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-neutral-400 group-hover:text-primary-600 transition-colors duration-300 hidden sm:block" />
            </div>

            {/* Action Buttons - Responsive */}
            <div className="flex items-center">
              <Button 
                variant="tertiary" 
                size="sm" 
                className="focus-ring text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 hidden sm:flex"
                onClick={() => navigate('/login')}
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden lg:inline">{t.dashboard.header.actions.logout}</span>
              </Button>
              
              {/* Mobile Logout */}
              <button 
                className="sm:hidden p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                onClick={() => navigate('/login')}
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