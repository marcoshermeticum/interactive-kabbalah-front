import type { TarotCard } from './types';

export const theFool: TarotCard = {
  // NOTE: `id` must match the i18n block key (`tarot.theFool`) because
  // InteractiveTarotCard derives the image alt from `${card.id}.name`.
  // The route folder and image file use kebab-case (`the-fool`).
  id: 'theFool',
  number: 0,
  name: 'The Fool',
  image: '/tarot/the-fool.jpg',
  viewBox: { width: 100, height: 166 },
  regions: [
    {
      id: 'sun',
      icon: '☀️',
      shape: { type: 'circle', x: 76, y: 4, width: 20, height: 20 },
      i18nKey: 'theFool.regions.sun',
    },
    {
      id: 'mountains',
      icon: '🏔️',
      shape: { type: 'rect', x: 60, y: 80, width: 40, height: 15 },
      i18nKey: 'theFool.regions.mountains',
    },
    {
      id: 'cliff',
      icon: '🪨',
      shape: { type: 'rect', x: 22, y: 130, width: 38, height: 15 },
      i18nKey: 'theFool.regions.cliff',
    },
    {
      id: 'bundle',
      icon: '🎒',
      shape: { type: 'circle', x: 65, y: 25, width: 17, height: 17 },
      i18nKey: 'theFool.regions.bundle',
    },
    {
      id: 'white-rose',
      icon: '🌹',
      shape: { type: 'circle', x: 77.6, y: 40.2, width: 17, height: 17 },
      i18nKey: 'theFool.regions.whiteRose',
    },
    {
      id: 'motley-tunic',
      icon: '🎭',
      shape: { type: 'rect', x: 25, y: 42, width: 20, height: 20 },
      i18nKey: 'theFool.regions.motleyTunic',
    },
    {
      id: 'mismatched-leggings',
      icon: '🧦',
      shape: { type: 'rect', x: 35, y: 80, width: 20, height: 32 },
      i18nKey: 'theFool.regions.mismatchedLeggings',
    },
    {
      id: 'jester-cap',
      icon: '🃏',
      shape: { type: 'rect', x: 50, y: 30, width: 10, height: 10 },
      i18nKey: 'theFool.regions.jesterCap',
    },
    {
      id: 'dog',
      icon: '🐕',
      shape: { type: 'rect', x: 64, y: 110, width: 30, height: 30 },
      i18nKey: 'theFool.regions.dog',
    },
    {
      id: 'feather',
      icon: '🪶',
      shape: { type: 'rect', x: 50, y: 20, width: 15, height: 8 },
      i18nKey: 'theFool.regions.feather',
    },
  ],
};
