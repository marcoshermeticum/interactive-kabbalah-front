import type { TarotCard } from './types';

/**
 * The Devil (XV) — Rider-Waite major arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const theDevil: TarotCard = {
  id: 'theDevil',
  number: 15,
  name: 'The Devil',
  image: '/tarot/15_Devil.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'bat-wings',
      icon: '🦇',
      shape: { type: 'rect', x: 4, y: 8, width: 29, height: 52, radius: 2 },
      i18nKey: 'theDevil.regions.batWings',
    },
    {
      id: 'bat-wings-right',
      icon: '🦇',
      shape: { type: 'rect', x: 66.5, y: 6, width: 29, height: 52, radius: 2 },
      i18nKey: 'theDevil.regions.batWings',
    },
    {
      id: 'inverted-pentagram',
      icon: '⛧',
      shape: { type: 'circle', x: 41, y: 4, width: 16, height: 18 },
      i18nKey: 'theDevil.regions.invertedPentagram',
    },
    {
      id: 'captives',
      icon: '👫',
      shape: { type: 'rect', x: 14, y: 82, width: 21, height: 50, radius: 2 },
      i18nKey: 'theDevil.regions.captives',
    },
    {
      id: 'captives-right',
      icon: '👫',
      shape: { type: 'rect', x: 62, y: 82, width: 18, height: 50, radius: 2 },
      i18nKey: 'theDevil.regions.captives',
    },
    {
      id: 'chains',
      icon: '⛓️',
      shape: { type: 'rect', x: 36.5, y: 107, width: 24, height: 25, radius: 2 },
      i18nKey: 'theDevil.regions.chains',
    },
    {
      id: 'torch',
      icon: '🔥',
      shape: { type: 'rect', x: 81, y: 88, width: 14, height: 34, radius: 2 },
      i18nKey: 'theDevil.regions.torch',
    },
    {
      id: 'dark-cave',
      icon: '🕳️',
      shape: { type: 'rect', x: 3, y: 134, width: 94, height: 17, radius: 2 },
      i18nKey: 'theDevil.regions.darkCave',
    },
  ],
};
