'use client';

import { useEffect } from 'react';
import { tooltipManager } from './TooltipManager';

/**
 * Global handler that closes the most recently pinned tooltip
 * when the user taps/clicks outside the tree context.
 * 
 * Rules:
 * - Only closes on TAP (not drag — movement > 8px is ignored)
 * - Only closes when tap is outside the tree area
 * - Closes one tooltip per tap (most recent first)
 * - Works on mobile (records target on pointerdown before capture steals it)
 * 
 * Mount this once at the page level.
 */
export default function TooltipOutsideHandler() {
  useEffect(() => {
    let downPos: { x: number; y: number } | null = null;
    let downTarget: Element | null = null;
    const DRAG_THRESHOLD = 8;

    const handleDown = (e: PointerEvent) => {
      downPos = { x: e.clientX, y: e.clientY };
      // Record target NOW — before DraggableArea captures the pointer
      downTarget = e.target as Element;
    };

    const handleUp = (e: PointerEvent) => {
      if (!downPos || !downTarget) {
        downPos = null;
        downTarget = null;
        return;
      }
      if (tooltipManager.count === 0) {
        downPos = null;
        downTarget = null;
        return;
      }

      const dx = e.clientX - downPos.x;
      const dy = e.clientY - downPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const target = downTarget;
      downPos = null;
      downTarget = null;

      // If it was a drag, don't close anything
      if (dist > DRAG_THRESHOLD) return;

      // Check if the tap was on the tree context using the DOWN target
      // (pointerup target is unreliable due to pointer capture on mobile)

      // Inside a tooltip or its trigger — don't close
      if (target.closest('[data-tooltip-container]')) return;
      if (target.closest('[data-pinned-tooltip]')) return;
      
      // Inside the tree SVG (sephirots, paths, ornaments) — don't close
      if (target.closest('svg')) return;

      // Inside a sephirot node — don't close
      if (target.closest('[style*="width: 170px"]')) return;

      // Inside a cursor-pointer interactive element (path hit areas) — don't close
      if (target.closest('.cursor-pointer')) return;

      // It's outside tree context — close the most recent tooltip
      tooltipManager.closeLatest();
    };

    // Escape key closes most recent tooltip (one at a time)
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && tooltipManager.count > 0) {
        tooltipManager.closeLatest();
      }
    };

    document.addEventListener('pointerdown', handleDown, { capture: true });
    document.addEventListener('pointerup', handleUp, { capture: true });
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('pointerdown', handleDown, { capture: true });
      document.removeEventListener('pointerup', handleUp, { capture: true });
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  return null;
}
