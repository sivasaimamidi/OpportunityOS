'use client';

import React from 'react';
import { CheckCircle2, Clock, Flame } from 'lucide-react';
import { GlassCard, StatusBadge } from '@/components/atoms';
import { useOpportunityStore } from '@/providers/store-provider';

export function TodaysFocusWidget() {
  const opportunities = useOpportunityStore((s) => s.opportunities);
  const toggleChecklistItem = useOpportunityStore((s) => s.toggleChecklistItem);

  // Filter tasks due today (within 24 hours / daysUntilDeadline <= 1)
  const todayTasks = [...opportunities]
    .filter((o) => o.deadline && o.status !== 'completed' && o.status !== 'missed' && o.daysUntilDeadline !== undefined && o.daysUntilDeadline <= 1)
    .sort((a, b) => (a.daysUntilDeadline || 0) - (b.daysUntilDeadline || 0));

  return (
    <GlassCard className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
        <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
          <Flame className="h-4 w-4 fill-rose-500 text-rose-500" /> Today's Priority Focus
        </span>
        <span className="text-[10px] text-slate-400 font-mono">
          {todayTasks.length} {todayTasks.length === 1 ? 'Task' : 'Tasks'} Due Today
        </span>
      </div>

      {todayTasks.length > 0 ? (
        <div className="space-y-5 flex-1 overflow-y-auto no-scrollbar max-h-[350px]">
          {todayTasks.map((task) => (
            <div key={task.id} className="space-y-2 pb-4 border-b border-white/5 last:border-0 last:pb-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-white text-sm truncate">{task.title}</h3>
                <StatusBadge urgency={task.urgency} days={task.daysUntilDeadline} deadline={task.deadline} />
              </div>
              <p className="text-[11px] text-slate-400">{task.organization || 'Self-managed'} • {task.type.replace('-', ' ')}</p>

              {task.checklist && task.checklist.length > 0 ? (
                <div className="space-y-1.5 mt-2">
                  {task.checklist.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(task.id, item.id)}
                      className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-colors"
                    >
                      <div className={`h-3.5 w-3.5 rounded border flex items-center justify-center shrink-0 ${item.completed ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-600'}`}>
                        {item.completed && <CheckCircle2 className="h-3 w-3" />}
                      </div>
                      <span className={`text-xs truncate ${item.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-slate-500">No specific checklist subtasks.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-10 gap-2">
          <span className="text-2xl">🎉</span>
          <h4 className="text-sm font-bold text-white">All Caught Up for Today!</h4>
          <p className="text-[11px] text-slate-400 max-w-[80%]">No urgent tasks are due today. Check the upcoming deadlines section below to plan ahead!</p>
        </div>
      )}
    </GlassCard>
  );
}
