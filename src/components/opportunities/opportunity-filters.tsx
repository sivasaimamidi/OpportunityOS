'use client';

import React from 'react';
import { Search, Filter, LayoutGrid, List } from 'lucide-react';
import { useOpportunityStore } from '@/providers/store-provider';
import { OPPORTUNITY_TYPES, OPPORTUNITY_TYPE_LABELS } from '@/types';

export function OpportunityFilters() {
  const filters = useOpportunityStore((s) => s.filters);
  const setFilters = useOpportunityStore((s) => s.setFilters);
  const viewMode = useOpportunityStore((s) => s.viewMode);
  const setViewMode = useOpportunityStore((s) => s.setViewMode);

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
      {/* Search Input */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          placeholder="Search by title, organization..."
          className="w-full rounded-xl bg-slate-900 border border-white/10 pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        {/* Type Selector */}
        <select
          value={filters.types[0] || ''}
          onChange={(e) => setFilters({ types: e.target.value ? [e.target.value as any] : [] })}
          className="rounded-xl bg-slate-900 border border-white/10 px-3 py-2 text-xs text-slate-300 focus:outline-none"
        >
          <option value="">All Categories</option>
          {OPPORTUNITY_TYPES.map((t) => (
            <option key={t} value={t}>{OPPORTUNITY_TYPE_LABELS[t]}</option>
          ))}
        </select>

        {/* View Mode Toggle */}
        <div className="flex items-center rounded-xl bg-slate-900 border border-white/10 p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg text-xs ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg text-xs ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
