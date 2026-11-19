import type { TarotCard } from './types';

/**
 * Seven of Swords (swords 7) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const sevenOfSwords: TarotCard = {
  id: 'sevenOfSwords',
  arcana: 'minor',
  suit: 'swords',
  rank: 7,
  name: 'Seven of Swords',
  image: '/tarot/minor/seven-of-swords.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'sneaking-man',
      icon: '🥷',
      shape: { type: 'rect', x: 44, y: 36, width: 19, height: 24, radius: 2 },
      i18nKey: 'sevenOfSwords.regions.sneakingMan',
    },
    {
      id: 'sneaking-man-2',
      icon: '🥷',
      shape: { type: 'rect', x: 45, y: 64, width: 24, height: 80, radius: 2 },
      i18nKey: 'sevenOfSwords.regions.sneakingMan',
    },
    {
      id: 'sneaking-man-3',
      icon: '🥷',
      shape: { type: 'rect', x: 9, y: 114, width: 35, height: 32, radius: 2 },
      i18nKey: 'sevenOfSwords.regions.sneakingMan',
    },
    {
      id: 'five-swords-carried',
      icon: '⚔️',
      shape: { type: 'rect', x: 14, y: 50, width: 30, height: 62, radius: 2 },
      i18nKey: 'sevenOfSwords.regions.fiveSwordsCarried',
    },
    {
      id: 'five-swords-carried-2',
      icon: '⚔️',
      shape: { type: 'rect', x: 63, y: 38, width: 24, height: 23, radius: 2 },
      i18nKey: 'sevenOfSwords.regions.fiveSwordsCarried',
    },
    {
      id: 'swords-left-behind',
      icon: '🗡️',
      shape: { type: 'rect', x: 69, y: 62, width: 8, height: 76, radius: 2 },
      i18nKey: 'sevenOfSwords.regions.swordsLeftBehind',
    },
    {
      id: 'swords-left-behind-2',
      icon: '🗡️',
      shape: { type: 'rect', x: 79, y: 62, width: 8, height: 38, radius: 2 },
      i18nKey: 'sevenOfSwords.regions.swordsLeftBehind',
    },
    {
      id: 'camp-tents',
      icon: '⛺',
      shape: { type: 'rect', x: 78, y: 100, width: 17, height: 38, radius: 2 },
      i18nKey: 'sevenOfSwords.regions.campTents',
    },
  ],
};
