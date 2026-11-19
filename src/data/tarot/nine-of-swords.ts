import type { TarotCard } from './types';

/**
 * Nine of Swords (swords 9) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const nineOfSwords: TarotCard = {
  id: 'nineOfSwords',
  arcana: 'minor',
  suit: 'swords',
  rank: 9,
  name: 'Nine of Swords',
  image: '/tarot/minor/nine-of-swords.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'face-in-hands',
      icon: '🫣',
      shape: { type: 'rect', x: 38, y: 72, width: 36, height: 52, radius: 2 },
      i18nKey: 'nineOfSwords.regions.faceInHands',
    },
    {
      id: 'nine-swords-wall',
      icon: '🗡️',
      shape: { type: 'rect', x: 7, y: 9, width: 88, height: 62, radius: 2 },
      i18nKey: 'nineOfSwords.regions.nineSwordsWall',
    },
    {
      id: 'nine-swords-wall-2',
      icon: '🗡️',
      shape: { type: 'rect', x: 7, y: 72, width: 30, height: 31, radius: 2 },
      i18nKey: 'nineOfSwords.regions.nineSwordsWall',
    },
    {
      id: 'nine-swords-wall-3',
      icon: '🗡️',
      shape: { type: 'rect', x: 74, y: 72, width: 21, height: 31, radius: 2 },
      i18nKey: 'nineOfSwords.regions.nineSwordsWall',
    },
    {
      id: 'rose-quilt',
      icon: '🛏️',
      shape: { type: 'rect', x: 46, y: 125, width: 49, height: 33, radius: 2 },
      i18nKey: 'nineOfSwords.regions.roseQuilt',
    },
    {
      id: 'carved-bed',
      icon: '🪑',
      shape: { type: 'rect', x: 4, y: 114, width: 33, height: 42, radius: 2 },
      i18nKey: 'nineOfSwords.regions.carvedBed',
    },
  ],
};
