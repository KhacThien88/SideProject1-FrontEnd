import React from 'react';
// no icon used inside for now; keep simple step dot

export interface StepCardProps {
  stepNumber: number;
  icon: 'upload' | 'analysis' | 'matching' | 'apply' | 'hired' | 'feedback' | any;
  title: string;
  description: string;
  details?: string[];
  color?: 'primary' | 'secondary' | 'accent';
}

const colorDot: Record<NonNullable<StepCardProps['color']>, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  accent: 'bg-accent-500',
};

export const StepCard: React.FC<StepCardProps> = ({
  stepNumber,
  // icon,
  title,
  description,
  details = [],
  color = 'primary',
}) => {
  return (
    <div className="rounded-2xl bg-white border border-neutral-200 p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-full ${colorDot[color]} flex items-center justify-center text-white font-bold`}>
          {stepNumber}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
          <p className="text-sm text-neutral-600 mt-1">{description}</p>
          {details.length > 0 && (
            <ul className="mt-3 space-y-1">
              {details.map((d, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-neutral-700">
                  <span className={`w-1.5 h-1.5 rounded-full ${colorDot[color]}`} />
                  {d}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
