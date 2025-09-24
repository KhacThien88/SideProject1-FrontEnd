import React, { useState } from 'react';
import { Container } from '../../../components/common/Container';
import { PricingCard } from '../../../components/common/PricingCard';
import { ComparisonTable } from '../../../components/common/ComparisonTable';


const pricingPlans = {
  free: {
    plan: 'free' as const,
    name: 'FREE',
    price: { monthly: 0, yearly: 0 },
    description: 'Dành cho cá nhân mới bắt đầu',
    features: [
      'Tạo và quản lý 1 CV',
      'Phân tích CV cơ bản',
      'Tìm kiếm công việc cơ bản',
      'Hỗ trợ email',
      'Truy cập dashboard cơ bản'
    ],
    limitations: [
      'Giới hạn 5 lần apply/tháng',
      'Không có AI matching nâng cao',
      'Không có báo cáo chi tiết'
    ],
    ctaText: 'Bắt đầu miễn phí',
    ctaVariant: 'outline' as const,
    isPopular: false,
  },
  pro: {
    plan: 'pro' as const,
    name: 'PRO',
    price: { monthly: 299000, yearly: 2990000 },
    description: 'Dành cho chuyên gia và doanh nghiệp nhỏ',
    features: [
      'Tạo và quản lý không giới hạn CV',
      'AI phân tích CV nâng cao',
      'Smart matching với công việc',
      'Hỗ trợ ưu tiên 24/7',
      'Dashboard analytics chi tiết',
      'Tích hợp với LinkedIn',
      'Xuất CV định dạng premium',
      'Theo dõi trạng thái ứng tuyển'
    ],
    limitations: [
      'Giới hạn 100 lần apply/tháng',
      'Không có white-label'
    ],
    ctaText: 'Nâng cấp Pro',
    ctaVariant: 'primary' as const,
    isPopular: true,
  },
  enterprise: {
    plan: 'enterprise' as const,
    name: 'ENTERPRISE',
    price: { monthly: 999000, yearly: 9990000 },
    description: 'Dành cho doanh nghiệp lớn và tập đoàn',
    features: [
      'Tất cả tính năng Pro',
      'Không giới hạn apply',
      'API tích hợp tùy chỉnh',
      'White-label solution',
      'Dedicated account manager',
      'Custom AI training',
      'Advanced security & compliance',
      'Multi-tenant architecture',
      'Custom reporting & analytics',
      'SSO integration'
    ],
    limitations: [],
    ctaText: 'Liên hệ tư vấn',
    ctaVariant: 'secondary' as const,
    isPopular: false,
  },
};

export const PricingPlans: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const handleCtaClick = (plan: string) => {
    console.log(`CTA clicked for plan: ${plan}`);
    // Handle CTA action based on plan
    if (plan === 'free') {
      // Redirect to signup
    } else if (plan === 'pro') {
      // Redirect to payment
    } else if (plan === 'enterprise') {
      // Redirect to contact form
    }
  };

  return (
    <section className="py-20 bg-white">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16 space-y-fluid">
          <h2 className="text-hierarchy-1 text-neutral-900 mb-6 leading-tight animate-fade-in-scale">
            Chọn gói phù hợp với bạn
          </h2>
          <p className="text-hierarchy-3 text-neutral-600 max-w-4xl mx-auto leading-relaxed font-medium animate-slide-up stagger-1">
            Từ miễn phí đến doanh nghiệp, chúng tôi có giải pháp phù hợp cho mọi nhu cầu.
            Bắt đầu miễn phí và nâng cấp khi cần thiết.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-lg font-medium ${
              !isYearly ? 'text-blue-600' : 'text-gray-500'
            }`}>
              Hàng tháng
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg font-medium ${
              isYearly ? 'text-blue-600' : 'text-gray-500'
            }`}>
              Hàng năm
              <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Tiết kiệm 17%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <PricingCard
            {...pricingPlans.free}
            isYearly={isYearly}
            onCtaClick={() => handleCtaClick('free')}
          />
          <PricingCard
            {...pricingPlans.pro}
            isYearly={isYearly}
            onCtaClick={() => handleCtaClick('pro')}
          />
          <PricingCard
            {...pricingPlans.enterprise}
            isYearly={isYearly}
            onCtaClick={() => handleCtaClick('enterprise')}
          />
        </div>

        {/* Comparison Toggle */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            {showComparison ? 'Ẩn' : 'Xem'} bảng so sánh chi tiết
            <svg
              className={`w-4 h-4 transition-transform ${
                showComparison ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Comparison Table */}
        {showComparison && (
          <div className="animate-in slide-in-from-top-4 duration-300">
            <ComparisonTable features={[]} />
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Câu hỏi thường gặp
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">
                Tôi có thể thay đổi gói bất cứ lúc nào không?
              </h4>
              <p className="text-gray-600">
                Có, bạn có thể nâng cấp hoặc hạ cấp gói bất cứ lúc nào. Thay đổi sẽ có hiệu lực ngay lập tức.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">
                Có hỗ trợ hoàn tiền không?
              </h4>
              <p className="text-gray-600">
                Chúng tôi cung cấp chính sách hoàn tiền trong 30 ngày đầu nếu bạn không hài lòng với dịch vụ.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">
                Gói Enterprise có những tính năng gì đặc biệt?
              </h4>
              <p className="text-gray-600">
                Gói Enterprise bao gồm API tùy chỉnh, white-label, dedicated support và nhiều tính năng nâng cao khác.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">
                Làm sao để liên hệ hỗ trợ?
              </h4>
              <p className="text-gray-600">
                Bạn có thể liên hệ qua email, chat trực tuyến hoặc hotline. Gói Pro và Enterprise có hỗ trợ ưu tiên 24/7.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Sẵn sàng bắt đầu hành trình của bạn?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Tham gia cùng hàng nghìn người dùng đã tin tưởng nền tảng của chúng tôi
          </p>
          <button
            onClick={() => handleCtaClick('free')}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Bắt đầu miễn phí ngay
          </button>
        </div>
      </Container>
    </section>
  );
};