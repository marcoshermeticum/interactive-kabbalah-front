'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { TarotCard, TarotRegion } from '@/data/tarot/types';

interface Props {
  card: TarotCard;
}

/**
 * Interactive Tarot card.
 *
 * Artwork is a raster image inside a padded frame, with a transparent SVG
 * overlay of polygonal regions. Selecting a region (hover/focus on desktop,
 * tap on mobile) reveals its meaning in a reading panel:
 *  - Desktop (md+): a side panel beside the card, with the symbol pills
 *    listed underneath it.
 *  - Mobile: card → pills → panel, all in normal flow so nothing overlays
 *    the page or collides with fixed banners.
 *
 * A row of symbol "pills" lets users discover and jump between regions by
 * keyboard or touch, independent of pixel-hunting on the image.
 */
export default function InteractiveTarotCard({ card }: Props) {
  const t = useTranslations('tarot');
  const [showRegions, setShowRegions] = useState(false);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { width, height } = card.viewBox;

  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const pillRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

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

  const toggleSelect = useCallback((id: string) => {
    setSelectedId((cur) => (cur === id ? null : id));
  }, []);

  // On mobile the reading panel sits below the fold; bring it into view on tap.
  useEffect(() => {
    if (!selectedId) return;
    if (!window.matchMedia('(max-width: 767px)').matches) return;
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [selectedId]);

  // Panel content: hover wins on desktop; otherwise the selected (tapped) region.
  const shownId = hoverId ?? selectedId;
  const shownRegion = card.regions.find((r) => r.id === shownId) ?? null;

  // Keep the active pill scrolled into view in the horizontal carousel, so a
  // region triggered by clicking the artwork always highlights its pill.
  // Only the mobile carousel scrolls; on desktop the pills wrap in place.
  useEffect(() => {
    if (!shownId) return;
    const el = pillRefs.current.get(shownId);
    if (!el) return;
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: mobile ? 'center' : 'nearest',
    });
  }, [shownId]);

  return (
    <div className="grid w-full items-start justify-center gap-6 md:grid-cols-[minmax(0,26rem)_minmax(0,20rem)] md:gap-8">
      {/* ─── Card column: toggle + framed artwork ─── */}
      <section className="mx-auto w-full max-w-[320px] sm:max-w-[360px] md:col-start-1 md:row-start-1 md:max-w-none">
        <div className="pb-4 flex justify-center">
          <button
            type="button"
            onClick={() => setShowRegions((v) => !v)}
            className="min-h-[44px] rounded-full px-6 py-2 text-sm font-medium transition hover:opacity-80"
            style={{
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
              background: 'var(--bg-secondary)',
            }}
          >
            {showRegions ? `👁 ${t('hideRegions')}` : `✨ ${t('showRegions')}`}
          </button>
        </div>
        <div
          className="rounded-2xl p-2.5 sm:p-3"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div
            className="relative w-full overflow-hidden rounded-xl"
            style={{
              aspectRatio: `${width} / ${height}`,
              border: '1px solid var(--border)',
            }}
          >
            <Image
              src={card.image}
              alt={t(`${card.id}.name`)}
              fill
              priority
              sizes="(max-width: 768px) 320px, 400px"
              className="object-contain"
            />

            {/* Subtle dimming overlay so the gold regions stand out at rest.
                Fades away while exploring (hover/selected) or when the user
                turns on "highlight all", keeping the artwork readable. */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                background: 'rgba(20, 16, 10, 0.22)',
                opacity: hoverId || selectedId || showRegions ? 0 : 1,
              }}
              aria-hidden
            />

            <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="none"
            >
              {card.regions.map((region) => {
                const active =
                  region.id === hoverId ||
                  region.id === selectedId ||
                  showRegions;
                return (
                  <RegionShape
                    key={region.id}
                    region={region}
                    active={active}
                    selected={region.id === selectedId}
                    label={t(`${region.i18nKey}.title`)}
                    onEnter={() => setHover(region.id)}
                    onLeave={scheduleClear}
                    onActivate={() => toggleSelect(region.id)}
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </section>

      {/* ─── Right column (md+): reading panel stacked above the symbol
             pills. On mobile it becomes pills → panel in normal flow, so it
             still reads as card → pills → meaning. ─── */}
      <div className="mx-auto flex w-full max-w-[320px] flex-col-reverse gap-6 sm:max-w-[360px] md:col-start-2 md:row-start-1 md:block md:max-w-none md:space-y-6">
        {/* Reading panel: beside the card on desktop, in-flow below on mobile */}
        <aside ref={panelRef} className="w-full" aria-live="polite">
          <PanelCard region={shownRegion} t={t} />
        </aside>

        {/* Symbol pills: below the card on mobile (horizontal carousel),
            under the reading panel on desktop (md+). */}
        <div className="w-full">
          <div
            className="tarot-pills-scroll flex snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-px-4 px-4 pb-1 md:flex-wrap md:justify-start md:overflow-visible md:scroll-px-0 md:px-0"
            role="tablist"
            aria-label={t('panelEmptyTitle')}
          >
            {card.regions.map((region) => {
              const active = region.id === shownId;
              return (
                <button
                  key={region.id}
                  ref={(el) => {
                    if (el) pillRefs.current.set(region.id, el);
                    else pillRefs.current.delete(region.id);
                  }}
                  type="button"
                  role="tab"
                  onMouseEnter={() => setHover(region.id)}
                  onMouseLeave={scheduleClear}
                  onClick={() => toggleSelect(region.id)}
                  aria-pressed={active}
                  aria-selected={active}
                  className="flex min-h-[44px] shrink-0 snap-center items-center gap-2 whitespace-nowrap rounded-full py-2 text-sm font-medium transition"
                  style={{
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    background: active ? 'var(--gold)' : 'var(--bg-secondary)',
                    color: active ? '#1c1917' : 'var(--text-secondary)',
                    border: `1px solid ${active ? 'var(--gold)' : 'var(--border)'}`,
                    boxShadow: active ? 'var(--shadow-md)' : 'none',
                  }}
                >
                  {region.icon && <span aria-hidden>{region.icon}</span>}
                  <span>{t(`${region.i18nKey}.title`)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Reading panel: shows a region's meaning or an empty-state prompt. */
function PanelCard({
  region,
  t,
}: {
  region: TarotRegion | null;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div
      className="rounded-2xl p-6 sm:p-7"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-md)',
        minHeight: '16rem',
      }}
    >
      {region ? (
        <div key={region.id} className="animate-tarot-panel">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl"
              style={{
                background: 'rgba(212, 175, 55, 0.14)',
                border: '1px solid var(--border)',
              }}
              aria-hidden
            >
              {region.icon ?? '✦'}
            </div>
            <h2
              className="text-xl font-semibold leading-snug"
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}
            >
              {t(`${region.i18nKey}.title`)}
            </h2>
          </div>
          <div className="my-4 h-px w-full" style={{ background: 'var(--border)' }} />
          <p className="text-[0.95rem] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t(`${region.i18nKey}.description`)}
          </p>
        </div>
      ) : (
        <div className="flex h-full min-h-[12rem] flex-col items-center justify-center text-center">
          <div className="mb-3 text-3xl" aria-hidden>🔮</div>
          <p className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('panelEmptyTitle')}
          </p>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t('panelEmptyHint')}
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Renders a single interactive region as the right SVG primitive:
 *  - shape.type === 'circle'    → <ellipse> filling the bounding box
 *  - shape.type === 'rect'      → <rect> (optionally rounded)
 *  - shape.type === 'triangle'  → upward <polygon> inscribed in the box
 *  - no shape (legacy)          → free-form <polygon points=...>
 *
 * All variants share the same gold highlight styling and interaction.
 */
function RegionShape({
  region,
  active,
  selected,
  label,
  onEnter,
  onLeave,
  onActivate,
}: {
  region: TarotRegion;
  active: boolean;
  selected: boolean;
  label: string;
  onEnter: () => void;
  onLeave: () => void;
  onActivate: () => void;
}) {
  const common = {
    tabIndex: 0,
    role: 'button',
    'aria-label': label,
    'aria-pressed': selected,
    className: !active ? 'tarot-hint-pulse' : undefined,
    onMouseEnter: onEnter,
    onMouseMove: onEnter,
    onMouseLeave: onLeave,
    onFocus: onEnter,
    onBlur: onLeave,
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      onActivate();
    },
    style: {
      cursor: 'pointer',
      fill: active ? 'rgba(212, 175, 55, 0.30)' : 'rgba(212, 175, 55, 0.16)',
      stroke: active ? 'rgba(212, 175, 55, 1)' : 'rgb(205 205 205 / 85%)',
      strokeWidth: active ? 0.8 : 0.6,
      strokeDasharray: active ? 'none' : '2.5 2',
      strokeLinejoin: 'round' as const,
      transition: 'fill 0.15s ease, stroke 0.15s ease, stroke-width 0.15s ease',
      outline: 'none',
    },
  };

  const { shape } = region;

  if (shape) {
    const { type, x, y, width: w, height: h } = shape;

    if (type === 'circle') {
      return (
        <ellipse cx={x + w / 2} cy={y + h / 2} rx={w / 2} ry={h / 2} {...common} />
      );
    }

    if (type === 'rect') {
      return (
        <rect x={x} y={y} width={w} height={h} rx={shape.radius} ry={shape.radius} {...common} />
      );
    }

    // triangle — upward-pointing, inscribed in the bounding box.
    const triPoints = `${x + w / 2},${y} ${x + w},${y + h} ${x},${y + h}`;
    return <polygon points={triPoints} {...common} />;
  }

  // Legacy / advanced free-form polygon.
  return <polygon points={region.points} {...common} />;
}
