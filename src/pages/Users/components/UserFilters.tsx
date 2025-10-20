import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Search } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import { createFocusEffect } from '../../../utils/focusEffects';

interface UserFiltersProps {
  searchQuery: string;
  filterRole: string;
  filterStatus: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({
  searchQuery,
  filterRole,
  filterStatus,
  onSearchChange,
  onRoleChange,
  onStatusChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder={t.users.search.placeholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 text-sm border border-neutral-300 rounded-lg transition-all duration-200 ${createFocusEffect.search()}`}
              />
            </div>
          </div>

          {/* Role Filter */}
          <select
            value={filterRole}
            onChange={(e) => onRoleChange(e.target.value)}
            className={`px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white min-w-[140px] transition-all duration-200 ${createFocusEffect.input('sm', 'primary')}`}
          >
            <option value="all">{t.users.filters.allRoles}</option>
            <option value="candidate">{t.users.stats.candidates}</option>
            <option value="recruiter">{t.users.stats.recruiters}</option>
            <option value="admin">{t.users.stats.admins}</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className={`px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white min-w-[140px] transition-all duration-200 ${createFocusEffect.input('sm', 'primary')}`}
          >
            <option value="all">{t.users.filters.allStatus}</option>
            <option value="active">{t.users.status.active}</option>
            <option value="inactive">{t.users.status.inactive}</option>
            <option value="suspended">{t.users.status.suspended}</option>
          </select>
        </div>
      </Card>
    </div>
  );
};
