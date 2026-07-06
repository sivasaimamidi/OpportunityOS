// ============================================================
// OpportunityOS AI — Mock Data Service
// Production-ready interfaces with mock data for development
// Replace with real API calls by changing service implementations
// ============================================================

import type {
  Opportunity,
  UserProfile,
  CareerScore,
  AnalyticsData,
  AIAnalysis,
  AIDailyBrief,
  AIChatMessage,
  AppNotification,
  CalendarEvent,
} from '@/types';
import { generateId, getUrgencyLevel } from '@/lib/utils';

// ---- Helpers ----

function daysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

// ---- Mock Opportunities ----

export const mockOpportunities: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Google Summer of Code 2026',
    type: 'internship',
    status: 'preparing',
    description: 'Contribute to open-source projects with Google mentorship. Build real-world software used by millions.',
    url: 'https://summerofcode.withgoogle.com',
    organization: 'Google',
    location: 'Remote',
    isRemote: true,
    deadline: daysFromNow(18),
    startDate: daysFromNow(45),
    endDate: daysFromNow(135),
    createdAt: daysAgo(5),
    updatedAt: daysAgo(1),
    summary: 'Google Summer of Code is a global program focused on introducing students to open source development. Students work with mentoring organizations on 10-22 week programming projects during their break from university.',
    requirements: ['Currently enrolled student', 'Strong programming skills', 'Open-source contribution experience preferred', 'Available for 10-22 weeks'],
    difficulty: 'advanced',
    estimatedHours: 350,
    priorityScore: 95,
    careerScore: 92,
    resumeImpact: 'High — GSOC is one of the most prestigious programs for student developers',
    winningTips: ['Start contributing to orgs early', 'Write a strong proposal', 'Engage with community before applying'],
    progress: 35,
    checklist: [
      { id: 'c1', text: 'Research participating organizations', completed: true, estimatedMinutes: 120 },
      { id: 'c2', text: 'Set up development environment', completed: true, estimatedMinutes: 60 },
      { id: 'c3', text: 'Make first contribution to chosen org', completed: false, estimatedMinutes: 240 },
      { id: 'c4', text: 'Draft project proposal', completed: false, estimatedMinutes: 300 },
      { id: 'c5', text: 'Get proposal reviewed by mentor', completed: false, estimatedMinutes: 60 },
      { id: 'c6', text: 'Submit application', completed: false, estimatedMinutes: 30 },
    ],
    tags: ['open-source', 'programming', 'google'],
    attachments: [],
    urgency: 'upcoming',
    daysUntilDeadline: 18,
  },
  {
    id: 'opp-2',
    title: 'MLH Global Hack Week',
    type: 'hackathon',
    status: 'interested',
    description: 'Week-long hackathon with daily challenges, workshops, and prizes. Build projects, learn new skills, and compete globally.',
    url: 'https://ghw.mlh.io',
    organization: 'Major League Hacking',
    location: 'Remote',
    isRemote: true,
    deadline: daysFromNow(5),
    startDate: daysFromNow(5),
    endDate: daysFromNow(12),
    createdAt: daysAgo(3),
    updatedAt: daysAgo(1),
    summary: 'MLH Global Hack Week is a week-long celebration of hacking with daily challenges, mini-hackathons, and workshops.',
    requirements: ['Any student worldwide', 'Basic coding skills', 'Team of 1-4 members'],
    difficulty: 'intermediate',
    estimatedHours: 40,
    priorityScore: 78,
    careerScore: 65,
    resumeImpact: 'Medium — Shows initiative and ability to ship quickly',
    winningTips: ['Focus on one challenge per day', 'Network with other hackers', 'Document your project well'],
    progress: 10,
    checklist: [
      { id: 'c7', text: 'Register on MLH platform', completed: true, estimatedMinutes: 15 },
      { id: 'c8', text: 'Form a team', completed: false, estimatedMinutes: 60 },
      { id: 'c9', text: 'Brainstorm project ideas', completed: false, estimatedMinutes: 90 },
      { id: 'c10', text: 'Set up project repository', completed: false, estimatedMinutes: 30 },
    ],
    tags: ['hackathon', 'mlh', 'coding'],
    attachments: [],
    urgency: 'soon',
    daysUntilDeadline: 5,
  },
  {
    id: 'opp-3',
    title: 'AWS Certified Cloud Practitioner',
    type: 'certification',
    status: 'in-progress',
    description: 'Foundational AWS certification validating cloud concepts, services, and terminology.',
    url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    organization: 'Amazon Web Services',
    deadline: daysFromNow(25),
    createdAt: daysAgo(14),
    updatedAt: daysAgo(2),
    summary: 'The AWS Certified Cloud Practitioner validates foundational understanding of AWS Cloud concepts, services, and terminology.',
    requirements: ['No prerequisites', '6 months of AWS Cloud exposure recommended'],
    difficulty: 'beginner',
    estimatedHours: 40,
    priorityScore: 82,
    careerScore: 75,
    resumeImpact: 'High — Cloud certifications are highly valued by employers',
    progress: 60,
    checklist: [
      { id: 'c11', text: 'Complete AWS Cloud Concepts module', completed: true, estimatedMinutes: 300 },
      { id: 'c12', text: 'Complete AWS Security module', completed: true, estimatedMinutes: 240 },
      { id: 'c13', text: 'Complete AWS Technology module', completed: true, estimatedMinutes: 300 },
      { id: 'c14', text: 'Complete Billing & Pricing module', completed: false, estimatedMinutes: 180 },
      { id: 'c15', text: 'Take practice exam 1', completed: false, estimatedMinutes: 90 },
      { id: 'c16', text: 'Take practice exam 2', completed: false, estimatedMinutes: 90 },
      { id: 'c17', text: 'Schedule and take the exam', completed: false, estimatedMinutes: 90 },
    ],
    tags: ['aws', 'cloud', 'certification'],
    attachments: [],
    urgency: 'upcoming',
    daysUntilDeadline: 25,
  },
  {
    id: 'opp-4',
    title: 'Data Structures & Algorithms Assignment',
    type: 'assignment',
    status: 'in-progress',
    description: 'Implement AVL trees, graph algorithms (Dijkstra, BFS, DFS), and dynamic programming problems.',
    organization: 'University',
    deadline: daysFromNow(2),
    createdAt: daysAgo(7),
    updatedAt: new Date().toISOString(),
    difficulty: 'intermediate',
    estimatedHours: 12,
    priorityScore: 90,
    careerScore: 50,
    progress: 45,
    checklist: [
      { id: 'c18', text: 'Implement AVL Tree with rotations', completed: true, estimatedMinutes: 180 },
      { id: 'c19', text: "Implement Dijkstra's Algorithm", completed: true, estimatedMinutes: 120 },
      { id: 'c20', text: 'Implement BFS and DFS traversals', completed: false, estimatedMinutes: 90 },
      { id: 'c21', text: 'Solve DP problems (knapsack, LCS)', completed: false, estimatedMinutes: 150 },
      { id: 'c22', text: 'Write test cases and documentation', completed: false, estimatedMinutes: 60 },
    ],
    tags: ['dsa', 'algorithms', 'university'],
    attachments: [],
    urgency: 'urgent',
    daysUntilDeadline: 2,
  },
  {
    id: 'opp-5',
    title: 'Rhodes Scholarship 2026',
    type: 'scholarship',
    status: 'discovered',
    description: 'The oldest and most prestigious international scholarship, funding postgraduate study at the University of Oxford.',
    url: 'https://www.rhodeshouse.ox.ac.uk/scholarships/',
    organization: 'Rhodes Trust',
    location: 'Oxford, UK',
    deadline: daysFromNow(60),
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2),
    summary: 'The Rhodes Scholarship funds full-time postgraduate study at Oxford. It covers university and college fees, a personal stipend, and travel.',
    requirements: ['Age 19-25', 'Undergraduate degree', 'Outstanding academic achievement', 'Leadership and service'],
    difficulty: 'expert',
    estimatedHours: 80,
    priorityScore: 70,
    careerScore: 99,
    resumeImpact: 'Exceptional — Life-changing credential',
    progress: 0,
    checklist: [
      { id: 'c23', text: 'Verify eligibility requirements', completed: false, estimatedMinutes: 30 },
      { id: 'c24', text: 'Gather academic transcripts', completed: false, estimatedMinutes: 120 },
      { id: 'c25', text: 'Draft personal statement', completed: false, estimatedMinutes: 600 },
      { id: 'c26', text: 'Secure recommendation letters', completed: false, estimatedMinutes: 180 },
      { id: 'c27', text: 'Complete application form', completed: false, estimatedMinutes: 120 },
    ],
    tags: ['scholarship', 'oxford', 'postgrad'],
    attachments: [],
    urgency: 'relaxed',
    daysUntilDeadline: 60,
  },
  {
    id: 'opp-6',
    title: 'Codeforces Round #950 (Div. 2)',
    type: 'coding-contest',
    status: 'interested',
    description: 'Competitive programming contest on Codeforces. Solve algorithmic problems within 2 hours.',
    url: 'https://codeforces.com/contests',
    organization: 'Codeforces',
    deadline: daysFromNow(1),
    startDate: daysFromNow(1),
    createdAt: daysAgo(4),
    updatedAt: daysAgo(1),
    difficulty: 'advanced',
    estimatedHours: 3,
    priorityScore: 65,
    careerScore: 55,
    progress: 20,
    checklist: [
      { id: 'c28', text: 'Practice similar rated problems', completed: true, estimatedMinutes: 120 },
      { id: 'c29', text: 'Review contest templates', completed: false, estimatedMinutes: 30 },
      { id: 'c30', text: 'Compete in the contest', completed: false, estimatedMinutes: 120 },
    ],
    tags: ['competitive-programming', 'codeforces'],
    attachments: [],
    urgency: 'critical',
    daysUntilDeadline: 1,
  },
  {
    id: 'opp-7',
    title: 'Stanford CS Research Assistantship',
    type: 'research',
    status: 'preparing',
    description: 'Research assistant position in NLP lab focusing on large language model alignment and safety.',
    organization: 'Stanford NLP Group',
    location: 'Stanford, CA',
    deadline: daysFromNow(12),
    createdAt: daysAgo(8),
    updatedAt: daysAgo(3),
    difficulty: 'expert',
    estimatedHours: 60,
    priorityScore: 88,
    careerScore: 90,
    resumeImpact: 'Very High — Research experience at a top lab',
    progress: 25,
    checklist: [
      { id: 'c31', text: 'Read recent lab publications', completed: true, estimatedMinutes: 300 },
      { id: 'c32', text: 'Prepare research statement', completed: false, estimatedMinutes: 240 },
      { id: 'c33', text: 'Update CV with relevant experience', completed: true, estimatedMinutes: 60 },
      { id: 'c34', text: 'Draft cover letter', completed: false, estimatedMinutes: 120 },
      { id: 'c35', text: 'Submit application', completed: false, estimatedMinutes: 30 },
    ],
    tags: ['research', 'nlp', 'stanford', 'ai'],
    attachments: [],
    urgency: 'upcoming',
    daysUntilDeadline: 12,
  },
  {
    id: 'opp-8',
    title: 'TEDx University Talk',
    type: 'campus-event',
    status: 'in-progress',
    description: 'Deliver a TEDx talk on "The Future of AI in Education" at the university annual event.',
    organization: 'TEDx University',
    location: 'Campus Auditorium',
    deadline: daysFromNow(8),
    createdAt: daysAgo(20),
    updatedAt: daysAgo(1),
    difficulty: 'advanced',
    estimatedHours: 30,
    priorityScore: 75,
    careerScore: 80,
    progress: 55,
    checklist: [
      { id: 'c36', text: 'Outline talk structure', completed: true, estimatedMinutes: 120 },
      { id: 'c37', text: 'Research supporting data', completed: true, estimatedMinutes: 240 },
      { id: 'c38', text: 'Write full script', completed: true, estimatedMinutes: 300 },
      { id: 'c39', text: 'Create presentation slides', completed: false, estimatedMinutes: 180 },
      { id: 'c40', text: 'Rehearse 3 times', completed: false, estimatedMinutes: 180 },
      { id: 'c41', text: 'Final dress rehearsal', completed: false, estimatedMinutes: 60 },
    ],
    tags: ['public-speaking', 'tedx', 'ai'],
    attachments: [],
    urgency: 'soon',
    daysUntilDeadline: 8,
  },
].map((opp) => ({
  ...opp,
  urgency: getUrgencyLevel(opp.deadline),
  daysUntilDeadline: opp.deadline
    ? Math.max(0, Math.ceil((new Date(opp.deadline).getTime() - Date.now()) / 86400000))
    : undefined,
})) as Opportunity[];

