import type { TarotCard } from './types';

/**
 * The World (XXI) — Rider-Waite major arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const theWorld: TarotCard = {
  id: 'theWorld',
  number: 21,
  name: 'The World',
  image: '/tarot/21_World.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'laurel-wreath',
      icon: '🌿',
      shape: { type: 'rect', x: 24, y: 10, width: 42, height: 16, radius: 3 },
      i18nKey: 'theWorld.regions.laurelWreath',
    },
    {
      id: 'laurel-wreath-left',
      icon: '🌿',
      shape: { type: 'rect', x: 8, y: 28, width: 12, height: 92, radius: 3 },
      i18nKey: 'theWorld.regions.laurelWreath',
    },
    {
      id: 'laurel-wreath-right',
      icon: '🌿',
      shape: { type: 'rect', x: 78, y: 28, width: 11.5, height: 86, radius: 3 },
      i18nKey: 'theWorld.regions.laurelWreath',
    },
    {
      id: 'laurel-wreath-bottom',
      icon: '🌿',
      shape: { type: 'rect', x: 26, y: 122, width: 41, height: 15, radius: 3 },
      i18nKey: 'theWorld.regions.laurelWreath',
    },
    {
      id: 'clouds',
      icon: '☁️',
      shape: { type: 'rect', x: 26, y: 138, width: 40, height: 12, radius: 3 },
      i18nKey: 'theWorld.regions.clouds',
    },
    {
      id: 'clouds-right',
      icon: '☁️',
      shape: { type: 'rect', x: 90, y: 92, width: 6, height: 24, radius: 2 },
      i18nKey: 'theWorld.regions.clouds',
    },
    {
      id: 'four-creatures',
      icon: '🦁',
      shape: { type: 'rect', x: 4.5, y: 5.5, width: 19, height: 20, radius: 2 },
      i18nKey: 'theWorld.regions.fourCreatures',
    },
    {
      id: 'four-creatures-eagle',
      icon: '🦁',
      shape: { type: 'rect', x: 67, y: 4.5, width: 29, height: 18, radius: 2 },
      i18nKey: 'theWorld.regions.fourCreatures',
    },
    {
      id: 'four-creatures-bull',
      icon: '🦁',
      shape: { type: 'rect', x: 4.5, y: 128, width: 21, height: 20, radius: 2 },
      i18nKey: 'theWorld.regions.fourCreatures',
    },
    {
      id: 'four-creatures-lion',
      icon: '🦁',
      shape: { type: 'rect', x: 68, y: 116, width: 28, height: 34, radius: 2 },
      i18nKey: 'theWorld.regions.fourCreatures',
    },
    {
      id: 'dancer',
      icon: '💃',
      shape: { type: 'rect', x: 31, y: 37, width: 36, height: 85, radius: 3 },
      i18nKey: 'theWorld.regions.dancer',
    },
    {
      id: 'two-wands',
      icon: '🪄',
      shape: { type: 'rect', x: 20.5, y: 62, width: 9, height: 32, radius: 2 },
      i18nKey: 'theWorld.regions.twoWands',
    },
    {
      id: 'two-wands-right',
      icon: '🪄',
      shape: { type: 'rect', x: 70, y: 62, width: 7.5, height: 32, radius: 2 },
      i18nKey: 'theWorld.regions.twoWands',
    },
  ],
};
