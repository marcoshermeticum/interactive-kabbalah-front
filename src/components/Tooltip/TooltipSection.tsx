'use client';

import { useState, useEffect, useId } from 'react';
import { safeGetItem } from '@/hooks/useNotificationState';

interface TooltipSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

/**
 * Collapsible section within a tooltip.
 * Feature flag: enabled by default (sections are collapsible).
 * Set NEXT_PUBLIC_TOOLTIP_COLLAPSIBLE=false to disable collapsibility entirely.
 * 
 * The initial expanded state is controlled by the "tooltipCategoriesExpanded" 
 * localStorage flag (toggled in Settings). Default: expanded (true).
 */
const COLLAPSIBLE_ENABLED = process.env.NEXT_PUBLIC_TOOLTIP_COLLAPSIBLE !== 'false';

export function TooltipSection({ title, children, defaultExpanded }: TooltipSectionProps) {
  // Read the user preference from localStorage (default: expanded)
  const [expanded, setExpanded] = useState(() => {
    if (defaultExpanded !== undefined) return defaultExpanded;
    // Read persisted preference — default to true (expanded)
    const stored = safeGetItem('tooltipCategoriesExpanded');
    return stored !== 'false';
  });
  const regionId = useId();

  // Sync with localStorage changes (e.g., when user toggles in Settings)
  useEffect(() => {
    if (defaultExpanded !== undefined) return; // Skip if explicitly controlled
    const handleStorage = () => {
      const stored = safeGetItem('tooltipCategoriesExpanded');
      setExpanded(stored !== 'false');
    };
    window.addEventListener('storage', handleStorage);
    // Also listen for custom event (same-tab localStorage changes)
    window.addEventListener('tooltipCategoriesChanged', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('tooltipCategoriesChanged', handleStorage);
    };
  }, [defaultExpanded]);

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
