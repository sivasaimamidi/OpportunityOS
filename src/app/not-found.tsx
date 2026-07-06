import Link from 'next/link';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { ShimmerButton } from '@/components/atoms';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 text-center grid-pattern">
      <div className="max-w-md space-y-6">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
          <Sparkles className="h-8 w-8" />
        </div>
        <h1 className="text-6xl font-extrabold text-white font-heading">404</h1>
        <h2 className="text-xl font-bold text-slate-200">Page Not Found</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          The opportunity or page you are looking for might have been moved or does not exist.
        </p>
        <Link href="/dashboard" className="inline-block">
          <ShimmerButton className="py-2.5 px-6 text-sm">
            <ArrowLeft className="h-4 w-4" /> Return to Dashboard
          </ShimmerButton>
        </Link>
      </div>
    </div>
  );
}
