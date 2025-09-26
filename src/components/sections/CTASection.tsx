import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { ArrowRight, Users, Briefcase, TrendingUp } from 'lucide-react';

const CTASection: React.FC = () => {
  const { getContent } = useTranslation();

  const stats = [
    {
      icon: Users,
      value: '10K+',
      label: 'Active Users',
    },
    {
      icon: Briefcase,
      value: '5K+',
      label: 'Job Matches',
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'Success Rate',
    },
  ];

  return (
    <section className="relative py-24 bg-brand-gradient overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-white/15 rounded-full blur-xl animate-pulse" style={{animationDelay: '0s'}} />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/12 rounded-full blur-lg animate-bounce" style={{animationDelay: '1s'}} />
      <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-white/8 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}} />
      <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-white/6 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center relative z-10">
          {/* Enhanced Main CTA Content */}
          <div className="mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold mb-8 animate-slide-up">
              <span className="w-2.5 h-2.5 bg-white rounded-full mr-3 animate-pulse" />
              🚀 Ready to Transform Your Career?
            </div>
            <h2 className="text-hierarchy-1 text-white mb-8 animate-fade-in-scale stagger-1">
              {getContent('cta.headline')}
            </h2>
            <p className="text-hierarchy-3 text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up stagger-2">
              {getContent('cta.subtitle')}
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up stagger-3">
              <button className="group bg-white text-primary-700 font-bold py-5 px-10 rounded-2xl hover:bg-white/95 hover:shadow-brand-xl hover-float transition-all duration-500 flex items-center text-lg">
                {getContent('cta.primaryCTA')}
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              <button className="group border-2 border-white/80 text-white font-bold py-5 px-10 rounded-2xl hover:bg-white hover:text-primary-700 hover:border-white hover:shadow-brand-xl hover-tilt glass-effect transition-all duration-500 text-lg">
                {getContent('cta.secondaryCTA')}
              </button>
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/15 backdrop-blur-md rounded-3xl p-8 hover:bg-white/25 hover:shadow-brand-xl hover-lift transition-all duration-500 animate-slide-up"
                  style={{animationDelay: `${0.4 + index * 0.1}s`}}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-white/25 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/35 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white mb-3">
                      {stat.value}
                    </div>
                    <div className="text-white/80 text-center font-medium text-lg">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced Trust Indicators */}
          <div className="mt-20 pt-12 border-t border-white/30">
            <p className="text-white/90 mb-8 text-lg font-medium animate-slide-up" style={{animationDelay: '0.7s'}}>{getContent('cta.trustMessage')}</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {/* Enhanced Company Logos Placeholder */}
              {['TechCorp', 'InnovateLab', 'FutureWorks', 'NextGen', 'ProSolutions'].map((company, i) => (
                <div
                  key={i}
                  className="w-32 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 hover:scale-105 transition-all duration-300 animate-slide-up"
                  style={{animationDelay: `${0.8 + i * 0.1}s`}}
                >
                  <span className="text-white font-bold text-sm">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;