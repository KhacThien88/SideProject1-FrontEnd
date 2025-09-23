import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { Button } from '../../../components/common/Button';
import { Container } from '../../../components/common/Container';

export const HeroSection: React.FC = () => {
  const { getContent } = useTranslation();
  
  const heroContent = getContent('hero') || {
    headline: 'AI Resume Analyzer & Job Match Platform',
    subtitle: 'Tìm việc làm phù hợp với AI - Nhanh, Chính xác, Hiệu quả',
    ctaButtons: {
      uploadCV: 'Tải CV ngay',
      postJob: 'Đăng tin tuyển dụng',
      viewDemo: 'Xem demo',
    },
    trustIndicators: [
      '10,000+ người dùng tin tưởng',
      '95% độ chính xác',
      '10s xử lý nhanh chóng',
    ],
  };
  
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16 md:py-20 lg:py-28">
      <Container>
        <div className="text-center">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 mb-6 leading-tight tracking-tight">
            <span className="text-brand-gradient">
              {heroContent.headline}
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-base md:text-lg text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {heroContent.subtitle}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center mb-12">
            <Button 
              variant="primary" 
              size="lg" 
              href="/upload"
              className="w-full sm:w-auto shadow-lg"
            >
              {heroContent.ctaButtons.uploadCV}
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              href="/recruiter"
              className="w-full sm:w-auto shadow-lg"
            >
              {heroContent.ctaButtons.postJob}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              href="/demo"
              className="w-full sm:w-auto"
            >
              {heroContent.ctaButtons.viewDemo}
            </Button>
          </div>
          
          {/* Demo Video Placeholder */}
          <div className="mb-10">
            <div className="relative max-w-4xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-neutral-50 to-neutral-200 rounded-2xl shadow-brand overflow-hidden border border-neutral-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-neutral-600 font-medium">Demo Video Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-neutral-500">
            {heroContent.trustIndicators.map((indicator: string, index: number) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                <span className="font-medium">{indicator}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/4 w-14 h-14 bg-purple-200 rounded-full opacity-20 animate-pulse delay-3000"></div>
      </div>
    </section>
  );
};
