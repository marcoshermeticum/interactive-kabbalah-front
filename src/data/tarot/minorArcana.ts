import type { TarotCard } from './types';
import type { Element, Planet, ZodiacSign } from './majorArcana';
import { aceOfWands } from './ace-of-wands';
import { twoOfWands } from './two-of-wands';
import { threeOfWands } from './three-of-wands';
import { fourOfWands } from './four-of-wands';
import { fiveOfWands } from './five-of-wands';

/**
 * Catalog of the 56 Rider-Waite minor arcana (4 suits x 14 ranks).
 *
 * Slugs follow `<rank>-of-<suit>` (e.g. "ace-of-wands", "page-of-cups") and
 * double as the URL segment and artwork file name (`public/tarot/minor/`).
 * `i18nKey` is the camelCase form (`aceOfWands`) used under
 * `tarotWaite.cards.*` (name + summary) and `tarot.*` (interactive regions).
 *
 * Correspondences follow the Golden Dawn:
 *  - Aces to tens: the sephirah of the number (Ace = Kether ... Ten = Malkuth).
 *  - Twos to tens: the decan (planet + sign) of the suit's element.
 *  - Court cards: a letter of the Tetragrammaton (Yod-Heh-Vav-Heh) and the
 *    element within the suit's element (e.g. Queen of Cups = water of water).
 */
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles';

export type MinorRank =
  | 'ace' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven'
  | 'eight' | 'nine' | 'ten' | 'page' | 'knight' | 'queen' | 'king';

export type Sephirah =
  | 'kether' | 'chokmah' | 'binah' | 'chesed' | 'gevurah'
  | 'tiferet' | 'netzach' | 'hod' | 'yesod' | 'malkuth';

export interface MinorCorrespondence {
  /** Element of the suit. */
  element: Element;
  /** Sephirah of the number (aces to tens). */
  sephirah?: Sephirah;
  /** Decan ruler (twos to tens). */
  planet?: Planet;
  /** Decan sign (twos to tens). */
  sign?: ZodiacSign;
  /** Hebrew letter of the Tetragrammaton (court cards). */
  letter?: string;
  letterName?: string;
  /** Element of the court card within the suit (court cards). */
  courtElement?: Element;
}

export interface MinorArcanaEntry {
  /** URL slug, also the `[id]` route param. */
  slug: string;
  /** camelCase key under `tarot` / `tarotWaite.cards.*`. */
  i18nKey: string;
  suit: Suit;
  rank: MinorRank;
  /** 1 (Ace) to 14 (King). */
  number: number;
  /** Public path to the artwork. */
  image: string;
  correspondence: MinorCorrespondence;
}

export const SUITS: Suit[] = ['wands', 'cups', 'swords', 'pentacles'];

export const SUIT_ELEMENT: Record<Suit, Element> = {
  wands: 'fire',
  cups: 'water',
  swords: 'air',
  pentacles: 'earth',
};

const RANKS: MinorRank[] = [
  'ace', 'two', 'three', 'four', 'five', 'six', 'seven',
  'eight', 'nine', 'ten', 'page', 'knight', 'queen', 'king',
];

const SEPHIROTH: Sephirah[] = [
  'kether', 'chokmah', 'binah', 'chesed', 'gevurah',
  'tiferet', 'netzach', 'hod', 'yesod', 'malkuth',
];

/** Golden Dawn decans for the 2-10 of each suit: [planet, sign]. */
const DECANS: Record<Suit, [Planet, ZodiacSign][]> = {
  wands: [
    ['mars', 'aries'], ['sun', 'aries'], ['venus', 'aries'],
    ['saturn', 'leo'], ['jupiter', 'leo'], ['mars', 'leo'],
    ['mercury', 'sagittarius'], ['moon', 'sagittarius'], ['saturn', 'sagittarius'],
  ],
  cups: [
    ['venus', 'cancer'], ['mercury', 'cancer'], ['moon', 'cancer'],
    ['mars', 'scorpio'], ['sun', 'scorpio'], ['venus', 'scorpio'],
    ['saturn', 'pisces'], ['jupiter', 'pisces'], ['mars', 'pisces'],
  ],
  swords: [
    ['moon', 'libra'], ['saturn', 'libra'], ['jupiter', 'libra'],
    ['venus', 'aquarius'], ['mercury', 'aquarius'], ['moon', 'aquarius'],
    ['jupiter', 'gemini'], ['mars', 'gemini'], ['sun', 'gemini'],
  ],
  pentacles: [
    ['jupiter', 'capricorn'], ['mars', 'capricorn'], ['sun', 'capricorn'],
    ['mercury', 'taurus'], ['moon', 'taurus'], ['saturn', 'taurus'],
    ['sun', 'virgo'], ['venus', 'virgo'], ['mercury', 'virgo'],
  ],
};

/** Court ranks (RWS names) mapped to the Golden Dawn Tetragrammaton. */
const COURT: Record<'page' | 'knight' | 'queen' | 'king', { letter: string; letterName: string; element: Element }> = {
  king: { letter: 'י', letterName: 'Yod', element: 'fire' },
  queen: { letter: 'ה', letterName: 'Heh', element: 'water' },
  knight: { letter: 'ו', letterName: 'Vav', element: 'air' },
  page: { letter: 'ה', letterName: 'Heh', element: 'earth' },
};

function toCamel(value: string): string {
  return value.replace(/-([a-z])/g, (_match, char: string) => char.toUpperCase());
}

function buildEntry(suit: Suit, index: number): MinorArcanaEntry {
  const rank = RANKS[index];
  const number = index + 1;
  const slug = `${rank}-of-${suit}`;
  const correspondence: MinorCorrespondence = { element: SUIT_ELEMENT[suit] };

  if (number <= 10) {
    correspondence.sephirah = SEPHIROTH[index];
  }
  if (number >= 2 && number <= 10) {
    const [planet, sign] = DECANS[suit][index - 1];
    correspondence.planet = planet;
    correspondence.sign = sign;
  }
  if (rank === 'page' || rank === 'knight' || rank === 'queen' || rank === 'king') {
    const court = COURT[rank];
    correspondence.letter = court.letter;
    correspondence.letterName = court.letterName;
    correspondence.courtElement = court.element;
  }

  return {
    slug,
    i18nKey: toCamel(slug),
    suit,
    rank,
    number,
    image: `/tarot/minor/${slug}.jpg`,
    correspondence,
  };
}

export const minorArcana: MinorArcanaEntry[] = SUITS.flatMap((suit) =>
  RANKS.map((_rank, index) => buildEntry(suit, index))
);

export function getMinorArcana(slug: string): MinorArcanaEntry | undefined {
  return minorArcana.find((entry) => entry.slug === slug);
}

export function getMinorArcanaBySuit(suit: Suit): MinorArcanaEntry[] {
  return minorArcana.filter((entry) => entry.suit === suit);
}

/**
 * Minor arcana that already have interactive data (and therefore a working
 * single). The others render the "coming soon" state. `npm run tarot:new`
 * adds an import and an entry here.
 */
export const minorCardData: Record<string, TarotCard> = {
  'ace-of-wands': aceOfWands,
  'two-of-wands': twoOfWands,
  'three-of-wands': threeOfWands,
  'four-of-wands': fourOfWands,
  'five-of-wands': fiveOfWands,
};
