import type { TarotCard } from './types';

/**
 * Seven of Wands (wands 7) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const sevenOfWands: TarotCard = {
  id: 'sevenOfWands',
  arcana: 'minor',
  suit: 'wands',
  rank: 7,
  name: 'Seven of Wands',
  image: '/tarot/minor/seven-of-wands.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'defender',
      icon: '🛡️',
      shape: { type: 'circle', x: 45.7, y: 50.4, width: 19.7, height: 16.5 },
      i18nKey: 'sevenOfWands.regions.defender',
    },
    {
      id: 'six-wands-below',
      icon: '🪄',
      shape: { type: 'rect', x: 3.9, y: 104.4, width: 92, height: 25.5 },
      i18nKey: 'sevenOfWands.regions.sixWandsBelow',
    },
    {
      id: 'mismatched-shoes',
      icon: '👞',
      shape: { type: 'circle', x: 6.7, y: 137.9, width: 17, height: 10.8 },
      i18nKey: 'sevenOfWands.regions.mismatchedShoes',
    },
    {
      id: 'mismatched-shoes-2',
      icon: '👞',
      shape: { type: 'circle', x: 56.4, y: 132.5, width: 18.2, height: 14.9 },
      i18nKey: 'sevenOfWands.regions.mismatchedShoes',
    },
    {
      id: 'high-ground',
      icon: '⛰️',
      shape: { type: 'rect', x: 4.7, y: 151.3, width: 88.6, height: 12.5 },
      i18nKey: 'sevenOfWands.regions.highGround',
    },
  ],
};
