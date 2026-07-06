'use client';

import { createContext, useRef, useContext, type ReactNode } from 'react';
import { useStore } from 'zustand';
import {
  createAppStore,
  createOpportunityStore,
  createNotificationStore,
  createAIChatStore,
  createSettingsStore,
  type AppState,
  type OpportunityState,
  type NotificationState,
  type AIChatState,
  type SettingsState,
} from '@/stores';

// ---- Types ----

type AppStoreType = ReturnType<typeof createAppStore>;
type OpportunityStoreType = ReturnType<typeof createOpportunityStore>;
type NotificationStoreType = ReturnType<typeof createNotificationStore>;
type AIChatStoreType = ReturnType<typeof createAIChatStore>;
type SettingsStoreType = ReturnType<typeof createSettingsStore>;

// ---- Contexts ----

const AppStoreContext = createContext<AppStoreType | null>(null);
const OpportunityStoreContext = createContext<OpportunityStoreType | null>(null);
const NotificationStoreContext = createContext<NotificationStoreType | null>(null);
const AIChatStoreContext = createContext<AIChatStoreType | null>(null);
const SettingsStoreContext = createContext<SettingsStoreType | null>(null);

// ---- Combined Provider ----

export function StoreProvider({ children }: { children: ReactNode }) {
  const appStoreRef = useRef<AppStoreType>(null);
  const opportunityStoreRef = useRef<OpportunityStoreType>(null);
  const notificationStoreRef = useRef<NotificationStoreType>(null);
  const aiChatStoreRef = useRef<AIChatStoreType>(null);
  const settingsStoreRef = useRef<SettingsStoreType>(null);

  if (!appStoreRef.current) appStoreRef.current = createAppStore();
  if (!opportunityStoreRef.current) opportunityStoreRef.current = createOpportunityStore();
  if (!notificationStoreRef.current) notificationStoreRef.current = createNotificationStore();
  if (!aiChatStoreRef.current) aiChatStoreRef.current = createAIChatStore();
  if (!settingsStoreRef.current) settingsStoreRef.current = createSettingsStore();

  return (
    <AppStoreContext.Provider value={appStoreRef.current}>
      <OpportunityStoreContext.Provider value={opportunityStoreRef.current}>
        <NotificationStoreContext.Provider value={notificationStoreRef.current}>
          <AIChatStoreContext.Provider value={aiChatStoreRef.current}>
            <SettingsStoreContext.Provider value={settingsStoreRef.current}>
              {children}
            </SettingsStoreContext.Provider>
          </AIChatStoreContext.Provider>
        </NotificationStoreContext.Provider>
      </OpportunityStoreContext.Provider>
    </AppStoreContext.Provider>
  );
}

// ---- Hooks ----

function useStoreContext<S, T>(context: React.Context<S | null>, selector: (state: S extends { getState: () => infer R } ? R : never) => T, name: string): T {
  const store = useContext(context);
  if (!store) throw new Error(`use${name} must be used within StoreProvider`);
  return useStore(store as never, selector as never) as T;
}

export function useAppStore<T>(selector: (state: AppState) => T): T {
  return useStoreContext(AppStoreContext, selector as never, 'AppStore') as T;
}

export function useOpportunityStore<T>(selector: (state: OpportunityState) => T): T {
  return useStoreContext(OpportunityStoreContext, selector as never, 'OpportunityStore') as T;
}

export function useNotificationStore<T>(selector: (state: NotificationState) => T): T {
  return useStoreContext(NotificationStoreContext, selector as never, 'NotificationStore') as T;
}

export function useAIChatStore<T>(selector: (state: AIChatState) => T): T {
  return useStoreContext(AIChatStoreContext, selector as never, 'AIChatStore') as T;
}

export function useSettingsStore<T>(selector: (state: SettingsState) => T): T {
  return useStoreContext(SettingsStoreContext, selector as never, 'SettingsStore') as T;
}
