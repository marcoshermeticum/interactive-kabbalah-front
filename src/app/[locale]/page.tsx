'use client';

import { useState, type CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import ThemeToggle from '@/components/ThemeToggle';

/* ------------------------------------------------------------------ *
 * Portal — Porto Lumen design language
 * Warm parchment/gold "sanctuary" aesthetic. Uses the shared theme
 * tokens from globals.css so it respects light/dark mode.
 * Three portals only: Kabbalah · Óraculo · Ferramentas.
 *
 * All copy comes from the `portal` i18n namespace. Navigation uses the
 * localized next-intl Link, so the internal `/tree` href renders as a
 * translated slug per locale (e.g. /pt-BR/arvore-da-vida).
 *
 * Layout is expressed with inline styles (flex/grid) so the design is
 * deterministic and self-contained, mirroring the static reference.
 * ------------------------------------------------------------------ */

type CategoryId = 'all' | 'kabbalah' | 'oraculo' | 'ferramentas';

type PortalCard = {
  id: string;
  category: Exclude<CategoryId, 'all'>;
  /** Translation key under portal.cards.* */
  key: string;
  /** Whether this card has a subcategory eyebrow */
  hasSubcategory: boolean;
  image: string;
  /** Internal (untranslated) href; the localized Link translates it */
  href?: '/tree';
  status: 'live' | 'soon';
};

const categoryFilterKey: Record<CategoryId, string> = {
  all: 'filterAll',
  kabbalah: 'filterKabbalah',
  oraculo: 'filterOracle',
  ferramentas: 'filterTools',
};

const categoryOrder: CategoryId[] = ['all', 'kabbalah', 'oraculo', 'ferramentas'];

const cards: PortalCard[] = [
  // Kabbalah
  {
    id: 'tree-of-life',
    category: 'kabbalah',
    key: 'treeOfLife',
    hasSubcategory: false,
    image: '/landing/hero-tree.png',
    href: '/tree',
    status: 'live',
  },
  // Óraculo → Tarot Rider-Waite
  {
    id: 'tarot-waite',
    category: 'oraculo',
    key: 'tarotWaite',
    hasSubcategory: true,
    image: '/landing/hero-tarot.png',
    status: 'soon',
  },
  // Óraculo → Baralho Cigano
  {
    id: 'baralho-cigano',
    category: 'oraculo',
    key: 'baralhoCigano',
    hasSubcategory: true,
    image: '/landing/hero-daemons.png',
    status: 'soon',
  },
  // Ferramentas → Símbolos Alquímicos
  {
    id: 'alchemical-symbols',
    category: 'ferramentas',
    key: 'alchemicalSymbols',
    hasSubcategory: true,
    image: '/landing/hero-chakras.png',
    status: 'soon',
  },
];

const CONTAINER: CSSProperties = {
  width: '100%',
  maxWidth: '72rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
};

export default function Portal() {
  const t = useTranslations('portal');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

  const visibleCards =
    activeCategory === 'all'
      ? cards
      : cards.filter((c) => c.category === activeCategory);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      {/* ===================== Header ===================== */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(8px)',
          background: 'color-mix(in srgb, var(--bg-primary) 88%, transparent)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            ...CONTAINER,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1.25rem',
            paddingBottom: '1.25rem',
            gap: '1rem',
          }}
        >
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', color: 'inherit' }}
          >
            <img src="/mrviniciux.png" alt="" style={{ height: '1.75rem', width: 'auto', objectFit: 'contain' }} />
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 500, letterSpacing: '0.025em' }}>
              {t('brand')}
            </span>
          </Link>

          <nav
            className="portal-nav"
            style={{ alignItems: 'center', gap: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}
          >
            <Link href="/tree" style={{ color: 'inherit', textDecoration: 'none' }}>
              {t('navPortals')}
            </Link>
            <a href="#portais" style={{ color: 'inherit', textDecoration: 'none' }}>
              {t('navJourney')}
            </a>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ThemeToggle variant="token" />
            <Link
              href="/tree"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                borderRadius: '999px',
                padding: '0.5rem 1.1rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                background: 'var(--header-bg)',
                color: 'var(--header-text)',
              }}
            >
              {t('enter')}
            </Link>
          </div>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {/* ===================== Hero ===================== */}
        <section>
          <div style={{ ...CONTAINER, textAlign: 'center', paddingTop: '4rem', paddingBottom: '3rem' }}>
            <p
              style={{
                marginBottom: '1.75rem',
                fontSize: '11px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.35em',
                color: 'var(--gold)',
              }}
            >
              {t('eyebrow')}
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(3rem, 8vw, 4.5rem)',
                fontWeight: 500,
                lineHeight: 1,
                textWrap: 'balance',
                margin: 0,
              }}
            >
              {t('heroTitle')}{' '}
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>{t('heroEmphasis')}</em>{' '}
              {t('heroTitleAfter')}
            </h1>
            <p
              style={{
                margin: '1.75rem auto 0',
                maxWidth: '28rem',
                fontSize: '1rem',
                lineHeight: 1.625,
                color: 'var(--text-muted)',
                textWrap: 'pretty',
              }}
            >
              {t('heroText')}
            </p>
          </div>
        </section>

        {/* ===================== Filters ===================== */}
        <section id="portais">
          <div style={{ ...CONTAINER, paddingBottom: '2.5rem' }}>
            <div
              role="tablist"
              aria-label={t('navPortals')}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.625rem',
              }}
            >
              {categoryOrder.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      border: 0,
                      cursor: 'pointer',
                      borderRadius: '999px',
                      padding: '0.55rem 1.35rem',
                      fontFamily: 'inherit',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      transition: 'color 0.2s ease, background-color 0.2s ease',
                      ...(active
                        ? { background: 'var(--header-bg)', color: 'var(--header-text)' }
                        : {
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            boxShadow: 'inset 0 0 0 1px var(--border)',
                          }),
                    }}
                  >
                    {t(categoryFilterKey[cat])}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================== Card Grid ===================== */}
        <section>
          <div style={{ ...CONTAINER, paddingBottom: '5rem' }}>
            <div className="portal-grid">
              {visibleCards.map((card, index) => (
                <PortalCardView key={card.id} card={card} index={index} />
              ))}
            </div>

            {visibleCards.length === 0 && (
              <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: '1.125rem' }}>{t('empty')}</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ===================== Footer ===================== */}
      <footer style={{ borderTop: '1px solid var(--border)' }}>
        <div
          className="portal-footer"
          style={{ ...CONTAINER, paddingTop: '2rem', paddingBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}
        >
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', color: 'var(--text-primary)' }}>
            {t('brand')}
          </span>
          <span>{t('footerTagline')}</span>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function PortalCardView({ card, index }: { card: PortalCard; index: number }) {
  const t = useTranslations('portal');
  const c = useTranslations(`portal.cards.${card.key}`);

  const eyebrow = card.hasSubcategory
    ? c('subcategory')
    : t(categoryFilterKey[card.category]);

  const isSoon = card.status === 'soon';

  const inner = (
    <article
      className={`portal-card${isSoon ? ' portal-card-soon' : ''}`}
      style={{
        position: 'relative',
        aspectRatio: '4 / 5',
        overflow: 'hidden',
        borderRadius: 'min(1.4vw, 22px)',
        outline: '1px solid var(--border)',
        outlineOffset: '-1px',
        cursor: isSoon ? 'default' : 'pointer',
        opacity: isSoon ? 0.72 : 1,
        animation: 'portal-card-in 0.6s cubic-bezier(0.2,0.7,0.2,1) both',
        animationDelay: `${index * 80}ms`,
      }}
    >
      <img
        src={card.image}
        alt={c('title')}
        loading="lazy"
        className="portal-card-img"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          // "Coming soon" cards are desaturated; only the available
          // Tree of Life stays in full color.
          filter: card.status === 'soon' ? 'grayscale(1)' : 'none',
        }}
      />

      {/* Veil for text legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(28,25,23,0.88), rgba(28,25,23,0.25) 55%, transparent)',
        }}
      />

      {/* Warm gold glow on hover */}
      <div
        className="portal-card-glow"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom right, color-mix(in srgb, var(--gold) 28%, transparent), transparent)',
          opacity: 0,
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* Body */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem' }}>
        <span
          style={{
            marginBottom: '0.5rem',
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: 'var(--gold)',
          }}
        >
          {eyebrow}
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.875rem',
            fontWeight: 500,
            lineHeight: 1.15,
            color: '#f6efe3',
            textWrap: 'balance',
            margin: 0,
          }}
        >
          {c('title')}
        </h2>
        <p
          className="portal-card-desc"
          style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'rgba(246,239,227,0.72)', opacity: 0, transition: 'opacity 0.5s ease', textWrap: 'pretty' }}
        >
          {c('description')}
        </p>

        {/* Status badge */}
        <span
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            borderRadius: '999px',
            padding: '0.3rem 0.65rem',
            fontSize: '10px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            ...(card.status === 'live'
              ? {
                  background: 'color-mix(in srgb, var(--gold) 22%, transparent)',
                  color: '#f6efe3',
                  border: '1px solid color-mix(in srgb, var(--gold) 45%, transparent)',
                }
              : {
                  background: 'rgba(246,239,227,0.12)',
                  color: 'rgba(246,239,227,0.75)',
                  border: '1px solid rgba(246,239,227,0.18)',
                }),
          }}
        >
          {card.status === 'live' ? t('statusLive') : t('statusSoon')}
        </span>
      </div>
    </article>
  );

  if (card.status === 'live' && card.href) {
    return (
      <Link href={card.href} style={{ display: 'block', textDecoration: 'none' }}>
        {inner}
      </Link>
    );
  }
  return <div>{inner}</div>;
}
