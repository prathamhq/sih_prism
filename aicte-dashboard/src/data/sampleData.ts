// Sample data generator for AICTE Complaint Monitoring Dashboard
import type {
  Complaint,
  College,
  Officer,
  Student,
  District,
  OverlapAlert,
  ComplaintCategory,
  Bureau,
  PriorityLevel,
  CaseStatus,
} from '../types';

// Madhya Pradesh Districts
export const districts: District[] = [
  { name: 'Indore', state: 'Madhya Pradesh', colleges: 42, openComplaints: 48, amberAlerts: 12, redAlerts: 5 },
  { name: 'Bhopal', state: 'Madhya Pradesh', colleges: 38, openComplaints: 35, amberAlerts: 8, redAlerts: 3 },
  { name: 'Jabalpur', state: 'Madhya Pradesh', colleges: 28, openComplaints: 22, amberAlerts: 5, redAlerts: 2 },
  { name: 'Gwalior', state: 'Madhya Pradesh', colleges: 24, openComplaints: 18, amberAlerts: 4, redAlerts: 1 },
  { name: 'Ujjain', state: 'Madhya Pradesh', colleges: 18, openComplaints: 12, amberAlerts: 3, redAlerts: 1 },
  { name: 'Sagar', state: 'Madhya Pradesh', colleges: 15, openComplaints: 10, amberAlerts: 2, redAlerts: 0 },
  { name: 'Rewa', state: 'Madhya Pradesh', colleges: 12, openComplaints: 8, amberAlerts: 1, redAlerts: 0 },
];

