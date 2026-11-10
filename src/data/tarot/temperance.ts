import type { TarotCard } from './types';

/**
 * Temperance (XIV) — Rider-Waite major arcana.
 *
 * viewBox is 100 x 165 to match the ~600x990 artwork aspect ratio.
 * Region polygons are a first approximation of the composition and are
 * meant to be refined visually against the real image. Coordinates are
 * in viewBox space (x: 0–100 left→right, y: 0–165 top→bottom).
 */
export const temperance: TarotCard = {
  id: 'temperance',
  number: 14,
  name: 'Temperance',
  image: '/tarot/temperance.jpg',
  viewBox: { width: 100, height: 165 },
  regions: [
    {
      id: 'crown-halo',
      icon: '☀️',
      // The radiant solar halo / crown around the angel's head (top center).
      points: '35,14 50,10 65,14 66,30 50,34 34,30',
      i18nKey: 'temperance.regions.crownHalo',
    },
    {
      id: 'wings',
      icon: '🪽',
      // Both wings spreading left and right behind the angel.
      points: '4,22 34,30 34,70 10,66 2,45',
      i18nKey: 'temperance.regions.wings',
    },
    {
      id: 'triangle-square',
      icon: '🔺',
      // The triangle inside a square on the angel's chest.
      points: '40,46 60,46 60,62 40,62',
      i18nKey: 'temperance.regions.triangleSquare',
    },
    {
      id: 'cups-water',
      icon: '🌊',
      // The two cups and the water flowing between them.
      points: '26,70 46,64 60,66 74,74 60,86 44,84 30,84',
      i18nKey: 'temperance.regions.cupsWater',
    },
    {
      id: 'sun-mountain',
      icon: '⛰️',
      // The rising sun over the mountains and the winding path (lower left).
      points: '2,88 30,92 30,120 2,124',
      i18nKey: 'temperance.regions.sunMountain',
    },
    {
      id: 'irises',
      icon: '🌸',
      // The yellow irises among the reeds (lower right).
      points: '70,86 98,84 98,126 70,124',
      i18nKey: 'temperance.regions.irises',
    },
    {
      id: 'water-feet',
      icon: '💧',
      // The pool of water the angel stands in, one foot submerged.
      points: '0,150 30,146 50,150 70,146 100,150 100,165 0,165',
      i18nKey: 'temperance.regions.waterFeet',
    },
  ],
};
