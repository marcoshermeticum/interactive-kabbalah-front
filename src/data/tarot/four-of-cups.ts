import type { TarotCard } from './types';

/**
 * Four of Cups (cups 4) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const fourOfCups: TarotCard = {
  id: 'fourOfCups',
  arcana: 'minor',
  suit: 'cups',
  rank: 4,
  name: 'Four of Cups',
  image: '/tarot/minor/four-of-cups.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'hand-fourth-cup',
      icon: '✋',
      shape: { type: 'rect', x: 6, y: 68, width: 39, height: 37, radius: 2 },
      i18nKey: 'fourOfCups.regions.handFourthCup',
    },
    {
      id: 'three-cups-ground',
      icon: '🥤',
      shape: { type: 'rect', x: 4, y: 129, width: 56, height: 31, radius: 2 },
      i18nKey: 'fourOfCups.regions.threeCupsGround',
    },
    {
      id: 'crossed-arms',
      icon: '🧘',
      shape: { type: 'rect', x: 48, y: 70, width: 43, height: 58, radius: 2 },
      i18nKey: 'fourOfCups.regions.crossedArms',
    },
    {
      id: 'tree',
      icon: '🌳',
      shape: { type: 'rect', x: 22, y: 2, width: 72, height: 66, radius: 2 },
      i18nKey: 'fourOfCups.regions.tree',
    },
  ],
};
