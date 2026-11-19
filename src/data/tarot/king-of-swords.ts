import type { TarotCard } from './types';

/**
 * King of Swords (swords 14) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const kingOfSwords: TarotCard = {
  id: 'kingOfSwords',
  arcana: 'minor',
  suit: 'swords',
  rank: 14,
  name: 'King of Swords',
  image: '/tarot/minor/king-of-swords.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'judge-sword',
      icon: '⚔️',
      shape: { type: 'rect', x: 22, y: 7, width: 15, height: 50, radius: 2 },
      i18nKey: 'kingOfSwords.regions.judgeSword',
    },
    {
      id: 'judge-sword-2',
      icon: '⚔️',
      shape: { type: 'rect', x: 25, y: 58, width: 20, height: 22, radius: 2 },
      i18nKey: 'kingOfSwords.regions.judgeSword',
    },
    {
      id: 'butterfly-crown',
      icon: '🦋',
      shape: { type: 'rect', x: 38, y: 24, width: 26, height: 30, radius: 2 },
      i18nKey: 'kingOfSwords.regions.butterflyCrown',
    },
    {
      id: 'carved-throne',
      icon: '🪑',
      shape: { type: 'rect', x: 38, y: 3, width: 27, height: 20, radius: 2 },
      i18nKey: 'kingOfSwords.regions.carvedThrone',
    },
    {
      id: 'carved-throne-2',
      icon: '🪑',
      shape: { type: 'rect', x: 65, y: 24, width: 7, height: 45, radius: 2 },
      i18nKey: 'kingOfSwords.regions.carvedThrone',
    },
    {
      id: 'blue-mantle',
      icon: '🟦',
      shape: { type: 'rect', x: 18, y: 81, width: 55, height: 59, radius: 2 },
      i18nKey: 'kingOfSwords.regions.blueMantle',
    },
  ],
};
