import type { TarotCard } from './types';

/**
 * Seven of Pentacles (pentacles 7) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const sevenOfPentacles: TarotCard = {
  id: 'sevenOfPentacles',
  arcana: 'minor',
  suit: 'pentacles',
  rank: 7,
  name: 'Seven of Pentacles',
  image: '/tarot/minor/seven-of-pentacles.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'leaning-hoe',
      icon: '🧑‍🌾',
      shape: { type: 'rect', x: 58, y: 74, width: 8, height: 66, radius: 2 },
      i18nKey: 'sevenOfPentacles.regions.leaningHoe',
    },
    {
      id: 'pentacle-bush',
      icon: '🌿',
      shape: { type: 'rect', x: 4, y: 53, width: 49, height: 106, radius: 2 },
      i18nKey: 'sevenOfPentacles.regions.pentacleBush',
    },
    {
      id: 'pentacle-bush-2',
      icon: '🌿',
      shape: { type: 'circle', x: 61, y: 142, width: 17, height: 17 },
      i18nKey: 'sevenOfPentacles.regions.pentacleBush',
    },
    {
      id: 'reflective-gaze',
      icon: '🤔',
      shape: { type: 'rect', x: 44, y: 32, width: 24, height: 21, radius: 2 },
      i18nKey: 'sevenOfPentacles.regions.reflectiveGaze',
    },
    {
      id: 'green-field',
      icon: '🌱',
      shape: { type: 'rect', x: 79, y: 125, width: 16, height: 30, radius: 2 },
      i18nKey: 'sevenOfPentacles.regions.greenField',
    },
  ],
};
