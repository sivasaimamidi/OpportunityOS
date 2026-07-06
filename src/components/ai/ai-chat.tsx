'use client';

import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { GlassCard, OrbitingDots } from '@/components/atoms';
import { useAIChatStore } from '@/providers/store-provider';

export function AIChat() {
  const messages = useAIChatStore((s) => s.messages);
  const addMessage = useAIChatStore((s) => s.addMessage);
  const isLoading = useAIChatStore((s) => s.isLoading);
  const setLoading = useAIChatStore((s) => s.setLoading);

  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');

    addMessage({ role: 'user', content: userMsg });
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      addMessage({
        role: 'assistant',
        content: `Based on your profile and career score (74/100), here is my analysis regarding "${userMsg}":\n\n1. Prioritize Google Summer of Code since it has a 92% impact factor on your resume.\n2. Dedicate at least 3 hours today to your DSA Assignment before the deadline in 2 days.\n3. Make sure to complete practice exams for your AWS certification.`,
      });
    }, 1500);
  };

  return (
    <GlassCard className="h-[calc(100vh-140px)] flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-4">
        <OrbitingDots size="sm" />
        <div>
          <h2 className="font-bold text-white text-base">Gemini Career Mentor AI</h2>
          <p className="text-xs text-slate-400">Personalized career guidance & strategy</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-indigo-400'}`}>
              {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white/5 border border-white/10 text-slate-200'}`}>
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <Bot className="h-4 w-4 animate-spin text-indigo-400" /> AI Advisor is thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="pt-4 border-t border-white/10 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your AI Career Advisor anything..."
          className="flex-1 rounded-xl bg-slate-950 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </GlassCard>
  );
}
