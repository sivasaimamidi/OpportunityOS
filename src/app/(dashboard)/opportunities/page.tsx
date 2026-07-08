'use client';

import React from 'react';
import { OpportunityCard } from '@/components/opportunities/opportunity-card';
import { OpportunityFilters } from '@/components/opportunities/opportunity-filters';
import { OpportunityDetailPanel } from '@/components/opportunities/opportunity-detail-panel';
import { useOpportunityStore } from '@/providers/store-provider';
import { Opportunity } from '@/types';

export default function OpportunitiesPage() {
  const opportunities = useOpportunityStore((s) => s.opportunities);
  const filters = useOpportunityStore((s) => s.filters);
  const viewMode = useOpportunityStore((s) => s.viewMode);
  
  const selectedId = useOpportunityStore((s) => s.selectedId);
  const selectOpportunity = useOpportunityStore((s) => s.selectOpportunity);
  const selectedOpp = opportunities.find((o) => o.id === selectedId) || null;

  // Filter logic
  const filtered = opportunities.filter((opp) => {
    if (filters.search && !opp.title.toLowerCase().includes(filters.search.toLowerCase()) && !opp.organization?.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.types.length > 0 && !filters.types.includes(opp.type)) {
      return false;
    }
    return true;
  });

  // Sort by deadline day wise (closest deadline first, no deadline at the end)
  const sorted = [...filtered].sort((a, b) => {
    const valA = a.daysUntilDeadline !== undefined ? a.daysUntilDeadline : 99999;
    const valB = b.daysUntilDeadline !== undefined ? b.daysUntilDeadline : 99999;
    return valA - valB;
  });

  return (
    <div className="space-y-6">
      <OpportunityFilters />

      {sorted.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-white/5">
          <p className="text-slate-400 text-sm">No opportunities matched your search criteria.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} onClick={() => selectOpportunity(opp.id)} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((opp) => (
            <div
              key={opp.id}
              onClick={() => selectOpportunity(opp.id)}
              className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between hover:border-indigo-500/40 cursor-pointer transition-all"
            >
              <div>
                <h4 className="font-bold text-white text-sm">{opp.title}</h4>
                <p className="text-xs text-slate-400">{opp.type} • {opp.organization}</p>
              </div>
              <div className="flex items-center gap-4">
                {opp.daysUntilDeadline !== undefined && (
                  <span className="text-xs text-slate-400 bg-slate-950/40 px-2.5 py-1 rounded-lg border border-white/5 flex items-center gap-1">
                    ⏱️ {opp.daysUntilDeadline}d left
                  </span>
                )}
                <span className="text-xs font-mono text-indigo-400">Score: {opp.priorityScore}/100</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <OpportunityDetailPanel opportunity={selectedOpp} onClose={() => selectOpportunity(null)} />
    </div>
  );
}
