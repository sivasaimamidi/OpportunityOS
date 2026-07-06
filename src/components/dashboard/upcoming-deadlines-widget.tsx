'use client';

import React from 'react';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { GlassCard, StatusBadge } from '@/components/atoms';
import { useOpportunityStore } from '@/providers/store-provider';

export function UpcomingDeadlinesWidget() {
  const opportunities = useOpportunityStore((s) => s.opportunities);
  const deadlines = opportunities.filter((o) => o.deadline).slice(0, 4);

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="h-4 w-4" /> Upcoming Deadlines
        </span>
        <span className="text-xs text-slate-400 font-mono">{deadlines.length} Active</span>
      </div>

      <div className="space-y-3">
        {deadlines.map((opp) => (
          <div key={opp.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all">
            <div className="overflow-hidden mr-3">
              <div className="font-semibold text-white text-sm truncate">{opp.title}</div>
              <div className="text-xs text-slate-400 capitalize">{opp.type.replace('-', ' ')} • {opp.organization}</div>
            </div>
            <StatusBadge urgency={opp.urgency} />
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
