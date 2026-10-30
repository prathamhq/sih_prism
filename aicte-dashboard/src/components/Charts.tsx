// Interactive Chart Components using Recharts
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { TrendDataPoint, ChartDataPoint } from '../types';

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <p className="text-xs font-semibold text-gray-900 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs text-gray-600">
            <span style={{ color: entry.color }} className="font-medium">
              {entry.name}:
            </span>{' '}
            {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Status Donut Chart
interface StatusChartProps {
  data: Array<{ name: string; value: number; color: string }>;
  centerLabel?: string;
  centerValue?: string;
}

export const StatusDonutChart: React.FC<StatusChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Trend Line/Area Chart
interface TrendChartProps {
  data: TrendDataPoint[];
  type?: 'line' | 'area';
}

export const TrendChart: React.FC<TrendChartProps> = ({ data, type = 'area' }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {type === 'area' ? (
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0F766E" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16A34A" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="received"
            stroke="#0F766E"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorReceived)"
            name="Received"
          />
          <Area
            type="monotone"
            dataKey="solved"
            stroke="#16A34A"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSolved)"
            name="Solved"
          />
        </AreaChart>
      ) : (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="received"
            stroke="#0F766E"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Received"
          />
          <Line
            type="monotone"
            dataKey="solved"
            stroke="#16A34A"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Solved"
          />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};

// Category Bar Chart
interface CategoryChartProps {
  data: Array<{ category: string; count: number }>;
}

export const CategoryBarChart: React.FC<CategoryChartProps> = ({ data }) => {
  const colors = ['#0F766E', '#D97706', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B'];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9ca3af" />
        <YAxis dataKey="category" type="category" tick={{ fontSize: 11 }} width={120} stroke="#9ca3af" />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" radius={[0, 8, 8, 0]} name="Complaints">
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

// Simple Bar Chart for comparison
interface SimpleBarChartProps {
  data: ChartDataPoint[];
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#9ca3af" />
        <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" radius={[8, 8, 0, 0]} name="Count">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || '#0F766E'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

// SLA Health Segmented Bar
interface SLAHealthBarProps {
  onTime: number;
  atRisk: number;
  breached: number;
}

export const SLAHealthBar: React.FC<SLAHealthBarProps> = ({ onTime, atRisk, breached }) => {
  return (
    <div className="space-y-4">
      <div className="w-full flex h-4 rounded-full overflow-hidden shadow-inner">
        <div
          className="bg-green-500 h-full transition-all duration-500"
          style={{ width: `${onTime}%` }}
          title={`On Time: ${onTime}%`}
        />
        <div
          className="bg-amber-400 h-full transition-all duration-500"
          style={{ width: `${atRisk}%` }}
          title={`At Risk: ${atRisk}%`}
        />
        <div
          className="bg-red-500 h-full transition-all duration-500"
          style={{ width: `${breached}%` }}
          title={`Breached: ${breached}%`}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-600 font-medium">
        <span className="flex items-center">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-1.5" />
          On Time ({onTime}%)
        </span>
        <span className="flex items-center">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 mr-1.5" />
          At Risk ({atRisk}%)
        </span>
        <span className="flex items-center">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-1.5" />
          Breached ({breached}%)
        </span>
      </div>
    </div>
  );
};