// ---- Mock User ----

export const mockUser: UserProfile = {
  id: 'user-1',
  email: 'alex@university.edu',
  name: 'Alex Rivera',
  avatarUrl: undefined,
  university: 'MIT',
  major: 'Computer Science',
  graduationYear: 2027,
  bio: 'CS student passionate about AI, open-source, and building products that matter.',
  skills: ['Python', 'TypeScript', 'React', 'Machine Learning', 'System Design', 'Cloud Computing'],
  interests: ['AI/ML', 'Web Development', 'Open Source', 'Competitive Programming'],
  careerGoals: ['Software Engineer at a top tech company', 'Contribute to open-source AI', 'Start a tech company'],
  joinedAt: daysAgo(90),
};

// ---- Mock Career Score ----

export const mockCareerScore: CareerScore = {
  overall: 74,
  breakdown: {
    careerImpact: 78,
    resumeValue: 82,
    brandValue: 65,
    networking: 58,
    skillGrowth: 85,
    consistency: 72,
  },
  trend: 'rising',
  percentile: 82,
  lastUpdated: new Date().toISOString(),
  history: Array.from({ length: 30 }, (_, i) => ({
    date: daysAgo(29 - i),
    score: Math.max(40, Math.min(100, 60 + i * 0.5 + Math.sin(i * 0.5) * 8)),
  })),
};

