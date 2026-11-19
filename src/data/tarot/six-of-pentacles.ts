import type { TarotCard } from './types';

/**
 * Six of Pentacles (pentacles 6) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const sixOfPentacles: TarotCard = {
  id: 'sixOfPentacles',
  arcana: 'minor',
  suit: 'pentacles',
  rank: 6,
  name: 'Six of Pentacles',
  image: '/tarot/minor/six-of-pentacles.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'merchant-scales',
      icon: '⚖️',
      shape: { type: 'rect', x: 73, y: 58, width: 22, height: 33, radius: 2 },
      i18nKey: 'sixOfPentacles.regions.merchantScales',
    },
    {
      id: 'coins-given',
      icon: '🪙',
      shape: { type: 'rect', x: 27, y: 82, width: 17, height: 32, radius: 2 },
      i18nKey: 'sixOfPentacles.regions.coinsGiven',
    },
    {
      id: 'kneeling-beggars',
      icon: '🙏',
      shape: { type: 'rect', x: 4, y: 93, width: 22, height: 67, radius: 2 },
      i18nKey: 'sixOfPentacles.regions.kneelingBeggars',
    },
    {
      id: 'kneeling-beggars-2',
      icon: '🙏',
      shape: { type: 'rect', x: 61, y: 96, width: 34, height: 64, radius: 2 },
      i18nKey: 'sixOfPentacles.regions.kneelingBeggars',
    },
    {
      id: 'six-pentacles',
      icon: '🪙',
      shape: { type: 'circle', x: 8, y: 12, width: 18, height: 18 },
      i18nKey: 'sixOfPentacles.regions.sixPentacles',
    },
    {
      id: 'six-pentacles-2',
      icon: '🪙',
      shape: { type: 'circle', x: 41, y: 12, width: 18, height: 18 },
      i18nKey: 'sixOfPentacles.regions.sixPentacles',
    },
    {
      id: 'six-pentacles-3',
      icon: '🪙',
      shape: { type: 'circle', x: 74, y: 12, width: 18, height: 18 },
      i18nKey: 'sixOfPentacles.regions.sixPentacles',
    },
    {
      id: 'six-pentacles-4',
      icon: '🪙',
      shape: { type: 'circle', x: 8, y: 36, width: 18, height: 18 },
      i18nKey: 'sixOfPentacles.regions.sixPentacles',
    },
    {
      id: 'six-pentacles-5',
      icon: '🪙',
      shape: { type: 'circle', x: 74, y: 36, width: 18, height: 18 },
      i18nKey: 'sixOfPentacles.regions.sixPentacles',
    },
    {
      id: 'six-pentacles-6',
      icon: '🪙',
      shape: { type: 'circle', x: 8, y: 60, width: 18, height: 18 },
      i18nKey: 'sixOfPentacles.regions.sixPentacles',
    },
  ],
};
