import React, { useEffect, useState } from 'react';
import { Clock, Sparkles, X } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useRouter } from '../Router';
import { popupManager } from '../../utils/popupManager';

interface TimeBasedOfferProps {
  delaySeconds?: number;
  durationMinutes?: number;
}

export const TimeBasedOffer: React.FC<TimeBasedOfferProps> = ({
  delaySeconds = 30,
  durationMinutes = 15,
}) => {
  const { t } = useTranslation();
  const { navigate } = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (popupManager.canShow('time-based')) {
        setIsVisible(true);
        popupManager.markAsShown('time-based');
      }
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [delaySeconds]);

  useEffect(() => {
    if (!isVisible || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    setIsVisible(false);
    popupManager.markAsDismissed('time-based', false);
  };

  const handleCTA = () => {
    setIsVisible(false);
    popupManager.markAsClosed('time-based');
    navigate('/register');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-0 right-0 z-40 flex justify-center px-4">
      <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl shadow-2xl p-4 max-w-2xl w-full animate-slideDown relative">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Close offer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-lg">
                {t.timeBased?.title || 'Limited Time Offer!'}
              </p>
              <p className="text-sm text-white/90">
                {t.timeBased?.message || 'Get 50% off for the first 100 signups'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Clock className="w-4 h-4" />
              <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={handleCTA}
              className="px-6 py-2.5 bg-white text-accent-700 font-semibold rounded-lg hover:bg-neutral-50 transition-colors shadow-lg whitespace-nowrap"
            >
              {t.timeBased?.ctaButton || 'Claim Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
