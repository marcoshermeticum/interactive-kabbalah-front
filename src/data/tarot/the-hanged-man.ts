import type { TarotCard } from './types';

/**
 * The Hanged Man (XII) — Rider-Waite major arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const theHangedMan: TarotCard = {
  id: 'theHangedMan',
  number: 12,
  name: 'The Hanged Man',
  image: '/tarot/12_Hanged_Man.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'beam',
      icon: '🪵',
      shape: { type: 'rect', x: 41.5, y: 22.4, width: 12.7, height: 24.9 },
      i18nKey: 'theHangedMan.regions.beam',
    },
    {
      id: 'living-tree',
      icon: '🌳',
      shape: { type: 'rect', x: 6.6, y: 9.4, width: 88.4, height: 10 },
      i18nKey: 'theHangedMan.regions.livingTree',
    },
    {
      id: 'halo',
      icon: '🌟',
      shape: { type: 'circle', x: 35.3, y: 113.7, width: 28.2, height: 23 },
      i18nKey: 'theHangedMan.regions.halo',
    },
    {
      id: 'crossed-leg',
      icon: '🦵',
      shape: { type: 'rect', x: 33.3, y: 49.5, width: 27.9, height: 28 },
      i18nKey: 'theHangedMan.regions.crossedLeg',
    },
    {
      id: 'bound-hands',
      icon: '🔗',
      shape: { type: 'rect', x: 24.4, y: 99, width: 51.8, height: 10 },
      i18nKey: 'theHangedMan.regions.boundHands',
    },
    {
      id: 'serene-face',
      icon: '😌',
      shape: { type: 'circle', x: 41.8, y: 116.8, width: 14.9, height: 15.4 },
      i18nKey: 'theHangedMan.regions.sereneFace',
    },
  ],
};
