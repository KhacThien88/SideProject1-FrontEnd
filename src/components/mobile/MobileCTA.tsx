import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useRouter } from '../Router';
import { conversionTracker } from '../../utils/conversionTracking';

interface MobileCTAProps {
  variant?: 'sticky' | 'floating' | 'banner';
  showOnScroll?: boolean;
  scrollThreshold?: number;
}

export const MobileCTA: React.FC<MobileCTAProps> = ({
  variant = 'sticky',
  showOnScroll = true,
  scrollThreshold = 200,
}) => {
  const { t } = useTranslation();
  const { navigate } = useRouter();
  const [isVisible, setIsVisible] = useState(!showOnScroll);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (!showOnScroll) return;

    const handleScroll = () => {
      const scrolled = window.scrollY > scrollThreshold;
      setIsVisible(scrolled && !isDismissed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showOnScroll, scrollThreshold, isDismissed]);

  const handleClick = () => {
    conversionTracker.trackCTAClick({
      ctaType: 'primary',
      ctaText: t.mobileCTA?.upload || 'Upload CV',
      ctaLocation: `mobile-cta-${variant}`,
      section: 'mobile',
      targetUrl: '/register',
    });
    navigate('/register');
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  if (variant === 'sticky') {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 shadow-2xl animate-slideUp">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={handleClick}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg active:scale-95 transition-transform touch-target"
          >
            <Upload className="w-5 h-5" />
            <span>{t.mobileCTA?.upload || 'Upload CV'}</span>
          </button>
          <button
            onClick={handleDismiss}
            className="p-3 text-neutral-600 hover:text-neutral-800 active:bg-neutral-100 rounded-lg touch-target"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'floating') {
    return (
      <div className="md:hidden fixed bottom-20 right-4 z-40 animate-slideInRight">
        <button
          onClick={handleClick}
          className="flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-full shadow-2xl active:scale-95 transition-transform touch-target"
        >
          <Upload className="w-5 h-5" />
          <span>{t.mobileCTA?.upload || 'Upload CV'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="md:hidden w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-3 animate-slideDown">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold mb-1">
            {t.mobileCTA?.title || 'Start Your Career Journey'}
          </p>
          <p className="text-xs opacity-90">
            {t.mobileCTA?.subtitle || 'Upload CV and find jobs'}
          </p>
        </div>
        <button
          onClick={handleClick}
          className="px-5 py-2.5 bg-white text-primary-700 font-semibold rounded-lg active:scale-95 transition-transform touch-target ml-3"
        >
          {t.mobileCTA?.start || 'Start'}
        </button>
      </div>
    </div>
  );
};
