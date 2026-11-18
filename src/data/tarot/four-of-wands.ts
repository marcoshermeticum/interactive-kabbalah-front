import type { TarotCard } from './types';

/**
 * Four of Wands (wands 4) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const fourOfWands: TarotCard = {
  id: 'fourOfWands',
  arcana: 'minor',
  suit: 'wands',
  rank: 4,
  name: 'Four of Wands',
  image: '/tarot/minor/four-of-wands.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'garland-canopy',
      icon: '💐',
      shape: { type: 'rect', x: 25.6, y: 44.7, width: 51.9, height: 10.6 },
      i18nKey: 'fourOfWands.regions.garlandCanopy',
    },
    {
      id: 'four-wands',
      icon: '🪄',
      shape: { type: 'rect', x: 12.1, y: 32.9, width: 14, height: 120.7 },
      i18nKey: 'fourOfWands.regions.fourWands',
    },
    {
      id: 'four-wands-2',
      icon: '🪄',
      shape: { type: 'rect', x: 23, y: 23.4, width: 14, height: 130.2 },
      i18nKey: 'fourOfWands.regions.fourWands',
    },
    {
      id: 'four-wands-3',
      icon: '🪄',
      shape: { type: 'rect', x: 63.4, y: 30.3, width: 14, height: 118.3 },
      i18nKey: 'fourOfWands.regions.fourWands',
    },
    {
      id: 'four-wands-4',
      icon: '🪄',
      shape: { type: 'rect', x: 77.1, y: 18.8, width: 14, height: 122.2 },
      i18nKey: 'fourOfWands.regions.fourWands',
    },
    {
      id: 'celebrating-couple',
      icon: '💃',
      shape: { type: 'rect', x: 38.2, y: 100.6, width: 25.2, height: 39.3 },
      i18nKey: 'fourOfWands.regions.celebratingCouple',
    },
    {
      id: 'castle-gate',
      icon: '🏰',
      shape: { type: 'rect', x: 48, y: 84.4, width: 14, height: 10 },
      i18nKey: 'fourOfWands.regions.castleGate',
    },
  ],
};
