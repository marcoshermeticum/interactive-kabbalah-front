import type { TarotCard } from './types';
import { theFool } from './the-fool';
import { theMagician } from './the-magician';
import { theHighPriestess } from './the-high-priestess';
import { theEmpress } from './the-empress';
import { temperance } from './temperance';
import { theEmperor } from './the-emperor';
import { theHierophant } from './the-hierophant';

/**
 * Catalog of the 22 Rider-Waite major arcana, in RWS order.
 *
 * `slug` is the kebab-case segment used by the URL and by the artwork file
 * convention (e.g. "the-magician"), while `i18nKey` is the camelCase key
 * under the `tarot` / `tarotWaite.cards` namespaces (e.g. "theMagician").
 * `image` points at the artwork currently available under `public/tarot`;
 * the files still carry their numeric prefixes for the cards that have not
 * been migrated yet.
 */
export interface MajorArcanaEntry {
  /** URL slug, also used as the `[id]` route param. */
  slug: string;
  /** camelCase key under `tarot` / `tarotWaite.cards.*`. */
  i18nKey: string;
  /** Major arcana number (0–21). */
  number: number;
  /** Roman numeral used as a visual label. */
  roman: string;
  /** Public path to the artwork. */
  image: string;
}

export const majorArcana: MajorArcanaEntry[] = [
  { slug: 'the-fool', i18nKey: 'theFool', number: 0, roman: '0', image: '/tarot/the-fool.jpg' },
  { slug: 'the-magician', i18nKey: 'theMagician', number: 1, roman: 'I', image: '/tarot/01_Magician.jpg' },
  { slug: 'the-high-priestess', i18nKey: 'theHighPriestess', number: 2, roman: 'II', image: '/tarot/02_High_Priestess.jpg' },
  { slug: 'the-empress', i18nKey: 'theEmpress', number: 3, roman: 'III', image: '/tarot/03_Empress.jpg' },
  { slug: 'the-emperor', i18nKey: 'theEmperor', number: 4, roman: 'IV', image: '/tarot/04_Emperor.jpg' },
  { slug: 'the-hierophant', i18nKey: 'theHierophant', number: 5, roman: 'V', image: '/tarot/05_Hierophant.jpg' },
  { slug: 'the-lovers', i18nKey: 'theLovers', number: 6, roman: 'VI', image: '/tarot/06_Lovers.jpg' },
  { slug: 'the-chariot', i18nKey: 'theChariot', number: 7, roman: 'VII', image: '/tarot/07_Chariot.jpg' },
  { slug: 'strength', i18nKey: 'strength', number: 8, roman: 'VIII', image: '/tarot/08_Strength.jpg' },
  { slug: 'the-hermit', i18nKey: 'theHermit', number: 9, roman: 'IX', image: '/tarot/09_Hermit.jpg' },
  { slug: 'wheel-of-fortune', i18nKey: 'wheelOfFortune', number: 10, roman: 'X', image: '/tarot/10_Wheel_of_Fortune.jpg' },
  { slug: 'justice', i18nKey: 'justice', number: 11, roman: 'XI', image: '/tarot/11_Justice.jpg' },
  { slug: 'the-hanged-man', i18nKey: 'theHangedMan', number: 12, roman: 'XII', image: '/tarot/12_Hanged_Man.jpg' },
  { slug: 'death', i18nKey: 'death', number: 13, roman: 'XIII', image: '/tarot/13_Death.jpg' },
  { slug: 'temperance', i18nKey: 'temperance', number: 14, roman: 'XIV', image: '/tarot/temperance.jpg' },
  { slug: 'the-devil', i18nKey: 'theDevil', number: 15, roman: 'XV', image: '/tarot/15_Devil.jpg' },
  { slug: 'the-tower', i18nKey: 'theTower', number: 16, roman: 'XVI', image: '/tarot/16_Tower.jpg' },
  { slug: 'the-star', i18nKey: 'theStar', number: 17, roman: 'XVII', image: '/tarot/17_Star.jpg' },
  { slug: 'the-moon', i18nKey: 'theMoon', number: 18, roman: 'XVIII', image: '/tarot/18_Moon.jpg' },
  { slug: 'the-sun', i18nKey: 'theSun', number: 19, roman: 'XIX', image: '/tarot/19_Sun.jpg' },
  { slug: 'judgement', i18nKey: 'judgement', number: 20, roman: 'XX', image: '/tarot/20_Judgement.jpg' },
  { slug: 'the-world', i18nKey: 'theWorld', number: 21, roman: 'XXI', image: '/tarot/21_World.jpg' },
];

/**
 * Cards that already have interactive data (and therefore a working single).
 * Any other catalog entry renders the "coming soon" state instead.
 */
const cardData: Record<string, TarotCard> = {
  'the-fool': theFool,
  'the-magician': theMagician,
  'the-high-priestess': theHighPriestess,
  'the-empress': theEmpress,
  temperance,
  'the-emperor': theEmperor,
  'the-hierophant': theHierophant,
};

export function getMajorArcana(slug: string): MajorArcanaEntry | undefined {
  return majorArcana.find((entry) => entry.slug === slug);
}

export function getTarotCard(slug: string): TarotCard | undefined {
  return cardData[slug];
}

export function isCardAvailable(slug: string): boolean {
  return slug in cardData;
}
