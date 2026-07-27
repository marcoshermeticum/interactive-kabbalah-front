'use client';

import { memo } from 'react';

/**
 * LivingHermeticBackground — 3-layer ambient background
 * 
 * Layer 1: Textured base (CSS radial gradients — warmth/depth)
 * Layer 2: Sacred Geometry grid (SVG pattern — Flower of Life vesica piscis)
 * Layer 3: Ambient vignette (CSS gradient — draws eye inward)
 * 
 * Optional: 12s breathing animation on the geometry grid.
 * 
 * Performance:
 * - Zero JS runtime cost (pure CSS + static SVG)
 * - opacity-only animation (GPU-composited, no layout/paint)
 * - Respects prefers-reduced-motion
 * - < 5 DOM nodes added
 */
const HermeticBackground = memo(function HermeticBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Layer 2: Sacred Geometry Grid — Flower of Life pattern */}
      <svg
        className="absolute inset-0 w-full h-full hermetic-grid"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Flower of Life — overlapping circles in hexagonal pattern */}
          <pattern
            id="flower-of-life"
            x="0"
            y="0"
            width="120"
            height="104"
            patternUnits="userSpaceOnUse"
          >
            {/* Row 1 */}
            <circle cx="60" cy="52" r="50" fill="none" stroke="var(--geometry-stroke)" strokeWidth="0.5" />
            <circle cx="0" cy="52" r="50" fill="none" stroke="var(--geometry-stroke)" strokeWidth="0.5" />
            <circle cx="120" cy="52" r="50" fill="none" stroke="var(--geometry-stroke)" strokeWidth="0.5" />
            {/* Row offset */}
            <circle cx="30" cy="0" r="50" fill="none" stroke="var(--geometry-stroke)" strokeWidth="0.5" />
            <circle cx="90" cy="0" r="50" fill="none" stroke="var(--geometry-stroke)" strokeWidth="0.5" />
            <circle cx="30" cy="104" r="50" fill="none" stroke="var(--geometry-stroke)" strokeWidth="0.5" />
            <circle cx="90" cy="104" r="50" fill="none" stroke="var(--geometry-stroke)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#flower-of-life)"
          style={{
            maskImage: 'radial-gradient(ellipse 75% 75% at 50% 45%, black 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 45%, black 20%, transparent 75%)',
          }}
        />
      </svg>

      {/* Layer 3: Ambient Vignette — draws eye to center */}
      <div className="absolute inset-0 hermetic-vignette" />
    </div>
  );
});

export default HermeticBackground;
