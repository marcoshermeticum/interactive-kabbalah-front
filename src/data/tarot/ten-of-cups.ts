import type { TarotCard } from './types';

/**
 * Ten of Cups (cups 10) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const tenOfCups: TarotCard = {
  id: 'tenOfCups',
  arcana: 'minor',
  suit: 'cups',
  rank: 10,
  name: 'Ten of Cups',
  image: '/tarot/minor/ten-of-cups.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'rainbow-cups',
      icon: '🌈',
      shape: { type: 'rect', x: 4, y: 13, width: 91, height: 64, radius: 2 },
      i18nKey: 'tenOfCups.regions.rainbowCups',
    },
    {
      id: 'embracing-couple',
      icon: '💑',
      shape: { type: 'rect', x: 13, y: 93, width: 48, height: 56, radius: 2 },
      i18nKey: 'tenOfCups.regions.embracingCouple',
    },
    {
      id: 'playing-children',
      icon: '🧒',
      shape: { type: 'rect', x: 63, y: 115, width: 27, height: 33, radius: 2 },
      i18nKey: 'tenOfCups.regions.playingChildren',
    },
    {
      id: 'home-valley',
      icon: '🏡',
      shape: { type: 'rect', x: 62, y: 98, width: 33, height: 16, radius: 2 },
      i18nKey: 'tenOfCups.regions.homeValley',
    },
  ],
};
