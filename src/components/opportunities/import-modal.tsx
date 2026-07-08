'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Link2, Check, Bot, AlertCircle, Plus, Trash2, CalendarDays } from 'lucide-react';
import { useAppStore, useOpportunityStore } from '@/providers/store-provider';
import { GlassCard, ShimmerButton } from '@/components/atoms';
import { mockAIAnalysis } from '@/services/mock-data';
import { OPPORTUNITY_TYPES, OPPORTUNITY_TYPE_LABELS } from '@/types';
import { toast } from 'sonner';

export function ImportModal() {
  const importModalOpen = useAppStore((s) => s.importModalOpen);
  const setImportModalOpen = useAppStore((s) => s.setImportModalOpen);
  const addOpportunity = useOpportunityStore((s) => s.addOpportunity);

  // Tab: 'url' | 'manual'
  const [activeTab, setActiveTab] = useState<'url' | 'manual'>('url');

  // URL Import State
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Manual Creation State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<string>('hackathon');
  const [customType, setCustomType] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('23:59');
  
  // Checklist Items State
  const [checklistItems, setChecklistItems] = useState<string[]>([]);
  const [currentChecklistItem, setCurrentChecklistItem] = useState('');

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
      toast.success('Successfully imported opportunity via URL!');
    }, 2000);
  };

  const calculateGenuineStats = (taskType: string, deadlineDate: string) => {
    // Career Impact based on type prestige
    let careerScore = 50; // default
    if (taskType === 'internship') careerScore = 90;
    else if (taskType === 'research') careerScore = 85;
    else if (taskType === 'scholarship') careerScore = 80;
    else if (taskType === 'certification') careerScore = 75;
    else if (taskType === 'hackathon' || taskType === 'competition') careerScore = 70;
    else if (taskType === 'coding-contest') careerScore = 60;
    else if (taskType === 'campus-event') careerScore = 40;
    else if (taskType === 'assignment') careerScore = 30;

    // Add minor random fluctuation for variety (+/- 3 pts)
    careerScore = Math.min(100, Math.max(10, careerScore + Math.floor(Math.random() * 7) - 3));

    // Priority Score based on deadline urgency
    let priorityScore = 50;
    if (deadlineDate) {
      const daysLeft = Math.ceil((new Date(deadlineDate).getTime() - Date.now()) / 86400000);
      if (daysLeft <= 0) priorityScore = 99;
      else if (daysLeft <= 3) priorityScore = 95;
      else if (daysLeft <= 7) priorityScore = 85;
      else if (daysLeft <= 15) priorityScore = 70;
      else if (daysLeft <= 30) priorityScore = 50;
      else priorityScore = 30;
    }
    // Factor in prestige of type into priority
    if (taskType === 'internship' || taskType === 'scholarship') {
      priorityScore = Math.min(100, priorityScore + 10);
    }
    priorityScore = Math.min(100, Math.max(10, priorityScore + Math.floor(Math.random() * 7) - 3));

    return { careerScore, priorityScore };
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Please enter a task name.');
      return;
    }

    const finalType = type === 'other' ? (customType.trim() || 'Other') : type;
    const { careerScore, priorityScore } = calculateGenuineStats(finalType, deadline);

    // Format checklist items
    const finalChecklist = [...checklistItems];
    if (currentChecklistItem.trim() && !finalChecklist.includes(currentChecklistItem.trim())) {
      finalChecklist.push(currentChecklistItem.trim());
    }

    const formattedChecklist = finalChecklist.map((text, idx) => ({
      id: `manual-c-${Date.now()}-${idx}`,
      text,
      completed: false,
    }));

    const finalDeadline = deadline 
      ? new Date(`${deadline}T${deadlineTime || '23:59'}:00`).toISOString()
      : undefined;

    // Add opportunity
    addOpportunity({
      title: title.trim(),
      type: finalType as any,
      status: 'in-progress',
      description: description.trim() || 'Custom manually created task.',
      deadline: finalDeadline,
      priorityScore,
      careerScore,
      progress: 0,
      checklist: formattedChecklist,
      tags: ['manual-task'],
      attachments: [],
    });

    setCompleted(true);
    toast.success('Successfully created custom task!');
  };

  const addChecklistItem = () => {
    if (currentChecklistItem.trim() && !checklistItems.includes(currentChecklistItem.trim())) {
      setChecklistItems([...checklistItems, currentChecklistItem.trim()]);
      setCurrentChecklistItem('');
    }
  };

  const removeChecklistItem = (idx: number) => {
    setChecklistItems(checklistItems.filter((_, i) => i !== idx));
  };

  const handleClose = () => {
    setImportModalOpen(false);
    setCompleted(false);
    setAnalyzing(false);
    setUrl('');
    setTitle('');
    setType('hackathon');
    setCustomType('');
    setDescription('');
    setDeadline('');
    setDeadlineTime('23:59');
    setChecklistItems([]);
    setCurrentChecklistItem('');
  };

  return (
    <div 
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md cursor-pointer"
    >
      <motion.div 
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.95 }} 
        className="w-full max-w-lg cursor-default"
      >
        <GlassCard className="p-6 border-indigo-500/30 bg-slate-900/95 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-white text-base">Add Opportunity / Task</h3>
            </div>
            <button onClick={handleClose} className="text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tab Selection */}
          {!completed && !analyzing && (
            <div className="flex items-center gap-1 bg-slate-950 p-1 border border-white/5 rounded-xl mb-5">
              <button
                onClick={() => setActiveTab('url')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'url' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Smart URL Import
              </button>
              <button
                onClick={() => setActiveTab('manual')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'manual' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Manual Task Creation
              </button>
            </div>
          )}

          {/* Tab Content: URL Import */}
          {activeTab === 'url' && !completed && (
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
          )}

          {/* Tab Content: Manual Creation */}
          {activeTab === 'manual' && !completed && (
            <form onSubmit={handleManualSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 no-scrollbar">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Task / Opportunity Name</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Prepare Google STEP proposal, AWS certification prep"
                  required
                  className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Type Select */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Category</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2.5 text-xs text-slate-300 focus:outline-none"
                  >
                    {OPPORTUNITY_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {OPPORTUNITY_TYPE_LABELS[t]}
                      </option>
                    ))}
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Deadline Date */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Deadline Date</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-xs text-slate-300 focus:outline-none"
                  />
                </div>

                {/* Deadline Time */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Deadline Time</label>
                  <input
                    type="time"
                    value={deadlineTime}
                    onChange={(e) => setDeadlineTime(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-xs text-slate-300 focus:outline-none"
                  />
                </div>
              </div>

              {/* Custom Type Input (when 'other' is selected) */}
              {type === 'other' && (
                <div className="animate-fade-in">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Custom Category</label>
                  <input
                    type="text"
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value)}
                    placeholder=""
                    className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize what this task entails..."
                  rows={2}
                  className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none font-sans"
                />
              </div>

              {/* Checklist Subtasks Builder */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Checklist / Subtasks</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentChecklistItem}
                    onChange={(e) => setCurrentChecklistItem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addChecklistItem();
                      }
                    }}
                    placeholder="Add a checklist item..."
                    className="flex-1 rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={addChecklistItem}
                    className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* List of subtasks */}
                {checklistItems.length > 0 && (
                  <div className="mt-2.5 space-y-1.5 max-h-[15vh] overflow-y-auto">
                    {checklistItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-white/5 animate-fade-in">
                        <span className="text-[11px] text-slate-300 truncate max-w-[85%] font-sans">{item}</span>
                        <button
                          type="button"
                          onClick={() => removeChecklistItem(idx)}
                          className="text-slate-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <ShimmerButton type="submit" className="w-full py-3 text-sm mt-2">
                Create Custom Task
              </ShimmerButton>
            </form>
          )}

          {/* Success screen */}
          {completed && (
            <div className="text-center py-6 space-y-4 animate-fade-in">
              <div className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-white text-lg">Opportunity Successfully Saved!</h4>
              <p className="text-xs text-slate-400">Your task has been added to your board with genuine priority and career impact values.</p>
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
