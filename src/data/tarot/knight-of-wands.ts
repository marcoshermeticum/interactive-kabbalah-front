import type { TarotCard } from './types';

/**
 * Knight of Wands (wands 12) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const knightOfWands: TarotCard = {
  id: 'knightOfWands',
  arcana: 'minor',
  suit: 'wands',
  rank: 12,
  name: 'Knight of Wands',
  image: '/tarot/minor/knight-of-wands.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'rearing-horse',
      icon: '🐎',
      shape: { type: 'rect', x: 5, y: 52, width: 43, height: 74, radius: 2 },
      i18nKey: 'knightOfWands.regions.rearingHorse',
    },
    {
      id: 'red-plume',
      icon: '🪶',
      shape: { type: 'rect', x: 72, y: 20, width: 21, height: 24, radius: 2 },
      i18nKey: 'knightOfWands.regions.redPlume',
    },
    {
      id: 'salamander-surcoat',
      icon: '🦎',
      shape: { type: 'rect', x: 50, y: 48, width: 28, height: 56, radius: 2 },
      i18nKey: 'knightOfWands.regions.salamanderSurcoat',
    },
    {
      id: 'desert-ride',
      icon: '🏜️',
      shape: { type: 'rect', x: 5, y: 130, width: 85, height: 21, radius: 2 },
      i18nKey: 'knightOfWands.regions.desertRide',
    },
  ],
};
