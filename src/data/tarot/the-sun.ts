import type { TarotCard } from './types';

/**
 * The Sun (XIX) — Rider-Waite major arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const theSun: TarotCard = {
  id: 'theSun',
  number: 19,
  name: 'The Sun',
  image: '/tarot/19_Sun.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'sun-rays',
      icon: '☀️',
      shape: { type: 'rect', x: 4, y: 4, width: 58, height: 62, radius: 2 },
      i18nKey: 'theSun.regions.sunRays',
    },
    {
      id: 'red-banner',
      icon: '🚩',
      shape: { type: 'rect', x: 63, y: 10, width: 33, height: 75, radius: 2 },
      i18nKey: 'theSun.regions.redBanner',
    },
    {
      id: 'sunflower-wall',
      icon: '🌻',
      shape: { type: 'rect', x: 4, y: 68, width: 16, height: 17, radius: 1.5 },
      i18nKey: 'theSun.regions.sunflowerWall',
    },
    {
      id: 'sunflower-wall-2',
      icon: '🌻',
      shape: { type: 'rect', x: 20, y: 70, width: 12, height: 15, radius: 1.5 },
      i18nKey: 'theSun.regions.sunflowerWall',
    },
    {
      id: 'sunflower-wall-3',
      icon: '🌻',
      shape: { type: 'rect', x: 41, y: 69, width: 11, height: 16, radius: 1.5 },
      i18nKey: 'theSun.regions.sunflowerWall',
    },
    {
      id: 'sunflower-wall-4',
      icon: '🌻',
      shape: { type: 'rect', x: 80, y: 86, width: 16, height: 14, radius: 1.5 },
      i18nKey: 'theSun.regions.sunflowerWall',
    },
    {
      id: 'red-plume',
      icon: '🪶',
      shape: { type: 'circle', x: 32.5, y: 67, width: 8, height: 8.5 },
      i18nKey: 'theSun.regions.redPlume',
    },
    {
      id: 'child-horse',
      icon: '🧒',
      shape: { type: 'rect', x: 16, y: 87, width: 62, height: 62, radius: 2 },
      i18nKey: 'theSun.regions.childHorse',
    },
  ],
};
