'use client';

import { useState, useId } from 'react';

interface TooltipSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

/**
 * Collapsible section within a tooltip.
 * Feature flag: enabled by default (sections are collapsible).
 * Set NEXT_PUBLIC_TOOLTIP_COLLAPSIBLE=false to disable.
 */
const COLLAPSIBLE_ENABLED = process.env.NEXT_PUBLIC_TOOLTIP_COLLAPSIBLE !== 'false';

export function TooltipSection({ title, children, defaultExpanded = true }: TooltipSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const regionId = useId();

  // If feature flag is disabled, always show content without toggle
  if (!COLLAPSIBLE_ENABLED) {
    return (
      <div className="mt-2 pt-1 border-t border-white/10">
        <p className="text-white/60 text-[10px] uppercase tracking-wide">{title}</p>
        <div className="mt-0.5">{children}</div>
      </div>
    );
  }

  return (
    <div className="mt-2 pt-1 border-t border-white/10">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={regionId}
        onClick={(e) => { e.stopPropagation(); setExpanded((prev) => !prev); }}
        className="w-full flex items-center justify-between min-h-[32px] cursor-pointer group"
      >
        <span className="text-white/60 text-[10px] uppercase tracking-wide group-hover:text-white/80 transition-colors">
          {title}
        </span>
        <span className={`text-white/40 text-[10px] transition-transform ${expanded ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>
      <div id={regionId} role="region" hidden={!expanded}>
        {expanded && <div className="mt-0.5">{children}</div>}
      </div>
    </div>
  );
}
