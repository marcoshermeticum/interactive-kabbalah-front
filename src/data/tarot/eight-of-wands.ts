import type { TarotCard } from './types';

/**
 * Eight of Wands (wands 8) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const eightOfWands: TarotCard = {
  id: 'eightOfWands',
  arcana: 'minor',
  suit: 'wands',
  rank: 8,
  name: 'Eight of Wands',
  image: '/tarot/minor/eight-of-wands.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'eight-wands',
      icon: '🪄',
      shape: { type: 'rect', x: 6.8, y: 18, width: 14, height: 115.8 },
      i18nKey: 'eightOfWands.regions.eightWands',
    },
    {
      id: 'open-sky',
      icon: '☁️',
      shape: { type: 'rect', x: 57.7, y: 14.2, width: 32.4, height: 21.8 },
      i18nKey: 'eightOfWands.regions.openSky',
    },
    {
      id: 'river',
      icon: '🏞️',
      shape: { type: 'rect', x: 3.9, y: 153.1, width: 93.3, height: 10 },
      i18nKey: 'eightOfWands.regions.river',
    },
    {
      id: 'green-hills',
      icon: '🌿',
      shape: { type: 'rect', x: 4.7, y: 136.6, width: 18.5, height: 17 },
      i18nKey: 'eightOfWands.regions.greenHills',
    },
  ],
};
