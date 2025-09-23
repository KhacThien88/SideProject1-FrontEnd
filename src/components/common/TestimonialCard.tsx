import React from 'react';

export interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating?: number; // 1..5
  avatarUrl?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  company,
  rating = 5,
  avatarUrl,
}) => {
  return (
    <div className="rounded-2xl bg-white border border-neutral-200 p-6 h-full flex flex-col justify-between hover:shadow-lg transition-all duration-200">
      <p className="text-neutral-700 leading-relaxed mb-4">“{quote}”</p>
      <div className="flex items-center gap-3 mt-4">
        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
          {avatarUrl ? (
            <img src={avatarUrl} alt={author} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            author?.[0] || 'U'
          )}
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-neutral-900">{author}</div>
          <div className="text-xs text-neutral-600">{role} • {company}</div>
        </div>
        <div className="text-primary-500 text-sm" aria-label={`rating-${rating}`}>
          {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
        </div>
      </div>
    </div>
  );
};
