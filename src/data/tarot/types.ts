/**
 * Types for interactive Tarot cards (Rider-Waite major arcana).
 *
 * Architecture: a raster image (PNG) holds the artwork, and a transparent
 * SVG overlay sits on top with polygonal interactive regions. Coordinates
 * are expressed in the overlay's normalized viewBox so everything scales
 * with the image regardless of screen size.
 */

export interface TarotRegion {
  /** Stable id, unique within the card. */
  id: string;
  /**
   * SVG polygon points in viewBox coordinate space, e.g. "10,20 30,20 30,40".
   * Use TarotCard.viewBox as the coordinate system.
   */
  points: string;
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
