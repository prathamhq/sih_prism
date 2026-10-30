// Utility functions for the AICTE Dashboard

import { format, formatDistanceToNow, parseISO } from 'date-fns';
import type { Complaint, DashboardStats, TrendDataPoint } from '../types';

/**
 * Format date to readable string
 */
export const formatDate = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'MMM dd, yyyy');
  } catch {
    return 'Invalid date';
  }
};

/**
 * Get relative time (e.g., "2 days ago")
 */
export const getRelativeTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch {
    return 'Unknown';
  }
};

/**
 * Get status color classes
 */
export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
    'Under processing': 'bg-blue-50 text-blue-700 border-blue-200',
    'Pending verification': 'bg-purple-50 text-purple-700 border-purple-200',
    'Solved': 'bg-green-50 text-green-700 border-green-200',
    'Reopened': 'bg-red-50 text-red-700 border-red-200',
    'Unverified': 'bg-gray-50 text-gray-700 border-gray-200',
  };
  return statusColors[status] || 'bg-gray-50 text-gray-700';
};

/**
 * Get priority color classes
 */
export const getPriorityColor = (priority: string): string => {
  const priorityColors: Record<string, string> = {
    'Critical': 'bg-red-600 text-white',
    'High': 'bg-red-500 text-white',
    'Medium': 'bg-amber-500 text-white',
    'Low': 'bg-gray-400 text-white',
  };
  return priorityColors[priority] || 'bg-gray-400 text-white';
};

/**
 * Get SLA status color
 */
export const getSLAColor = (slaDays: number): string => {
  if (slaDays < 0) return 'text-red-600 bg-red-50';
  if (slaDays <= 2) return 'text-amber-600 bg-amber-50';
  return 'text-green-600 bg-green-50';
};

/**
 * Calculate dashboard statistics
 */
export const calculateStats = (complaints: Complaint[]): DashboardStats => {
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const processing = complaints.filter(c => c.status === 'Under processing').length;
  const verification = complaints.filter(c => c.status === 'Pending verification').length;
  const solved = complaints.filter(c => c.status === 'Solved').length;
  const slaRisk = complaints.filter(c => c.slaDays >= 0 && c.slaDays <= 2 || c.slaDays < 0).length;
  const totalCases = complaints.length;
  const solvedPercentage = totalCases > 0 ? Math.round((solved / totalCases) * 100) : 0;

  return {
    pending,
    processing,
    verification,
    slaRisk,
    solved,
    totalCases,
    solvedPercentage,
  };
};

/**
 * Generate trend data for charts (last 7 weeks)
 */
export const generateTrendData = (complaints: Complaint[]): TrendDataPoint[] => {
  const weeks = 7;
  const now = new Date('2026-10-30');
  const data: TrendDataPoint[] = [];

  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - (i * 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const weekComplaints = complaints.filter(c => {
      const receivedDate = new Date(c.receivedDate);
      return receivedDate >= weekStart && receivedDate <= weekEnd;
    });

    const received = weekComplaints.length;
    const solved = weekComplaints.filter(c => c.status === 'Solved').length;
    const pending = received - solved;

    data.push({
      date: format(weekStart, 'MMM dd'),
      received,
      solved,
      pending,
    });
  }

  return data;
};

/**
 * Sort complaints by priority score (ML-based ranking)
 */
export const sortByPriority = (complaints: Complaint[]): Complaint[] => {
  return [...complaints].sort((a, b) => {
    // Critical priority always at top
    if (a.priority === 'Critical' && b.priority !== 'Critical') return -1;
    if (b.priority === 'Critical' && a.priority !== 'Critical') return 1;

    // Then by priority score
    return b.priorityScore - a.priorityScore;
  });
};

/**
 * Filter complaints by various criteria
 */
export const filterComplaints = (
  complaints: Complaint[],
  filters: {
    status?: string;
    bureau?: string;
    district?: string;
    category?: string;
    dateFrom?: string;
    dateTo?: string;
    search?: string;
  }
): Complaint[] => {
  return complaints.filter(complaint => {
    if (filters.status && complaint.status !== filters.status) return false;
    if (filters.bureau && complaint.bureau !== filters.bureau) return false;
    if (filters.district && complaint.district !== filters.district) return false;
    if (filters.category && complaint.category !== filters.category) return false;

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      const complaintDate = new Date(complaint.receivedDate);
      if (complaintDate < fromDate) return false;
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      const complaintDate = new Date(complaint.receivedDate);
      if (complaintDate > toDate) return false;
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        complaint.id.toLowerCase().includes(searchLower) ||
        complaint.college.toLowerCase().includes(searchLower) ||
        complaint.aicteId.toLowerCase().includes(searchLower) ||
        complaint.description.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });
};

/**
 * Group complaints by category
 */
export const groupByCategory = (complaints: Complaint[]): Record<string, number> => {
  return complaints.reduce((acc, complaint) => {
    acc[complaint.category] = (acc[complaint.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

/**
 * Calculate SLA health percentages
 */
export const calculateSLAHealth = (complaints: Complaint[]): {
  onTime: number;
  atRisk: number;
  breached: number;
} => {
  const activeComplaints = complaints.filter(c =>
    c.status !== 'Solved' && c.status !== 'Unverified'
  );

  const total = activeComplaints.length;
  if (total === 0) return { onTime: 0, atRisk: 0, breached: 0 };

  const breached = activeComplaints.filter(c => c.slaDays < 0).length;
  const atRisk = activeComplaints.filter(c => c.slaDays >= 0 && c.slaDays <= 2).length;
  const onTime = total - breached - atRisk;

  return {
    onTime: Math.round((onTime / total) * 100),
    atRisk: Math.round((atRisk / total) * 100),
    breached: Math.round((breached / total) * 100),
  };
};

/**
 * Get top colleges by complaint count
 */
export const getTopCollegesByComplaints = (
  complaints: Complaint[],
  limit: number = 5
): Array<{ college: string; aicteId: string; count: number }> => {
  const collegeCounts = complaints.reduce((acc, complaint) => {
    const key = `${complaint.college}|${complaint.aicteId}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(collegeCounts)
    .map(([key, count]) => {
      const [college, aicteId] = key.split('|');
      return { college, aicteId, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

/**
 * Generate random ID for new complaints
 */
export const generateComplaintId = (): string => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `AICTE-${year}-${random}`;
};

/**
 * Debounce function for search inputs
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Format large numbers with K/M suffix
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

/**
 * Export data to CSV
 */
export const exportToCSV = (data: Complaint[], filename: string = 'complaints.csv'): void => {
  const headers = [
    'Case ID',
    'College',
    'AICTE ID',
    'Category',
    'Bureau',
    'Officer',
    'Received Date',
    'SLA Remaining',
    'Status',
    'Priority',
    'District',
    'State',
  ];

  const rows = data.map(c => [
    c.id,
    c.college,
    c.aicteId,
    c.category,
    c.bureau,
    c.officer,
    c.receivedDate,
    c.slaRemaining,
    c.status,
    c.priority,
    c.district,
    c.state,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
