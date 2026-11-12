import type { TarotCard } from './types';

/**
 * The Magician (I) — Rider-Waite major arcana.
 *
 * viewBox matches the 1086×1810 artwork (1.667 aspect ratio).
 *
 * The highlight boxes below are calibrated starting points. Open the card in
 * development mode and use the region editor ("Posicionar destaques") to drag
 * and resize each one, then paste the generated JSON back into `regions`.
 */
export const theMagician: TarotCard = {
  // `id` matches the i18n block key (`tarot.theMagician`) because
  // InteractiveTarotCard derives the image alt from `${card.id}.name`.
  // The route segment and image file use kebab-case (`the-magician`).
  id: 'theMagician',
  number: 1,
  name: 'The Magician',
  image: '/tarot/01_Magician.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'rose-garden',
      icon: '🌹',
      shape: { type: 'rect', x: 2, y: 123.4, width: 96, height: 30.6 },
      i18nKey: 'theMagician.regions.roseGarden',
    },
    {
      id: 'table-tools',
      icon: '♠️',
      shape: { type: 'rect', x: 4, y: 99.3, width: 49.9, height: 22 },
      i18nKey: 'theMagician.regions.tableTools',
    },
    {
      id: 'serpent-belt',
      icon: '🐍',
      shape: { type: 'rect', x: 34, y: 86, width: 26, height: 12 },
      i18nKey: 'theMagician.regions.serpentBelt',
    },
    {
      id: 'wand',
      icon: '🪄',
      shape: { type: 'rect', x: 14.4, y: 7.8, width: 9, height: 30 },
      i18nKey: 'theMagician.regions.wand',
    },
    {
      id: 'pointing-hand',
      icon: '🖐️',
      shape: { type: 'rect', x: 74, y: 83, width: 9, height: 12 },
      i18nKey: 'theMagician.regions.pointingHand',
    },
    {
      id: 'infinity',
      icon: '♾️',
      shape: { type: 'rect', x: 37, y: 31, width: 18, height: 7 },
      i18nKey: 'theMagician.regions.infinity',
    },
  ],
};
