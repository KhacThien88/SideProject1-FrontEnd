import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { Counter } from '../../../components/common/Counter';
import {
  Users,
  Briefcase,
  TrendingUp,
  Award,
  Clock,
  Star,
} from 'lucide-react';

const statisticsData = [
  {
    id: 'users',
    icon: Users,
    value: 50000,
    suffix: '+',
    title: 'Người dùng đăng ký',
    description: 'Ứng viên tin tưởng sử dụng',
    color: 'text-primary-500',
    bgColor: 'bg-primary-100',
  },
  {
    id: 'jobs',
    icon: Briefcase,
    value: 15000,
    suffix: '+',
    title: 'Việc làm đã đăng',
    description: 'Cơ hội nghề nghiệp đa dạng',
    color: 'text-secondary-500',
    bgColor: 'bg-secondary-100',
  },
  {
    id: 'success',
    icon: TrendingUp,
    value: 85,
    suffix: '%',
    title: 'Tỷ lệ thành công',
    description: 'Ứng viên tìm được việc',
    color: 'text-accent-500',
    bgColor: 'bg-accent-100',
  },
  {
    id: 'companies',
    icon: Award,
    value: 2500,
    suffix: '+',
    title: 'Công ty đối tác',
    description: 'Doanh nghiệp uy tín',
    color: 'text-primary-500',
    bgColor: 'bg-primary-100',
  },
  {
    id: 'avgTime',
    icon: Clock,
    value: 14,
    title: 'Ngày trung bình',
    description: 'Thời gian tìm được việc',
    color: 'text-secondary-500',
    bgColor: 'bg-secondary-100',
  },
  {
    id: 'rating',
    icon: Star,
    value: 4.8,
    suffix: '/5',
    decimals: 1,
    title: 'Đánh giá người dùng',
    description: 'Mức độ hài lòng cao',
    color: 'text-accent-500',
    bgColor: 'bg-accent-100',
  },
];

export const Statistics: React.FC = () => {
  const { getContent } = useTranslation();

  return (
    <section className="py-20 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20" />
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-fluid animate-fade-in-scale">
          <h2 className="text-hierarchy-1 font-bold text-gray-900 animate-bounce-in animate-text-glow">
            {getContent('statistics.title')}
          </h2>
          <p className="text-hierarchy-3 text-gray-600 max-w-2xl mx-auto animate-slide-left stagger-1">
            {getContent('statistics.description')}
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-slide-up stagger-2">
          {statisticsData.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <div
                key={stat.id}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover-float hover:shadow-2xl glass-effect animate-bounce-in micro-scale micro-glow stagger-2"
                style={{ animationDelay: `${0.3 + index * 0.15}s` }}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </div>

                {/* Counter */}
                <div className="mb-4">
                  <Counter
                    end={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    className="text-4xl md:text-5xl font-bold text-white"
                  />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {stat.title}
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  {stat.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:to-accent-500/10 transition-all duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-neutral-300">
            <Clock className="w-5 h-5" />
            <span>Cập nhật thời gian thực • Dữ liệu tháng {new Date().getMonth() + 1}/{new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </section>
  );
};