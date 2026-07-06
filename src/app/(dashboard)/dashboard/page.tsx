'use client';

import React from 'react';
import { CareerScoreWidget } from '@/components/dashboard/career-score-widget';
import { TodaysFocusWidget } from '@/components/dashboard/todays-focus-widget';
import { UpcomingDeadlinesWidget } from '@/components/dashboard/upcoming-deadlines-widget';
import { QuickActionsWidget } from '@/components/dashboard/quick-actions-widget';
import { AnalyticsMiniWidget } from '@/components/dashboard/analytics-mini-widget';
import { AIInsightWidget } from '@/components/dashboard/ai-insight-widget';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Quick Action Banner */}
      <QuickActionsWidget />

      {/* Top Grid: Career Score + Today's Focus */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <CareerScoreWidget />
        </div>
        <div className="md:col-span-2">
          <TodaysFocusWidget />
        </div>
      </div>

      {/* Analytics Summary */}
      <AnalyticsMiniWidget />

      {/* Bottom Grid: Deadlines + AI Insight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UpcomingDeadlinesWidget />
        <AIInsightWidget />
      </div>
    </div>
  );
}
