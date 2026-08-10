'use client';

import { useState, useEffect, useCallback } from 'react';
import { safeGetItem, safeSetItem } from '@/hooks/useNotificationState';

// Campaign constants
export const VAKINHA_CAMPAIGN_URL =
  'https://www.vakinha.com.br/vaquinha/interactive-kabbalah-redesign-e-plataformizacao';
export const VAKINHA_PIX_KEY = '6257640@vakinha.com.br';
export const STORAGE_KEY_DISMISSED = 'vakinha-campaign-dismissed';

export interface UseVakinhaCampaignReturn {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

/**
 * Hook to manage the Vakinha campaign dialog auto-show logic and localStorage persistence.
 *
 * - On mount, checks localStorage for the dismissal flag.
 *   If not dismissed, auto-opens the dialog.
 * - closeDialog(): closes the dialog and ALWAYS persists dismissal to localStorage.
 * - openDialog(): opens the dialog regardless of localStorage state (for notification re-open).
 *
 * Gracefully handles localStorage unavailability — defaults to showing the dialog,
 * never throws.
 */
export function useVakinhaCampaign(): UseVakinhaCampaignReturn {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // On mount: check localStorage and auto-show if not dismissed
  useEffect(() => {
    const dismissed = safeGetItem(STORAGE_KEY_DISMISSED);
    if (dismissed !== 'true') {
      setIsDialogOpen(true);
    }
  }, []);

  // Open dialog manually (bypasses localStorage check — used by notification click)
  const openDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  // Close dialog and always persist dismissal
  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    safeSetItem(STORAGE_KEY_DISMISSED, 'true');
  }, []);

  return {
    isDialogOpen,
    openDialog,
    closeDialog,
  };
}
