'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Navbar from '@/components/Navbar/Navbar';
import InteractiveTarotCard from '@/components/Tarot/InteractiveTarotCard';
import TarotShareMenu from '@/components/Tarot/TarotShareMenu';
import { getTarotCard, type MajorArcanaEntry } from '@/data/tarot/majorArcana';

type Props = {
  entry: MajorArcanaEntry;
};

/**
 * Renders a single major arcana. Cards that already have interactive data
 * show the full `InteractiveTarotCard`; the rest show the artwork with a
 * "coming soon" notice until their regions are drawn.
 */
export default function TarotCardDetail({ entry }: Props) {
  const t = useTranslations('tarotWaite');
  const tc = useTranslations('tarotWaite.cards');
  const tTarot = useTranslations('tarot');

  const card = getTarotCard(entry.slug);
  const name = tc(`${entry.i18nKey}.name`);

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
            <TarotShareMenu cardName={name} image={entry.image} />
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
            {card ? (
              <>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    lineHeight: 1.65,
                    maxWidth: '40rem',
                    margin: '0 auto',
                  }}
                >
                  {tTarot(`${entry.i18nKey}.intro`)}
                </p>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                    marginTop: '0.75rem',
                    opacity: 0.85,
                  }}
                >
                  💡 {tTarot('hint')}
                </p>
              </>
            ) : null}
          </header>

          {card ? (
            <InteractiveTarotCard card={card} />
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
