import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { SmartCTA } from './SmartCTA';
import { UrgencyIndicator } from './UrgencyIndicator';

interface UserBehavior {
  visitCount: number;
  timeOnSite: number;
  scrollDepth: number;
  interactionCount: number;
  lastVisit: Date | null;
}

interface PersonalizedCTAProps {
  position?: string;
}

export const PersonalizedCTA: React.FC<PersonalizedCTAProps> = ({ position = 'hero' }) => {
  const { t } = useTranslation();
  const [userBehavior, setUserBehavior] = useState<UserBehavior>({
    visitCount: 0,
    timeOnSite: 0,
    scrollDepth: 0,
    interactionCount: 0,
    lastVisit: null,
  });
  const [ctaVariant, setCTAVariant] = useState<'primary' | 'urgency' | 'scarcity'>('primary');
  const [showUrgency, setShowUrgency] = useState(false);

  useEffect(() => {
    // Load user behavior from localStorage
    const storedBehavior = localStorage.getItem('userBehavior');
    if (storedBehavior) {
      const behavior = JSON.parse(storedBehavior);
      setUserBehavior({
        ...behavior,
        lastVisit: behavior.lastVisit ? new Date(behavior.lastVisit) : null,
      });
    }

    // Track visit
    const updatedBehavior = {
      ...userBehavior,
      visitCount: (userBehavior.visitCount || 0) + 1,
      lastVisit: new Date(),
    };
    setUserBehavior(updatedBehavior);
    localStorage.setItem('userBehavior', JSON.stringify(updatedBehavior));

    // Track time on site
    const startTime = Date.now();
    const timeInterval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      setUserBehavior((prev) => ({ ...prev, timeOnSite: timeSpent }));
    }, 5000);

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setUserBehavior((prev) => ({
        ...prev,
        scrollDepth: Math.max(prev.scrollDepth, scrollPercentage),
      }));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
      localStorage.setItem('userBehavior', JSON.stringify(userBehavior));
    };
  }, []);

  useEffect(() => {
    // Personalize CTA based on user behavior
    if (userBehavior.visitCount >= 3) {
      // Returning visitor - show urgency
      setCTAVariant('urgency');
      setShowUrgency(true);
    } else if (userBehavior.timeOnSite > 30) {
      // Engaged user - show scarcity
      setCTAVariant('scarcity');
      setShowUrgency(true);
    } else if (userBehavior.scrollDepth > 50) {
      // Deep scroll - show urgency
      setCTAVariant('urgency');
      setShowUrgency(true);
    }
  }, [userBehavior]);

  const getMessage = () => {
    if (userBehavior.visitCount >= 3) {
      return t.personalizedCTA?.returningVisitor || 'Welcome back! Ready to get started?';
    } else if (userBehavior.timeOnSite > 60) {
      return t.personalizedCTA?.engagedUser || 'You seem interested! Join thousands of satisfied users.';
    } else if (userBehavior.scrollDepth > 75) {
      return t.personalizedCTA?.deepScroll || 'You\'ve seen what we offer. Let\'s make it happen!';
    }
    return t.personalizedCTA?.newVisitor || 'Start your journey with AI-powered job matching';
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {showUrgency && userBehavior.visitCount >= 2 && (
        <UrgencyIndicator type="social-proof" userCount={147 + Math.floor(Math.random() * 50)} />
      )}

      <div className="text-center max-w-xl">
        <p className="text-lg text-neutral-700 mb-4">{getMessage()}</p>
      </div>

      <SmartCTA
        variant={ctaVariant}
        size="xl"
        testId={`personalized-${position}`}
        position={position}
        showIcon={true}
      />

      {showUrgency && userBehavior.timeOnSite > 45 && (
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <span className="inline-block w-2 h-2 bg-secondary-500 rounded-full animate-pulse" />
          <span>{t.personalizedCTA?.activity || '147 people joined in the last 24 hours'}</span>
        </div>
      )}
    </div>
  );
};
