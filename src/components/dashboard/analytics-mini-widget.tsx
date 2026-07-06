'use client';

import React from 'react';
import { Flame, CheckCircle, Clock } from 'lucide-react';
import { GlassCard } from '@/components/atoms';
import { mockAnalytics } from '@/services/mock-data';

export function AnalyticsMiniWidget() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <GlassCard className="p-4 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
          <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> Completion
        </div>
        <div className="text-2xl font-bold text-white font-heading">{mockAnalytics.completionRate}%</div>
      </GlassCard>

      <GlassCard className="p-4 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
          <Flame className="h-3.5 w-3.5 text-orange-400" /> Streak
        </div>
        <div className="text-2xl font-bold text-white font-heading">{mockAnalytics.currentStreak} Days</div>
      </GlassCard>

      <GlassCard className="p-4 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
          <Clock className="h-3.5 w-3.5 text-indigo-400" /> Hours Spent
        </div>
        <div className="text-2xl font-bold text-white font-heading">{mockAnalytics.totalHoursInvested}h</div>
      </GlassCard>
    </div>
  );
}
