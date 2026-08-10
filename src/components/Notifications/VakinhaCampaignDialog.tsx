'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { VAKINHA_CAMPAIGN_URL, VAKINHA_PIX_KEY } from '@/hooks/useVakinhaCampaign';

interface VakinhaCampaignDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VakinhaCampaignDialog({ isOpen, onClose }: VakinhaCampaignDialogProps) {
  const t = useTranslations('vakinhaCampaign');
  const ui = useTranslations('ui');
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [clipboardUnavailable, setClipboardUnavailable] = useState(false);

  // Track dialog open event
  useEffect(() => {
    if (isOpen) {
      try {
        window.umami?.track('vakinha-dialog-opened');
      } catch {
        // Umami unavailable — no-op
      }
    }
  }, [isOpen]);

  // Focus management: capture trigger, focus close button on open
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  // Restore focus to trigger on close
  const handleDismiss = useCallback(() => {
    try {
      window.umami?.track('vakinha-dialog-dismissed');
    } catch {
      // Umami unavailable — no-op
    }
    onClose();
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 0);
  }, [onClose]);

  // Escape key close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleDismiss();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleDismiss]);

  // Focus trap: cycle Tab through focusable elements within dialog
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

  // Body scroll lock
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

  // Campaign link click handler
  const handleLinkClick = () => {
    try {
      window.umami?.track('vakinha-link-clicked');
    } catch {
      // Umami unavailable — no-op
    }
  };

  // PIX copy handler
  const handleCopyPix = async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(VAKINHA_PIX_KEY);
      setCopied(true);
      try {
        window.umami?.track('vakinha-pix-copied');
      } catch {
        // Umami unavailable — no-op
      }
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setClipboardUnavailable(true);
    }
  };

  // Fallback: select all text in input on click
  const handleFallbackInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).select();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[900] flex items-center justify-center">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Dialog panel */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="vakinha-campaign-title"
        tabIndex={-1}
        className="relative z-[901] w-[95vw] max-w-[440px] max-h-[90vh] overflow-y-auto rounded-[20px] animate-dialog-entry"
        style={{
          background: 'radial-gradient(ellipse at top center, rgba(217, 119, 6, 0.08) 0%, transparent 60%), linear-gradient(180deg, #111118 0%, #0d0d12 100%)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          boxShadow: '0 0 60px rgba(245, 158, 11, 0.08), 0 0 120px rgba(217, 119, 6, 0.04), 0 25px 50px rgba(0, 0, 0, 0.5)',
          padding: '32px 28px',
        }}
      >
        {/* Glow border pseudo-element via extra div */}
        <div
          className="absolute inset-[-1px] rounded-[21px] pointer-events-none opacity-60"
          style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, transparent 50%, rgba(217, 119, 6, 0.15) 100%)',
            zIndex: -1,
          }}
          aria-hidden="true"
        />

        {/* Decorative particles */}
        <div className="absolute inset-0 overflow-hidden rounded-[20px] pointer-events-none" aria-hidden="true">
          <div className="absolute w-[2px] h-[2px] rounded-full bg-amber-500/30 animate-particle" style={{ top: '20%', left: '15%', animationDelay: '0s' }} />
          <div className="absolute w-[2px] h-[2px] rounded-full bg-amber-500/30 animate-particle" style={{ top: '60%', left: '80%', animationDelay: '1.5s' }} />
          <div className="absolute w-[2px] h-[2px] rounded-full bg-amber-500/30 animate-particle" style={{ top: '40%', left: '40%', animationDelay: '3s' }} />
          <div className="absolute w-[2px] h-[2px] rounded-full bg-amber-500/30 animate-particle" style={{ top: '75%', left: '25%', animationDelay: '4.5s' }} />
          <div className="absolute w-[2px] h-[2px] rounded-full bg-amber-500/30 animate-particle" style={{ top: '30%', left: '70%', animationDelay: '2s' }} />
          <div className="absolute w-[2px] h-[2px] rounded-full bg-amber-500/30 animate-particle" style={{ top: '85%', left: '60%', animationDelay: '5s' }} />
        </div>

        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={handleDismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/80 transition-all cursor-pointer z-10"
          aria-label={ui('close')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Content container — flex column with consistent gap */}
        <div className="flex flex-col items-center gap-5">
          {/* Decorative symbol */}
          <img
            src="/mrviniciux.png"
            alt=""
            className="h-12 w-auto"
            style={{ filter: 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.4))' }}
          />

          {/* Heading */}
          <h2
            id="vakinha-campaign-title"
            className="text-[22px] font-semibold text-white/95 leading-tight text-center"
            style={{
              fontFamily: 'var(--font-heading)',
              textShadow: '0 0 30px rgba(245, 158, 11, 0.15)',
            }}
          >
            {t('title')}
          </h2>

          {/* Subtitle */}
          <p className="text-xs font-medium text-amber-500/70 uppercase tracking-[2px]">
            {t('subtitle')}
          </p>

          {/* Message */}
          <p className="text-sm text-white/65 leading-relaxed text-center px-2">
            {t('message')}
          </p>

          {/* CTA Link Button */}
          <a
            href={VAKINHA_CAMPAIGN_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="w-full py-3.5 px-5 rounded-xl text-center text-white text-[15px] font-semibold no-underline cursor-pointer transition-all hover:-translate-y-px"
            style={{
              background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            {t('linkButton')} <span className="ml-1.5">🔗</span>
          </a>

          {/* PIX Section */}
          <div className="w-full rounded-xl p-4 flex flex-col items-center gap-3" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <p className="text-[11px] text-white/40 uppercase tracking-[1px]">
              {t('pixLabel')}
            </p>
            <div className="flex items-center gap-2 w-full">
              {clipboardUnavailable ? (
                <input
                  type="text"
                  readOnly
                  value={VAKINHA_PIX_KEY}
                  onClick={handleFallbackInputClick}
                  className="flex-1 font-mono text-[13px] text-white/80 bg-black/30 border border-white/8 rounded-lg py-2.5 px-3 text-center cursor-text outline-none focus:border-amber-500/40"
                />
              ) : (
                <span className="flex-1 font-mono text-[13px] text-white/80 bg-black/30 border border-white/8 rounded-lg py-2.5 px-3 text-center">
                  {VAKINHA_PIX_KEY}
                </span>
              )}
              {!clipboardUnavailable && (
                <button
                  onClick={handleCopyPix}
                  className={`py-2.5 px-3.5 border rounded-lg text-[13px] font-medium whitespace-nowrap cursor-pointer transition-all ${
                    copied
                      ? 'bg-green-500/15 border-green-500/40 text-green-500'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500/20 hover:border-amber-500/50'
                  }`}
                >
                  {copied ? t('pixCopied') : `📋 ${ui('copy')}`}
                </button>
              )}
            </div>
          </div>

          {/* Thank you text */}
          <p className="text-xs text-white/35">
            {ui('donateThank')}
          </p>
        </div>
      </div>
    </div>
  );
}
