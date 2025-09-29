import React from 'react';
import { useOnReveal } from '../../../hooks/useOnReveal';
import { LoginHero } from './components/LoginHero';
import { LoginForm } from './components/LoginForm';

export const Login: React.FC = () => {
  useOnReveal('.reveal');

  return (
    <div className="min-h-screen lg:h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex flex-col lg:flex-row lg:overflow-hidden">
      {/* Hero Section - Hidden on mobile */}
      <LoginHero />

      {/* Login Form Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 lg:py-4 bg-gradient-to-br from-secondary-600/20 to-primary-600/20">
        <div className="w-full max-w-lg reveal">
          <LoginForm/>
        </div>
      </div>
    </div>
  );
};