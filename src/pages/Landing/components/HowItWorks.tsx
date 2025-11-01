import React, { useState } from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';
import {
  Upload,
  Brain,
  Target,
  Send,
  CheckCircle,
  MessageSquare,
  ArrowRight,
  Play,
  Sparkles,
} from 'lucide-react';

const processSteps = [
  {
    step: 1,
    icon: Upload,
    title: 'Upload CV',
    description: 'Tải lên CV của bạn (PDF/Word) - Hỗ trợ đa ngôn ngữ',
    details: [
      'Hỗ trợ PDF, Word, TXT',
      'Đa ngôn ngữ: Tiếng Việt, English',
      'Tự động detect format',
      'Preview trước khi upload',
    ],
    color: 'primary' as const,
  },
  {
    step: 2,
    icon: Brain,
    title: 'AI Phân tích',
    description: 'Trích xuất skills, kinh nghiệm, học vấn từ CV',
    details: [
      'OCR text extraction',
      'Skill recognition',
      'Experience parsing',
      'Education analysis',
    ],
    color: 'secondary' as const,
  },
  {
    step: 3,
    icon: Target,
    title: 'Job Matching',
    description: 'Tìm việc làm phù hợp dựa trên similarity',
    details: [
      'AI similarity matching',
      'Skill-based filtering',
      'Location preferences',
      'Salary range matching',
    ],
    color: 'accent' as const,
  },
  {
    step: 4,
    icon: Send,
    title: 'Apply Jobs',
    description: 'Ứng tuyển trực tiếp qua hệ thống',
    details: [
      'One-click apply',
      'Auto-fill application',
      'Cover letter generation',
      'Application tracking',
    ],
    color: 'primary' as const,
  },
  {
    step: 5,
    icon: CheckCircle,
    title: 'Get Hired',
    description: 'Nhận job offer từ nhà tuyển dụng',
    details: [
      'Interview scheduling',
      'Offer management',
      'Contract negotiation',
      'Onboarding support',
    ],
    color: 'secondary' as const,
  },
  {
    step: 6,
    icon: MessageSquare,
    title: 'Feedback',
    description: 'Cải thiện hệ thống dựa trên phản hồi',
    details: [
      'Success rate tracking',
      'User feedback collection',
      'Algorithm improvement',
      'Feature enhancement',
    ],
    color: 'accent' as const,
  },
];

export const HowItWorks: React.FC = () => {
  const { getContent } = useTranslation();
  const [, setActiveStep] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-white via-neutral-50/30 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-primary-100/20 to-secondary-100/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-tl from-accent-100/20 to-purple-100/15 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/3 w-64 h-64 bg-gradient-to-bl from-secondary-100/15 to-transparent rounded-full blur-2xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200/50 text-primary-700 text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            ✨ How It Works
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="text-brand-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500">
              {getContent('howItWorks.title')}
            </span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed font-medium">
            {getContent('howItWorks.subtitle')}
          </p>
        </div>

        {/* Enhanced Process Timeline */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid gap-8 lg:gap-12">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={step.step}
                  className={cn(
                    'group flex flex-col lg:flex-row items-center gap-8 lg:gap-12',
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  )}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Step Content */}
                  <div className={cn(
                    'flex-1 text-center lg:text-left',
                    isEven ? 'lg:text-right' : 'lg:text-left'
                  )}>
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-2xl border border-neutral-200/50 hover:border-neutral-300/50 transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2">
                      <div className="flex items-center justify-center lg:justify-start mb-6">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200/50 text-primary-700 text-sm font-semibold">
                          <span className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mr-2" />
                          Bước {step.step}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4 group-hover:text-primary-700 transition-colors">
                        {step.title}
                      </h3>
                      
                      <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Details List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.details.map((detail, detailIndex) => (
                          <div
                            key={detailIndex}
                            className="flex items-center text-sm text-neutral-600 group-hover:text-neutral-700 transition-colors"
                            style={{
                              animationDelay: `${detailIndex * 100}ms`
                            }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full mr-3 flex-shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Step Icon */}
                  <div className="relative flex-shrink-0">
                    <div className={cn(
                      'relative w-24 h-24 lg:w-32 lg:h-32 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-110',
                      step.color === 'primary' && 'bg-gradient-to-br from-primary-500 to-primary-600',
                      step.color === 'secondary' && 'bg-gradient-to-br from-secondary-500 to-secondary-600',
                      step.color === 'accent' && 'bg-gradient-to-br from-accent-500 to-accent-600'
                    )}>
                      {/* Glow effect */}
                      <div className={cn(
                        'absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-2xl',
                        step.color === 'primary' && 'bg-gradient-to-br from-primary-500 to-primary-600',
                        step.color === 'secondary' && 'bg-gradient-to-br from-secondary-500 to-secondary-600',
                        step.color === 'accent' && 'bg-gradient-to-br from-accent-500 to-accent-600'
                      )} />
                      
                      <Icon className="relative w-10 h-10 lg:w-12 lg:h-12 text-white" />
                      
                      {/* Step number */}
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-neutral-700 shadow-lg">
                        {step.step}
                      </div>
                    </div>
                    
                    {/* Connection line */}
                    {index < processSteps.length - 1 && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-neutral-300 to-transparent" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center">
          <div className="relative bg-gradient-to-br from-white via-neutral-50/50 to-white rounded-3xl shadow-2xl p-10 lg:p-12 max-w-4xl mx-auto border border-neutral-200/50 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-100/30 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary-100/30 to-transparent rounded-full blur-2xl" />
            
            <div className="relative">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200/50 text-primary-700 text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mr-2 animate-pulse" />
                🚀 Ready to Start
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
                <span className="text-brand-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                  Sẵn sàng bắt đầu
                </span>
                <br />
                <span className="text-neutral-800">hành trình của bạn?</span>
              </h3>
              
              <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Chỉ mất <span className="font-semibold text-primary-600">2 phút</span> để tạo tài khoản và upload CV đầu tiên
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span className="flex items-center">
                    🚀 Bắt đầu ngay
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="border-2 border-neutral-300 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 group"
                >
                  <span className="flex items-center">
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Xem demo
                  </span>
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-neutral-500">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Miễn phí đăng ký
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Bảo mật thông tin
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Hỗ trợ 24/7
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};