// ---- Mock Analytics ----

export const mockAnalytics: AnalyticsData = {
  totalOpportunities: 24,
  completedOpportunities: 12,
  completionRate: 75,
  currentStreak: 7,
  longestStreak: 14,
  totalHoursInvested: 245,
  productivityScore: 82,
  byType: {
    hackathon: 5,
    assignment: 6,
    'coding-contest': 4,
    internship: 3,
    scholarship: 2,
    certification: 2,
    'campus-event': 1,
    competition: 1,
    research: 0,
    'personal-goal': 0,
  },
  byStatus: {
    discovered: 2,
    interested: 3,
    preparing: 4,
    'in-progress': 5,
    submitted: 2,
    completed: 12,
    missed: 1,
    archived: 3,
  },
  weeklyActivity: [
    { day: 'Mon', count: 4, hours: 3.5 },
    { day: 'Tue', count: 6, hours: 5.2 },
    { day: 'Wed', count: 3, hours: 2.8 },
    { day: 'Thu', count: 7, hours: 6.1 },
    { day: 'Fri', count: 5, hours: 4.3 },
    { day: 'Sat', count: 8, hours: 7.2 },
    { day: 'Sun', count: 2, hours: 1.5 },
  ],
  monthlyProgress: [
    { month: 'Jan', completed: 2, started: 4, missed: 0 },
    { month: 'Feb', completed: 3, started: 5, missed: 1 },
    { month: 'Mar', completed: 2, started: 3, missed: 0 },
    { month: 'Apr', completed: 1, started: 6, missed: 0 },
    { month: 'May', completed: 3, started: 4, missed: 0 },
    { month: 'Jun', completed: 1, started: 2, missed: 0 },
  ],
};

