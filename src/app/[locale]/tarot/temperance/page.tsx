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
          padding: '2rem 1rem 4rem',
        }}
      >
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <Link
            href="/"
            style={{
              color: 'var(--gold)',
              display: 'inline-block',
              marginBottom: '1.5rem',
              textDecoration: 'none',
            }}
          >
            {t('backToHome')}
          </Link>

          <header style={{ marginBottom: '2rem' }}>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 6vw, 3.25rem)',
                fontWeight: 500,
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {temperance.number} · {t('temperance.name')}
            </h1>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {t('temperance.intro')}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              {t('hint')}
            </p>
          </header>

          <InteractiveTarotCard card={temperance} />
        </div>
      </main>
    </div>
  );
}
