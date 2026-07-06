'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Link2, Sparkles, CheckCircle } from 'lucide-react';
import { GlassCard } from '@/components/atoms';

export function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      icon: Link2,
      title: 'Import Any Opportunity',
      desc: 'Paste a link to any hackathon, internship, contest, or scholarship. OpportunityOS extracts all details automatically.',
    },
    {
      num: '02',
      icon: Sparkles,
      title: 'AI Generates Roadmap',
      desc: 'Gemini AI analyzes requirements, computes difficulty, creates custom checklists, and schedules smart reminders.',
    },
    {
      num: '03',
      icon: CheckCircle,
      title: 'Execute & Elevate',
      desc: 'Follow AI-driven daily briefs, complete tasks, track progress, and watch your career score reach top percentiles.',
    },
  ];

  return (
    <section id="how-it-works" className="py-28 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">Simple 3-Step Workflow</h2>
          <p className="text-3xl sm:text-5xl font-bold text-white font-heading tracking-tight">How OpportunityOS Works</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
            >
              <GlassCard className="relative p-8 h-full">
                <span className="text-5xl font-extrabold text-slate-800 font-mono absolute top-4 right-6">{step.num}</span>
                <div className="h-12 w-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
