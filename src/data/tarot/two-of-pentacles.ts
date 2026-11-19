import type { TarotCard } from './types';

/**
 * Two of Pentacles (pentacles 2) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const twoOfPentacles: TarotCard = {
  id: 'twoOfPentacles',
  arcana: 'minor',
  suit: 'pentacles',
  rank: 2,
  name: 'Two of Pentacles',
  image: '/tarot/minor/two-of-pentacles.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'juggled-pentacles',
      icon: '🤹',
      shape: { type: 'circle', x: 4, y: 47, width: 20, height: 22 },
      i18nKey: 'twoOfPentacles.regions.juggledPentacles',
    },
    {
      id: 'juggled-pentacles-2',
      icon: '🤹',
      shape: { type: 'circle', x: 68, y: 79, width: 20, height: 21 },
      i18nKey: 'twoOfPentacles.regions.juggledPentacles',
    },
    {
      id: 'infinity-ribbon',
      icon: '♾️',
      shape: { type: 'rect', x: 25, y: 58, width: 42, height: 40, radius: 2 },
      i18nKey: 'twoOfPentacles.regions.infinityRibbon',
    },
    {
      id: 'ships-waves',
      icon: '🚢',
      shape: { type: 'rect', x: 4, y: 126, width: 91, height: 14, radius: 2 },
      i18nKey: 'twoOfPentacles.regions.shipsWaves',
    },
    {
      id: 'ships-waves-2',
      icon: '🚢',
      shape: { type: 'rect', x: 66, y: 116, width: 15, height: 10, radius: 2 },
      i18nKey: 'twoOfPentacles.regions.shipsWaves',
    },
    {
      id: 'tall-hat',
      icon: '🎩',
      shape: { type: 'rect', x: 37, y: 29, width: 25, height: 27, radius: 2 },
      i18nKey: 'twoOfPentacles.regions.tallHat',
    },
  ],
};
