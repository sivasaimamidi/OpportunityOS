'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Code, Mail, User, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { APP_NAME, ROUTES } from '@/lib/constants';
import { GlassCard, ShimmerButton } from '@/components/atoms';
import { toast } from 'sonner';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'github' | 'email' | null>(null);

  const handleSocialAuth = (provider: 'google' | 'github') => {
    setLoadingProvider(provider);
    toast.info(`Creating account with ${provider === 'google' ? 'Google' : 'GitHub'}...`);

    setTimeout(() => {
      toast.success(`Account created with ${provider === 'google' ? 'Google' : 'GitHub'}! Welcome to ${APP_NAME}.`);
      router.push(ROUTES.dashboard);
    }, 1200);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setLoadingProvider('email');
    toast.info('Creating your account...');

    setTimeout(() => {
      toast.success(`Account created successfully! Welcome, ${name}.`);
      router.push(ROUTES.dashboard);
    }, 1000);
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

      <div className="space-y-3 mb-6">
        <button
          onClick={() => handleSocialAuth('github')}
          disabled={loadingProvider !== null}
          className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loadingProvider === 'github' ? (
            <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
          ) : (
            <Code className="h-4 w-4" />
          )}
          {loadingProvider === 'github' ? 'Connecting to GitHub...' : 'Continue with GitHub'}
        </button>

        <button
          onClick={() => handleSocialAuth('google')}
          disabled={loadingProvider !== null}
          className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loadingProvider === 'google' ? (
            <Loader2 className="h-4 w-4 animate-spin text-rose-400" />
          ) : (
            <Mail className="h-4 w-4 text-rose-400" />
          )}
          {loadingProvider === 'google' ? 'Connecting to Google...' : 'Continue with Google'}
        </button>
      </div>

      <div className="relative flex items-center justify-center my-6">
        <div className="border-t border-white/10 w-full" />
        <span className="bg-slate-900 px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider absolute">OR</span>
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
              disabled={loadingProvider !== null}
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
              placeholder="you@example.com"
              required
              disabled={loadingProvider !== null}
              className="w-full rounded-xl bg-slate-950 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Must be at least 8 characters"
              required
              disabled={loadingProvider !== null}
              className="w-full rounded-xl bg-slate-950 border border-white/10 pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition-colors"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <ShimmerButton type="submit" disabled={loadingProvider !== null} className="w-full py-3 text-sm mt-2">
          {loadingProvider === 'email' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Creating Account...
            </>
          ) : (
            <>
              Create Free Account <ArrowRight className="h-4 w-4" />
            </>
          )}
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
