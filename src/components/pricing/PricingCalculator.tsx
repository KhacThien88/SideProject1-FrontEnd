import React, { useState } from 'react';
import { Calculator, Check } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export const PricingCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState(10);
  const [jobPosts, setJobPosts] = useState(5);

  const basePrice = 49;
  const pricePerEmployee = 5;
  const pricePerJob = 10;

  const monthlyPrice = basePrice + (employees * pricePerEmployee) + (jobPosts * pricePerJob);
  const yearlyPrice = monthlyPrice * 12 * 0.8; // 20% discount for yearly
  const savings = (monthlyPrice * 12) - yearlyPrice;

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-neutral-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-neutral-900">
            {t.pricingCalculator?.title || 'Pricing Calculator'}
          </h3>
          <p className="text-neutral-600">
            {t.pricingCalculator?.subtitle || 'Customize your plan'}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            {t.pricingCalculator?.employees || 'Number of Employees'}
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min="1"
              max="100"
              value={employees}
              onChange={(e) => setEmployees(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-neutral-600">
              <span>1</span>
              <span className="font-bold text-primary-600 text-lg">{employees}</span>
              <span>100+</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            {t.pricingCalculator?.jobPosts || 'Monthly Job Posts'}
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min="1"
              max="50"
              value={jobPosts}
              onChange={(e) => setJobPosts(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-neutral-600">
              <span>1</span>
              <span className="font-bold text-secondary-600 text-lg">{jobPosts}</span>
              <span>50+</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-neutral-50 rounded-xl">
          <p className="text-sm text-neutral-600 mb-2">
            {t.pricingCalculator?.monthly || 'Monthly Plan'}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-neutral-900">${monthlyPrice}</span>
            <span className="text-neutral-600">/month</span>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl border-2 border-primary-300 relative">
          <div className="absolute -top-3 right-4 px-3 py-1 bg-secondary-500 text-white text-xs font-bold rounded-full">
            {t.pricingCalculator?.save || 'SAVE'} 20%
          </div>
          <p className="text-sm text-neutral-600 mb-2">
            {t.pricingCalculator?.yearly || 'Yearly Plan'}
          </p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-bold text-primary-700">${yearlyPrice.toFixed(0)}</span>
            <span className="text-neutral-600">/year</span>
          </div>
          <p className="text-sm text-secondary-700 font-semibold">
            <Check className="w-4 h-4 inline mr-1" />
            {t.pricingCalculator?.savings || 'Save'} ${savings.toFixed(0)}/year
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-accent-50 rounded-lg border border-accent-200">
        <p className="text-sm text-accent-800">
          <strong>{t.pricingCalculator?.includes || 'Includes'}:</strong>{' '}
          {t.pricingCalculator?.features || 'Unlimited CV analysis, AI matching, Priority support, Advanced analytics'}
        </p>
      </div>
    </div>
  );
};