// Sample colleges across Madhya Pradesh
export const colleges: College[] = [
  // Indore
  { name: 'Malwa Institute of Technology', aicteId: 'AICTE-MP-0492', district: 'Indore', state: 'Madhya Pradesh', openComplaints: 8, totalComplaints: 24, solvedComplaints: 16, repeatComplaints: 3, isHotspot: true, latitude: 22.7196, longitude: 75.8577 },
  { name: 'Acropolis Institute of Technology', aicteId: 'AICTE-MP-0311', district: 'Indore', state: 'Madhya Pradesh', openComplaints: 5, totalComplaints: 18, solvedComplaints: 13, repeatComplaints: 2, isHotspot: false, latitude: 22.7532, longitude: 75.8937 },
  { name: 'Shri Vaishnav Institute of Technology', aicteId: 'AICTE-MP-0156', district: 'Indore', state: 'Madhya Pradesh', openComplaints: 3, totalComplaints: 15, solvedComplaints: 12, repeatComplaints: 0, isHotspot: false, latitude: 22.6897, longitude: 75.8636 },
  { name: 'Institute of Engineering & Science IPS Academy', aicteId: 'AICTE-MP-0289', district: 'Indore', state: 'Madhya Pradesh', openComplaints: 6, totalComplaints: 22, solvedComplaints: 16, repeatComplaints: 1, isHotspot: true, latitude: 22.7286, longitude: 75.8877 },
  { name: 'Prestige Institute of Engineering', aicteId: 'AICTE-MP-0445', district: 'Indore', state: 'Madhya Pradesh', openComplaints: 2, totalComplaints: 10, solvedComplaints: 8, repeatComplaints: 0, isHotspot: false, latitude: 22.7477, longitude: 75.9063 },

  // Bhopal
  { name: 'LNCT University', aicteId: 'AICTE-MP-0182', district: 'Bhopal', state: 'Madhya Pradesh', openComplaints: 7, totalComplaints: 28, solvedComplaints: 21, repeatComplaints: 2, isHotspot: true, latitude: 23.2599, longitude: 77.4126 },
  { name: 'Sagar Institute of Research & Technology', aicteId: 'AICTE-MP-0367', district: 'Bhopal', state: 'Madhya Pradesh', openComplaints: 4, totalComplaints: 19, solvedComplaints: 15, repeatComplaints: 1, isHotspot: false, latitude: 23.1815, longitude: 77.4417 },
  { name: 'Truba Institute of Engineering', aicteId: 'AICTE-MP-0523', district: 'Bhopal', state: 'Madhya Pradesh', openComplaints: 5, totalComplaints: 16, solvedComplaints: 11, repeatComplaints: 2, isHotspot: false, latitude: 23.2156, longitude: 77.4739 },
  { name: 'Radharaman Engineering College', aicteId: 'AICTE-MP-0234', district: 'Bhopal', state: 'Madhya Pradesh', openComplaints: 3, totalComplaints: 14, solvedComplaints: 11, repeatComplaints: 0, isHotspot: false, latitude: 23.1929, longitude: 77.4512 },
  { name: 'Lakshmi Narain College of Technology', aicteId: 'AICTE-MP-0198', district: 'Bhopal', state: 'Madhya Pradesh', openComplaints: 6, totalComplaints: 25, solvedComplaints: 19, repeatComplaints: 1, isHotspot: true, latitude: 23.2467, longitude: 77.3917 },

  // Jabalpur
  { name: 'Jabalpur Engineering College', aicteId: 'AICTE-MP-0045', district: 'Jabalpur', state: 'Madhya Pradesh', openComplaints: 4, totalComplaints: 20, solvedComplaints: 16, repeatComplaints: 1, isHotspot: false, latitude: 23.1815, longitude: 79.9864 },
  { name: 'Takshshila Institute of Engineering', aicteId: 'AICTE-MP-0478', district: 'Jabalpur', state: 'Madhya Pradesh', openComplaints: 3, totalComplaints: 12, solvedComplaints: 9, repeatComplaints: 0, isHotspot: false, latitude: 23.1645, longitude: 79.9462 },
  { name: 'Hitkarini College of Engineering', aicteId: 'AICTE-MP-0334', district: 'Jabalpur', state: 'Madhya Pradesh', openComplaints: 5, totalComplaints: 17, solvedComplaints: 12, repeatComplaints: 2, isHotspot: true, latitude: 23.1982, longitude: 80.0134 },

  // Gwalior
  { name: 'SGSITS Indore', aicteId: 'AICTE-MP-0012', district: 'Indore', state: 'Madhya Pradesh', openComplaints: 2, totalComplaints: 8, solvedComplaints: 6, repeatComplaints: 0, isHotspot: false, latitude: 22.6897, longitude: 75.8709 },
  { name: 'Madhav Institute of Technology & Science', aicteId: 'AICTE-MP-0067', district: 'Gwalior', state: 'Madhya Pradesh', openComplaints: 3, totalComplaints: 13, solvedComplaints: 10, repeatComplaints: 0, isHotspot: false, latitude: 26.2183, longitude: 78.1828 },
  { name: 'ITM University', aicteId: 'AICTE-MP-0401', district: 'Gwalior', state: 'Madhya Pradesh', openComplaints: 4, totalComplaints: 18, solvedComplaints: 14, repeatComplaints: 1, isHotspot: false, latitude: 26.2389, longitude: 78.1567 },

  // Ujjain
  { name: 'Vikram University Institute of Engineering', aicteId: 'AICTE-MP-0089', district: 'Ujjain', state: 'Madhya Pradesh', openComplaints: 2, totalComplaints: 11, solvedComplaints: 9, repeatComplaints: 0, isHotspot: false, latitude: 23.1765, longitude: 75.7885 },
  { name: 'Millennium Institute of Technology', aicteId: 'AICTE-MP-0512', district: 'Ujjain', state: 'Madhya Pradesh', openComplaints: 3, totalComplaints: 9, solvedComplaints: 6, repeatComplaints: 1, isHotspot: false, latitude: 23.1934, longitude: 75.8102 },
];

// Officers
export const officers: Officer[] = [
  {
    id: 'OFF-001',
    name: 'Rajesh Verma',
    bureau: 'Regulation Bureau',
    region: 'Regional Office Bhopal',
    state: 'Madhya Pradesh',
    stats: { pending: 12, processing: 28, solved: 145, verification: 7, breached: 4 },
  },
  {
    id: 'OFF-002',
    name: 'Priya Singh',
    bureau: 'Fee Regulation',
    region: 'Regional Office Indore',
    state: 'Madhya Pradesh',
    stats: { pending: 8, processing: 15, solved: 98, verification: 3, breached: 1 },
  },
  {
    id: 'OFF-003',
    name: 'Amit Joshi',
    bureau: 'PGRC',
    region: 'Regional Office Bhopal',
    state: 'Madhya Pradesh',
    stats: { pending: 5, processing: 12, solved: 76, verification: 2, breached: 0 },
  },
  {
    id: 'OFF-004',
    name: 'S. K. Mehta',
    bureau: 'Fee Regulation',
    region: 'Regional Office Jabalpur',
    state: 'Madhya Pradesh',
    stats: { pending: 6, processing: 18, solved: 112, verification: 4, breached: 2 },
  },
  {
    id: 'OFF-005',
    name: 'Sunita Patel',
    bureau: 'Student Welfare',
    region: 'Regional Office Gwalior',
    state: 'Madhya Pradesh',
    stats: { pending: 4, processing: 9, solved: 54, verification: 1, breached: 0 },
  },
];

