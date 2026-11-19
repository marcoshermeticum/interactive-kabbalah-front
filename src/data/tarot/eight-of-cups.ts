import type { TarotCard } from './types';

/**
 * Eight of Cups (cups 8) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const eightOfCups: TarotCard = {
  id: 'eightOfCups',
  arcana: 'minor',
  suit: 'cups',
  rank: 8,
  name: 'Eight of Cups',
  image: '/tarot/minor/eight-of-cups.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'departing-man',
      icon: '🚶',
      shape: { type: 'rect', x: 53, y: 68, width: 30, height: 52, radius: 2 },
      i18nKey: 'eightOfCups.regions.departingMan',
    },
    {
      id: 'stacked-cups',
      icon: '🥃',
      shape: { type: 'rect', x: 5, y: 138, width: 90, height: 22, radius: 2 },
      i18nKey: 'eightOfCups.regions.stackedCups',
    },
    {
      id: 'stacked-cups-2',
      icon: '🥃',
      shape: { type: 'rect', x: 15, y: 106, width: 38, height: 32, radius: 2 },
      i18nKey: 'eightOfCups.regions.stackedCups',
    },
    {
      id: 'stacked-cups-3',
      icon: '🥃',
      shape: { type: 'rect', x: 68, y: 121, width: 17, height: 17, radius: 2 },
      i18nKey: 'eightOfCups.regions.stackedCups',
    },
    {
      id: 'eclipsed-moon',
      icon: '🌘',
      shape: { type: 'circle', x: 15, y: 28, width: 22, height: 22 },
      i18nKey: 'eightOfCups.regions.eclipsedMoon',
    },
    {
      id: 'mountains-river',
      icon: '⛰️',
      shape: { type: 'rect', x: 4, y: 70, width: 35, height: 36, radius: 2 },
      i18nKey: 'eightOfCups.regions.mountainsRiver',
    },
    {
      id: 'mountains-river-2',
      icon: '⛰️',
      shape: { type: 'rect', x: 84, y: 59, width: 11, height: 46, radius: 2 },
      i18nKey: 'eightOfCups.regions.mountainsRiver',
    },
  ],
};
