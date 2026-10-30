// Core data types for the AICTE Complaint Monitoring Dashboard

export type CaseStatus =
  | 'Pending'
  | 'Under processing'
  | 'Pending verification'
  | 'Solved'
  | 'Reopened'
  | 'Unverified';

export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export type ComplaintCategory =
  | 'Hostel'
  | 'Fee fraud'
  | 'Faculty shortage'
  | 'Infrastructure'
  | 'Harassment'
  | 'Ragging'
  | 'Malpractice'
  | 'Food quality'
  | 'Library facilities'
  | 'Examination issues';

export type Bureau =
  | 'Regulation Bureau'
  | 'Fee Regulation'
  | 'PGRC'
  | 'Student Welfare'
  | 'Examination Cell';

export type UserRole = 'officer' | 'student' | 'admin' | 'regional';

export interface TimelineEntry {
  actor: string;
  action: string;
  note: string;
  timestamp: string;
}

export interface Complaint {
  id: string;
  college: string;
  aicteId: string;
  category: ComplaintCategory;
  bureau: Bureau;
  officer: string;
  receivedDate: string;
  slaRemaining: string;
  slaDays: number; // Days remaining (negative if breached)
  status: CaseStatus;
  priority: PriorityLevel;
  priorityScore: number; // ML-based priority score (0-100)
  priorityReason: string;
  isRepeat: boolean;
  isHotspot: boolean;
  description: string;
  complainant: string;
  complainantContact?: string;
  proof?: string;
  timeline: TimelineEntry[];
  linkedCases?: string[];
  district: string;
  state: string;
}

export interface College {
  name: string;
  aicteId: string;
  district: string;
  state: string;
  openComplaints: number;
  totalComplaints: number;
  solvedComplaints: number;
  repeatComplaints: number;
  isHotspot: boolean;
  latitude?: number;
  longitude?: number;
}

export interface Officer {
  id: string;
  name: string;
  bureau: Bureau;
  region: string;
  state: string;
  stats: {
    pending: number;
    processing: number;
    solved: number;
    verification: number;
    breached: number;
  };
}

export interface Student {
  name: string;
  email: string;
  college: string;
  aicteId: string;
  complaints: string[]; // Complaint IDs
}

export interface District {
  name: string;
  state: string;
  colleges: number;
  openComplaints: number;
  amberAlerts: number; // SLA at risk
  redAlerts: number; // SLA breached or critical
}

export interface OverlapAlert {
  id: string;
  title: string;
  case1: string;
  case2: string;
  college: string;
  category: ComplaintCategory;
  similarity: number; // 0-100
  linked: boolean;
}

export interface DashboardStats {
  pending: number;
  processing: number;
  verification: number;
  slaRisk: number;
  solved: number;
  totalCases: number;
  solvedPercentage: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface TrendDataPoint {
  date: string;
  received: number;
  solved: number;
  pending: number;
}
