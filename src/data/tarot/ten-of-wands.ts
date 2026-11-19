import type { TarotCard } from './types';

/**
 * Ten of Wands (wands 10) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const tenOfWands: TarotCard = {
  id: 'tenOfWands',
  arcana: 'minor',
  suit: 'wands',
  rank: 10,
  name: 'Ten of Wands',
  image: '/tarot/minor/ten-of-wands.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'bundle-of-wands',
      icon: '🪵',
      shape: { type: 'rect', x: 13, y: 8, width: 80, height: 50, radius: 2 },
      i18nKey: 'tenOfWands.regions.bundleOfWands',
    },
    {
      id: 'bent-back',
      icon: '🧎',
      shape: { type: 'rect', x: 14, y: 60, width: 63, height: 50, radius: 2 },
      i18nKey: 'tenOfWands.regions.bentBack',
    },
    {
      id: 'distant-village',
      icon: '🏘️',
      shape: { type: 'rect', x: 80, y: 116, width: 16, height: 24, radius: 2 },
      i18nKey: 'tenOfWands.regions.distantVillage',
    },
    {
      id: 'dusty-path',
      icon: '🛤️',
      shape: { type: 'rect', x: 36, y: 142, width: 59, height: 16, radius: 2 },
      i18nKey: 'tenOfWands.regions.dustyPath',
    },
  ],
};
