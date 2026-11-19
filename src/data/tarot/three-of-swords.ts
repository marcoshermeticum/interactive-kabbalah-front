import type { TarotCard } from './types';

/**
 * Three of Swords (swords 3) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const threeOfSwords: TarotCard = {
  id: 'threeOfSwords',
  arcana: 'minor',
  suit: 'swords',
  rank: 3,
  name: 'Three of Swords',
  image: '/tarot/minor/three-of-swords.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'pierced-heart',
      icon: '❤️‍🩹',
      shape: { type: 'rect', x: 23, y: 58, width: 52, height: 52, radius: 2 },
      i18nKey: 'threeOfSwords.regions.piercedHeart',
    },
    {
      id: 'three-swords',
      icon: '🗡️',
      shape: { type: 'rect', x: 17, y: 19, width: 66, height: 38, radius: 2 },
      i18nKey: 'threeOfSwords.regions.threeSwords',
    },
    {
      id: 'three-swords-2',
      icon: '🗡️',
      shape: { type: 'rect', x: 27, y: 111, width: 45, height: 30, radius: 2 },
      i18nKey: 'threeOfSwords.regions.threeSwords',
    },
    {
      id: 'rain',
      icon: '🌧️',
      shape: { type: 'rect', x: 4, y: 75, width: 18, height: 70, radius: 2 },
      i18nKey: 'threeOfSwords.regions.rain',
    },
    {
      id: 'rain-2',
      icon: '🌧️',
      shape: { type: 'rect', x: 76, y: 75, width: 19, height: 70, radius: 2 },
      i18nKey: 'threeOfSwords.regions.rain',
    },
    {
      id: 'storm-clouds',
      icon: '⛈️',
      shape: { type: 'rect', x: 24, y: 3, width: 52, height: 15, radius: 2 },
      i18nKey: 'threeOfSwords.regions.stormClouds',
    },
    {
      id: 'storm-clouds-2',
      icon: '⛈️',
      shape: { type: 'rect', x: 5, y: 58, width: 18, height: 14, radius: 2 },
      i18nKey: 'threeOfSwords.regions.stormClouds',
    },
    {
      id: 'storm-clouds-3',
      icon: '⛈️',
      shape: { type: 'rect', x: 79, y: 58, width: 16, height: 14, radius: 2 },
      i18nKey: 'threeOfSwords.regions.stormClouds',
    },
  ],
};
