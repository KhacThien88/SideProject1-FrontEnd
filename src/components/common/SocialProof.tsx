import React, { useEffect, useState } from 'react';
import { Users, TrendingUp, Award } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface LiveStatProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

const LiveStat: React.FC<LiveStatProps> = ({ icon, value, label, suffix = '', prefix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-lg border border-neutral-200 shadow-sm">
      <div className="text-primary-600">{icon}</div>
      <div>
        <div className="text-2xl font-bold text-neutral-900">
          {prefix}{displayValue.toLocaleString()}{suffix}
        </div>
        <div className="text-sm text-neutral-600">{label}</div>
      </div>
    </div>
  );
};

export const SocialProof: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full py-6 bg-gradient-to-r from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <LiveStat
            icon={<Users className="w-6 h-6" />}
            value={10000}
            label={t.socialProof?.activeUsers || 'Active Users'}
            suffix="+"
          />
          <LiveStat
            icon={<TrendingUp className="w-6 h-6" />}
            value={95}
            label={t.socialProof?.successRate || 'Success Rate'}
            suffix="%"
          />
          <LiveStat
            icon={<Award className="w-6 h-6" />}
            value={5000}
            label={t.socialProof?.jobsMatched || 'Jobs Matched'}
            suffix="+"
          />
        </div>
      </div>
    </div>
  );
};
