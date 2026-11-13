import type { TarotCard } from './types';

/**
 * The Lovers (VI) — Rider-Waite major arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const theLovers: TarotCard = {
  id: 'theLovers',
  number: 6,
  name: 'The Lovers',
  image: '/tarot/06_Lovers.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'angel',
      icon: '👼',
      shape: { type: 'triangle', x: 34.1, y: 27.3, width: 31.3, height: 27 },
      i18nKey: 'theLovers.regions.angel',
    },
    {
      id: 'sun',
      icon: '☀️',
      shape: { type: 'circle', x: 37, y: 3.4, width: 25.4, height: 21.3 },
      i18nKey: 'theLovers.regions.sun',
    },
    {
      id: 'flaming-tree',
      icon: '🔥',
      shape: { type: 'rect', x: 81.5, y: 48.9, width: 14, height: 36.2 },
      i18nKey: 'theLovers.regions.flamingTree',
    },
    {
      id: 'serpent-tree',
      icon: '🐍',
      shape: { type: 'rect', x: 3.9, y: 71.5, width: 7.4, height: 25.2 },
      i18nKey: 'theLovers.regions.serpentTree',
    },
    {
      id: 'couple',
      icon: '👫',
      shape: { type: 'rect', x: 19.9, y: 100.9, width: 64.4, height: 10 },
      i18nKey: 'theLovers.regions.couple',
    },
    {
      id: 'mountain',
      icon: '⛰️',
      shape: { type: 'rect', x: 39.2, y: 113.9, width: 14, height: 10 },
      i18nKey: 'theLovers.regions.mountain',
    },
  ],
};
