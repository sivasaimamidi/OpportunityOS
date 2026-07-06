'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Code, Mail, User, Lock, Loader2, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { APP_NAME, ROUTES } from '@/lib/constants';
import { GlassCard, ShimmerButton } from '@/components/atoms';
import { useAuthStore } from '@/providers/store-provider';
import { toast } from 'sonner';

export default function SignUpPage() {
  const router = useRouter();
  const registerUser = useAuthStore((s) => s.registerUser);
  const signInUser = useAuthStore((s) => s.signInUser);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'github' | 'email' | 'duplicate' | null>(null);

  const isPasswordValid = password.length >= 8;

  const handleDuplicateAccount = () => {
    setErrorMessage('');
    setLoadingProvider('duplicate');
    toast.info('Creating duplicate demo account...');

    setTimeout(() => {
      const demoEmail = `demo.${Date.now()}@opportunityos.ai`;
      registerUser({ name: 'Demo Student', email: demoEmail, password: 'demoPassword123', provider: 'email' });
      signInUser({ email: demoEmail, password: 'demoPassword123', provider: 'email' });
      setLoadingProvider(null);
      toast.success('Logged in with Duplicate Account!');
      router.push(ROUTES.dashboard);
    }, 800);
  };

  const handleSocialAuth = (provider: 'google' | 'github') => {
    setErrorMessage('');
    setLoadingProvider(provider);
    toast.info(`Creating account with ${provider === 'google' ? 'Google' : 'GitHub'}...`);

    setTimeout(() => {
      const socialEmail = `user@${provider}.com`;
      registerUser({ name: `${provider === 'google' ? 'Google' : 'GitHub'} Student`, email: socialEmail, provider });
      setLoadingProvider(null);
      toast.success(`Account created via ${provider === 'google' ? 'Google' : 'GitHub'}! Now sign in with your account.`);
      router.push(`${ROUTES.signIn}?email=${encodeURIComponent(socialEmail)}`);
    }, 1200);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    setLoadingProvider('email');

    setTimeout(() => {
      const res = registerUser({ name, email, password, provider: 'email' });
      setLoadingProvider(null);

      if (!res.success) {
        setErrorMessage(res.error || 'Registration failed.');
        toast.error(res.error || 'Registration failed.');
        return;
      }

      toast.success(`Account created for ${name}! Please sign in to continue.`);
      router.push(`${ROUTES.signIn}?email=${encodeURIComponent(email)}`);
    }, 1000);
  };

  return (
    <GlassCard className="p-8 border-indigo-500/30 bg-slate-900/90 backdrop-blur-2xl">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 mb-4 shadow-lg shadow-indigo-500/30">
          <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-indigo-400" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white font-heading">Create your Account</h1>
        <p className="text-xs text-slate-400 mt-1">Sign up first to get access to {APP_NAME} AI</p>
      </div>

      {/* Duplicate Account Instant Button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={handleDuplicateAccount}
          disabled={loadingProvider !== null}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-pink-600/30 border border-indigo-500/40 text-white text-sm font-semibold hover:border-indigo-400 hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 group disabled:opacity-50"
        >
          {loadingProvider === 'duplicate' ? (
            <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
          ) : (
            <Code className="h-4 w-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          )}
          {loadingProvider === 'duplicate' ? 'Loading Duplicate Account...' : 'Explore with Duplicate Account'}
        </button>
        <p className="text-[11px] text-slate-500 text-center mt-1.5">Instant 1-click preview — skips registration</p>
      </div>

      <div className="space-y-3 mb-6">
        <button
          type="button"
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
          type="button"
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

      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
          <div>{errorMessage}</div>
        </div>
      )}

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
              placeholder="Minimum 8 characters"
              required
              minLength={8}
              disabled={loadingProvider !== null}
              className={`w-full rounded-xl bg-slate-950 border pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none transition-colors ${
                password.length > 0 && !isPasswordValid
                  ? 'border-rose-500/60 focus:border-rose-500'
                  : 'border-white/10 focus:border-indigo-500'
              }`}
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

          {/* Real-time Password Strength Indicator */}
          <div className="mt-1.5 flex items-center justify-between text-[11px]">
            <span className={isPasswordValid ? 'text-emerald-400 flex items-center gap-1 font-medium' : 'text-slate-400'}>
              {isPasswordValid && <CheckCircle2 className="h-3 w-3" />}
              Must be at least 8 characters
            </span>
            <span className={isPasswordValid ? 'text-emerald-400 font-mono font-bold' : 'text-slate-500 font-mono'}>
              {password.length}/8
            </span>
          </div>
        </div>

        <ShimmerButton type="submit" disabled={loadingProvider !== null || (password.length > 0 && !isPasswordValid)} className="w-full py-3 text-sm mt-2">
          {loadingProvider === 'email' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Registering Account...
            </>
          ) : (
            <>
              Create Account <ArrowRight className="h-4 w-4" />
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
