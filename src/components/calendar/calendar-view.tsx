'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { GlassCard, StatusBadge } from '@/components/atoms';
import { useOpportunityStore } from '@/providers/store-provider';

export function CalendarView() {
  const opportunities = useOpportunityStore((s) => s.opportunities);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1)); // July 2026

  const daysInMonth = 31;
  const startDayOffset = 3; // Wednesday start

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white font-heading">July 2026</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-400 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="py-2">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: startDayOffset }).map((_, i) => (
          <div key={`offset-${i}`} className="h-24 rounded-xl bg-slate-950/20" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const oppsForDay = opportunities.filter((o) => o.daysUntilDeadline === day);

          return (
            <div
              key={day}
              className={`h-24 rounded-xl p-2 border ${
                day === 6 ? 'bg-indigo-600/10 border-indigo-500/50' : 'bg-slate-900/40 border-white/5'
              } flex flex-col justify-between hover:border-indigo-500/30 transition-colors`}
            >
              <span className={`text-xs font-mono font-bold ${day === 6 ? 'text-indigo-400' : 'text-slate-300'}`}>{day}</span>

              <div className="space-y-1 overflow-y-auto">
                {oppsForDay.map((opp) => (
                  <div key={opp.id} className="text-[10px] p-1 rounded bg-indigo-500/20 text-indigo-300 truncate font-medium">
                    {opp.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
