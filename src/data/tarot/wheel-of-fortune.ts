import type { TarotCard } from './types';

/**
 * Wheel of Fortune (X) — Rider-Waite major arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const wheelOfFortune: TarotCard = {
  id: 'wheelOfFortune',
  number: 10,
  name: 'Wheel of Fortune',
  image: '/tarot/10_Wheel_of_Fortune.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'angel',
      icon: '😇',
      shape: { type: 'rect', x: 9.2, y: 8.4, width: 23.8, height: 34.8 },
      i18nKey: 'wheelOfFortune.regions.angel',
    },
    {
      id: 'eagle',
      icon: '🦅',
      shape: { type: 'rect', x: 61.8, y: 6.7, width: 25.6, height: 29.3 },
      i18nKey: 'wheelOfFortune.regions.eagle',
    },
    {
      id: 'bull',
      icon: '🐂',
      shape: { type: 'rect', x: 2, y: 121, width: 42, height: 34 },
      i18nKey: 'wheelOfFortune.regions.bull',
    },
    {
      id: 'lion',
      icon: '🦁',
      shape: { type: 'rect', x: 53, y: 121, width: 44, height: 35 },
      i18nKey: 'wheelOfFortune.regions.lion',
    },
    {
      id: 'wheel-letters',
      icon: '🔤',
      shape: { type: 'circle', x: 19.1, y: 53.8, width: 60.5, height: 60.7 },
      i18nKey: 'wheelOfFortune.regions.wheelLetters',
    },
    {
      id: 'alchemical-rim',
      icon: '⚗️',
      shape: { type: 'circle', x: 26.8, y: 62.6, width: 44.1, height: 42.6 },
      i18nKey: 'wheelOfFortune.regions.alchemicalRim',
    },
    {
      id: 'sphinx',
      icon: '🗿',
      shape: { type: 'rect', x: 39.7, y: 17.6, width: 14, height: 29 },
      i18nKey: 'wheelOfFortune.regions.sphinx',
    },
    {
      id: 'anubis',
      icon: '🐕',
      shape: { type: 'rect', x: 80, y: 76.4, width: 14.9, height: 18 },
      i18nKey: 'wheelOfFortune.regions.anubis',
    },
    {
      id: 'serpent-typhon',
      icon: '🐍',
      shape: { type: 'rect', x: 4.4, y: 66.1, width: 14.9, height: 47.5 },
      i18nKey: 'wheelOfFortune.regions.serpentTyphon',
    },
  ],
};
