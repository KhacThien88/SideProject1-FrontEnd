import React from 'react';
import { Check, X, Zap } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface Feature {
  name: string;
  basic: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

export const FeatureComparison: React.FC = () => {
  const { t } = useTranslation();

  const features: Feature[] = [
    {
      name: t.featureComparison?.cvAnalysis || 'CV Analysis',
      basic: '10/month',
      pro: '100/month',
      enterprise: 'Unlimited',
    },
    {
      name: t.featureComparison?.jobMatching || 'AI Job Matching',
      basic: true,
      pro: true,
      enterprise: true,
    },
    {
      name: t.featureComparison?.storage || 'Cloud Storage',
      basic: '1GB',
      pro: '10GB',
      enterprise: 'Unlimited',
    },
    {
      name: t.featureComparison?.support || 'Priority Support',
      basic: false,
      pro: true,
      enterprise: true,
    },
    {
      name: t.featureComparison?.analytics || 'Advanced Analytics',
      basic: false,
      pro: true,
      enterprise: true,
    },
    {
      name: t.featureComparison?.customization || 'Custom Branding',
      basic: false,
      pro: false,
      enterprise: true,
    },
    {
      name: t.featureComparison?.api || 'API Access',
      basic: false,
      pro: true,
      enterprise: true,
    },
    {
      name: t.featureComparison?.team || 'Team Collaboration',
      basic: '1 user',
      pro: '5 users',
      enterprise: 'Unlimited',
    },
  ];

  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-6 h-6 text-secondary-600 mx-auto" />
      ) : (
        <X className="w-6 h-6 text-neutral-300 mx-auto" />
      );
    }
    return <span className="text-sm font-semibold text-neutral-700">{value}</span>;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          {t.featureComparison?.title || 'Compare Plans'}
        </h2>
        <p className="text-lg text-neutral-600">
          {t.featureComparison?.subtitle || 'Choose the perfect plan for your needs'}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-primary-50 to-secondary-50">
              <th className="px-6 py-4 text-left font-bold text-neutral-900">
                {t.featureComparison?.features || 'Features'}
              </th>
              <th className="px-6 py-4 text-center">
                <div className="font-bold text-neutral-900 mb-1">
                  {t.featureComparison?.basic || 'Basic'}
                </div>
                <div className="text-2xl font-bold text-primary-600">$49</div>
                <div className="text-sm text-neutral-600">/month</div>
              </th>
              <th className="px-6 py-4 text-center bg-primary-100 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-secondary-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {t.featureComparison?.popular || 'POPULAR'}
                </div>
                <div className="font-bold text-neutral-900 mb-1">
                  {t.featureComparison?.pro || 'Pro'}
                </div>
                <div className="text-2xl font-bold text-primary-700">$149</div>
                <div className="text-sm text-neutral-600">/month</div>
              </th>
              <th className="px-6 py-4 text-center">
                <div className="font-bold text-neutral-900 mb-1">
                  {t.featureComparison?.enterprise || 'Enterprise'}
                </div>
                <div className="text-2xl font-bold text-neutral-900">Custom</div>
                <div className="text-sm text-neutral-600">/contact us</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr
                key={index}
                className={`border-t border-neutral-200 hover:bg-neutral-50 transition-colors`}
              >
                <td className="px-6 py-4 font-medium text-neutral-900">{feature.name}</td>
                <td className="px-6 py-4 text-center">{renderValue(feature.basic)}</td>
                <td className="px-6 py-4 text-center bg-primary-50/50">
                  {renderValue(feature.pro)}
                </td>
                <td className="px-6 py-4 text-center">{renderValue(feature.enterprise)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-6 bg-neutral-50 rounded-xl border border-neutral-200 text-center">
        <p className="text-neutral-700 mb-4">
          {t.featureComparison?.guarantee || 'All plans include 14-day money-back guarantee'}
        </p>
        <p className="text-sm text-neutral-600">
          {t.featureComparison?.noCreditCard || 'No credit card required • Cancel anytime • Instant setup'}
        </p>
      </div>
    </div>
  );
};
