import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AnalyticsLoading() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl bg-slate-900" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-2xl bg-slate-900" />
    </div>
  );
}
