import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { Container } from '../../../components/common/Container';
import { Card } from '../../../components/common/Card';
import { Icon } from '../../../components/common/Icon';
import { Counter } from '../../../components/common/Counter';

export const Statistics: React.FC = () => {
  const { getContent } = useTranslation();
  const stats = getContent('statistics') || { title: 'Statistics', items: [] };

  const iconMap: any = {
    Users: 'users',
    Accuracy: 'accuracy',
    Processing: 'speed',
    Jobs: 'jobs',
    Hires: 'hires',
    Rating: 'rating',
  };

  const colorOrder: any[] = ['primary', 'secondary', 'accent', 'primary', 'secondary', 'accent'];

  return (
    <section id="statistics" className="py-16 lg:py-24 bg-neutral-50">
      <Container>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">{stats.title}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(stats.items || []).slice(0, 6).map((it: any, i: number) => (
            <Card key={i} variant="elevated" className="reveal">
              <div className="flex items-center gap-4">
                <Icon name={iconMap[it.label] || 'check'} size="lg" color={colorOrder[i]} />
                <div>
                  <div className="text-3xl font-extrabold text-neutral-900">
                    {/* simple parsing for demo; can be enhanced for %, s, + */}
                    {it.label === 'Users' && (<Counter end={10000} suffix="+" />)}
                    {it.label === 'Accuracy' && (<Counter end={95} suffix="%" />)}
                    {it.label === 'Processing' && (<Counter end={10} suffix="s" />)}
                    {it.label === 'Jobs' && (<Counter end={5000} suffix="+" />)}
                    {it.label === 'Hires' && (<Counter end={2000} suffix="+" />)}
                    {it.label === 'Rating' && (<span>4.8/5</span>)}
                  </div>
                  <div className="text-sm text-neutral-600">{it.description}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
