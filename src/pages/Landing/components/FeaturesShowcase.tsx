import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { Container } from '../../../components/common/Container';
import { Card } from '../../../components/common/Card';
import { Icon } from '../../../components/common/Icon';

export const FeaturesShowcase: React.FC = () => {
  const { getContent } = useTranslation();
  const features = getContent('features') || { title: 'Tính năng', userTypes: [], platforms: [] };

  const userTypeIcon: Record<number, any> = {
    0: 'candidate',
    1: 'recruiter',
    2: 'admin',
  };

  const userTypeColor: Record<number, any> = {
    0: 'primary',
    1: 'secondary',
    2: 'accent',
  };

  return (
    <section id="features" className="py-16 lg:py-24 bg-neutral-50">
      <Container>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            {features.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {(features.userTypes || []).slice(0, 3).map((group: any, idx: number) => (
            <Card key={idx} variant="feature" className="reveal">
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-neutral-50 shadow-brand`}>
                  <Icon name={userTypeIcon[idx]} size="lg" color={userTypeColor[idx]} />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">{group.title}</h3>
              </div>
              <ul className="space-y-2">
                {(group.features || []).map((f: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-neutral-700">
                    <Icon name="check" size="sm" color="primary" />
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h4 className="text-lg font-semibold text-neutral-900 mb-4">Multi-platform</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(features.platforms || []).map((p: any, i: number) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200">
                <Icon name={(p.name?.toLowerCase() as any) === 'web app' ? 'web' : (p.name?.toLowerCase() as any)} size="md" color="neutral" />
                <div>
                  <div className="text-sm font-medium text-neutral-900">{p.name}</div>
                  <div className="text-xs text-neutral-600">{p.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
