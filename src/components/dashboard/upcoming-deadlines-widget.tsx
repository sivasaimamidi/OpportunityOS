'use client';

import React from 'react';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { GlassCard, StatusBadge } from '@/components/atoms';
import { useOpportunityStore } from '@/providers/store-provider';

export function UpcomingDeadlinesWidget() {
  const opportunities = useOpportunityStore((s) => s.opportunities);
  const deadlines = opportunities
    .filter((o) => {
      if (!o.deadline || o.status === 'completed' || o.status === 'missed') return false;
      const days = o.daysUntilDeadline;
      return days !== undefined && days > 1 && days <= 30;
    })
    .sort((a, b) => (a.daysUntilDeadline || 0) - (b.daysUntilDeadline || 0));

  return (
    <GlassCard className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="h-4 w-4" /> Upcoming Deadlines
        </span>
        <span className="text-xs text-slate-400 font-mono">{deadlines.length} Active</span>
      </div>

      {deadlines.length > 0 ? (
        <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar">
          {deadlines.map((opp) => (
            <div key={opp.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all">
              <div className="overflow-hidden mr-3">
                <div className="font-semibold text-white text-sm truncate">{opp.title}</div>
                <div className="text-xs text-slate-400 capitalize">{opp.type.replace('-', ' ')} • {opp.organization}</div>
              </div>
              <StatusBadge urgency={opp.urgency} days={opp.daysUntilDeadline} deadline={opp.deadline} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-10 gap-2">
          <span className="text-2xl">📅</span>
          <h4 className="text-sm font-bold text-white">No Upcoming Deadlines</h4>
          <p className="text-[11px] text-slate-400 max-w-[85%]">No other tasks are scheduled for the rest of this month.</p>
        </div>
      )}
    </GlassCard>
  );
}
