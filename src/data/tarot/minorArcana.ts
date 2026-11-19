import type { TarotCard } from './types';
import type { Element, Planet, ZodiacSign } from './majorArcana';
import { aceOfWands } from './ace-of-wands';
import { twoOfWands } from './two-of-wands';
import { threeOfWands } from './three-of-wands';
import { fourOfWands } from './four-of-wands';
import { fiveOfWands } from './five-of-wands';
import { sixOfWands } from './six-of-wands';
import { sevenOfWands } from './seven-of-wands';
import { queenOfWands } from './queen-of-wands';
import { eightOfWands } from './eight-of-wands';
import { nineOfWands } from './nine-of-wands';
import { tenOfWands } from './ten-of-wands';
import { pageOfWands } from './page-of-wands';
import { knightOfWands } from './knight-of-wands';
import { kingOfWands } from './king-of-wands';
import { aceOfCups } from './ace-of-cups';
import { twoOfCups } from './two-of-cups';
import { threeOfCups } from './three-of-cups';
import { fourOfCups } from './four-of-cups';
import { fiveOfCups } from './five-of-cups';
import { sixOfCups } from './six-of-cups';
import { sevenOfCups } from './seven-of-cups';
import { eightOfCups } from './eight-of-cups';
import { nineOfCups } from './nine-of-cups';
import { tenOfCups } from './ten-of-cups';
import { pageOfCups } from './page-of-cups';
import { knightOfCups } from './knight-of-cups';
import { queenOfCups } from './queen-of-cups';
import { kingOfCups } from './king-of-cups';
import { aceOfSwords } from './ace-of-swords';
import { twoOfSwords } from './two-of-swords';
import { threeOfSwords } from './three-of-swords';
import { fourOfSwords } from './four-of-swords';
import { fiveOfSwords } from './five-of-swords';
import { sixOfSwords } from './six-of-swords';
import { sevenOfSwords } from './seven-of-swords';
import { eightOfSwords } from './eight-of-swords';
import { nineOfSwords } from './nine-of-swords';
import { tenOfSwords } from './ten-of-swords';
import { pageOfSwords } from './page-of-swords';
import { knightOfSwords } from './knight-of-swords';
import { queenOfSwords } from './queen-of-swords';
import { kingOfSwords } from './king-of-swords';
import { aceOfPentacles } from './ace-of-pentacles';
import { twoOfPentacles } from './two-of-pentacles';
import { threeOfPentacles } from './three-of-pentacles';
import { fourOfPentacles } from './four-of-pentacles';
import { fiveOfPentacles } from './five-of-pentacles';
import { sixOfPentacles } from './six-of-pentacles';
import { sevenOfPentacles } from './seven-of-pentacles';
import { eightOfPentacles } from './eight-of-pentacles';
import { nineOfPentacles } from './nine-of-pentacles';
import { tenOfPentacles } from './ten-of-pentacles';
import { pageOfPentacles } from './page-of-pentacles';
import { knightOfPentacles } from './knight-of-pentacles';
import { queenOfPentacles } from './queen-of-pentacles';
import { kingOfPentacles } from './king-of-pentacles';

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
  'six-of-wands': sixOfWands,
  'seven-of-wands': sevenOfWands,
  'queen-of-wands': queenOfWands,
  'eight-of-wands': eightOfWands,
  'nine-of-wands': nineOfWands,
  'ten-of-wands': tenOfWands,
  'page-of-wands': pageOfWands,
  'knight-of-wands': knightOfWands,
  'king-of-wands': kingOfWands,
  'ace-of-cups': aceOfCups,
  'two-of-cups': twoOfCups,
  'three-of-cups': threeOfCups,
  'four-of-cups': fourOfCups,
  'five-of-cups': fiveOfCups,
  'six-of-cups': sixOfCups,
  'seven-of-cups': sevenOfCups,
  'eight-of-cups': eightOfCups,
  'nine-of-cups': nineOfCups,
  'ten-of-cups': tenOfCups,
  'page-of-cups': pageOfCups,
  'knight-of-cups': knightOfCups,
  'queen-of-cups': queenOfCups,
  'king-of-cups': kingOfCups,
  'ace-of-swords': aceOfSwords,
  'two-of-swords': twoOfSwords,
  'three-of-swords': threeOfSwords,
  'four-of-swords': fourOfSwords,
  'five-of-swords': fiveOfSwords,
  'six-of-swords': sixOfSwords,
  'seven-of-swords': sevenOfSwords,
  'eight-of-swords': eightOfSwords,
  'nine-of-swords': nineOfSwords,
  'ten-of-swords': tenOfSwords,
  'page-of-swords': pageOfSwords,
  'knight-of-swords': knightOfSwords,
  'queen-of-swords': queenOfSwords,
  'king-of-swords': kingOfSwords,
  'ace-of-pentacles': aceOfPentacles,
  'two-of-pentacles': twoOfPentacles,
  'three-of-pentacles': threeOfPentacles,
  'four-of-pentacles': fourOfPentacles,
  'five-of-pentacles': fiveOfPentacles,
  'six-of-pentacles': sixOfPentacles,
  'seven-of-pentacles': sevenOfPentacles,
  'eight-of-pentacles': eightOfPentacles,
  'nine-of-pentacles': nineOfPentacles,
  'ten-of-pentacles': tenOfPentacles,
  'page-of-pentacles': pageOfPentacles,
  'knight-of-pentacles': knightOfPentacles,
  'queen-of-pentacles': queenOfPentacles,
  'king-of-pentacles': kingOfPentacles,
};
