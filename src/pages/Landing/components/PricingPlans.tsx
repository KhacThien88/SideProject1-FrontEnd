import React, { useState } from 'react';
import { Container } from '../../../components/common/Container';
import { PricingCard } from '../../../components/common/PricingCard';
import { ComparisonTable } from '../../../components/common/ComparisonTable';
import type { ComparisonRow } from '../../../components/common/ComparisonTable';

export const PricingPlans: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      plan: 'free' as const,
      name: 'FREE',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for individuals getting started',
      features: ['5 CV uploads per month', 'Basic job matching', 'Email support', 'Community access', 'Basic analytics'],
      isPopular: false,
      ctaText: 'Get Started',
    },
    {
      plan: 'pro' as const,
      name: 'PRO',
      price: { monthly: 29, yearly: 290 },
      description: 'Most popular for professionals',
      features: ['Unlimited CV uploads', 'Advanced AI matching', 'Priority support', 'API access', 'Advanced analytics'],
      isPopular: true,
      ctaText: 'Start Free Trial',
    },
    {
      plan: 'enterprise' as const,
      name: 'ENTERPRISE',
      price: { monthly: 'Custom', yearly: 'Custom' },
      description: 'For large organizations',
      features: ['Custom limits', 'White-label', 'Dedicated support', 'Custom integrations', 'Advanced reporting'],
      isPopular: false,
      ctaText: 'Contact Sales',
    },
  ];

  const comparison: ComparisonRow[] = [
    { feature: 'CV Uploads', free: '5/month', pro: 'Unlimited', enterprise: 'Custom' },
    { feature: 'Job Matching', free: 'Basic', pro: 'Advanced AI', enterprise: 'Custom AI' },
    { feature: 'Support', free: 'Email', pro: 'Priority', enterprise: 'Dedicated' },
    { feature: 'API Access', free: false, pro: true, enterprise: 'Custom' },
  ];

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-neutral-50">
      <Container>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Pricing</h2>
          <div className="inline-flex items-center gap-2 bg-white border border-neutral-200 rounded-full p-1">
            <button className={`px-4 py-1.5 rounded-full text-sm font-medium ${!isYearly ? 'bg-primary-500 text-white' : 'text-neutral-700'}`} onClick={() => setIsYearly(false)}>Monthly</button>
            <button className={`px-4 py-1.5 rounded-full text-sm font-medium ${isYearly ? 'bg-primary-500 text-white' : 'text-neutral-700'}`} onClick={() => setIsYearly(true)}>Yearly -20%</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {plans.map((p) => (
            <PricingCard key={p.plan} {...p} price={{ monthly: p.price.monthly, yearly: p.price.yearly }} />
          ))}
        </div>

        <ComparisonTable rows={comparison} />
      </Container>
    </section>
  );
};
