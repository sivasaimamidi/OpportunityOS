// ============================================================
// OpportunityOS AI — App Constants
// ============================================================

export const APP_NAME = 'OpportunityOS';
export const APP_TAGLINE = 'Never Miss Another Opportunity Again.';
export const APP_DESCRIPTION =
  'AI-powered Career Operating System for students. Intelligently manage hackathons, assignments, coding contests, internships, scholarships, and more.';

export const ROUTES = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  dashboard: '/dashboard',
  opportunities: '/opportunities',
  calendar: '/calendar',
  analytics: '/analytics',
  aiAdvisor: '/ai-advisor',
  settings: '/settings',
} as const;

export const NAV_ITEMS = [
  { label: 'Dashboard', href: ROUTES.dashboard, icon: 'LayoutDashboard' },
  { label: 'Opportunities', href: ROUTES.opportunities, icon: 'Sparkles' },
  { label: 'Calendar', href: ROUTES.calendar, icon: 'CalendarDays' },
  { label: 'Analytics', href: ROUTES.analytics, icon: 'BarChart3' },
  { label: 'AI Advisor', href: ROUTES.aiAdvisor, icon: 'Bot' },
  { label: 'Settings', href: ROUTES.settings, icon: 'Settings' },
] as const;

export const URGENCY_CONFIG = {
  relaxed: { label: '30+ Days', color: 'emerald', threshold: 30 },
  upcoming: { label: '15 Days', color: 'yellow', threshold: 15 },
  soon: { label: '7 Days', color: 'orange', threshold: 7 },
  urgent: { label: '3 Days', color: 'red', threshold: 3 },
  critical: { label: '24 Hours', color: 'rose', threshold: 1 },
} as const;

export const CAREER_SCORE_LABELS = {
  overall: 'Overall Career Score',
  careerImpact: 'Career Impact',
  resumeValue: 'Resume Value',
  brandValue: 'Personal Brand',
  networking: 'Networking',
  skillGrowth: 'Skill Growth',
  consistency: 'Consistency',
} as const;

export const FEATURES = [
  {
    title: 'Smart URL Import',
    description: 'Paste any opportunity link. AI extracts everything automatically.',
    icon: 'Link',
  },
  {
    title: 'AI Career Advisor',
    description: 'Get personalized career guidance powered by Gemini AI.',
    icon: 'Bot',
  },
  {
    title: 'Career Score Engine',
    description: 'Quantify your career progress with an intelligent scoring system.',
    icon: 'TrendingUp',
  },
  {
    title: 'Smart Reminders',
    description: 'Urgency-aware notifications that get more frequent as deadlines approach.',
    icon: 'Bell',
  },
  {
    title: 'Progress Tracking',
    description: 'Track every opportunity from discovery to completion.',
    icon: 'CheckCircle2',
  },
  {
    title: 'Intelligent Prioritization',
    description: 'AI ranks opportunities by career impact, deadline, and your goals.',
    icon: 'ArrowUpDown',
  },
] as const;

export const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'CS Student, IIT Delhi',
    content: 'OpportunityOS transformed how I manage my career. I went from missing deadlines to landing 3 internships.',
    avatar: 'PS',
  },
  {
    name: 'Alex Chen',
    role: 'Engineering, Stanford',
    content: 'The AI advisor is incredible. It helped me prioritize the right hackathons and my resume is now 10x stronger.',
    avatar: 'AC',
  },
  {
    name: 'Sarah Johnson',
    role: 'Data Science, MIT',
    content: 'I discovered scholarships I never knew existed. The smart reminders made sure I never missed a single deadline.',
    avatar: 'SJ',
  },
] as const;

export const PRICING_PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Up to 10 active opportunities',
      'Basic AI summaries',
      'Calendar view',
      'Deadline reminders',
      'Community support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    description: 'For serious career builders',
    features: [
      'Unlimited opportunities',
      'Advanced AI analysis',
      'Career Score engine',
      'AI Career Advisor',
      'Priority reminders',
      'Analytics dashboard',
      'File attachments',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$19',
    period: 'per month',
    description: 'For student organizations',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Shared opportunities',
      'Organization analytics',
      'Admin controls',
      'API access',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'What types of opportunities can I track?',
    answer: 'OpportunityOS supports hackathons, coding contests, internships, scholarships, certifications, campus events, competitions, research opportunities, assignments, and personal goals.',
  },
  {
    question: 'How does the AI extraction work?',
    answer: 'Simply paste a URL and our AI powered by Gemini analyzes the page to extract deadlines, requirements, eligibility criteria, and more. It generates a complete summary, checklist, and preparation roadmap.',
  },
  {
    question: 'What is the Career Score?',
    answer: 'Career Score is a proprietary metric that quantifies your career progress. It considers career impact, resume value, personal brand, networking, skill growth, and consistency across all your opportunities.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use industry-standard encryption, secure authentication via Clerk, and your data is stored in SOC 2 compliant infrastructure. We never share your personal data.',
  },
  {
    question: 'Can I use OpportunityOS on mobile?',
    answer: 'Yes! OpportunityOS is fully responsive and works beautifully on phones, tablets, laptops, and desktop monitors. A native app is on our roadmap.',
  },
  {
    question: 'How does the reminder system work?',
    answer: 'Our smart reminder system uses urgency-based notifications. Green for 30+ days, yellow for 15 days, orange for 7 days, red for 3 days, and critical for the last 24 hours. Notifications become more frequent as deadlines approach.',
  },
] as const;
