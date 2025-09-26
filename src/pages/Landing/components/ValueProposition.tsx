import React from 'react';
import { Zap, BarChart3, TrendingUp, Target } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import { cn } from '../../../utils/cn';



export const ValueProposition: React.FC = () => {
  const { getContent } = useTranslation();

  const values = [
    {
      key: 'valueProposition.values.accuracy',
      icon: Target,
      color: 'text-primary-600',
      bgColor: 'bg-gradient-to-br from-primary-50 to-primary-100/50',
      borderColor: 'border-primary-200/50',
      shadowColor: 'shadow-primary-100/50',
    },
    {
      key: 'valueProposition.values.efficiency',
      icon: Zap,
      color: 'text-secondary-600',
      bgColor: 'bg-gradient-to-br from-secondary-50 to-secondary-100/50',
      borderColor: 'border-secondary-200/50',
      shadowColor: 'shadow-secondary-100/50',
    },
    {
      key: 'valueProposition.values.insights',
      icon: BarChart3,
      color: 'text-accent-600',
      bgColor: 'bg-gradient-to-br from-accent-50 to-accent-100/50',
      borderColor: 'border-accent-200/50',
      shadowColor: 'shadow-accent-100/50',
    },
    {
      key: 'valueProposition.values.scalability',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100/50',
      borderColor: 'border-purple-200/50',
      shadowColor: 'shadow-purple-100/50',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white via-neutral-50/50 to-primary-50/30 relative overflow-hidden">
      {/* Enhanced Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-100/40 to-secondary-100/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '0s'}} />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-accent-100/30 to-primary-100/20 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3 animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-secondary-100/20 to-accent-100/15 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '4s'}} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-fluid">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200/50 text-primary-700 text-sm font-semibold mb-6 animate-fade-in-scale stagger-1 glass-effect hover-float">
            <span className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mr-2 animate-shimmer" />
            Core Values
          </div>
          <h2 className="text-hierarchy-2 font-bold text-neutral-900 mb-6 sm:mb-8 animate-bounce-in animate-text-glow stagger-2">
            <span className="text-brand-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 hover-gradient">
              {(getContent('valueProposition.title') || 'AI-Powered CV Analysis').split(' ').slice(0, 2).join(' ')}
            </span>
            <br />
            <span className="text-neutral-800">
              {(getContent('valueProposition.title') || 'AI-Powered CV Analysis').split(' ').slice(2).join(' ')}
            </span>
          </h2>
          <p className="text-hierarchy-3 text-neutral-600 max-w-4xl mx-auto font-medium animate-slide-left stagger-3">
            {getContent('valueProposition.subtitle')}
          </p>
        </div>

        {/* Enhanced Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={value.key}
                className={cn(
                  'group p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 transition-all duration-500 hover:shadow-2xl cursor-pointer relative overflow-hidden animate-slide-right micro-scale micro-glow glass-effect hover-tilt',
                  value.bgColor,
                  value.borderColor,
                  'hover:border-opacity-100',
                  `stagger-${Math.min(index + 4, 6)}`
                )}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Enhanced Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl animate-shimmer" />
                <div className="absolute inset-0 bg-brand-gradient-soft rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                
                <div className={cn(
                  'w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 hover-glow glass-effect-strong',
                  value.bgColor.replace('from-', 'from-').replace('to-', 'to-').replace('/50', '')
                )}>
                  <Icon className={cn('w-6 h-6 sm:w-8 sm:h-8', value.color, 'group-hover:scale-110 transition-transform duration-300')} />
                </div>
                
                <h3 className="text-hierarchy-4 font-bold text-neutral-900 mb-3 sm:mb-4 group-hover:text-primary-700 transition-colors duration-300">
                  {getContent(`${value.key}.title`)}
                </h3>
                
                <p className="text-neutral-600 leading-relaxed text-base sm:text-lg group-hover:text-neutral-700 transition-colors duration-300">
                  {getContent(`${value.key}.description`)}
                </p>
                
                <div className={cn(
                  'text-2xl sm:text-3xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300',
                  value.color
                )}>
                  {getContent(`${value.key}.metric`)}
                </div>
                
                {/* Bottom accent line */}
                <div className={cn(
                  'absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left',
                  value.color.replace('text-', 'bg-')
                )} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;