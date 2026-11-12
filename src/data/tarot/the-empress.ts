import type { TarotCard } from './types';

/**
 * The Empress (III) — Rider-Waite major arcana.
 *
 * viewBox matches the 1086×1810 artwork (0.6 aspect ratio). Boxes are a first
 * pass calibrated from the color map; refine them with the region editor
 * ("Posicionar destaques") and paste the exported JSON back here.
 *
 * Regions are ordered background → foreground: the last one wins where boxes
 * overlap (wheat sits in front of the robe, the shield in front of the wheat).
 */
export const theEmpress: TarotCard = {
  id: 'theEmpress',
  number: 3,
  name: 'The Empress',
  image: '/tarot/03_Empress.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'river-trees',
      icon: '🏞️',
      shape: { type: 'rect', x: 66.6, y: 35.9, width: 27.9, height: 29.2 },
      i18nKey: 'theEmpress.regions.riverTrees',
    },
    {
      id: 'pomegranate-robe',
      icon: '🍈',
      shape: { type: 'rect', x: 38, y: 55.3, width: 23.2, height: 39.2 },
      i18nKey: 'theEmpress.regions.pomegranateRobe',
    },
    {
      id: 'wheat-field',
      icon: '🌾',
      shape: { type: 'rect', x: 0, y: 132.2, width: 100, height: 19.8 },
      i18nKey: 'theEmpress.regions.wheatField',
    },
    {
      id: 'venus-shield',
      icon: '♀️',
      shape: { type: 'rect', x: 12.5, y: 100.3, width: 23, height: 27 },
      i18nKey: 'theEmpress.regions.venusShield',
    },
    {
      id: 'scepter',
      icon: '🪄',
      shape: { type: 'rect', x: 24.5, y: 19.5, width: 8, height: 22.5 },
      i18nKey: 'theEmpress.regions.scepter',
    },
    {
      id: 'star-crown',
      icon: '👑',
      shape: { type: 'triangle', x: 34.6, y: 17.5, width: 19.3, height: 14.2 },
      i18nKey: 'theEmpress.regions.starCrown',
    },
  ],
};
