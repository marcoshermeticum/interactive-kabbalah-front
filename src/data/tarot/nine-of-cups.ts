import type { TarotCard } from './types';

/**
 * Nine of Cups (cups 9) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const nineOfCups: TarotCard = {
  id: 'nineOfCups',
  arcana: 'minor',
  suit: 'cups',
  rank: 9,
  name: 'Nine of Cups',
  image: '/tarot/minor/nine-of-cups.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'content-man',
      icon: '😌',
      shape: { type: 'rect', x: 27, y: 65, width: 45, height: 87, radius: 2 },
      i18nKey: 'nineOfCups.regions.contentMan',
    },
    {
      id: 'arc-of-cups',
      icon: '🏆',
      shape: { type: 'rect', x: 4, y: 26, width: 91, height: 38, radius: 2 },
      i18nKey: 'nineOfCups.regions.arcOfCups',
    },
    {
      id: 'blue-drape',
      icon: '🟦',
      shape: { type: 'rect', x: 4, y: 65, width: 22, height: 66, radius: 2 },
      i18nKey: 'nineOfCups.regions.blueDrape',
    },
    {
      id: 'blue-drape-2',
      icon: '🟦',
      shape: { type: 'rect', x: 73, y: 65, width: 21, height: 66, radius: 2 },
      i18nKey: 'nineOfCups.regions.blueDrape',
    },
    {
      id: 'golden-backdrop',
      icon: '🌟',
      shape: { type: 'rect', x: 4, y: 4, width: 91, height: 21, radius: 2 },
      i18nKey: 'nineOfCups.regions.goldenBackdrop',
    },
  ],
};
