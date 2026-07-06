import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function OpportunitiesLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-full rounded-xl bg-slate-900" />
      <div className="grid grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-2xl bg-slate-900" />
        ))}
      </div>
    </div>
  );
}
