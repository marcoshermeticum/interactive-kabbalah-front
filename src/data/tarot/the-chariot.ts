import type { TarotCard } from './types';

/**
 * The Chariot (VII) — Rider-Waite major arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const theChariot: TarotCard = {
  id: 'theChariot',
  number: 7,
  name: 'The Chariot',
  image: '/tarot/07_Chariot.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'starry-canopy',
      icon: '🌌',
      shape: { type: 'rect', x: 18.8, y: 12.9, width: 58.1, height: 10 },
      i18nKey: 'theChariot.regions.starryCanopy',
    },
    {
      id: 'sphinxes',
      icon: '🗿',
      shape: { type: 'rect', x: 10.2, y: 119.8, width: 78, height: 11.6 },
      i18nKey: 'theChariot.regions.sphinxes',
    },
    {
      id: 'winged-sun',
      icon: '☀️',
      shape: { type: 'circle', x: 46, y: 93.1, width: 9.5, height: 9.4 },
      i18nKey: 'theChariot.regions.wingedSun',
    },
    {
      id: 'shoulder-moons',
      icon: '🌙',
      shape: { type: 'rect', x: 30.8, y: 41.9, width: 39.5, height: 6.2 },
      i18nKey: 'theChariot.regions.shoulderMoons',
    },
    {
      id: 'city-walls',
      icon: '🏰',
      shape: { type: 'rect', x: 79.6, y: 72.9, width: 14, height: 10 },
      i18nKey: 'theChariot.regions.cityWalls',
    },
    {
      id: 'square-emblem',
      icon: '🔷',
      shape: { type: 'rect', x: 43.1, y: 49.3, width: 14, height: 10 },
      i18nKey: 'theChariot.regions.squareEmblem',
    },
  ],
};
