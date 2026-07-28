'use client';

import { ReactNode, useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import HermeticBackground from '@/components/HermeticBackground/HermeticBackground';

export interface DraggableAreaHandle {
  /** Smoothly pan and zoom so that the given content coordinates are centered on screen */
  focusOnPoint: (contentX: number, contentY: number, targetScale?: number) => void;
}

/**
 * High-performance pan & zoom area.
 * Uses refs for transform state to avoid re-renders on every frame.
 * Unified Pointer Events API works for mouse, touch, and pen.
 * 
 * Pinch-to-zoom zooms toward the midpoint between fingers and pans simultaneously.
 * Auto-fits content to viewport on initial load.
 * On mobile: uses tighter padding and ensures the full tree is visible and centered.
 */
const DraggableArea = forwardRef<DraggableAreaHandle, { children: ReactNode }>(function DraggableArea({ children }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Transform state in refs (no re-renders)
  const transform = useRef({ x: 0, y: 0, scale: 1 });
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const lastPinchDist = useRef<number>(0);
  const lastPinchMid = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const initialized = useRef(false);
  // Touch drag threshold tracking
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartedOnInteractive = useRef(false);
  const hasMoved = useRef(false);
  const PAN_THRESHOLD = 6; // px — movement before panning starts on touch

  const MIN_SCALE = 0.3;
  const MAX_SCALE = 5;

  const applyTransform = useCallback(() => {
    if (contentRef.current) {
      const { x, y, scale } = transform.current;
      contentRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    }
  }, []);

  const getDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getMidpoint = (p1: { x: number; y: number }, p2: { x: number; y: number }) => ({
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  });

  /**
   * Zoom toward a specific point in screen coordinates.
   * This adjusts both scale AND translation so the point stays fixed on screen.
   */
  const zoomToward = useCallback((screenX: number, screenY: number, newScale: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    // Point in container-local coordinates
    const cx = screenX - rect.left;
    const cy = screenY - rect.top;

    const { x, y, scale: oldScale } = transform.current;
    const clampedScale = Math.min(Math.max(MIN_SCALE, newScale), MAX_SCALE);
    const ratio = clampedScale / oldScale;

    // Adjust translation so the zoom focal point stays at the same screen position
    transform.current = {
      x: cx - ratio * (cx - x),
      y: cy - ratio * (cy - y),
      scale: clampedScale,
    };
    applyTransform();
  }, [applyTransform]);

  // Auto-fit: calculate initial scale so the entire tree is visible and centered
  // On mobile: centers Tiferet (y=890) in the viewport as focal point
  const fitToViewport = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const containerRect = container.getBoundingClientRect();
    if (containerRect.width === 0 || containerRect.height === 0) return;
    
    const contentEl = content.firstElementChild as HTMLElement | null;
    if (!contentEl) return;

    // The tree layout is a fixed 800x1640 coordinate space
    const contentWidth = 800;
    const contentHeight = 1640;

    // On mobile (narrow viewport), use minimal padding to maximize tree visibility
    const isMobile = containerRect.width < 768;
    const padding = isMobile ? 2 : 16;
    const availableWidth = containerRect.width - padding * 2;
    const availableHeight = containerRect.height - padding * 2;

    const scaleX = availableWidth / contentWidth;
    const scaleY = availableHeight / contentHeight;
    const scale = Math.min(scaleX, scaleY, 1); // Never zoom in beyond 1

    // Center horizontally
    const scaledWidth = contentWidth * scale;
    const x = (containerRect.width - scaledWidth) / 2;

    // Vertically: on mobile, center Tiferet (y=890) in the viewport
    // On desktop, center the whole tree
    let y: number;
    if (isMobile) {
      // Tiferet at y=890 in content space → should map to center of viewport
      const tiferetScreenY = 890 * scale;
      const viewportCenterY = containerRect.height / 2;
      y = viewportCenterY - tiferetScreenY;
    } else {
      const scaledHeight = contentHeight * scale;
      y = (containerRect.height - scaledHeight) / 2;
    }

    transform.current = { x, y, scale };
    applyTransform();
  }, [applyTransform]);

  /**
   * Smoothly animate the transform to center a given content-space point on screen.
   * Uses requestAnimationFrame for smooth animation.
   */
  const focusOnPoint = useCallback((contentX: number, contentY: number, targetScale?: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Desired scale: 1.5 on desktop, 1.2 on mobile, or user-specified
    const isMobile = rect.width < 768;
    const newScale = targetScale ?? (isMobile ? 1.2 : 1.5);

    // Calculate translation so (contentX, contentY) maps to center of viewport
    const viewCenterX = rect.width / 2;
    const viewCenterY = rect.height / 2;
    const targetX = viewCenterX - contentX * newScale;
    const targetY = viewCenterY - contentY * newScale;

    // Animate from current to target
    const startX = transform.current.x;
    const startY = transform.current.y;
    const startScale = transform.current.scale;
    const duration = 400; // ms
    const startTime = performance.now();

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);

      transform.current = {
        x: startX + (targetX - startX) * eased,
        y: startY + (targetY - startY) * eased,
        scale: startScale + (newScale - startScale) * eased,
      };
      applyTransform();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [applyTransform]);

  useImperativeHandle(ref, () => ({ focusOnPoint }), [focusOnPoint]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fit to viewport on first render (with retry for late-loading content)
    if (!initialized.current) {
      const tryFit = () => {
        fitToViewport();
        initialized.current = true;
      };
      // Try immediately, then again after short delays for hydration + layout
      requestAnimationFrame(() => {
        tryFit();
        setTimeout(tryFit, 100);
        setTimeout(tryFit, 300);
      });
    }

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Element;
      const isOnInteractive = !!(
        target.closest('[data-tooltip-container]') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('[data-no-pan]')
      );
      const isOnClickable = !!target.closest('.cursor-pointer');

      // For inputs/selects, don't capture — they need native focus
      if (target.closest('input') || target.closest('select')) {
        return;
      }

      // Always capture pointer for panning — we distinguish click vs drag
      // via movement threshold (same approach for both touch and mouse)
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      container.setPointerCapture(e.pointerId);

      // Prevent native click on interactive elements — we'll dispatch it
      // ourselves on pointerUp if the user didn't drag
      if (isOnInteractive || isOnClickable) {
        e.preventDefault();
      }

      if (pointers.current.size === 1) {
        isPanning.current = false;
        panStart.current = {
          x: e.clientX - transform.current.x,
          y: e.clientY - transform.current.y,
        };
        dragStartPos.current = { x: e.clientX, y: e.clientY };
        dragStartedOnInteractive.current = isOnInteractive || isOnClickable;
        hasMoved.current = false;
      } else if (pointers.current.size === 2) {
        isPanning.current = false;
        hasMoved.current = true;
        const pts = Array.from(pointers.current.values());
        lastPinchDist.current = getDistance(pts[0], pts[1]);
        lastPinchMid.current = getMidpoint(pts[0], pts[1]);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pointers.current.has(e.pointerId)) return;
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.current.size === 2) {
        // --- Pinch-to-zoom with midpoint tracking ---
        const pts = Array.from(pointers.current.values());
        const newDist = getDistance(pts[0], pts[1]);
        const newMid = getMidpoint(pts[0], pts[1]);

        if (lastPinchDist.current > 0) {
          const scaleRatio = newDist / lastPinchDist.current;
          const newScale = transform.current.scale * scaleRatio;

          const container = containerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            const cx = newMid.x - rect.left;
            const cy = newMid.y - rect.top;

            const oldScale = transform.current.scale;
            const clampedScale = Math.min(Math.max(MIN_SCALE, newScale), MAX_SCALE);
            const ratio = clampedScale / oldScale;

            const midDx = newMid.x - lastPinchMid.current.x;
            const midDy = newMid.y - lastPinchMid.current.y;

            transform.current = {
              x: cx - ratio * (cx - transform.current.x) + midDx,
              y: cy - ratio * (cy - transform.current.y) + midDy,
              scale: clampedScale,
            };
            applyTransform();
          }
        }

        lastPinchDist.current = newDist;
        lastPinchMid.current = newMid;
      } else if (pointers.current.size === 1) {
        // Check if we've exceeded the movement threshold
        if (!hasMoved.current) {
          const dx = e.clientX - dragStartPos.current.x;
          const dy = e.clientY - dragStartPos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < PAN_THRESHOLD) return; // Not enough movement yet
          // Threshold exceeded — begin panning
          hasMoved.current = true;
          isPanning.current = true;
          container.style.cursor = 'grabbing';
        }

        if (isPanning.current) {
          transform.current.x = e.clientX - panStart.current.x;
          transform.current.y = e.clientY - panStart.current.y;
          applyTransform();
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      pointers.current.delete(e.pointerId);
      container.releasePointerCapture(e.pointerId);

      if (pointers.current.size === 0) {
        // If started on interactive element and didn't move — fire click
        // Works for both touch and mouse (since we now capture all pointers)
        if (!hasMoved.current && dragStartedOnInteractive.current) {
          const target = document.elementFromPoint(e.clientX, e.clientY);
          if (target) {
            target.dispatchEvent(new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              clientX: e.clientX,
              clientY: e.clientY,
              view: window,
            }));
          }
        }
        isPanning.current = false;
        hasMoved.current = false;
        lastPinchDist.current = 0;
        container.style.cursor = 'grab';
      } else if (pointers.current.size === 1) {
        // Transition from pinch back to pan with remaining finger
        isPanning.current = true;
        hasMoved.current = true;
        lastPinchDist.current = 0;
        const remaining = Array.from(pointers.current.values())[0];
        panStart.current = {
          x: remaining.x - transform.current.x,
          y: remaining.y - transform.current.y,
        };
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Zoom toward mouse position
      const delta = e.deltaY > 0 ? 0.92 : 1.08; // multiplicative for smoother feel
      const newScale = transform.current.scale * delta;
      zoomToward(e.clientX, e.clientY, newScale);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        transform.current.scale = Math.min(transform.current.scale * 1.1, MAX_SCALE);
        applyTransform();
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        transform.current.scale = Math.max(transform.current.scale * 0.9, MIN_SCALE);
        applyTransform();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length >= 1) e.preventDefault();
    };

    // Re-fit on window resize
    const onResize = () => {
      fitToViewport();
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointercancel', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    return () => {
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [applyTransform, fitToViewport, zoomToward]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden relative select-none canvas-texture"
      style={{ cursor: 'grab', touchAction: 'none' }}
    >
      <HermeticBackground />
      <div
        ref={contentRef}
        style={{ transformOrigin: '0 0', willChange: 'transform' }}
      >
        {children}
      </div>
    </div>
  );
});

export default DraggableArea;
