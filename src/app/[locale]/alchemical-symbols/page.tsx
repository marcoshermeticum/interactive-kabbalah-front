'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Navbar from '@/components/Navbar/Navbar';
import { alchemicalSymbols } from '@/data/alchemicalSymbols';
import { getAlchemicalSymbolName } from '@/data/alchemicalSymbolTranslations';
import { treeOfLifeCelestialSymbols } from '@/data/treeOfLifeCelestialSymbols';

const UNICODE_CHART_URL = 'https://www.unicode.org/Public/18.0.0/charts/PDF/U1F700.pdf';

export default function AlchemicalSymbolsPage() {
  const locale = useLocale();
  const t = useTranslations('alchemicalCatalog');
  const [query, setQuery] = useState('');
  const [copiedCodePoint, setCopiedCodePoint] = useState<number | null>(null);
  const [copyFailed, setCopyFailed] = useState(false);
  const normalizedQuery = query.trim().toLocaleLowerCase(locale);

  useEffect(() => {
    if (copiedCodePoint === null && !copyFailed) return;

    const timeout = window.setTimeout(() => {
      setCopiedCodePoint(null);
      setCopyFailed(false);
    }, copyFailed ? 4000 : 2000);

    return () => window.clearTimeout(timeout);
  }, [copiedCodePoint, copyFailed]);

  const visibleSymbols = alchemicalSymbols.filter((symbol) => {
    const localizedName = getAlchemicalSymbolName(locale, symbol.translationIndex);
    const searchableText = `${localizedName} ${symbol.name} ${t(symbol.descriptionKey)}`.toLocaleLowerCase(locale);
    return searchableText.includes(normalizedQuery);
  });
  const visibleTreeOfLifeSymbols = treeOfLifeCelestialSymbols.filter((symbol) => {
    const localizedName = t(`treeOfLifeSequence.${symbol.nameKey}`);
    const searchableText = `${symbol.character} ${localizedName} ${t('treeOfLifeSequence.title')} ${t('treeOfLifeSequence.description')}`.toLocaleLowerCase(locale);
    return searchableText.includes(normalizedQuery);
  });
  const visibleSymbolCount = visibleSymbols.length + visibleTreeOfLifeSymbols.length;

  async function copySymbol(codePoint: number, character: string) {
    try {
      await navigator.clipboard.writeText(character);
      setCopiedCodePoint(codePoint);
      setCopyFailed(false);
    } catch {
      setCopiedCodePoint(null);
      setCopyFailed(true);
    }
  }

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
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <Link
            href="/"
            style={{
              color: 'var(--gold)',
              display: 'inline-block',
              marginBottom: '2rem',
              textDecoration: 'none',
            }}
          >
            {t('backToHome')}
          </Link>

          <header style={{ marginBottom: '2rem' }}>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                fontWeight: 500,
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {t('title')}
            </h1>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '48rem' }}>
              {t('intro')}
            </p>
            <a href={UNICODE_CHART_URL} target="_blank" rel="noreferrer">
              {t('source')}
            </a>
          </header>

          <section aria-label={t('searchSection')} style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="alchemical-symbol-search" style={{ display: 'block', marginBottom: '0.5rem' }}>
              {t('searchLabel')}
            </label>
            <input
              id="alchemical-symbol-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('searchPlaceholder')}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.75rem',
                color: 'var(--text-primary)',
                font: 'inherit',
                maxWidth: '36rem',
                padding: '0.8rem 1rem',
                width: '100%',
              }}
            />
            <p aria-live="polite" style={{ color: 'var(--text-muted)', marginBottom: 0 }}>
              {t('resultCount', { count: visibleSymbolCount })}
            </p>
          </section>

          {visibleSymbolCount > 0 ? (
            <>
              {visibleSymbols.length > 0 && (
            <ul
              aria-label={t('symbolsList')}
              style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 15rem), 1fr))',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {visibleSymbols.map((symbol) => {
                const copied = copiedCodePoint === symbol.codePoint;
                const localizedName = getAlchemicalSymbolName(locale, symbol.translationIndex);

                return (
                  <SymbolCard
                    key={symbol.codePoint}
                    codePoint={symbol.codePoint}
                    character={symbol.character}
                    localizedName={localizedName}
                    description={t(symbol.descriptionKey)}
                    copied={copied}
                    onCopy={copySymbol}
                  />
                );
              })}
            </ul>
              )}

              {visibleTreeOfLifeSymbols.length > 0 && (
                <section aria-labelledby="tree-of-life-symbols-title" style={{ marginTop: '3rem' }}>
                  <header style={{ marginBottom: '1.25rem' }}>
                    <h2 id="tree-of-life-symbols-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 500, margin: '0 0 0.5rem' }}>
                      {t('treeOfLifeSequence.title')}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                      {t('treeOfLifeSequence.description')}
                    </p>
                  </header>
                  <ul
                    aria-label={t('treeOfLifeSequence.title')}
                    style={{
                      display: 'grid',
                      gap: '1rem',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 15rem), 1fr))',
                      listStyle: 'none',
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {visibleTreeOfLifeSymbols.map((symbol) => {
                      const localizedName = t(`treeOfLifeSequence.${symbol.nameKey}`);
                      return (
                        <SymbolCard
                          key={symbol.codePoint}
                          codePoint={symbol.codePoint}
                          character={symbol.character}
                          localizedName={localizedName}
                          description={t('treeOfLifeSequence.cardDescription')}
                          copied={copiedCodePoint === symbol.codePoint}
                          onCopy={copySymbol}
                        />
                      );
                    })}
                  </ul>
                </section>
              )}
            </>
          ) : (
            <p role="status" style={{ color: 'var(--text-muted)' }}>
              {t('noResults')}
            </p>
          )}

        </div>
      </main>
      {(copiedCodePoint !== null || copyFailed) && (
        <div
          role={copyFailed ? 'alert' : 'status'}
          aria-live={copyFailed ? 'assertive' : 'polite'}
          aria-atomic="true"
          className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full px-5 py-3 shadow-xl"
          style={{
            background: copyFailed ? 'var(--header-bg)' : '#166534',
            color: 'white',
          }}
        >
          {copyFailed
            ? t('copyFailed')
            : t('copySuccess', {
                symbol: copiedCodePoint === null ? '' : String.fromCodePoint(copiedCodePoint),
              })}
        </div>
      )}
    </div>
  );
}

