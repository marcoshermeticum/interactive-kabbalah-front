import type { TarotCard } from './types';

/**
 * Queen of Pentacles (pentacles 13) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const queenOfPentacles: TarotCard = {
  id: 'queenOfPentacles',
  arcana: 'minor',
  suit: 'pentacles',
  rank: 13,
  name: 'Queen of Pentacles',
  image: '/tarot/minor/queen-of-pentacles.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'pentacle-lap',
      icon: '🪙',
      shape: { type: 'circle', x: 24, y: 65, width: 24, height: 24 },
      i18nKey: 'queenOfPentacles.regions.pentacleLap',
    },
    {
      id: 'hare',
      icon: '🐇',
      shape: { type: 'rect', x: 78, y: 124, width: 17, height: 18, radius: 2 },
      i18nKey: 'queenOfPentacles.regions.hare',
    },
    {
      id: 'carved-throne',
      icon: '🐐',
      shape: { type: 'rect', x: 48, y: 22, width: 36, height: 50, radius: 2 },
      i18nKey: 'queenOfPentacles.regions.carvedThrone',
    },
    {
      id: 'carved-throne-2',
      icon: '🐐',
      shape: { type: 'rect', x: 51, y: 92, width: 24, height: 38, radius: 2 },
      i18nKey: 'queenOfPentacles.regions.carvedThrone',
    },
    {
      id: 'rose-bower',
      icon: '🌹',
      shape: { type: 'rect', x: 4, y: 2, width: 91, height: 19, radius: 2 },
      i18nKey: 'queenOfPentacles.regions.roseBower',
    },
    {
      id: 'rose-bower-2',
      icon: '🌹',
      shape: { type: 'rect', x: 86, y: 24, width: 9, height: 90, radius: 2 },
      i18nKey: 'queenOfPentacles.regions.roseBower',
    },
    {
      id: 'rose-bower-3',
      icon: '🌹',
      shape: { type: 'rect', x: 4, y: 22, width: 10, height: 30, radius: 2 },
      i18nKey: 'queenOfPentacles.regions.roseBower',
    },
  ],
};
