// ============================================================
// OpportunityOS AI — Core Type System
// ============================================================

// ---- Enums & Constants ----

export const OPPORTUNITY_TYPES = [
  'hackathon',
  'assignment',
  'coding-contest',
  'internship',
  'scholarship',
  'certification',
  'campus-event',
  'competition',
  'research',
  'personal-goal',
] as const;

export type OpportunityType = (typeof OPPORTUNITY_TYPES)[number];

export const OPPORTUNITY_TYPE_LABELS: Record<OpportunityType, string> = {
  hackathon: 'Hackathon',
  assignment: 'Assignment',
  'coding-contest': 'Coding Contest',
  internship: 'Internship',
  scholarship: 'Scholarship',
  certification: 'Certification',
  'campus-event': 'Campus Event',
  competition: 'Competition',
  research: 'Research',
  'personal-goal': 'Personal Goal',
};

export const OPPORTUNITY_TYPE_ICONS: Record<OpportunityType, string> = {
  hackathon: 'Zap',
  assignment: 'BookOpen',
  'coding-contest': 'Code2',
  internship: 'Briefcase',
  scholarship: 'GraduationCap',
  certification: 'Award',
  'campus-event': 'Calendar',
  competition: 'Trophy',
  research: 'FlaskConical',
  'personal-goal': 'Target',
};

export type OpportunityStatus =
  | 'discovered'
  | 'interested'
  | 'preparing'
  | 'in-progress'
  | 'submitted'
  | 'completed'
  | 'missed'
  | 'archived';

export type UrgencyLevel = 'relaxed' | 'upcoming' | 'soon' | 'urgent' | 'critical';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type ViewMode = 'list' | 'grid' | 'board';

// ---- Core Models ----

export interface Opportunity {
  id: string;
  title: string;
  type: OpportunityType;
  status: OpportunityStatus;
  description: string;
  url?: string;
  organization?: string;
  location?: string;
  isRemote?: boolean;

  // Dates
  deadline?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;

  // AI-generated
  summary?: string;
  requirements?: string[];
  difficulty?: DifficultyLevel;
  estimatedHours?: number;
  priorityScore?: number;
  careerScore?: number;
  resumeImpact?: string;
  winningTips?: string[];
  preparationRoadmap?: PreparationStep[];

  // Progress
  progress: number;
  checklist: ChecklistItem[];
  notes?: string;
  tags: string[];
  attachments: Attachment[];

  // Computed
  urgency?: UrgencyLevel;
  daysUntilDeadline?: number;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string;
  estimatedMinutes?: number;
}

export interface PreparationStep {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  completed: boolean;
  estimatedHours: number;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

// ---- User & Profile ----

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  university?: string;
  major?: string;
  graduationYear?: number;
  bio?: string;
  skills: string[];
  interests: string[];
  careerGoals: string[];
  joinedAt: string;
}

// ---- Career Score ----

export interface CareerScore {
  overall: number;
  breakdown: {
    careerImpact: number;
    resumeValue: number;
    brandValue: number;
    networking: number;
    skillGrowth: number;
    consistency: number;
  };
  trend: 'rising' | 'stable' | 'declining';
  percentile: number;
  lastUpdated: string;
  history: CareerScorePoint[];
}

export interface CareerScorePoint {
  date: string;
  score: number;
}

// ---- Analytics ----

export interface AnalyticsData {
  totalOpportunities: number;
  completedOpportunities: number;
  completionRate: number;
  currentStreak: number;
  longestStreak: number;
  totalHoursInvested: number;
  productivityScore: number;
  byType: Record<OpportunityType, number>;
  byStatus: Record<OpportunityStatus, number>;
  weeklyActivity: WeeklyActivity[];
  monthlyProgress: MonthlyProgress[];
}

export interface WeeklyActivity {
  day: string;
  count: number;
  hours: number;
}

export interface MonthlyProgress {
  month: string;
  completed: number;
  started: number;
  missed: number;
}

// ---- AI ----

export interface AIAnalysis {
  summary: string;
  requirements: string[];
  checklist: ChecklistItem[];
  timeline: PreparationStep[];
  estimatedHours: number;
  difficulty: DifficultyLevel;
  priorityScore: number;
  careerScore: number;
  resumeImpact: string;
  winningTips: string[];
  riskFactors: string[];
  suggestedTasks: string[];
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isLoading?: boolean;
}

export interface AIDailyBrief {
  date: string;
  greeting: string;
  topPriorities: Opportunity[];
  upcomingDeadlines: Opportunity[];
  insights: string[];
  suggestedActions: string[];
  motivationalQuote: string;
}

// ---- Notifications ----

export interface AppNotification {
  id: string;
  type: 'deadline' | 'reminder' | 'achievement' | 'ai-insight' | 'system';
  title: string;
  message: string;
  urgency: UrgencyLevel;
  read: boolean;
  opportunityId?: string;
  createdAt: string;
  actionUrl?: string;
}

// ---- Calendar ----

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  type: OpportunityType;
  opportunityId: string;
  isDeadline: boolean;
  color: string;
}

// ---- Settings ----

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    deadlineReminders: boolean;
    aiInsights: boolean;
    weeklyDigest: boolean;
  };
  dashboard: {
    layout: 'default' | 'compact' | 'expanded';
    widgets: string[];
    showCareerScore: boolean;
    showStreak: boolean;
  };
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
    fontSize: 'default' | 'large' | 'x-large';
  };
}

// ---- Utility Types ----

export type SortField = 'deadline' | 'priority' | 'created' | 'title' | 'progress' | 'career-score';
export type SortDirection = 'asc' | 'desc';

export interface FilterState {
  types: OpportunityType[];
  statuses: OpportunityStatus[];
  urgency: UrgencyLevel[];
  search: string;
  sortBy: SortField;
  sortDirection: SortDirection;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
