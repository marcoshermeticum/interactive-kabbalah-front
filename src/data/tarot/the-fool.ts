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
      // The large pale solar disc in the upper-right sky. A circle is a
      // natural fit — just give the bounding box (x, y, width, height).
      shape: { type: 'circle', x: 76, y: 4, width: 20, height: 20 },
      i18nKey: 'theFool.regions.sun',
    },
    {
      id: 'mountains',
      icon: '🏔️',
      // Snowy blue range descending along the right side (blue band at
      // y≈100–124, x stepping in from ~50 up to ~88).
      shape: { type: 'rect', x: 60, y: 80, width: 40, height: 15 },
      i18nKey: 'theFool.regions.mountains',
    },
    {
      id: 'cliff',
      icon: '🪨',
      // The pale plateau/precipice at the Fool's feet, dropping into the abyss
      // at far left (bright edge along y≈123–152 at left).
      shape: { type: 'rect', x: 22, y: 130, width: 38, height: 15 },
      i18nKey: 'theFool.regions.cliff',
    },
    {
      id: 'bundle',
      icon: '🎒',
      // The red bundle on the staff, carried over the right shoulder
      // (red cluster at x≈24–33 / y≈63–71).
       shape: { type: 'circle', x: 65, y: 25, width: 17, height: 17 },
      i18nKey: 'theFool.regions.bundle',
    },
    {
      id: 'white-rose',
      icon: '🌹',
      // The white rose in the Fool's lowered left hand (small bright-white
      // cluster at left, x≈23–34 / y≈112–117).
      points: '22,117 22,112 28,111 34,113 33,117 27,118',
      i18nKey: 'theFool.regions.whiteRose',
    },
    {
      id: 'motley-tunic',
      icon: '🎭',
      // The Fool's patchwork tunic: red sleeves and the multicolored body.
      shape: { type: 'rect', x: 25, y: 42, width: 20, height: 20 },
      i18nKey: 'theFool.regions.motleyTunic',
    },
    {
      id: 'mismatched-leggings',
      icon: '🧦',
      // The uneven stride of the legs below the tunic.
      shape: { type: 'rect', x: 35, y: 80, width: 20, height: 32 },
      i18nKey: 'theFool.regions.mismatchedLeggings',
    },
    {
      id: 'jester-cap',
      icon: '🃏',
      // The jester's cap on the Fool's head (the feather sits on top of it).
      shape: { type: 'rect', x: 50, y: 30, width: 10, height: 10 },
      i18nKey: 'theFool.regions.jesterCap',
    },
    {
      id: 'dog',
      icon: '🐕',
      // The little white dog on the ledge to the right of the Fool
      // (bright-white body at x≈63–77 / y≈116–125 in viewBox units).
      shape: { type: 'rect', x: 64, y: 110, width: 30, height: 30 },
      i18nKey: 'theFool.regions.dog',
    },
    {
      id: 'feather',
      icon: '🪶',
      // The red feather rising from the Fool's cap (red mark at x≈30–33 /
      // y≈53, sweeping up from the head).
      shape: { type: 'rect', x: 50, y: 20, width: 15, height: 8 },
      i18nKey: 'theFool.regions.feather',
    },
  ],
};
