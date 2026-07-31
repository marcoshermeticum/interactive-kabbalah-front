'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';

interface OrientationGuideDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrientationGuideDialog({ isOpen, onClose }: OrientationGuideDialogProps) {
  const t = useTranslations('guide');
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Capture the element that triggered the dialog opening
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      // Focus the close button when dialog opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  // Return focus to trigger on close
  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 0);
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Focus trap: keep focus within the dialog
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusableElements = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleFocusTrap);
    return () => document.removeEventListener('keydown', handleFocusTrap);
  }, [isOpen]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Dialog panel */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="orientation-guide-title"
        className="relative z-[71] w-[95%] max-w-lg max-h-[90vh] bg-gray-950/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col mb-16 sm:mb-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 shrink-0">
          <h2
            id="orientation-guide-title"
            className="text-base sm:text-lg font-semibold text-white/90"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('title')}
          </h2>
          <button
            ref={closeButtonRef}
            onClick={handleClose}
            className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content area with scroll */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* Purpose section */}
          <section>
            <h3 className="text-sm font-semibold text-amber-300/90 mb-2">
              ✦ {t('purposeHeading')}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed whitespace-pre-line">
              {t('purpose')}
            </p>
          </section>

          {/* Non-dualistic interpretation section */}
          <section>
            <h3 className="text-sm font-semibold text-amber-300/90 mb-2">
              ☯ {t('interpretationHeading')}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed whitespace-pre-line">
              {t('interpretation')}
            </p>
          </section>

          {/* Pruning metaphor section */}
          <section>
            <h3 className="text-sm font-semibold text-amber-300/90 mb-2">
              🌿 {t('pruningHeading')}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed whitespace-pre-line">
              {t('pruning')}
            </p>
          </section>

          {/* Usage tips section */}
          <section>
            <h3 className="text-sm font-semibold text-amber-300/90 mb-2">
              💡 {t('tipsHeading')}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed whitespace-pre-line">
              {t('tips')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
