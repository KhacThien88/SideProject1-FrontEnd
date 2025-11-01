import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface SuccessStory {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  story: string;
  results: {
    metric: string;
    value: string;
  }[];
  rating: number;
}

const SuccessStoryCard: React.FC<{ story: SuccessStory }> = ({ story }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-neutral-200">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-xl">
            {story.avatar || story.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-neutral-900">{story.name}</h4>
            <p className="text-sm text-neutral-600">{story.role}</p>
            <p className="text-sm text-primary-600 font-medium">{story.company}</p>
          </div>
        </div>
        <Quote className="w-10 h-10 text-primary-200" />
      </div>

      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < story.rating ? 'fill-accent-500 text-accent-500' : 'text-neutral-300'
            }`}
          />
        ))}
      </div>

      <p className="text-neutral-700 mb-6 leading-relaxed">{story.story}</p>

      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200">
        {story.results.map((result, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold text-primary-600">{result.value}</div>
            <div className="text-sm text-neutral-600">{result.metric}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CustomerSuccessStories: React.FC = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const successStories: SuccessStory[] = [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      role: 'Software Engineer',
      company: 'Tech Corp Vietnam',
      story: t.successStories?.story1?.text || 'TalentFit AI helped me find my dream job in just 2 weeks. The AI matching was incredibly accurate and saved me countless hours of job searching.',
      results: [
        { metric: 'Time Saved', value: '2 weeks' },
        { metric: 'Job Matches', value: '15+' },
        { metric: 'Success Rate', value: '100%' },
      ],
      rating: 5,
    },
    {
      id: '2',
      name: 'Trần Thị B',
      role: 'HR Manager',
      company: 'Innovation Inc',
      story: t.successStories?.story2?.text || 'As a recruiter, this platform has transformed our hiring process. We reduced time-to-hire by 50% and found better quality candidates.',
      results: [
        { metric: 'Time Reduced', value: '50%' },
        { metric: 'Quality Hires', value: '95%' },
        { metric: 'Cost Saved', value: '40%' },
      ],
      rating: 5,
    },
    {
      id: '3',
      name: 'Lê Văn C',
      role: 'Marketing Director',
      company: 'Digital Solutions',
      story: t.successStories?.story3?.text || 'The AI analysis of my CV gave me insights I never considered. It helped me highlight my strengths and land 3 interviews in the first week.',
      results: [
        { metric: 'Interviews', value: '3' },
        { metric: 'Time Frame', value: '1 week' },
        { metric: 'Offers', value: '2' },
      ],
      rating: 5,
    },
  ];

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  return (
    <div className="w-full py-16 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t.successStories?.title || 'Customer Success Stories'}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t.successStories?.subtitle || 'See how our platform has helped thousands achieve their career goals'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <SuccessStoryCard story={successStories[currentIndex]} />

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevStory}
              className="p-2 rounded-full bg-white border border-neutral-300 hover:bg-primary-50 hover:border-primary-300 transition-colors"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary-600 w-8'
                      : 'bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextStory}
              className="p-2 rounded-full bg-white border border-neutral-300 hover:bg-primary-50 hover:border-primary-300 transition-colors"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
