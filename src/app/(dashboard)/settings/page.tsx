'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard, ShimmerButton } from '@/components/atoms';
import { mockUser } from '@/services/mock-data';
import { User, Bell, Shield, Palette, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const router = useRouter();

  const handleSignOut = () => {
    toast.success('Signed out successfully');
    router.push('/sign-in');
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Profile Section */}
      <GlassCard className="p-6">
        <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2 font-heading">
          <User className="h-4 w-4 text-indigo-400" /> Profile Settings
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                defaultValue={mockUser.name}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Email</label>
              <input
                type="email"
                defaultValue={mockUser.email}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">University</label>
              <input
                type="text"
                defaultValue={mockUser.university}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Major</label>
              <input
                type="text"
                defaultValue={mockUser.major}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2 text-sm text-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Notification Toggles */}
      <GlassCard className="p-6">
        <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2 font-heading">
          <Bell className="h-4 w-4 text-indigo-400" /> Notification Preferences
        </h3>

        <div className="space-y-3">
          {[
            { title: 'Email Deadline Reminders', desc: 'Receive automated notifications when deadlines approach.' },
            { title: 'AI Career Insights', desc: 'Weekly AI-generated tips to boost your career score.' },
            { title: 'Urgency-Aware Frequency', desc: 'Automatically increase reminder frequency as deadlines near.' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div>
                <div className="text-sm font-semibold text-white">{item.title}</div>
                <div className="text-xs text-slate-400">{item.desc}</div>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-indigo-500" />
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Account Session / Sign Out Section */}
      <GlassCard className="p-6 border-rose-500/20 bg-rose-950/10">
        <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2 font-heading text-rose-400">
          <Shield className="h-4 w-4" /> Account Session
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Sign out of your OpportunityOS session on this device.
        </p>

        <button
          onClick={handleSignOut}
          className="px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/30 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </GlassCard>
    </div>
  );
}
