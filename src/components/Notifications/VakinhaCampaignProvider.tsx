'use client';

import { createContext, useContext, type ReactNode } from 'react';
import VakinhaCampaignDialog from '@/components/Notifications/VakinhaCampaignDialog';
import { useVakinhaCampaign } from '@/hooks/useVakinhaCampaign';

type VakinhaCampaignContextValue = {
  openDialog: () => void;
};

const VakinhaCampaignContext = createContext<VakinhaCampaignContextValue | null>(null);

export function VakinhaCampaignProvider({ children }: { children: ReactNode }) {
  const { isDialogOpen, openDialog, closeDialog } = useVakinhaCampaign();

  return (
    <VakinhaCampaignContext.Provider value={{ openDialog }}>
      {children}
      <VakinhaCampaignDialog isOpen={isDialogOpen} onClose={closeDialog} />
    </VakinhaCampaignContext.Provider>
  );
}

export function useVakinhaCampaignDialog() {
  const context = useContext(VakinhaCampaignContext);

  if (!context) {
    throw new Error('useVakinhaCampaignDialog must be used inside VakinhaCampaignProvider');
  }

  return context;
}
