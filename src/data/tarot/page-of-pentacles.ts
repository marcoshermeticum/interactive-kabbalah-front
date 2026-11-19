import type { TarotCard } from './types';

/**
 * Page of Pentacles (pentacles 11) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const pageOfPentacles: TarotCard = {
  id: 'pageOfPentacles',
  arcana: 'minor',
  suit: 'pentacles',
  rank: 11,
  name: 'Page of Pentacles',
  image: '/tarot/minor/page-of-pentacles.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'raised-pentacle',
      icon: '🪙',
      shape: { type: 'circle', x: 58, y: 19, width: 20, height: 20 },
      i18nKey: 'pageOfPentacles.regions.raisedPentacle',
    },
    {
      id: 'red-cap',
      icon: '🧢',
      shape: { type: 'rect', x: 25, y: 19, width: 30, height: 27, radius: 2 },
      i18nKey: 'pageOfPentacles.regions.redCap',
    },
    {
      id: 'plowed-field',
      icon: '🌾',
      shape: { type: 'rect', x: 72, y: 128, width: 23, height: 16, radius: 2 },
      i18nKey: 'pageOfPentacles.regions.plowedField',
    },
    {
      id: 'trees-mountains',
      icon: '🏔️',
      shape: { type: 'rect', x: 4, y: 110, width: 26, height: 18, radius: 2 },
      i18nKey: 'pageOfPentacles.regions.treesMountains',
    },
    {
      id: 'trees-mountains-2',
      icon: '🏔️',
      shape: { type: 'rect', x: 60, y: 118, width: 35, height: 10, radius: 2 },
      i18nKey: 'pageOfPentacles.regions.treesMountains',
    },
  ],
};
