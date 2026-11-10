'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { TarotCard } from '@/data/tarot/types';

interface Props {
  card: TarotCard;
}

/**
 * Interactive Tarot card: raster artwork with a transparent SVG overlay of
 * polygonal regions. Hovering/focusing or clicking a region updates a fixed
 * description panel beside the card (below it on mobile), so the explanation
 * never overlaps the artwork and never gets clipped.
 */
export default function InteractiveTarotCard({ card }: Props) {
  const t = useTranslations('tarot');
  const [showRegions, setShowRegions] = useState(false);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const { width, height } = card.viewBox;

  // Grace period so quickly leaving a region doesn't blank the panel while a
  // pinned selection is absent.
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setHover = useCallback((id: string) => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
    setHoverId(id);
  }, []);

  const scheduleClear = useCallback(() => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
    clearTimer.current = setTimeout(() => setHoverId(null), 150);
  }, []);

  useEffect(() => {
    return () => {
      if (clearTimer.current) clearTimeout(clearTimer.current);
    };
  }, []);

  // The region shown in the panel: hover takes priority, otherwise the pinned one.
  const shownId = hoverId ?? pinnedId;
  const shownRegion = card.regions.find((r) => r.id === shownId) ?? null;

  return (
    <div className="flex w-full flex-col items-stretch gap-6 md:flex-row md:items-start md:justify-center">
      {/* Artwork + interactive overlay */}
      <div
        className="relative mx-auto w-full max-w-[420px] rounded-xl shadow-2xl"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Image
          src={card.image}
          alt={t(`${card.id}.name`)}
          fill
          priority
          sizes="(max-width: 480px) 100vw, 420px"
          className="rounded-xl object-contain"
        />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >
          {card.regions.map((region) => {
            const isActive =
              region.id === hoverId || region.id === pinnedId || showRegions;
            return (
              <polygon
                key={region.id}
                points={region.points}
                tabIndex={0}
                role="button"
                aria-label={t(`${region.i18nKey}.title`)}
                aria-pressed={region.id === pinnedId}
                onMouseEnter={() => setHover(region.id)}
                onMouseMove={() => setHover(region.id)}
                onMouseLeave={scheduleClear}
                onFocus={() => setHover(region.id)}
                onBlur={scheduleClear}
                onClick={(e) => {
                  e.stopPropagation();
                  setPinnedId((id) => (id === region.id ? null : region.id));
                }}
                style={{
                  cursor: 'pointer',
                  fill: isActive
                    ? 'rgba(250, 204, 21, 0.22)'
                    : 'rgba(255, 255, 255, 0.08)',
                  stroke: isActive
                    ? 'rgba(250, 204, 21, 0.95)'
                    : 'rgba(230, 230, 230, 0.8)',
                  strokeWidth: isActive ? 0.7 : 0.55,
                  strokeDasharray: isActive ? 'none' : '2.5 2',
                  transition: 'fill 0.12s ease, stroke 0.12s ease',
                  outline: 'none',
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* Fixed description panel */}
      <aside
        className="w-full rounded-xl border p-5 md:sticky md:top-6 md:max-w-[340px]"
        style={{
          background: 'var(--bg-secondary)',
          borderColor: 'var(--border)',
          color: 'var(--text-primary)',
          minHeight: '12rem',
        }}
        aria-live="polite"
      >
        {shownRegion ? (
          <div>
            <p className="text-lg font-bold" style={{ color: 'var(--gold)' }}>
              {shownRegion.icon ? `${shownRegion.icon} ` : ''}
              {t(`${shownRegion.i18nKey}.title`)}
            </p>
            <p
              className="mt-2 leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              {t(`${shownRegion.i18nKey}.description`)}
            </p>
          </div>
        ) : (
          <div className="flex h-full flex-col items-start justify-center">
            <p className="text-base font-semibold">{t('panelEmptyTitle')}</p>
            <p className="mt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {t('panelEmptyHint')}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowRegions((v) => !v)}
          className="mt-5 rounded-full border px-4 py-2 text-sm transition hover:opacity-80"
          style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
        >
          {showRegions ? t('hideRegions') : t('showRegions')}
        </button>
      </aside>
    </div>
  );
}
