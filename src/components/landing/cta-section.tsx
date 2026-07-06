'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { ShimmerButton } from '@/components/atoms';

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-indigo-950/40 via-slate-950 to-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6">
          <Sparkles className="h-3.5 w-3.5" /> Start Free Today
        </div>
        <h2 className="text-4xl sm:text-6xl font-extrabold text-white font-heading tracking-tight mb-6">
          Ready to Take Control of Your Career?
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Join thousands of students using OpportunityOS to track hackathons, internships, contests, and scholarships automatically.
        </p>
        <Link href={ROUTES.dashboard}>
          <ShimmerButton className="text-lg py-4 px-10">
            Launch OpportunityOS AI Free <ArrowRight className="h-5 w-5" />
          </ShimmerButton>
        </Link>
      </div>
    </section>
  );
}
