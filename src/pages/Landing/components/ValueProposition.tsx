import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { Container } from '../../../components/common/Container';
import { Card } from '../../../components/common/Card';
import { Icon } from '../../../components/common/Icon';

export const ValueProposition: React.FC = () => {
  const { getContent } = useTranslation();
  const value = getContent('valueProps') || { title: 'Giá trị cốt lõi', items: [] };

  const iconMap = ['ai-analysis', 'smart-matching', 'real-time', 'secure'] as const;
  const colorMap = ['primary', 'secondary', 'accent', 'neutral'] as const;

  return (
    <section id="value" className="py-16 lg:py-24 bg-white">
      <Container>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            {value.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(value.items || []).slice(0, 4).map((item: any, idx: number) => (
            <Card key={idx} variant="value" className="reveal">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-neutral-50 shadow-brand">
                  <Icon name={iconMap[idx] || 'check'} size="lg" color={colorMap[idx] || 'primary'} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">{item.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{item.description}</p>
                  {item.metric && (
                    <div className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary-600">
                      <Icon name="check" size="sm" color="primary" />
                      {item.metric}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