// Students
export const students: Student[] = [
  {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@student.edu',
    college: 'Malwa Institute of Technology',
    aicteId: 'AICTE-MP-0492',
    complaints: ['AICTE-2026-000123', 'AICTE-2026-000198'],
  },
  {
    name: 'Priya Gupta',
    email: 'priya.gupta@student.edu',
    college: 'LNCT University',
    aicteId: 'AICTE-MP-0182',
    complaints: ['AICTE-2026-000125', 'AICTE-2026-000167'],
  },
  {
    name: 'Rohan Patel',
    email: 'rohan.patel@student.edu',
    college: 'LNCT University',
    aicteId: 'AICTE-MP-0182',
    complaints: ['AICTE-2026-000134'],
  },
];

// Helper function to generate case ID
const generateCaseId = (index: number): string => {
  return `AICTE-2026-${String(index).padStart(6, '0')}`;
};

// Helper to calculate SLA remaining
const calculateSLA = (receivedDate: string, slaDays: number): { slaRemaining: string; slaDays: number } => {
  const received = new Date(receivedDate);
  const deadline = new Date(received);
  deadline.setDate(deadline.getDate() + slaDays);

  const now = new Date('2026-10-30');
  const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    return { slaRemaining: `Breached by ${Math.abs(daysLeft)} days`, slaDays: daysLeft };
  } else if (daysLeft === 0) {
    return { slaRemaining: 'Due today', slaDays: 0 };
  } else if (daysLeft <= 2) {
    return { slaRemaining: `${daysLeft} day${daysLeft > 1 ? 's' : ''} left (At Risk)`, slaDays: daysLeft };
  } else {
    return { slaRemaining: `${daysLeft} days left`, slaDays: daysLeft };
  }
};

