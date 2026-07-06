'use client';

import React from 'react';
import { GlassCard } from '@/components/atoms';
import { mockAnalytics, mockCareerScore } from '@/services/mock-data';
import { BarChart3, TrendingUp, Award, Zap, Flame } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-5">
          <div className="text-xs text-slate-400 mb-1">Total Tracked</div>
          <div className="text-3xl font-bold text-white font-heading">{mockAnalytics.totalOpportunities}</div>
          <div className="text-[11px] text-emerald-400 mt-2">+4 this month</div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="text-xs text-slate-400 mb-1">Success Rate</div>
          <div className="text-3xl font-bold text-emerald-400 font-heading">{mockAnalytics.completionRate}%</div>
          <div className="text-[11px] text-slate-400 mt-2">12 of 16 completed</div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="text-xs text-slate-400 mb-1">Active Streak</div>
          <div className="text-3xl font-bold text-orange-400 font-heading">{mockAnalytics.currentStreak} Days</div>
          <div className="text-[11px] text-slate-400 mt-2">Longest: {mockAnalytics.longestStreak} days</div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="text-xs text-slate-400 mb-1">Career Impact</div>
          <div className="text-3xl font-bold text-indigo-400 font-heading">74 / 100</div>
          <div className="text-[11px] text-indigo-400 mt-2">Top 18th Percentile</div>
        </GlassCard>
      </div>

      {/* Breakdown by Type */}
      <GlassCard className="p-6">
        <h3 className="font-bold text-white text-base mb-6 font-heading">Opportunities by Category</h3>
        <div className="space-y-4">
          {Object.entries(mockAnalytics.byType).slice(0, 5).map(([type, count]) => (
            <div key={type}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 capitalize">{type.replace('-', ' ')}</span>
                <span className="text-slate-400 font-mono">{count} Items</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(count / 10) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Weekly Activity Grid */}
      <GlassCard className="p-6">
        <h3 className="font-bold text-white text-base mb-6 font-heading">Weekly Productivity</h3>
        <div className="grid grid-cols-7 gap-3 text-center">
          {mockAnalytics.weeklyActivity.map((day) => (
            <div key={day.day} className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-xs text-slate-400 mb-2">{day.day}</div>
              <div className="text-lg font-bold text-white">{day.hours}h</div>
              <div className="text-[10px] text-slate-500">{day.count} tasks</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
