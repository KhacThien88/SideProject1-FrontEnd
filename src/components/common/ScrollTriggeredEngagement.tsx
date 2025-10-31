import React, { useEffect, useState } from 'react';
import { Zap, X } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useRouter } from '../Router';
import { popupManager } from '../../utils/popupManager';

interface ScrollBannerProps {
  scrollThreshold?: number;
  onDismiss?: () => void;
}

export const ScrollTriggeredEngagement: React.FC<ScrollBannerProps> = ({
  scrollThreshold = 50,
  onDismiss,
}) => {
  const { t } = useTranslation();
  const { navigate } = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercentage >= scrollThreshold && popupManager.canShow('scroll-triggered')) {
        setIsVisible(true);
        popupManager.markAsShown('scroll-triggered');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold]);

  const handleDismiss = () => {
    setIsVisible(false);
    popupManager.markAsDismissed('scroll-triggered', false);
    onDismiss?.();
  };

  const handleCTA = () => {
    setIsVisible(false);
    popupManager.markAsClosed('scroll-triggered');
    navigate('/register');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-sm animate-slideInRight">
      <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white rounded-xl shadow-2xl p-6 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">
              {t.scrollEngagement?.title || 'Still Exploring?'}
            </h3>
            <p className="text-sm text-white/90">
              {t.scrollEngagement?.message || 'Join thousands who found their dream job!'}
            </p>
          </div>
        </div>

        <button
          onClick={handleCTA}
          className="block w-full text-center px-5 py-2.5 bg-white text-primary-700 font-semibold rounded-lg hover:bg-neutral-50 transition-colors shadow-md"
        >
          {t.scrollEngagement?.ctaButton || 'Get Started Free'}
        </button>
      </div>
    </div>
  );
};
