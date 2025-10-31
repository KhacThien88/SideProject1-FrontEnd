import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap, TrendingUp, Users } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useRouter } from '../Router';
import { useABTest } from '../../hooks/useABTest';
import { conversionTracker } from '../../utils/conversionTracking';

interface SmartCTAProps {
  variant?: 'primary' | 'secondary' | 'urgency' | 'scarcity';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  testId?: string;
  position?: string;
  showIcon?: boolean;
  fullWidth?: boolean;
}

const urgencyMessages = [
  'Join 10,000+ professionals today',
  'Limited spots available this month',
  'Start your free trial now',
  'Get instant access',
];

const scarcityMessages = [
  'Only 23 spots left',
  '147 people signed up today',
  'Limited time offer',
  'Early bird special',
];

export const SmartCTA: React.FC<SmartCTAProps> = ({
  variant = 'primary',
  size = 'lg',
  testId = 'default-cta',
  position = 'unknown',
  showIcon = true,
  fullWidth = false,
}) => {
  const { t } = useTranslation();
  const { navigate } = useRouter();
  const [urgencyMessage, setUrgencyMessage] = useState('');
  const [scarcityMessage, setScarcityMessage] = useState('');

  // A/B Testing for CTA text
  const { isVariant } = useABTest({
    testId,
    defaultVariant: 'control',
  });

  useEffect(() => {
    // Rotate urgency messages every 10 seconds
    const urgencyInterval = setInterval(() => {
      setUrgencyMessage(urgencyMessages[Math.floor(Math.random() * urgencyMessages.length)]);
    }, 10000);

    // Rotate scarcity messages every 8 seconds
    const scarcityInterval = setInterval(() => {
      setScarcityMessage(scarcityMessages[Math.floor(Math.random() * scarcityMessages.length)]);
    }, 8000);

    // Set initial messages
    setUrgencyMessage(urgencyMessages[0]);
    setScarcityMessage(scarcityMessages[0]);

    return () => {
      clearInterval(urgencyInterval);
      clearInterval(scarcityInterval);
    };
  }, []);

  const handleClick = () => {
    const ctaText = getCtaText();
    conversionTracker.trackCTAClick({
      ctaType: variant === 'primary' ? 'primary' : variant === 'secondary' ? 'secondary' : 'tertiary',
      ctaText,
      ctaLocation: position,
      section: `smart-cta-${testId}`,
      targetUrl: '/register',
    });
    navigate('/register');
  };

  const getCtaText = () => {
    if (isVariant('variant-a')) {
      return t.smartCTA?.variantA || 'Start Free Trial';
    } else if (isVariant('variant-b')) {
      return t.smartCTA?.variantB || 'Get Started Now';
    }
    return t.smartCTA?.control || 'Upload CV Now';
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-5 py-2.5 text-base';
      case 'lg':
        return 'px-6 py-3 text-lg';
      case 'xl':
        return 'px-8 py-4 text-xl';
      default:
        return 'px-6 py-3 text-lg';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl';
      case 'secondary':
        return 'bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 text-white shadow-lg hover:shadow-xl';
      case 'urgency':
        return 'bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800 text-white shadow-lg hover:shadow-xl animate-pulse';
      case 'scarcity':
        return 'bg-gradient-to-r from-error-600 to-accent-600 hover:from-error-700 hover:to-accent-700 text-white shadow-lg hover:shadow-xl';
      default:
        return 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl';
    }
  };

  const renderIcon = () => {
    if (!showIcon) return null;

    switch (variant) {
      case 'urgency':
        return <Zap className="w-5 h-5" />;
      case 'scarcity':
        return <TrendingUp className="w-5 h-5" />;
      case 'secondary':
        return <Users className="w-5 h-5" />;
      default:
        return <ArrowRight className="w-5 h-5" />;
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${fullWidth ? 'w-full' : ''}`}>
      {variant === 'urgency' && (
        <p className="text-sm text-accent-700 font-medium text-center animate-fadeIn">
          ⚡ {urgencyMessage}
        </p>
      )}
      {variant === 'scarcity' && (
        <p className="text-sm text-error-700 font-medium text-center animate-fadeIn">
          🔥 {scarcityMessage}
        </p>
      )}

      <button
        onClick={handleClick}
        className={`
          ${getVariantClasses()}
          ${getSizeClasses()}
          ${fullWidth ? 'w-full' : 'inline-flex'}
          items-center justify-center gap-2
          font-semibold rounded-lg
          transition-all duration-300
          transform hover:scale-105 hover:-translate-y-0.5
          focus:outline-none focus:ring-4 focus:ring-primary-500/50
          group
        `}
      >
        <span>{getCtaText()}</span>
        {renderIcon()}
      </button>

      {(variant === 'urgency' || variant === 'scarcity') && (
        <p className="text-xs text-neutral-600 text-center">
          {t.smartCTA?.noCredit || 'No credit card required'}
        </p>
      )}
    </div>
  );
};
