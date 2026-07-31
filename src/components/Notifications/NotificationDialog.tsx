'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import type { NotificationEntry } from '@/data/notifications';

interface NotificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationEntry[];
  readIds: Set<string>;
  onMarkRead: (id: string) => void;
  onOpenGuide: () => void;
}

export default function NotificationDialog({
  isOpen,
  onClose,
  notifications,
  readIds,
  onMarkRead,
  onOpenGuide,
}: NotificationDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const t = useTranslations('notifications');
  const ui = useTranslations('ui');

  // Sort notifications by publishedAt descending (most recent first)
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Focus trap and Escape key handling
  useEffect(() => {
    if (!isOpen) return;

    // Store previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus the dialog
    const timer = setTimeout(() => {
      dialogRef.current?.focus();
    }, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      // Return focus to the trigger element
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[900] flex items-center justify-center">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('title')}
        tabIndex={-1}
        className="relative z-[901] w-[95vw] max-w-md max-h-[90vh] sm:max-h-[80vh] sm:w-full bg-gray-950/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-16 sm:mb-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
          <h2
            className="text-sm font-semibold text-white/90"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('title')}
          </h2>
          <button
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition"
            aria-label={ui('close')}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {/* Permanent "Orientation Guide" item */}
          <button
            onClick={onOpenGuide}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-amber-900/20 border border-amber-700/30 hover:bg-amber-900/30 transition text-left min-h-[44px]"
          >
            <span className="text-lg shrink-0" aria-hidden="true">📖</span>
            <div className="min-w-0">
              <span className="block text-sm font-medium text-amber-200">
                {t('guideTitle')}
              </span>
              <span className="block text-[11px] text-amber-300/60 truncate">
                {t('guideDescription')}
              </span>
            </div>
          </button>

          {/* Notification list */}
          {sortedNotifications.map((notification) => {
            const isRead = readIds.has(notification.id);

            return (
              <button
                key={notification.id}
                onClick={() => onMarkRead(notification.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition text-left min-h-[44px] ${
                  isRead ? 'opacity-50' : ''
                }`}
              >
                <span className="w-2 h-2 rounded-full shrink-0" aria-hidden="true">
                  {!isRead && (
                    <span className="block w-2 h-2 rounded-full bg-amber-500" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block text-sm text-white/90 truncate">
                    {t(notification.titleKey.replace('notifications.', ''))}
                  </span>
                  <span className="block text-[11px] text-white/50 truncate">
                    {t(notification.descriptionKey.replace('notifications.', ''))}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
