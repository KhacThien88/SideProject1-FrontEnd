import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../../../hooks/useTranslation';
import { useViewTransition, addTransitionType } from '../../../../hooks/useViewTransition';
import { ViewTransition } from '../../../../components/ViewTransition';
import { Sparkles, Target, Zap, BarChart3, TrendingUp } from 'lucide-react';

interface LandingPageSection {
  name: string;
  title: string;
  description: string;
  metric: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  features: string[];
}

export const LoginHero: React.FC = () => {
  const { getContent } = useTranslation();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  // Các page/section chính từ Landing page
  const landingSections: LandingPageSection[] = getContent('loginHero.sections').map((section: any, index: number) => {
    const icons = [Sparkles, Target, Zap, BarChart3, TrendingUp];
    const gradients = [
      'from-primary-500 to-secondary-500',
      'from-primary-600 to-primary-400',
      'from-secondary-600 to-accent-500',
      'from-accent-600 to-secondary-500',
      'from-secondary-500 to-primary-600'
    ];
    
    return {
      name: section.name,
      title: section.title,
      description: section.description,
      metric: section.metric,
      icon: icons[index] || Sparkles,
      gradient: gradients[index] || 'from-primary-500 to-secondary-500',
      features: section.features
    };
  });

  // Initialize view transition hook
  const { startViewTransition } = useViewTransition({ 
    mode: 'slide-right',
    duration: 400 
  });

  // Auto-rotate sections with smooth view transitions
  useEffect(() => {
    const interval = setInterval(() => {
      // Add transition type for analytics/debugging
      addTransitionType('landing-section-rotate');
      
      // Use view transition for smooth content change
      startViewTransition(() => {
        setCurrentSectionIndex((prev) => (prev + 1) % landingSections.length);
      });
    }, 4000); // Display time for each section

    return () => clearInterval(interval);
  }, [landingSections.length, startViewTransition]);

  const currentSection = landingSections[currentSectionIndex];

  return (
    <div className="hidden lg:flex lg:w-9/20 bg-gradient-to-br from-primary-600 to-secondary-600 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-secondary-500/20"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Floating particles */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-300"></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-white/20 rounded-full animate-bounce delay-700"></div>
      <div className="absolute bottom-32 left-16 w-2 h-2 bg-white/25 rounded-full animate-bounce delay-1000"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 py-24 text-white">
        <div className="w-full flex flex-col items-center">
          {/* Main headline */}
          <h1 className="text-4xl font-bold leading-tight">
            {getContent('hero.headline') || 'AI Resume Analyzer & Job Match Platform'}
          </h1>
          <div className="text-xl text-white/80 my-4">
            {getContent('hero.subtitle') || 'Tìm việc làm phù hợp với AI - Nhanh, Chính xác, Hiệu quả'}
          </div>
          
          {/* Animated section showcase */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-12 py-6 mb-8 mt-2 border border-white/20 w-9/10">
            <ViewTransition mode="cross-fade" duration={400} className="min-h-32">
              <div key={currentSectionIndex}>
              <div className="flex items-center mb-4">
                <div className="p-3 bg-white/20 rounded-xl mr-4">
                  <currentSection.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{currentSection.title}</h3>
                  <span className={`inline-block text-white/90 px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${currentSection.gradient} bg-opacity-20`}>
                    {currentSection.metric}
                  </span>
                </div>
              </div>
              <div className="text-white/80 text-sm leading-relaxed mb-3">
                {currentSection.description}
              </div>
                {/* Feature list */}
                <div className="space-y-1">
                  {currentSection.features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center text-xs text-white/70 animate-fade-in stagger-${idx + 1}`}
                    >
                      <div className="w-1 h-1 bg-white/50 rounded-full mr-2 animate-pulse"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </ViewTransition>
            
            {/* Progress indicators */}
            <div className="flex space-x-2 mt-4 transition-opacity duration-300">
              {landingSections.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
                    index === currentSectionIndex 
                      ? 'bg-white w-8 shadow-lg opacity-100 transform scale-110' 
                      : 'bg-white/30 w-2 opacity-60 transform scale-100'
                  }`}
                />
              ))}
            </div>
          </div>
          {/* Trust indicators */}
          <div className="space-y-3 transition-all duration-500">
            {getContent('loginHero.trustIndicators').map((indicator: string, index: number) => (
              <div key={index} className={`flex items-center space-x-3 opacity-80 transition-all duration-300 hover:opacity-100 ${index > 0 ? `delay-${index * 75}` : ''}`}>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: `${index * 0.2}s`}}></div>
                <span className="text-white/80">{indicator}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};