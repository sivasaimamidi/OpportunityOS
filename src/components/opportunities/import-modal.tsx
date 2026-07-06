'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Link2, Check, Bot, AlertCircle } from 'lucide-react';
import { useAppStore, useOpportunityStore } from '@/providers/store-provider';
import { GlassCard, ShimmerButton } from '@/components/atoms';
import { mockAIAnalysis } from '@/services/mock-data';

export function ImportModal() {
  const importModalOpen = useAppStore((s) => s.importModalOpen);
  const setImportModalOpen = useAppStore((s) => s.setImportModalOpen);
  const addOpportunity = useOpportunityStore((s) => s.addOpportunity);

  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!importModalOpen) return null;

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setCompleted(true);

      // Add to store
      addOpportunity({
        title: 'Extracted Opportunity from URL',
        type: 'hackathon',
        status: 'preparing',
        description: mockAIAnalysis.summary,
        url: url,
        deadline: new Date(Date.now() + 14 * 86400000).toISOString(),
        summary: mockAIAnalysis.summary,
        requirements: mockAIAnalysis.requirements,
        difficulty: mockAIAnalysis.difficulty,
        estimatedHours: mockAIAnalysis.estimatedHours,
        priorityScore: mockAIAnalysis.priorityScore,
        careerScore: mockAIAnalysis.careerScore,
        resumeImpact: mockAIAnalysis.resumeImpact,
        progress: 0,
        checklist: mockAIAnalysis.checklist,
        tags: ['imported', 'ai-extracted'],
        attachments: [],
      });
    }, 2000);
  };

  const handleClose = () => {
    setImportModalOpen(false);
    setCompleted(false);
    setAnalyzing(false);
    setUrl('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg">
        <GlassCard className="p-6 border-indigo-500/30 bg-slate-900/95 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-white text-base">Smart URL Import</h3>
            </div>
            <button onClick={handleClose} className="text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          {!completed ? (
            <form onSubmit={handleImport} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Opportunity URL</label>
                <div className="relative">
                  <Link2 className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://devpost.com/hackathons/..."
                    required
                    disabled={analyzing}
                    className="w-full rounded-xl bg-slate-950 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              {analyzing ? (
                <div className="py-8 text-center space-y-3">
                  <Bot className="h-8 w-8 text-indigo-400 animate-bounce mx-auto" />
                  <p className="text-sm font-semibold text-white">Gemini AI is analyzing the page...</p>
                  <p className="text-xs text-slate-400">Extracting deadlines, requirements, and generating checklist</p>
                </div>
              ) : (
                <ShimmerButton type="submit" className="w-full py-3 text-sm">
                  Extract & Add Opportunity
                </ShimmerButton>
              )}
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-white text-lg">Opportunity Extracted & Saved!</h4>
              <p className="text-xs text-slate-400">Checklist, summary, and career score generated automatically.</p>
              <ShimmerButton onClick={handleClose} className="w-full py-2.5 text-sm">
                Done
              </ShimmerButton>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
