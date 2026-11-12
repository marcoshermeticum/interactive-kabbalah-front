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
      id: 'pillar-b',
      icon: '🏛️',
      // TODO: position — the black pillar on the left (Boaz).
      shape: { type: 'rect', x: 5, y: 50, width: 15, height: 40 },
      i18nKey: 'theHighPriestess.regions.pillarB',
    },
    {
      id: 'pillar-j',
      icon: '🏛️',
      // TODO: position — the white pillar on the right (Jachin).
      shape: { type: 'rect', x: 80, y: 50, width: 15, height: 40 },
      i18nKey: 'theHighPriestess.regions.pillarJ',
    },
    {
      id: 'veil-pomegranates',
      icon: '🍈',
      // TODO: position — the embroidered veil between the pillars.
      shape: { type: 'circle', x: 42, y: 20, width: 15, height: 15 },
      i18nKey: 'theHighPriestess.regions.veilPomegranates',
    },
    {
      id: 'water',
      icon: '🌊',
      // TODO: position — the sea behind the veil.
      shape: { type: 'rect', x: 25, y: 110, width: 18, height: 40 },
      i18nKey: 'theHighPriestess.regions.water',
    },
    {
      id: 'scroll',
      icon: '📜',
      // TODO: position — the TORA scroll on her lap.
      shape: { type: 'circle', x: 42, y: 90, width: 15, height: 15 },
      i18nKey: 'theHighPriestess.regions.scroll',
    },
    {
      id: 'crown',
      icon: '👑',
      // TODO: position — the lunar crown on her head.
      shape: { type: 'circle', x: 40, y: 32, width: 20, height: 20 },
      i18nKey: 'theHighPriestess.regions.crown',
    },
    {
      id: 'solar-cross',
      icon: '✚',
      // TODO: position — the equal-armed solar cross on her chest.
      shape: { type: 'circle', x: 42, y: 68, width: 15, height: 15 },
      i18nKey: 'theHighPriestess.regions.solarCross',
    },
    {
      id: 'crescent-moon',
      icon: '🌙',
      // TODO: position — the crescent moon at her feet.
      shape: { type: 'circle', x: 55, y: 130, width: 22, height: 22 },
      i18nKey: 'theHighPriestess.regions.crescentMoon',
    },
  ],
};
