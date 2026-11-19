import type { TarotCard } from './types';

/**
 * Knight of Pentacles (pentacles 12) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const knightOfPentacles: TarotCard = {
  id: 'knightOfPentacles',
  arcana: 'minor',
  suit: 'pentacles',
  rank: 12,
  name: 'Knight of Pentacles',
  image: '/tarot/minor/knight-of-pentacles.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'held-pentacle',
      icon: '🪙',
      shape: { type: 'circle', x: 56, y: 36, width: 21, height: 21 },
      i18nKey: 'knightOfPentacles.regions.heldPentacle',
    },
    {
      id: 'black-horse',
      icon: '🐴',
      shape: { type: 'rect', x: 58, y: 58, width: 35, height: 32, radius: 2 },
      i18nKey: 'knightOfPentacles.regions.blackHorse',
    },
    {
      id: 'black-horse-2',
      icon: '🐴',
      shape: { type: 'rect', x: 4, y: 72, width: 28, height: 48, radius: 2 },
      i18nKey: 'knightOfPentacles.regions.blackHorse',
    },
    {
      id: 'oak-leaf-helmet',
      icon: '🍃',
      shape: { type: 'rect', x: 18, y: 19, width: 30, height: 25, radius: 2 },
      i18nKey: 'knightOfPentacles.regions.oakLeafHelmet',
    },
    {
      id: 'plowed-land',
      icon: '🌾',
      shape: { type: 'rect', x: 4, y: 128, width: 91, height: 24, radius: 2 },
      i18nKey: 'knightOfPentacles.regions.plowedLand',
    },
  ],
};
