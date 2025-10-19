import React from 'react';
import { useOnReveal } from '../../../hooks/useOnReveal';
import { useTranslation } from '../../../hooks/useTranslation';
import { RegisterForm } from './components/RegisterForm';
import { LoginHero } from '../Login/components/LoginHero';

export const Register: React.FC = () => {
  useOnReveal('.reveal');
  const { getContent } = useTranslation();

  return (
    <div className="min-h-screen lg:h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex lg:overflow-hidden">
      {/* Hero panel reused from Login for visual balance on large screens */}
      <LoginHero />

      {/* Register form area */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10 lg:py-8 bg-gradient-to-br from-secondary-600/20 to-primary-600/20">
        <div className="w-full max-w-xl md:max-w-2xl reveal">
          {/* Page heading in theme area */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary-500 via-primary-500/85 to-secondary-500 bg-clip-text text-transparent leading-tight" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
              {getContent('auth.register.title')}
            </h1>
            <p className="mt-2 text-sm font-medium text-neutral-600">
              {getContent('auth.register.welcomeSubtitle')}
            </p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
};
