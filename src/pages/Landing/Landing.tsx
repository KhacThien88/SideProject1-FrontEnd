import React from 'react';
import { Navigation } from '../../components/layout/Navigation';
import { HeroSection } from './components/HeroSection';
import { Testimonials } from './components/Testimonials';
import { PricingPlans } from './components/PricingPlans';
import ValueProposition from './components/ValueProposition';
import FeaturesShowcase from './components/FeaturesShowcase';
import { HowItWorks } from './components/HowItWorks';
import { Statistics } from './components/Statistics';
import CTASection from '../../components/sections/CTASection';
import Footer from '../../components/layout/Footer';
import { useOnReveal } from '../../hooks/useOnReveal';

export const Landing: React.FC = () => {
  useOnReveal('.reveal');
  
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <ValueProposition />
        <FeaturesShowcase />
        <HowItWorks />
        <Statistics />
        <Testimonials />
        <PricingPlans />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};