// ---- Mock Notifications ----

export const mockNotifications: AppNotification[] = [
  {
    id: 'n1',
    type: 'deadline',
    title: 'Codeforces Round Tomorrow',
    message: 'Your Codeforces Round #950 starts in less than 24 hours. Make sure your templates are ready.',
    urgency: 'critical',
    read: false,
    opportunityId: 'opp-6',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'n2',
    type: 'deadline',
    title: 'DSA Assignment Due Soon',
    message: 'Your Data Structures assignment is due in 2 days. You still have 3 tasks remaining.',
    urgency: 'urgent',
    read: false,
    opportunityId: 'opp-4',
    createdAt: daysAgo(0),
  },
  {
    id: 'n3',
    type: 'ai-insight',
    title: 'Career Score Rising',
    message: 'Your career score increased by 4 points this week. Keep up the momentum with your GSOC preparations.',
    urgency: 'relaxed',
    read: false,
    createdAt: daysAgo(1),
  },
  {
    id: 'n4',
    type: 'reminder',
    title: 'MLH Hack Week Registration',
    message: 'MLH Global Hack Week starts in 5 days. Consider forming a team soon.',
    urgency: 'soon',
    read: true,
    opportunityId: 'opp-2',
    createdAt: daysAgo(1),
  },
  {
    id: 'n5',
    type: 'achievement',
    title: '7-Day Streak!',
    message: "You've been active for 7 consecutive days. Your consistency is paying off.",
    urgency: 'relaxed',
    read: true,
    createdAt: daysAgo(0),
  },
];

