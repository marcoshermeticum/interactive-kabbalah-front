import type { TarotCard } from './types';

/**
 * Queen of Cups (cups 13) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const queenOfCups: TarotCard = {
  id: 'queenOfCups',
  arcana: 'minor',
  suit: 'cups',
  rank: 13,
  name: 'Queen of Cups',
  image: '/tarot/minor/queen-of-cups.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'ornate-cup',
      icon: '🏺',
      shape: { type: 'rect', x: 20, y: 43, width: 29, height: 38, radius: 2 },
      i18nKey: 'queenOfCups.regions.ornateCup',
    },
    {
      id: 'shell-throne',
      icon: '🐚',
      shape: { type: 'rect', x: 48, y: 18, width: 47, height: 20, radius: 2 },
      i18nKey: 'queenOfCups.regions.shellThrone',
    },
    {
      id: 'shell-throne-2',
      icon: '🐚',
      shape: { type: 'rect', x: 74, y: 40, width: 21, height: 91, radius: 2 },
      i18nKey: 'queenOfCups.regions.shellThrone',
    },
    {
      id: 'tide-shore',
      icon: '🌊',
      shape: { type: 'rect', x: 4, y: 132, width: 91, height: 21, radius: 2 },
      i18nKey: 'queenOfCups.regions.tideShore',
    },
    {
      id: 'crown-veil',
      icon: '👑',
      shape: { type: 'rect', x: 49, y: 40, width: 25, height: 22, radius: 2 },
      i18nKey: 'queenOfCups.regions.crownVeil',
    },
  ],
};
