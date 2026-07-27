/**
 * Tree Layout Configuration
 * 
 * This file defines the spatial layout of both trees in a platform-agnostic format.
 * The coordinate system uses a normalized grid that can be scaled to any viewport.
 * 
 * IMPORTANT: This structure is designed to be easily portable to:
 * - Kotlin (Jetpack Compose Canvas)
 * - Swift (SwiftUI / Core Graphics)
 * - Any future rendering engine
 * 
 * All positions are absolute pixel values within a fixed coordinate space.
 * Scale the entire tree by multiplying all values by a factor.
 */

export interface TreeLayoutConfig {
  width: number;
  height: number;
  nodeSize: number;
  nodeRadius: number;
  pathBarHeight: number;
  positions: Record<string, { x: number; y: number }>;
}

export const kabbalahTreeLayout: TreeLayoutConfig = {
  width: 800,
  height: 1640,
  nodeSize: 170,
  nodeRadius: 72,
  pathBarHeight: 32,
  positions: {
    kether:  { x: 400, y: 200 },
    binah:   { x: 110, y: 410 },
    chokmah: { x: 690, y: 410 },
    daath:   { x: 400, y: 570 },
    gevurah: { x: 110, y: 720 },
    chesed:  { x: 690, y: 720 },
    tiferet: { x: 400, y: 890 },
    hod:     { x: 110, y: 1070 },
    netzach: { x: 690, y: 1070 },
    yesod:   { x: 400, y: 1250 },
    malkuth: { x: 400, y: 1530 },
  },
};

export const qliphothTreeLayout: TreeLayoutConfig = {
  width: 800,
  height: 1540,
  nodeSize: 170,
  nodeRadius: 72,
  pathBarHeight: 26,
  positions: {
    thaumiel:       { x: 400, y: 100 },
    satariel:       { x: 110, y: 310 },
    ghogiel:        { x: 690, y: 310 },
    daath_qliphoth: { x: 400, y: 470 },
    golohab:        { x: 110, y: 620 },
    ghagsheblah:    { x: 690, y: 620 },
    tagimron:       { x: 400, y: 790 },
    samael:         { x: 110, y: 970 },
    gharab:         { x: 690, y: 970 },
    gamaliel:       { x: 400, y: 1150 },
    nahemoth:       { x: 400, y: 1430 },
  },
};

export const qliphothInvertedLayout: TreeLayoutConfig = {
  width: 800,
  height: 1540,
  nodeSize: 170,
  nodeRadius: 72,
  pathBarHeight: 26,
  positions: {
    nahemoth:       { x: 400, y: 100 },
    gamaliel:       { x: 400, y: 380 },
    samael:         { x: 110, y: 560 },
    gharab:         { x: 690, y: 560 },
    tagimron:       { x: 400, y: 740 },
    golohab:        { x: 110, y: 910 },
    ghagsheblah:    { x: 690, y: 910 },
    daath_qliphoth: { x: 400, y: 1060 },
    satariel:       { x: 110, y: 1220 },
    ghogiel:        { x: 690, y: 1220 },
    thaumiel:       { x: 400, y: 1430 },
  },
};

/**
 * Veil positions (Y coordinates) for the Tree of Life
 * These horizontal lines divide the tree into worlds
 */
export const veils = {
  abyss: 420,      // Between Supernal Triad and Ethical Triad
  parokhet: 880,   // Between Ethical Triad and Astral Triad
  nephesch: 1290,  // Between Yesod and Malkuth
};

/**
 * Pillar definitions for ornamental rendering
 */
export const pillars = {
  severity: { x: 110, label: 'B', name: 'Boaz' },     // Left pillar
  equilibrium: { x: 400, label: '', name: 'Middle' },   // Center
  mercy: { x: 690, label: 'J', name: 'Jachin' },       // Right pillar
};
