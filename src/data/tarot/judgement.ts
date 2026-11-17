import type { TarotCard } from './types';

/**
 * Judgement (XX) — Rider-Waite major arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const judgement: TarotCard = {
  id: 'judgement',
  number: 20,
  name: 'Judgement',
  image: '/tarot/20_Judgement.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'angel-trumpet',
      icon: '🎺',
      shape: { type: 'rect', x: 4, y: 5, width: 92, height: 52, radius: 2 },
      i18nKey: 'judgement.regions.angelTrumpet',
    },
    {
      id: 'angel-trumpet-hand',
      icon: '🎺',
      shape: { type: 'rect', x: 55, y: 62, width: 22, height: 24, radius: 2 },
      i18nKey: 'judgement.regions.angelTrumpet',
    },
    {
      id: 'flag-cross',
      icon: '✝️',
      shape: { type: 'rect', x: 24.5, y: 58, width: 29.5, height: 31, radius: 1.5 },
      i18nKey: 'judgement.regions.flagCross',
    },
    {
      id: 'sea-mountains',
      icon: '🌊',
      shape: { type: 'rect', x: 4, y: 89, width: 56, height: 7, radius: 2 },
      i18nKey: 'judgement.regions.seaMountains',
    },
    {
      id: 'risen-family',
      icon: '🙋',
      shape: { type: 'rect', x: 10, y: 97, width: 23, height: 29, radius: 2 },
      i18nKey: 'judgement.regions.risenFamily',
    },
    {
      id: 'risen-family-small',
      icon: '🙋',
      shape: { type: 'rect', x: 34, y: 100, width: 27, height: 14, radius: 2 },
      i18nKey: 'judgement.regions.risenFamily',
    },
    {
      id: 'risen-family-front',
      icon: '🙋',
      shape: { type: 'rect', x: 36, y: 115, width: 26, height: 11, radius: 2 },
      i18nKey: 'judgement.regions.risenFamily',
    },
    {
      id: 'risen-family-woman',
      icon: '🙋',
      shape: { type: 'rect', x: 62, y: 87, width: 31, height: 39, radius: 2 },
      i18nKey: 'judgement.regions.risenFamily',
    },
    {
      id: 'coffins',
      icon: '⚰️',
      shape: { type: 'rect', x: 4, y: 127, width: 92, height: 23, radius: 2 },
      i18nKey: 'judgement.regions.coffins',
    },
  ],
};
