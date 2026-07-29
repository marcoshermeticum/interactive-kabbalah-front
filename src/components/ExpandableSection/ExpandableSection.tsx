'use client';

import { useState, useId } from 'react';
import { useTranslations } from 'next-intl';

interface ExpandableSectionProps {
  children: React.ReactNode;
  collapsedLabel?: string;
  expandedLabel?: string;
}

export function ExpandableSection({
  children,
  collapsedLabel,
  expandedLabel,
}: ExpandableSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const ui = useTranslations('ui');
  const regionId = useId();

  const resolvedCollapsedLabel = collapsedLabel ?? ui('seeMore');
  const resolvedExpandedLabel = expandedLabel ?? ui('seeLess');

  return (
    <div className="mt-1">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={regionId}
        onClick={() => setExpanded((prev) => !prev)}
        className="min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 text-[11px] text-white/60 hover:text-white/90 transition-colors cursor-pointer underline underline-offset-2"
      >
        {expanded ? resolvedExpandedLabel : resolvedCollapsedLabel}
      </button>
      <div id={regionId} role="region" hidden={!expanded}>
        {expanded && children}
      </div>
    </div>
  );
}
