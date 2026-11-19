import type { TarotCard } from './types';

/**
 * Five of Swords (swords 5) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const fiveOfSwords: TarotCard = {
  id: 'fiveOfSwords',
  arcana: 'minor',
  suit: 'swords',
  rank: 5,
  name: 'Five of Swords',
  image: '/tarot/minor/five-of-swords.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'victor',
      icon: '😏',
      shape: { type: 'rect', x: 42, y: 49, width: 53, height: 112, radius: 2 },
      i18nKey: 'fiveOfSwords.regions.victor',
    },
    {
      id: 'collected-swords',
      icon: '⚔️',
      shape: { type: 'rect', x: 64, y: 30, width: 22, height: 18, radius: 2 },
      i18nKey: 'fiveOfSwords.regions.collectedSwords',
    },
    {
      id: 'collected-swords-2',
      icon: '⚔️',
      shape: { type: 'rect', x: 5, y: 141, width: 36, height: 22, radius: 2 },
      i18nKey: 'fiveOfSwords.regions.collectedSwords',
    },
    {
      id: 'departing-losers',
      icon: '🚶',
      shape: { type: 'rect', x: 9, y: 99, width: 21, height: 41, radius: 2 },
      i18nKey: 'fiveOfSwords.regions.departingLosers',
    },
    {
      id: 'departing-losers-2',
      icon: '🚶',
      shape: { type: 'rect', x: 35, y: 118, width: 7, height: 22, radius: 2 },
      i18nKey: 'fiveOfSwords.regions.departingLosers',
    },
    {
      id: 'stormy-sky',
      icon: '🌥️',
      shape: { type: 'rect', x: 4, y: 3, width: 59, height: 45, radius: 2 },
      i18nKey: 'fiveOfSwords.regions.stormySky',
    },
    {
      id: 'stormy-sky-2',
      icon: '🌥️',
      shape: { type: 'rect', x: 4, y: 52, width: 36, height: 45, radius: 2 },
      i18nKey: 'fiveOfSwords.regions.stormySky',
    },
  ],
};
