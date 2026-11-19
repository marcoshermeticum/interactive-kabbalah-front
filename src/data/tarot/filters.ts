import { majorArcana, type Element, type MajorArcanaEntry, type ZodiacSign } from './majorArcana';
import { minorArcana, type MinorArcanaEntry, type Sephirah } from './minorArcana';

/**
 * Facets used by the advanced filters of the tarot catalog.
 *
 * - element: major arcana use their own correspondence (cards that are only
 *   planetary have none); minor arcana use the element of the suit.
 * - sign: the zodiac sign of the card (majors) or of its decan (minor 2-10).
 *   Aces, courts and planetary/elemental majors have none.
 * - sephirah: minor arcana 1-10 use the sephirah of their number. A major
 *   arcanum is a path of the Tree of Life, so it matches the two sephiroth the
 *   path connects.
 */
export const FILTER_ELEMENTS: Element[] = ['fire', 'water', 'air', 'earth'];

export const FILTER_SIGNS: ZodiacSign[] = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
];

export const FILTER_SEPHIROTH: Sephirah[] = [
  'kether', 'chokmah', 'binah', 'chesed', 'gevurah',
  'tiferet', 'netzach', 'hod', 'yesod', 'malkuth',
];

/** The two sephiroth joined by each of the 22 paths (11-32), as drawn on the tree. */
export const PATH_SEPHIROTH: Record<number, [Sephirah, Sephirah]> = {
  11: ['kether', 'chokmah'],
  12: ['kether', 'binah'],
  13: ['kether', 'tiferet'],
  14: ['chokmah', 'binah'],
  15: ['chokmah', 'tiferet'],
  16: ['chokmah', 'chesed'],
  17: ['binah', 'tiferet'],
  18: ['binah', 'gevurah'],
  19: ['gevurah', 'chesed'],
  20: ['chesed', 'tiferet'],
  21: ['chesed', 'netzach'],
  22: ['gevurah', 'tiferet'],
  23: ['gevurah', 'hod'],
  24: ['tiferet', 'netzach'],
  25: ['tiferet', 'yesod'],
  26: ['tiferet', 'hod'],
  27: ['hod', 'netzach'],
  28: ['netzach', 'yesod'],
  29: ['netzach', 'malkuth'],
  30: ['hod', 'yesod'],
  31: ['hod', 'malkuth'],
  32: ['yesod', 'malkuth'],
};

export interface CardFacets {
  element?: Element;
  sign?: ZodiacSign;
  sephiroth: Sephirah[];
}

export interface CardFilters {
  element: Element | null;
  sign: ZodiacSign | null;
  sephirah: Sephirah | null;
}

export const NO_FILTERS: CardFilters = { element: null, sign: null, sephirah: null };

export function activeFilterCount(filters: CardFilters): number {
  return [filters.element, filters.sign, filters.sephirah].filter(Boolean).length;
}

export function majorFacets(entry: MajorArcanaEntry): CardFacets {
  const { element, sign, path } = entry.correspondence;
  return { element, sign, sephiroth: PATH_SEPHIROTH[path] ?? [] };
}

export function minorFacets(entry: MinorArcanaEntry): CardFacets {
  const { element, sign, sephirah } = entry.correspondence;
  return { element, sign, sephiroth: sephirah ? [sephirah] : [] };
}

export function matchesFilters(facets: CardFacets, filters: CardFilters): boolean {
  if (filters.element && facets.element !== filters.element) return false;
  if (filters.sign && facets.sign !== filters.sign) return false;
  if (filters.sephirah && !facets.sephiroth.includes(filters.sephirah)) return false;
  return true;
}

/** Facets by slug, computed once. */
const FACETS_BY_SLUG = new Map<string, CardFacets>([
  ...majorArcana.map((entry): [string, CardFacets] => [entry.slug, majorFacets(entry)]),
  ...minorArcana.map((entry): [string, CardFacets] => [entry.slug, minorFacets(entry)]),
]);

export function cardMatches(slug: string, filters: CardFilters): boolean {
  const facets = FACETS_BY_SLUG.get(slug);
  return facets ? matchesFilters(facets, filters) : false;
}
