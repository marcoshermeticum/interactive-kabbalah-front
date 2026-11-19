import type { TarotCard } from './types';

/**
 * Knight of Swords (swords 12) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const knightOfSwords: TarotCard = {
  id: 'knightOfSwords',
  arcana: 'minor',
  suit: 'swords',
  rank: 12,
  name: 'Knight of Swords',
  image: '/tarot/minor/knight-of-swords.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'raised-sword',
      icon: '⚔️',
      shape: { type: 'rect', x: 18, y: 2, width: 19, height: 46, radius: 2 },
      i18nKey: 'knightOfSwords.regions.raisedSword',
    },
    {
      id: 'galloping-horse',
      icon: '🐎',
      shape: { type: 'rect', x: 5, y: 62, width: 33, height: 31, radius: 2 },
      i18nKey: 'knightOfSwords.regions.gallopingHorse',
    },
    {
      id: 'galloping-horse-2',
      icon: '🐎',
      shape: { type: 'rect', x: 31, y: 96, width: 40, height: 56, radius: 2 },
      i18nKey: 'knightOfSwords.regions.gallopingHorse',
    },
    {
      id: 'wind-bent-trees',
      icon: '🌬️',
      shape: { type: 'rect', x: 4, y: 94, width: 26, height: 40, radius: 2 },
      i18nKey: 'knightOfSwords.regions.windBentTrees',
    },
    {
      id: 'storm-clouds',
      icon: '☁️',
      shape: { type: 'rect', x: 38, y: 4, width: 33, height: 32, radius: 2 },
      i18nKey: 'knightOfSwords.regions.stormClouds',
    },
    {
      id: 'storm-clouds-2',
      icon: '☁️',
      shape: { type: 'rect', x: 72, y: 14, width: 23, height: 30, radius: 2 },
      i18nKey: 'knightOfSwords.regions.stormClouds',
    },
    {
      id: 'storm-clouds-3',
      icon: '☁️',
      shape: { type: 'rect', x: 4, y: 51, width: 40, height: 10, radius: 2 },
      i18nKey: 'knightOfSwords.regions.stormClouds',
    },
  ],
};
