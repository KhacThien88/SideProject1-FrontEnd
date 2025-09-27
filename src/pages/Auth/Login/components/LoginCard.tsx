import React from 'react';

export interface LoginCardProps {
  variant?: 'default' | 'elevated';
  className?: string;
  children: React.ReactNode;
}

export const LoginCard: React.FC<LoginCardProps> = ({
  variant = 'default',
  className = '',
  children,
}) => {
  const base = 'rounded-2xl bg-white border border-neutral-200 p-4';
  const variants: Record<NonNullable<LoginCardProps['variant']>, string> = {
    default: '',
    elevated: 'shadow-lg',
  };

  return (
    <div className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};