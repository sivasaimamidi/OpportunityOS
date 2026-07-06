'use client';

import React from 'react';
import { Plus, Link2, Bot, CalendarDays } from 'lucide-react';
import { useAppStore } from '@/providers/store-provider';
import Link from 'next/link';

export function QuickActionsWidget() {
  const setImportModalOpen = useAppStore((s) => s.setImportModalOpen);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <button
        onClick={() => setImportModalOpen(true)}
        className="p-4 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/30 text-indigo-300 text-left transition-all group"
      >
        <Link2 className="h-5 w-5 mb-2 text-indigo-400 group-hover:scale-110 transition-transform" />
        <div className="font-bold text-sm text-white">Import URL</div>
        <div className="text-[11px] text-slate-400">Auto extract AI</div>
      </button>

      <Link href="/ai-advisor" className="p-4 rounded-2xl bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/30 text-purple-300 text-left transition-all group">
        <Bot className="h-5 w-5 mb-2 text-purple-400 group-hover:scale-110 transition-transform" />
        <div className="font-bold text-sm text-white">AI Advisor</div>
        <div className="text-[11px] text-slate-400">Get career guidance</div>
      </Link>

      <Link href="/calendar" className="p-4 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 hover:bg-emerald-600/30 text-emerald-300 text-left transition-all group">
        <CalendarDays className="h-5 w-5 mb-2 text-emerald-400 group-hover:scale-110 transition-transform" />
        <div className="font-bold text-sm text-white">Calendar</div>
        <div className="text-[11px] text-slate-400">View timeline</div>
      </Link>

      <Link href="/opportunities" className="p-4 rounded-2xl bg-amber-600/20 border border-amber-500/30 hover:bg-amber-600/30 text-amber-300 text-left transition-all group">
        <Plus className="h-5 w-5 mb-2 text-amber-400 group-hover:scale-110 transition-transform" />
        <div className="font-bold text-sm text-white">All Items</div>
        <div className="text-[11px] text-slate-400">Manage list</div>
      </Link>
    </div>
  );
}
