'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { PRICING_PLANS, ROUTES } from '@/lib/constants';
import { GlassCard, ShimmerButton, GradientText } from '@/components/atoms';

export function PricingSection() {
  return (
    <section id="pricing" className="py-28 relative border-t border-white/5 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">Transparent Pricing</h2>
          <p className="text-3xl sm:text-5xl font-bold text-white font-heading tracking-tight">
            Invest in your <GradientText variant="rainbow">future</GradientText>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <GlassCard
                tilt
                className={`p-8 h-full flex flex-col justify-between relative ${
                  plan.highlighted ? 'border-indigo-500/50 bg-slate-900/90 shadow-2xl shadow-indigo-500/20' : ''
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-xs mb-6">{plan.description}</p>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-extrabold text-white font-heading">{plan.price}</span>
                    <span className="text-slate-400 text-xs">/{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm text-slate-300">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={ROUTES.dashboard}>
                  <ShimmerButton variant={plan.highlighted ? 'primary' : 'secondary'} className="w-full py-3 text-sm">
                    {plan.cta}
                  </ShimmerButton>
                </Link>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
