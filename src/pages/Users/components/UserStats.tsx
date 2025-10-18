import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Users as UsersIcon, User, Briefcase, Shield } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

interface UserStatsProps {
  totalUsers: number;
  candidatesCount: number;
  recruitersCount: number;
  adminsCount: number;
}

export const UserStats: React.FC<UserStatsProps> = ({
  totalUsers,
  candidatesCount,
  recruitersCount,
  adminsCount,
}) => {
  const { t } = useTranslation();

  const stats = [
    {
      label: t.users.stats.totalUsers,
      value: totalUsers,
      icon: UsersIcon,
      color: 'text-primary-600',
      bg: 'bg-primary-100',
      delay: '0s',
    },
    {
      label: t.users.stats.candidates,
      value: candidatesCount,
      icon: User,
      color: 'text-green-600',
      bg: 'bg-green-100',
      delay: '0.1s',
    },
    {
      label: t.users.stats.recruiters,
      value: recruitersCount,
      icon: Briefcase,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      delay: '0.2s',
    },
    {
      label: t.users.stats.admins,
      value: adminsCount,
      icon: Shield,
      color: 'text-red-600',
      bg: 'bg-red-100',
      delay: '0.3s',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="animate-slide-up"
            style={{ animationDelay: stat.delay }}
          >
            <Card className="p-6">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className={`p-2 ${stat.bg} rounded-2xl`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-neutral-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
