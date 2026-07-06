'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Code, Mail, Lock } from 'lucide-react';
import { APP_NAME, ROUTES } from '@/lib/constants';
import { GlassCard, ShimmerButton } from '@/components/atoms';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(ROUTES.dashboard);
  };

  return (
    <GlassCard className="p-8 border-indigo-500/30 bg-slate-900/90 backdrop-blur-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 mb-4 shadow-lg shadow-indigo-500/30">
          <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-indigo-400" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white font-heading">Welcome Back to {APP_NAME}</h1>
        <p className="text-xs text-slate-400 mt-1">Sign in to manage your career opportunities</p>
      </div>

      <div className="space-y-3 mb-6">
        <button
          onClick={() => router.push(ROUTES.dashboard)}
          className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
        >
          <Code className="h-4 w-4" /> Continue with GitHub
        </button>
        <button
          onClick={() => router.push(ROUTES.dashboard)}
          className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
        >
          <Mail className="h-4 w-4 text-rose-400" /> Continue with Google
        </button>
      </div>

      <div className="relative flex items-center justify-center my-6">
        <div className="border-t border-white/10 w-full" />
        <span className="bg-slate-900 px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider absolute">OR</span>
      </div>

      <form onSubmit={handleSignIn} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@university.edu"
              required
              className="w-full rounded-xl bg-slate-950 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-xs font-medium text-slate-300">Password</label>
            <a href="#" className="text-xs text-indigo-400 hover:underline">Forgot?</a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl bg-slate-950 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <ShimmerButton type="submit" className="w-full py-3 text-sm mt-2">
          Sign In <ArrowRight className="h-4 w-4" />
        </ShimmerButton>
      </form>

      <p className="text-center text-xs text-slate-400 mt-6">
        Don't have an account?{' '}
        <Link href={ROUTES.signUp} className="text-indigo-400 font-semibold hover:underline">
          Sign Up
        </Link>
      </p>
    </GlassCard>
  );
}
