import React from 'react';
import { Play, CheckCircle, Sparkles } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import { useRouter } from '../../../components/Router';
import { cn } from '../../../utils/cn';
import { useCTATracking } from '../../../hooks/useConversionTracking';

export const HeroSection: React.FC = () => {
  const { getContent } = useTranslation();
  const { navigate } = useRouter();

  // Track CTA clicks
  const trackPrimaryCTA = useCTATracking({
    ctaType: 'primary',
    ctaText: getContent('hero.ctaButtons.uploadCV') as string || 'Upload CV',
    section: 'hero',
    targetUrl: '/register',
  });

  const trackSecondaryCTA = useCTATracking({
    ctaType: 'secondary',
    ctaText: getContent('hero.ctaButtons.viewDemo') as string || 'View Demo',
    section: 'hero',
    targetUrl: '/login',
  });

  const trustIndicators = getContent('hero.trustIndicators') as string[] || [];
  
  const stats = trustIndicators.map((indicator, index) => ({
    text: indicator,
    icon: CheckCircle,
    color: index === 0 ? 'text-secondary-600' : index === 1 ? 'text-primary-600' : 'text-accent-600',
  }));

  return (
    <section className="relative bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 section-padding-lg overflow-hidden min-h-screen flex items-center">
      {/* Enhanced Background decorations with better positioning */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-200/40 to-secondary-200/30 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 animate-float" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-secondary-200/35 to-accent-200/25 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4 animate-float" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gradient-to-r from-accent-100/30 to-primary-100/20 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '4s'}} />
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s'}} />
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-secondary-400 rounded-full animate-bounce opacity-50" style={{animationDelay: '3s'}} />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse opacity-70" style={{animationDelay: '5s'}} />
      </div>

      <div className="relative page-max">
        <div className="grid lg:grid-cols-2 gap-fluid-lg items-center">
          {/* Enhanced Content */}
          <div className="text-center lg:text-left space-y-fluid">
            {/* Enhanced Badge with better styling */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary-50 via-white to-secondary-50 border border-primary-200/60 text-primary-700 text-sm font-semibold mb-8 shadow-soft-md hover:shadow-brand hover-float animate-fade-in glass-effect-brand backdrop-blur-md">
              <Sparkles className="w-4 h-4 mr-3 text-primary-500 animate-pulse" />
              🚀 AI-Powered Platform
            </div>

            {/* Enhanced Title with better gradient */}
            <h1 className="text-hierarchy-1 text-neutral-900 mb-8 leading-tight tracking-tight animate-slide-up stagger-1">
              <span className="text-brand-gradient-primary bg-clip-text text-transparent hover-gradient animate-shimmer">
                {getContent('hero.headline')?.split(' ').slice(0, 2).join(' ') || 'AI-Powered'}
              </span>
              <br />
              <span className="text-neutral-800 relative">
                {getContent('hero.headline')?.split(' ').slice(2).join(' ') || 'CV Analysis'}
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-brand-gradient-primary rounded-full transform scale-x-0 animate-slide-right" style={{animationDelay: '1s'}} />
              </span>
            </h1>

            {/* Enhanced Subtitle */}
            <p className="text-hierarchy-3 text-neutral-700 mb-12 leading-relaxed animate-slide-left stagger-2 max-w-2xl">
              {getContent('hero.subtitle')}
            </p>

            {/* Enhanced CTA Buttons with better styling */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center mb-16 animate-slide-up stagger-4">
              <button
                onClick={() => {
                  trackPrimaryCTA('hero_top');
                  navigate('/register');
                }}
                className="group bg-brand-gradient-primary hover:shadow-brand-xl text-white font-bold py-5 px-10 rounded-2xl text-lg transition-all duration-300 hover-lift hover-gradient shadow-brand-md flex items-center space-x-3 micro-scale focus-ring touch-target"
              >
                <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                <span>{getContent('hero.ctaButtons.uploadCV')}</span>
              </button>
              <button
                onClick={() => {
                  trackSecondaryCTA('hero_top');
                  navigate('/login');
                }}
                className="group bg-white/80 hover:bg-white text-neutral-800 font-bold py-5 px-10 rounded-2xl text-lg border-2 border-neutral-200/60 hover:border-primary-300 transition-all duration-300 hover-float shadow-soft-md backdrop-blur-sm flex items-center space-x-3 micro-bounce focus-ring touch-target"
              >
                <Play className="w-5 h-5 group-hover:scale-110 group-hover:text-primary-600 transition-all duration-300" />
                <span>{getContent('hero.ctaButtons.viewDemo')}</span>
              </button>
            </div>

            {/* Enhanced Stats with better layout */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 lg:gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 group animate-fade-in" style={{animationDelay: `${0.5 + index * 0.2}s`}}>
                    <div className="p-2.5 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 group-hover:from-primary-100 group-hover:to-secondary-100 transition-all duration-300 shadow-soft hover:shadow-brand-md">
                      <Icon className={cn('w-5 h-5', stat.color, 'group-hover:scale-110 transition-transform duration-300')} />
                    </div>
                    <span className="text-base font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300">
                      {stat.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced UI Mockup with better styling */}
          <div className="relative animate-fade-in stagger-6 hover-tilt">
            <div className="bg-white/95 rounded-3xl shadow-soft-xl hover:shadow-brand-xl p-8 border border-neutral-200/60 backdrop-blur-md hover-float transition-all duration-500 glass-effect-strong">
              {/* Enhanced Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-brand-gradient-primary rounded-2xl flex items-center justify-center shadow-brand-md hover:shadow-brand-lg transition-shadow duration-300">
                    <span className="text-white text-lg font-bold">AI</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">CV Analysis Dashboard</h3>
                    <p className="text-sm text-neutral-500 flex items-center">
                      <span className="w-2 h-2 bg-success-500 rounded-full mr-2 animate-pulse"></span>
                      Real-time processing
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-error-400 rounded-full hover:bg-error-500 transition-colors cursor-pointer hover:scale-110 transform duration-200" />
                  <div className="w-4 h-4 bg-warning-400 rounded-full hover:bg-warning-500 transition-colors cursor-pointer hover:scale-110 transform duration-200" />
                  <div className="w-4 h-4 bg-success-400 rounded-full hover:bg-success-500 transition-colors cursor-pointer hover:scale-110 transform duration-200" />
                </div>
              </div>

              {/* Enhanced Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-base font-semibold text-neutral-700">Analysis Progress</span>
                  <span className="text-base text-primary-600 font-bold bg-primary-50 px-3 py-1 rounded-full border border-primary-200/50">87%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-3 shadow-inner overflow-hidden">
                  <div className="bg-brand-gradient-primary h-3 rounded-full w-[87%] transition-all duration-1000 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>

              {/* Enhanced Results */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-success-50 to-success-100/60 rounded-xl border border-success-200/60 hover:shadow-soft-md transition-all duration-300 group backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-success-500 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-base font-semibold text-success-800">Skills Match</span>
                  </div>
                  <span className="text-lg font-bold text-success-700 bg-success-200/60 px-3 py-1 rounded-full border border-success-300/50">95%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-info-50 to-info-100/60 rounded-xl border border-info-200/60 hover:shadow-soft-md transition-all duration-300 group backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-info-500 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-base font-semibold text-info-800">Experience Level</span>
                  </div>
                  <span className="text-lg font-bold text-info-700 bg-info-200/60 px-4 py-1 rounded-full border border-info-300/50">Senior</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100/60 rounded-xl border border-purple-200/60 hover:shadow-soft-md transition-all duration-300 group backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-base font-semibold text-purple-800">Cultural Fit</span>
                  </div>
                  <span className="text-lg font-bold text-purple-700 bg-purple-200/60 px-4 py-1 rounded-full border border-purple-300/50">Excellent</span>
                </div>
              </div>
            </div>

            {/* Enhanced Floating elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-brand-gradient-primary rounded-3xl flex items-center justify-center shadow-brand-xl animate-float hover:animate-glow hover-scale transition-all duration-300">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-brand-gradient-secondary rounded-2xl flex items-center justify-center shadow-brand-lg hover-scale hover-glow transition-all duration-300">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="absolute top-1/2 -right-8 w-6 h-6 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full animate-ping opacity-75" />
            <div className="absolute bottom-1/4 -left-8 w-4 h-4 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full animate-pulse opacity-60" />

            {/* Enhanced Background glow */}
            <div className="absolute inset-0 bg-brand-gradient-soft rounded-3xl blur-3xl opacity-30 scale-110 animate-pulse pointer-events-none" />
            <div className="absolute inset-0 bg-brand-gradient-primary rounded-3xl blur-3xl opacity-10 scale-125 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};