'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Code, Mail, User, Lock } from 'lucide-react';
import { APP_NAME, ROUTES } from '@/lib/constants';
import { GlassCard, ShimmerButton } from '@/components/atoms';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
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
        <h1 className="text-2xl font-bold text-white font-heading">Create your Account</h1>
        <p className="text-xs text-slate-400 mt-1">Get started with {APP_NAME} AI free</p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Rivera"
              required
              className="w-full rounded-xl bg-slate-950 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@university.edu"
              required
              className="w-full rounded-xl bg-slate-950 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Must be at least 8 characters"
              required
              className="w-full rounded-xl bg-slate-950 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <ShimmerButton type="submit" className="w-full py-3 text-sm mt-2">
          Create Free Account <ArrowRight className="h-4 w-4" />
        </ShimmerButton>
      </form>

      <p className="text-center text-xs text-slate-400 mt-6">
        Already have an account?{' '}
        <Link href={ROUTES.signIn} className="text-indigo-400 font-semibold hover:underline">
          Sign In
        </Link>
      </p>
    </GlassCard>
  );
}
