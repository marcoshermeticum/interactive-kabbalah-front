import type { TarotCard } from './types';

/**
 * Six of Wands (wands 6) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const sixOfWands: TarotCard = {
  id: 'sixOfWands',
  arcana: 'minor',
  suit: 'wands',
  rank: 6,
  name: 'Six of Wands',
  image: '/tarot/minor/six-of-wands.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'laurel-wreath',
      icon: '🏆',
      shape: { type: 'circle', x: 52.9, y: 24, width: 18.7, height: 16.4 },
      i18nKey: 'sixOfWands.regions.laurelWreath',
    },
    {
      id: 'laurel-wreath-2',
      icon: '🏆',
      shape: { type: 'circle', x: 25.6, y: 48.2, width: 19, height: 16.4 },
      i18nKey: 'sixOfWands.regions.laurelWreath',
    },
    {
      id: 'victorious-rider',
      icon: '🏇',
      shape: { type: 'rect', x: 24.8, y: 65.7, width: 22.4, height: 53.5 },
      i18nKey: 'sixOfWands.regions.victoriousRider',
    },
    {
      id: 'white-horse',
      icon: '🐴',
      shape: { type: 'rect', x: 63.5, y: 79.9, width: 28.8, height: 38.7 },
      i18nKey: 'sixOfWands.regions.whiteHorse',
    },
    {
      id: 'crowd-of-staves',
      icon: '👥',
      shape: { type: 'rect', x: 48.8, y: 45.6, width: 38.3, height: 33.4 },
      i18nKey: 'sixOfWands.regions.crowdOfStaves',
    },
  ],
};
