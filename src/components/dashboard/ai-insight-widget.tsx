'use client';

import React from 'react';
import { Bot, ArrowRight } from 'lucide-react';
import { GlassCard, OrbitingDots } from '@/components/atoms';
import { mockDailyBrief } from '@/services/mock-data';
import Link from 'next/link';

export function AIInsightWidget() {
  return (
    <GlassCard glow className="p-6 border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <OrbitingDots size="sm" />
          <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">AI Daily Brief</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">Updated today</span>
      </div>

      <p className="text-sm text-slate-200 leading-relaxed mb-4">
        "{mockDailyBrief.insights[0]}"
      </p>

      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-xs text-slate-400">Recommendation based on your goals</span>
        <Link href="/ai-advisor" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
          Chat with Advisor <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </GlassCard>
  );
}
