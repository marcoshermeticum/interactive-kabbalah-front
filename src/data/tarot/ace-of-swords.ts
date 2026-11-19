import type { TarotCard } from './types';

/**
 * Ace of Swords (swords 1) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const aceOfSwords: TarotCard = {
  id: 'aceOfSwords',
  arcana: 'minor',
  suit: 'swords',
  rank: 1,
  name: 'Ace of Swords',
  image: '/tarot/minor/ace-of-swords.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'hand-cloud',
      icon: '✋',
      shape: { type: 'rect', x: 30, y: 100, width: 35, height: 25, radius: 2 },
      i18nKey: 'aceOfSwords.regions.handCloud',
    },
    {
      id: 'hand-cloud-2',
      icon: '✋',
      shape: { type: 'rect', x: 4, y: 58, width: 25, height: 70, radius: 2 },
      i18nKey: 'aceOfSwords.regions.handCloud',
    },
    {
      id: 'crowned-sword',
      icon: '⚔️',
      shape: { type: 'rect', x: 37, y: 6, width: 31, height: 20, radius: 2 },
      i18nKey: 'aceOfSwords.regions.crownedSword',
    },
    {
      id: 'crowned-sword-2',
      icon: '⚔️',
      shape: { type: 'rect', x: 46, y: 26, width: 10, height: 62, radius: 2 },
      i18nKey: 'aceOfSwords.regions.crownedSword',
    },
    {
      id: 'crowned-sword-3',
      icon: '⚔️',
      shape: { type: 'rect', x: 31, y: 89, width: 33, height: 10, radius: 2 },
      i18nKey: 'aceOfSwords.regions.crownedSword',
    },
    {
      id: 'laurel-palm',
      icon: '🌿',
      shape: { type: 'rect', x: 27, y: 27, width: 15, height: 30, radius: 2 },
      i18nKey: 'aceOfSwords.regions.laurelPalm',
    },
    {
      id: 'laurel-palm-2',
      icon: '🌿',
      shape: { type: 'rect', x: 60, y: 27, width: 14, height: 42, radius: 2 },
      i18nKey: 'aceOfSwords.regions.laurelPalm',
    },
    {
      id: 'barren-peaks',
      icon: '🏔️',
      shape: { type: 'rect', x: 4, y: 136, width: 91, height: 15, radius: 2 },
      i18nKey: 'aceOfSwords.regions.barrenPeaks',
    },
  ],
};
