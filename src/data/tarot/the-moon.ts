import type { TarotCard } from './types';

/**
 * The Moon (XVIII) — Rider-Waite major arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const theMoon: TarotCard = {
  id: 'theMoon',
  number: 18,
  name: 'The Moon',
  image: '/tarot/18_Moon.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'moon-face',
      icon: '🌙',
      shape: { type: 'circle', x: 30.9, y: 14.9, width: 44.1, height: 42.7 },
      i18nKey: 'theMoon.regions.moonFace',
    },
    {
      id: 'dew-drops',
      icon: '💧',
      shape: { type: 'rect', x: 22, y: 66.4, width: 57.6, height: 17.7 },
      i18nKey: 'theMoon.regions.dewDrops',
    },
    {
      id: 'dog-wolf',
      icon: '🐺',
      shape: { type: 'rect', x: 59.8, y: 86.2, width: 27.8, height: 29.3 },
      i18nKey: 'theMoon.regions.dogWolf',
    },
    {
      id: 'crayfish',
      icon: '🦞',
      shape: { type: 'rect', x: 32.8, y: 124.3, width: 21.6, height: 20 },
      i18nKey: 'theMoon.regions.crayfish',
    },
    {
      id: 'two-towers',
      icon: '🗼',
      shape: { type: 'rect', x: 5.7, y: 58.9, width: 11.8, height: 25.7 },
      i18nKey: 'theMoon.regions.twoTowers',
    },
    {
      id: 'winding-path',
      icon: '➰',
      shape: { type: 'rect', x: 46.5, y: 92, width: 11.5, height: 31.5 },
      i18nKey: 'theMoon.regions.windingPath',
    },
  ],
};
