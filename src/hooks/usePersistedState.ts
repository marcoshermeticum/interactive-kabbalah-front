'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_PREFIX = 'kabbalah-';

/**
 * Hook that persists state to localStorage.
 * Hydrates from storage after mount (SSR-safe).
 * Falls back to defaultValue if localStorage is unavailable.
 */
export function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(defaultValue);
  const hydrated = useRef(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_PREFIX + key);
      if (stored !== null) {
        const parsed = JSON.parse(stored) as T;
        setState(parsed);
      }
    } catch {
      // ignore — use default
    }
    hydrated.current = true;
  }, [key]);

  // Persist to localStorage on change (skip initial render)
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(state));
    } catch {
      // silently fail
    }
  }, [key, state]);

  const setPersistedState = useCallback((value: T | ((prev: T) => T)) => {
    setState(value);
  }, []);

  return [state, setPersistedState];
}
