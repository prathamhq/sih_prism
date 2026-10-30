// Application context and state management
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Complaint, Officer, Student, UserRole } from '../types';
import { complaints as initialComplaints, officers, students } from '../data/sampleData';

interface AppContextType {
  // User state
  currentRole: UserRole;
  currentUser: Officer | Student | null;
  setCurrentRole: (role: UserRole) => void;

  // Complaints state
  complaints: Complaint[];
  selectedComplaint: Complaint | null;
  setSelectedComplaint: (complaint: Complaint | null) => void;
  updateComplaintStatus: (id: string, status: Complaint['status'], note?: string) => void;
  addComplaint: (complaint: Complaint) => void;

  // UI state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;

  // Filters
  filters: {
    status?: string;
    bureau?: string;
    district?: string;
    category?: string;
    search?: string;
  };
  setFilters: (filters: AppContextType['filters']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('officer');
  const [currentUser, setCurrentUser] = useState<Officer | Student | null>(officers[0]);
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('overview');
  const [filters, setFilters] = useState<AppContextType['filters']>({});

  // Update current user when role changes
  useEffect(() => {
    if (currentRole === 'officer') {
      setCurrentUser(officers[0]); // Rajesh Verma
      setCurrentPage('overview');
    } else if (currentRole === 'student') {
      setCurrentUser(students[0]); // Aarav Sharma
      setCurrentPage('my-complaints');
    }
  }, [currentRole]);

  // Update complaint status
  const updateComplaintStatus = (id: string, status: Complaint['status'], note?: string) => {
    setComplaints(prev => prev.map(complaint => {
      if (complaint.id === id) {
        const timeline = [...complaint.timeline];
        const currentUserName = currentRole === 'officer'
          ? (currentUser as Officer)?.name
          : (currentUser as Student)?.name;

        if (note) {
          timeline.push({
            actor: currentUserName || 'System',
            action: status === 'Under processing' ? 'Taken' :
                   status === 'Pending verification' ? 'Mark Solved' :
                   status === 'Solved' ? 'Confirmed' :
                   status === 'Reopened' ? 'Rejected' : 'Updated',
            note,
            timestamp: new Date().toISOString(),
          });
        }

        return {
          ...complaint,
          status,
          timeline,
          ...(status === 'Pending verification' && { proof: 'resolution_proof.pdf' }),
        };
      }
      return complaint;
    }));
  };

  // Add new complaint
  const addComplaint = (complaint: Complaint) => {
    setComplaints(prev => [complaint, ...prev]);
  };

  const value: AppContextType = {
    currentRole,
    currentUser,
    setCurrentRole,
    complaints,
    selectedComplaint,
    setSelectedComplaint,
    updateComplaintStatus,
    addComplaint,
    sidebarOpen,
    setSidebarOpen,
    currentPage,
    setCurrentPage,
    filters,
    setFilters,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
