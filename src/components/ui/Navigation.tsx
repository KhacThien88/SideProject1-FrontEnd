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
    <nav className="bg-white/90 backdrop-blur border-b border-neutral-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="ml-2 text-xl font-bold text-neutral-900">TalentFit AI</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-neutral-600 hover:text-primary-500 font-medium transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <Button variant="outline" size="sm">
              {navContent.login}
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-primary-500 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-neutral-200">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-primary-500 hover:bg-neutral-100 rounded-md transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4">
                <Button variant="outline" size="sm" className="w-full">
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
