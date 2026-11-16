import type { TarotCard } from './types';

/**
 * Death (XIII) — Rider-Waite major arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const death: TarotCard = {
  id: 'death',
  number: 13,
  name: 'Death',
  image: '/tarot/13_Death.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'rising-sun',
      icon: '🌅',
      shape: { type: 'circle', x: 77.4, y: 59.7, width: 14, height: 17.7 },
      i18nKey: 'death.regions.risingSun',
    },
    {
      id: 'river-boat',
      icon: '⛵',
      shape: { type: 'rect', x: 8.6, y: 108.1, width: 14, height: 10 },
      i18nKey: 'death.regions.riverBoat',
    },
    {
      id: 'skeleton-armor',
      icon: '💀',
      shape: { type: 'rect', x: 13.2, y: 35, width: 14, height: 35.2 },
      i18nKey: 'death.regions.skeletonArmor',
    },
    {
      id: 'black-horse',
      icon: '🐎',
      shape: { type: 'rect', x: 39, y: 49.7, width: 30.1, height: 49.3 },
      i18nKey: 'death.regions.blackHorse',
    },
    {
      id: 'banner-rose',
      icon: '🏴',
      shape: { type: 'rect', x: 41.5, y: 8.3, width: 37.6, height: 36.4 },
      i18nKey: 'death.regions.bannerRose',
    },
    {
      id: 'kneeling-figures',
      icon: '🧎',
      shape: { type: 'rect', x: 78.2, y: 115.2, width: 14, height: 36.4 },
      i18nKey: 'death.regions.kneelingFigures',
    },
    {
      id: 'child-flowers',
      icon: '💐',
      shape: { type: 'rect', x: 56.8, y: 127.3, width: 12.3, height: 10 },
      i18nKey: 'death.regions.childFlowers',
    },
  ],
};