// Generate comprehensive complaint data
export const complaints: Complaint[] = [
  // High priority / Critical cases
  {
    id: generateCaseId(123),
    college: 'Malwa Institute of Technology',
    aicteId: 'AICTE-MP-0492',
    category: 'Hostel',
    bureau: 'Regulation Bureau',
    officer: 'Rajesh Verma',
    receivedDate: '2026-10-18',
    ...calculateSLA('2026-10-18', 15),
    status: 'Under processing',
    priority: 'High',
    priorityScore: 85,
    priorityReason: 'Repeat complaint within 7 days + Hotspot college',
    isRepeat: true,
    isHotspot: true,
    description: 'Unsanitary drinking water coolers and broken door latches in Block C hostel. Multiple students affected for past two weeks. Health concerns raised.',
    complainant: 'Aarav Sharma',
    complainantContact: 'aarav.sharma@student.edu',
    timeline: [
      { actor: 'System', action: 'Received', note: 'Auto-routed to Regulation Bureau', timestamp: '2026-10-18T09:15:00Z' },
      { actor: 'Rajesh Verma', action: 'Taken', note: 'SLA timer initiated (15 days). Inspection team assigned.', timestamp: '2026-10-19T10:30:00Z' },
      { actor: 'Rajesh Verma', action: 'Updated', note: 'On-site inspection scheduled for Oct 25', timestamp: '2026-10-22T14:20:00Z' },
    ],
    district: 'Indore',
    state: 'Madhya Pradesh',
  },
  {
    id: generateCaseId(145),
    college: 'Acropolis Institute of Technology',
    aicteId: 'AICTE-MP-0311',
    category: 'Harassment',
    bureau: 'Student Welfare',
    officer: 'Sunita Patel',
    receivedDate: '2026-10-25',
    ...calculateSLA('2026-10-25', 7),
    status: 'Under processing',
    priority: 'Critical',
    priorityScore: 98,
    priorityReason: 'Critical category (Harassment) - Highest priority',
    isRepeat: false,
    isHotspot: false,
    description: 'Faculty member making inappropriate comments and showing gender bias in classroom. Student feeling unsafe attending lectures.',
    complainant: 'Anonymous Student',
    timeline: [
      { actor: 'System', action: 'Received', note: 'Auto-routed to Student Welfare (Critical Priority)', timestamp: '2026-10-25T11:45:00Z' },
      { actor: 'Sunita Patel', action: 'Taken', note: 'Immediate priority. Internal committee formed.', timestamp: '2026-10-25T13:00:00Z' },
    ],
    district: 'Indore',
    state: 'Madhya Pradesh',
  },
  {
    id: generateCaseId(156),
    college: 'LNCT University',
    aicteId: 'AICTE-MP-0182',
    category: 'Faculty shortage',
    bureau: 'Regulation Bureau',
    officer: 'Rajesh Verma',
    receivedDate: '2026-10-20',
    ...calculateSLA('2026-10-20', 15),
    status: 'Pending verification',
    priority: 'High',
    priorityScore: 78,
    priorityReason: 'SLA at risk + Hotspot college',
    isRepeat: false,
    isHotspot: true,
    description: 'Only 1 professor handling Advanced Data Structures course for 120 students. No lab assistants assigned. Classes frequently cancelled.',
    complainant: 'Priya Gupta',
    complainantContact: 'priya.gupta@student.edu',
    proof: 'faculty_audit_report.pdf',
    timeline: [
      { actor: 'System', action: 'Received', note: 'Auto-routed to Regulation Bureau', timestamp: '2026-10-20T08:30:00Z' },
      { actor: 'Rajesh Verma', action: 'Taken', note: 'Faculty audit requested', timestamp: '2026-10-21T09:00:00Z' },
      { actor: 'Rajesh Verma', action: 'Mark Solved', note: 'Uploaded faculty deployment compliance report. 2 additional professors assigned.', timestamp: '2026-10-28T16:45:00Z' },
    ],
    district: 'Bhopal',
    state: 'Madhya Pradesh',
  },
  // Medium priority cases
  {
    id: generateCaseId(124),
    college: 'Acropolis Institute of Technology',
    aicteId: 'AICTE-MP-0311',
    category: 'Fee fraud',
    bureau: 'Fee Regulation',
    officer: 'S. K. Mehta',
    receivedDate: '2026-10-15',
    ...calculateSLA('2026-10-15', 15),
    status: 'Pending',
    priority: 'Medium',
    priorityScore: 62,
    priorityReason: 'Standard queue - adequate SLA time',
    isRepeat: false,
    isHotspot: false,
    description: 'College charging arbitrary development fees of ₹25,000 outside approved AICTE fee structure. No prior notice given to students.',
    complainant: 'Priya Singh',
    complainantContact: 'priya.singh@student.edu',
    timeline: [
      { actor: 'System', action: 'Received', note: 'Auto-routed to Fee Regulation', timestamp: '2026-10-15T10:20:00Z' },
    ],
    district: 'Indore',
    state: 'Madhya Pradesh',
  },
  {
    id: generateCaseId(178),
    college: 'Sagar Institute of Research & Technology',
    aicteId: 'AICTE-MP-0367',
    category: 'Library facilities',
    bureau: 'Regulation Bureau',
    officer: 'Rajesh Verma',
    receivedDate: '2026-10-22',
    ...calculateSLA('2026-10-22', 15),
    status: 'Pending',
    priority: 'Medium',
    priorityScore: 55,
    priorityReason: 'Standard priority - infrastructure issue',
    isRepeat: false,
    isHotspot: false,
    description: 'Digital library access credentials not provided for 3 months. Several IEEE and ACM journals unavailable.',
    complainant: 'Karan Malhotra',
    timeline: [
      { actor: 'System', action: 'Received', note: 'Auto-routed to Regulation Bureau', timestamp: '2026-10-22T14:10:00Z' },
    ],
    district: 'Bhopal',
    state: 'Madhya Pradesh',
  },
  {
    id: generateCaseId(189),
    college: 'Institute of Engineering & Science IPS Academy',
    aicteId: 'AICTE-MP-0289',
    category: 'Infrastructure',
    bureau: 'Regulation Bureau',
    officer: 'Rajesh Verma',
    receivedDate: '2026-10-12',
    ...calculateSLA('2026-10-12', 15),
    status: 'Under processing',
    priority: 'Medium',
    priorityScore: 64,
    priorityReason: 'Hotspot college flag',
    isRepeat: false,
    isHotspot: true,
    description: 'Computer lab air conditioning system broken for 2 weeks. Lab temperature exceeds 35°C affecting practicals.',
    complainant: 'Rahul Jain',
    timeline: [
      { actor: 'System', action: 'Received', note: 'Auto-routed to Regulation Bureau', timestamp: '2026-10-12T09:40:00Z' },
      { actor: 'Rajesh Verma', action: 'Taken', note: 'Maintenance verification in progress', timestamp: '2026-10-14T11:15:00Z' },
    ],
    district: 'Indore',
    state: 'Madhya Pradesh',
  },
  // Low priority / Solved cases
  {
    id: generateCaseId(126),
    college: 'SGSITS Indore',
    aicteId: 'AICTE-MP-0012',
    category: 'Infrastructure',
    bureau: 'PGRC',
    officer: 'Amit Joshi',
    receivedDate: '2026-10-05',
    ...calculateSLA('2026-10-05', 15),
    status: 'Solved',
    priority: 'Low',
    priorityScore: 35,
    priorityReason: 'Resolved within SLA',
    isRepeat: false,
    isHotspot: false,
    description: 'Laboratory oscilloscope calibration expired across ECE department. 12 equipment units affected.',
    complainant: 'Neha Gupta',
    complainantContact: 'neha.gupta@student.edu',
    proof: 'calibration_certificates.pdf',
    timeline: [
      { actor: 'System', action: 'Received', note: 'Auto-routed to PGRC', timestamp: '2026-10-05T10:00:00Z' },
      { actor: 'Amit Joshi', action: 'Taken', note: 'Calibration audit scheduled', timestamp: '2026-10-06T09:30:00Z' },
      { actor: 'Amit Joshi', action: 'Mark Solved', note: 'All equipment recalibrated. Certificates verified and uploaded.', timestamp: '2026-10-15T15:20:00Z' },
      { actor: 'Neha Gupta', action: 'Confirmed', note: 'Student verified resolution. Case closed.', timestamp: '2026-10-16T10:45:00Z' },
    ],
    district: 'Indore',
    state: 'Madhya Pradesh',
  },
  {
    id: generateCaseId(198),
    college: 'Malwa Institute of Technology',
    aicteId: 'AICTE-MP-0492',
    category: 'Hostel',
    bureau: 'Regulation Bureau',
    officer: 'Rajesh Verma',
    receivedDate: '2026-10-10',
    ...calculateSLA('2026-10-10', 15),
    status: 'Solved',
    priority: 'Medium',
    priorityScore: 68,
    priorityReason: 'Same complainant as AICTE-2026-000123 (linked)',
    isRepeat: true,
    isHotspot: true,
    description: 'Wi-Fi connectivity issues in hostel Block B. Internet speeds below 1 Mbps affecting online classes.',
    complainant: 'Aarav Sharma',
    linkedCases: ['AICTE-2026-000123'],
    proof: 'network_upgrade_certificate.pdf',
    timeline: [
      { actor: 'System', action: 'Received', note: 'Auto-routed to Regulation Bureau. Linked to AICTE-2026-000123', timestamp: '2026-10-10T11:20:00Z' },
      { actor: 'Rajesh Verma', action: 'Taken', note: 'Network audit requested', timestamp: '2026-10-11T10:00:00Z' },
      { actor: 'Rajesh Verma', action: 'Mark Solved', note: 'New routers installed. Speed upgraded to 50 Mbps.', timestamp: '2026-10-20T17:30:00Z' },
      { actor: 'Aarav Sharma', action: 'Confirmed', note: 'Connection verified. Working well now.', timestamp: '2026-10-21T09:15:00Z' },
    ],
    district: 'Indore',
    state: 'Madhya Pradesh',
  },
  {
    id: generateCaseId(134),
    college: 'LNCT University',
    aicteId: 'AICTE-MP-0182',
    category: 'Food quality',
    bureau: 'Student Welfare',
    officer: 'Sunita Patel',
    receivedDate: '2026-10-08',
    ...calculateSLA('2026-10-08', 15),
    status: 'Solved',
    priority: 'Low',
    priorityScore: 42,
    priorityReason: 'Resolved quickly',
    isRepeat: false,
    isHotspot: false,
    description: 'Mess food quality degraded. Stale vegetables served multiple times. Students experiencing stomach issues.',
    complainant: 'Rohan Patel',
    proof: 'food_safety_audit.pdf',
    timeline: [
      { actor: 'System', action: 'Received', note: 'Auto-routed to Student Welfare', timestamp: '2026-10-08T12:30:00Z' },
      { actor: 'Sunita Patel', action: 'Taken', note: 'Food safety inspection ordered', timestamp: '2026-10-09T08:00:00Z' },
      { actor: 'Sunita Patel', action: 'Mark Solved', note: 'New mess vendor appointed. Quality standards enforced.', timestamp: '2026-10-18T14:00:00Z' },
      { actor: 'Rohan Patel', action: 'Confirmed', note: 'Food quality improved significantly.', timestamp: '2026-10-19T11:30:00Z' },
    ],
    district: 'Bhopal',
    state: 'Madhya Pradesh',
  },
];

