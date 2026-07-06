'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Check, Bot, Zap, Clock } from 'lucide-react';
import { GlassCard, ShimmerButton } from '@/components/atoms';

export function DemoSection() {
  const [url, setUrl] = useState('https://summerofcode.withgoogle.com');
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleSimulate = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 1500);
  };

  return (
    <section id="demo" className="py-28 relative border-t border-white/5 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">Live Interactive Demo</h2>
          <p className="text-3xl sm:text-5xl font-bold text-white font-heading tracking-tight">Try Smart Extraction</p>
        </div>

        <GlassCard className="max-w-4xl mx-auto p-8 border-indigo-500/30 bg-slate-900/80 backdrop-blur-2xl">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 rounded-xl bg-slate-950 border border-white/10 px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
              placeholder="Paste opportunity link..."
            />
            <ShimmerButton onClick={handleSimulate} disabled={analyzing} className="py-3 px-6 text-sm">
              {analyzing ? <Sparkles className="h-4 w-4 animate-spin" /> : <Bot className="h-4 w-4" />}
              {analyzing ? 'Extracting with AI...' : 'Extract Opportunity'}
            </ShimmerButton>
          </div>

          {analyzed && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Google Summer of Code 2026</h4>
                    <span className="text-xs text-slate-400">Extracted from summerofcode.withgoogle.com</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  Urgency: 18 Days Left
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-slate-400 mb-1">Career Score Impact</div>
                  <div className="text-2xl font-bold text-indigo-400">+92 Pts</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-slate-400 mb-1">Estimated Time</div>
                  <div className="text-2xl font-bold text-purple-400">350 Hours</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-slate-400 mb-1">Difficulty</div>
                  <div className="text-2xl font-bold text-amber-400">Advanced</div>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-slate-300 mb-2">Generated Checklist (6 Tasks)</h5>
                <div className="space-y-2">
                  {['Research participating organizations', 'Make first contribution to chosen org', 'Draft project proposal'].map((task, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-300 p-2.5 rounded-lg bg-white/5">
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </GlassCard>
      </div>
    </section>
  );
}
