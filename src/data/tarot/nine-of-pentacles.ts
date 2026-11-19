import type { TarotCard } from './types';

/**
 * Nine of Pentacles (pentacles 9) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const nineOfPentacles: TarotCard = {
  id: 'nineOfPentacles',
  arcana: 'minor',
  suit: 'pentacles',
  rank: 9,
  name: 'Nine of Pentacles',
  image: '/tarot/minor/nine-of-pentacles.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'falcon-glove',
      icon: '🦅',
      shape: { type: 'rect', x: 64, y: 29, width: 17, height: 38, radius: 2 },
      i18nKey: 'nineOfPentacles.regions.falconGlove',
    },
    {
      id: 'vineyard-pentacles',
      icon: '🍇',
      shape: { type: 'rect', x: 4, y: 93, width: 29, height: 55, radius: 2 },
      i18nKey: 'nineOfPentacles.regions.vineyardPentacles',
    },
    {
      id: 'vineyard-pentacles-2',
      icon: '🍇',
      shape: { type: 'rect', x: 64, y: 111, width: 30, height: 38, radius: 2 },
      i18nKey: 'nineOfPentacles.regions.vineyardPentacles',
    },
    {
      id: 'floral-robe',
      icon: '👗',
      shape: { type: 'rect', x: 34, y: 68, width: 30, height: 82, radius: 2 },
      i18nKey: 'nineOfPentacles.regions.floralRobe',
    },
    {
      id: 'garden-snail',
      icon: '🐌',
      shape: { type: 'rect', x: 17, y: 154, width: 10, height: 8, radius: 2 },
      i18nKey: 'nineOfPentacles.regions.gardenSnail',
    },
  ],
};
