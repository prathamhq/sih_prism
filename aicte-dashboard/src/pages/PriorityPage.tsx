// Priority List Page - ML-based ranking with full details
import React, { useMemo } from 'react';
import { Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sortByPriority, filterComplaints } from '../utils/helpers';

export const PriorityPage: React.FC = () => {
  const { complaints, filters, setSelectedComplaint, updateComplaintStatus, currentUser } = useApp();

  const priorityComplaints = useMemo(() => {
    const filtered = filterComplaints(
      complaints.filter(c => c.status !== 'Solved' && c.status !== 'Unverified'),
      filters
    );
    return sortByPriority(filtered);
  }, [complaints, filters]);

  const handleTaken = (id: string) => {
    const officer = currentUser && 'bureau' in currentUser ? currentUser.name : 'Officer';
    updateComplaintStatus(id, 'Under processing', `SLA timer started by ${officer}`);
  };

  const handleSolved = (id: string) => {
    const note = prompt('Enter resolution notes and proof details:');
    if (!note) return;
    const officer = currentUser && 'bureau' in currentUser ? currentUser.name : 'Officer';
    updateComplaintStatus(id, 'Pending verification', `${officer}: ${note}`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Priority Cases Queue</h2>
          <p className="text-sm text-gray-500 mt-1">
            ML-ranked complaints based on severity, SLA, repeats, and hotspots
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Info className="w-4 h-4" />
          <span>Showing {priorityComplaints.length} active cases</span>
        </div>
      </div>

      <div className="space-y-4">
        {priorityComplaints.map((complaint, index) => (
          <div
            key={complaint.id}
            className="bg-white p-5 rounded-2xl shadow-soft border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                {/* Priority Badge and Rank */}
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                      complaint.priority === 'Critical'
                        ? 'bg-red-600 text-white'
                        : complaint.priority === 'High'
                        ? 'bg-red-500 text-white'
                        : complaint.priority === 'Medium'
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-400 text-white'
                    }`}
                  >
                    {complaint.priority} Priority
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-lg flex items-center">
                    <Info className="w-3 h-3 mr-1" />
                    Score: {complaint.priorityScore}/100
                  </span>
                  {complaint.isRepeat && (
                    <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-lg font-medium">
                      🔁 Repeat Complaint
                    </span>
                  )}
                  {complaint.isHotspot && (
                    <span className="text-xs bg-red-100 text-red-800 px-2.5 py-1 rounded-lg font-medium">
                      🔥 Hotspot College
                    </span>
                  )}
                </div>

                {/* Case ID and College */}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-brand-teal">{complaint.id}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-sm font-semibold text-gray-900">{complaint.college}</span>
                    <span className="text-xs text-gray-400">({complaint.aicteId})</span>
                  </div>
                  <div className="flex items-center space-x-3 mt-1 text-xs text-gray-600">
                    <span className="font-medium">{complaint.category}</span>
                    <span>•</span>
                    <span>{complaint.bureau}</span>
                    <span>•</span>
                    <span>{complaint.district}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {complaint.description}
                </p>

                {/* Priority Reason */}
                <div className="flex items-start space-x-2 text-xs">
                  <span className="font-semibold text-gray-600">Why high priority:</span>
                  <span className="text-gray-700">{complaint.priorityReason}</span>
                </div>

                {/* Complainant */}
                <div className="text-xs text-gray-500">
                  Complainant: <span className="font-medium text-gray-700">{complaint.complainant}</span>
                </div>
              </div>

              {/* Actions and SLA */}
              <div className="ml-6 flex flex-col items-end space-y-3">
                <span
                  className={`text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap ${
                    complaint.slaDays < 0
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : complaint.slaDays <= 2
                      ? 'bg-amber-100 text-amber-700 border border-amber-200'
                      : 'bg-green-100 text-green-700 border border-green-200'
                  }`}
                >
                  {complaint.slaRemaining}
                </span>

                <div className="flex flex-col space-y-2">
                  {complaint.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleTaken(complaint.id)}
                        className="btn-primary text-xs px-4 py-2 min-w-[100px]"
                      >
                        Take Case
                      </button>
                      <button
                        onClick={() => handleSolved(complaint.id)}
                        className="btn-secondary text-xs px-4 py-2 min-w-[100px]"
                      >
                        Mark Solved
                      </button>
                    </>
                  )}
                  {complaint.status === 'Under processing' && (
                    <button
                      onClick={() => handleSolved(complaint.id)}
                      className="btn-primary text-xs px-4 py-2 min-w-[100px]"
                    >
                      Mark Solved
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedComplaint(complaint)}
                    className="text-xs text-brand-teal hover:underline"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {priorityComplaints.length === 0 && (
        <div className="bg-white p-12 rounded-2xl shadow-soft border border-gray-100 text-center">
          <p className="text-gray-500">No pending priority cases found! 🎉</p>
          <p className="text-xs text-gray-400 mt-2">All complaints are either solved or verified.</p>
        </div>
      )}
    </div>
  );
};
