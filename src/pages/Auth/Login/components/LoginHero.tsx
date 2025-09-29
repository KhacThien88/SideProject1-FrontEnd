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
  const landingSections: LandingPageSection[] = [
    {
      name: 'Hero',
      title: 'TalentFit AI',
      description: 'Tìm việc làm phù hợp với AI - Nhanh, Chính xác, Hiệu quả',
      metric: 'AI-Powered',
      icon: Sparkles,
      gradient: 'from-primary-500 to-secondary-500',
      features: ['10,000+ người dùng tin tưởng', '95% độ chính xác AI', '10s xử lý nhanh chóng']
    },
    {
      name: 'Value Proposition',
      title: 'Giá trị cốt lõi',
      description: 'Nền tảng phân tích CV và ghép đôi việc làm thông minh',
      metric: '95% Accuracy',
      icon: Target,
      gradient: 'from-primary-600 to-primary-400',
      features: ['Phân tích CV tự động', 'Matching algorithm tiên tiến', 'Insights sâu sắc']
    },
    {
      name: 'Features Showcase',
      title: 'Tính năng nổi bật',
      description: 'Công nghệ AI tiên tiến cho ứng viên và nhà tuyển dụng',
      metric: 'Multi-Platform',
      icon: Zap,
      gradient: 'from-secondary-600 to-accent-500',
      features: ['Upload CV (PDF/Word)', 'Job matching thông minh', 'Apply trực tiếp']
    },
    {
      name: 'How It Works',
      title: 'Quy trình làm việc',
      description: 'Đơn giản, nhanh chóng và hiệu quả trong 3 bước',
      metric: '3 Steps',
      icon: BarChart3,
      gradient: 'from-accent-600 to-secondary-500',
      features: ['Upload CV', 'AI Analysis', 'Job Matching']
    },
    {
      name: 'Statistics',
      title: 'Thống kê ấn tượng',
      description: 'Con số chứng minh chất lượng và uy tín của nền tảng',
      metric: '10K+ Users',
      icon: TrendingUp,
      gradient: 'from-secondary-500 to-primary-600',
      features: ['Tỷ lệ thành công cao', 'Feedback tích cực', 'Phủ sóng toàn cầu']
    }
  ];

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
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-12 py-6 mb-8 mt-2 border border-white/20 w-4/5">
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
            <div className="flex items-center space-x-3 opacity-80 transition-all duration-300 hover:opacity-100">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white/80">10,000+ người dùng tin tưởng</span>
            </div>
            <div className="flex items-center space-x-3 opacity-80 transition-all duration-300 delay-75 hover:opacity-100">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <span className="text-white/80">95% độ chính xác AI</span>
            </div>
            <div className="flex items-center space-x-3 opacity-80 transition-all duration-300 delay-150 hover:opacity-100">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              <span className="text-white/80">10s xử lý nhanh chóng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};