import type { TarotCard } from './types';

/**
 * Ace of Cups (cups 1) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const aceOfCups: TarotCard = {
  id: 'aceOfCups',
  arcana: 'minor',
  suit: 'cups',
  rank: 1,
  name: 'Ace of Cups',
  image: '/tarot/minor/ace-of-cups.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'hand-cloud',
      icon: '✋',
      shape: { type: 'rect', x: 20, y: 70, width: 48, height: 30, radius: 2 },
      i18nKey: 'aceOfCups.regions.handCloud',
    },
    {
      id: 'hand-cloud-2',
      icon: '✋',
      shape: { type: 'rect', x: 69, y: 44, width: 25, height: 68, radius: 2 },
      i18nKey: 'aceOfCups.regions.handCloud',
    },
    {
      id: 'overflowing-chalice',
      icon: '🏆',
      shape: { type: 'rect', x: 37, y: 38, width: 30, height: 31, radius: 2 },
      i18nKey: 'aceOfCups.regions.overflowingChalice',
    },
    {
      id: 'dove-wafer',
      icon: '🕊️',
      shape: { type: 'rect', x: 36, y: 3, width: 28, height: 34, radius: 2 },
      i18nKey: 'aceOfCups.regions.doveWafer',
    },
    {
      id: 'lotus-pond',
      icon: '🪷',
      shape: { type: 'rect', x: 5, y: 131, width: 90, height: 20, radius: 2 },
      i18nKey: 'aceOfCups.regions.lotusPond',
    },
  ],
};
