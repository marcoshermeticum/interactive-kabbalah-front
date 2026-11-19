import type { TarotCard } from './types';

/**
 * Eight of Swords (swords 8) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const eightOfSwords: TarotCard = {
  id: 'eightOfSwords',
  arcana: 'minor',
  suit: 'swords',
  rank: 8,
  name: 'Eight of Swords',
  image: '/tarot/minor/eight-of-swords.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'bound-blindfold',
      icon: '🧣',
      shape: { type: 'rect', x: 28, y: 43, width: 26, height: 95, radius: 2 },
      i18nKey: 'eightOfSwords.regions.boundBlindfold',
    },
    {
      id: 'eight-swords',
      icon: '🗡️',
      shape: { type: 'rect', x: 4, y: 52, width: 24, height: 86, radius: 2 },
      i18nKey: 'eightOfSwords.regions.eightSwords',
    },
    {
      id: 'eight-swords-2',
      icon: '🗡️',
      shape: { type: 'rect', x: 54, y: 48, width: 41, height: 28, radius: 2 },
      i18nKey: 'eightOfSwords.regions.eightSwords',
    },
    {
      id: 'wet-ground',
      icon: '💧',
      shape: { type: 'rect', x: 4, y: 139, width: 91, height: 21, radius: 2 },
      i18nKey: 'eightOfSwords.regions.wetGround',
    },
    {
      id: 'castle-on-cliff',
      icon: '🏰',
      shape: { type: 'rect', x: 61, y: 77, width: 34, height: 47, radius: 2 },
      i18nKey: 'eightOfSwords.regions.castleOnCliff',
    },
  ],
};
