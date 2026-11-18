import type { TarotCard } from './types';

/**
 * Five of Wands (wands 5) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const fiveOfWands: TarotCard = {
  id: 'fiveOfWands',
  arcana: 'minor',
  suit: 'wands',
  rank: 5,
  name: 'Five of Wands',
  image: '/tarot/minor/five-of-wands.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'crossed-staves',
      icon: '⚔️',
      shape: { type: 'triangle', x: 59.1, y: 17.8, width: 31.4, height: 49.6 },
      i18nKey: 'fiveOfWands.regions.crossedStaves',
    },
    {
      id: 'five-youths',
      icon: '🧑‍🤝‍🧑',
      shape: { type: 'circle', x: 64.5, y: 65.6, width: 14, height: 10 },
      i18nKey: 'fiveOfWands.regions.fiveYouths',
    },
    {
      id: 'five-youths-2',
      icon: '🧑‍🤝‍🧑',
      shape: { type: 'circle', x: 65.5, y: 77.2, width: 14, height: 10 },
      i18nKey: 'fiveOfWands.regions.fiveYouths',
    },
    {
      id: 'five-youths-3',
      icon: '🧑‍🤝‍🧑',
      shape: { type: 'circle', x: 37.4, y: 59.2, width: 14, height: 10 },
      i18nKey: 'fiveOfWands.regions.fiveYouths',
    },
    {
      id: 'five-youths-4',
      icon: '🧑‍🤝‍🧑',
      shape: { type: 'circle', x: 28.7, y: 68.2, width: 14, height: 10 },
      i18nKey: 'fiveOfWands.regions.fiveYouths',
    },
    {
      id: 'five-youths-5',
      icon: '🧑‍🤝‍🧑',
      shape: { type: 'circle', x: 5, y: 70, width: 14, height: 10 },
      i18nKey: 'fiveOfWands.regions.fiveYouths',
    },
    {
      id: 'mixed-clothing',
      icon: '🎨',
      shape: { type: 'rect', x: 61.6, y: 88, width: 16.2, height: 29 },
      i18nKey: 'fiveOfWands.regions.mixedClothing',
    },
    {
      id: 'uneven-ground',
      icon: '⛰️',
      shape: { type: 'rect', x: 4.7, y: 124, width: 89.4, height: 37 },
      i18nKey: 'fiveOfWands.regions.unevenGround',
    },
  ],
};
