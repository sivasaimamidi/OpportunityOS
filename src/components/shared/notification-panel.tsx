'use client';

import React from 'react';
import { Bell, Clock, Sparkles, Trophy, Settings, X, CheckCheck, Trash2 } from 'lucide-react';
import { useAppStore, useNotificationStore } from '@/providers/store-provider';
import { useOpportunityStore } from '@/providers/store-provider';
import { useRouter } from 'next/navigation';
import { formatRelativeDate } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

export function NotificationPanel() {
  const router = useRouter();
  const notificationPanelOpen = useAppStore((s) => s.notificationPanelOpen);
  const setNotificationPanelOpen = useAppStore((s) => s.setNotificationPanelOpen);

  const notifications = useNotificationStore((s) => s.notifications);
  const markAsRead = useNotificationStore((s) => s.markAsRead);
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead);
  const removeNotification = useNotificationStore((s) => s.removeNotification);
  
  const selectOpportunity = useOpportunityStore((s) => s.selectOpportunity);

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    markAsRead(notification.id);
    setNotificationPanelOpen(false);

    if (notification.opportunityId) {
      selectOpportunity(notification.opportunityId);
      router.push('/opportunities');
      toast.info(`Jumping to: ${notification.title}`);
    } else if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return <Clock className="h-4 w-4 text-rose-400" />;
      case 'reminder':
        return <Bell className="h-4 w-4 text-amber-400" />;
      case 'achievement':
        return <Trophy className="h-4 w-4 text-emerald-400 fill-emerald-500/10" />;
      case 'ai-insight':
        return <Sparkles className="h-4 w-4 text-indigo-400 fill-indigo-500/10" />;
      default:
        return <Settings className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <Sheet open={notificationPanelOpen} onOpenChange={setNotificationPanelOpen}>
      <SheetContent className="w-full sm:max-w-md bg-slate-900 border-l border-white/10 text-slate-100 flex flex-col h-full p-0">
        <SheetHeader className="p-6 border-b border-white/10 flex flex-row items-center justify-between">
          <div>
            <SheetTitle className="text-lg font-bold text-white">Notifications</SheetTitle>
            <SheetDescription className="text-xs text-slate-400">
              Stay updated on your upcoming deadlines and insights
            </SheetDescription>
          </div>
          {notifications.some((n) => !n.read) && (
            <button
              onClick={() => {
                markAllAsRead();
                toast.success('All notifications marked as read');
              }}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
            >
              <CheckCheck className="h-3.5 w-3.5" /> Mark all read
            </button>
          )}
        </SheetHeader>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-500 gap-2">
              <Bell className="h-10 w-10 opacity-30" />
              <p className="text-sm font-medium">All caught up!</p>
              <p className="text-xs text-center px-6">You have no active notifications or reminders at the moment.</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`group relative flex gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                  notification.read
                    ? 'bg-slate-950/20 border-white/5 hover:bg-slate-950/40'
                    : 'bg-indigo-600/5 border-indigo-500/20 hover:bg-indigo-600/10'
                }`}
              >
                {/* Unread indicator dot */}
                {!notification.read && (
                  <span className="absolute top-4 left-4 h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                )}

                {/* Icon wrapper */}
                <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${
                  notification.read ? 'bg-slate-800 text-slate-400' : 'bg-indigo-950/50 border border-indigo-500/20'
                }`}>
                  {getIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className="text-xs font-semibold text-white truncate">{notification.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{notification.message}</p>
                  <span className="text-[10px] text-slate-500 font-mono mt-2 block">
                    {formatRelativeDate(notification.createdAt)}
                  </span>
                </div>

                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNotification(notification.id);
                    toast.success('Notification removed');
                  }}
                  className="opacity-0 group-hover:opacity-100 absolute top-4 right-4 h-7 w-7 rounded-lg hover:bg-rose-500/10 hover:text-rose-400 flex items-center justify-center text-slate-500 transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
