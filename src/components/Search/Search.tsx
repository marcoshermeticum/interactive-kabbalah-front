'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { sephirotCorrespondences, pathCorrespondences } from '@/data/correspondences';
import { sephirots } from '@/data/sephirots';

interface SearchResult {
  type: 'sephirot' | 'path';
  id: string;
  name: string;
  matchedOn: string;
  score: number;
}

interface Props {
  onSelectSephirot?: (id: string) => void;
  onSelectPath?: (number: number) => void;
}

// Hebrew letter names for paths
const pathNames: Record<number, string> = {
  11: 'Aleph', 12: 'Beth', 13: 'Gimel', 14: 'Daleth', 15: 'Heh',
  16: 'Vav', 17: 'Zayin', 18: 'Cheth', 19: 'Teth', 20: 'Yod',
  21: 'Kaph', 22: 'Lamed', 23: 'Mem', 24: 'Nun', 25: 'Samekh',
  26: 'Ayin', 27: 'Peh', 28: 'Tzaddi', 29: 'Qoph', 30: 'Resh',
  31: 'Shin', 32: 'Tav',
};

export default function Search({ onSelectSephirot, onSelectPath }: Props) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const ui = useTranslations('ui');

  const results = useMemo<SearchResult[]>(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase().trim();
    const found: SearchResult[] = [];

    // Search sephirots
    for (const [id, corr] of Object.entries(sephirotCorrespondences)) {
      const data = sephirots[id];
      if (!data) continue;

      const allTerms = [
        ...corr.animals,
        ...corr.stones,
        ...corr.bodyParts,
        ...corr.keywords,
        data.name.toLowerCase(),
        data.valor.toLowerCase(),
        data.planetName.toLowerCase(),
      ];

      for (const term of allTerms) {
        if (term.toLowerCase().includes(q) || q.includes(term.toLowerCase().substring(0, 3))) {
          found.push({
            type: 'sephirot',
            id,
            name: data.name,
            matchedOn: term,
            score: term.toLowerCase() === q ? 10 : term.toLowerCase().startsWith(q) ? 8 : 5,
          });
          break;
        }
      }
    }

    // Search paths
    for (const [numStr, corr] of Object.entries(pathCorrespondences)) {
      const num = parseInt(numStr);
      const allTerms = [
        ...corr.animals,
        ...corr.stones,
        ...corr.bodyParts,
        ...corr.keywords,
      ];

      for (const term of allTerms) {
        if (term.toLowerCase().includes(q) || q.includes(term.toLowerCase().substring(0, 3))) {
          found.push({
            type: 'path',
            id: numStr,
            name: `${ui('path')} ${num} (${pathNames[num]})`,
            matchedOn: term,
            score: term.toLowerCase() === q ? 10 : term.toLowerCase().startsWith(q) ? 8 : 5,
          });
          break;
        }
      }
    }

    return found.sort((a, b) => b.score - a.score).slice(0, 8);
  }, [query, ui]);

  // Related keywords suggestion
  const relatedTerms = useMemo(() => {
    if (query.length < 2 || results.length === 0) return [];
    const terms = new Set<string>();
    for (const r of results) {
      const corr = r.type === 'sephirot'
        ? sephirotCorrespondences[r.id]
        : pathCorrespondences[parseInt(r.id)];
      if (corr) {
        [...corr.keywords, ...corr.animals].forEach(t => {
          if (t.toLowerCase() !== query.toLowerCase()) terms.add(t);
        });
      }
    }
    return Array.from(terms).slice(0, 6);
  }, [results, query]);

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
              placeholder="Buscar: boi, lua, coração, rubi..."
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
                    if (r.type === 'sephirot' && onSelectSephirot) {
                      onSelectSephirot(r.id);
                    } else if (r.type === 'path' && onSelectPath) {
                      onSelectPath(parseInt(r.id));
                    }
                    setIsOpen(false);
                    setQuery('');
                  }}
                >
                  <span className="text-lg">{r.type === 'sephirot' ? '🔮' : '🛤️'}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{r.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">corresponde a: {r.matchedOn}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {relatedTerms.length > 0 && (
            <div className="px-3 pb-3 pt-1 border-t border-gray-100 dark:border-gray-700">
              <p className="text-[10px] uppercase text-gray-400 mb-1.5">Termos relacionados</p>
              <div className="flex flex-wrap gap-1.5">
                {relatedTerms.map((t) => (
                  <button
                    key={t}
                    onClick={() => setQuery(t)}
                    className="text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/40 transition"
                  >
                    {t}
                  </button>
                ))}
              </div>
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
