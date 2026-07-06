// ============================================================
// OpportunityOS AI — Design Tokens (TypeScript)
// ============================================================

export const colors = {
  // Primary — Indigo/Violet
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },

  // Accent — Violet
  accent: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065',
  },

  // Success — Emerald
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },

  // Warning — Amber
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Danger — Rose
  danger: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
  },

  // Neutral
  neutral: {
    0: '#ffffff',
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },
} as const;

export const spacing = {
  0: '0px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
} as const;

export const typography = {
  fontFamily: {
    display: "'Outfit', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  fontSize: {
    'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
    'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
    'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
    'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
    'heading-xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
    'heading-lg': ['1.5rem', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '600' }],
    'heading-md': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' }],
    'heading-sm': ['1.125rem', { lineHeight: '1.4', letterSpacing: '-0.005em', fontWeight: '600' }],
    'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
    'body-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
    'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
    'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
    'overline': ['0.6875rem', { lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: '600' }],
  },
} as const;

export const shadows = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  glow: {
    primary: '0 0 20px rgba(99, 102, 241, 0.3), 0 0 60px rgba(99, 102, 241, 0.1)',
    accent: '0 0 20px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.1)',
    success: '0 0 20px rgba(16, 185, 129, 0.3), 0 0 60px rgba(16, 185, 129, 0.1)',
    danger: '0 0 20px rgba(244, 63, 94, 0.3), 0 0 60px rgba(244, 63, 94, 0.1)',
  },
} as const;

export const radii = {
  none: '0px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
} as const;

export const animation = {
  duration: {
    instant: 0.1,
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
  },
  spring: {
    snappy: { type: 'spring' as const, stiffness: 400, damping: 30 },
    gentle: { type: 'spring' as const, stiffness: 200, damping: 20 },
    bouncy: { type: 'spring' as const, stiffness: 300, damping: 15 },
    smooth: { type: 'spring' as const, stiffness: 150, damping: 25 },
    default: { type: 'spring' as const, stiffness: 260, damping: 20 },
  },
  ease: {
    in: [0.4, 0, 1, 1],
    out: [0, 0, 0.2, 1],
    inOut: [0.4, 0, 0.2, 1],
    elastic: [0.68, -0.55, 0.265, 1.55],
  },
} as const;

// ---- Urgency Color Mapping ----
export const urgencyColors = {
  relaxed: { bg: '#ecfdf5', text: '#059669', border: '#a7f3d0', dot: '#10b981' },
  upcoming: { bg: '#fefce8', text: '#ca8a04', border: '#fde68a', dot: '#eab308' },
  soon: { bg: '#fff7ed', text: '#ea580c', border: '#fed7aa', dot: '#f97316' },
  urgent: { bg: '#fef2f2', text: '#dc2626', border: '#fecaca', dot: '#ef4444' },
  critical: { bg: '#450a0a', text: '#fca5a5', border: '#991b1b', dot: '#dc2626' },
} as const;

export const urgencyColorsDark = {
  relaxed: { bg: 'rgba(16, 185, 129, 0.1)', text: '#34d399', border: 'rgba(16, 185, 129, 0.2)', dot: '#10b981' },
  upcoming: { bg: 'rgba(234, 179, 8, 0.1)', text: '#fbbf24', border: 'rgba(234, 179, 8, 0.2)', dot: '#eab308' },
  soon: { bg: 'rgba(249, 115, 22, 0.1)', text: '#fb923c', border: 'rgba(249, 115, 22, 0.2)', dot: '#f97316' },
  urgent: { bg: 'rgba(239, 68, 68, 0.1)', text: '#f87171', border: 'rgba(239, 68, 68, 0.2)', dot: '#ef4444' },
  critical: { bg: 'rgba(220, 38, 38, 0.15)', text: '#fca5a5', border: 'rgba(220, 38, 38, 0.3)', dot: '#dc2626' },
} as const;

// ---- Opportunity Type Colors ----
export const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  hackathon: { bg: 'rgba(99, 102, 241, 0.1)', text: '#818cf8', border: 'rgba(99, 102, 241, 0.2)' },
  assignment: { bg: 'rgba(59, 130, 246, 0.1)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.2)' },
  'coding-contest': { bg: 'rgba(168, 85, 247, 0.1)', text: '#c084fc', border: 'rgba(168, 85, 247, 0.2)' },
  internship: { bg: 'rgba(16, 185, 129, 0.1)', text: '#34d399', border: 'rgba(16, 185, 129, 0.2)' },
  scholarship: { bg: 'rgba(245, 158, 11, 0.1)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.2)' },
  certification: { bg: 'rgba(236, 72, 153, 0.1)', text: '#f472b6', border: 'rgba(236, 72, 153, 0.2)' },
  'campus-event': { bg: 'rgba(20, 184, 166, 0.1)', text: '#2dd4bf', border: 'rgba(20, 184, 166, 0.2)' },
  competition: { bg: 'rgba(244, 63, 94, 0.1)', text: '#fb7185', border: 'rgba(244, 63, 94, 0.2)' },
  research: { bg: 'rgba(139, 92, 246, 0.1)', text: '#a78bfa', border: 'rgba(139, 92, 246, 0.2)' },
  'personal-goal': { bg: 'rgba(34, 211, 238, 0.1)', text: '#22d3ee', border: 'rgba(34, 211, 238, 0.2)' },
};
