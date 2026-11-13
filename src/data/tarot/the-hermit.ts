import type { TarotCard } from './types';

/**
 * The Hermit (IX) — Rider-Waite major arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const theHermit: TarotCard = {
  id: 'theHermit',
  number: 9,
  name: 'The Hermit',
  image: '/tarot/09_Hermit.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'lantern-star',
      icon: '🕯️',
      shape: { type: 'rect', x: 7.8, y: 16.7, width: 14, height: 32.7 },
      i18nKey: 'theHermit.regions.lanternStar',
    },
    {
      id: 'staff',
      icon: '🪄',
      shape: { type: 'rect', x: 34, y: 34.7, width: 14.7, height: 103.7 },
      i18nKey: 'theHermit.regions.staff',
    },
    {
      id: 'gray-hood',
      icon: '🧥',
      shape: { type: 'rect', x: 41.8, y: 13.4, width: 14, height: 10 },
      i18nKey: 'theHermit.regions.grayHood',
    },
    {
      id: 'mountain-peak',
      icon: '🏔️',
      shape: { type: 'rect', x: 7.5, y: 140.2, width: 85.3, height: 10 },
      i18nKey: 'theHermit.regions.mountainPeak',
    },
    {
      id: 'bearded-face',
      icon: '🧓',
      shape: { type: 'circle', x: 38.7, y: 23.2, width: 10.8, height: 10 },
      i18nKey: 'theHermit.regions.beardedFace',
    },
  ],
};
