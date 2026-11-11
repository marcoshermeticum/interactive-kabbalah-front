/**
 * Types for interactive Tarot cards (Rider-Waite major arcana).
 *
 * Architecture: a raster image (PNG) holds the artwork, and a transparent
 * SVG overlay sits on top with polygonal interactive regions. Coordinates
 * are expressed in the overlay's normalized viewBox so everything scales
 * with the image regardless of screen size.
 */

/**
 * A simple primitive shape, described by a bounding box in viewBox units.
 * This is the easy way to define a region — just give a type and a box:
 *
 *  - `circle`:    an ellipse filling the box (x, y = top-left corner).
 *  - `rect`:      a rectangle (optionally rounded via `radius`).
 *  - `triangle`:  an upward-pointing triangle inscribed in the box.
 *
 * All coordinates are in the card's `viewBox` space.
 */
export interface TarotShape {
  type: 'circle' | 'rect' | 'triangle';
  /** Left edge (x) of the bounding box, in viewBox units. */
  x: number;
  /** Top edge (y) of the bounding box, in viewBox units. */
  y: number;
  /** Box width, in viewBox units. */
  width: number;
  /** Box height, in viewBox units. */
  height: number;
  /** Corner radius for `rect` only (viewBox units). Ignored otherwise. */
  radius?: number;
}

export interface TarotRegion {
  /** Stable id, unique within the card. */
  id: string;
  /**
   * Preferred, easy way to define the region: a primitive shape + bounding box.
   * If provided, `points` is ignored.
   */
  shape?: TarotShape;
  /**
   * Advanced: free-form SVG polygon points in viewBox coordinate space,
   * e.g. "10,20 30,20 30,40". Use for organic/irregular areas that a
   * primitive box can't cover well. Provide this OR `shape`.
   */
  points?: string;
  /**
   * i18n key (within the `tarot` namespace) pointing to an object with
   * `title` and `description`, e.g. "temperance.regions.waterFeet".
   */
  i18nKey: string;
  /** Optional emoji/icon shown in the tooltip header. */
  icon?: string;
}

export interface TarotCard {
  /** Stable id, used in routes and data lookups (e.g. "temperance"). */
  id: string;
  /** Major arcana number (0–21). */
  number: number;
  /** Canonical English name, used as fallback. */
  name: string;
  /** Public path to the artwork image. */
  image: string;
  /**
   * Normalized coordinate system for the overlay. Keep the aspect ratio
   * matching the image (e.g. a 600x990 image → width 100, height 165).
   */
  viewBox: { width: number; height: number };
  /** Interactive regions overlaid on the artwork. */
  regions: TarotRegion[];
}
