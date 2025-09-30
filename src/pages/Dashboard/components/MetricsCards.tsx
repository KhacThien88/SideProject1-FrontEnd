import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Counter } from '../../../components/common/Counter';
import { 
  FileText, 
  Users, 
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Zap
} from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import { cn } from '../../../utils/cn';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: 'primary' | 'secondary' | 'accent' | 'success';
  trend?: {
    value: number;
    type: 'up' | 'down' | 'neutral';
  };
  description: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  trend,
  description 
}) => {
  const colorClasses = {
    primary: {
      bg: 'bg-gradient-to-br from-primary-50 to-primary-100',
      icon: 'text-primary-600',
      iconBg: 'bg-primary-500',
      text: 'text-primary-800',
      border: 'border-primary-200'
    },
    secondary: {
      bg: 'bg-gradient-to-br from-secondary-50 to-secondary-100', 
      icon: 'text-secondary-600',
      iconBg: 'bg-secondary-500',
      text: 'text-secondary-800',
      border: 'border-primary-200'
    },
    accent: {
      bg: 'bg-gradient-to-br from-accent-50 to-accent-100',
      icon: 'text-accent-600', 
      iconBg: 'bg-accent-500',
      text: 'text-accent-800',
      border: 'border-primary-200'
    },
    success: {
      bg: 'bg-gradient-to-br from-success-50 to-success-100',
      icon: 'text-success-600',
      iconBg: 'bg-rose-500',
      text: 'text-success-800',
      border: 'border-primary-200'
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    
    switch (trend.type) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-success-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-error-500" />;
      case 'neutral':
        return <Minus className="w-4 h-4 text-neutral-500" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    if (!trend) return 'text-neutral-500';
    
    switch (trend.type) {
      case 'up':
        return 'text-success-600';
      case 'down':
        return 'text-error-600';
      case 'neutral':
        return 'text-neutral-600';
      default:
        return 'text-neutral-500';
    }
  };

  return (
    <Card 
      variant="default" 
      hover={true}
      className={cn(
        'bg-white backdrop-blur-sm border transition-all duration-300 hover:shadow-lg group px-3 py-4',
        colorClasses[color].border
      )}
    >
      <div className="flex flex-col space-y-4 ">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 sm:space-x-2 min-w-0 flex-1">
            <div className={cn(
              'w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 hover-scale flex-shrink-0',
              colorClasses[color].iconBg
            )}>
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-md sm:text-md font-semibold text-neutral-600 mb-1 sm:mb-2 truncate">{title}</div>
              <div className="flex items-baseline space-x-2 flex-wrap">
                {typeof value === 'number' ? (
                  <Counter 
                    end={value} 
                    className="text-md sm:text-md font-bold text-neutral-900"
                    duration={2000}
                  />
                ) : (
                  <span className="text-md sm:text-md font-bold text-neutral-900 break-words">{value}</span>
                )}
                {trend && (
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    {getTrendIcon()}
                    <span className={cn('text-xs sm:text-sm font-semibold', getTrendColor())}>
                      {trend.value > 0 ? '+' : ''}{trend.value}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="text-xs sm:text-sm text-neutral-500 leading-relaxed break-words">{description}</div>
      </div>
    </Card>
  );
};

export const MetricsCards: React.FC = () => {
  const { t } = useTranslation();
  
  const metrics = [
    {
      title: t.dashboard.metrics.totalResumes.title,
      value: 2847,
      icon: FileText,
      color: 'primary' as const,
      trend: { value: 12, type: 'up' as const },
      description: t.dashboard.metrics.totalResumes.description
    },
    {
      title: t.dashboard.metrics.activeCandidates.title, 
      value: 1523,
      icon: Users,
      color: 'secondary' as const,
      trend: { value: 18, type: 'up' as const },
      description: t.dashboard.metrics.activeCandidates.description
    },
    {
      title: t.dashboard.metrics.accuracy.title,
      value: '94%',
      icon: Target,
      color: 'success' as const,
      trend: { value: 5, type: 'up' as const },
      description: t.dashboard.metrics.accuracy.description
    },
    {
      title: t.dashboard.metrics.processingSpeed.title,
      value: '2.3s',
      icon: Zap,
      color: 'accent' as const,
      trend: { value: 15, type: 'up' as const },
      description: t.dashboard.metrics.processingSpeed.description
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {metrics.map((metric, index) => (
        <div 
          key={index}
          className="animate-slide-up"
          style={{animationDelay: `${index * 0.1}s`}}
        >
          <MetricCard
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            color={metric.color}
            trend={metric.trend}
            description={metric.description}
          />
        </div>
      ))}
    </div>
  );
};