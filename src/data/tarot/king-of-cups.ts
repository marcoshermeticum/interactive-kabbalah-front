import type { TarotCard } from './types';

/**
 * King of Cups (cups 14) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const kingOfCups: TarotCard = {
  id: 'kingOfCups',
  arcana: 'minor',
  suit: 'cups',
  rank: 14,
  name: 'King of Cups',
  image: '/tarot/minor/king-of-cups.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'cup-and-sceptre',
      icon: '🏆',
      shape: { type: 'rect', x: 30, y: 62, width: 19, height: 37, radius: 2 },
      i18nKey: 'kingOfCups.regions.cupAndSceptre',
    },
    {
      id: 'cup-and-sceptre-2',
      icon: '🏆',
      shape: { type: 'rect', x: 77, y: 59, width: 13, height: 30, radius: 2 },
      i18nKey: 'kingOfCups.regions.cupAndSceptre',
    },
    {
      id: 'floating-throne',
      icon: '🪨',
      shape: { type: 'rect', x: 14, y: 133, width: 80, height: 14, radius: 2 },
      i18nKey: 'kingOfCups.regions.floatingThrone',
    },
    {
      id: 'leaping-fish',
      icon: '🐟',
      shape: { type: 'rect', x: 5, y: 103, width: 12, height: 12, radius: 2 },
      i18nKey: 'kingOfCups.regions.leapingFish',
    },
    {
      id: 'ship-horizon',
      icon: '🚢',
      shape: { type: 'rect', x: 86, y: 96, width: 9, height: 22, radius: 2 },
      i18nKey: 'kingOfCups.regions.shipHorizon',
    },
  ],
};
