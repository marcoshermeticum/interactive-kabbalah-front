import type { TarotCard } from './types';

/**
 * Eight of Pentacles (pentacles 8) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const eightOfPentacles: TarotCard = {
  id: 'eightOfPentacles',
  arcana: 'minor',
  suit: 'pentacles',
  rank: 8,
  name: 'Eight of Pentacles',
  image: '/tarot/minor/eight-of-pentacles.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'engraving-craftsman',
      icon: '🔨',
      shape: { type: 'rect', x: 19, y: 82, width: 50, height: 64, radius: 2 },
      i18nKey: 'eightOfPentacles.regions.engravingCraftsman',
    },
    {
      id: 'finished-pentacles',
      icon: '🪙',
      shape: { type: 'circle', x: 70, y: 5, width: 20, height: 20 },
      i18nKey: 'eightOfPentacles.regions.finishedPentacles',
    },
    {
      id: 'finished-pentacles-2',
      icon: '🪙',
      shape: { type: 'circle', x: 70, y: 29, width: 20, height: 20 },
      i18nKey: 'eightOfPentacles.regions.finishedPentacles',
    },
    {
      id: 'finished-pentacles-3',
      icon: '🪙',
      shape: { type: 'circle', x: 70, y: 54, width: 20, height: 20 },
      i18nKey: 'eightOfPentacles.regions.finishedPentacles',
    },
    {
      id: 'finished-pentacles-4',
      icon: '🪙',
      shape: { type: 'circle', x: 70, y: 77, width: 20, height: 20 },
      i18nKey: 'eightOfPentacles.regions.finishedPentacles',
    },
    {
      id: 'finished-pentacles-5',
      icon: '🪙',
      shape: { type: 'circle', x: 70, y: 102, width: 20, height: 20 },
      i18nKey: 'eightOfPentacles.regions.finishedPentacles',
    },
    {
      id: 'finished-pentacles-6',
      icon: '🪙',
      shape: { type: 'circle', x: 70, y: 133, width: 20, height: 20 },
      i18nKey: 'eightOfPentacles.regions.finishedPentacles',
    },
    {
      id: 'pentacle-in-progress',
      icon: '🛠️',
      shape: { type: 'rect', x: 18, y: 148, width: 29, height: 13, radius: 2 },
      i18nKey: 'eightOfPentacles.regions.pentacleInProgress',
    },
    {
      id: 'distant-town',
      icon: '🏘️',
      shape: { type: 'rect', x: 4, y: 118, width: 14, height: 17, radius: 2 },
      i18nKey: 'eightOfPentacles.regions.distantTown',
    },
  ],
};
