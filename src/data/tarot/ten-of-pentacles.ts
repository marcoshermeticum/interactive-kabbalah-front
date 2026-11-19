import type { TarotCard } from './types';

/**
 * Ten of Pentacles (pentacles 10) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const tenOfPentacles: TarotCard = {
  id: 'tenOfPentacles',
  arcana: 'minor',
  suit: 'pentacles',
  rank: 10,
  name: 'Ten of Pentacles',
  image: '/tarot/minor/ten-of-pentacles.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'patriarch-dogs',
      icon: '🐕',
      shape: { type: 'rect', x: 26, y: 83, width: 15, height: 40, radius: 2 },
      i18nKey: 'tenOfPentacles.regions.patriarchDogs',
    },
    {
      id: 'patriarch-dogs-2',
      icon: '🐕',
      shape: { type: 'rect', x: 62, y: 122, width: 24, height: 40, radius: 2 },
      i18nKey: 'tenOfPentacles.regions.patriarchDogs',
    },
    {
      id: 'family-child',
      icon: '👨‍👩‍👧',
      shape: { type: 'rect', x: 43, y: 75, width: 26, height: 37, radius: 2 },
      i18nKey: 'tenOfPentacles.regions.familyChild',
    },
    {
      id: 'family-child-2',
      icon: '👨‍👩‍👧',
      shape: { type: 'rect', x: 70, y: 76, width: 17, height: 19, radius: 2 },
      i18nKey: 'tenOfPentacles.regions.familyChild',
    },
    {
      id: 'family-child-3',
      icon: '👨‍👩‍👧',
      shape: { type: 'rect', x: 86, y: 114, width: 9, height: 33, radius: 2 },
      i18nKey: 'tenOfPentacles.regions.familyChild',
    },
    {
      id: 'tree-of-life-pentacles',
      icon: '🌳',
      shape: { type: 'circle', x: 10.4, y: 28.2, width: 17, height: 17 },
      i18nKey: 'tenOfPentacles.regions.treeOfLifePentacles',
    },
    {
      id: 'tree-of-life-pentacles-2',
      icon: '🌳',
      shape: { type: 'circle', x: 4.8, y: 48.2, width: 17, height: 17 },
      i18nKey: 'tenOfPentacles.regions.treeOfLifePentacles',
    },
    {
      id: 'tree-of-life-pentacles-3',
      icon: '🌳',
      shape: { type: 'circle', x: 8.2, y: 94.5, width: 17, height: 17 },
      i18nKey: 'tenOfPentacles.regions.treeOfLifePentacles',
    },
    {
      id: 'tree-of-life-pentacles-4',
      icon: '🌳',
      shape: { type: 'circle', x: 41.5, y: 19.3, width: 17, height: 17 },
      i18nKey: 'tenOfPentacles.regions.treeOfLifePentacles',
    },
    {
      id: 'tree-of-life-pentacles-5',
      icon: '🌳',
      shape: { type: 'circle', x: 41.5, y: 57.1, width: 17, height: 17 },
      i18nKey: 'tenOfPentacles.regions.treeOfLifePentacles',
    },
    {
      id: 'tree-of-life-pentacles-6',
      icon: '🌳',
      shape: { type: 'circle', x: 75.9, y: 28.2, width: 17, height: 17 },
      i18nKey: 'tenOfPentacles.regions.treeOfLifePentacles',
    },
    {
      id: 'tree-of-life-pentacles-7',
      icon: '🌳',
      shape: { type: 'circle', x: 75.9, y: 50.4, width: 17, height: 17 },
      i18nKey: 'tenOfPentacles.regions.treeOfLifePentacles',
    },
    {
      id: 'tree-of-life-pentacles-8',
      icon: '🌳',
      shape: { type: 'circle', x: 75.9, y: 95.9, width: 17, height: 17 },
      i18nKey: 'tenOfPentacles.regions.treeOfLifePentacles',
    },
    {
      id: 'tree-of-life-pentacles-9',
      icon: '🌳',
      shape: { type: 'circle', x: 41.5, y: 112.5, width: 17, height: 17 },
      i18nKey: 'tenOfPentacles.regions.treeOfLifePentacles',
    },
    {
      id: 'tree-of-life-pentacles-10',
      icon: '🌳',
      shape: { type: 'circle', x: 41.5, y: 139.3, width: 17, height: 17 },
      i18nKey: 'tenOfPentacles.regions.treeOfLifePentacles',
    },
    {
      id: 'estate-arch',
      icon: '🏰',
      shape: { type: 'rect', x: 62, y: 42, width: 13, height: 32, radius: 2 },
      i18nKey: 'tenOfPentacles.regions.estateArch',
    },
    {
      id: 'estate-arch-2',
      icon: '🏰',
      shape: { type: 'rect', x: 24, y: 59, width: 16, height: 22, radius: 2 },
      i18nKey: 'tenOfPentacles.regions.estateArch',
    },
  ],
};
