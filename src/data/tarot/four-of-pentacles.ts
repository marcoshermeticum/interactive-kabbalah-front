import type { TarotCard } from './types';

/**
 * Four of Pentacles (pentacles 4) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const fourOfPentacles: TarotCard = {
  id: 'fourOfPentacles',
  arcana: 'minor',
  suit: 'pentacles',
  rank: 4,
  name: 'Four of Pentacles',
  image: '/tarot/minor/four-of-pentacles.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'coin-on-chest',
      icon: '🫀',
      shape: { type: 'circle', x: 39, y: 80, width: 17, height: 20 },
      i18nKey: 'fourOfPentacles.regions.coinOnChest',
    },
    {
      id: 'coin-on-head',
      icon: '👑',
      shape: { type: 'rect', x: 37, y: 47, width: 20, height: 24, radius: 2 },
      i18nKey: 'fourOfPentacles.regions.coinOnHead',
    },
    {
      id: 'coins-under-feet',
      icon: '🦶',
      shape: { type: 'rect', x: 19, y: 135, width: 53, height: 20, radius: 2 },
      i18nKey: 'fourOfPentacles.regions.coinsUnderFeet',
    },
    {
      id: 'city-behind',
      icon: '🏙️',
      shape: { type: 'rect', x: 4, y: 111, width: 26, height: 23, radius: 2 },
      i18nKey: 'fourOfPentacles.regions.cityBehind',
    },
    {
      id: 'city-behind-2',
      icon: '🏙️',
      shape: { type: 'rect', x: 73, y: 107, width: 22, height: 32, radius: 2 },
      i18nKey: 'fourOfPentacles.regions.cityBehind',
    },
  ],
};
