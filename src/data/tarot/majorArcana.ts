import type { TarotCard } from './types';
import { theFool } from './the-fool';
import { theMagician } from './the-magician';
import { theHighPriestess } from './the-high-priestess';
import { theEmpress } from './the-empress';
import { temperance } from './temperance';
import { theEmperor } from './the-emperor';
import { theHierophant } from './the-hierophant';
import { theChariot } from './the-chariot';
import { strength } from './strength';
import { theHermit } from './the-hermit';
import { theLovers } from './the-lovers';
import { wheelOfFortune } from './wheel-of-fortune';
import { justice } from './justice';

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
export type Planet = 'sun' | 'moon' | 'mercury' | 'venus' | 'mars' | 'jupiter' | 'saturn';
export type ZodiacSign =
  | 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo'
  | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';
export type Element = 'fire' | 'water' | 'air' | 'earth';

/**
 * Golden Dawn correspondences, matching the 22 paths of the Tree of Life.
 * Planet/sign/element are optional: planetary cards have no sign or element,
 * elemental cards have neither planet nor sign. For zodiac cards the planet is
 * the traditional ruler of the sign.
 */
export interface Correspondence {
  /** Tree of Life path number (11–32). */
  path: number;
  /** Hebrew letter glyph. */
  letter: string;
  /** Transliterated letter name. */
  letterName: string;
  planet?: Planet;
  sign?: ZodiacSign;
  element?: Element;
}

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
  /** Tree of Life path, Hebrew letter, planet, sign and element. */
  correspondence: Correspondence;
}

export const majorArcana: MajorArcanaEntry[] = [
  { slug: 'the-fool', i18nKey: 'theFool', number: 0, roman: '0', image: '/tarot/the-fool.jpg', correspondence: { path: 11, letter: 'א', letterName: 'Aleph', element: 'air' } },
  { slug: 'the-magician', i18nKey: 'theMagician', number: 1, roman: 'I', image: '/tarot/01_Magician.jpg', correspondence: { path: 12, letter: 'ב', letterName: 'Beth', planet: 'mercury' } },
  { slug: 'the-high-priestess', i18nKey: 'theHighPriestess', number: 2, roman: 'II', image: '/tarot/02_High_Priestess.jpg', correspondence: { path: 13, letter: 'ג', letterName: 'Gimel', planet: 'moon' } },
  { slug: 'the-empress', i18nKey: 'theEmpress', number: 3, roman: 'III', image: '/tarot/03_Empress.jpg', correspondence: { path: 14, letter: 'ד', letterName: 'Daleth', planet: 'venus' } },
  { slug: 'the-emperor', i18nKey: 'theEmperor', number: 4, roman: 'IV', image: '/tarot/04_Emperor.jpg', correspondence: { path: 15, letter: 'ה', letterName: 'Heh', sign: 'aries', planet: 'mars', element: 'fire' } },
  { slug: 'the-hierophant', i18nKey: 'theHierophant', number: 5, roman: 'V', image: '/tarot/05_Hierophant.jpg', correspondence: { path: 16, letter: 'ו', letterName: 'Vav', sign: 'taurus', planet: 'venus', element: 'earth' } },
  { slug: 'the-lovers', i18nKey: 'theLovers', number: 6, roman: 'VI', image: '/tarot/06_Lovers.jpg', correspondence: { path: 17, letter: 'ז', letterName: 'Zayin', sign: 'gemini', planet: 'mercury', element: 'air' } },
  { slug: 'the-chariot', i18nKey: 'theChariot', number: 7, roman: 'VII', image: '/tarot/07_Chariot.jpg', correspondence: { path: 18, letter: 'ח', letterName: 'Cheth', sign: 'cancer', planet: 'moon', element: 'water' } },
  { slug: 'strength', i18nKey: 'strength', number: 8, roman: 'VIII', image: '/tarot/08_Strength.jpg', correspondence: { path: 19, letter: 'ט', letterName: 'Teth', sign: 'leo', planet: 'sun', element: 'fire' } },
  { slug: 'the-hermit', i18nKey: 'theHermit', number: 9, roman: 'IX', image: '/tarot/09_Hermit.jpg', correspondence: { path: 20, letter: 'י', letterName: 'Yod', sign: 'virgo', planet: 'mercury', element: 'earth' } },
  { slug: 'wheel-of-fortune', i18nKey: 'wheelOfFortune', number: 10, roman: 'X', image: '/tarot/10_Wheel_of_Fortune.jpg', correspondence: { path: 21, letter: 'כ', letterName: 'Kaph', planet: 'jupiter' } },
  { slug: 'justice', i18nKey: 'justice', number: 11, roman: 'XI', image: '/tarot/11_Justice.jpg', correspondence: { path: 22, letter: 'ל', letterName: 'Lamed', sign: 'libra', planet: 'venus', element: 'air' } },
  { slug: 'the-hanged-man', i18nKey: 'theHangedMan', number: 12, roman: 'XII', image: '/tarot/12_Hanged_Man.jpg', correspondence: { path: 23, letter: 'מ', letterName: 'Mem', element: 'water' } },
  { slug: 'death', i18nKey: 'death', number: 13, roman: 'XIII', image: '/tarot/13_Death.jpg', correspondence: { path: 24, letter: 'נ', letterName: 'Nun', sign: 'scorpio', planet: 'mars', element: 'water' } },
  { slug: 'temperance', i18nKey: 'temperance', number: 14, roman: 'XIV', image: '/tarot/temperance.jpg', correspondence: { path: 25, letter: 'ס', letterName: 'Samekh', sign: 'sagittarius', planet: 'jupiter', element: 'fire' } },
  { slug: 'the-devil', i18nKey: 'theDevil', number: 15, roman: 'XV', image: '/tarot/15_Devil.jpg', correspondence: { path: 26, letter: 'ע', letterName: 'Ayin', sign: 'capricorn', planet: 'saturn', element: 'earth' } },
  { slug: 'the-tower', i18nKey: 'theTower', number: 16, roman: 'XVI', image: '/tarot/16_Tower.jpg', correspondence: { path: 27, letter: 'פ', letterName: 'Peh', planet: 'mars' } },
  { slug: 'the-star', i18nKey: 'theStar', number: 17, roman: 'XVII', image: '/tarot/17_Star.jpg', correspondence: { path: 28, letter: 'צ', letterName: 'Tzaddi', sign: 'aquarius', planet: 'saturn', element: 'air' } },
  { slug: 'the-moon', i18nKey: 'theMoon', number: 18, roman: 'XVIII', image: '/tarot/18_Moon.jpg', correspondence: { path: 29, letter: 'ק', letterName: 'Qoph', sign: 'pisces', planet: 'jupiter', element: 'water' } },
  { slug: 'the-sun', i18nKey: 'theSun', number: 19, roman: 'XIX', image: '/tarot/19_Sun.jpg', correspondence: { path: 30, letter: 'ר', letterName: 'Resh', planet: 'sun' } },
  { slug: 'judgement', i18nKey: 'judgement', number: 20, roman: 'XX', image: '/tarot/20_Judgement.jpg', correspondence: { path: 31, letter: 'ש', letterName: 'Shin', element: 'fire' } },
  { slug: 'the-world', i18nKey: 'theWorld', number: 21, roman: 'XXI', image: '/tarot/21_World.jpg', correspondence: { path: 32, letter: 'ת', letterName: 'Tav', planet: 'saturn' } },
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
  'the-chariot': theChariot,
  'strength': strength,
  'the-hermit': theHermit,
  'the-lovers': theLovers,
  'wheel-of-fortune': wheelOfFortune,
  'justice': justice,
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
