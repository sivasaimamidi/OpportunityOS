// ============================================================
// OpportunityOS AI — Zustand Stores
// ============================================================

import { createStore } from 'zustand';
import type {
  Opportunity,
  FilterState,
  ViewMode,
  AppNotification,
  AIChatMessage,
  AppSettings,
  UserProfile,
} from '@/types';
import { mockOpportunities, mockNotifications, mockUser } from '@/services/mock-data';
import { generateId } from '@/lib/utils';

// ---- Auth Store ----

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  provider?: 'email' | 'google' | 'github';
  createdAt: string;
}

export interface AuthState {
  users: RegisteredUser[];
  currentUser: RegisteredUser | null;
  isAuthenticated: boolean;
  registerUser: (user: { name: string; email: string; password?: string; provider?: 'email' | 'google' | 'github' }) => { success: boolean; error?: string };
  signInUser: (credentials: { email: string; password?: string; provider?: 'email' | 'google' | 'github' }) => { success: boolean; error?: string };
  signOut: () => void;
}

const defaultRegisteredUsers: RegisteredUser[] = [];

export const createAuthStore = () =>
  createStore<AuthState>()((set, get) => ({
    users: defaultRegisteredUsers,
    currentUser: null,
    isAuthenticated: false,

    registerUser: ({ name, email, password, provider = 'email' }) => {
      const normalizedEmail = email.toLowerCase().trim();
      const existing = get().users.find((u) => u.email.toLowerCase() === normalizedEmail);

      if (existing) {
        return { success: false, error: 'An account with this email already exists. Please sign in.' };
      }

      const newUser: RegisteredUser = {
        id: generateId(),
        name,
        email: normalizedEmail,
        password,
        provider,
        createdAt: new Date().toISOString(),
      };

      set((s) => ({
        users: [...s.users, newUser],
        currentUser: newUser,
        isAuthenticated: true,
      }));

      return { success: true };
    },

    signInUser: ({ email, password, provider = 'email' }) => {
      const normalizedEmail = email.toLowerCase().trim();

      // Social provider auto-registers or authenticates
      if (provider !== 'email') {
        let user = get().users.find((u) => u.email.toLowerCase() === normalizedEmail);
        if (!user) {
          user = {
            id: generateId(),
            name: provider === 'google' ? 'Google User' : 'GitHub User',
            email: normalizedEmail,
            provider,
            createdAt: new Date().toISOString(),
          };
          set((s) => ({ users: [...s.users, user!] }));
        }
        set({ currentUser: user, isAuthenticated: true });
        return { success: true };
      }

      // Email + Password verification
      const user = get().users.find((u) => u.email.toLowerCase() === normalizedEmail);

      if (!user) {
        return {
          success: false,
          error: 'No account found with this email. Please sign up first.',
        };
      }

      if (user.password && password && user.password !== password) {
        return {
          success: false,
          error: 'Incorrect password. Please try again.',
        };
      }

      set({ currentUser: user, isAuthenticated: true });
      return { success: true };
    },

    signOut: () => set({ currentUser: null, isAuthenticated: false }),
  }));

// ---- App Store ----

export interface AppState {
  // Sidebar
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Command palette
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;

  // URL Import modal
  importModalOpen: boolean;
  setImportModalOpen: (open: boolean) => void;

  // Notification panel
  notificationPanelOpen: boolean;
  setNotificationPanelOpen: (open: boolean) => void;

  // Quick add
  quickAddOpen: boolean;
  setQuickAddOpen: (open: boolean) => void;
}

export const createAppStore = () =>
  createStore<AppState>()((set) => ({
    sidebarOpen: true,
    sidebarCollapsed: false,
    toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
    setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

    commandOpen: false,
    setCommandOpen: (open) => set({ commandOpen: open }),

    importModalOpen: false,
    setImportModalOpen: (open) => set({ importModalOpen: open }),

    notificationPanelOpen: false,
    setNotificationPanelOpen: (open) => set({ notificationPanelOpen: open }),

    quickAddOpen: false,
    setQuickAddOpen: (open) => set({ quickAddOpen: open }),
  }));

// ---- Opportunity Store ----

export interface OpportunityState {
  opportunities: Opportunity[];
  selectedId: string | null;
  viewMode: ViewMode;
  filters: FilterState;

