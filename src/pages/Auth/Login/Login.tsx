import React from 'react';
import { useOnReveal } from '../../../hooks/useOnReveal';
import { LoginHero } from './components/LoginHero';
import { LoginForm } from './components/LoginForm';

export const Login: React.FC = () => {
  useOnReveal('.reveal');

  const handleLoginSubmit = (email: string, password: string, rememberMe: boolean) => {
    // Handle login logic here
    console.log('Login attempt:', { email, password, rememberMe });
    
    // Handle remember me
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    }
    
    // Simulate API call
    setTimeout(() => {
      alert('Đăng nhập thành công! (Demo UI)');
    }, 1000);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex overflow-hidden">
      {/* Hero Section - Hidden on mobile */}
      <LoginHero />

      {/* Login Form Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary-600/20 to-primary-600/20">
        <div className="w-full max-w-md reveal">
          <LoginForm onSubmit={handleLoginSubmit} />
        </div>
      </div>
    </div>
  );
};