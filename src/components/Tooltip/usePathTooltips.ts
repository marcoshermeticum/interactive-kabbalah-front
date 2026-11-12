'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type React from 'react';
import { tooltipManager } from './TooltipManager';
import { copyText } from '@/lib/clipboard';

export interface PathTooltipAnchor {
  x: number;
  y: number;
}

export interface PinnedPathTooltip {
  pathNumber: number;
  pos: PathTooltipAnchor;
}

interface HoveredPath {
  pathNumber: number;
  pos: PathTooltipAnchor;
}

// Touch can deliver the same tap twice (synthetic click from DraggableArea +
// native click). Ignore a repeated click on the same path inside this window,
// otherwise the tooltip opens and immediately closes again.
const DUPLICATE_CLICK_MS = 450;

/**
 * Shared hover / pin logic for the path tooltips of both trees (Life and Death).
 *
 * - Anchor positions are computed from clientX/clientY in the coordinate space
 *   of the root element (compensating for the pan/zoom scale), instead of the
 *   unreliable `offsetX/offsetY` of rotated SVG rects.
 * - Hover previews are mouse/pen only; touch only pins.
 * - Taps are de-duplicated and the pin toggle does not depend on stale state.
 */
export function usePathTooltips() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<HoveredPath | null>(null);
  const [pinned, setPinned] = useState<PinnedPathTooltip[]>([]);
  const [copiedPath, setCopiedPath] = useState<number | null>(null);
  const pinnedRef = useRef<PinnedPathTooltip[]>([]);
  const deregisterRefs = useRef<Map<number, () => void>>(new Map());
  const lastClick = useRef<{ pathNumber: number; time: number }>({ pathNumber: -1, time: 0 });

  const toLocal = useCallback((clientX: number, clientY: number): PathTooltipAnchor => {
    const el = rootRef.current;
    if (!el) return { x: 0, y: 0 };
    const rect = el.getBoundingClientRect();
    const sx = el.offsetWidth ? rect.width / el.offsetWidth : 1;
    const sy = el.offsetHeight ? rect.height / el.offsetHeight : 1;
    return { x: (clientX - rect.left) / (sx || 1), y: (clientY - rect.top) / (sy || 1) };
  }, []);

  const unpin = useCallback((pathNumber: number) => {
    pinnedRef.current = pinnedRef.current.filter((t) => t.pathNumber !== pathNumber);
    setPinned(pinnedRef.current);
    const dereg = deregisterRefs.current.get(pathNumber);
    if (dereg) {
      dereg();
      deregisterRefs.current.delete(pathNumber);
    }
  }, []);

  const handleClick = useCallback((e: React.MouseEvent, pathNumber: number) => {
    const now = performance.now();
    const last = lastClick.current;
    if (last.pathNumber === pathNumber && now - last.time < DUPLICATE_CLICK_MS) return;
    lastClick.current = { pathNumber, time: now };

    setHovered(null);

    if (pinnedRef.current.some((t) => t.pathNumber === pathNumber)) {
      unpin(pathNumber);
      return;
    }
    const pos = toLocal(e.clientX, e.clientY);
    pinnedRef.current = [...pinnedRef.current, { pathNumber, pos }];
    setPinned(pinnedRef.current);
    deregisterRefs.current.set(pathNumber, tooltipManager.register(() => unpin(pathNumber)));
  }, [toLocal, unpin]);

  /** Props to spread on a transparent hit-area element of a path. */
  const getHitProps = useCallback((pathNumber: number) => ({
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === 'touch') return;
      setHovered({ pathNumber, pos: toLocal(e.clientX, e.clientY) });
    },
    onPointerMove: (e: React.PointerEvent) => {
      if (e.pointerType === 'touch') return;
      setHovered({ pathNumber, pos: toLocal(e.clientX, e.clientY) });
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType === 'touch') return;
      setHovered((cur) => (cur && cur.pathNumber === pathNumber ? null : cur));
    },
    onClick: (e: React.MouseEvent) => handleClick(e, pathNumber),
  }), [toLocal, handleClick]);

  const copy = useCallback(async (pathNumber: number, text: string) => {
    if (!(await copyText(text))) return;
    setCopiedPath(pathNumber);
    setTimeout(() => setCopiedPath((cur) => (cur === pathNumber ? null : cur)), 1500);
  }, []);

  useEffect(() => {
    const regs = deregisterRefs.current;
    return () => {
      regs.forEach((dereg) => dereg());
      regs.clear();
    };
  }, []);

  return { rootRef, hovered, pinned, copiedPath, getHitProps, unpin, copy };
}
