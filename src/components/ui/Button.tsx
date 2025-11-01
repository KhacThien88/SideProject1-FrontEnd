import React from 'react';
import { designSystem } from '../../styles/tokens';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = designSystem.buttons[variant] || designSystem.buttons.primary;
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }[size];
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        ${baseClasses} ${sizeClasses} ${widthClass} ${className}
      `.trim()}
    >
      {loading && (
        <div className={`${designSystem.loading.buttonLoading} mr-2`} />
      )}
      {children}
    </button>
  );
};

export default Button;