import type { TarotCard } from './types';

/**
 * Six of Cups (cups 6) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const sixOfCups: TarotCard = {
  id: 'sixOfCups',
  arcana: 'minor',
  suit: 'cups',
  rank: 6,
  name: 'Six of Cups',
  image: '/tarot/minor/six-of-cups.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'flower-cups',
      icon: '🌼',
      shape: { type: 'rect', x: 13, y: 59, width: 14, height: 40, radius: 2 },
      i18nKey: 'sixOfCups.regions.flowerCups',
    },
    {
      id: 'flower-cups-2',
      icon: '🌼',
      shape: { type: 'rect', x: 6, y: 136, width: 21, height: 25, radius: 2 },
      i18nKey: 'sixOfCups.regions.flowerCups',
    },
    {
      id: 'flower-cups-3',
      icon: '🌼',
      shape: { type: 'rect', x: 27, y: 136, width: 21, height: 25, radius: 2 },
      i18nKey: 'sixOfCups.regions.flowerCups',
    },
    {
      id: 'flower-cups-4',
      icon: '🌼',
      shape: { type: 'rect', x: 51, y: 136, width: 20, height: 25, radius: 2 },
      i18nKey: 'sixOfCups.regions.flowerCups',
    },
    {
      id: 'flower-cups-5',
      icon: '🌼',
      shape: { type: 'rect', x: 76, y: 136, width: 18, height: 25, radius: 2 },
      i18nKey: 'sixOfCups.regions.flowerCups',
    },
    {
      id: 'children-gift',
      icon: '🧒',
      shape: { type: 'rect', x: 28, y: 64, width: 34, height: 71, radius: 2 },
      i18nKey: 'sixOfCups.regions.childrenGift',
    },
    {
      id: 'children-gift-2',
      icon: '🧒',
      shape: { type: 'rect', x: 64, y: 84, width: 24, height: 51, radius: 2 },
      i18nKey: 'sixOfCups.regions.childrenGift',
    },
    {
      id: 'village-courtyard',
      icon: '🏘️',
      shape: { type: 'rect', x: 4, y: 28, width: 91, height: 30, radius: 2 },
      i18nKey: 'sixOfCups.regions.villageCourtyard',
    },
    {
      id: 'background-figure',
      icon: '🚶',
      shape: { type: 'rect', x: 4, y: 78, width: 9, height: 20, radius: 2 },
      i18nKey: 'sixOfCups.regions.backgroundFigure',
    },
  ],
};
