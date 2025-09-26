import React from 'react';
import { cn } from '../../utils/cn';
import { Icon, type IconName } from './Icon';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'feature' | 'value';
  className?: string;
  hover?: boolean;
}

interface FeatureCardProps {
  icon: IconName;
  title: string;
  description: string;
  className?: string;
  hover?: boolean;
}

interface ValueCardProps {
  icon: IconName;
  title: string;
  description: string;
  className?: string;
  hover?: boolean;
}

const cardVariants = {
  default: 'bg-white border border-neutral-200 rounded-lg shadow-brand',
  feature: 'bg-white border border-neutral-200 rounded-xl shadow-brand p-6',
  value: 'bg-white border border-neutral-200 rounded-xl shadow-brand p-8',
};

const hoverEffects = {
  default: 'hover:shadow-brand-strong transition-shadow duration-300',
  feature: 'hover:shadow-brand-strong hover:-translate-y-1 transition-all duration-300',
  value: 'hover:shadow-brand-strong hover:-translate-y-1 transition-all duration-300',
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className,
  hover = false,
}) => {
  return (
    <div
      className={cn(
        cardVariants[variant],
        hover && hoverEffects[variant],
        className
      )}
    >
      {children}
    </div>
  );
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className,
  hover = true,
}) => {
  return (
    <Card variant="feature" hover={hover} className={className}>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center shadow-brand">
          <Icon name={icon} size="lg" color="primary" />
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
          <p className="text-neutral-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export const ValueCard: React.FC<ValueCardProps> = ({
  icon,
  title,
  description,
  className,
  hover = true,
}) => {
  return (
    <Card variant="value" hover={hover} className={className}>
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name={icon} size="xl" color="white" />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-neutral-900">{title}</h3>
          <p className="text-neutral-600 text-lg leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default Card;