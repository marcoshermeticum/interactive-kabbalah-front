import type { TarotCard } from './types';

/**
 * Page of Wands (wands 11) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const pageOfWands: TarotCard = {
  id: 'pageOfWands',
  arcana: 'minor',
  suit: 'wands',
  rank: 11,
  name: 'Page of Wands',
  image: '/tarot/minor/page-of-wands.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'salamander-tunic',
      icon: '🦎',
      shape: { type: 'rect', x: 40, y: 55, width: 28, height: 50, radius: 2 },
      i18nKey: 'pageOfWands.regions.salamanderTunic',
    },
    {
      id: 'wand-gaze',
      icon: '🪄',
      shape: { type: 'rect', x: 69, y: 14, width: 9, height: 130, radius: 2 },
      i18nKey: 'pageOfWands.regions.wandGaze',
    },
    {
      id: 'feathered-hat',
      icon: '🪶',
      shape: { type: 'rect', x: 27, y: 17, width: 23, height: 22, radius: 2 },
      i18nKey: 'pageOfWands.regions.featheredHat',
    },
    {
      id: 'desert-pyramids',
      icon: '🏜️',
      shape: { type: 'rect', x: 79, y: 111, width: 17, height: 20, radius: 2 },
      i18nKey: 'pageOfWands.regions.desertPyramids',
    },
  ],
};
