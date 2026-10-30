// Student Dashboard - Simple view for complainants
import React, { useMemo } from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { KPICard } from '../components/KPICard';
import { formatDate, getStatusColor } from '../utils/helpers';

export const StudentDashboard: React.FC = () => {
  const { complaints, currentUser, setSelectedComplaint } = useApp();

  // Filter complaints for current student
  const studentComplaints = useMemo(() => {
    if (!currentUser || !('college' in currentUser)) return [];
    return complaints.filter(c => c.aicteId === currentUser.aicteId);
  }, [complaints, currentUser]);

  const stats = useMemo(() => {
    const open = studentComplaints.filter(c => c.status !== 'Solved' && c.status !== 'Unverified').length;
    const verification = studentComplaints.filter(c => c.status === 'Pending verification').length;
    const solved = studentComplaints.filter(c => c.status === 'Solved').length;
    return { open, verification, solved };
  }, [studentComplaints]);

  const pendingVerification = useMemo(() => {
    return studentComplaints.find(c => c.status === 'Pending verification');
  }, [studentComplaints]);

  if (!currentUser || !('college' in currentUser)) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* College Info Banner */}
      <div className="bg-gradient-to-r from-brand-teal to-brand-teal-light text-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-2">My Complaints Dashboard</h2>
        <p className="text-sm text-teal-100">
          {currentUser.college} ({currentUser.aicteId})
        </p>
      </div>

      {/* Verification Alert */}
      {pendingVerification && (
        <div className="bg-amber-50 border-2 border-amber-200 p-6 rounded-2xl flex items-center justify-between shadow-soft">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
                Action Required
              </span>
              <h3 className="text-base font-bold text-gray-900">
                Your complaint was marked solved by {pendingVerification.bureau}
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Please review the officer's proof and confirm or reject within 7 days.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedComplaint(pendingVerification)}
            className="bg-amber-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-amber-700 transition-all shadow-sm"
          >
            Review Now →
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <KPICard
          title="Open Complaints"
          value={stats.open}
          icon={Clock}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
        <KPICard
          title="Awaiting Your Confirmation"
          value={stats.verification}
          icon={AlertCircle}
          iconBgColor="bg-brand-soft"
          iconColor="text-brand-teal"
          highlight={stats.verification > 0}
        />
        <KPICard
          title="Solved & Closed"
          value={stats.solved}
          icon={CheckCircle}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
      </div>

      {/* Complaints List */}
      <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Your Filed Complaints</h3>
          <span className="text-xs text-gray-500">{studentComplaints.length} total complaints</span>
        </div>

        {studentComplaints.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">You haven't filed any complaints yet</p>
            <p className="text-xs text-gray-400 mt-2">Complaints filed through AICTE portal will appear here</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {studentComplaints.map((complaint) => (
              <div
                key={complaint.id}
                onClick={() => setSelectedComplaint(complaint)}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-brand-teal text-sm">{complaint.id}</span>
                      <span className={`status-chip border text-xs ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                      {complaint.status === 'Pending verification' && (
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium animate-pulse">
                          Action Required
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{complaint.category}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{complaint.description}</p>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-xs text-gray-500 mb-1">Filed on</p>
                    <p className="text-sm font-medium text-gray-900">{formatDate(complaint.receivedDate)}</p>
                  </div>
                </div>

                {/* Timeline Progress */}
                <div className="flex items-center space-x-2 text-xs">
                  <div className={`flex items-center ${complaint.status !== 'Pending' ? 'text-green-600' : 'text-gray-400'}`}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Received
                  </div>
                  <div className="flex-1 h-0.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-teal transition-all duration-500"
                      style={{
                        width: complaint.status === 'Pending' ? '33%' :
                               complaint.status === 'Under processing' ? '66%' :
                               '100%'
                      }}
                    />
                  </div>
                  <div className={`flex items-center ${complaint.status === 'Under processing' || complaint.status === 'Pending verification' || complaint.status === 'Solved' ? 'text-green-600' : 'text-gray-400'}`}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Processing
                  </div>
                  <div className="flex-1 h-0.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-teal transition-all duration-500"
                      style={{
                        width: complaint.status === 'Pending verification' || complaint.status === 'Solved' ? '100%' : '0%'
                      }}
                    />
                  </div>
                  <div className={`flex items-center ${complaint.status === 'Solved' ? 'text-green-600' : 'text-gray-400'}`}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Resolved
                  </div>
                </div>

                {/* SLA Info */}
                {complaint.status !== 'Solved' && (
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-600">Assigned to: <span className="font-medium text-gray-900">{complaint.officer}</span></span>
                    <span className={`px-2 py-1 rounded-full font-medium ${
                      complaint.slaDays < 0 ? 'bg-red-50 text-red-700' :
                      complaint.slaDays <= 2 ? 'bg-amber-50 text-amber-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {complaint.slaRemaining}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
