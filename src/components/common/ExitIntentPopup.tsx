import React, { useEffect, useState } from 'react';
import { X, Gift, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useRouter } from '../Router';
import { popupManager } from '../../utils/popupManager';

interface ExitIntentPopupProps {
  onClose?: () => void;
}

export const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { navigate } = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse is leaving from top of page
      if (e.clientY <= 0 && popupManager.canShow('exit-intent')) {
        setIsVisible(true);
        popupManager.markAsShown('exit-intent');
      }
    };

    const checkExitIntent = () => {
      document.addEventListener('mouseout', handleMouseLeave);
    };

    // Wait 3 seconds before activating exit intent detection
    const timer = setTimeout(checkExitIntent, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    popupManager.markAsDismissed('exit-intent', false); // Temporary dismiss
    onClose?.();
  };

  const handleCTA = () => {
    setIsVisible(false);
    popupManager.markAsClosed('exit-intent');
    navigate('/register');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 animate-slideUp">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 text-neutral-600" />
        </button>

        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <Gift className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 text-center mb-3">
            {t.exitIntent?.title || 'Wait! Before You Go...'}
          </h2>

          <p className="text-neutral-600 text-center mb-6">
            {t.exitIntent?.subtitle || 'Get 30% off your first month and start finding the perfect candidates today!'}
          </p>

          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-secondary-500" />
              <span className="text-neutral-700">Free CV analysis for 30 days</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-secondary-500" />
              <span className="text-neutral-700">Unlimited job matching</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-secondary-500" />
              <span className="text-neutral-700">Priority customer support</span>
            </div>
          </div>

          <button
            onClick={handleCTA}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl"
          >
            {t.exitIntent?.ctaButton || 'Claim My Offer'}
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={handleClose}
            className="w-full mt-3 px-6 py-2 text-neutral-600 hover:text-neutral-800 text-sm transition-colors"
          >
            {t.exitIntent?.noThanks || 'No thanks, I\'ll pass'}
          </button>
        </div>
      </div>
    </div>
  );
};
