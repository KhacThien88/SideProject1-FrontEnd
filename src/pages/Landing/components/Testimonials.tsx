import React from 'react';
import { Container } from '../../../components/common/Container';
import { Carousel } from '../../../components/common/Carousel';
import { TestimonialCard } from '../../../components/common/TestimonialCard';

export const Testimonials: React.FC = () => {
  const items = [
    <TestimonialCard key={1} quote="AI CV analysis is very accurate, I found my dream job in just 2 weeks!" author="Nguyen Van A" role="Software Engineer" company="TechCorp" rating={5} />,
    <TestimonialCard key={2} quote="Helps us find suitable candidates 70% faster than traditional methods." author="Tran Thi B" role="HR Manager" company="ABC Corp" rating={5} />,
    <TestimonialCard key={3} quote="Easy to use platform, the analytics dashboard is very helpful." author="Le Van C" role="Admin" company="TalentFit AI" rating={5} />,
  ];

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">What our users say</h2>
        </div>
        <Carousel items={items} />
      </Container>
    </section>
  );
};
