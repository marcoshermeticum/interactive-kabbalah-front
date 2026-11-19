import type { TarotCard } from './types';

/**
 * Knight of Cups (cups 12) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const knightOfCups: TarotCard = {
  id: 'knightOfCups',
  arcana: 'minor',
  suit: 'cups',
  rank: 12,
  name: 'Knight of Cups',
  image: '/tarot/minor/knight-of-cups.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'offered-cup',
      icon: '🏆',
      shape: { type: 'rect', x: 56, y: 32, width: 18, height: 36, radius: 2 },
      i18nKey: 'knightOfCups.regions.offeredCup',
    },
    {
      id: 'winged-helmet',
      icon: '🪽',
      shape: { type: 'rect', x: 5, y: 11, width: 39, height: 28, radius: 2 },
      i18nKey: 'knightOfCups.regions.wingedHelmet',
    },
    {
      id: 'white-horse',
      icon: '🐴',
      shape: { type: 'rect', x: 62, y: 69, width: 33, height: 34, radius: 2 },
      i18nKey: 'knightOfCups.regions.whiteHorse',
    },
    {
      id: 'white-horse-2',
      icon: '🐴',
      shape: { type: 'rect', x: 4, y: 66, width: 24, height: 50, radius: 2 },
      i18nKey: 'knightOfCups.regions.whiteHorse',
    },
    {
      id: 'river-mountains',
      icon: '🏞️',
      shape: { type: 'rect', x: 62, y: 108, width: 33, height: 35, radius: 2 },
      i18nKey: 'knightOfCups.regions.riverMountains',
    },
    {
      id: 'river-mountains-2',
      icon: '🏞️',
      shape: { type: 'rect', x: 4, y: 134, width: 55, height: 17, radius: 2 },
      i18nKey: 'knightOfCups.regions.riverMountains',
    },
  ],
};
