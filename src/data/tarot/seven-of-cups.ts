import type { TarotCard } from './types';

/**
 * Seven of Cups (cups 7) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const sevenOfCups: TarotCard = {
  id: 'sevenOfCups',
  arcana: 'minor',
  suit: 'cups',
  rank: 7,
  name: 'Seven of Cups',
  image: '/tarot/minor/seven-of-cups.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'dark-silhouette',
      icon: '👤',
      shape: { type: 'rect', x: 8, y: 119, width: 66, height: 42, radius: 2 },
      i18nKey: 'sevenOfCups.regions.darkSilhouette',
    },
    {
      id: 'veiled-figure',
      icon: '🫥',
      shape: { type: 'rect', x: 31, y: 12, width: 42, height: 49, radius: 2 },
      i18nKey: 'sevenOfCups.regions.veiledFigure',
    },
    {
      id: 'serpent-dragon',
      icon: '🐉',
      shape: { type: 'rect', x: 74, y: 4, width: 20, height: 40, radius: 2 },
      i18nKey: 'sevenOfCups.regions.serpentDragon',
    },
    {
      id: 'serpent-dragon-2',
      icon: '🐉',
      shape: { type: 'rect', x: 76, y: 60, width: 18, height: 58, radius: 2 },
      i18nKey: 'sevenOfCups.regions.serpentDragon',
    },
    {
      id: 'jewels-laurel',
      icon: '💎',
      shape: { type: 'rect', x: 31, y: 69, width: 21, height: 49, radius: 2 },
      i18nKey: 'sevenOfCups.regions.jewelsLaurel',
    },
    {
      id: 'jewels-laurel-2',
      icon: '💎',
      shape: { type: 'rect', x: 54, y: 62, width: 20, height: 56, radius: 2 },
      i18nKey: 'sevenOfCups.regions.jewelsLaurel',
    },
    {
      id: 'jewels-laurel-3',
      icon: '💎',
      shape: { type: 'rect', x: 6, y: 55, width: 17, height: 62, radius: 2 },
      i18nKey: 'sevenOfCups.regions.jewelsLaurel',
    },
  ],
};
