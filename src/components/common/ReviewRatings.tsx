import React from 'react';
import { Star, ThumbsUp, Shield, Zap } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
  category: string;
}

const RatingStars: React.FC<{ rating: number; size?: string }> = ({ rating, size = 'w-4 h-4' }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${size} ${
            i < Math.floor(rating)
              ? 'fill-accent-500 text-accent-500'
              : i < rating
              ? 'fill-accent-300 text-accent-300'
              : 'text-neutral-300'
          }`}
        />
      ))}
    </div>
  );
};

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-neutral-200 hover:border-primary-300 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-semibold text-neutral-900">{review.author}</h4>
            <span className="text-sm text-neutral-500">{review.role}</span>
          </div>
          <div className="flex items-center gap-3">
            <RatingStars rating={review.rating} />
            <span className="text-sm text-neutral-500">{review.date}</span>
          </div>
        </div>
        <div className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
          {review.category}
        </div>
      </div>

      <p className="text-neutral-700 mb-4 leading-relaxed">{review.content}</p>

      <div className="flex items-center gap-2 text-sm text-neutral-600">
        <ThumbsUp className="w-4 h-4" />
        <span>{review.helpful} people found this helpful</span>
      </div>
    </div>
  );
};

export const ReviewRatings: React.FC = () => {
  const { t } = useTranslation();

  const overallRating = 4.8;
  const totalReviews = 1247;

  const ratingBreakdown = [
    { stars: 5, count: 980, percentage: 78 },
    { stars: 4, count: 210, percentage: 17 },
    { stars: 3, count: 45, percentage: 4 },
    { stars: 2, count: 8, percentage: 1 },
    { stars: 1, count: 4, percentage: 0 },
  ];

  const reviews: Review[] = [
    {
      id: '1',
      author: 'Nguyễn Minh H',
      role: 'Job Seeker',
      rating: 5,
      date: '2 days ago',
      content: 'Outstanding platform! The AI matching is incredibly accurate. I got 5 interview invitations within the first week of uploading my CV.',
      helpful: 42,
      category: 'Job Matching',
    },
    {
      id: '2',
      author: 'Phạm Thu L',
      role: 'HR Manager',
      rating: 5,
      date: '1 week ago',
      content: 'Game changer for our recruitment process. Cut our screening time by 60% and found better candidates. Highly recommended!',
      helpful: 38,
      category: 'Recruitment',
    },
    {
      id: '3',
      author: 'Trần Quang D',
      role: 'Software Engineer',
      rating: 4,
      date: '2 weeks ago',
      content: 'Great tool with accurate CV analysis. The suggestions helped me improve my resume significantly. Would love to see more integration options.',
      helpful: 29,
      category: 'CV Analysis',
    },
  ];

  return (
    <div className="w-full py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t.reviews?.title || 'What Our Users Say'}
          </h2>
          <p className="text-lg text-neutral-600">
            {t.reviews?.subtitle || 'Trusted by thousands of professionals'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          <div className="lg:col-span-1 bg-white rounded-xl p-8 border border-neutral-200">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-neutral-900 mb-2">{overallRating}</div>
              <RatingStars rating={overallRating} size="w-6 h-6" />
              <p className="text-sm text-neutral-600 mt-2">
                Based on {totalReviews.toLocaleString()} reviews
              </p>
            </div>

            <div className="space-y-3">
              {ratingBreakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium">{item.stars}</span>
                    <Star className="w-3 h-3 fill-accent-500 text-accent-500" />
                  </div>
                  <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-500 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-neutral-600 w-12 text-right">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-neutral-200">
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                <div className="text-sm font-medium text-neutral-900">Trusted</div>
              </div>
              <div className="text-center">
                <Zap className="w-6 h-6 mx-auto mb-2 text-secondary-600" />
                <div className="text-sm font-medium text-neutral-900">Fast</div>
              </div>
              <div className="text-center">
                <Star className="w-6 h-6 mx-auto mb-2 text-accent-600" />
                <div className="text-sm font-medium text-neutral-900">Top Rated</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
