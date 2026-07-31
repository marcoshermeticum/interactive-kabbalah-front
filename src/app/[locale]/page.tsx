'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import DraggableArea from '@/components/DraggableArea/DraggableArea';
import type { DraggableAreaHandle } from '@/components/DraggableArea/DraggableArea';
import KabbalahTree from '@/components/KabbalahTree/KabbalahTree';
import QliphothTree from '@/components/QliphothTree/QliphothTree';
import CombinedTree from '@/components/CombinedTree/CombinedTree';
import Navbar from '@/components/Navbar/Navbar';
import TooltipOutsideHandler from '@/components/Tooltip/TooltipOutsideHandler';
import type { SearchResult } from '@/data/searchIndex';

export default function HomePage() {
  const [view, setView] = useState<'life' | 'death' | 'both'>('life');
  const [showVeils, setShowVeils] = useState(true);
  const [showPillars, setShowPillars] = useState(true);
  const [pendingFocus, setPendingFocus] = useState<SearchResult | null>(null);
  const draggableRef = useRef<DraggableAreaHandle>(null);

  const focusAndTrigger = useCallback((result: SearchResult) => {
    // 1. Pan + zoom to the element's position
    if (draggableRef.current) {
      draggableRef.current.focusOnPoint(result.position.x, result.position.y);
    }

    // 2. After animation completes, simulate a click on the element to open its tooltip
    setTimeout(() => {
      triggerTooltipForResult(result);
    }, 500); // Wait for zoom animation to finish
  }, []);

  const handleSearchSelect = useCallback((result: SearchResult) => {
    // Switch to the appropriate view if needed
    const targetView = result.view === 'any' ? view : result.view;
    if (targetView !== view) {
      setView(targetView);
      // View is changing — set pending focus for after render
      setPendingFocus(result);
    } else {
      // Already on the right view — focus immediately
      focusAndTrigger(result);
    }
  }, [view, focusAndTrigger]);

  // Consume pending focus after the tree has rendered
  useEffect(() => {
    if (pendingFocus) {
      const timer = setTimeout(() => {
        focusAndTrigger(pendingFocus);
        setPendingFocus(null);
      }, 200); // Wait for tree to mount and render
      return () => clearTimeout(timer);
    }
  }, [pendingFocus, focusAndTrigger]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <TooltipOutsideHandler />
      <Navbar
        view={view}
        onViewChange={setView}
        showVeils={showVeils}
        onShowVeilsChange={setShowVeils}
        showPillars={showPillars}
        onShowPillarsChange={setShowPillars}
        onSearchSelect={handleSearchSelect}
      />

      {/* Canvas */}
      <main className="flex-1 relative">
        <DraggableArea ref={draggableRef}>
          {view === 'life' && <KabbalahTree showVeils={showVeils} showPillars={showPillars} />}
          {view === 'death' && <QliphothTree />}
          {view === 'both' && <CombinedTree />}
        </DraggableArea>
      </main>
    </div>
  );
}

/**
 * After focusing on an element, programmatically trigger a click
 * on the correct DOM element to open its tooltip.
 */
function triggerTooltipForResult(result: SearchResult) {
  let target: Element | null = null;

  switch (result.type) {
    case 'sephirot': {
      target = document.querySelector(`[data-sephirot-id="${result.id}"]`);
      break;
    }
    case 'qliphah': {
      target = document.querySelector(`[data-sephirot-id="${result.id}"]`);
      break;
    }
    case 'path': {
      target = document.querySelector(`[data-path-number="${result.id}"]`);
      break;
    }
    case 'tunnel': {
      target = document.querySelector(`[data-path-number="tunnel-${result.id}"]`);
      break;
    }
    case 'daemon': {
      // Daemon result id is the associated qliphah or tunnel refId
      // Try as qliphah first, then as tunnel
      target = document.querySelector(`[data-sephirot-id="${result.id}"]`);
      if (!target) {
        target = document.querySelector(`[data-path-number="tunnel-${result.id}"]`);
      }
      break;
    }
    case 'veil': {
      target = document.querySelector(`[data-ornament-id="${result.id}"]`);
      break;
    }
    case 'pillar': {
      target = document.querySelector(`[data-ornament-id="${result.id}"]`);
      break;
    }
  }

  if (target) {
    target.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    }));
  }
}
