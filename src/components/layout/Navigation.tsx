import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { Button } from '../ui/Button';
import { LanguageToggle } from '../ui/LanguageToggle';
import { cn } from '../../utils/cn';

export const Navigation: React.FC = () => {
  const { getContent } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'nav.features', href: '#features' },
    { key: 'nav.pricing', href: '#pricing' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-neutral-200/50 sticky top-0 z-50 shadow-soft">
      <div className="page-max mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Enhanced Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-gradient rounded-xl flex items-center justify-center shadow-brand hover-scale transition-all duration-300">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-2xl font-bold text-neutral-900 hover:text-brand-gradient bg-clip-text hover:text-transparent transition-all duration-300">TalentFit AI</span>
              </div>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-12 flex items-baseline space-x-10">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-neutral-700 hover:text-primary-600 px-4 py-3 text-base font-semibold transition-all duration-300 hover:bg-primary-50/50 rounded-lg relative group"
                >
                  {getContent(item.key)}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full" />
                </a>
              ))}
            </div>
          </div>

          {/* Enhanced Desktop Actions */}
          <div className="hidden md:flex items-center space-x-5">
            <LanguageToggle />
            <Button variant="tertiary" size="md" className="hover-lift">
              {getContent('nav.login')}
            </Button>
            <Button variant="primary" size="md" className="hover-lift shadow-brand">
              {getContent('nav.signup')}
            </Button>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <LanguageToggle className="scale-95" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-3 rounded-xl text-neutral-700 hover:text-primary-600 hover:bg-primary-50/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-all duration-300 hover-scale"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile menu */}
      <div className={cn(
        'md:hidden transition-all duration-500 ease-in-out overflow-hidden backdrop-blur-md',
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="px-4 pt-4 pb-6 space-y-2 sm:px-6 bg-white/95 border-t border-neutral-200/50 shadow-soft">
          {navItems.map((item, index) => (
            <a
              key={item.key}
              href={item.href}
              className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50/50 block px-4 py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover-lift animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {getContent(item.key)}
            </a>
          ))}
          <div className="pt-6 pb-2 border-t border-neutral-200/50">
            <div className="flex flex-col space-y-4 px-2">
              <Button variant="tertiary" size="md" className="w-full hover-lift animate-slide-up" style={{animationDelay: '0.4s'}}>
                {getContent('nav.login')}
              </Button>
              <Button variant="primary" size="md" className="w-full hover-lift shadow-brand animate-slide-up" style={{animationDelay: '0.5s'}}>
                {getContent('nav.signup')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};