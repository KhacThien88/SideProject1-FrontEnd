import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Button } from '../common/Button';
import { LanguageToggle } from '../common/LanguageToggle';

export const Navigation: React.FC = () => {
  const { getContent } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navContent = getContent('nav') || {
    features: 'Tính năng',
    pricing: 'Giá cả',
    about: 'Về chúng tôi',
    login: 'Đăng nhập',
    language: 'Ngôn ngữ',
  };
  
  const navigationItems = [
    { label: navContent.features, href: '#features' },
    { label: navContent.pricing, href: '#pricing' },
    { label: navContent.about, href: '#about' },
  ];
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-neutral-200/80 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="ml-3 text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors duration-200">TalentFit AI</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="relative text-neutral-600 hover:text-primary-600 font-medium transition-all duration-200 py-2 px-1 group"
              >
                {item.label}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
              </a>
            ))}
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <Button variant="outline" size="sm" className="hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 transition-all duration-200">
              {navContent.login}
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle />
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-all duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-neutral-200/80 shadow-lg">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 border border-transparent hover:border-primary-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 px-2">
                <Button variant="outline" size="sm" className="w-full hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 transition-all duration-200">
                  {navContent.login}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
