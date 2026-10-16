'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';

type NavigationLoadingContextValue = {
  showLoading: () => void;
};

const NavigationLoadingContext = createContext<NavigationLoadingContextValue | null>(null);

export function NavigationLoadingProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('ui');
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = useCallback(() => setIsLoading(true), []);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname, locale]);

  return (
    <NavigationLoadingContext.Provider value={{ showLoading }}>
      {children}
      {isLoading && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[1000] flex items-center justify-center"
          style={{ background: 'color-mix(in srgb, var(--bg-primary) 82%, transparent)' }}
        >
          <div
            className="flex items-center gap-3 rounded-full px-6 py-4 shadow-xl"
            style={{ background: 'var(--header-bg)', color: 'var(--header-text)' }}
          >
            <span
              aria-hidden="true"
              className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
            <span>{t('loading')}</span>
          </div>
        </div>
      )}
    </NavigationLoadingContext.Provider>
  );
}

export function useNavigationLoading() {
  const context = useContext(NavigationLoadingContext);

  if (!context) {
    throw new Error('useNavigationLoading must be used inside NavigationLoadingProvider');
  }

  return context.showLoading;
}
