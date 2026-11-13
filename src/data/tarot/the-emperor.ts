import type { TarotCard } from './types';

/**
 * The Emperor (IV) — Rider-Waite major arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const theEmperor: TarotCard = {
  id: 'theEmperor',
  number: 4,
  name: 'The Emperor',
  image: '/tarot/04_Emperor.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'ram-heads',
      icon: '🐏',
      shape: { type: 'rect', x: 14.8, y: 89.8, width: 14, height: 10 },
      i18nKey: 'theEmperor.regions.ramHeads',
    },
    {
      id: 'ankh',
      icon: '☥',
      shape: { type: 'rect', x: 8.6, y: 43.9, width: 14, height: 10 },
      i18nKey: 'theEmperor.regions.ankh',
    },
    {
      id: 'orb',
      icon: '🔮',
      shape: { type: 'rect', x: 72.9, y: 73.9, width: 14, height: 10 },
      i18nKey: 'theEmperor.regions.orb',
    },
    {
      id: 'armor',
      icon: '🛡️',
      shape: { type: 'triangle', x: 37.9, y: 60.7, width: 26.5, height: 24.9 },
      i18nKey: 'theEmperor.regions.armor',
    },
    {
      id: 'beard-crown',
      icon: '👑',
      shape: { type: 'rect', x: 42.3, y: 22.9, width: 14, height: 33.7 },
      i18nKey: 'theEmperor.regions.beardCrown',
    },
    {
      id: 'mountains',
      icon: '⛰️',
      shape: { type: 'rect', x: 80.7, y: 53.3, width: 14, height: 10 },
      i18nKey: 'theEmperor.regions.mountains',
    },
  ],
};
