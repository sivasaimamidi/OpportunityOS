'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { 
  LayoutDashboard, 
  Briefcase, 
  Calendar, 
  BarChart3, 
  Sparkles, 
  Settings, 
  PlusCircle, 
  Sun, 
  Moon, 
  LogOut, 
  Flame, 
  CheckCheck,
  FileText
} from 'lucide-react';
import { useAppStore, useOpportunityStore, useAuthStore } from '@/providers/store-provider';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { toast } from 'sonner';

export function CommandMenu() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  
  const commandOpen = useAppStore((s) => s.commandOpen);
  const setCommandOpen = useAppStore((s) => s.setCommandOpen);
  const setImportModalOpen = useAppStore((s) => s.setImportModalOpen);
  
  const currentStreak = useAppStore((s) => s.currentStreak);
  const hasCheckedInToday = useAppStore((s) => s.hasCheckedInToday);
  const checkIn = useAppStore((s) => s.checkIn);
  
  const opportunities = useOpportunityStore((s) => s.opportunities);
  const selectOpportunity = useOpportunityStore((s) => s.selectOpportunity);
  
  const signOut = useAuthStore((s) => s.signOut);

  // Trigger Cmd+K/Ctrl+K keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen(!commandOpen);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [commandOpen, setCommandOpen]);

  const runCommand = (action: () => void) => {
    action();
    setCommandOpen(false);
  };

  const handleOpportunitySelect = (id: string) => {
    runCommand(() => {
      selectOpportunity(id);
      router.push('/opportunities');
      toast.info(`Opening opportunity details`);
    });
  };

  const handleCheckIn = () => {
    if (hasCheckedInToday) {
      toast.info("You've already checked in today!");
      return;
    }
    runCommand(() => {
      checkIn();
      toast.success(`Streak maintained! You're now at 🔥 ${currentStreak + 1} Days!`, {
        description: 'Keep up the daily momentum!',
        duration: 4000,
      });
    });
  };

  return (
    <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
      <CommandInput placeholder="Search opportunities, routes, or commands..." />
      <CommandList className="p-2">
        <CommandEmpty>No results found.</CommandEmpty>
        
        {/* Navigation Routes */}
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
            <LayoutDashboard className="mr-2 h-4 w-4 text-indigo-400" />
            <span>Go to Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/opportunities'))}>
            <Briefcase className="mr-2 h-4 w-4 text-emerald-400" />
            <span>View Opportunities</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/calendar'))}>
            <Calendar className="mr-2 h-4 w-4 text-amber-400" />
            <span>Open Calendar</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/analytics'))}>
            <BarChart3 className="mr-2 h-4 w-4 text-sky-400" />
            <span>Show Analytics</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/ai-advisor'))}>
            <Sparkles className="mr-2 h-4 w-4 text-violet-400 fill-violet-500/10" />
            <span>Chat with AI Advisor</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/ats-scanner'))}>
            <FileText className="mr-2 h-4 w-4 text-indigo-400" />
            <span>Go to ATS Auditor</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/settings'))}>
            <Settings className="mr-2 h-4 w-4 text-slate-400" />
            <span>Account Settings</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="my-2" />

        {/* Opportunities Search List */}
        {opportunities.length > 0 && (
          <>
            <CommandGroup heading="Opportunities Dashboard">
              {opportunities.map((opp) => (
                <CommandItem
                  key={opp.id}
                  value={opp.title}
                  onSelect={() => handleOpportunitySelect(opp.id)}
                >
                  <Briefcase className="mr-2 h-4 w-4 text-slate-400" />
                  <span className="font-medium text-slate-200">{opp.title}</span>
                  <span className="ml-auto text-[10px] bg-white/5 border border-white/5 text-slate-400 px-2 py-0.5 rounded-full capitalize">
                    {opp.status.replace('-', ' ')}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator className="my-2" />
          </>
        )}

        {/* Quick Commands & Settings */}
        <CommandGroup heading="Actions & System">
          <CommandItem onSelect={() => runCommand(() => setImportModalOpen(true))}>
            <PlusCircle className="mr-2 h-4 w-4 text-indigo-400" />
            <span>Import Opportunity via URL</span>
          </CommandItem>
          
          <CommandItem onSelect={handleCheckIn}>
            <Flame className={`mr-2 h-4 w-4 ${hasCheckedInToday ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
            <span>{hasCheckedInToday ? 'Daily Streak Claimed' : 'Claim Daily Streak Check-in'}</span>
            <span className="ml-auto font-mono font-bold text-rose-400 text-xs">🔥 {currentStreak} Days</span>
          </CommandItem>

          <CommandItem onSelect={() => runCommand(() => setTheme(theme === 'dark' ? 'light' : 'dark'))}>
            {theme === 'dark' ? (
              <>
                <Sun className="mr-2 h-4 w-4 text-amber-400" />
                <span>Switch to Light Theme</span>
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4 text-indigo-400" />
                <span>Switch to Dark Theme</span>
              </>
            )}
          </CommandItem>
          
          <CommandItem onSelect={() => runCommand(() => {
            signOut();
            toast.success('Signed out successfully');
            router.push('/sign-in');
          })}>
            <LogOut className="mr-2 h-4 w-4 text-rose-400" />
            <span className="text-rose-400">Sign Out Account</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
