import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  avatar: string;
  userType: 'candidate' | 'recruiter' | 'admin';
}

const getUserTypeColor = (userType: string) => {
  switch (userType) {
    case 'candidate':
      return 'border-blue-200 bg-blue-50';
    case 'recruiter':
      return 'border-green-200 bg-green-50';
    case 'admin':
      return 'border-purple-200 bg-purple-50';
    default:
      return 'border-gray-200 bg-gray-50';
  }
};

const getUserTypeBadge = (userType: string) => {
  switch (userType) {
    case 'candidate':
      return 'bg-blue-100 text-blue-800';
    case 'recruiter':
      return 'bg-green-100 text-green-800';
    case 'admin':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getUserTypeLabel = (userType: string) => {
  switch (userType) {
    case 'candidate':
      return 'Ứng viên';
    case 'recruiter':
      return 'Nhà tuyển dụng';
    case 'admin':
      return 'Quản trị viên';
    default:
      return 'Người dùng';
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  company,
  rating = 5,
  avatar,
  userType = 'candidate',
}) => {

  return (
    <div className={`relative p-6 rounded-2xl shadow-lg border ${getUserTypeColor(userType)} transition-all duration-500 hover:shadow-xl hover:scale-105 hover:-translate-y-2 group animate-fade-in`}>
      {/* User Type Badge */}
      <div className="absolute -top-3 left-6">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUserTypeBadge(userType)}`}>
          {getUserTypeLabel(userType)}
        </span>
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 text-base leading-relaxed mb-6 italic transition-colors duration-300 group-hover:text-gray-800">
        "{quote}"
      </blockquote>

      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 transition-all duration-300 ${
              i < rating
                ? 'text-yellow-400 fill-current transform group-hover:scale-110'
                : 'text-gray-300'
            }`}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
          {rating}/5
        </span>
      </div>

      {/* Author Info */}
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg mr-4 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
          {avatar || getInitials(author)}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-base transition-colors duration-300 group-hover:text-blue-600">{author}</h4>
          <p className="text-gray-600 text-sm transition-colors duration-300 group-hover:text-gray-700">
            {role} {company && `tại ${company}`}
          </p>
        </div>
      </div>
    </div>
  );
};