'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Navbar from '@/components/Navbar/Navbar';
import InteractiveTarotCard from '@/components/Tarot/InteractiveTarotCard';
import { temperance } from '@/data/tarot/temperance';

export default function TemperancePage() {
  const t = useTranslations('tarot');

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
            {t('backToHome')}
          </Link>

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
              {t('temperance.name')} · {temperance.number}
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
              {t('temperance.name')}
            </h1>
            <p
              style={{
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                maxWidth: '40rem',
                margin: '0 auto',
              }}
            >
              {t('temperance.intro')}
            </p>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                marginTop: '0.75rem',
                opacity: 0.85,
              }}
            >
              💡 {t('hint')}
            </p>
          </header>

          <InteractiveTarotCard card={temperance} />
        </div>
      </main>
    </div>
  );
}
