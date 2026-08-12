'use client';

import { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { tooltipManager } from './TooltipManager';
import { TooltipActions } from './TooltipActions';

interface Props {
  children: ReactNode;
  content: ReactNode;
}

/**
 * Tooltip with smart positioning and multi-pin support.
 * 
 * Positioning strategy:
 * - Default: appears above the trigger (bottom-full)
 * - If another pinned tooltip overlaps above, try showing BELOW the trigger
 * - If viewport edge is hit, shift horizontally
 * - Uses data-pinned-tooltip attribute for overlap detection
 */
export default function Tooltip({ children, content }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [placement, setPlacement] = useState<'above' | 'below' | 'left' | 'right'>('above');
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const isTouchDevice = useRef(false);
  const deregisterRef = useRef<(() => void) | null>(null);
  const ui = useTranslations('ui');

  const show = useCallback(() => {
    // If any tooltip is already pinned, don't show others on hover
    // (prevents "bleed-through" tooltips appearing under pinned ones)
    if (tooltipManager.count > 0 && !isPinned) return;
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setIsVisible(true);
  }, [isPinned]);

  const hide = useCallback(() => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setIsPinned(false);
    setIsVisible(false);
    setPlacement('above');
    if (deregisterRef.current) {
      deregisterRef.current();
      deregisterRef.current = null;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    if (isPinned) return;
    hideTimeout.current = setTimeout(() => setIsVisible(false), 200);
  }, [isPinned]);

  // Smart positioning: try placements in order until no overlap is found
  const adjustPosition = useCallback(() => {
    if (!tooltipRef.current || !containerRef.current) return;

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const pinnedTooltips = document.querySelectorAll('[data-pinned-tooltip]');

    const hasOverlap = () => {
      let overlap = false;
      pinnedTooltips.forEach((el) => {
        if (el === tooltipRef.current) return;
        const otherRect = el.getBoundingClientRect();
        const overlapX = tooltipRect.left < otherRect.right && tooltipRect.right > otherRect.left;
        const overlapY = tooltipRect.top < otherRect.bottom && tooltipRect.bottom > otherRect.top;
        if (overlapX && overlapY) overlap = true;
      });
      return overlap;
    };

    if (!hasOverlap()) return;

    // Try placements in order: below, left, right
    const placements: Array<'below' | 'left' | 'right'> = ['below', 'left', 'right'];
    for (const p of placements) {
      if (p !== placement) {
        setPlacement(p);
        return;
      }
    }
  }, [placement]);

  const pin = useCallback(() => {
    if (isPinned) return;
    setIsPinned(true);
    setIsVisible(true);
    setPlacement('above');
    deregisterRef.current = tooltipManager.register(hide);
    // Check for overlap after render
    requestAnimationFrame(() => {
      requestAnimationFrame(() => adjustPosition());
    });
  }, [isPinned, hide, adjustPosition]);

  const handleClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    pin();
  }, [pin]);

  // Detect touch
  useEffect(() => {
    const onTouch = () => { isTouchDevice.current = true; };
    window.addEventListener('touchstart', onTouch, { once: true, passive: true });
    return () => window.removeEventListener('touchstart', onTouch);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (deregisterRef.current) {
        deregisterRef.current();
        deregisterRef.current = null;
      }
    };
  }, []);

  const positionClasses = (() => {
    switch (placement) {
      case 'above': return 'bottom-full mb-2 left-1/2 -translate-x-1/2';
      case 'below': return 'top-full mt-2 left-1/2 -translate-x-1/2';
      case 'left': return 'right-full mr-2 top-1/2 -translate-y-1/2';
      case 'right': return 'left-full ml-2 top-1/2 -translate-y-1/2';
    }
  })();

  return (
    <div
      ref={containerRef}
      className="relative"
      data-tooltip-container
      onMouseEnter={() => { if (!isTouchDevice.current) show(); }}
      onMouseLeave={() => { if (!isTouchDevice.current) scheduleHide(); }}
      onClick={handleClick}
    >
      {children}

      {isVisible && (
        <div
          ref={tooltipRef}
          data-pinned-tooltip={isPinned ? '' : undefined}
          className={`absolute ${positionClasses} z-[500] ${isPinned ? '' : 'pointer-events-none'}`}
          onMouseEnter={() => { if (!isTouchDevice.current) show(); }}
          onMouseLeave={() => { if (!isTouchDevice.current) scheduleHide(); }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`bg-gray-900/95 backdrop-blur text-white text-xs rounded-lg px-4 py-3 shadow-2xl border ${isPinned ? 'border-yellow-400/50' : 'border-white/10'} min-w-[220px] max-w-[340px] select-text`}>
            {content}
            {isPinned && (
              <TooltipActions
                onCopy={async () => {
                  const el = tooltipRef.current;
                  return el ? el.innerText : '';
                }}
                onClose={() => hide()}
              />
            )}
          </div>
          {!isPinned && (
            <p className="text-center text-[9px] text-white/40 mt-1">{ui('clickToPin')}</p>
          )}
        </div>
      )}
    </div>
  );
}
