import type { TarotCard } from './types';

/**
 * Two of Cups (cups 2) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const twoOfCups: TarotCard = {
  id: 'twoOfCups',
  arcana: 'minor',
  suit: 'cups',
  rank: 2,
  name: 'Two of Cups',
  image: '/tarot/minor/two-of-cups.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'cup-exchange',
      icon: '🥂',
      shape: { type: 'rect', x: 37, y: 60, width: 25, height: 30, radius: 2 },
      i18nKey: 'twoOfCups.regions.cupExchange',
    },
    {
      id: 'winged-caduceus',
      icon: '🦁',
      shape: { type: 'rect', x: 40, y: 12, width: 22, height: 48, radius: 2 },
      i18nKey: 'twoOfCups.regions.wingedCaduceus',
    },
    {
      id: 'winged-caduceus-2',
      icon: '🦁',
      shape: { type: 'rect', x: 11, y: 15, width: 28, height: 18, radius: 2 },
      i18nKey: 'twoOfCups.regions.wingedCaduceus',
    },
    {
      id: 'winged-caduceus-3',
      icon: '🦁',
      shape: { type: 'rect', x: 65, y: 15, width: 28, height: 22, radius: 2 },
      i18nKey: 'twoOfCups.regions.wingedCaduceus',
    },
    {
      id: 'couple-wreaths',
      icon: '💞',
      shape: { type: 'rect', x: 11, y: 44, width: 25, height: 105, radius: 2 },
      i18nKey: 'twoOfCups.regions.coupleWreaths',
    },
    {
      id: 'couple-wreaths-2',
      icon: '💞',
      shape: { type: 'rect', x: 63, y: 40, width: 27, height: 110, radius: 2 },
      i18nKey: 'twoOfCups.regions.coupleWreaths',
    },
    {
      id: 'house-hill',
      icon: '🏡',
      shape: { type: 'rect', x: 37, y: 116, width: 26, height: 22, radius: 2 },
      i18nKey: 'twoOfCups.regions.houseHill',
    },
  ],
};
