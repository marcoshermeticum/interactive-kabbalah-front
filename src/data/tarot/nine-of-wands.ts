import type { TarotCard } from './types';

/**
 * Nine of Wands (wands 9) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const nineOfWands: TarotCard = {
  id: 'nineOfWands',
  arcana: 'minor',
  suit: 'wands',
  rank: 9,
  name: 'Nine of Wands',
  image: '/tarot/minor/nine-of-wands.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'bandaged-head',
      icon: '🤕',
      shape: { type: 'circle', x: 57, y: 48, width: 19, height: 16.2 },
      i18nKey: 'nineOfWands.regions.bandagedHead',
    },
    {
      id: 'leaning-wand',
      icon: '🪄',
      shape: { type: 'rect', x: 58.8, y: 65.2, width: 14, height: 94.2 },
      i18nKey: 'nineOfWands.regions.leaningWand',
    },
    {
      id: 'wand-fence',
      icon: '🚧',
      shape: { type: 'rect', x: 6.5, y: 17, width: 39.1, height: 115.6 },
      i18nKey: 'nineOfWands.regions.wandFence',
    },
    {
      id: 'wary-gaze',
      icon: '👁️',
      shape: { type: 'rect', x: 73.2, y: 31.4, width: 14, height: 10 },
      i18nKey: 'nineOfWands.regions.waryGaze',
    },
  ],
};
