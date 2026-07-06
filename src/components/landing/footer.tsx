import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 bg-slate-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-bold text-white font-heading">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          <span>{APP_NAME} AI</span>
        </div>
        <div className="flex gap-6 text-xs text-slate-400">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </div>
        <div className="text-xs text-slate-500">
          © {new Date().getFullYear()} OpportunityOS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
