import type { TarotCard } from './types';

/**
 * The Star (XVII) — Rider-Waite major arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const theStar: TarotCard = {
  id: 'theStar',
  number: 17,
  name: 'The Star',
  image: '/tarot/17_Star.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'great-star',
      icon: '⭐',
      shape: { type: 'triangle', x: 33.1, y: 10.6, width: 41.9, height: 36 },
      i18nKey: 'theStar.regions.greatStar',
    },
    {
      id: 'seven-stars',
      icon: '✨',
      shape: { type: 'rect', x: 6.5, y: 29, width: 19.1, height: 18 },
      i18nKey: 'theStar.regions.sevenStars',
    },
    {
      id: 'two-jugs',
      icon: '🫗',
      shape: { type: 'rect', x: 18.4, y: 96.2, width: 14, height: 10 },
      i18nKey: 'theStar.regions.twoJugs',
    },
    {
      id: 'ibis',
      icon: '🐦',
      shape: { type: 'rect', x: 57, y: 8, width: 14, height: 10 },
      i18nKey: 'theStar.regions.ibis',
    },
    {
      id: 'pool',
      icon: '💦',
      shape: { type: 'circle', x: 9.1, y: 118.1, width: 42.7, height: 28.5 },
      i18nKey: 'theStar.regions.pool',
    },
    {
      id: 'horizon',
      icon: '🌱',
      shape: { type: 'rect', x: 5, y: 83.2, width: 30.6, height: 10 },
      i18nKey: 'theStar.regions.horizon',
    },
  ],
};
