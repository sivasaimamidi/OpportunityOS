'use client';

import React from 'react';
import { CheckCircle2, Clock, Flame } from 'lucide-react';
import { GlassCard, StatusBadge } from '@/components/atoms';
import { useOpportunityStore } from '@/providers/store-provider';

export function TodaysFocusWidget() {
  const opportunities = useOpportunityStore((s) => s.opportunities);
  const toggleChecklistItem = useOpportunityStore((s) => s.toggleChecklistItem);

  const urgentOpp = opportunities.find((o) => o.urgency === 'critical' || o.urgency === 'urgent') || opportunities[0];

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
          <Flame className="h-4 w-4 fill-rose-500 text-rose-500" /> Today's Priority Focus
        </span>
        {urgentOpp?.urgency && <StatusBadge urgency={urgentOpp.urgency} />}
      </div>

      {urgentOpp ? (
        <div>
          <h3 className="font-bold text-white text-lg mb-1">{urgentOpp.title}</h3>
          <p className="text-xs text-slate-400 mb-4">{urgentOpp.organization} • {urgentOpp.summary?.slice(0, 80)}...</p>

          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Top Checklist Items</span>
            {urgentOpp.checklist.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(urgentOpp.id, item.id)}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-colors"
              >
                <div className={`h-4 w-4 rounded border flex items-center justify-center ${item.completed ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-600'}`}>
                  {item.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                </div>
                <span className={`text-xs ${item.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-400">No urgent tasks today!</p>
      )}
    </GlassCard>
  );
}
