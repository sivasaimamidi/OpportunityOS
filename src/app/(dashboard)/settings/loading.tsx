import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function SettingsLoading() {
  return (
    <div className="max-w-4xl space-y-6">
      <Skeleton className="h-48 rounded-2xl bg-slate-900" />
      <Skeleton className="h-48 rounded-2xl bg-slate-900" />
    </div>
  );
}
