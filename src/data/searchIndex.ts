/**
 * Unified search index for all tree elements.
 * Indexes: sephirots, qliphoth, paths (Kabbalah), tunnels (Qliphoth paths),
 * veils, and pillars — everything that can be focused on.
 */

import { sephirots } from './sephirots';
import { qliphoth } from './qliphoth';
import { sephirotCorrespondences, pathCorrespondences } from './correspondences';
import { qliphothPaths } from './qliphothPaths';
import { kabbalahTreeLayout, qliphothTreeLayout, qliphothInvertedLayout } from './tree-layout';
import { daemons, DaemonEntry } from './daemons';

export type SearchableType = 'sephirot' | 'qliphah' | 'path' | 'tunnel' | 'veil' | 'pillar' | 'daemon';

export interface SearchResult {
  type: SearchableType;
  id: string;
  name: string;
  matchedOn: string;
  score: number;
  /** Which tree view this result belongs to */
  view: 'life' | 'death' | 'both' | 'any';
  /** Coordinates in the tree's coordinate space (for focus/zoom) */
  position: { x: number; y: number };
  /** Optional sigil image URL (used for daemon results) */
  sigilUrl?: string;
}

// Hebrew letter names for Kabbalah paths
const pathNames: Record<number, string> = {
  11: 'Aleph', 12: 'Beth', 13: 'Gimel', 14: 'Daleth', 15: 'Heh',
  16: 'Vav', 17: 'Zayin', 18: 'Cheth', 19: 'Teth', 20: 'Yod',
  21: 'Kaph', 22: 'Lamed', 23: 'Mem', 24: 'Nun', 25: 'Samekh',
  26: 'Ayin', 27: 'Peh', 28: 'Tzaddi', 29: 'Qoph', 30: 'Resh',
  31: 'Shin', 32: 'Tav',
};

// Kabbalah path definitions (from/to) for position calculation
const kabbalahPathDefs: { from: string; to: string; number: number }[] = [
  { from: 'kether', to: 'chokmah', number: 11 },
  { from: 'kether', to: 'binah', number: 12 },
  { from: 'kether', to: 'tiferet', number: 13 },
  { from: 'chokmah', to: 'binah', number: 14 },
  { from: 'chokmah', to: 'tiferet', number: 15 },
  { from: 'chokmah', to: 'chesed', number: 16 },
  { from: 'binah', to: 'tiferet', number: 17 },
  { from: 'binah', to: 'gevurah', number: 18 },
  { from: 'gevurah', to: 'chesed', number: 19 },
  { from: 'chesed', to: 'tiferet', number: 20 },
  { from: 'chesed', to: 'netzach', number: 21 },
  { from: 'gevurah', to: 'tiferet', number: 22 },
  { from: 'gevurah', to: 'hod', number: 23 },
  { from: 'tiferet', to: 'netzach', number: 24 },
  { from: 'tiferet', to: 'yesod', number: 25 },
  { from: 'tiferet', to: 'hod', number: 26 },
  { from: 'hod', to: 'netzach', number: 27 },
  { from: 'netzach', to: 'yesod', number: 28 },
  { from: 'netzach', to: 'malkuth', number: 29 },
  { from: 'hod', to: 'yesod', number: 30 },
  { from: 'hod', to: 'malkuth', number: 31 },
  { from: 'yesod', to: 'malkuth', number: 32 },
];

