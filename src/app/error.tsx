'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { ShimmerButton } from '@/components/atoms';

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-white font-heading">Something went wrong</h1>
        <p className="text-xs text-slate-400">An unforeseen error occurred. Please try refreshing the application.</p>
        <ShimmerButton onClick={() => reset()} className="py-2.5 px-6 text-sm">
          <RefreshCw className="h-4 w-4" /> Try Again
        </ShimmerButton>
      </div>
    </div>
  );
}
