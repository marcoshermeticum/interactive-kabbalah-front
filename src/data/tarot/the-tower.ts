import type { TarotCard } from './types';

/**
 * The Tower (XVI) — Rider-Waite major arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const theTower: TarotCard = {
  id: 'theTower',
  number: 16,
  name: 'The Tower',
  image: '/tarot/16_Tower.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'tower-crag',
      icon: '🗼',
      shape: { type: 'rect', x: 34.9, y: 70.7, width: 31.3, height: 75.9 },
      i18nKey: 'theTower.regions.towerCrag',
    },
    {
      id: 'lightning',
      icon: '⚡',
      shape: { type: 'triangle', x: 44.9, y: 14.2, width: 25, height: 17.7 },
      i18nKey: 'theTower.regions.lightning',
    },
    {
      id: 'falling-crown',
      icon: '👑',
      shape: { type: 'circle', x: 18.4, y: 4.1, width: 23.4, height: 21.1 },
      i18nKey: 'theTower.regions.fallingCrown',
    },
    {
      id: 'falling-figures',
      icon: '🙇',
      shape: { type: 'rect', x: 7.3, y: 64.6, width: 30.1, height: 53.5 },
      i18nKey: 'theTower.regions.fallingFigures',
    },
    {
      id: 'flames-yods',
      icon: '🔥',
      shape: { type: 'rect', x: 64, y: 33.2, width: 30.9, height: 21.9 },
      i18nKey: 'theTower.regions.flamesYods',
    },
  ],
};
