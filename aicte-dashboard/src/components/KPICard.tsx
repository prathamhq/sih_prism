// Reusable KPI Card Component
import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  iconBgColor?: string;
  iconColor?: string;
  highlight?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon: Icon,
  subtitle,
  trend,
  iconBgColor = 'bg-gray-100',
  iconColor = 'text-gray-600',
  highlight = false,
}) => {
  return (
    <div className={`${highlight ? 'bg-brand-teal text-white' : 'bg-white'} p-6 rounded-2xl shadow-soft border ${highlight ? 'border-brand-teal' : 'border-gray-100'} hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-medium ${highlight ? 'text-teal-100' : 'text-gray-500'}`}>
          {title}
        </span>
        <div className={`w-8 h-8 rounded-xl ${highlight ? 'bg-white/10' : iconBgColor} flex items-center justify-center ${highlight ? 'text-white' : iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className={`text-3xl font-bold ${highlight ? 'text-white' : 'text-gray-900'} mb-1`}>
        {value}
      </div>
      {subtitle && (
        <span className={`text-xs ${highlight ? 'text-teal-100' : 'text-amber-600'} block mt-1`}>
          {subtitle}
        </span>
      )}
      {trend && (
        <div className={`text-xs mt-2 flex items-center ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
          <span>{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last week</span>
        </div>
      )}
    </div>
  );
};