  setViewMode: (mode: ViewMode) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  selectOpportunity: (id: string | null) => void;
  addOpportunity: (opp: Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void;
  deleteOpportunity: (id: string) => void;
  toggleChecklistItem: (oppId: string, itemId: string) => void;
}

const defaultFilters: FilterState = {
  types: [],
  statuses: [],
  urgency: [],
  search: '',
  sortBy: 'deadline',
  sortDirection: 'asc',
};

export const createOpportunityStore = () =>
  createStore<OpportunityState>()((set) => ({
    opportunities: mockOpportunities,
    selectedId: null,
    viewMode: 'list',
    filters: defaultFilters,

    setViewMode: (mode) => set({ viewMode: mode }),
    setFilters: (filters) =>
      set((s) => ({ filters: { ...s.filters, ...filters } })),
    resetFilters: () => set({ filters: defaultFilters }),
    selectOpportunity: (id) => set({ selectedId: id }),

    addOpportunity: (opp) =>
      set((s) => ({
        opportunities: [
          {
            ...opp,
            id: generateId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as Opportunity,
          ...s.opportunities,
        ],
      })),

    updateOpportunity: (id, updates) =>
      set((s) => ({
        opportunities: s.opportunities.map((o) =>
          o.id === id ? { ...o, ...updates, updatedAt: new Date().toISOString() } : o
        ),
      })),

    deleteOpportunity: (id) =>
      set((s) => ({
        opportunities: s.opportunities.filter((o) => o.id !== id),
        selectedId: s.selectedId === id ? null : s.selectedId,
      })),

    toggleChecklistItem: (oppId, itemId) =>
      set((s) => ({
        opportunities: s.opportunities.map((o) => {
          if (o.id !== oppId) return o;
          const checklist = o.checklist.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          );
          const completed = checklist.filter((i) => i.completed).length;
          const progress = checklist.length > 0 ? Math.round((completed / checklist.length) * 100) : 0;
          return { ...o, checklist, progress, updatedAt: new Date().toISOString() };
        }),
      })),
  }));

// ---- Notification Store ----

export interface NotificationState {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<AppNotification, 'id' | 'createdAt' | 'read'>) => void;
  removeNotification: (id: string) => void;
}

export const createNotificationStore = () =>
  createStore<NotificationState>()((set, get) => ({
    notifications: mockNotifications,
    get unreadCount() {
      return get().notifications.filter((n) => !n.read).length;
    },

    markAsRead: (id) =>
      set((s) => ({
        notifications: s.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
      })),

    markAllAsRead: () =>
      set((s) => ({
        notifications: s.notifications.map((n) => ({ ...n, read: true })),
      })),

    addNotification: (notification) =>
      set((s) => ({
        notifications: [
          { ...notification, id: generateId(), createdAt: new Date().toISOString(), read: false },
          ...s.notifications,
        ],
      })),

    removeNotification: (id) =>
      set((s) => ({
        notifications: s.notifications.filter((n) => n.id !== id),
      })),
  }));

// ---- AI Chat Store ----

export interface AIChatState {
  messages: AIChatMessage[];
  isLoading: boolean;
  addMessage: (message: Omit<AIChatMessage, 'id' | 'timestamp'>) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

export const createAIChatStore = () =>
  createStore<AIChatState>()((set) => ({
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hi Alex! I'm your AI Career Advisor. I can help you prioritize opportunities, prepare for deadlines, and plan your career path. What would you like to discuss?",
        timestamp: new Date().toISOString(),
      },
    ],
    isLoading: false,

    addMessage: (message) =>
      set((s) => ({
        messages: [
          ...s.messages,
          { ...message, id: generateId(), timestamp: new Date().toISOString() },
        ],
      })),

    setLoading: (loading) => set({ isLoading: loading }),

    clearMessages: () =>
      set({
        messages: [
          {
            id: 'welcome',
            role: 'assistant',
            content: "Hi! I'm your AI Career Advisor. How can I help you today?",
            timestamp: new Date().toISOString(),
          },
        ],
      }),
  }));

// ---- Settings Store ----

export interface SettingsState {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
}

export const createSettingsStore = () =>
  createStore<SettingsState>()((set) => ({
    settings: {
      theme: 'dark',
      notifications: {
        email: true,
        push: true,
        deadlineReminders: true,
        aiInsights: true,
        weeklyDigest: true,
      },
      dashboard: {
        layout: 'default',
        widgets: ['career-score', 'deadlines', 'quick-actions', 'analytics', 'ai-insight'],
        showCareerScore: true,
        showStreak: true,
      },
      accessibility: {
        reducedMotion: false,
        highContrast: false,
        fontSize: 'default',
      },
    },
    updateSettings: (updates) =>
      set((s) => ({
        settings: { ...s.settings, ...updates },
      })),
  }));
