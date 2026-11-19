import type { TarotCard } from './types';

/**
 * King of Wands (wands 14) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const kingOfWands: TarotCard = {
  id: 'kingOfWands',
  arcana: 'minor',
  suit: 'wands',
  rank: 14,
  name: 'King of Wands',
  image: '/tarot/minor/king-of-wands.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'budding-sceptre',
      icon: '🪄',
      shape: { type: 'rect', x: 9, y: 16, width: 14, height: 128, radius: 2 },
      i18nKey: 'kingOfWands.regions.buddingSceptre',
    },
    {
      id: 'salamander-mantle',
      icon: '🦎',
      shape: { type: 'rect', x: 72, y: 50, width: 22, height: 90, radius: 2 },
      i18nKey: 'kingOfWands.regions.salamanderMantle',
    },
    {
      id: 'lion-throne',
      icon: '🦁',
      shape: { type: 'rect', x: 61, y: 2, width: 28, height: 44, radius: 2 },
      i18nKey: 'kingOfWands.regions.lionThrone',
    },
    {
      id: 'crown-gaze',
      icon: '👑',
      shape: { type: 'rect', x: 36, y: 23, width: 24, height: 23, radius: 2 },
      i18nKey: 'kingOfWands.regions.crownGaze',
    },
  ],
};
