'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Menu, X, ArrowRight, Bot } from 'lucide-react';
import { APP_NAME, ROUTES } from '@/lib/constants';
import { ShimmerButton } from '@/components/atoms';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 backdrop-blur-xl bg-slate-950/80 border-b border-white/10 shadow-2xl' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-indigo-400" />
            </div>
          </div>
          <span className="font-bold text-xl tracking-tight text-white font-heading">
            {APP_NAME} <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How it Works</a>
          <a href="#demo" className="hover:text-indigo-400 transition-colors">Live Demo</a>
          <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href={ROUTES.dashboard} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href={ROUTES.dashboard}>
            <ShimmerButton className="text-xs py-2.5 px-4">
              Launch App <ArrowRight className="h-3.5 w-3.5" />
            </ShimmerButton>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-300 hover:text-white">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-white/10 bg-slate-950/95 backdrop-blur-2xl px-6 py-6"
          >
            <div className="flex flex-col gap-4 text-slate-200 font-medium">
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
              <a href="#demo" onClick={() => setMobileMenuOpen(false)}>Live Demo</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <Link href={ROUTES.dashboard} onClick={() => setMobileMenuOpen(false)} className="pt-2 border-t border-slate-800">
                Sign In
              </Link>
              <Link href={ROUTES.dashboard} onClick={() => setMobileMenuOpen(false)}>
                <ShimmerButton className="w-full text-center py-3">Get Started Free</ShimmerButton>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
