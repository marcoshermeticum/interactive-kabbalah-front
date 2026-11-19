import type { TarotCard } from './types';

/**
 * Six of Swords (swords 6) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const sixOfSwords: TarotCard = {
  id: 'sixOfSwords',
  arcana: 'minor',
  suit: 'swords',
  rank: 6,
  name: 'Six of Swords',
  image: '/tarot/minor/six-of-swords.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'ferryman',
      icon: '🛶',
      shape: { type: 'rect', x: 11, y: 20, width: 29, height: 122, radius: 2 },
      i18nKey: 'sixOfSwords.regions.ferryman',
    },
    {
      id: 'hooded-passengers',
      icon: '🧕',
      shape: { type: 'rect', x: 40, y: 100, width: 38, height: 42, radius: 2 },
      i18nKey: 'sixOfSwords.regions.hoodedPassengers',
    },
    {
      id: 'six-swords-hull',
      icon: '🗡️',
      shape: { type: 'rect', x: 45, y: 51, width: 50, height: 48, radius: 2 },
      i18nKey: 'sixOfSwords.regions.sixSwordsHull',
    },
    {
      id: 'six-swords-hull-2',
      icon: '🗡️',
      shape: { type: 'rect', x: 4, y: 143, width: 55, height: 19, radius: 2 },
      i18nKey: 'sixOfSwords.regions.sixSwordsHull',
    },
    {
      id: 'six-swords-hull-3',
      icon: '🗡️',
      shape: { type: 'rect', x: 79, y: 100, width: 16, height: 42, radius: 2 },
      i18nKey: 'sixOfSwords.regions.sixSwordsHull',
    },
    {
      id: 'two-waters',
      icon: '🌊',
      shape: { type: 'rect', x: 4, y: 62, width: 7, height: 55, radius: 2 },
      i18nKey: 'sixOfSwords.regions.twoWaters',
    },
    {
      id: 'two-waters-2',
      icon: '🌊',
      shape: { type: 'rect', x: 60, y: 143, width: 35, height: 19, radius: 2 },
      i18nKey: 'sixOfSwords.regions.twoWaters',
    },
  ],
};
