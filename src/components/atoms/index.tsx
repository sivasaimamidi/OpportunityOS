'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

// ---- GlassCard ----
export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: boolean;
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className,
  tilt = false,
  glow = false,
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSpotlightPos({ x, y, opacity: 1 });

    if (tilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    }
  };

  const handleMouseLeave = () => {
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
    if (tilt) {
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: tilt ? 'transform 0.15s ease-out' : undefined }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-6 transition-all duration-300',
        hoverEffect && 'hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10',
        glow && 'border-indigo-500/30 shadow-lg shadow-indigo-500/10',
        className
      )}
      {...props}
    >
      {/* Mouse spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: spotlightPos.opacity,
          background: `radial-gradient(600px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(99, 102, 241, 0.12), transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ---- GradientText ----
export function GradientText({
  children,
  className,
  variant = 'primary',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'accent' | 'rainbow' | 'emerald';
}) {
  const gradients = {
    primary: 'from-indigo-400 via-violet-400 to-purple-400',
    accent: 'from-violet-400 via-fuchsia-400 to-pink-400',
    rainbow: 'from-amber-400 via-rose-400 to-indigo-400',
    emerald: 'from-emerald-400 via-teal-400 to-cyan-400',
  };

  return (
    <span
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent inline-block',
        gradients[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// ---- ShimmerButton ----
export function ShimmerButton({
  children,
  className,
  onClick,
  variant = 'primary',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-6 py-3 font-medium transition-all duration-300 active:scale-95',
        variant === 'primary' &&
          'bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:brightness-110',
        variant === 'secondary' &&
          'bg-slate-800/80 text-slate-200 border border-slate-700 hover:bg-slate-700/80 hover:border-slate-600',
        variant === 'outline' &&
          'bg-transparent text-slate-200 border border-indigo-500/30 hover:bg-indigo-500/10 hover:border-indigo-500/60',
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      )}
    </button>
  );
}

// ---- StatusBadge ----
export function StatusBadge({ urgency }: { urgency?: string }) {
  const styles: Record<string, { label: string; bg: string; text: string; dot: string }> = {
    relaxed: { label: '30+ Days', bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400' },
    upcoming: { label: '15 Days', bg: 'bg-amber-500/10 border-amber-500/20', text: 'text-amber-400', dot: 'bg-amber-400' },
    soon: { label: '7 Days', bg: 'bg-orange-500/10 border-orange-500/20', text: 'text-orange-400', dot: 'bg-orange-400' },
    urgent: { label: '3 Days', bg: 'bg-rose-500/10 border-rose-500/20', text: 'text-rose-400', dot: 'bg-rose-400' },
    critical: { label: '24 Hours', bg: 'bg-red-500/20 border-red-500/40', text: 'text-red-300', dot: 'bg-red-500 animate-ping' },
  };

  const current = styles[urgency || 'relaxed'] || styles.relaxed;

  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold', current.bg, current.text)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', current.dot)} />
      {current.label}
    </span>
  );
}

// ---- OrbitingDots AI Indicator ----
export function OrbitingDots({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'h-6 w-6', md: 'h-10 w-10', lg: 'h-16 w-16' };
  return (
    <div className={cn('relative flex items-center justify-center', sizes[size])}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/40"
      />
      <motion.div
        animate={{ scale: [0.85, 1.15, 0.85] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="h-3/5 w-3/5 rounded-full bg-gradient-to-tr from-indigo-500 via-violet-500 to-pink-500 shadow-lg shadow-indigo-500/50"
      />
    </div>
  );
}