// Veil data for search
const veilSearchData = [
  {
    id: 'veil-abyss',
    name: 'Véu do Abismo',
    keywords: ['abismo', 'masach', 'véu', 'tríade superna', 'choronzon', 'dissolução', 'ego', 'abyss', 'veil'],
    position: { x: 400, y: 520 },
  },
  {
    id: 'veil-parokhet',
    name: 'Véu de Parokhet',
    keywords: ['parokhet', 'véu', 'templo', 'iniciação', 'portal', 'self superior', 'veil'],
    position: { x: 400, y: 980 },
  },
  {
    id: 'veil-nephesch',
    name: 'Véu de Nephesch',
    keywords: ['nephesch', 'qesheth', 'arco-íris', 'véu', 'astral', 'matéria', 'sonho', 'veil', 'rainbow'],
    position: { x: 400, y: 1390 },
  },
  {
    id: 'ain',
    name: 'Ain (Nada)',
    keywords: ['ain', 'nada', 'vazio', 'negatividade', 'nothing', 'zero', 'absoluto', 'véu negativo'],
    position: { x: 400, y: 40 },
  },
  {
    id: 'ain-soph',
    name: 'Ain Soph (Ilimitado)',
    keywords: ['ain soph', 'ilimitado', 'infinito', 'sem fim', 'limitless', 'infinite', 'potencial'],
    position: { x: 400, y: 60 },
  },
  {
    id: 'ain-soph-aur',
    name: 'Ain Soph Aur (Luz Ilimitada)',
    keywords: ['ain soph aur', 'luz ilimitada', 'luz', 'limitless light', 'tzimtzum', 'emanação', 'criação', 'kether'],
    position: { x: 400, y: 80 },
  },
];

// Pillar data for search
const pillarSearchData = [
  {
    id: 'pillar-boaz',
    name: 'Pilar da Severidade (Boaz)',
    keywords: ['boaz', 'pilar', 'severidade', 'feminino', 'água', 'forma', 'disciplina', 'rigor', 'esquerda', 'pillar', 'severity'],
    position: { x: 32, y: 700 },
  },
  {
    id: 'pillar-jachin',
    name: 'Pilar da Misericórdia (Jachin)',
    keywords: ['jachin', 'pilar', 'misericórdia', 'masculino', 'fogo', 'expansão', 'graça', 'direita', 'pillar', 'mercy'],
    position: { x: 768, y: 700 },
  },
];

function getMidpoint(a: { x: number; y: number }, b: { x: number; y: number }) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/**
 * Perform search across all indexed elements.
 */
