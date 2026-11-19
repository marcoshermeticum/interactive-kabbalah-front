import type { TarotCard } from './types';

/**
 * Ten of Swords (swords 10) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const tenOfSwords: TarotCard = {
  id: 'tenOfSwords',
  arcana: 'minor',
  suit: 'swords',
  rank: 10,
  name: 'Ten of Swords',
  image: '/tarot/minor/ten-of-swords.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'ten-swords',
      icon: '🗡️',
      shape: { type: 'rect', x: 9, y: 36, width: 86, height: 40, radius: 2 },
      i18nKey: 'tenOfSwords.regions.tenSwords',
    },
    {
      id: 'ten-swords-2',
      icon: '🗡️',
      shape: { type: 'rect', x: 9, y: 105, width: 86, height: 20, radius: 2 },
      i18nKey: 'tenOfSwords.regions.tenSwords',
    },
    {
      id: 'fallen-figure',
      icon: '🪦',
      shape: { type: 'rect', x: 4, y: 126, width: 88, height: 32, radius: 2 },
      i18nKey: 'tenOfSwords.regions.fallenFigure',
    },
    {
      id: 'dawn-horizon',
      icon: '🌅',
      shape: { type: 'rect', x: 4, y: 77, width: 91, height: 28, radius: 2 },
      i18nKey: 'tenOfSwords.regions.dawnHorizon',
    },
    {
      id: 'black-sky',
      icon: '🌑',
      shape: { type: 'rect', x: 4, y: 4, width: 91, height: 31, radius: 2 },
      i18nKey: 'tenOfSwords.regions.blackSky',
    },
  ],
};
