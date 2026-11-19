import type { TarotCard } from './types';

/**
 * Four of Swords (swords 4) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const fourOfSwords: TarotCard = {
  id: 'fourOfSwords',
  arcana: 'minor',
  suit: 'swords',
  rank: 4,
  name: 'Four of Swords',
  image: '/tarot/minor/four-of-swords.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'stained-glass',
      icon: '🪟',
      shape: { type: 'rect', x: 4, y: 2, width: 33, height: 57, radius: 2 },
      i18nKey: 'fourOfSwords.regions.stainedGlass',
    },
    {
      id: 'effigy-knight',
      icon: '🛌',
      shape: { type: 'rect', x: 4, y: 93, width: 91, height: 32, radius: 2 },
      i18nKey: 'fourOfSwords.regions.effigyKnight',
    },
    {
      id: 'hanging-swords',
      icon: '🗡️',
      shape: { type: 'rect', x: 49, y: 14, width: 46, height: 76, radius: 2 },
      i18nKey: 'fourOfSwords.regions.hangingSwords',
    },
    {
      id: 'sword-below',
      icon: '⚔️',
      shape: { type: 'rect', x: 4, y: 136, width: 91, height: 20, radius: 2 },
      i18nKey: 'fourOfSwords.regions.swordBelow',
    },
  ],
};
