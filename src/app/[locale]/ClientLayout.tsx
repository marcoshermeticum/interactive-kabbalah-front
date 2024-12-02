'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@/app/config';

import { useTranslations } from 'next-intl';

type ClientLayoutProps = {
  locale: string;
  children: ReactNode;
};

export default function ClientLayout({ locale, children }: ClientLayoutProps) {
  const queryClient = new QueryClient();
  const translate = useTranslations();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
