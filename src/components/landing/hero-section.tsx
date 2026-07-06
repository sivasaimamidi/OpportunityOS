'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Zap, Trophy, Briefcase, GraduationCap, Code2, Play } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, ROUTES } from '@/lib/constants';
import { ShimmerButton, GlassCard, GradientText, OrbitingDots } from '@/components/atoms';

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden grid-pattern">
      {/* 3D Mesh Gradient Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/30 via-violet-600/20 to-pink-600/10 rounded-full blur-[120px] pointer-events-none float" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-purple-600/20 to-blue-600/10 rounded-full blur-[100px] pointer-events-none float-delayed" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md mb-8"
        >
          <OrbitingDots size="sm" />
          <span className="text-xs font-semibold text-indigo-300 tracking-wide uppercase">
            Next-Gen AI Career Operating System
          </span>
        </motion.div>

        {/* Hero Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white font-heading leading-[1.08] max-w-5xl mx-auto"
        >
          Never Miss Another <br />
          <GradientText variant="primary">Opportunity Again.</GradientText>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          An intelligent Career OS for students. Auto-extracts details, predicts prep time, generates checklists, and calculates your personal Career Score.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href={ROUTES.dashboard}>
            <ShimmerButton className="w-full sm:w-auto text-base py-4 px-8">
              Start Building Your Career <ArrowRight className="h-5 w-5" />
            </ShimmerButton>
          </Link>
          <a href="#demo">
            <ShimmerButton variant="secondary" className="w-full sm:w-auto text-base py-4 px-8">
              <Play className="h-4 w-4 text-indigo-400 fill-indigo-400" /> Watch Live Demo
            </ShimmerButton>
          </a>
        </motion.div>

        {/* 3D Floating Opportunity Badges Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 relative max-w-5xl mx-auto"
        >
          <GlassCard tilt glow className="p-8 border-indigo-500/20 bg-slate-950/80 backdrop-blur-2xl">
            <div className="flex items-center justify-between pb-6 border-b border-white/10 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" /> Live System Active
              </span>
              <span>AI Engine: Gemini 1.5 Flash</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[
                { icon: Zap, label: 'Hackathons', count: '12 Active', color: 'text-indigo-400' },
                { icon: Briefcase, label: 'Internships', count: '8 Tracked', color: 'text-emerald-400' },
                { icon: Code2, label: 'Contests', count: '5 Upcoming', color: 'text-purple-400' },
                { icon: GraduationCap, label: 'Scholarships', count: '$45k Value', color: 'text-amber-400' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 text-left hover:bg-white/10 transition-colors">
                  <item.icon className={`h-6 w-6 ${item.color} mb-2`} />
                  <div className="font-semibold text-white text-sm">{item.label}</div>
                  <div className="text-xs text-slate-400">{item.count}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
