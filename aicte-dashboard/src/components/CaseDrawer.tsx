// Case Detail Drawer - Slides in from the right
import React from 'react';
import { X, FileText, Link as LinkIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDate, getStatusColor, getPriorityColor } from '../utils/helpers';

export const CaseDrawer: React.FC = () => {
  const { selectedComplaint, setSelectedComplaint, updateComplaintStatus, currentUser, currentRole } = useApp();

  if (!selectedComplaint) return null;

  const handleTaken = () => {
    const officer = currentUser && 'bureau' in currentUser ? currentUser.name : 'Officer';
    updateComplaintStatus(selectedComplaint.id, 'Under processing', `SLA timer started by ${officer}`);
  };

  const handleSolved = () => {
    const note = prompt('Enter resolution notes and proof details:');
    if (!note) return;
    const officer = currentUser && 'bureau' in currentUser ? currentUser.name : 'Officer';
    updateComplaintStatus(selectedComplaint.id, 'Pending verification', `${officer}: ${note}`);
  };

  const handleConfirm = () => {
    const student = currentUser && 'college' in currentUser ? currentUser.name : 'Student';
    updateComplaintStatus(selectedComplaint.id, 'Solved', `${student}: Student verified and confirmed resolution.`);
    alert('Case confirmed and closed successfully!');
    setSelectedComplaint(null);
  };

  const handleReject = () => {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;
    const student = currentUser && 'college' in currentUser ? currentUser.name : 'Student';
    updateComplaintStatus(selectedComplaint.id, 'Reopened', `${student}: Rejected. Reason: ${reason}`);
    alert('Case reopened and sent back to officer.');
    setSelectedComplaint(null);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end animate-fadeIn">
      <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col overflow-hidden animate-slideInRight">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-teal to-brand-teal-light text-white p-6 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-bold">{selectedComplaint.id}</span>
              <span className={`status-chip border ${getStatusColor(selectedComplaint.status)}`}>
                {selectedComplaint.status}
              </span>
            </div>
            <h2 className="text-lg font-bold">{selectedComplaint.college}</h2>
            <p className="text-xs text-teal-100 mt-1">
              AICTE ID: {selectedComplaint.aicteId} | Category: {selectedComplaint.category}
            </p>
          </div>
          <button
            onClick={() => setSelectedComplaint(null)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Priority and Badges */}
          <div className="flex items-center space-x-2 flex-wrap">
            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getPriorityColor(selectedComplaint.priority)}`}>
              {selectedComplaint.priority} Priority
            </span>
            {selectedComplaint.isRepeat && (
              <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-lg font-medium">
                🔁 Repeat Complaint
              </span>
            )}
            {selectedComplaint.isHotspot && (
              <span className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded-lg font-medium">
                🔥 Hotspot College
              </span>
            )}
            <span
              className={`text-xs font-bold px-3 py-1 rounded-lg ${
                selectedComplaint.slaDays < 0
                  ? 'bg-red-100 text-red-700'
                  : selectedComplaint.slaDays <= 2
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              SLA: {selectedComplaint.slaRemaining}
            </span>
          </div>

          {/* Case Details */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-xs text-gray-500">Bureau</span>
                <p className="font-medium text-gray-900">{selectedComplaint.bureau}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Assigned Officer</span>
                <p className="font-medium text-gray-900">{selectedComplaint.officer}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Received Date</span>
                <p className="font-medium text-gray-900">{formatDate(selectedComplaint.receivedDate)}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">District</span>
                <p className="font-medium text-gray-900">{selectedComplaint.district}, {selectedComplaint.state}</p>
              </div>
            </div>
          </div>

          {/* Complainant Statement */}
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <h4 className="text-xs font-bold text-blue-900 uppercase mb-2 flex items-center">
              <FileText className="w-3 h-3 mr-1" />
              Complainant Statement ({selectedComplaint.complainant})
            </h4>
            <p className="text-sm text-gray-800">{selectedComplaint.description}</p>
          </div>

          {/* Linked Cases */}
          {selectedComplaint.linkedCases && selectedComplaint.linkedCases.length > 0 && (
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
              <h4 className="text-xs font-bold text-amber-900 uppercase mb-2 flex items-center">
                <LinkIcon className="w-3 h-3 mr-1" />
                Linked Cases (Cross-Bureau)
              </h4>
              <div className="space-y-1">
                {selectedComplaint.linkedCases.map(caseId => (
                  <p key={caseId} className="text-sm text-gray-700">→ {caseId}</p>
                ))}
              </div>
            </div>
          )}

          {/* Proof (if available) */}
          {selectedComplaint.proof && (
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <h4 className="text-xs font-bold text-green-900 uppercase mb-2">Resolution Proof</h4>
              <div className="flex items-center space-x-2 text-sm">
                <FileText className="w-4 h-4 text-green-700" />
                <a href="#" className="text-green-700 hover:underline font-medium">
                  {selectedComplaint.proof}
                </a>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Audit Trail Timeline</h3>
            <div className="space-y-3 relative pl-6">
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              {selectedComplaint.timeline.map((entry, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[22px] w-3 h-3 rounded-full bg-brand-teal ring-4 ring-white"></div>
                  <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                    <p className="font-semibold text-sm text-gray-900">{entry.action} by {entry.actor}</p>
                    <p className="text-xs text-gray-600 mt-1">{entry.note}</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      {formatDate(entry.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        {currentRole === 'officer' && (
          <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-end space-x-3">
            {selectedComplaint.status === 'Pending' && (
              <>
                <button onClick={handleTaken} className="btn-primary">
                  Mark as Taken
                </button>
                <button onClick={handleSolved} className="btn-secondary">
                  Mark as Solved
                </button>
              </>
            )}
            {selectedComplaint.status === 'Under processing' && (
              <button onClick={handleSolved} className="btn-primary">
                Mark as Solved
              </button>
            )}
            {selectedComplaint.status === 'Pending verification' && (
              <p className="text-sm text-gray-600">Waiting for student verification...</p>
            )}
            {selectedComplaint.status === 'Solved' && (
              <p className="text-sm text-green-600 font-medium">✓ Case Closed</p>
            )}
          </div>
        )}

        {currentRole === 'student' && selectedComplaint.status === 'Pending verification' && (
          <div className="p-6 border-t border-gray-100 bg-amber-50 space-y-3">
            <p className="text-sm font-semibold text-gray-900">Action Required: Verify Resolution</p>
            <p className="text-xs text-gray-600">Please review the officer's resolution and proof. Confirm if the issue is resolved, or reject if it's not.</p>
            <div className="flex items-center space-x-3">
              <button onClick={handleConfirm} className="flex-1 bg-green-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-green-700 transition-all">
                ✓ Confirm Resolution
              </button>
              <button onClick={handleReject} className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-all">
                ✗ Reject & Reopen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
