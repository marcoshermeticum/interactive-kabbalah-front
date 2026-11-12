'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Navbar from '@/components/Navbar/Navbar';
import { alchemicalSymbols } from '@/data/alchemicalSymbols';
import { getAlchemicalSymbolName } from '@/data/alchemicalSymbolTranslations';
import { treeOfLifeCelestialSymbols } from '@/data/treeOfLifeCelestialSymbols';
import { copyText } from '@/lib/clipboard';

// Four classical elements first (Fire, Air, Water, Earth), then the Quintessence
const ELEMENT_ORDER = [0x1f702, 0x1f701, 0x1f704, 0x1f703, 0x1f700];
const elementRank = (codePoint: number) => {
  const i = ELEMENT_ORDER.indexOf(codePoint);
  return i === -1 ? ELEMENT_ORDER.length : i;
};

const GRID_STYLE = {
  display: 'grid',
  gap: '0.5rem',
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 9.5rem), 1fr))',
  listStyle: 'none',
  margin: 0,
  padding: 0,
} as const;

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
  const elementSymbols = visibleSymbols
    .filter((s) => ELEMENT_ORDER.includes(s.codePoint))
    .sort((a, b) => elementRank(a.codePoint) - elementRank(b.codePoint));
  const otherSymbols = visibleSymbols.filter((s) => !ELEMENT_ORDER.includes(s.codePoint));
  const visibleTreeOfLifeSymbols = treeOfLifeCelestialSymbols.filter((symbol) => {
    const localizedName = t(`treeOfLifeSequence.${symbol.nameKey}`);
    const searchableText = `${symbol.character} ${localizedName} ${t('treeOfLifeSequence.title')} ${t('treeOfLifeSequence.description')}`.toLocaleLowerCase(locale);
    return searchableText.includes(normalizedQuery);
  });
  const visibleSymbolCount = visibleSymbols.length + visibleTreeOfLifeSymbols.length;

  async function copySymbol(codePoint: number, character: string) {
    if (await copyText(character)) {
      setCopiedCodePoint(codePoint);
      setCopyFailed(false);
    } else {
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
              {elementSymbols.length > 0 && (
                <section aria-labelledby="elements-title" style={{ marginBottom: '1.5rem' }}>
                  <h2 id="elements-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 500, margin: '0 0 0.75rem' }}>
                    {t('elements')}
                  </h2>
                  <ul aria-label={t('elements')} style={GRID_STYLE}>
                    {elementSymbols.map((symbol) => (
                      <SymbolCard
                        key={symbol.codePoint}
                        codePoint={symbol.codePoint}
                        character={symbol.character}
                        localizedName={getAlchemicalSymbolName(locale, symbol.translationIndex)}
                        description={t(symbol.descriptionKey)}
                        copied={copiedCodePoint === symbol.codePoint}
                        onCopy={copySymbol}
                        highlight
                      />
                    ))}
                  </ul>
                </section>
              )}

              {otherSymbols.length > 0 && (
                <ul aria-label={t('symbolsList')} style={GRID_STYLE}>
                  {otherSymbols.map((symbol) => (
                    <SymbolCard
                      key={symbol.codePoint}
                      codePoint={symbol.codePoint}
                      character={symbol.character}
                      localizedName={getAlchemicalSymbolName(locale, symbol.translationIndex)}
                      description={t(symbol.descriptionKey)}
                      copied={copiedCodePoint === symbol.codePoint}
                      onCopy={copySymbol}
                    />
                  ))}
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
                  <ul aria-label={t('treeOfLifeSequence.title')} style={GRID_STYLE}>
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
          className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 rounded-full px-3 py-1.5 text-xs shadow-lg"
          style={{
            background: copyFailed ? 'var(--header-bg)' : '#166534',
            color: 'white',
          }}
        >
          {copyFailed
            ? t('copyFailedShort')
            : `${copiedCodePoint === null ? '' : String.fromCodePoint(copiedCodePoint)} ${t('copied')}`}
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
  highlight = false,
}: {
  codePoint: number;
  character: string;
  localizedName: string;
  description: string;
  copied: boolean;
  onCopy: (codePoint: number, character: string) => void;
  highlight?: boolean;
}) {
  const t = useTranslations('alchemicalCatalog');

  return (
    <li style={{ display: 'flex' }}>
      <button
        type="button"
        onClick={() => onCopy(codePoint, character)}
        aria-label={t('copySymbol', { name: localizedName })}
        title={`${description} · U+${codePoint.toString(16).toUpperCase()}`}
        style={{
          alignItems: 'center',
          background: 'var(--bg-secondary)',
          border: `1px solid ${copied || highlight ? 'var(--gold)' : 'var(--border)'}`,
          borderRadius: '0.75rem',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          display: 'flex',
          font: 'inherit',
          gap: '0.6rem',
          padding: '0.5rem 0.65rem',
          textAlign: 'left',
          width: '100%',
        }}
      >
        <span
          aria-hidden="true"
          style={{ color: 'var(--gold)', fontFamily: 'serif', fontSize: '1.75rem', lineHeight: 1, minWidth: '1.75rem', textAlign: 'center' }}
        >
          {character}
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <span style={{ fontSize: '0.8rem', lineHeight: 1.25, overflowWrap: 'anywhere' }}>
            {copied && <span aria-hidden="true">✓ </span>}
            {localizedName}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>
            U+{codePoint.toString(16).toUpperCase()}
          </span>
        </span>
      </button>
    </li>
  );
}