import React, { lazy, Suspense, useEffect } from 'react';
import { Navigation } from '../../components/layout/Navigation';
import { HeroSection } from './components/HeroSection';
import { useOnReveal } from '../../hooks/useOnReveal';
import { useSEO } from '../../hooks/useSEO';
import { useTranslation } from '../../hooks/useTranslation';
import { preloadCriticalResources, optimizeImages } from '../../utils/performance';
import { ConversionTrackingProvider } from '../../components/analytics/ConversionTrackingProvider';
import { ChatWidget } from '../../components/common/ChatWidget';
import { ExitIntentPopup } from '../../components/common/ExitIntentPopup';
// import { ScrollTriggeredEngagement } from '../../components/common/ScrollTriggeredEngagement';
// import { TimeBasedOffer } from '../../components/common/TimeBasedOffer';
import { MobileCTA } from '../../components/mobile/MobileCTA';

// Lazy load non-critical sections for better performance
const MultiPathCTA = lazy(() => import('../../components/common/MultiPathCTA').then(m => ({ default: m.MultiPathCTA })));
const ValueProposition = lazy(() => import('./components/ValueProposition'));
const FeaturesShowcase = lazy(() => import('./components/FeaturesShowcase'));
const HowItWorks = lazy(() => import('./components/HowItWorks').then(m => ({ default: m.HowItWorks })));
const TrustBadges = lazy(() => import('../../components/common/TrustBadges').then(m => ({ default: m.TrustBadges })));
const Statistics = lazy(() => import('./components/Statistics').then(m => ({ default: m.Statistics })));
const CustomerSuccessStories = lazy(() => import('../../components/common/CustomerSuccessStories').then(m => ({ default: m.CustomerSuccessStories })));
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const CaseStudyPreview = lazy(() => import('../../components/common/CaseStudyPreview').then(m => ({ default: m.CaseStudyPreview })));
const ReviewRatings = lazy(() => import('../../components/common/ReviewRatings').then(m => ({ default: m.ReviewRatings })));
const PricingPlans = lazy(() => import('./components/PricingPlans').then(m => ({ default: m.PricingPlans })));
const CTASection = lazy(() => import('../../components/sections/CTASection'));
const Footer = lazy(() => import('../../components/layout/Footer'));

// Loading fallback component
const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="animate-pulse text-neutral-400">Loading...</div>
  </div>
);

export const Landing: React.FC = () => {
  const { t } = useTranslation();

  // Apply SEO meta tags for landing page
  useSEO({
    title: t.seo.home.title,
    description: t.seo.home.description,
    keywords: t.seo.home.keywords,
    path: '/',
    type: 'website',
    image: '/images/og-image.jpg',
    imageAlt: t.seo.home.title,
  });

  // Performance optimizations
  useEffect(() => {
    // Preload critical resources
    preloadCriticalResources();

    // Optimize images after page load
    if (document.readyState === 'complete') {
      optimizeImages();
    } else {
      window.addEventListener('load', optimizeImages);
      return () => window.removeEventListener('load', optimizeImages);
    }
  }, []);

  useOnReveal('.reveal');

  return (
    <ConversionTrackingProvider enableScrollTracking={true}>
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Engagement Features - Optimized to reduce spam */}
        {/* ExitIntentPopup: Only shows when user tries to leave (high value, low intrusion) */}
        <ExitIntentPopup />

        {/* ScrollTriggeredEngagement: Disabled by default - uncomment if needed */}
        {/* <ScrollTriggeredEngagement scrollThreshold={60} /> */}

        {/* TimeBasedOffer: Disabled by default - too aggressive */}
        {/* <TimeBasedOffer delaySeconds={60} durationMinutes={10} /> */}

        {/* ChatWidget: Always available in corner (non-intrusive) */}
        <ChatWidget />

        {/* Mobile-optimized CTA: Shows after scroll on mobile (good UX) */}
        <MobileCTA variant="sticky" showOnScroll={true} scrollThreshold={500} />

        <main>
          {/* Critical above-the-fold content - loaded immediately */}
          <HeroSection />

          {/* Non-critical content - lazy loaded */}
          <Suspense fallback={<SectionLoader />}>
            <ValueProposition />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <FeaturesShowcase />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <HowItWorks />
          </Suspense>

          {/* Trust Badges - reinforces credibility */}
          <Suspense fallback={<SectionLoader />}>
            <TrustBadges />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Statistics />
          </Suspense>

          {/* Customer Success Stories - emotional engagement */}
          <Suspense fallback={<SectionLoader />}>
            <CustomerSuccessStories />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>

          {/* Case Studies - proof of value */}
          <Suspense fallback={<SectionLoader />}>
            <CaseStudyPreview />
          </Suspense>

          {/* Review Ratings - social validation */}
          <Suspense fallback={<SectionLoader />}>
            <ReviewRatings />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <PricingPlans />
          </Suspense>

          {/* Multi-Path CTA - Multiple conversion paths */}
          <Suspense fallback={<SectionLoader />}>
            <MultiPathCTA />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <CTASection />
          </Suspense>
        </main>

        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </div>
    </ConversionTrackingProvider>
  );
};