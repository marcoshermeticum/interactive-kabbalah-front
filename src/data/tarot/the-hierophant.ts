import type { TarotCard } from './types';

/**
 * The Hierophant (V) — Rider-Waite major arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const theHierophant: TarotCard = {
  id: 'theHierophant',
  number: 5,
  name: 'The Hierophant',
  image: '/tarot/05_Hierophant.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'triple-crown',
      icon: '👑',
      shape: { type: 'triangle', x: 44.1, y: 19.6, width: 14, height: 14.9 },
      i18nKey: 'theHierophant.regions.tripleCrown',
    },
    {
      id: 'triple-cross',
      icon: '✝️',
      shape: { type: 'rect', x: 48.5, y: 61.3, width: 5.7, height: 44.2 },
      i18nKey: 'theHierophant.regions.tripleCross',
    },
    {
      id: 'crossed-keys',
      icon: '🔑',
      shape: { type: 'circle', x: 43.5, y: 136.2, width: 15.5, height: 15.7 },
      i18nKey: 'theHierophant.regions.crossedKeys',
    },
    {
      id: 'blessing-hand',
      icon: '🖐️',
      shape: { type: 'circle', x: 17, y: 34.7, width: 9.6, height: 10 },
      i18nKey: 'theHierophant.regions.blessingHand',
    },
    {
      id: 'acolytes',
      icon: '👥',
      shape: { type: 'rect', x: 9.2, y: 115.8, width: 82.9, height: 10 },
      i18nKey: 'theHierophant.regions.acolytes',
    },
    {
      id: 'pillars',
      icon: '🏛️',
      shape: { type: 'rect', x: 7.4, y: 8.9, width: 20.7, height: 23.6 },
      i18nKey: 'theHierophant.regions.pillars',
    },
  ],
};
