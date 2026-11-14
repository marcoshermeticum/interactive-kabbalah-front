import type { TarotCard } from './types';

/**
 * Justice (XI) — Rider-Waite major arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const justice: TarotCard = {
  id: 'justice',
  number: 11,
  name: 'Justice',
  image: '/tarot/11_Justice.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'pillars-veil',
      icon: '🏛️',
      shape: { type: 'rect', x: 18.6, y: 16.8, width: 60.5, height: 10 },
      i18nKey: 'justice.regions.pillarsVeil',
    },
    {
      id: 'scales',
      icon: '⚖️',
      shape: { type: 'rect', x: 68.1, y: 74.4, width: 28, height: 30 },
      i18nKey: 'justice.regions.scales',
    },
    {
      id: 'sword',
      icon: '⚔️',
      shape: { type: 'rect', x: 10.1, y: 0, width: 14, height: 67.4 },
      i18nKey: 'justice.regions.sword',
    },
    {
      id: 'crown',
      icon: '👑',
      shape: { type: 'rect', x: 43.3, y: 33.2, width: 14, height: 10 },
      i18nKey: 'justice.regions.crown',
    },
    {
      id: 'red-mantle',
      icon: '🧥',
      shape: { type: 'triangle', x: 36.8, y: 63.8, width: 26.2, height: 23.9 },
      i18nKey: 'justice.regions.redMantle',
    },
  ],
};
