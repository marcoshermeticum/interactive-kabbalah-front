import type { TarotCard } from './types';

/**
 * Ace of Wands (wands 1) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const aceOfWands: TarotCard = {
  id: 'aceOfWands',
  arcana: 'minor',
  suit: 'wands',
  rank: 1,
  name: 'Ace of Wands',
  image: '/tarot/minor/ace-of-wands.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'hand-cloud',
      icon: '✋',
      shape: { type: 'rect', x: 30.2, y: 78.2, width: 45.8, height: 39.4 },
      i18nKey: 'aceOfWands.regions.handCloud',
    },
    {
      id: 'budding-wand',
      icon: '🌱',
      shape: { type: 'rect', x: 37, y: 6.2, width: 10, height: 69.7 },
      i18nKey: 'aceOfWands.regions.buddingWand',
    },
    {
      id: 'falling-leaves',
      icon: '🍃',
      shape: { type: 'rect', x: 18.4, y: 55.3, width: 14, height: 21.9 },
      i18nKey: 'aceOfWands.regions.fallingLeaves',
    },
    {
      id: 'castle-landscape',
      icon: '🏰',
      shape: { type: 'rect', x: 11.1, y: 117.6, width: 18.8, height: 20 },
      i18nKey: 'aceOfWands.regions.castleLandscape',
    },
  ],
};
