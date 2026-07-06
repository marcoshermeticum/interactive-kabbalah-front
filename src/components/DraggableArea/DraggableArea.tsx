'use client';

import { ReactNode, useEffect, useRef, useCallback } from 'react';

/**
 * High-performance pan & zoom area.
 * Uses refs for transform state to avoid re-renders on every frame.
 * Unified Pointer Events API works for mouse, touch, and pen.
 * 
 * Auto-fits content to viewport on initial load.
 */
export default function DraggableArea({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Transform state in refs (no re-renders)
  const transform = useRef({ x: 0, y: 0, scale: 1 });
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const lastPinchDist = useRef<number>(0);
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const initialized = useRef(false);

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

  // Auto-fit: calculate initial scale so the entire tree is visible
  const fitToViewport = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const containerRect = container.getBoundingClientRect();
    if (containerRect.width === 0 || containerRect.height === 0) return;
    
    const contentEl = content.firstElementChild as HTMLElement | null;
    if (!contentEl) return;

    // Use scrollWidth/scrollHeight for accurate measurement including absolute children
    const contentWidth = Math.max(contentEl.scrollWidth, contentEl.offsetWidth, 800);
    const contentHeight = Math.max(contentEl.scrollHeight, contentEl.offsetHeight, 1640);

    const padding = 16;
    const availableWidth = containerRect.width - padding * 2;
    const availableHeight = containerRect.height - padding * 2;

    const scaleX = availableWidth / contentWidth;
    const scaleY = availableHeight / contentHeight;
    const scale = Math.min(scaleX, scaleY, 1); // Never zoom in beyond 1

    // Center the content
    const scaledWidth = contentWidth * scale;
    const scaledHeight = contentHeight * scale;
    const x = (containerRect.width - scaledWidth) / 2;
    const y = (containerRect.height - scaledHeight) / 2;

    transform.current = { x, y, scale };
    applyTransform();
  }, [applyTransform]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fit to viewport on first render (with retry for late-loading content)
    if (!initialized.current) {
      const tryFit = () => {
        fitToViewport();
        initialized.current = true;
      };
      // Try immediately, then again after a short delay for hydration
      requestAnimationFrame(() => {
        tryFit();
        setTimeout(tryFit, 100);
      });
    }

    const onPointerDown = (e: PointerEvent) => {
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      container.setPointerCapture(e.pointerId);

      if (pointers.current.size === 1) {
        isPanning.current = true;
        panStart.current = {
          x: e.clientX - transform.current.x,
          y: e.clientY - transform.current.y,
        };
        container.style.cursor = 'grabbing';
      } else if (pointers.current.size === 2) {
        isPanning.current = false;
        const pts = Array.from(pointers.current.values());
        lastPinchDist.current = getDistance(pts[0], pts[1]);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pointers.current.has(e.pointerId)) return;
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.current.size === 2) {
        const pts = Array.from(pointers.current.values());
        const dist = getDistance(pts[0], pts[1]);
        if (lastPinchDist.current > 0) {
          const delta = (dist - lastPinchDist.current) * 0.004;
          transform.current.scale = Math.min(Math.max(0.3, transform.current.scale + delta), 5);
          applyTransform();
        }
        lastPinchDist.current = dist;
      } else if (pointers.current.size === 1 && isPanning.current) {
        transform.current.x = e.clientX - panStart.current.x;
        transform.current.y = e.clientY - panStart.current.y;
        applyTransform();
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      pointers.current.delete(e.pointerId);
      container.releasePointerCapture(e.pointerId);

      if (pointers.current.size === 0) {
        isPanning.current = false;
        container.style.cursor = 'grab';
      } else if (pointers.current.size === 1) {
        isPanning.current = true;
        const remaining = Array.from(pointers.current.values())[0];
        panStart.current = {
          x: remaining.x - transform.current.x,
          y: remaining.y - transform.current.y,
        };
      }
      lastPinchDist.current = 0;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.08 : 0.08;
      transform.current.scale = Math.min(Math.max(0.3, transform.current.scale + delta), 5);
      applyTransform();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        transform.current.scale = Math.min(transform.current.scale + 0.1, 5);
        applyTransform();
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        transform.current.scale = Math.max(transform.current.scale - 0.1, 0.3);
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
  }, [applyTransform, fitToViewport]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden relative select-none"
      style={{ cursor: 'grab', background: 'var(--bg-canvas)', touchAction: 'none' }}
    >
      <div
        ref={contentRef}
        style={{ transformOrigin: 'top left', willChange: 'transform' }}
      >
        {children}
      </div>
    </div>
  );
}
