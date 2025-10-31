import React from 'react';
import { Shield, Lock, Award, CheckCircle } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface TrustBadgeProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-neutral-900 mb-1">{title}</h4>
        <p className="text-sm text-neutral-600">{description}</p>
      </div>
    </div>
  );
};

export const TrustBadges: React.FC = () => {
  const { t } = useTranslation();

  const badges = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: t.trustBadges?.gdprCompliant?.title || 'GDPR Compliant',
      description: t.trustBadges?.gdprCompliant?.description || 'Full compliance with EU data protection regulations',
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: t.trustBadges?.ssl?.title || 'SSL Encrypted',
      description: t.trustBadges?.ssl?.description || 'Bank-grade 256-bit encryption for all data',
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: t.trustBadges?.certified?.title || 'ISO Certified',
      description: t.trustBadges?.certified?.description || 'ISO 27001 certified for information security',
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: t.trustBadges?.verified?.title || 'Verified Platform',
      description: t.trustBadges?.verified?.description || 'Trusted by 1000+ companies worldwide',
    },
  ];

  return (
    <div className="w-full py-12 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">
            {t.trustBadges?.title || 'Trusted & Secure Platform'}
          </h2>
          <p className="text-lg text-neutral-600">
            {t.trustBadges?.subtitle || 'Your data security is our top priority'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {badges.map((badge, index) => (
            <TrustBadge key={index} {...badge} />
          ))}
        </div>
      </div>
    </div>
  );
};
