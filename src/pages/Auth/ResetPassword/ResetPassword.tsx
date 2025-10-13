import React, { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { useToast } from '../../../contexts/ToastContext';
import { useTranslation } from '../../../hooks/useTranslation';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { AuthApiService, ApiErrorHandler } from '../../../services/api/authService';

export const ResetPassword: React.FC = () => {
  const { showErrorToast, showSuccessToast } = useToast();
  const { getContent } = useTranslation();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const t = url.searchParams.get('token') || '';
    setToken(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      showErrorToast('Token không hợp lệ');
      return;
    }
    if (!password || password.length < 8) {
      showErrorToast(getContent('auth.register.toast.passwordMinLength'));
      return;
    }
    if (password !== confirmPassword) {
      showErrorToast(getContent('validation.confirmPasswordMismatch'));
      return;
    }
    try {
      setIsLoading(true);
      await AuthApiService.resetPassword(token, password);
      showSuccessToast('Đặt lại mật khẩu thành công');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1200);
    } catch (err) {
      showErrorToast(ApiErrorHandler.handleError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent" style={{ lineHeight: '1.2' }}>
            Đặt lại mật khẩu
          </h1>
          <p className="mt-2 text-sm md:text-base text-neutral-600 max-w-xl mx-auto">
            Nhập token được gửi tới email và tạo mật khẩu mới cho tài khoản của bạn.
          </p>
        </div>
        <Card variant="default" className="w-full shadow-xl backdrop-blur-md p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">Token</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg border-neutral-300 bg-white"
                placeholder="Dán token từ email"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">Mật khẩu mới</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg border-neutral-300 bg-white"
                placeholder="Ít nhất 8 ký tự"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">Xác nhận mật khẩu</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg border-neutral-300 bg-white"
                placeholder="Nhập lại mật khẩu"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white rounded-2xl p-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2"><LoadingSpinner size="sm" /> Đang xử lý...</div>
              ) : (
                'Đặt lại mật khẩu'
              )}
            </button>
            <button
              type="button"
              onClick={() => (window.location.href = '/login')}
              className="w-full mt-2 text-primary-600 hover:text-primary-700 font-semibold"
              disabled={isLoading}
            >
              Quay lại đăng nhập
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};


