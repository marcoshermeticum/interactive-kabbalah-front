'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { searchAll, SearchResult } from '@/data/searchIndex';

interface Props {
  onSelectResult?: (result: SearchResult) => void;
}

const typeIcons: Record<string, string> = {
  sephirot: '🔮',
  qliphah: '💀',
  path: '🛤️',
  tunnel: '🕳️',
  veil: '🪬',
  pillar: '🏛️',
};

const typeLabels: Record<string, string> = {
  sephirot: 'Sephirot',
  qliphah: 'Qliphah',
  path: 'Caminho',
  tunnel: 'Túnel',
  veil: 'Véu',
  pillar: 'Pilar',
};

export default function Search({ onSelectResult }: Props) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const ui = useTranslations('ui');

  const results = useMemo<SearchResult[]>(() => {
    if (query.length < 2) return [];
    return searchAll(query, ui('path'), ui('tunnel'));
  }, [query, ui]);

  return (
    <div className="relative">
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-200 text-white/50 hover:text-white"
        aria-label="Search"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      </button>

      {/* Search panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[90vw] sm:w-[400px] max-h-[70vh] overflow-auto bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-[600]">
          <div className="sticky top-0 p-3 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar: boi, lua, coração, rubi, abismo, boaz..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              autoFocus
            />
          </div>

          {results.length > 0 && (
            <div className="p-2">
              {results.map((r, i) => (
                <button
                  key={`${r.type}-${r.id}-${i}`}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-3"
                  onClick={() => {
                    if (onSelectResult) {
                      onSelectResult(r);
                    }
                    setIsOpen(false);
                    setQuery('');
                  }}
                >
                  <span className="text-lg">{typeIcons[r.type] || '🔍'}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{r.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="inline-block px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-[10px] mr-1.5">{typeLabels[r.type]}</span>
                      corresponde a: {r.matchedOn}
                    </p>
                  </div>
                  {r.view !== 'any' && (
                    <span className="text-[10px] text-gray-400 shrink-0">
                      {r.view === 'life' ? '🌳' : r.view === 'death' ? '💀' : '☯'}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {query.length >= 2 && results.length === 0 && (
            <div className="p-4 text-center text-sm text-gray-400">
              Nenhum resultado para &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
