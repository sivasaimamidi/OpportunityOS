import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-2xl bg-slate-900" />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-64 rounded-2xl bg-slate-900 col-span-1" />
        <Skeleton className="h-64 rounded-2xl bg-slate-900 col-span-2" />
      </div>
      <Skeleton className="h-44 rounded-2xl bg-slate-900" />
    </div>
  );
}
