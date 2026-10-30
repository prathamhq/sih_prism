// Additional Pages - Colleges, Overlaps, Officers, Reports
import React from 'react';
import { districts, overlapAlerts, officers } from '../data/sampleData';
import { useApp } from '../context/AppContext';
import { getTopCollegesByComplaints, exportToCSV } from '../utils/helpers';

// Colleges Page
export const CollegesPage: React.FC = () => {
  const { complaints } = useApp();
  const topColleges = getTopCollegesByComplaints(complaints, 10);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-sm text-gray-500">Madhya Pradesh → All districts</div>
      <h2 className="text-2xl font-bold text-gray-900">District-wise Institution Overview</h2>

      {/* District Cards */}
      <div className="grid grid-cols-3 gap-6">
        {districts.map((district) => (
          <div
            key={district.name}
            className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <h3 className="text-lg font-bold text-gray-900">{district.name} District</h3>
            <p className="text-xs text-gray-500 mt-1">{district.colleges} Affiliated Colleges</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="bg-teal-50 text-teal-800 px-3 py-1.5 rounded-lg font-medium">
                Open: {district.openComplaints}
              </span>
              <span className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg font-medium">
                At Risk: {district.amberAlerts}
              </span>
              <span className="bg-red-50 text-red-700 px-3 py-1.5 rounded-lg font-medium">
                Breached: {district.redAlerts}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Top Colleges by Complaints */}
      <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Top Colleges by Complaint Volume</h3>
        <div className="space-y-3">
          {topColleges.map((college, index) => (
            <div key={college.aicteId} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                <div>
                  <p className="font-semibold text-gray-900">{college.college}</p>
                  <p className="text-xs text-gray-500">{college.aicteId}</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-brand-teal">{college.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Overlaps Page
export const OverlapsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900">Cross-Bureau Overlap Alerts</h2>
      <p className="text-sm text-gray-600">
        AI-detected similar complaints across different bureaus that may be duplicates or related
      </p>

      <div className="space-y-4">
        {overlapAlerts.map((overlap) => (
          <div
            key={overlap.id}
            className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex items-center justify-between hover:shadow-md transition-all"
          >
            <div className="flex-1">
              <span className="text-xs bg-amber-100 text-amber-800 font-medium px-3 py-1 rounded-lg">
                {overlap.title}
              </span>
              <h4 className="text-sm font-bold text-gray-900 mt-3">{overlap.college}</h4>
              <p className="text-xs text-gray-500 mt-1">
                Cases:{' '}
                <span className="font-semibold text-gray-700">{overlap.case1}</span> &{' '}
                <span className="font-semibold text-gray-700">{overlap.case2}</span> | Category:{' '}
                {overlap.category}
              </p>
              <div className="mt-2">
                <span className="text-xs text-gray-600">Similarity Score: </span>
                <span className="text-xs font-bold text-brand-teal">{overlap.similarity}%</span>
              </div>
            </div>
            <button
              onClick={() => alert('Cases linked successfully!')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                overlap.linked
                  ? 'bg-gray-100 text-gray-600'
                  : 'bg-brand-teal text-white hover:bg-brand-teal-dark'
              }`}
              disabled={overlap.linked}
            >
              {overlap.linked ? '✓ Linked' : 'Link cases'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Officers Page
export const OfficersPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900">Officer Workload & Action History</h2>
      <p className="text-sm text-gray-600">Performance metrics and case distribution across officers</p>

      <div className="grid grid-cols-2 gap-6">
        {officers.map((officer) => (
          <div key={officer.id} className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900">{officer.name}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {officer.bureau} • {officer.region}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Total Solved</p>
                <p className="text-2xl font-bold text-green-600">{officer.stats.solved}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="bg-amber-50 p-3 rounded-xl">
                <p className="text-xs text-amber-600 font-medium mb-1">Pending</p>
                <p className="text-lg font-bold text-amber-700">{officer.stats.pending}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl">
                <p className="text-xs text-blue-600 font-medium mb-1">Processing</p>
                <p className="text-lg font-bold text-blue-700">{officer.stats.processing}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-xl">
                <p className="text-xs text-purple-600 font-medium mb-1">Verification</p>
                <p className="text-lg font-bold text-purple-700">{officer.stats.verification}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-xl">
                <p className="text-xs text-red-600 font-medium mb-1">Breached</p>
                <p className="text-lg font-bold text-red-700">{officer.stats.breached}</p>
              </div>
            </div>

            {/* Performance Bar */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-xs text-gray-600 mb-2">
                <span>Resolution Rate</span>
                <span className="font-semibold">
                  {Math.round(
                    (officer.stats.solved /
                      (officer.stats.solved +
                        officer.stats.pending +
                        officer.stats.processing)) *
                      100
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.round(
                      (officer.stats.solved /
                        (officer.stats.solved +
                          officer.stats.pending +
                          officer.stats.processing)) *
                        100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Reports Page
export const ReportsPage: React.FC = () => {
  const { complaints } = useApp();

  const handleExport = () => {
    exportToCSV(complaints, `AICTE_Complaints_Report_${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Export Reports</h2>
          <p className="text-sm text-gray-600 mt-1">Generate and download compliance reports</p>
        </div>
        <button
          onClick={handleExport}
          className="bg-brand-teal text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-brand-teal-dark transition-all shadow-sm"
        >
          📊 Export CSV Report
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-soft flex items-center justify-center">
            <span className="text-3xl">📈</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Report Generation Ready</h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Click the "Export CSV Report" button above to download a comprehensive report of all
            complaints with complete details including case IDs, status, SLA, and more.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Total Records</p>
              <p className="text-2xl font-bold text-gray-900">{complaints.length}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Date Range</p>
              <p className="text-sm font-semibold text-gray-900">Last 30 Days</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Format</p>
              <p className="text-sm font-semibold text-gray-900">CSV</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings Page
export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900">System Settings (Senior Admin)</h2>
      <p className="text-sm text-gray-600">Configure SLA timers, notification preferences, and system parameters</p>

      <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 space-y-6">
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">
            Default SLA Days per Category
          </label>
          <input
            type="text"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
            defaultValue="Fee fraud: 15 days, Hostel: 15 days, Harassment: 7 days, Ragging: 7 days"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">
            Reminder Interval (Days)
          </label>
          <input
            type="number"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
            defaultValue="3"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">
            Auto-close Unverified Cases After (Days)
          </label>
          <input
            type="number"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
            defaultValue="7"
          />
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button className="bg-brand-teal text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-brand-teal-dark transition-all">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
