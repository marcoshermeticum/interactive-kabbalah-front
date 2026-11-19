import type { TarotCard } from './types';

/**
 * Two of Swords (swords 2) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const twoOfSwords: TarotCard = {
  id: 'twoOfSwords',
  arcana: 'minor',
  suit: 'swords',
  rank: 2,
  name: 'Two of Swords',
  image: '/tarot/minor/two-of-swords.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'blindfold',
      icon: '🙈',
      shape: { type: 'rect', x: 41, y: 54, width: 16, height: 14, radius: 2 },
      i18nKey: 'twoOfSwords.regions.blindfold',
    },
    {
      id: 'crossed-swords',
      icon: '⚔️',
      shape: { type: 'rect', x: 4, y: 18, width: 37, height: 58, radius: 2 },
      i18nKey: 'twoOfSwords.regions.crossedSwords',
    },
    {
      id: 'crossed-swords-2',
      icon: '⚔️',
      shape: { type: 'rect', x: 84, y: 18, width: 11, height: 25, radius: 2 },
      i18nKey: 'twoOfSwords.regions.crossedSwords',
    },
    {
      id: 'crossed-swords-3',
      icon: '⚔️',
      shape: { type: 'rect', x: 58, y: 44, width: 33, height: 27, radius: 2 },
      i18nKey: 'twoOfSwords.regions.crossedSwords',
    },
    {
      id: 'crossed-swords-4',
      icon: '⚔️',
      shape: { type: 'rect', x: 41, y: 69, width: 16, height: 13, radius: 2 },
      i18nKey: 'twoOfSwords.regions.crossedSwords',
    },
    {
      id: 'crescent-moon',
      icon: '🌙',
      shape: { type: 'rect', x: 62, y: 17, width: 20, height: 16, radius: 2 },
      i18nKey: 'twoOfSwords.regions.crescentMoon',
    },
    {
      id: 'calm-sea-rocks',
      icon: '🌊',
      shape: { type: 'rect', x: 4, y: 83, width: 91, height: 48, radius: 2 },
      i18nKey: 'twoOfSwords.regions.calmSeaRocks',
    },
  ],
};
