import type { Metadata, Viewport } from 'next';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/providers/theme-provider';
import { QueryProvider } from '@/providers/query-provider';
import { StoreProvider } from '@/providers/store-provider';
import { inter, outfit, jetbrainsMono } from '@/lib/fonts';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'OpportunityOS — Never Miss Another Opportunity Again',
    template: '%s | OpportunityOS',
  },
  description:
    'AI-powered Career Operating System for students. Intelligently manage hackathons, assignments, coding contests, internships, scholarships, and more.',
  keywords: [
    'career management',
    'student opportunities',
    'hackathons',
    'internships',
    'scholarships',
    'AI career advisor',
    'deadline tracker',
    'opportunity tracker',
  ],
  authors: [{ name: 'OpportunityOS' }],
  openGraph: {
    title: 'OpportunityOS — Never Miss Another Opportunity Again',
    description:
      'AI-powered Career Operating System for students. Intelligently manage hackathons, assignments, coding contests, internships, scholarships, and more.',
    type: 'website',
    locale: 'en_US',
    siteName: 'OpportunityOS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpportunityOS — Never Miss Another Opportunity Again',
    description:
      'AI-powered Career Operating System for students.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a14' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <QueryProvider>
            <StoreProvider>
              <TooltipProvider>
                {children}
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    className: 'glass',
                    duration: 4000,
                  }}
                />
              </TooltipProvider>
            </StoreProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
