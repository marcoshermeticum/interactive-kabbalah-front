import type { TarotCard } from './types';

/**
 * King of Pentacles (pentacles 14) — Rider-Waite minor arcana.
 *
 * viewBox 100 x 166.7 to match the
 * 1086×1810 artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const kingOfPentacles: TarotCard = {
  id: 'kingOfPentacles',
  arcana: 'minor',
  suit: 'pentacles',
  rank: 14,
  name: 'King of Pentacles',
  image: '/tarot/minor/king-of-pentacles.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'pentacle-sceptre',
      icon: '🪙',
      shape: { type: 'circle', x: 57, y: 72, width: 21, height: 21 },
      i18nKey: 'kingOfPentacles.regions.pentacleSceptre',
    },
    {
      id: 'pentacle-sceptre-2',
      icon: '🪙',
      shape: { type: 'rect', x: 21, y: 62, width: 11, height: 32, radius: 2 },
      i18nKey: 'kingOfPentacles.regions.pentacleSceptre',
    },
    {
      id: 'bull-throne',
      icon: '🐂',
      shape: { type: 'rect', x: 19, y: 26, width: 16, height: 20, radius: 2 },
      i18nKey: 'kingOfPentacles.regions.bullThrone',
    },
    {
      id: 'bull-throne-2',
      icon: '🐂',
      shape: { type: 'rect', x: 66, y: 26, width: 16, height: 20, radius: 2 },
      i18nKey: 'kingOfPentacles.regions.bullThrone',
    },
    {
      id: 'bull-throne-3',
      icon: '🐂',
      shape: { type: 'rect', x: 12, y: 100, width: 18, height: 26, radius: 2 },
      i18nKey: 'kingOfPentacles.regions.bullThrone',
    },
    {
      id: 'grape-mantle',
      icon: '🍇',
      shape: { type: 'rect', x: 32, y: 49, width: 46, height: 22, radius: 2 },
      i18nKey: 'kingOfPentacles.regions.grapeMantle',
    },
    {
      id: 'grape-mantle-2',
      icon: '🍇',
      shape: { type: 'rect', x: 31, y: 96, width: 40, height: 48, radius: 2 },
      i18nKey: 'kingOfPentacles.regions.grapeMantle',
    },
    {
      id: 'castle-garden',
      icon: '🏰',
      shape: { type: 'rect', x: 79, y: 47, width: 16, height: 44, radius: 2 },
      i18nKey: 'kingOfPentacles.regions.castleGarden',
    },
    {
      id: 'castle-garden-2',
      icon: '🏰',
      shape: { type: 'rect', x: 4, y: 128, width: 12, height: 20, radius: 2 },
      i18nKey: 'kingOfPentacles.regions.castleGarden',
    },
  ],
};
