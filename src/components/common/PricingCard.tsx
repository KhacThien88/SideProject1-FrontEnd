import React from 'react';
import { Button } from './Button';

export interface PricingCardProps {
  plan: 'free' | 'pro' | 'enterprise';
  name: string;
  price: { monthly: number | string; yearly: number | string };
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({ name, price, description, features, isPopular, ctaText }) => {
  const badge = isPopular ? (
    <div className="absolute -top-3 right-4 bg-accent-400 text-neutral-900 text-xs font-semibold px-2 py-1 rounded">Most Popular</div>
  ) : null;

  return (
    <div className={`relative rounded-2xl border p-6 bg-white ${isPopular ? 'border-primary-300 shadow-brand-strong' : 'border-neutral-200 hover:shadow-lg'} transition-all`}>
      {badge}
      <div className="text-xl font-bold text-neutral-900">{name}</div>
      <div className="text-sm text-neutral-600 mb-4">{description}</div>
      <div className="text-3xl font-extrabold text-neutral-900 mb-4">
        {typeof price.monthly === 'number' ? `$${price.monthly}` : price.monthly}
        <span className="text-sm font-medium text-neutral-600">/month</span>
      </div>
      <ul className="space-y-2 mb-6">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-neutral-700">
            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" /> {f}
          </li>
        ))}
      </ul>
      <Button variant={isPopular ? 'primary' : 'outline'} size="md" className="w-full">{ctaText}</Button>
    </div>
  );
};