// ---- Mock AI Analysis ----

export const mockAIAnalysis: AIAnalysis = {
  summary: 'This is a competitive internship opportunity at a leading tech company with strong career growth potential. The program focuses on real-world software development with mentorship from senior engineers.',
  requirements: [
    'Currently enrolled in a CS or related degree program',
    'Strong programming skills in at least one language',
    'Familiarity with data structures and algorithms',
    'Good communication and teamwork skills',
    'Available for the full duration of the program',
  ],
  checklist: [
    { id: generateId(), text: 'Update resume with recent projects', completed: false, estimatedMinutes: 60 },
    { id: generateId(), text: 'Prepare for technical interviews', completed: false, estimatedMinutes: 600 },
    { id: generateId(), text: 'Practice system design concepts', completed: false, estimatedMinutes: 300 },
    { id: generateId(), text: 'Write cover letter', completed: false, estimatedMinutes: 90 },
    { id: generateId(), text: 'Submit application before deadline', completed: false, estimatedMinutes: 30 },
  ],
  timeline: [
    { id: generateId(), title: 'Research & Prepare', description: 'Review requirements and gather materials', completed: false, estimatedHours: 4 },
    { id: generateId(), title: 'Application', description: 'Complete and submit the application', completed: false, estimatedHours: 3 },
    { id: generateId(), title: 'Interview Prep', description: 'Practice technical and behavioral questions', completed: false, estimatedHours: 20 },
  ],
  estimatedHours: 30,
  difficulty: 'advanced',
  priorityScore: 88,
  careerScore: 85,
  resumeImpact: 'Very High — Top-tier company internship significantly boosts career prospects',
  winningTips: [
    'Tailor your resume to the specific role',
    'Prepare 3-5 concrete project stories using the STAR method',
    'Practice live coding on a whiteboard or shared editor',
    'Research the company culture and recent projects',
  ],
  riskFactors: [
    'Highly competitive — acceptance rate under 5%',
    'Requires strong CS fundamentals',
    'Time-intensive preparation needed',
  ],
  suggestedTasks: [
    'Complete 50 LeetCode problems in relevant topics',
    'Build a portfolio project showcasing relevant skills',
    'Connect with current/former interns on LinkedIn',
  ],
};

// ---- Mock Calendar Events ----

export const mockCalendarEvents: CalendarEvent[] = mockOpportunities
  .filter((opp) => opp.deadline)
  .map((opp) => ({
    id: `cal-${opp.id}`,
    title: opp.title,
    date: opp.deadline!,
    type: opp.type,
    opportunityId: opp.id,
    isDeadline: true,
    color: getTypeColor(opp.type),
  }));

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    hackathon: '#818cf8',
    assignment: '#60a5fa',
    'coding-contest': '#c084fc',
    internship: '#34d399',
    scholarship: '#fbbf24',
    certification: '#f472b6',
    'campus-event': '#2dd4bf',
    competition: '#fb7185',
    research: '#a78bfa',
    'personal-goal': '#22d3ee',
  };
  return colors[type] ?? '#818cf8';
}

// ---- Mock Daily Brief ----

export const mockDailyBrief: AIDailyBrief = {
  date: new Date().toISOString(),
  greeting: 'Good morning, Alex! Here is your daily brief.',
  topPriorities: mockOpportunities.filter((o) => o.urgency === 'critical' || o.urgency === 'urgent'),
  upcomingDeadlines: mockOpportunities.filter((o) => o.deadline).slice(0, 5),
  insights: [
    'Your career score rose 4 points this week — driven by your AWS certification progress.',
    'Consider starting the Rhodes Scholarship prep early — the essay takes most applicants 20+ hours.',
    'You have 3 deadlines this week. Prioritize the DSA assignment first.',
  ],
  suggestedActions: [
    'Complete BFS/DFS implementation for your assignment',
    'Register for MLH Hack Week before spots fill up',
    'Review your Codeforces templates before tomorrow\'s contest',
  ],
  motivationalQuote: '"The only way to do great work is to love what you do." — Steve Jobs',
};
