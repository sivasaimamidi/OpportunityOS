'use client';

import React from 'react';
import { X, ExternalLink, CheckCircle2, Clock, Trash2, Calendar, Award } from 'lucide-react';
import { Opportunity } from '@/types';
import { GlassCard, StatusBadge, ShimmerButton } from '@/components/atoms';
import { useOpportunityStore } from '@/providers/store-provider';
import { OPPORTUNITY_TYPE_LABELS } from '@/types';

export function OpportunityDetailPanel({ opportunity, onClose }: { opportunity: Opportunity | null; onClose: () => void }) {
  const toggleChecklistItem = useOpportunityStore((s) => s.toggleChecklistItem);
  const deleteOpportunity = useOpportunityStore((s) => s.deleteOpportunity);

  if (!opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-slate-900 border-l border-white/10 h-full overflow-y-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <span className="px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase">
            {OPPORTUNITY_TYPE_LABELS[opportunity.type]}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                deleteOpportunity(opportunity.id);
                onClose();
              }}
              className="text-slate-500 hover:text-rose-400 text-xs flex items-center gap-1"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Title & Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{opportunity.title}</h2>
          <p className="text-sm text-slate-400 mb-4">{opportunity.organization} • {opportunity.location || 'Remote'}</p>

          {opportunity.url && (
            <a
              href={opportunity.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:underline mb-4"
            >
              Visit Opportunity Website <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
          <div>
            <div className="text-[11px] text-slate-400">Deadline</div>
            <div className="text-sm font-bold text-white">{opportunity.daysUntilDeadline !== undefined ? `${opportunity.daysUntilDeadline} Days` : 'N/A'}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Priority Score</div>
            <div className="text-sm font-bold text-indigo-400">{opportunity.priorityScore}/100</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Career Impact</div>
            <div className="text-sm font-bold text-emerald-400">+{opportunity.careerScore} Pts</div>
          </div>
        </div>

        {/* AI Summary */}
        {opportunity.summary && (
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
            <h4 className="text-xs font-bold text-indigo-300 uppercase mb-2">AI Summary</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{opportunity.summary}</p>
          </div>
        )}

        {/* Checklist */}
        <div>
          <h4 className="text-sm font-bold text-white mb-3">Preparation Checklist</h4>
          <div className="space-y-2">
            {opportunity.checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(opportunity.id, item.id)}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 cursor-pointer"
              >
                <div className={`h-4 w-4 rounded border flex items-center justify-center ${item.completed ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-600'}`}>
                  {item.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                </div>
                <span className={`text-xs ${item.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
