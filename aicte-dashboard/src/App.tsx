// Main App Component
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CaseDrawer } from './components/CaseDrawer';
import { OverviewPage } from './pages/OverviewPage';
import { ComplaintsPage } from './pages/ComplaintsPage';
import { PriorityPage } from './pages/PriorityPage';
import { StudentDashboard } from './pages/StudentDashboard';
import {
  CollegesPage,
  OverlapsPage,
  OfficersPage,
  ReportsPage,
  SettingsPage,
} from './pages/AdditionalPages';
import { MessageSquare } from 'lucide-react';

// Role Switcher Banner Component
const RoleSwitcher: React.FC = () => {
  const { currentRole, setCurrentRole } = useApp();

  return (
    <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-3">
        <span className="bg-brand-teal text-xs font-semibold px-2.5 py-1 rounded">
          SIH 2026 DEMO (PS SIH26264)
        </span>
        <span className="text-sm font-medium">AICTE Grievance & Complaints Monitoring System</span>
      </div>
      <div className="flex items-center space-x-3 text-sm">
        <span className="text-gray-300">Switch Role:</span>
        <button
          onClick={() => setCurrentRole('officer')}
          className={`px-3 py-1.5 rounded font-medium transition-all duration-200 ${
            currentRole === 'officer'
              ? 'bg-brand-teal shadow-sm'
              : 'bg-slate-700 opacity-70 hover:opacity-100'
          }`}
        >
          👨‍💼 Officer (Rajesh Verma)
        </button>
        <button
          onClick={() => setCurrentRole('student')}
          className={`px-3 py-1.5 rounded font-medium transition-all duration-200 ${
            currentRole === 'student'
              ? 'bg-brand-teal shadow-sm'
              : 'bg-slate-700 opacity-70 hover:opacity-100'
          }`}
        >
          🎓 Student (Aarav Sharma)
        </button>
      </div>
    </div>
  );
};

// Feedback Button Component
const FeedbackButton: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [feedback, setFeedback] = React.useState('');

  const handleSubmit = () => {
    if (!feedback.trim()) {
      alert('Please enter some feedback.');
      return;
    }
    alert('Thank you! Your feedback has been submitted to the AICTE system.');
    setFeedback('');
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-teal text-white p-3.5 rounded-full shadow-lg hover:bg-brand-teal-dark transition-all flex items-center space-x-2 text-sm font-medium hover:scale-105"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Feedback</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-100 animate-slideUp">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Send System Feedback</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Help us improve the AICTE grievance handling workflow.
            </p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
              placeholder="Enter your comments or suggestions here..."
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm bg-brand-teal text-white rounded-lg hover:bg-brand-teal-dark font-medium transition-all"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Main Content Router
const MainContent: React.FC = () => {
  const { currentPage, currentRole } = useApp();

  if (currentRole === 'student') {
    return <StudentDashboard />;
  }

  switch (currentPage) {
    case 'overview':
      return <OverviewPage />;
    case 'complaints':
      return <ComplaintsPage />;
    case 'priority':
      return <PriorityPage />;
    case 'colleges':
      return <CollegesPage />;
    case 'overlaps':
      return <OverlapsPage />;
    case 'officers':
      return <OfficersPage />;
    case 'reports':
      return <ReportsPage />;
    case 'settings':
      return <SettingsPage />;
    default:
      return <OverviewPage />;
  }
};

// Dashboard Layout
const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <RoleSwitcher />
      <div className="flex-1 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-8 overflow-y-auto">
            <MainContent />
          </main>
        </div>
      </div>
      <CaseDrawer />
      <FeedbackButton />
    </div>
  );
};

// Root App Component
function App() {
  return (
    <AppProvider>
      <DashboardLayout />
    </AppProvider>
  );
}

export default App;
