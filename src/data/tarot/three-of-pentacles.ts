import type { TarotCard } from './types';

/**
 * Three of Pentacles (pentacles 3) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const threeOfPentacles: TarotCard = {
  id: 'threeOfPentacles',
  arcana: 'minor',
  suit: 'pentacles',
  rank: 3,
  name: 'Three of Pentacles',
  image: '/tarot/minor/three-of-pentacles.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'craftsman',
      icon: '🔨',
      shape: { type: 'rect', x: 4, y: 63, width: 38, height: 96, radius: 2 },
      i18nKey: 'threeOfPentacles.regions.craftsman',
    },
    {
      id: 'carved-pentacles',
      icon: '🪙',
      shape: { type: 'rect', x: 29, y: 18, width: 40, height: 31, radius: 2 },
      i18nKey: 'threeOfPentacles.regions.carvedPentacles',
    },
    {
      id: 'plan-patrons',
      icon: '📜',
      shape: { type: 'rect', x: 46, y: 73, width: 41, height: 87, radius: 2 },
      i18nKey: 'threeOfPentacles.regions.planPatrons',
    },
    {
      id: 'gothic-arch',
      icon: '⛪',
      shape: { type: 'rect', x: 4, y: 2, width: 24, height: 56, radius: 2 },
      i18nKey: 'threeOfPentacles.regions.gothicArch',
    },
    {
      id: 'gothic-arch-2',
      icon: '⛪',
      shape: { type: 'rect', x: 70, y: 2, width: 25, height: 56, radius: 2 },
      i18nKey: 'threeOfPentacles.regions.gothicArch',
    },
    {
      id: 'gothic-arch-3',
      icon: '⛪',
      shape: { type: 'rect', x: 29, y: 2, width: 40, height: 15, radius: 2 },
      i18nKey: 'threeOfPentacles.regions.gothicArch',
    },
    {
      id: 'gothic-arch-4',
      icon: '⛪',
      shape: { type: 'rect', x: 43, y: 50, width: 25, height: 22, radius: 2 },
      i18nKey: 'threeOfPentacles.regions.gothicArch',
    },
  ],
};
