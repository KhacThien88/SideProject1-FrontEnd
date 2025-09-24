import React from 'react';
import { Play, CheckCircle } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import { cn } from '../../../utils/cn';

export const HeroSection: React.FC = () => {
  const { getContent } = useTranslation();

  const stats = [
    {
      key: 'hero.stats.users',
      icon: CheckCircle,
      color: 'text-secondary-600',
    },
    {
      key: 'hero.stats.accuracy',
      icon: CheckCircle,
      color: 'text-primary-600',
    },
    {
      key: 'hero.stats.speed',
      icon: CheckCircle,
      color: 'text-accent-600',
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-neutral-50 via-white to-primary-50/20 pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-32 lg:pb-40 overflow-hidden min-h-screen flex items-center">
      {/* Enhanced Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-200/30 to-primary-300/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-secondary-200/25 to-accent-200/15 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4 animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gradient-to-r from-accent-100/20 to-primary-100/15 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 xl:gap-24 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200/50 text-primary-700 text-sm font-semibold mb-8 shadow-soft hover:shadow-brand hover-float animate-fade-in-scale stagger-1 glass-effect">
              <span className="w-2.5 h-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mr-3 animate-shimmer" />
              🚀 AI-Powered Platform
            </div>

            {/* Enhanced Title */}
            <h1 className="text-hierarchy-1 text-neutral-900 mb-8 leading-tight tracking-tight animate-bounce-in stagger-1 animate-text-glow">
              <span className="text-brand-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 hover-gradient">
                {getContent('hero.title')?.split(' ').slice(0, 2).join(' ') || 'AI-Powered'}
              </span>
              <br />
              <span className="text-neutral-800">
                {getContent('hero.title')?.split(' ').slice(2).join(' ') || 'CV Analysis'}
              </span>
            </h1>

            {/* Enhanced Subtitle */}
            <p className="text-hierarchy-2 text-neutral-700 mb-6 leading-relaxed animate-slide-left stagger-2">
              {getContent('hero.subtitle')}
            </p>

            {/* Enhanced Description */}
            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium animate-slide-right stagger-3">
              {getContent('hero.description')}
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up stagger-3">
              <button className="group bg-brand-gradient hover:shadow-brand-xl text-white font-bold py-5 px-10 rounded-2xl text-lg transition-all duration-300 hover-lift hover-gradient shadow-brand flex items-center space-x-3 micro-scale micro-glow animate-bounce-in stagger-4">
                 {getContent('hero.cta.primary')}
               </button>
              <button className="group bg-white hover:bg-neutral-50 text-neutral-800 font-bold py-5 px-10 rounded-2xl text-lg border-2 border-neutral-200 hover:border-primary-300 transition-all duration-300 hover-float shadow-soft flex items-center space-x-3 micro-bounce micro-glow animate-bounce-in stagger-5">
                 <Play className="w-6 h-6 mr-3 group-hover:scale-110 group-hover:text-primary-600 transition-all duration-300" />
                 {getContent('hero.cta.secondary')}
               </button>
            </div>

            {/* Enhanced Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.key} className="flex items-center space-x-3 group">
                    <div className="p-2 rounded-full bg-gradient-to-r from-primary-50 to-secondary-50 group-hover:from-primary-100 group-hover:to-secondary-100 transition-all duration-300">
                      <Icon className={cn('w-5 h-5', stat.color, 'group-hover:scale-110 transition-transform duration-300')} />
                    </div>
                    <span className="text-base font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300">
                      {getContent(stat.key)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced UI Mockup */}
          <div className="relative animate-fade-in-scale stagger-6 hover-tilt">
            <div className="bg-white rounded-3xl shadow-soft-lg hover:shadow-brand-xl p-8 border border-neutral-200/50 backdrop-blur-sm bg-white/95 hover-float transition-all duration-500 glass-effect-strong">
              {/* Enhanced Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">AI</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">CV Analysis Dashboard</h3>
                    <p className="text-sm text-neutral-500 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      Real-time processing
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-red-400 rounded-full hover:bg-red-500 transition-colors cursor-pointer" />
                  <div className="w-4 h-4 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-colors cursor-pointer" />
                  <div className="w-4 h-4 bg-green-400 rounded-full hover:bg-green-500 transition-colors cursor-pointer" />
                </div>
              </div>

              {/* Enhanced Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-base font-semibold text-neutral-700">Analysis Progress</span>
                  <span className="text-base text-primary-600 font-bold bg-primary-50 px-3 py-1 rounded-full">87%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-3 shadow-inner">
                  <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 h-3 rounded-full w-[87%] transition-all duration-1000 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Enhanced Results */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl border border-green-200/50 hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-base font-semibold text-green-800">Skills Match</span>
                  </div>
                  <span className="text-lg font-bold text-green-700 bg-green-200/50 px-3 py-1 rounded-full">95%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/50 hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-base font-semibold text-blue-800">Experience Level</span>
                  </div>
                  <span className="text-lg font-bold text-blue-700 bg-blue-200/50 px-4 py-1 rounded-full">Senior</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-xl border border-purple-200/50 hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-base font-semibold text-purple-800">Cultural Fit</span>
                  </div>
                  <span className="text-lg font-bold text-purple-700 bg-purple-200/50 px-4 py-1 rounded-full">Excellent</span>
                </div>
              </div>
            </div>

            {/* Enhanced Floating elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-primary-400 via-secondary-400 to-accent-400 rounded-3xl flex items-center justify-center shadow-brand-xl animate-bounce hover:animate-glow hover-scale transition-all duration-300">
              <span className="text-white font-bold text-xl">AI</span>
            </div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-accent-400 via-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center shadow-brand hover-scale hover-glow transition-all duration-300">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="absolute top-1/2 -right-8 w-6 h-6 bg-gradient-to-r from-primary-300 to-secondary-300 rounded-full animate-ping" />
            <div className="absolute bottom-1/4 -left-8 w-4 h-4 bg-gradient-to-r from-accent-300 to-primary-300 rounded-full animate-pulse" />

            {/* Enhanced Background glow */}
            <div className="absolute inset-0 bg-brand-gradient-soft rounded-2xl blur-3xl opacity-20 scale-110 animate-pulse" />
            <div className="absolute inset-0 bg-brand-gradient rounded-2xl blur-3xl opacity-5 scale-125" />
          </div>
        </div>
      </div>
    </section>
  );
};