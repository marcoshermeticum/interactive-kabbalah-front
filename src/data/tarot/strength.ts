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
      // TODO: position — placeholder box, replace with the editor output.
      shape: { type: 'rect', x: 6, y: 8, width: 14, height: 10 },
      i18nKey: 'strength.regions.infinity',
    },
    {
      id: 'lion-mouth',
      icon: '🦁',
      // TODO: position — placeholder box, replace with the editor output.
      shape: { type: 'rect', x: 23, y: 8, width: 14, height: 10 },
      i18nKey: 'strength.regions.lionMouth',
    },
    {
      id: 'rose-garland',
      icon: '🌹',
      // TODO: position — placeholder box, replace with the editor output.
      shape: { type: 'rect', x: 40, y: 8, width: 14, height: 10 },
      i18nKey: 'strength.regions.roseGarland',
    },
    {
      id: 'red-ribbon',
      icon: '🎗️',
      // TODO: position — placeholder box, replace with the editor output.
      shape: { type: 'rect', x: 57, y: 8, width: 14, height: 10 },
      i18nKey: 'strength.regions.redRibbon',
    },
    {
      id: 'white-robe',
      icon: '👗',
      // TODO: position — placeholder box, replace with the editor output.
      shape: { type: 'rect', x: 74, y: 8, width: 14, height: 10 },
      i18nKey: 'strength.regions.whiteRobe',
    },
    {
      id: 'mountains',
      icon: '⛰️',
      // TODO: position — placeholder box, replace with the editor output.
      shape: { type: 'rect', x: 6, y: 21, width: 14, height: 10 },
      i18nKey: 'strength.regions.mountains',
    },
  ],
};
