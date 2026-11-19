import type { TarotCard } from './types';

/**
 * Five of Cups (cups 5) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const fiveOfCups: TarotCard = {
  id: 'fiveOfCups',
  arcana: 'minor',
  suit: 'cups',
  rank: 5,
  name: 'Five of Cups',
  image: '/tarot/minor/five-of-cups.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'black-cloak',
      icon: '🖤',
      shape: { type: 'rect', x: 42, y: 47, width: 32, height: 106, radius: 2 },
      i18nKey: 'fiveOfCups.regions.blackCloak',
    },
    {
      id: 'spilled-cups',
      icon: '🍷',
      shape: { type: 'rect', x: 5, y: 125, width: 34, height: 33, radius: 2 },
      i18nKey: 'fiveOfCups.regions.spilledCups',
    },
    {
      id: 'standing-cups',
      icon: '🏆',
      shape: { type: 'rect', x: 74, y: 121, width: 20, height: 40, radius: 2 },
      i18nKey: 'fiveOfCups.regions.standingCups',
    },
    {
      id: 'river-bridge',
      icon: '🌉',
      shape: { type: 'rect', x: 5, y: 97, width: 37, height: 27, radius: 2 },
      i18nKey: 'fiveOfCups.regions.riverBridge',
    },
    {
      id: 'river-bridge-2',
      icon: '🌉',
      shape: { type: 'rect', x: 75, y: 108, width: 20, height: 12, radius: 2 },
      i18nKey: 'fiveOfCups.regions.riverBridge',
    },
  ],
};
