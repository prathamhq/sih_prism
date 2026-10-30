// Overview Dashboard Page - Main Officer Dashboard
import React, { useMemo } from 'react';
import { Clock, Loader, ShieldAlert, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { KPICard } from '../components/KPICard';
import { TrendChart, CategoryBarChart, SLAHealthBar, StatusDonutChart } from '../components/Charts';
import {
  calculateStats,
  generateTrendData,
  groupByCategory,
  calculateSLAHealth,
  sortByPriority,
  filterComplaints,
} from '../utils/helpers';

export const OverviewPage: React.FC = () => {
  const { complaints, filters, setSelectedComplaint, setCurrentPage } = useApp();

  // Filter complaints based on current filters
  const filteredComplaints = useMemo(() => {
    return filterComplaints(complaints, filters);
  }, [complaints, filters]);

  // Calculate statistics
  const stats = useMemo(() => calculateStats(filteredComplaints), [filteredComplaints]);
  const trendData = useMemo(() => generateTrendData(filteredComplaints), [filteredComplaints]);
  const categoryData = useMemo(() => {
    const grouped = groupByCategory(filteredComplaints);
    return Object.entries(grouped)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [filteredComplaints]);
  const slaHealth = useMemo(() => calculateSLAHealth(filteredComplaints), [filteredComplaints]);
  const priorityList = useMemo(() => {
    return sortByPriority(
      filteredComplaints.filter(c => c.status !== 'Solved' && c.status !== 'Unverified')
    ).slice(0, 6);
  }, [filteredComplaints]);

  // Status data for donut chart
  const statusData = [
    { name: 'Solved', value: stats.solved, color: '#16A34A' },
    { name: 'Under Processing', value: stats.processing, color: '#0F766E' },
    { name: 'Pending', value: stats.pending, color: '#D97706' },
    { name: 'Verification', value: stats.verification, color: '#8B5CF6' },
  ];

  const handleComplaintClick = (complaintId: string) => {
    const complaint = complaints.find(c => c.id === complaintId);
    if (complaint) {
      setSelectedComplaint(complaint);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Global Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-soft border border-gray-100 flex flex-wrap items-center gap-4">
        <select className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal">
          <option>All Bureaus</option>
          <option>Regulation Bureau</option>
          <option>Fee Regulation</option>
          <option>PGRC</option>
          <option>Student Welfare</option>
        </select>
        <select className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal">
          <option>All Districts (Madhya Pradesh)</option>
          <option>Indore</option>
          <option>Bhopal</option>
          <option>Jabalpur</option>
          <option>Gwalior</option>
          <option>Ujjain</option>
        </select>
        <select className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal">
          <option>All Categories</option>
          <option>Hostel</option>
          <option>Fee fraud</option>
          <option>Harassment</option>
          <option>Infrastructure</option>
        </select>
        <input
          type="date"
          defaultValue="2026-10-01"
          className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
        />
      </div>

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard
          title="Pending (New)"
          value={stats.pending}
          icon={Clock}
          iconBgColor="bg-gray-100"
          iconColor="text-gray-600"
        />
        <KPICard
          title="Under processing"
          value={stats.processing}
          icon={Loader}
          subtitle={`${filteredComplaints.filter(c => c.slaDays <= 2 && c.slaDays >= 0).length} close to SLA deadline`}
          iconBgColor="bg-brand-soft"
          iconColor="text-brand-teal"
        />
        <KPICard
          title="Pending verification"
          value={stats.verification}
          icon={ShieldAlert}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <KPICard
          title="SLA at risk / Breached"
          value={stats.slaRisk}
          icon={AlertTriangle}
          subtitle="Requires immediate officer action"
          highlight
        />
      </div>

      {/* Row 2: Trend Chart + Priority List (Hero Section) */}
      <div className="grid grid-cols-3 gap-6">
        {/* Trend Chart - Wide */}
        <div className="col-span-2 bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 text-base">Complaints Trend (Last 7 Weeks)</h3>
            <div className="flex items-center space-x-2 text-xs">
              <span className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-brand-teal mr-1.5" />
                Received
              </span>
              <span className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-brand-green mr-1.5" />
                Solved
              </span>
            </div>
          </div>
          <div className="h-64">
            <TrendChart data={trendData} type="area" />
          </div>
        </div>

        {/* Priority List - Hero Element */}
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 text-base">Priority Queue (Top 6)</h3>
            <button
              onClick={() => setCurrentPage('priority')}
              className="text-xs text-brand-teal font-medium hover:underline"
            >
              View all
            </button>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {priorityList.map((c) => (
              <div
                key={c.id}
                onClick={() => handleComplaintClick(c.id)}
                className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer transition-all duration-200 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          c.priority === 'Critical'
                            ? 'bg-red-600 text-white'
                            : c.priority === 'High'
                            ? 'bg-red-500 text-white'
                            : c.priority === 'Medium'
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-400 text-white'
                        }`}
                      >
                        {c.priority}
                      </span>
                      {c.isRepeat && (
                        <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium">
                          Repeat
                        </span>
                      )}
                      {c.isHotspot && (
                        <span className="text-[9px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded font-medium">
                          Hotspot
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-gray-800 truncate group-hover:text-brand-teal transition-colors">
                      {c.college}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{c.category}</p>
                  </div>
                  <span
                    className={`text-[10px] font-medium px-2 py-1 rounded-full whitespace-nowrap ml-2 ${
                      c.slaDays < 0
                        ? 'bg-red-50 text-red-700'
                        : c.slaDays <= 2
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-green-50 text-green-700'
                    }`}
                  >
                    {c.slaRemaining}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Analytics Cards */}
      <div className="grid grid-cols-3 gap-6">
        {/* Status Split Donut */}
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
          <h3 className="font-semibold text-gray-900 text-sm mb-3">Status Distribution</h3>
          <div className="h-48 flex items-center">
            <div className="w-1/2 h-full">
              <StatusDonutChart data={statusData} />
            </div>
            <div className="w-1/2 space-y-2 text-xs pl-4">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span
                      className="w-2.5 h-2.5 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-gray-100">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{stats.totalCases}</span>
                </div>
                <p className="text-[10px] text-brand-teal mt-1">
                  {stats.solvedPercentage}% Resolution Rate
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Complaints by Category */}
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
          <h3 className="font-semibold text-gray-900 text-sm mb-3">Top Complaint Categories</h3>
          <div className="h-48">
            <CategoryBarChart data={categoryData} />
          </div>
        </div>

        {/* SLA Health */}
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 text-sm">SLA Compliance Health</h3>
            <span className="text-[10px] text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded">
              {slaHealth.onTime}% On Time
            </span>
          </div>
          <div className="pt-8">
            <SLAHealthBar
              onTime={slaHealth.onTime}
              atRisk={slaHealth.atRisk}
              breached={slaHealth.breached}
            />
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Active Cases</span>
              <span className="font-semibold text-gray-900">
                {stats.pending + stats.processing}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Breached Cases</span>
              <span className="font-semibold text-red-600">
                {filteredComplaints.filter(c => c.slaDays < 0).length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
