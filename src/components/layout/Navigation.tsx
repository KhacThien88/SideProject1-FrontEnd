import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Zap } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { Button } from '../ui/Button';
import { LanguageToggle } from '../ui/LanguageToggle';
import { cn } from '../../utils/cn';

export const Navigation: React.FC = () => {
  const { getContent } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Enhanced scroll detection for dynamic header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      key: 'nav.features', 
      href: '#features',
      icon: Sparkles,
      description: 'Khám phá tính năng AI mạnh mẽ'
    },
    { 
      key: 'nav.pricing', 
      href: '#pricing',
      icon: Zap,
      description: 'Gói dịch vụ phù hợp với bạn'
    },
    { 
      key: 'nav.about', 
      href: '#about',
      description: 'Về chúng tôi và sứ mệnh'
    },
    { 
      key: 'nav.contact', 
      href: '#contact',
      description: 'Liên hệ hỗ trợ 24/7'
    },
  ];

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-neutral-200/60 shadow-soft-lg' 
        : 'bg-white/80 backdrop-blur-md border-b border-neutral-200/30 shadow-soft'
    )}>
      <div className="page-max">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo with better branding */}
          <div className="flex items-center group">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-4">
                <div className={cn(
                  'w-12 h-12 bg-brand-gradient-primary rounded-2xl flex items-center justify-center shadow-brand-md hover:shadow-brand-lg transition-all duration-300 hover-scale group-hover:rotate-3',
                  isScrolled && 'scale-95'
                )}>
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <div className="flex flex-col">
                  <span className={cn(
                    'text-2xl font-bold text-neutral-900 transition-all duration-300',
                    isScrolled ? 'text-xl' : 'text-2xl'
                  )}>
                    <span className="text-brand-gradient-primary bg-clip-text text-transparent">TalentFit</span>
                    <span className="text-neutral-800 ml-1">AI</span>
                  </span>
                  <span className="text-xs text-neutral-500 font-medium -mt-1">AI-Powered CV Analysis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Desktop Navigation with better UX */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="relative group">
                    <a
                      href={item.href}
                      className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 px-4 py-3 text-base font-semibold transition-all duration-300 hover:bg-primary-50/60 rounded-xl relative group/link"
                    >
                      {Icon && <Icon className="w-4 h-4 opacity-70 group-hover/link:opacity-100 transition-opacity duration-300" />}
                      <span>{getContent(item.key)}</span>
                      <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-brand-gradient-primary group-hover/link:w-3/4 group-hover/link:left-1/8 transition-all duration-300 rounded-full" />
                    </a>
                    
                    {/* Enhanced tooltip on hover */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-neutral-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
                      {item.description}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-neutral-900 rotate-45"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Desktop Actions with better styling */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageToggle />
            
            <Button 
              variant="tertiary" 
              size="md" 
              className="hover-lift focus-ring touch-target font-semibold"
            >
              {getContent('nav.login')}
            </Button>
            
            <Button 
              variant="primary" 
              size="md" 
              className="hover-lift shadow-brand-md hover:shadow-brand-lg focus-ring touch-target font-semibold bg-brand-gradient-primary"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {getContent('nav.signup')}
            </Button>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
            <LanguageToggle className="scale-90" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'inline-flex items-center justify-center p-3 rounded-2xl text-neutral-700 hover:text-primary-600 hover:bg-primary-50/60 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 hover-scale touch-target',
                isMobileMenuOpen && 'bg-primary-50 text-primary-600'
              )}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">
                {isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              </span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6 animate-rotate" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile menu with better animations */}
      <div className={cn(
        'lg:hidden transition-all duration-500 ease-out overflow-hidden',
        isMobileMenuOpen 
          ? 'max-h-screen opacity-100 translate-y-0' 
          : 'max-h-0 opacity-0 -translate-y-4'
      )}>
        <div className="px-4 pt-4 pb-8 space-y-2 bg-white/98 backdrop-blur-xl border-t border-neutral-200/60 shadow-soft-lg">
          {/* Mobile navigation items */}
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={item.key}
                href={item.href}
                className={cn(
                  'flex items-center space-x-4 text-neutral-700 hover:text-primary-600 hover:bg-primary-50/60 px-4 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover-lift animate-slide-up group',
                )}
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {Icon && (
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-semibold">{getContent(item.key)}</div>
                  <div className="text-sm text-neutral-500 font-normal">{item.description}</div>
                </div>
              </a>
            );
          })}
          
          {/* Mobile action buttons */}
          <div className="pt-6 border-t border-neutral-200/60 space-y-4">
            <Button 
              variant="tertiary" 
              size="lg" 
              className="w-full hover-lift animate-slide-up touch-target font-semibold" 
              style={{animationDelay: '0.4s'}}
            >
              {getContent('nav.login')}
            </Button>
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full hover-lift shadow-brand-md animate-slide-up touch-target font-semibold bg-brand-gradient-primary" 
              style={{animationDelay: '0.5s'}}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {getContent('nav.signup')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};