'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Navbar from '@/components/Navbar/Navbar';
import InteractiveTarotCard from '@/components/Tarot/InteractiveTarotCard';
import TarotRegionEditor from '@/components/Tarot/TarotRegionEditor';
import TarotShareMenu from '@/components/Tarot/TarotShareMenu';
import { getTarotCard, type Element, type MajorArcanaEntry, type Planet, type ZodiacSign } from '@/data/tarot/majorArcana';

const PLANET_GLYPH: Record<Planet, string> = { sun: '☉', moon: '☽', mercury: '☿', venus: '♀', mars: '♂', jupiter: '♃', saturn: '♄' };
const SIGN_GLYPH: Record<ZodiacSign, string> = {
  aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍',
  libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓',
};
const ELEMENT_GLYPH: Record<Element, string> = { fire: '🜂', water: '🜄', air: '🜁', earth: '🜃' };

type Props = {
  entry: MajorArcanaEntry;
};

/**
 * Renders a single major arcana. Cards that already have interactive data
 * show the full `InteractiveTarotCard`; the rest show the artwork with a
 * "coming soon" notice until their regions are drawn.
 */
const chipStyle = {
  alignItems: 'center',
  background: 'var(--bg-secondary)',
  border: '1px solid var(--border)',
  borderRadius: '999px',
  display: 'inline-flex',
  fontSize: '0.8rem',
  gap: '0.4rem',
  padding: '0.25rem 0.75rem',
} as const;

const chipLabelStyle = {
  color: 'var(--text-muted)',
  fontSize: '0.65rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
} as const;

export default function TarotCardDetail({ entry }: Props) {
  const t = useTranslations('tarotWaite');
  const tc = useTranslations('tarotWaite.cards');
  const tTarot = useTranslations('tarot');
  const tCorr = useTranslations('tarotWaite.correspondences');

  const card = getTarotCard(entry.slug);
  const name = tc(`${entry.i18nKey}.name`);

  // Region editor is a development tool. It can also be enabled in a
  // production build with NEXT_PUBLIC_TAROT_EDITOR=1.
  const editorAvailable =
    process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_TAROT_EDITOR === '1';
  const [editorOpen, setEditorOpen] = useState(false);
  const { correspondence: corr } = entry;
  const correspondences: { label: string; glyph: string; value: string }[] = [
    { label: tCorr('hebrewLetter'), glyph: corr.letter, value: corr.letterName },
    ...(corr.planet ? [{ label: tCorr('planet'), glyph: PLANET_GLYPH[corr.planet], value: tCorr(`planets.${corr.planet}`) }] : []),
    ...(corr.sign ? [{ label: tCorr('sign'), glyph: SIGN_GLYPH[corr.sign], value: tCorr(`signs.${corr.sign}`) }] : []),
    ...(corr.element ? [{ label: tCorr('element'), glyph: ELEMENT_GLYPH[corr.element], value: tCorr(`elements.${corr.element}`) }] : []),
  ];

  const shareMenu = <TarotShareMenu cardName={name} image={entry.image} />;

  return (
    <div className="flex h-[100dvh] w-full flex-col overflow-hidden">
      <Navbar variant="catalog" />
      <main
        style={{
          minHeight: 0,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          flex: 1,
          padding: '1.5rem 1.25rem 3rem',
        }}
      >
        <div style={{ maxWidth: '60rem', margin: '0 auto', paddingBottom: '2rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '1.25rem',
            }}
          >
            <Link
              href="/tarot"
              style={{
                color: 'var(--accent)',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}
            >
              {t('backToCatalog')}
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              {card && editorAvailable && (
                <button
                  type="button"
                  onClick={() => setEditorOpen((open) => !open)}
                  style={{
                    cursor: 'pointer',
                    padding: '0.35rem 0.8rem',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    color: editorOpen ? '#1c1917' : 'var(--text-muted)',
                    background: editorOpen ? 'var(--gold)' : 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {editorOpen ? '✕ Fechar editor' : '🎯 Posicionar destaques'}
                </button>
              )}
            </div>
          </div>

          <header style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
            <span
              style={{
                display: 'inline-block',
                marginBottom: '0.5rem',
                padding: '0.25rem 0.85rem',
                borderRadius: '999px',
                border: '1px solid var(--border)',
                color: 'var(--accent)',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {name} · {entry.roman}
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 6vw, 3.25rem)',
                fontWeight: 500,
                lineHeight: 1.1,
                margin: '0 0 0.75rem',
              }}
            >
              {name}
            </h1>
            <p
              style={{
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                maxWidth: '40rem',
                margin: '0 auto',
              }}
            >
              {tc(`${entry.i18nKey}.summary`)}
            </p>

            <ul
              aria-label={tCorr('title')}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.5rem',
                listStyle: 'none',
                margin: '1rem 0 0',
                padding: 0,
              }}
            >
              <li style={chipStyle}>
                <span style={chipLabelStyle}>{tCorr('path')}</span>
                <span style={{ color: 'var(--gold-text)' }}>{corr.path}</span>
              </li>
              {correspondences.map((item) => (
                <li key={item.label} style={chipStyle}>
                  <span style={chipLabelStyle}>{item.label}</span>
                  <span aria-hidden="true" style={{ color: 'var(--gold)', fontFamily: 'serif', fontSize: '1.05rem', lineHeight: 1 }}>{item.glyph}</span>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>

            {card && !editorOpen && (
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.8rem',
                  marginTop: '0.9rem',
                  opacity: 0.85,
                }}
              >
                💡 {tTarot('hint')}
              </p>
            )}
          </header>

          {card ? (
            editorOpen && editorAvailable ? (
              <TarotRegionEditor card={card} />
            ) : (
              <InteractiveTarotCard card={card} toolbarEnd={shareMenu} />
            )
          ) : (
            <div
              style={{
                maxWidth: '22rem',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-0.5rem' }}>{shareMenu}</div>
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '3 / 5',
                  overflow: 'hidden',
                  borderRadius: '14px',
                  outline: '1px solid var(--border)',
                  outlineOffset: '-1px',
                  opacity: 0.75,
                }}
              >
                <img
                  src={entry.image}
                  alt={name}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(0.85)',
                  }}
                />
              </div>
              <div
                style={{
                  textAlign: 'center',
                  padding: '1.1rem 1.25rem',
                  borderRadius: '14px',
                  border: '1px solid var(--border)',
                  background: 'color-mix(in srgb, var(--gold) 8%, transparent)',
                }}
              >
                <p
                  style={{
                    margin: '0 0 0.35rem',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  {t('comingSoonTitle')}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: 'var(--text-muted)',
                  }}
                >
                  {t('comingSoonText')}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
