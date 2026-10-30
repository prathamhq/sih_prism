// Sidebar Navigation Component
import React from 'react';
import {
  LayoutDashboard,
  FileText,
  ListOrdered,
  GraduationCap,
  GitPullRequest,
  Users,
  BarChart3,
  Settings,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavItemProps {
  id: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon: Icon, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-brand-soft text-brand-teal shadow-sm'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
};

export const Sidebar: React.FC = () => {
  const { currentRole, currentUser, currentPage, setCurrentPage, setSelectedComplaint } = useApp();

  const openNextPriority = () => {
    // This will be implemented to open the top priority case
    setCurrentPage('priority');
  };

  const officerNavItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'complaints', label: 'Complaints', icon: FileText },
    { id: 'priority', label: 'Priority list', icon: ListOrdered },
    { id: 'colleges', label: 'Colleges', icon: GraduationCap },
    { id: 'overlaps', label: 'Overlaps', icon: GitPullRequest },
    { id: 'officers', label: 'Officers', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const studentNavItems = [
    { id: 'my-complaints', label: 'My complaints', icon: FileText },
  ];

  const navItems = currentRole === 'officer' ? officerNavItems : studentNavItems;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-4 shadow-sm">
      <div>
        <div className="mb-6 px-2">
          <h1 className="font-bold text-gray-900 text-base">
            {currentRole === 'officer' ? 'AICTE Grievance Desk' : 'Student Portal'}
          </h1>
          <p className="text-xs text-gray-500">
            {currentRole === 'officer' ? 'Officer Portal (SIH 2026)' : 'Complainant View'}
          </p>
        </div>

        {currentRole === 'officer' && (
          <div className="mb-4">
            <button
              onClick={openNextPriority}
              className="w-full bg-brand-teal text-white py-2.5 px-4 rounded-xl text-sm font-medium hover:bg-brand-teal-dark transition-all duration-200 shadow-sm flex items-center justify-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span>Open next priority case</span>
            </button>
          </div>
        )}

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              active={currentPage === item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setSelectedComplaint(null);
              }}
            />
          ))}
        </nav>
      </div>

      <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 px-2">
        {currentRole === 'officer' && currentUser && 'bureau' in currentUser && (
          <>
            <p className="font-medium text-gray-800">{currentUser.name}</p>
            <p>{currentUser.bureau}</p>
            <p className="text-[10px]">{currentUser.region}</p>
          </>
        )}
        {currentRole === 'student' && currentUser && 'college' in currentUser && (
          <>
            <p className="font-medium text-gray-800">{currentUser.name}</p>
            <p>{currentUser.college}</p>
          </>
        )}
      </div>
    </aside>
  );
};
