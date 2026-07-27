'use client';

import { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { tooltipManager } from './TooltipManager';

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
  const [copied, setCopied] = useState(false);
  const [placement, setPlacement] = useState<'above' | 'below'>('above');
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const isTouchDevice = useRef(false);
  const deregisterRef = useRef<(() => void) | null>(null);
  const ui = useTranslations('ui');

  const show = useCallback(() => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setIsVisible(true);
  }, []);

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

  // Smart positioning: check if tooltip overlaps any other pinned tooltip
  const adjustPosition = useCallback(() => {
    if (!tooltipRef.current || !containerRef.current) return;

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const pinnedTooltips = document.querySelectorAll('[data-pinned-tooltip]');
    let hasOverlap = false;

    pinnedTooltips.forEach((el) => {
      if (el === tooltipRef.current) return;
      const otherRect = el.getBoundingClientRect();
      const overlapX = tooltipRect.left < otherRect.right && tooltipRect.right > otherRect.left;
      const overlapY = tooltipRect.top < otherRect.bottom && tooltipRect.bottom > otherRect.top;
      if (overlapX && overlapY) {
        hasOverlap = true;
      }
    });

    // If overlapping, flip to below
    if (hasOverlap && placement === 'above') {
      setPlacement('below');
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

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = tooltipRef.current;
    if (!el) return;
    const text = el.innerText;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    hide();
  };

  const positionClasses = placement === 'above'
    ? 'bottom-full mb-2'
    : 'top-full mt-2';

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
          className={`absolute left-1/2 -translate-x-1/2 ${positionClasses} z-[500] ${isPinned ? '' : 'pointer-events-none'}`}
          onMouseEnter={() => { if (!isTouchDevice.current) show(); }}
          onMouseLeave={() => { if (!isTouchDevice.current) scheduleHide(); }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`bg-gray-900/95 backdrop-blur text-white text-xs rounded-lg px-4 py-3 shadow-2xl border ${isPinned ? 'border-yellow-400/50' : 'border-white/10'} min-w-[220px] max-w-[340px] select-text`}>
            {content}
            {isPinned && (
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                <button
                  onClick={handleCopy}
                  className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition flex items-center gap-1"
                >
                  {copied ? `✓ ${ui('copied')}` : `📋 ${ui('copy')}`}
                </button>
                <button
                  onClick={handleClose}
                  className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition"
                >
                  ✕ {ui('close')}
                </button>
              </div>
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
