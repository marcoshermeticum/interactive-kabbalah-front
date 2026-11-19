'use client';

import { useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  FILTER_ELEMENTS,
  FILTER_SEPHIROTH,
  FILTER_SIGNS,
  NO_FILTERS,
  activeFilterCount,
  type CardFilters,
} from '@/data/tarot/filters';

interface Props {
  filters: CardFilters;
  onChange: (next: CardFilters) => void;
  /** Cards that match the current filters. */
  resultCount: number;
}

const ELEMENT_GLYPH = { fire: '🜂', water: '🜄', air: '🜁', earth: '🜃' } as const;
// U+FE0E asks for the text glyph; without it many platforms draw colored emoji.
const SIGN_GLYPH = {
  aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍',
  libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓',
} as const;

/**
 * Advanced filters for the tarot catalog (element, sign, sephirah).
 * Collapsed by default: only the toggle, the active-filter count and the
 * clear button are visible until the panel is opened.
 */
export default function TarotFilters({ filters, onChange, resultCount }: Props) {
  const t = useTranslations('tarotWaite.filters');
  const tCorr = useTranslations('tarotWaite.correspondences');
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const active = activeFilterCount(filters);

  return (
    <section aria-label={t('toggle')} style={{ margin: '0 auto 2rem', maxWidth: '52rem' }}>
      <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          style={{
            alignItems: 'center',
            background: open || active ? 'var(--bg-secondary)' : 'transparent',
            border: `1px solid ${active ? 'var(--gold-text)' : 'var(--border)'}`,
            borderRadius: '999px',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'inline-flex',
            font: 'inherit',
            fontSize: '0.85rem',
            gap: '0.5rem',
            minHeight: '2.5rem',
            padding: '0.4rem 1rem',
          }}
        >
          <FunnelIcon />
          <span>{t('toggle')}</span>
          {active > 0 && (
            <span
              aria-label={t('active', { count: active })}
              style={{
                background: 'var(--gold)',
                borderRadius: '999px',
                color: '#1c1917',
                fontSize: '0.7rem',
                fontWeight: 600,
                minWidth: '1.25rem',
                padding: '0.05rem 0.4rem',
                textAlign: 'center',
              }}
            >
              {active}
            </span>
          )}
          <span aria-hidden="true" style={{ display: 'inline-block', fontSize: '0.7rem', transform: open ? 'rotate(180deg)' : 'none' }}>
            ▾
          </span>
        </button>

        {active > 0 && (
          <button
            type="button"
            onClick={() => onChange(NO_FILTERS)}
            style={{
              background: 'transparent',
              border: 0,
              color: 'var(--accent)',
              cursor: 'pointer',
              font: 'inherit',
              fontSize: '0.85rem',
              minHeight: '2.5rem',
              padding: '0.4rem 0.6rem',
              textDecoration: 'underline',
            }}
          >
            {t('clear')}
          </button>
        )}

        <span aria-live="polite" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          {active > 0 ? t('results', { count: resultCount }) : ''}
        </span>
      </div>

      {open && (
        <div
          id={panelId}
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '1rem',
            display: 'grid',
            gap: '1.1rem',
            marginTop: '0.9rem',
            padding: '1.1rem 1.25rem 1.25rem',
          }}
        >
          <FilterGroup legend={t('element')}>
            {FILTER_ELEMENTS.map((element) => (
              <Chip
                key={element}
                pressed={filters.element === element}
                onClick={() => onChange({ ...filters, element: filters.element === element ? null : element })}
                glyph={ELEMENT_GLYPH[element]}
                label={tCorr(`elements.${element}`)}
              />
            ))}
          </FilterGroup>

          <FilterGroup legend={t('sign')}>
            {FILTER_SIGNS.map((sign) => (
              <Chip
                key={sign}
                pressed={filters.sign === sign}
                onClick={() => onChange({ ...filters, sign: filters.sign === sign ? null : sign })}
                glyph={`${SIGN_GLYPH[sign]}\uFE0E`}
                label={tCorr(`signs.${sign}`)}
              />
            ))}
          </FilterGroup>

          <FilterGroup legend={t('sephirah')}>
            {FILTER_SEPHIROTH.map((sephirah) => (
              <Chip
                key={sephirah}
                pressed={filters.sephirah === sephirah}
                onClick={() => onChange({ ...filters, sephirah: filters.sephirah === sephirah ? null : sephirah })}
                label={tCorr(`sephiroth.${sephirah}`)}
              />
            ))}
          </FilterGroup>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>{t('hint')}</p>
        </div>
      )}
    </section>
  );
}

function FilterGroup({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset style={{ border: 0, margin: 0, minWidth: 0, padding: 0 }}>
      <legend style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.08em', marginBottom: '0.5rem', padding: 0, textTransform: 'uppercase' }}>
        {legend}
      </legend>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>{children}</div>
    </fieldset>
  );
}

function Chip({
  pressed,
  onClick,
  label,
  glyph,
}: {
  pressed: boolean;
  onClick: () => void;
  label: string;
  glyph?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      style={{
        alignItems: 'center',
        background: pressed ? 'var(--gold)' : 'var(--bg-primary)',
        border: `1px solid ${pressed ? 'var(--gold)' : 'var(--border)'}`,
        borderRadius: '999px',
        color: pressed ? '#1c1917' : 'var(--text-primary)',
        cursor: 'pointer',
        display: 'inline-flex',
        font: 'inherit',
        fontSize: '0.82rem',
        gap: '0.35rem',
        minHeight: '2.25rem',
        padding: '0.25rem 0.8rem',
      }}
    >
      {glyph && (
        <span aria-hidden="true" style={{ fontFamily: 'serif', fontSize: '1rem', lineHeight: 1 }}>
          {glyph}
        </span>
      )}
      {label}
    </button>
  );
}

function FunnelIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 5h18l-7 8.5V19l-4 2v-7.5L3 5z" />
    </svg>
  );
}
