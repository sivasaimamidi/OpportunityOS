'use client';

import React from 'react';
import { ExternalLink, Clock, CheckCircle2, Award } from 'lucide-react';
import { Opportunity } from '@/types';
import { GlassCard, StatusBadge } from '@/components/atoms';
import { OPPORTUNITY_TYPE_LABELS } from '@/types';

export function OpportunityCard({ opportunity, onClick }: { opportunity: Opportunity; onClick: () => void }) {
  return (
    <GlassCard tilt onClick={onClick} className="cursor-pointer p-6 flex flex-col justify-between h-full group hover:border-indigo-500/40">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider border border-indigo-500/20">
            {OPPORTUNITY_TYPE_LABELS[opportunity.type]}
          </span>
          <StatusBadge urgency={opportunity.urgency} />
        </div>

        <h3 className="font-bold text-white text-lg mb-1 group-hover:text-indigo-300 transition-colors line-clamp-1">{opportunity.title}</h3>
        <p className="text-xs text-slate-400 mb-4">{opportunity.organization || 'Self-managed'} • {opportunity.location || 'Remote'}</p>
        <p className="text-slate-300 text-xs line-clamp-2 mb-6">{opportunity.description}</p>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Progress ({opportunity.progress}%)</span>
          <span className="font-mono text-indigo-400 font-semibold">Priority {opportunity.priorityScore}/100</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${opportunity.progress}%` }} />
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {opportunity.daysUntilDeadline !== undefined ? `${opportunity.daysUntilDeadline}d left` : 'No deadline'}
          </span>
          {opportunity.careerScore && (
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <Award className="h-3 w-3" /> +{opportunity.careerScore} Score
            </span>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
