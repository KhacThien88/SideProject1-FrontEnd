import React, { useEffect, useState } from 'react';
import { Clock, Users, TrendingUp, Flame } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface UrgencyIndicatorProps {
  type: 'countdown' | 'social-proof' | 'limited-spots' | 'trending';
  endTime?: Date;
  userCount?: number;
  spotsLeft?: number;
}

export const UrgencyIndicator: React.FC<UrgencyIndicatorProps> = ({
  type,
  endTime,
  userCount = 147,
  spotsLeft = 23,
}) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (type === 'countdown' && endTime) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime.getTime() - now;

        if (distance < 0) {
          setTimeLeft('Expired');
          clearInterval(interval);
          return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [type, endTime]);

  const renderIndicator = () => {
    switch (type) {
      case 'countdown':
        return (
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-accent-500 to-error-500 text-white rounded-lg shadow-lg animate-pulse">
            <Clock className="w-5 h-5" />
            <div>
              <p className="text-xs font-medium opacity-90">
                {t.urgency?.countdown?.label || 'Offer ends in'}
              </p>
              <p className="text-lg font-bold font-mono">{timeLeft}</p>
            </div>
          </div>
        );

      case 'social-proof':
        return (
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-secondary-500 to-primary-500 text-white rounded-lg shadow-lg">
            <Users className="w-5 h-5" />
            <div>
              <p className="text-lg font-bold">{userCount}</p>
              <p className="text-xs font-medium opacity-90">
                {t.urgency?.socialProof?.label || 'people signed up today'}
              </p>
            </div>
          </div>
        );

      case 'limited-spots':
        return (
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-error-500 to-accent-500 text-white rounded-lg shadow-lg animate-bounce">
            <Flame className="w-5 h-5" />
            <div>
              <p className="text-lg font-bold">
                {t.urgency?.limitedSpots?.only || 'Only'} {spotsLeft} {t.urgency?.limitedSpots?.left || 'spots left'}
              </p>
              <p className="text-xs font-medium opacity-90">
                {t.urgency?.limitedSpots?.subtitle || 'for this month'}
              </p>
            </div>
          </div>
        );

      case 'trending':
        return (
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg shadow-lg">
            <TrendingUp className="w-5 h-5" />
            <div>
              <p className="text-xs font-medium opacity-90">
                {t.urgency?.trending?.label || 'Trending'}
              </p>
              <p className="text-lg font-bold">
                {t.urgency?.trending?.text || '#1 Most Popular'}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="animate-fadeIn">{renderIndicator()}</div>;
};

interface UrgencyBannerProps {
  message: string;
  type?: 'info' | 'warning' | 'success';
  showIcon?: boolean;
}

export const UrgencyBanner: React.FC<UrgencyBannerProps> = ({
  message,
  type = 'warning',
  showIcon = true,
}) => {
  const getTypeClasses = () => {
    switch (type) {
      case 'info':
        return 'bg-primary-50 border-primary-200 text-primary-800';
      case 'warning':
        return 'bg-accent-50 border-accent-200 text-accent-800';
      case 'success':
        return 'bg-secondary-50 border-secondary-200 text-secondary-800';
      default:
        return 'bg-accent-50 border-accent-200 text-accent-800';
    }
  };

  return (
    <div
      className={`
        ${getTypeClasses()}
        px-4 py-3 rounded-lg border-2
        flex items-center gap-3
        animate-slideDown
      `}
    >
      {showIcon && <Flame className="w-5 h-5 flex-shrink-0" />}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};
