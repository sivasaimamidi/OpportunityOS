'use client';

import React from 'react';
import { TrendingUp, Award, Zap } from 'lucide-react';
import { GlassCard } from '@/components/atoms';
import { mockCareerScore } from '@/services/mock-data';

export function CareerScoreWidget() {
  const score = mockCareerScore.overall;

  return (
    <GlassCard glow className="p-6 flex flex-col justify-between relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Career Score</span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
          <TrendingUp className="h-3 w-3" /> Top {100 - mockCareerScore.percentile}%
        </span>
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-5xl font-extrabold text-white font-heading">{score}</span>
        <span className="text-slate-500 text-sm font-semibold">/ 100</span>
      </div>

      <p className="text-xs text-slate-400 mb-4">Calculated from impact, resume value, and consistency.</p>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" style={{ width: `${score}%` }} />
      </div>
    </GlassCard>
  );
}