// Add more complaints to reach 150-200 total
const additionalCategories: ComplaintCategory[] = ['Examination issues', 'Malpractice', 'Infrastructure', 'Library facilities'];
const additionalColleges = colleges.slice(5, 18); // Use remaining colleges

for (let i = 200; i < 280; i++) {
  const college = additionalColleges[i % additionalColleges.length];
  const category = additionalCategories[i % additionalCategories.length];
  const bureau: Bureau = category === 'Examination issues' ? 'Examination Cell' :
                         category === 'Malpractice' ? 'Regulation Bureau' :
                         'PGRC';
  const officer = officers[i % officers.length];
  const receivedDate = new Date('2026-10-30');
  receivedDate.setDate(receivedDate.getDate() - Math.floor(Math.random() * 30));
  const receivedDateStr = receivedDate.toISOString().split('T')[0];

  const statuses: CaseStatus[] = ['Pending', 'Under processing', 'Solved', 'Pending verification'];
  const status = statuses[i % statuses.length];
  const priority: PriorityLevel = i % 5 === 0 ? 'High' : i % 3 === 0 ? 'Medium' : 'Low';

  complaints.push({
    id: generateCaseId(i),
    college: college.name,
    aicteId: college.aicteId,
    category,
    bureau,
    officer: officer.name,
    receivedDate: receivedDateStr,
    ...calculateSLA(receivedDateStr, 15),
    status,
    priority,
    priorityScore: Math.floor(Math.random() * 40) + 30,
    priorityReason: 'Standard processing queue',
    isRepeat: Math.random() > 0.9,
    isHotspot: college.isHotspot,
    description: `Complaint regarding ${category.toLowerCase()} at ${college.name}. Details under investigation.`,
    complainant: `Student ${i}`,
    timeline: [
      { actor: 'System', action: 'Received', note: `Auto-routed to ${bureau}`, timestamp: `${receivedDateStr}T${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:00Z` },
    ],
    district: college.district,
    state: college.state,
  });
}

// Overlap alerts
export const overlapAlerts: OverlapAlert[] = [
  {
    id: 'OVL-001',
    title: 'Same college, same issue, also with PGRC',
    case1: 'AICTE-2026-000123',
    case2: 'AICTE-2026-000198',
    college: 'Malwa Institute of Technology',
    category: 'Hostel',
    similarity: 87,
    linked: true,
  },
  {
    id: 'OVL-002',
    title: 'Similar infrastructure complaint at different bureau',
    case1: 'AICTE-2026-000189',
    case2: 'AICTE-2026-000215',
    college: 'Institute of Engineering & Science IPS Academy',
    category: 'Infrastructure',
    similarity: 76,
    linked: false,
  },
  {
    id: 'OVL-003',
    title: 'Duplicate fee complaint across bureaus',
    case1: 'AICTE-2026-000124',
    case2: 'AICTE-2026-000203',
    college: 'Acropolis Institute of Technology',
    category: 'Fee fraud',
    similarity: 92,
    linked: false,
  },
];

// Export default data
export const sampleData = {
  complaints,
  colleges,
  officers,
  students,
  districts,
  overlapAlerts,
};

export default sampleData;
