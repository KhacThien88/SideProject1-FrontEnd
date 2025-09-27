import React, { useState } from 'react';
import { User, Building, Settings, Globe, Smartphone, Code, Users, Briefcase, Brain, Target, MessageSquare, Phone } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import { cn } from '../../../utils/cn';

// Removed unused interfaces

// const userFeatures: UserFeature[] = [
//   {
//     type: 'candidate',
//     title: 'Cho Ứng viên',
//     icon: User,
//     features: [
//       'Upload CV (PDF/Word)',
//       'AI phân tích tự động',
//       'Job matching thông minh',
//       'Apply trực tiếp',
//     ],
//     color: 'primary',
//   },
//   {
//     type: 'recruiter',
//     title: 'Cho Nhà tuyển dụng',
//     icon: Building,
//     features: [
//       'Đăng tin tuyển dụng',
//       'Tìm CV phù hợp',
//       'Quản lý ứng viên',
//       'Analytics & reports',
//     ],
//     color: 'secondary',
//   },
//   {
//     type: 'admin',
//     title: 'Cho Admin',
//     icon: Settings,
//     features: [
//       'User management',
//       'System monitoring',
//       'Content moderation',
//       'Reports & analytics',
//     ],
//     color: 'accent',
//   },
// ];

// const platforms: Platform[] = [
//   { name: 'Web App', icon: Globe, description: 'React Application' },
//   { name: 'Slack Bot', icon: MessageSquare, description: 'Team Integration' },
//   { name: 'WhatsApp', icon: MessageSquare, description: 'Mobile Access' },
//   { name: 'API', icon: Code, description: 'Developer Access' },
// ];

