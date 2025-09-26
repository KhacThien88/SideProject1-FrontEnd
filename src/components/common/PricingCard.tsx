import React from 'react';
import { Check, Crown, Star } from 'lucide-react';
import { Button } from './Button';

interface PricingCardProps {
  plan: 'free' | 'pro' | 'enterprise';
  name: string;
  price: {
    monthly: number | string;
    yearly: number | string;
  };
  description: string;
  features: string[];
  limitations?: string[];
  ctaText: string;
  ctaVariant: 'primary' | 'secondary' | 'outline';
  isPopular?: boolean;
  isYearly?: boolean;
  onCtaClick?: () => void;
}

const getPlanColors = (plan: string, isPopular: boolean) => {
  if (isPopular) {
    return {
      border: 'border-blue-500',
      background: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      badge: 'bg-blue-600 text-white',
      icon: 'text-blue-600',
    };
  }

  switch (plan) {
    case 'free':
      return {
        border: 'border-gray-200',
        background: 'bg-white',
        badge: 'bg-gray-100 text-gray-800',
        icon: 'text-gray-600',
      };
    case 'enterprise':
      return {
        border: 'border-green-200',
        background: 'bg-gradient-to-br from-green-50 to-emerald-50',
        badge: 'bg-green-100 text-green-800',
        icon: 'text-green-600',
      };
    default:
      return {
        border: 'border-gray-200',
        background: 'bg-white',
        badge: 'bg-gray-100 text-gray-800',
        icon: 'text-gray-600',
      };
  }
};

const formatPrice = (price: number | string) => {
  if (typeof price === 'string') {
    return price;
  }
  return price === 0 ? 'Miễn phí' : `$${price}`;
};

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  name,
  price,
  description,
  features,
  limitations = [],
  ctaText,
  ctaVariant,
  isPopular = false,
  isYearly = false,
  onCtaClick,
}) => {
  const colors = getPlanColors(plan, isPopular);
  const currentPrice = isYearly ? price.yearly : price.monthly;
  const savings = isYearly && typeof price.monthly === 'number' && typeof price.yearly === 'number' 
    ? Math.round(((price.monthly * 12 - price.yearly) / (price.monthly * 12)) * 100)
    : 0;

  return (
    <div className={`relative p-6 md:p-8 rounded-2xl border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:scale-105 group animate-fade-in ${colors.border} ${colors.background}`}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 animate-bounce">
          <div className={`flex items-center px-4 py-2 rounded-full ${colors.badge} shadow-lg transition-all duration-300 group-hover:shadow-xl`}>
            <Star className="w-4 h-4 mr-2 fill-current" />
            <span className="text-sm font-semibold">Phổ biến nhất</span>
          </div>
        </div>
      )}

      {/* Plan Icon */}
      <div className="flex justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
        {plan === 'enterprise' ? (
          <Crown className={`w-12 h-12 ${colors.icon}`} />
        ) : (
          <div className={`w-12 h-12 rounded-full ${colors.badge} flex items-center justify-center`}>
            <span className="text-xl font-bold">
              {name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Plan Name */}
      <div className="text-center mb-4">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-blue-600">{name}</h3>
        <p className="text-sm md:text-base text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{description}</p>
      </div>

      {/* Price */}
      <div className="text-center mb-6 md:mb-8">
        <div className="flex items-baseline justify-center">
          <span className="text-3xl md:text-4xl font-bold text-gray-900 transition-all duration-300 group-hover:text-blue-600 group-hover:scale-110">
            {formatPrice(currentPrice)}
          </span>
          {typeof currentPrice === 'number' && currentPrice > 0 && (
            <span className="text-sm md:text-base text-gray-600 ml-2 transition-colors duration-300 group-hover:text-gray-600">/tháng</span>
          )}
        </div>
        {isYearly && savings > 0 && (
          <div className="mt-2">
            <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full transition-all duration-300 group-hover:text-green-700 group-hover:scale-105">
              Tiết kiệm {savings}%
            </span>
          </div>
        )}
        {isYearly && typeof price.monthly === 'number' && price.monthly > 0 && (
          <div className="mt-1">
            <span className="text-sm text-gray-500 line-through">
              ${price.monthly * 12}/năm
            </span>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="mb-6 md:mb-8">
        <ul className="space-y-3 md:space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start transition-all duration-300 hover:translate-x-1" style={{ animationDelay: `${index * 100}ms` }}>
              <Check className={`w-4 h-4 md:w-5 md:h-5 ${colors.icon} mr-3 mt-0.5 flex-shrink-0 transition-all duration-300 group-hover:scale-110`} />
              <span className="text-sm md:text-base text-gray-700 transition-colors duration-300 group-hover:text-gray-800">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Limitations */}
        {limitations.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Giới hạn:</h4>
            <ul className="space-y-2">
              {limitations.map((limitation, index) => (
                <li key={index} className="flex items-start transition-all duration-300 hover:translate-x-1" style={{ animationDelay: `${(features.length + index) * 100}ms` }}>
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0 transition-all duration-300 group-hover:bg-gray-500" />
                  <span className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-600">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* CTA Button */}
      <Button
        variant={ctaVariant}
        size="lg"
        className="w-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105 transform"
        onClick={onCtaClick}
      >
        {ctaText}
      </Button>

      {/* Free Trial Note */}
      {plan === 'pro' && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Dùng thử miễn phí 14 ngày
        </p>
      )}
    </div>
  );
};