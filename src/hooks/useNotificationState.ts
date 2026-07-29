'use client';

import { useState, useEffect, useCallback } from 'react';
import type { NotificationEntry } from '@/data/notifications';

const STORAGE_KEY_READ = 'kabbalah-notifications-read';
const STORAGE_KEY_GUIDE = 'kabbalah-guide-read';

export interface NotificationState {
  readIds: Set<string>;
  unreadCount: number;
  markAsRead: (id: string) => void;
  isGuideRead: boolean;
  markGuideRead: () => void;
}

/**
 * Safely read from localStorage. Returns null if unavailable or on error.
 */
export function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Safely write to localStorage. Silently fails on error.
 */
export function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // silently ignore — localStorage may be unavailable
  }
}

/**
 * Hook to manage notification read state with localStorage persistence.
 * Falls back to all-unread state if localStorage is unavailable.
 * Uses useEffect to read from localStorage to avoid SSR hydration mismatch.
 */
export function useNotificationState(notifications: NotificationEntry[]): NotificationState {
  const [readIds, setReadIds] = useState<Set<string>>(new Set<string>());
  const [isGuideRead, setIsGuideRead] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate state from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    const stored = safeGetItem(STORAGE_KEY_READ);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReadIds(new Set<string>(parsed));
        }
      } catch {
        // invalid JSON — keep empty
      }
    }

    const guideStored = safeGetItem(STORAGE_KEY_GUIDE);
    if (guideStored === 'true') {
      setIsGuideRead(true);
    }

    setHydrated(true);
  }, []);

  // Sync readIds to localStorage whenever it changes (skip initial render)
  useEffect(() => {
    if (!hydrated) return;
    safeSetItem(STORAGE_KEY_READ, JSON.stringify(Array.from(readIds)));
  }, [readIds, hydrated]);

  const markAsRead = useCallback((id: string) => {
    setReadIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const markGuideRead = useCallback(() => {
    setIsGuideRead(true);
    safeSetItem(STORAGE_KEY_GUIDE, 'true');
  }, []);

  const unreadCount = notifications.filter((n) => !readIds.has(n.id)).length;

  return {
    readIds,
    unreadCount,
    markAsRead,
    isGuideRead,
    markGuideRead,
  };
}
