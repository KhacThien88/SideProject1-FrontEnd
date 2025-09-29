import React from 'react';
import { useOnReveal } from '../../../hooks/useOnReveal';
import { RegisterForm } from './components/RegisterForm';

export const Register: React.FC = () => {
  useOnReveal('.reveal');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl reveal">
        <RegisterForm />
      </div>
    </div>
  );
};
