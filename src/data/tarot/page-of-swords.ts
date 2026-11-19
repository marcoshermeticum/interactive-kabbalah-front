import type { TarotCard } from './types';

/**
 * Page of Swords (swords 11) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const pageOfSwords: TarotCard = {
  id: 'pageOfSwords',
  arcana: 'minor',
  suit: 'swords',
  rank: 11,
  name: 'Page of Swords',
  image: '/tarot/minor/page-of-swords.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'raised-sword',
      icon: '⚔️',
      shape: { type: 'rect', x: 71, y: 2, width: 12, height: 50, radius: 2 },
      i18nKey: 'pageOfSwords.regions.raisedSword',
    },
    {
      id: 'windblown-hair',
      icon: '💨',
      shape: { type: 'rect', x: 40, y: 20, width: 29, height: 22, radius: 2 },
      i18nKey: 'pageOfSwords.regions.windblownHair',
    },
    {
      id: 'birds-clouds',
      icon: '🕊️',
      shape: { type: 'rect', x: 24, y: 8, width: 28, height: 12, radius: 2 },
      i18nKey: 'pageOfSwords.regions.birdsClouds',
    },
    {
      id: 'birds-clouds-2',
      icon: '🕊️',
      shape: { type: 'rect', x: 16, y: 24, width: 23, height: 34, radius: 2 },
      i18nKey: 'pageOfSwords.regions.birdsClouds',
    },
    {
      id: 'birds-clouds-3',
      icon: '🕊️',
      shape: { type: 'rect', x: 72, y: 60, width: 23, height: 32, radius: 2 },
      i18nKey: 'pageOfSwords.regions.birdsClouds',
    },
    {
      id: 'birds-clouds-4',
      icon: '🕊️',
      shape: { type: 'rect', x: 20, y: 100, width: 75, height: 30, radius: 2 },
      i18nKey: 'pageOfSwords.regions.birdsClouds',
    },
    {
      id: 'bending-trees',
      icon: '🌳',
      shape: { type: 'rect', x: 4, y: 120, width: 14, height: 24, radius: 2 },
      i18nKey: 'pageOfSwords.regions.bendingTrees',
    },
  ],
};
