---
name: Aura Hermetica
colors:
  surface: '#fff9eb'
  surface-dim: '#dfdacc'
  surface-bright: '#fff9eb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f3e5'
  surface-container: '#f3ede0'
  surface-container-high: '#ede8da'
  surface-container-highest: '#e8e2d4'
  on-surface: '#1d1c13'
  on-surface-variant: '#4c4637'
  inverse-surface: '#333027'
  inverse-on-surface: '#f6f0e2'
  outline: '#7e7665'
  outline-variant: '#cfc6b2'
  surface-tint: '#735c00'
  primary: '#574500'
  on-primary: '#ffffff'
  primary-container: '#735c00'
  on-primary-container: '#f6d676'
  inverse-primary: '#e3c466'
  secondary: '#4e6073'
  on-secondary: '#ffffff'
  secondary-container: '#d1e4fb'
  on-secondary-container: '#546679'
  tertiary: '#6d218c'
  on-tertiary: '#ffffff'
  tertiary-container: '#873da6'
  on-tertiary-container: '#f4caff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe085'
  primary-fixed-dim: '#e3c466'
  on-primary-fixed: '#231b00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#d1e4fb'
  secondary-fixed-dim: '#b6c8de'
  on-secondary-fixed: '#091d2d'
  on-secondary-fixed-variant: '#37485b'
  tertiary-fixed: '#f8d8ff'
  tertiary-fixed-dim: '#ecb2ff'
  on-tertiary-fixed: '#320046'
  on-tertiary-fixed-variant: '#6d228c'
  background: '#fff9eb'
  on-background: '#1d1c13'
  surface-variant: '#e8e2d4'
  gold-accent: '#d4af37'
  parchment-bg: '#fff9eb'
  marginalia-text: '#7f7663'
  kether-white: '#ffffff'
  binah-black: '#000000'
  chesed-blue: '#3333ff'
  geburah-red: '#ff0000'
  tiphareth-yellow: '#ffff00'
  malkuth-earth: '#4b3621'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  marginalia:
    fontFamily: EB Garamond
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  phi: '1.618'
  gutter: 24px
  margin-page: 32px
---

## Brand & Style
The brand personality is **Esoteric Minimalism**—a blend of ancient hermetic wisdom and modern scholarly precision. It targets an audience interested in occult philosophy, alchemy, and sacred geometry, requiring a UI that feels like a digital grimoire.

The design style is **Tactile Editorial**. It utilizes high-quality serif typography and a parchment-inspired background texture to evoke a sense of history and ritual. Interactive elements are handled with surgical precision (thin lines, glowing emanations) to prevent the "antique" aesthetic from feeling dated or heavy. The emotional response should be one of quiet contemplation, intellectual discovery, and reverence.

## Colors
The palette is rooted in **Parchment and Gold**. The primary color is a deep, scholarly gold-brown used for branding and essential actions. The background uses a warm off-white (#fff9eb) with a subtle texture overlay. 

Specific symbolic colors (The Golden Dawn system) are used for data visualization and diagrammatic elements:
- **Kether/White** for pure source.
- **Binah/Black** for structure.
- **Chesed/Blue** and **Geburah/Red** for the pillars of mercy and severity.
- **Neutral tones** are desaturated and warm, ensuring the interface feels organic rather than clinical.

## Typography
The system uses a high-contrast pairing between **EB Garamond** (Display/Serif) and **Inter** (Functional/Sans-serif). 

- **EB Garamond** is used for all headlines, titles, and "marginalia" (asides or decorative quotes) to provide a literary, classical feel.
- **Inter** is used for UI labels, metadata, and long-form body text where clarity is paramount. 
- **Letter spacing** is aggressive on labels (0.1em) to create an airy, premium feel. 
- **Marginalia** is a specialized role specifically for italicized serif text used in sidebars or footnotes.

## Layout & Spacing
The layout follows a **Fixed Center-Column** philosophy for primary content (diagrams/text) with **Marginalia Sidebars** on large screens. 

- **Grid:** A standard 12-column system is used, but content is often constrained to the center 6-8 columns to maintain a scholarly "book" feel.
- **Rhythm:** Spacing follows the Golden Ratio (phi) where possible to reinforce the sacred geometry theme.
- **Margins:** Large page margins (32px+) ensure content never feels crowded.
- **Mobile:** Sidebars are hidden, and the central diagram scales to fit the viewport width with a minimum 16px gutter.

## Elevation & Depth
Elevation is conveyed through **Tonal Layers** and **Subtle Glows** rather than heavy shadows.

- **Surface Tiers:** The base parchment surface is the lowest level. Modal cards and navigation bars use slightly elevated containers (`surface-container-low`) with very fine borders (#d0c5af).
- **Interactive Depth:** Hovering over interactive nodes (spheres) uses `drop-shadow` with a `currentColor` tint, creating a "divine emanation" or glow effect rather than a physical shadow.
- **Modals:** Use a `backdrop-blur` (8px-12px) to focus the user’s attention, suggesting the UI is unfolding on top of the diagram like a physical scroll.

## Shapes
The shape language is primarily **Geometric and Sharp**. 

- **Containers:** Use small radii (4px-8px) to suggest the edges of heavy paper or stone tablets.
- **Interactive Elements:** Nodes are perfect circles, reinforcing the "Sacred Geometry" aesthetic.
- **Borders:** Thin (1px) and consistent across all containers, utilizing `outline-variant` colors to keep the structure light.
- **Navigation:** The bottom bar uses a `rounded-t-xl` (12px) to give it a soft, "anchored" feel against the bottom of the screen.

## Components
- **Buttons:** Outlined by default with 0px or 4px radius. Use uppercase `label-sm` typography. Hover states should invert the primary color and text color smoothly.
- **Chips/Nodes:** Circular spheres with radial gradients. Active states should trigger a "glow" emanation using `drop-shadow`.
- **Cards/Modals:** Use a "scroll-unfold" animation (scaleY). They feature a `headline-lg` title and a grid of metadata at the bottom separated by thin horizontal rules.
- **Navigation (Top):** Minimalist with high-tracking titles. Icons use a thin weight (300) to match the serif strokes.
- **Navigation (Bottom):** Active items are indicated by a top-border and a slight vertical offset (scale-105).
- **Icons:** Material Symbols Outlined, set to a thin weight (300) and small optical size (24px).