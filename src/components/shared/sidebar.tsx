'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import {
  Sparkles,
  LayoutDashboard,
  CalendarDays,
  BarChart3,
  Bot,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  Link2,
  LogOut,
  FileText,
} from 'lucide-react';
import { APP_NAME, NAV_ITEMS } from '@/lib/constants';
import { useAppStore } from '@/providers/store-provider';
import { mockUser } from '@/services/mock-data';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Sparkles,
  CalendarDays,
  BarChart3,
  Bot,
  Settings,
  FileText,
};


export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed);
  const setSidebarCollapsed = useAppStore((s) => s.setSidebarCollapsed);
  const setImportModalOpen = useAppStore((s) => s.setImportModalOpen);
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);

  useEffect(() => {
    // Close sidebar on mobile by default
    if (window.innerWidth < 768 && sidebarOpen) {
      toggleSidebar();
    }
  }, []);

  useEffect(() => {
    // Auto-close sidebar on navigation on mobile
    if (window.innerWidth < 768 && sidebarOpen) {
      toggleSidebar();
    }
  }, [pathname]);

  const handleSignOut = () => {
    toast.success('Signed out successfully');
    router.push('/sign-in');
  };

  return (
    <>
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={cn(
          'fixed md:sticky top-0 left-0 bottom-0 z-40 flex flex-col border-r border-white/10 bg-slate-950/90 backdrop-blur-2xl transition-all duration-300 select-none h-screen',
          sidebarCollapsed ? 'w-20' : 'w-64',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-5 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-indigo-400" />
            </div>
          </div>
          {!sidebarCollapsed && (
            <span className="font-bold text-lg text-white font-heading tracking-tight whitespace-nowrap">
              {APP_NAME} <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono">AI</span>
            </span>
          )}
        </Link>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden md:flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Quick Action Button */}
      <div className="p-4 border-b border-white/5">
        <button
          onClick={() => setImportModalOpen(true)}
          className={cn(
            'w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white font-medium text-sm py-2.5 transition-all shadow-lg shadow-indigo-600/20',
            sidebarCollapsed && 'px-0'
          )}
        >
          <Link2 className="h-4 w-4 shrink-0" />
          {!sidebarCollapsed && <span>Import URL</span>}
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 space-y-1.5 p-3 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon] || Sparkles;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all group',
                isActive
                  ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon className={cn('h-5 w-5 shrink-0 transition-transform group-hover:scale-110', isActive ? 'text-indigo-400' : 'text-slate-400')} />
              {!sidebarCollapsed && <span>{item.label}</span>}
              {isActive && (
                <motion.div layoutId="sidebar-active" className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-indigo-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Footer with Sign Out */}
      <div className="p-4 border-t border-white/10 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white text-xs">
            AR
          </div>
          {!sidebarCollapsed && (
            <div className="overflow-hidden">
              <div className="text-sm font-semibold text-white truncate">{mockUser.name}</div>
              <div className="text-xs text-slate-400 truncate">{mockUser.university} • {mockUser.major}</div>
            </div>
          )}
        </div>

        <button
          onClick={handleSignOut}
          title="Sign Out"
          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
      </aside>
    </>
  );
}
