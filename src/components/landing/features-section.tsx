'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Link as LinkIcon, Bot, TrendingUp, Bell, CheckCircle2, ArrowUpDown } from 'lucide-react';
import { FEATURES } from '@/lib/constants';
import { GlassCard, GradientText } from '@/components/atoms';

const iconMap = [LinkIcon, Bot, TrendingUp, Bell, CheckCircle2, ArrowUpDown];

export function FeaturesSection() {
  return (
    <section id="features" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">Engineered For Excellence</h2>
          <p className="text-3xl sm:text-5xl font-bold text-white font-heading tracking-tight">
            Everything you need to <GradientText variant="accent">supercharge your career</GradientText>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = iconMap[idx % iconMap.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <GlassCard tilt className="h-full flex flex-col justify-between">
                  <div>
                    <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 font-heading">{feat.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{feat.description}</p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