export function searchAll(query: string, pathLabel: string, tunnelLabel: string): SearchResult[] {
  if (query.length < 2) return [];
  const q = query.toLowerCase().trim();
  const found: SearchResult[] = [];

  // 1. Search Sephirots (Tree of Life)
  for (const [id, corr] of Object.entries(sephirotCorrespondences)) {
    const data = sephirots[id];
    if (!data) continue;
    const pos = kabbalahTreeLayout.positions[id];
    if (!pos) continue;

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
          view: 'life',
          position: pos,
        });
        break;
      }
    }
  }

  // 2. Search Qliphoth (Tree of Death)
  for (const [id, data] of Object.entries(qliphoth)) {
    const pos = qliphothTreeLayout.positions[id];
    if (!pos) continue;

    const allTerms = [
      data.name.toLowerCase(),
      data.valor.toLowerCase(),
      data.planetName.toLowerCase(),
      ...data.archetypes.map(a => a.toLowerCase()),
      ...(data.regent.name ? [data.regent.name.toLowerCase()] : []),
      ...(data.regent.defect ? [data.regent.defect.toLowerCase()] : []),
    ];

    for (const term of allTerms) {
      if (term.includes(q) || q.includes(term.substring(0, 3))) {
        found.push({
          type: 'qliphah',
          id,
          name: data.name,
          matchedOn: term,
          score: term === q ? 10 : term.startsWith(q) ? 8 : 5,
          view: 'death',
          position: pos,
        });
        break;
      }
    }
  }

  // 3. Search Kabbalah Paths (Tree of Life)
  for (const [numStr, corr] of Object.entries(pathCorrespondences)) {
    const num = parseInt(numStr);
    const pathDef = kabbalahPathDefs.find(p => p.number === num);
    if (!pathDef) continue;

    const fromPos = kabbalahTreeLayout.positions[pathDef.from];
    const toPos = kabbalahTreeLayout.positions[pathDef.to];
    if (!fromPos || !toPos) continue;

    const allTerms = [
      ...corr.animals,
      ...corr.stones,
      ...corr.bodyParts,
      ...corr.keywords,
      (pathNames[num] || '').toLowerCase(),
    ];

    for (const term of allTerms) {
      if (term.toLowerCase().includes(q) || q.includes(term.toLowerCase().substring(0, 3))) {
        found.push({
          type: 'path',
          id: numStr,
          name: `${pathLabel} ${num} (${pathNames[num]})`,
          matchedOn: term,
          score: term.toLowerCase() === q ? 10 : term.toLowerCase().startsWith(q) ? 8 : 5,
          view: 'life',
          position: getMidpoint(fromPos, toPos),
        });
        break;
      }
    }
  }

  // 4. Search Qliphoth Tunnels (Tree of Death)
  for (const tunnel of qliphothPaths) {
    const allTerms = [
      tunnel.tunnel.toLowerCase(),
      tunnel.meaning.toLowerCase(),
      tunnel.letterName.toLowerCase(),
      tunnel.virtue.toLowerCase(),
      tunnel.vice.toLowerCase(),
    ];

    const fromPos = qliphothTreeLayout.positions[tunnel.from];
    const toPos = qliphothTreeLayout.positions[tunnel.to];
    if (!fromPos || !toPos) continue;

    for (const term of allTerms) {
      if (term.includes(q) || q.includes(term.substring(0, 3))) {
        found.push({
          type: 'tunnel',
          id: String(tunnel.number),
          name: `${tunnelLabel} ${tunnel.number} (${tunnel.letterName}) — ${tunnel.tunnel}`,
          matchedOn: term,
          score: term === q ? 10 : term.startsWith(q) ? 8 : 5,
          view: 'death',
          position: getMidpoint(fromPos, toPos),
        });
        break;
      }
    }
  }

  // 5. Search Veils
  for (const veil of veilSearchData) {
    for (const term of veil.keywords) {
      if (term.includes(q) || q.includes(term.substring(0, 3))) {
        found.push({
          type: 'veil',
          id: veil.id,
          name: veil.name,
          matchedOn: term,
          score: term === q ? 10 : term.startsWith(q) ? 8 : 5,
          view: 'life',
          position: veil.position,
        });
        break;
      }
    }
  }

  // 6. Search Pillars
  for (const pillar of pillarSearchData) {
    for (const term of pillar.keywords) {
      if (term.includes(q) || q.includes(term.substring(0, 3))) {
        found.push({
          type: 'pillar',
          id: pillar.id,
          name: pillar.name,
          matchedOn: term,
          score: term === q ? 10 : term.startsWith(q) ? 8 : 5,
          view: 'life',
          position: pillar.position,
        });
        break;
      }
    }
  }

  // 7. Search Daemons
  for (const daemon of daemons) {
    const allTerms = [
      daemon.canonicalName.toLowerCase(),
      ...daemon.aliases.map(a => a.toLowerCase()),
    ];

    let matchedTerm: string | null = null;
    let matchScore = 0;

    for (const term of allTerms) {
      if (term.includes(q) || q.includes(term.substring(0, 3))) {
        matchScore = term === q ? 10 : term.startsWith(q) ? 8 : 5;
        matchedTerm = term;
        break;
      }
    }

    if (matchedTerm) {
      for (const assoc of daemon.associations) {
        let position: { x: number; y: number } | null = null;

        if (assoc.type === 'qliphah') {
          position = qliphothTreeLayout.positions[assoc.refId] || null;
        } else if (assoc.type === 'tunnel') {
          const tunnel = qliphothPaths.find(t => t.number === parseInt(assoc.refId));
          if (tunnel) {
            const fromPos = qliphothTreeLayout.positions[tunnel.from];
            const toPos = qliphothTreeLayout.positions[tunnel.to];
            if (fromPos && toPos) {
              position = getMidpoint(fromPos, toPos);
            }
          }
        }

        if (position) {
          found.push({
            type: assoc.type === 'qliphah' ? 'daemon' : 'daemon',
            id: assoc.refId,
            name: daemon.canonicalName,
            matchedOn: matchedTerm,
            score: matchScore,
            view: 'death',
            position,
            sigilUrl: daemon.sigilUrl,
          });
        }
      }
    }
  }

  return found.sort((a, b) => b.score - a.score).slice(0, 10);
}
