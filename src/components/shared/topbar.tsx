'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Bell, Moon, Sun, Plus, LogOut, Settings as SettingsIcon, Flame, Trophy, Menu } from 'lucide-react';
import { useAppStore, useNotificationStore } from '@/providers/store-provider';
import { useTheme } from 'next-themes';
import { mockUser } from '@/services/mock-data';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const setCommandOpen = useAppStore((s) => s.setCommandOpen);
  const setImportModalOpen = useAppStore((s) => s.setImportModalOpen);
  const setNotificationPanelOpen = useAppStore((s) => s.setNotificationPanelOpen);
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const { theme, setTheme } = useTheme();
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);

  // Streak states
  const currentStreak = useAppStore((s) => s.currentStreak);
  const longestStreak = useAppStore((s) => s.longestStreak);
  const hasCheckedInToday = useAppStore((s) => s.hasCheckedInToday);
  const checkIn = useAppStore((s) => s.checkIn);

  const titleMap: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/opportunities': 'Opportunities',
    '/calendar': 'Calendar',
    '/analytics': 'Analytics',
    '/ai-advisor': 'AI Advisor',
    '/ats-scanner': 'ATS Auditor',
    '/settings': 'Settings',
  };

  const pageTitle = titleMap[pathname] || 'Dashboard';

  const handleSignOut = () => {
    toast.success('Signed out successfully');
    router.push('/sign-in');
  };

  const handleStreakCheckIn = () => {
    if (hasCheckedInToday) {
      toast.info("You've already claimed your streak for today!");
      return;
    }
    checkIn();
    toast.success(`Daily Streak Maintained! 🔥 ${currentStreak + 1} Days`, {
      description: "Awesome job keeping up the consistency!",
    });
  };

  return (
    <header className="h-16 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl sticky top-0 z-20 px-6 flex items-center justify-between">
      {/* Page Title / Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
          title="Toggle Navigation"
        >
          <Menu className="h-4 w-4" />
        </button>
        <h1 className="text-lg font-bold text-white font-heading">{pageTitle}</h1>
      </div>

      {/* Command Search & Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <button
          onClick={() => setCommandOpen(true)}
          className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400 text-xs hover:border-indigo-500/50 transition-colors w-64 justify-between"
        >
          <span className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5" /> Search opportunities...
          </span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700">⌘K</kbd>
        </button>
        <button
          onClick={() => setCommandOpen(true)}
          className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
          title="Search"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="h-9 w-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
        </button>

        {/* Daily Streak Mode */}
        <Popover>
          <PopoverTrigger>
            <div className={`flex items-center gap-1.5 h-9 px-3 rounded-xl border font-semibold font-mono text-xs cursor-pointer select-none transition-all shadow-sm ${
              hasCheckedInToday 
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20' 
                : 'bg-slate-900 border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/30'
            }`}>
              <Flame className={`h-4 w-4 transition-transform ${hasCheckedInToday ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-400 group-hover:text-rose-500'}`} />
              <span>{currentStreak} Days</span>
            </div>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64 bg-slate-900 border border-white/10 text-slate-200 p-4 rounded-xl shadow-2xl flex flex-col gap-3">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              <Flame className="h-5 w-5 text-rose-500 fill-rose-500" />
              <div>
                <h4 className="font-bold text-white text-sm">Daily Activity Streak</h4>
                <p className="text-[10px] text-slate-400">Complete tasks to maintain momentum</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-center py-1">
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Current</span>
                <span className="text-xl font-bold text-white font-mono">{currentStreak}</span>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Personal Best</span>
                <span className="text-xl font-bold text-white font-mono flex items-center justify-center gap-1">
                  <Trophy className="h-3.5 w-3.5 text-amber-400" /> {longestStreak}
                </span>
              </div>
            </div>

            <button
              onClick={handleStreakCheckIn}
              disabled={hasCheckedInToday}
              className={`w-full py-2 rounded-lg font-medium text-xs transition-colors flex items-center justify-center gap-1.5 ${
                hasCheckedInToday
                  ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400 cursor-not-allowed'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20'
              }`}
            >
              <Flame className="h-3.5 w-3.5 fill-current" />
              {hasCheckedInToday ? 'Checked In Today!' : 'Claim Daily Check-In'}
            </button>
          </PopoverContent>
        </Popover>

        {/* Notification Bell */}
        <button 
          onClick={() => setNotificationPanelOpen(true)}
          className="relative h-9 w-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Quick Add Button */}
        <button
          onClick={() => setImportModalOpen(true)}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors shadow-lg shadow-indigo-600/20"
        >
          <Plus className="h-3.5 w-3.5" /> Import Opportunity
        </button>
        <button
          onClick={() => setImportModalOpen(true)}
          className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg shadow-indigo-600/20"
          title="Import Opportunity"
        >
          <Plus className="h-4 w-4" />
        </button>

        {/* User Menu / Sign Out Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white text-xs cursor-pointer ring-2 ring-indigo-500/20 hover:ring-indigo-500/50 transition-all">
              AR
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-slate-900 border border-white/10 text-slate-200 shadow-2xl p-2 rounded-xl">
            <DropdownMenuLabel className="font-normal px-2 py-1.5">
              <div className="font-semibold text-white text-sm">{mockUser.name}</div>
              <div className="text-xs text-slate-400 truncate">{mockUser.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10 my-1" />
            <DropdownMenuItem
              onClick={() => router.push('/settings')}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-xs cursor-pointer hover:bg-white/5 text-slate-200"
            >
              <SettingsIcon className="h-4 w-4 text-indigo-400" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10 my-1" />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-xs cursor-pointer hover:bg-rose-500/10 text-rose-400 hover:text-rose-300 font-medium"
            >
              <LogOut className="h-4 w-4 text-rose-400" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
