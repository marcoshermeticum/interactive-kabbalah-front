import type { TarotCard } from './types';

/**
 * Strength (VIII) — Rider-Waite major arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const strength: TarotCard = {
  id: 'strength',
  number: 8,
  name: 'Strength',
  image: '/tarot/08_Strength.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'infinity',
      icon: '♾️',
      shape: { type: 'circle', x: 8.9, y: 25, width: 21.3, height: 16.4 },
      i18nKey: 'strength.regions.infinity',
    },
    {
      id: 'lion-mouth',
      icon: '🦁',
      shape: { type: 'circle', x: 27.7, y: 80.3, width: 17.7, height: 15.7 },
      i18nKey: 'strength.regions.lionMouth',
    },
    {
      id: 'rose-garland',
      icon: '🌹',
      shape: { type: 'rect', x: 12.2, y: 38.1, width: 23.4, height: 8.9 },
      i18nKey: 'strength.regions.roseGarland',
    },
    {
      id: 'white-robe',
      icon: '👗',
      shape: { type: 'rect', x: 29.9, y: 57.6, width: 14, height: 10 },
      i18nKey: 'strength.regions.whiteRobe',
    },
    {
      id: 'mountains',
      icon: '⛰️',
      shape: { type: 'triangle', x: 5, y: 106.1, width: 18, height: 13.7 },
      i18nKey: 'strength.regions.mountains',
    },
  ],
};
