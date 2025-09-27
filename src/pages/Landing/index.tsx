import React from 'react';
import { Layout } from '../../components/common/Layout';
import { Navigation } from '../../components/ui/Navigation';
import Footer from '../../components/layout/Footer';
import { HeroSection } from './components/HeroSection';
import ValueProposition from './components/ValueProposition';
import FeaturesShowcase from './components/FeaturesShowcase';
import { HowItWorks } from './components/HowItWorks';
import { Statistics } from './components/Statistics';
import { useOnReveal } from '../../hooks/useOnReveal';

export const LandingPage: React.FC = () => {
  useOnReveal('.reveal');
  
  return (
    <Layout>
      <Navigation />
      <main className="page-max mx-auto">
        <HeroSection />
        <ValueProposition />
        <FeaturesShowcase />
        <HowItWorks />
      </main>
      <Statistics />
      <Footer />
    </Layout>
  );
};

// Export alias để khớp với import trong App.tsx
export { LandingPage as Landing };
export default LandingPage;
