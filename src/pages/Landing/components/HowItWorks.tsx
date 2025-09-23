import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { Container } from '../../../components/common/Container';
import { StepCard } from '../../../components/common/StepCard';

export const HowItWorks: React.FC = () => {
  const { getContent } = useTranslation();
  const content = getContent('howItWorks') || { title: 'How It Works', steps: [] };

  const colorOrder: any[] = ['primary', 'secondary', 'accent', 'primary', 'secondary', 'accent'];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white">
      <Container>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">{content.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {(content.steps || []).slice(0, 6).map((s: any, i: number) => (
            <div className="reveal" key={i}>
            <StepCard
              key={i}
              stepNumber={i + 1}
              icon={'upload'}
              title={s.title}
              description={s.description}
              details={s.details}
              color={colorOrder[i]}
            />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
