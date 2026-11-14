'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { Pathnames } from '@/i18n/routing';
import Navbar from '@/components/Navbar/Navbar';
import { useNavigationLoading } from '@/components/NavigationLoading';
import { majorArcana, isCardAvailable } from '@/data/tarot/majorArcana';

/**
 * Tarot Rider-Waite catalog: a mosaic of the 22 major arcana.
 *
 * Every tile links to `/tarot/[id]`, which renders the interactive single
 * when the card is already implemented and a "coming soon" state otherwise.
 */
export default function TarotWaitePage() {
  const t = useTranslations('tarotWaite');
  const tc = useTranslations('tarotWaite.cards');
  const showLoading = useNavigationLoading();

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
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <Link
            href="/"
            style={{
              color: 'var(--accent)',
              display: 'inline-block',
              marginBottom: '1.25rem',
              textDecoration: 'none',
              fontSize: '0.9rem',
            }}
          >
            {t('backToPortal')}
          </Link>

          <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
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
              {t('eyebrow')}
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
              {t('title')}
            </h1>
            <p
              style={{
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                maxWidth: '42rem',
                margin: '0 auto',
              }}
            >
              {t('subtitle')}
            </p>
          </header>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '1rem',
            }}
          >
            {majorArcana.map((card, index) => {
              const available = isCardAvailable(card.slug);
              return (
                // Card slugs are the same in every locale, so they are not
                // part of the typed `pathnames` map.
                <Link
                  key={card.slug}
                  href={`/tarot/${card.slug}` as Pathnames}
                  onNavigate={showLoading}
                  aria-label={tc(`${card.i18nKey}.name`)}
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <article
                    className={`portal-card${available ? '' : ' portal-card-soon'}`}
                    style={{
                      position: 'relative',
                      aspectRatio: '3 / 5',
                      overflow: 'hidden',
                      borderRadius: '14px',
                      outline: '1px solid var(--border)',
                      outlineOffset: '-1px',
                      cursor: 'pointer',
                      animation: 'portal-card-in 0.6s cubic-bezier(0.2,0.7,0.2,1) both',
                      animationDelay: `${Math.min(index * 40, 600)}ms`,
                    }}
                  >
                    <Image
                      src={card.image}
                      alt={tc(`${card.i18nKey}.name`)}
                      fill
                      sizes="(max-width: 640px) 45vw, 200px"
                      priority={index < 4}
                      className="portal-card-img"
                      style={{
                        objectFit: 'cover',
                        filter: available ? 'none' : 'grayscale(1)',
                      }}
                    />

                    {/* Veil for text legibility */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to top, rgba(28,25,23,0.9), rgba(28,25,23,0.15) 52%, transparent)',
                      }}
                    />

                    {/* Warm gold glow on hover (available cards only) */}
                    <div
                      className="portal-card-glow"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to bottom right, color-mix(in srgb, var(--gold) 28%, transparent), transparent)',
                        opacity: 0,
                        transition: 'opacity 0.5s ease',
                      }}
                    />

                    {/* The roman numeral is already printed on the artwork itself */}

                    {!available && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '0.6rem',
                          insetInlineEnd: '0.6rem',
                          borderRadius: '999px',
                          padding: '0.18rem 0.5rem',
                          fontSize: '9px',
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          background: 'rgba(246,239,227,0.12)',
                          color: 'rgba(246,239,227,0.8)',
                          border: '1px solid rgba(246,239,227,0.18)',
                        }}
                      >
                        {t('soonBadge')}
                      </span>
                    )}

                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: '0.75rem',
                      }}
                    >
                      <h2
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(0.95rem, 2.4vw, 1.1rem)',
                          fontWeight: 500,
                          lineHeight: 1.2,
                          color: '#f6efe3',
                          margin: 0,
                          textWrap: 'balance',
                        }}
                      >
                        {tc(`${card.i18nKey}.name`)}
                      </h2>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
