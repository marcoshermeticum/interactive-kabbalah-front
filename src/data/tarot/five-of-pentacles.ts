import type { TarotCard } from './types';

/**
 * Five of Pentacles (pentacles 5) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const fiveOfPentacles: TarotCard = {
  id: 'fiveOfPentacles',
  arcana: 'minor',
  suit: 'pentacles',
  rank: 5,
  name: 'Five of Pentacles',
  image: '/tarot/minor/five-of-pentacles.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'stained-glass-pentacles',
      icon: '🪟',
      shape: { type: 'rect', x: 29, y: 2, width: 40, height: 67, radius: 2 },
      i18nKey: 'fiveOfPentacles.regions.stainedGlassPentacles',
    },
    {
      id: 'shawled-woman',
      icon: '🧣',
      shape: { type: 'rect', x: 47, y: 74, width: 42, height: 82, radius: 2 },
      i18nKey: 'fiveOfPentacles.regions.shawledWoman',
    },
    {
      id: 'crutches-man',
      icon: '🩼',
      shape: { type: 'rect', x: 4, y: 88, width: 42, height: 70, radius: 2 },
      i18nKey: 'fiveOfPentacles.regions.crutchesMan',
    },
    {
      id: 'snow-night',
      icon: '❄️',
      shape: { type: 'rect', x: 4, y: 2, width: 24, height: 84, radius: 2 },
      i18nKey: 'fiveOfPentacles.regions.snowNight',
    },
    {
      id: 'snow-night-2',
      icon: '❄️',
      shape: { type: 'rect', x: 70, y: 2, width: 25, height: 70, radius: 2 },
      i18nKey: 'fiveOfPentacles.regions.snowNight',
    },
  ],
};
