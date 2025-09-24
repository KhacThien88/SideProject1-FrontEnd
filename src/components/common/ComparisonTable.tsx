import React from 'react';
import { Check, X, Crown } from 'lucide-react';

interface ComparisonFeature {
  feature: string;
  free: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
  description?: string;
}

interface ComparisonTableProps {
  features: ComparisonFeature[];
  className?: string;
}

const renderFeatureValue = (value: string | boolean, plan: 'free' | 'pro' | 'enterprise') => {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="w-5 h-5 text-green-600 mx-auto" />
    ) : (
      <X className="w-5 h-5 text-gray-400 mx-auto" />
    );
  }

  if (value === 'No' || value === 'Không') {
    return <X className="w-5 h-5 text-gray-400 mx-auto" />;
  }

  if (value === 'Yes' || value === 'Có') {
    return <Check className="w-5 h-5 text-green-600 mx-auto" />;
  }

  const getValueColor = () => {
    switch (plan) {
      case 'free':
        return 'text-gray-700';
      case 'pro':
        return 'text-blue-700 font-semibold';
      case 'enterprise':
        return 'text-green-700 font-semibold';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <span className={`text-sm ${getValueColor()}`}>
      {value}
    </span>
  );
};

const getPlanHeaderStyle = (plan: 'free' | 'pro' | 'enterprise') => {
  switch (plan) {
    case 'free':
      return 'bg-gray-50 border-gray-200';
    case 'pro':
      return 'bg-blue-50 border-blue-200';
    case 'enterprise':
      return 'bg-green-50 border-green-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  features,
  className = '',
}) => {
  return (
    <div className={`overflow-x-auto rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
      {/* Table Header */}
      <div className="grid grid-cols-4 border-b border-gray-200 min-w-[600px] sm:min-w-[800px]">
        <div className="p-3 sm:p-4 md:p-6 bg-gray-50 border-r border-gray-200 min-w-[140px] sm:min-w-[200px]">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">Tính năng</h3>
        </div>
        <div className={`p-3 sm:p-4 md:p-6 border-r border-gray-200 text-center min-w-[120px] sm:min-w-[150px] ${getPlanHeaderStyle('free')}`}>
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">FREE</h3>
          <p className="text-xs sm:text-xs md:text-sm text-gray-600 mt-1">Miễn phí</p>
        </div>
        <div className={`p-3 sm:p-4 md:p-6 border-r border-gray-200 text-center min-w-[120px] sm:min-w-[150px] ${getPlanHeaderStyle('pro')}`}>
          <div className="flex items-center justify-center mb-2">
            <Crown className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-600 mr-1 sm:mr-1 md:mr-2" />
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">PRO</h3>
          </div>
          <p className="text-xs sm:text-xs md:text-sm text-gray-600">$29/tháng</p>
        </div>
        <div className={`p-3 sm:p-4 md:p-6 text-center min-w-[120px] sm:min-w-[150px] ${getPlanHeaderStyle('enterprise')}`}>
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">ENTERPRISE</h3>
          <p className="text-xs sm:text-xs md:text-sm text-gray-600 mt-1">Tùy chỉnh</p>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200 min-w-[600px] sm:min-w-[800px]">
        {features.map((feature, index) => (
          <div
            key={index}
            className="grid grid-cols-4 hover:bg-gray-50 transition-colors duration-300"
          >
            {/* Feature Name */}
            <div className="p-3 sm:p-4 md:p-6 border-r border-gray-200 min-w-[140px] sm:min-w-[200px]">
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm md:text-base font-medium text-gray-900">
                  {feature.feature}
                </span>
                {feature.description && (
                  <span className="text-xs sm:text-xs md:text-sm text-gray-500 mt-1">
                    {feature.description}
                  </span>
                )}
              </div>
            </div>

            {/* Free Plan */}
            <div className="p-3 sm:p-4 md:p-6 border-r border-gray-200 text-center min-w-[120px] sm:min-w-[150px]">
              {renderFeatureValue(feature.free, 'free')}
            </div>

            {/* Pro Plan */}
            <div className="p-3 sm:p-4 md:p-6 border-r border-gray-200 text-center bg-blue-50/30 min-w-[120px] sm:min-w-[150px]">
              {renderFeatureValue(feature.pro, 'pro')}
            </div>

            {/* Enterprise Plan */}
            <div className="p-3 sm:p-4 md:p-6 text-center bg-green-50/30 min-w-[120px] sm:min-w-[150px]">
              {renderFeatureValue(feature.enterprise, 'enterprise')}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="p-3 sm:p-4 md:p-6 bg-gray-50 border-t border-gray-200 min-w-[600px] sm:min-w-[800px]">
        <p className="text-xs md:text-sm text-gray-600 text-center">
          Tất cả các gói đều bao gồm hỗ trợ khách hàng và cập nhật miễn phí.
          <br className="hidden md:block" />
          <span className="md:hidden"> </span>
          Liên hệ với chúng tôi để biết thêm chi tiết về gói Enterprise.
        </p>
      </div>
    </div>
  );
};

// Default comparison features
export const defaultComparisonFeatures: ComparisonFeature[] = [
  {
    feature: 'Tải lên CV',
    free: '5/tháng',
    pro: 'Không giới hạn',
    enterprise: 'Tùy chỉnh',
    description: 'Số lượng CV có thể tải lên mỗi tháng'
  },
  {
    feature: 'Phân tích AI',
    free: 'Cơ bản',
    pro: 'Nâng cao',
    enterprise: 'Tùy chỉnh AI',
    description: 'Mức độ phân tích và gợi ý từ AI'
  },
  {
    feature: 'Hỗ trợ khách hàng',
    free: 'Email',
    pro: 'Ưu tiên',
    enterprise: 'Chuyên biệt',
    description: 'Loại hình hỗ trợ khách hàng'
  },
  {
    feature: 'Truy cập API',
    free: false,
    pro: true,
    enterprise: true,
    description: 'Khả năng tích hợp với hệ thống khác'
  },
  {
    feature: 'Báo cáo phân tích',
    free: 'Cơ bản',
    pro: 'Nâng cao',
    enterprise: 'Tùy chỉnh',
    description: 'Mức độ chi tiết của báo cáo'
  },
  {
    feature: 'White-label',
    free: false,
    pro: false,
    enterprise: true,
    description: 'Tùy chỉnh thương hiệu riêng'
  },
  {
    feature: 'SSO Integration',
    free: false,
    pro: false,
    enterprise: true,
    description: 'Đăng nhập một lần với hệ thống doanh nghiệp'
  },
  {
    feature: 'Tích hợp tùy chỉnh',
    free: false,
    pro: 'Giới hạn',
    enterprise: 'Đầy đủ',
    description: 'Khả năng tích hợp với các hệ thống khác'
  },
];