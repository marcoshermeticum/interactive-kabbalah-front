'use client';

import { useRef, useState, useCallback } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import DraggableArea, { DraggableAreaHandle } from '@/components/DraggableArea/DraggableArea';
import KabbalahTree from '@/components/KabbalahTree/KabbalahTree';
import QliphothTree from '@/components/QliphothTree/QliphothTree';
import CombinedTree from '@/components/CombinedTree/CombinedTree';
import type { SearchResult } from '@/data/searchIndex';

type View = 'life' | 'death' | 'both';

/**
 * The interactive Tree of Life experience.
 *
 * Composes the Navbar (view switcher + search + settings) with a
 * pan/zoom DraggableArea that renders one of three trees depending on
 * the selected view:
 *   - life  → Tree of Life (KabbalahTree)
 *   - death → Tree of Death (QliphothTree)
 *   - both  → Combined (life on top, inverted death below)
 *
 * Search results are focused via the DraggableArea imperative handle.
 */
export default function TreeExperience() {
  const [view, setView] = useState<View>('life');
  const [showVeils, setShowVeils] = useState(true);
  const [showPillars, setShowPillars] = useState(true);
  const draggableRef = useRef<DraggableAreaHandle>(null);

  // Remount DraggableArea when the view changes so it re-fits the new
  // tree to the viewport (fitToViewport only runs on mount).
  const [fitKey, setFitKey] = useState(0);

  const handleViewChange = useCallback((next: View) => {
    setView(next);
    setFitKey((k) => k + 1);
  }, []);

  const handleSearchSelect = useCallback((result: SearchResult) => {
    // Switch to the view the result lives in (life/death). 'both' and
    // 'any' results are fine to focus in the current view.
    let targetView: View | null = null;
    if (result.view === 'life' || result.view === 'death' || result.view === 'both') {
      targetView = result.view;
    }

    const focus = () => {
      draggableRef.current?.focusOnPoint(result.position.x, result.position.y);
    };

    if (targetView && targetView !== view) {
      setView(targetView);
      setFitKey((k) => k + 1);
      // Wait for the new tree to mount + fit before focusing.
      setTimeout(focus, 250);
    } else {
      focus();
    }
  }, [view]);

  return (
    <div className="flex flex-col h-[100dvh] w-full overflow-hidden">
      <Navbar
        view={view}
        onViewChange={handleViewChange}
        showVeils={showVeils}
        onShowVeilsChange={setShowVeils}
        showPillars={showPillars}
        onShowPillarsChange={setShowPillars}
        onSearchSelect={handleSearchSelect}
      />

      <div className="flex-1 relative min-h-0">
        <DraggableArea key={fitKey} ref={draggableRef}>
          {view === 'life' && <KabbalahTree showVeils={showVeils} showPillars={showPillars} />}
          {view === 'death' && <QliphothTree />}
          {view === 'both' && <CombinedTree />}
        </DraggableArea>
      </div>
    </div>
  );
}
