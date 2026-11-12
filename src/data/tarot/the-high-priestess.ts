import type { TarotCard } from './types';

/**
 * The High Priestess (II) — Rider-Waite major arcana.
 *
 * viewBox matches the 1086×1810 artwork (0.6 aspect ratio).
 *
 * NOTE: the highlight boxes are intentionally NOT positioned yet. Every
 * region keeps a zero-sized placeholder `shape`; replace x/y/width/height
 * (or switch to free-form `points`) to place each highlight on the artwork.
 * The reading panel and the symbol pills already work with the texts below.
 */
export const theHighPriestess: TarotCard = {
  // `id` matches the i18n block key (`tarot.theHighPriestess`) because
  // InteractiveTarotCard derives the image alt from `${card.id}.name`.
  // The route segment and image file use kebab-case (`the-high-priestess`).
  id: 'theHighPriestess',
  number: 2,
  name: 'The High Priestess',
  image: '/tarot/02_High_Priestess.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'pillars',
      icon: '🏛️',
      // TODO: position — the two temple pillars, left and right.
      shape: { type: 'rect', x: 0, y: 0, width: 0, height: 0 },
      i18nKey: 'theHighPriestess.regions.pillars',
    },
    {
      id: 'veil-pomegranates',
      icon: '🍈',
      // TODO: position — the embroidered veil between the pillars.
      shape: { type: 'rect', x: 0, y: 0, width: 0, height: 0 },
      i18nKey: 'theHighPriestess.regions.veilPomegranates',
    },
    {
      id: 'water',
      icon: '🌊',
      // TODO: position — the sea behind the veil.
      shape: { type: 'rect', x: 0, y: 0, width: 0, height: 0 },
      i18nKey: 'theHighPriestess.regions.water',
    },
    {
      id: 'scroll',
      icon: '📜',
      // TODO: position — the TORA scroll on her lap.
      shape: { type: 'rect', x: 0, y: 0, width: 0, height: 0 },
      i18nKey: 'theHighPriestess.regions.scroll',
    },
    {
      id: 'crown',
      icon: '👑',
      // TODO: position — the lunar crown on her head.
      shape: { type: 'rect', x: 0, y: 0, width: 0, height: 0 },
      i18nKey: 'theHighPriestess.regions.crown',
    },
    {
      id: 'solar-cross',
      icon: '✚',
      // TODO: position — the equal-armed solar cross on her chest.
      shape: { type: 'rect', x: 0, y: 0, width: 0, height: 0 },
      i18nKey: 'theHighPriestess.regions.solarCross',
    },
    {
      id: 'crescent-moon',
      icon: '🌙',
      // TODO: position — the crescent moon at her feet.
      shape: { type: 'rect', x: 0, y: 0, width: 0, height: 0 },
      i18nKey: 'theHighPriestess.regions.crescentMoon',
    },
  ],
};
