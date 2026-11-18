import type { TarotCard } from './types';

/**
 * Two of Wands (wands 2) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const twoOfWands: TarotCard = {
  id: 'twoOfWands',
  arcana: 'minor',
  suit: 'wands',
  rank: 2,
  name: 'Two of Wands',
  image: '/tarot/minor/two-of-wands.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'globe',
      icon: '🌍',
      shape: { type: 'rect', x: 27.6, y: 57.6, width: 14, height: 10 },
      i18nKey: 'twoOfWands.regions.globe',
    },
    {
      id: 'two-wands',
      icon: '🪄',
      shape: { type: 'rect', x: 14.8, y: 19.6, width: 14, height: 69.2 },
      i18nKey: 'twoOfWands.regions.twoWands',
    },
    {
      id: 'two-wands-2',
      icon: '🪄',
      shape: { type: 'rect', x: 74.2, y: 40.4, width: 14, height: 106.7 },
      i18nKey: 'twoOfWands.regions.twoWands',
    },
    {
      id: 'sea-horizon',
      icon: '🌊',
      shape: { type: 'rect', x: 5.7, y: 92.4, width: 33.2, height: 13 },
      i18nKey: 'twoOfWands.regions.seaHorizon',
    },
    {
      id: 'rose-lily-emblem',
      icon: '🌹',
      shape: { type: 'rect', x: 5.5, y: 119.4, width: 19, height: 24.9 },
      i18nKey: 'twoOfWands.regions.roseLilyEmblem',
    },
  ],
};
