import type { TarotCard } from './types';

/**
 * Queen of Swords (swords 13) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const queenOfSwords: TarotCard = {
  id: 'queenOfSwords',
  arcana: 'minor',
  suit: 'swords',
  rank: 13,
  name: 'Queen of Swords',
  image: '/tarot/minor/queen-of-swords.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'upright-sword',
      icon: '⚔️',
      shape: { type: 'rect', x: 56, y: 10, width: 9, height: 80, radius: 2 },
      i18nKey: 'queenOfSwords.regions.uprightSword',
    },
    {
      id: 'open-hand',
      icon: '🖐️',
      shape: { type: 'rect', x: 66, y: 52, width: 14, height: 14, radius: 2 },
      i18nKey: 'queenOfSwords.regions.openHand',
    },
    {
      id: 'cherub-throne',
      icon: '👼',
      shape: { type: 'rect', x: 22, y: 98, width: 40, height: 51, radius: 2 },
      i18nKey: 'queenOfSwords.regions.cherubThrone',
    },
    {
      id: 'cherub-throne-2',
      icon: '👼',
      shape: { type: 'rect', x: 4, y: 63, width: 20, height: 20, radius: 2 },
      i18nKey: 'queenOfSwords.regions.cherubThrone',
    },
    {
      id: 'bird-clouds',
      icon: '🐦',
      shape: { type: 'rect', x: 30, y: 24, width: 12, height: 10, radius: 2 },
      i18nKey: 'queenOfSwords.regions.birdClouds',
    },
    {
      id: 'bird-clouds-2',
      icon: '🐦',
      shape: { type: 'rect', x: 70, y: 70, width: 25, height: 62, radius: 2 },
      i18nKey: 'queenOfSwords.regions.birdClouds',
    },
    {
      id: 'bird-clouds-3',
      icon: '🐦',
      shape: { type: 'rect', x: 4, y: 84, width: 14, height: 30, radius: 2 },
      i18nKey: 'queenOfSwords.regions.birdClouds',
    },
  ],
};
