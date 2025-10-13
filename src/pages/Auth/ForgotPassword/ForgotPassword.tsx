import React from 'react';
import { useOnReveal } from '../../../hooks/useOnReveal';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';

export const ForgotPassword: React.FC = () => {
  useOnReveal('.reveal');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl reveal">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent" style={{ lineHeight: '1.2' }}>
            Quên mật khẩu
          </h1>
          <p className="mt-2 text-sm md:text-base text-neutral-600 max-w-xl mx-auto">
            Nhập địa chỉ email của bạn. Chúng tôi sẽ gửi một liên kết đặt lại mật khẩu vào hộp thư của bạn.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};
