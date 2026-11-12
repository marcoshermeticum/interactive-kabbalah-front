'use client';

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import type { PathTooltipAnchor } from './usePathTooltips';

interface Props {
  pos: PathTooltipAnchor;
  boundsWidth: number;
  boundsHeight: number;
  pinned?: boolean;
  maxWidth?: number;
  children: ReactNode;
}

const OFFSET = 20;
const MARGIN = 8;

/**
 * Tooltip for tree paths. Measures itself and keeps inside the tree bounds:
 * flips to the left of the anchor near the right edge and clamps vertically.
 */
export default function PathTooltip({ pos, boundsWidth, boundsHeight, pinned = false, maxWidth = 320, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [place, setPlace] = useState<{ left: number; top: number } | null>(null);

  // Runs after every render; setPlace bails out when the value is unchanged.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;

    let left = pos.x + OFFSET;
    if (left + w > boundsWidth - MARGIN) left = pos.x - OFFSET - w;
    left = Math.max(MARGIN, Math.min(left, boundsWidth - w - MARGIN));

    let top = pos.y - OFFSET;
    top = Math.max(MARGIN, Math.min(top, boundsHeight - h - MARGIN));

    setPlace((prev) => (prev && prev.left === left && prev.top === top ? prev : { left, top }));
  });

  return (
    <div
      ref={ref}
      className={`absolute ${pinned ? 'z-[500]' : 'z-[490] pointer-events-none'}`}
      data-pinned-tooltip={pinned ? '' : undefined}
      style={{
        left: place?.left ?? 0,
        top: place?.top ?? 0,
        width: 'max-content',
        maxWidth: Math.min(maxWidth, boundsWidth - MARGIN * 2),
        visibility: place ? 'visible' : 'hidden',
      }}
    >
      {children}
    </div>
  );
}
