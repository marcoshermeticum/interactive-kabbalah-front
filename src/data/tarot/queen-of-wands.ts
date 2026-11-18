import type { TarotCard } from './types';

/**
 * Queen of Wands (wands 13) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const queenOfWands: TarotCard = {
  id: 'queenOfWands',
  arcana: 'minor',
  suit: 'wands',
  rank: 13,
  name: 'Queen of Wands',
  image: '/tarot/minor/queen-of-wands.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'sunflower',
      icon: '🌻',
      shape: { type: 'circle', x: 69.9, y: 44, width: 14, height: 13.9 },
      i18nKey: 'queenOfWands.regions.sunflower',
    },
    {
      id: 'wand-in-hand',
      icon: '🪄',
      shape: { type: 'rect', x: 18.6, y: 18.8, width: 14, height: 120.1 },
      i18nKey: 'queenOfWands.regions.wandInHand',
    },
    {
      id: 'black-cat',
      icon: '🐈‍⬛',
      shape: { type: 'rect', x: 34.3, y: 121.2, width: 14, height: 28.5 },
      i18nKey: 'queenOfWands.regions.blackCat',
    },
    {
      id: 'lion-throne',
      icon: '🦁',
      shape: { type: 'rect', x: 28.9, y: 4.1, width: 39.7, height: 26 },
      i18nKey: 'queenOfWands.regions.lionThrone',
    },
  ],
};