function SymbolCard({
  codePoint,
  character,
  localizedName,
  description,
  copied,
  onCopy,
}: {
  codePoint: number;
  character: string;
  localizedName: string;
  description: string;
  copied: boolean;
  onCopy: (codePoint: number, character: string) => void;
}) {
  const t = useTranslations('alchemicalCatalog');

  return (
    <li
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '16rem',
        padding: '1.25rem',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          color: 'var(--gold)',
          fontFamily: 'serif',
          fontSize: '3.5rem',
          lineHeight: 1.2,
          marginBottom: '0.75rem',
        }}
      >
        {character}
      </span>
      <h2 style={{ fontSize: '1rem', lineHeight: 1.4, margin: '0 0 0.5rem' }}>
        {localizedName}
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: '0 0 0.5rem' }}>
        {description}
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '0 0 1rem' }}>
        {t('codePoint')}: U+{codePoint.toString(16).toUpperCase()}
      </p>
      <button
        type="button"
        onClick={() => onCopy(codePoint, character)}
        aria-label={t('copySymbol', { name: localizedName })}
        style={{
          background: 'var(--header-bg)',
          border: 0,
          borderRadius: '999px',
          color: 'var(--header-text)',
          cursor: 'pointer',
          font: 'inherit',
          marginTop: 'auto',
          padding: '0.65rem 1rem',
        }}
      >
        {copied && <span aria-hidden="true">✓ </span>}
        {copied ? t('copied') : t('copy')}
      </button>
    </li>
  );
}