const FeaturesShowcase: React.FC = () => {
  const { getContent } = useTranslation();
  const [activeTab, setActiveTab] = useState('candidates');

  // Features data for each tab
  const features = {
    candidates: [
      {
        icon: User,
        title: getContent('featuresShowcase.candidates.upload.title'),
        description: getContent('featuresShowcase.candidates.upload.description')
      },
      {
        icon: Brain,
        title: getContent('featuresShowcase.candidates.analysis.title'),
        description: getContent('featuresShowcase.candidates.analysis.description')
      },
      {
        icon: Target,
        title: getContent('featuresShowcase.candidates.matching.title'),
        description: getContent('featuresShowcase.candidates.matching.description')
      }
    ],
    recruiters: [
      {
        icon: Building,
        title: getContent('featuresShowcase.recruiters.posting.title'),
        description: getContent('featuresShowcase.recruiters.posting.description')
      },
      {
        icon: Users,
        title: getContent('featuresShowcase.recruiters.search.title'),
        description: getContent('featuresShowcase.recruiters.search.description')
      },
      {
        icon: Settings,
        title: getContent('featuresShowcase.recruiters.management.title'),
        description: getContent('featuresShowcase.recruiters.management.description')
      }
    ],
    admins: [
      {
        icon: Settings,
        title: getContent('featuresShowcase.admins.users.title'),
        description: getContent('featuresShowcase.admins.users.description')
      },
      {
        icon: Globe,
        title: getContent('featuresShowcase.admins.monitoring.title'),
        description: getContent('featuresShowcase.admins.monitoring.description')
      },
      {
        icon: Code,
        title: getContent('featuresShowcase.admins.analytics.title'),
        description: getContent('featuresShowcase.admins.analytics.description')
      }
    ]
  };

  // Platform support data
  const platformSupport = [
    { name: 'Web App', icon: Globe },
    { name: 'Mobile', icon: Smartphone },
    { name: 'API', icon: Code },
    { name: 'Slack', icon: MessageSquare },
    { name: 'WhatsApp', icon: Phone },
    { name: 'Teams', icon: Users }
  ];

  const tabs = [
    {
      id: 'candidates',
      key: 'featuresShowcase.tabs.candidates',
      icon: Users,
      color: 'primary',
      gradient: 'from-primary-500 to-primary-600',
      bgGradient: 'from-primary-50 to-primary-100/50',
    },
    {
      id: 'recruiters',
      key: 'featuresShowcase.tabs.recruiters',
      icon: Briefcase,
      color: 'secondary',
      gradient: 'from-secondary-500 to-secondary-600',
      bgGradient: 'from-secondary-50 to-secondary-100/50',
    },
    {
      id: 'admins',
      key: 'featuresShowcase.tabs.admins',
      icon: Settings,
      color: 'accent',
      gradient: 'from-accent-500 to-accent-600',
      bgGradient: 'from-accent-50 to-accent-100/50',
    },
  ];



  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 relative overflow-hidden">
      {/* Enhanced Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-100/30 to-secondary-100/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent-100/25 to-primary-100/15 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4 animate-pulse" style={{animationDelay: '3s'}} />
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-gradient-to-r from-secondary-100/15 to-accent-100/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '5s'}} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-fluid">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200/50 text-primary-700 text-sm font-semibold mb-8 animate-fade-in-scale stagger-1 glass-effect hover-float">
            <span className="w-2.5 h-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mr-3 animate-shimmer" />
            ✨ Features Overview
          </div>
  
          <h2 className="text-hierarchy-2 font-bold text-neutral-900 mb-6 sm:mb-8 animate-slide-down stagger-2">
            <span className="text-brand-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 hover-gradient">
              {getContent('featuresShowcase.title').split(' ').slice(0, 2).join(' ')}
            </span>
            <br />
            <span className="text-neutral-800">
              {getContent('featuresShowcase.title').split(' ').slice(2).join(' ')}
            </span>
          </h2>
          <p className="text-hierarchy-3 text-neutral-600 max-w-4xl mx-auto font-medium animate-fade-in-scale stagger-3">
            {getContent('featuresShowcase.subtitle')}
          </p>
        </div>

        {/* Enhanced Tabs */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'group flex items-center space-x-3 sm:space-x-4 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-500 relative overflow-hidden w-full sm:w-auto justify-center sm:justify-start animate-rotate-in glass-effect',
                  isActive
                    ? `bg-gradient-to-r ${tab.gradient} text-white shadow-brand scale-105 transform hover-glow`
                    : 'bg-white text-neutral-600 hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100 border-2 border-neutral-200/50 hover:border-neutral-300/50 shadow-soft hover:shadow-brand hover-tilt',
                  `stagger-${Math.min(index + 4, 6)}`
                )}
              >
                {/* Background glow for active tab */}
                {isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} opacity-20 blur-xl`} />
                )}
                
                <div className={cn(
                  'relative p-2 rounded-xl transition-all duration-300',
                  isActive 
                    ? 'bg-white/20' 
                    : `bg-gradient-to-br ${tab.bgGradient} group-hover:scale-110`
                )}>
                  <Icon className={cn(
                    'w-6 h-6 transition-all duration-300',
                    isActive 
                      ? 'text-white' 
                      : `text-${tab.color}-600 group-hover:scale-110`
                  )} />
                </div>
                
                <span className="relative text-base sm:text-lg">{getContent(tab.key)}</span>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Enhanced Content */}
        <div className="relative">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                className={cn(
                  'transition-all duration-700',
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute inset-0 pointer-events-none'
                )}
              >
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                  {/* Enhanced Features List */}
                  <div className="space-y-6 sm:space-y-8">
                    {features[tab.id as keyof typeof features]?.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div
                          key={index}
                          className={cn(
                            "group flex items-start space-x-4 sm:space-x-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/60 backdrop-blur-sm border border-neutral-200/50 hover:border-primary-200/50 shadow-soft hover:shadow-brand-xl transition-all duration-500 animate-fade-in-scale glass-effect hover-float",
                            `stagger-${Math.min(index + 6, 6)}`
                          )}
                        >
                          <div className={cn(
                            'flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-brand hover-scale hover-glow transition-all duration-300 glass-effect-strong',
                            `bg-gradient-to-r ${tab.gradient}`
                          )}>
                            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-hierarchy-4 font-bold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                              {feature.title}
                            </h3>
                            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed group-hover:text-neutral-700 transition-colors duration-300">
                              {feature.description}
                            </p>
                          </div>
                          {/* Enhanced Hover effect */}
                          <div className="absolute inset-0 bg-brand-gradient-soft rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Enhanced Platform Support */}
                  <div className="bg-gradient-to-br from-white/80 to-neutral-50/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-neutral-200/50 shadow-brand hover:shadow-brand-xl transition-all duration-500 animate-slide-down glass-effect hover-tilt stagger-6">
                    <div className="text-center mb-8 space-y-fluid">
                      <h3 className="text-hierarchy-4 font-bold text-neutral-900 mb-4 sm:mb-6 text-center">
                        {getContent('features.platformSupport.title')}
                      </h3>
                      <p className="text-neutral-600">
                        {getContent('features.platformSupport.description')}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                      {platformSupport.map((platform, index) => {
                        return (
                          <div
                            key={platform.name}
                            className={cn(
                              "group flex flex-col items-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/60 border border-neutral-200/30 hover:border-primary-200/50 shadow-soft hover:shadow-brand transition-all duration-300 glass-effect hover-float animate-rotate-in",
                              `stagger-${Math.min(index + 1, 6)}`
                            )}
                          >
                            <div className={cn(
                               'w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-soft group-hover:shadow-brand hover-scale transition-all duration-300 glass-effect-strong',
                               'bg-gradient-to-r from-primary-500 to-secondary-500'
                             )}>
                              {platform.name === 'Web App' && <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-white" />}
                              {platform.name === 'Mobile' && <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />}
                              {platform.name === 'API' && <Code className="w-6 h-6 sm:w-8 sm:h-8 text-white" />}
                              {platform.name === 'Slack' && <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />}
                              {platform.name === 'WhatsApp' && <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />}
                              {platform.name === 'Teams' && <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />}
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-neutral-700 group-hover:text-primary-700 transition-colors duration-300 text-center">
                               {platform.name}
                             </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;