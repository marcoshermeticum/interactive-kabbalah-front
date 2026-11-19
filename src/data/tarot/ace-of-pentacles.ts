import type { TarotCard } from './types';

/**
 * Ace of Pentacles (pentacles 1) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const aceOfPentacles: TarotCard = {
  id: 'aceOfPentacles',
  arcana: 'minor',
  suit: 'pentacles',
  rank: 1,
  name: 'Ace of Pentacles',
  image: '/tarot/minor/ace-of-pentacles.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'hand-cloud',
      icon: '✋',
      shape: { type: 'rect', x: 28, y: 64, width: 60, height: 26, radius: 2 },
      i18nKey: 'aceOfPentacles.regions.handCloud',
    },
    {
      id: 'hand-cloud-2',
      icon: '✋',
      shape: { type: 'rect', x: 4, y: 33, width: 24, height: 74, radius: 2 },
      i18nKey: 'aceOfPentacles.regions.handCloud',
    },
    {
      id: 'golden-pentacle',
      icon: '🪙',
      shape: { type: 'circle', x: 39, y: 32, width: 44, height: 31 },
      i18nKey: 'aceOfPentacles.regions.goldenPentacle',
    },
    {
      id: 'flower-garden',
      icon: '🌷',
      shape: { type: 'rect', x: 4, y: 128, width: 36, height: 24, radius: 2 },
      i18nKey: 'aceOfPentacles.regions.flowerGarden',
    },
    {
      id: 'flower-garden-2',
      icon: '🌷',
      shape: { type: 'rect', x: 41, y: 130, width: 14, height: 22, radius: 2 },
      i18nKey: 'aceOfPentacles.regions.flowerGarden',
    },
    {
      id: 'arch-mountains',
      icon: '⛰️',
      shape: { type: 'rect', x: 56, y: 111, width: 28, height: 38, radius: 2 },
      i18nKey: 'aceOfPentacles.regions.archMountains',
    },
  ],
};
