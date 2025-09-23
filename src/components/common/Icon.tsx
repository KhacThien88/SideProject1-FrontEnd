import React from 'react';

export interface IconProps {
  name:
    | 'ai-analysis'
    | 'smart-matching'
    | 'real-time'
    | 'secure'
    | 'candidate'
    | 'recruiter'
    | 'admin'
    | 'web'
    | 'slack'
    | 'whatsapp'
    | 'api'
    | 'users'
    | 'accuracy'
    | 'speed'
    | 'jobs'
    | 'hires'
    | 'rating'
    | 'check';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'accent' | 'neutral';
  className?: string;
}

const sizeMap: Record<NonNullable<IconProps['size']>, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10',
};

const colorMap: Record<NonNullable<IconProps['color']>, string> = {
  primary: 'text-primary-500',
  secondary: 'text-secondary-500',
  accent: 'text-accent-500',
  neutral: 'text-neutral-500',
};

const paths: Record<IconProps['name'], React.ReactNode> = {
  'ai-analysis': (
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5a1 1 0 10-2 0v3H8a1 1 0 000 2h3v3a1 1 0 002 0v-3h3a1 1 0 000-2h-3V7z" />
  ),
  'smart-matching': (
    <path d="M12 2l3 7h7l-5.5 4 2 7-6.5-4.5L5.5 20l2-7L2 9h7l3-7z" />
  ),
  'real-time': (
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5h-2v6l5 3 1-1.73-4-2.27V7z" />
  ),
  secure: (
    <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4zm0 6a3 3 0 00-3 3v2a3 3 0 106 0V11a3 3 0 00-3-3z" />
  ),
  candidate: (
    <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0H5z" />
  ),
  recruiter: (
    <path d="M4 20V4h16v16H4zm2-2h12V6H6v12zm3-1h6v-2H9v2z" />
  ),
  admin: (
    <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm8 4l2 1-2 1a8.1 8.1 0 01-1 2l1 2-2 2-2-1a8.1 8.1 0 01-2 1l-1 2h-3l-1-2a8.1 8.1 0 01-2-1l-2 1-2-2 1-2a8.1 8.1 0 01-1-2l-2-1 2-1a8.1 8.1 0 011-2L2 9l2-2 2 1a8.1 8.1 0 012-1l1-2h3l1 2a8.1 8.1 0 012 1l2-1 2 2-1 2a8.1 8.1 0 011 2z" />
  ),
  web: (<path d="M3 4h18v16H3V4zm2 2v12h14V6H5z" />),
  slack: (
    <path d="M7 14a2 2 0 110-4h2v-2a2 2 0 114 0v2h2a2 2 0 110 4h-2v2a2 2 0 11-4 0v-2H7z" />
  ),
  whatsapp: (
    <path d="M20 11.5A8.5 8.5 0 113.7 17L2 22l5-1.7A8.5 8.5 0 1120 11.5z" />
  ),
  api: (
    <path d="M4 8h16v2H4V8zm0 4h16v2H4v-2zm0 4h10v2H4v-2z" />
  ),
  users: (
    <path d="M16 11a4 4 0 10-8 0 4 4 0 008 0zm-6 5a6 6 0 00-6 6h2a4 4 0 014-4h4a4 4 0 014 4h2a6 6 0 00-6-6h-4z" />
  ),
  accuracy: (
    <path d="M12 2a10 10 0 100 20V2zm2 5l5 5-5 5-2-2 3-3-3-3 2-2z" />
  ),
  speed: (
    <path d="M3 12a9 9 0 1118 0c0 5-4 8-9 8s-9-3-9-8zm9-5l4 6h-8l4-6z" />
  ),
  jobs: (
    <path d="M4 7h16v12H4V7zm2 2v8h12V9H6zm3-6h6v2H9V3z" />
  ),
  hires: (
    <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-8 9a8 8 0 1116 0H4z" />
  ),
  rating: (
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.6 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
  ),
  check: (
    <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.5-1.5L9 16.2z" />
  ),
};

export const Icon: React.FC<IconProps> = ({ name, size = 'md', color = 'neutral', className = '' }) => {
  const pxMap: Record<NonNullable<IconProps['size']>, number> = { sm: 16, md: 24, lg: 32, xl: 40 };
  const px = pxMap[size];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={px}
      height={px}
      fill="currentColor"
      className={`${sizeMap[size]} ${colorMap[color]} ${className}`}
      style={{ flex: '0 0 auto' }}
      aria-hidden="true"
      role="img"
    >
      {paths[name]}
    </svg>
  );
};
