import type { TarotCard } from './types';

/**
 * Three of Wands (wands 3) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const threeOfWands: TarotCard = {
  id: 'threeOfWands',
  arcana: 'minor',
  suit: 'wands',
  rank: 3,
  name: 'Three of Wands',
  image: '/tarot/minor/three-of-wands.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'man-from-behind',
      icon: '🧍',
      shape: { type: 'rect', x: 32.1, y: 55.6, width: 27, height: 94.4 },
      i18nKey: 'threeOfWands.regions.manFromBehind',
    },
    {
      id: 'three-wands',
      icon: '🪄',
      shape: { type: 'rect', x: 11.9, y: 24.2, width: 14, height: 86.9 },
      i18nKey: 'threeOfWands.regions.threeWands',
    },
    {
      id: 'three-wands-2',
      icon: '🪄',
      shape: { type: 'rect', x: 62.4, y: 31.7, width: 14, height: 91 },
      i18nKey: 'threeOfWands.regions.threeWands',
    },
    {
      id: 'three-wands-3',
      icon: '🪄',
      shape: { type: 'rect', x: 76.4, y: 23.2, width: 14, height: 103.9 },
      i18nKey: 'threeOfWands.regions.threeWands',
    },
    {
      id: 'ships-sea',
      icon: '⛵',
      shape: { type: 'rect', x: 73.5, y: 130.4, width: 14, height: 10 },
      i18nKey: 'threeOfWands.regions.shipsSea',
    },
    {
      id: 'golden-sky',
      icon: '🌅',
      shape: { type: 'rect', x: 11.9, y: 6.2, width: 77, height: 10 },
      i18nKey: 'threeOfWands.regions.goldenSky',
    },
  ],
};
