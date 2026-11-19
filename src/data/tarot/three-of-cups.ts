import type { TarotCard } from './types';

/**
 * Three of Cups (cups 3) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const threeOfCups: TarotCard = {
  id: 'threeOfCups',
  arcana: 'minor',
  suit: 'cups',
  rank: 3,
  name: 'Three of Cups',
  image: '/tarot/minor/three-of-cups.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'raised-cups',
      icon: '🥂',
      shape: { type: 'rect', x: 28, y: 12, width: 47, height: 27, radius: 2 },
      i18nKey: 'threeOfCups.regions.raisedCups',
    },
    {
      id: 'dancing-women',
      icon: '💃',
      shape: { type: 'rect', x: 17, y: 56, width: 13, height: 60, radius: 2 },
      i18nKey: 'threeOfCups.regions.dancingWomen',
    },
    {
      id: 'dancing-women-2',
      icon: '💃',
      shape: { type: 'rect', x: 31, y: 56, width: 29, height: 85, radius: 2 },
      i18nKey: 'threeOfCups.regions.dancingWomen',
    },
    {
      id: 'dancing-women-3',
      icon: '💃',
      shape: { type: 'rect', x: 61, y: 56, width: 26, height: 85, radius: 2 },
      i18nKey: 'threeOfCups.regions.dancingWomen',
    },
    {
      id: 'flower-garlands',
      icon: '🌸',
      shape: { type: 'rect', x: 17, y: 40, width: 16, height: 15, radius: 2 },
      i18nKey: 'threeOfCups.regions.flowerGarlands',
    },
    {
      id: 'flower-garlands-2',
      icon: '🌸',
      shape: { type: 'rect', x: 66, y: 40, width: 18, height: 15, radius: 2 },
      i18nKey: 'threeOfCups.regions.flowerGarlands',
    },
    {
      id: 'harvest-fruits',
      icon: '🎃',
      shape: { type: 'rect', x: 4, y: 118, width: 18, height: 32, radius: 2 },
      i18nKey: 'threeOfCups.regions.harvestFruits',
    },
    {
      id: 'harvest-fruits-2',
      icon: '🎃',
      shape: { type: 'rect', x: 64, y: 143, width: 30, height: 15, radius: 2 },
      i18nKey: 'threeOfCups.regions.harvestFruits',
    },
  ],
};
