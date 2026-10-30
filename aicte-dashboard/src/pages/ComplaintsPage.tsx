// Complaints Page with Tabs and Table
import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { filterComplaints, getStatusColor, formatDate } from '../utils/helpers';
import type { CaseStatus } from '../types';

const statusTabs: { key: CaseStatus; label: string }[] = [
  { key: 'Pending', label: 'Pending' },
  { key: 'Under processing', label: 'Under processing' },
  { key: 'Pending verification', label: 'Pending verification' },
  { key: 'Solved', label: 'Solved' },
];

export const ComplaintsPage: React.FC = () => {
  const { complaints, filters, setSelectedComplaint } = useApp();
  const [activeTab, setActiveTab] = useState<CaseStatus>('Pending');

  const filteredByStatus = useMemo(() => {
    return filterComplaints(complaints, { ...filters, status: activeTab });
  }, [complaints, filters, activeTab]);

  const handleRowClick = (complaintId: string) => {
    const complaint = complaints.find(c => c.id === complaintId);
    if (complaint) {
      setSelectedComplaint(complaint);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">All Complaints</h2>
      </div>

      {/* Status Tabs */}
      <div className="flex space-x-2 border-b border-gray-200 pb-2">
        {statusTabs.map((tab) => {
          const count = complaints.filter(c => c.status === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? 'text-brand-teal border-b-2 border-brand-teal'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}{' '}
              <span className="ml-1 text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
        {filteredByStatus.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">No complaints found in this status</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500">
                  <th className="p-4">Case ID</th>
                  <th className="p-4">College</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Bureau</th>
                  <th className="p-4">Assigned Officer</th>
                  <th className="p-4">Date Received</th>
                  <th className="p-4">SLA Remaining</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredByStatus.map((complaint) => (
                  <tr
                    key={complaint.id}
                    onClick={() => handleRowClick(complaint.id)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="p-4 font-semibold text-brand-teal">{complaint.id}</td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{complaint.college}</div>
                      <div className="text-xs text-gray-500">{complaint.aicteId}</div>
                    </td>
                    <td className="p-4 text-gray-600">{complaint.category}</td>
                    <td className="p-4 text-gray-600">{complaint.bureau}</td>
                    <td className="p-4 text-gray-600">{complaint.officer}</td>
                    <td className="p-4 text-gray-500">{formatDate(complaint.receivedDate)}</td>
                    <td className="p-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          complaint.slaDays < 0
                            ? 'bg-red-50 text-red-700'
                            : complaint.slaDays <= 2
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-green-50 text-green-700'
                        }`}
                      >
                        {complaint.slaRemaining}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs px-2 py-1 rounded font-bold ${
                          complaint.priority === 'Critical'
                            ? 'bg-red-600 text-white'
                            : complaint.priority === 'High'
                            ? 'bg-red-500 text-white'
                            : complaint.priority === 'Medium'
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-400 text-white'
                        }`}
                      >
                        {complaint.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`status-chip border ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500">
        Showing {filteredByStatus.length} {filteredByStatus.length === 1 ? 'complaint' : 'complaints'}
      </div>
    </div>
  );
};
