import React from 'react';
import { cn } from '../../utils/cn';
import {
  Shield,
  Zap,
  Users,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react';

// Icon mapping
const iconMap = {
  shield: Shield,
  zap: Zap,
  users: Users,
  globe: Globe,
  smartphone: Smartphone,
  monitor: Monitor,
  tablet: Tablet,
  'check-circle': CheckCircle,
  'arrow-right': ArrowRight,
  star: Star,
  clock: Clock,
  'trending-up': TrendingUp,
} as const;

export type IconName = keyof typeof iconMap;

interface IconProps {
  name: IconName;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'white';
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const colorClasses = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  muted: 'text-muted-foreground',
  white: 'text-white',
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  className,
  color = 'primary',
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      className={cn(
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    />
  );
};

export default Icon;