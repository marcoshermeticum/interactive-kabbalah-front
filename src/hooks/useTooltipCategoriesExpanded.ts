'use client';

import { usePersistedState } from './usePersistedState';

/**
 * Hook to control whether tooltip categories (Archetypes, Minor Arcana, Correspondences)
 * start expanded or collapsed by default.
 * 
 * Persisted in localStorage. Default: true (expanded).
 * Toggle available in Settings popover.
 */
export function useTooltipCategoriesExpanded() {
  return usePersistedState<boolean>('tooltipCategoriesExpanded', true);
}
