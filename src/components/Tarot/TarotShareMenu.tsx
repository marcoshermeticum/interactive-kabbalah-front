'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { copyText } from '@/lib/clipboard';

interface Props {
  /** Localized card name, used as the share title. */
  cardName: string;
  /** Public path to the card artwork. */
  image: string;
}

/**
 * Share control for a tarot card single.
 *
 * The icon opens a small menu with two actions:
 *  - Share link: opens the native share sheet when available (mobile/HTTPS),
 *    otherwise copies the current page URL.
 *  - Download image: saves the artwork using the browser's download flow.
 */
export default function TarotShareMenu({ cardName, image }: Props) {
  const t = useTranslations('tarot');
  const [open, setOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setLinkCopied(false);
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
      resetTimer.current = null;
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) close();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const handleShare = async () => {
    const url = window.location.href;

    // Native share sheet — available on mobile and in secure contexts.
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: cardName, url });
        close();
        return;
      } catch (err) {
        // The user dismissed the sheet: keep everything as it is.
        if ((err as { name?: string } | null)?.name === 'AbortError') return;
        // Any other failure falls back to copying the link.
      }
    }

    if (await copyText(url)) {
      setLinkCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setLinkCopied(false), 2200);
    }
  };

  const handleDownload = () => {
    const fileName = image.split('/').pop() || 'tarot-card.jpg';
    const link = document.createElement('a');
    link.href = image;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    close();
  };

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('share')}
        title={t('share')}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition hover:opacity-80"
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          color: 'var(--text-secondary)',
        }}
      >
        <ShareIcon />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={t('share')}
          className="absolute right-0 top-full z-40 mt-2 w-56 overflow-hidden rounded-xl text-sm"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleShare}
            className="flex w-full cursor-pointer items-center gap-2.5 px-4 py-3 text-left transition hover:opacity-80"
            style={{ color: 'var(--text-secondary)' }}
          >
            {linkCopied ? <CheckIcon /> : <LinkIcon />}
            <span aria-live="polite">
              {linkCopied ? t('linkCopied') : t('shareLink')}
            </span>
          </button>

          <div className="h-px w-full" style={{ background: 'var(--border)' }} aria-hidden />

          <button
            type="button"
            role="menuitem"
            onClick={handleDownload}
            className="flex w-full cursor-pointer items-center gap-2.5 px-4 py-3 text-left transition hover:opacity-80"
            style={{ color: 'var(--text-secondary)' }}
          >
            <DownloadIcon />
            <span>{t('downloadImage')}</span>
          </button>
        </div>
      )}
    </div>
  );
}

function ShareIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.6" y1="10.6" x2="15.4" y2="6.4" />
      <line x1="8.6" y1="13.4" x2="15.4" y2="17.6" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      <path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.2" />
      <path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.2-1.2" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}
