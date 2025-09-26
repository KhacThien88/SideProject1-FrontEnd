import React from 'react';

export interface CardProps {
  variant?: 'default' | 'feature' | 'value' | 'elevated';
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  hover = true,
  className = '',
  children,
}) => {
  const base = 'rounded-2xl bg-white border border-neutral-200 p-6 transition-all duration-200 min-h-0';
  const hoverCls = hover ? 'hover:shadow-xl hover:-translate-y-0.5' : '';
  const variants: Record<NonNullable<CardProps['variant']>, string> = {
    default: '',
    feature: 'border-primary-100',
    value: 'border-secondary-100',
    elevated: 'shadow-lg',
  };

  return (
    <div className={`${base} ${variants[variant]} ${hoverCls} ${className}`}>
      {children}
    </div>
  );
};
