import type { TarotCard } from './types';

/**
 * Page of Cups (cups 11) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const pageOfCups: TarotCard = {
  id: 'pageOfCups',
  arcana: 'minor',
  suit: 'cups',
  rank: 11,
  name: 'Page of Cups',
  image: '/tarot/minor/page-of-cups.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'fish-in-cup',
      icon: '🐟',
      shape: { type: 'rect', x: 14, y: 39, width: 18, height: 40, radius: 2 },
      i18nKey: 'pageOfCups.regions.fishInCup',
    },
    {
      id: 'lotus-tunic',
      icon: '🪷',
      shape: { type: 'rect', x: 38, y: 51, width: 40, height: 54, radius: 2 },
      i18nKey: 'pageOfCups.regions.lotusTunic',
    },
    {
      id: 'sea-waves',
      icon: '🌊',
      shape: { type: 'rect', x: 4, y: 119, width: 91, height: 17, radius: 2 },
      i18nKey: 'pageOfCups.regions.seaWaves',
    },
    {
      id: 'blue-hat',
      icon: '🎩',
      shape: { type: 'rect', x: 34, y: 24, width: 33, height: 26, radius: 2 },
      i18nKey: 'pageOfCups.regions.blueHat',
    },
  ],
};
