'use client';

import KabbalahTree from '@/components/KabbalahTree/KabbalahTree';
import Sephirot from '@/components/Sephirot/Sephirot';
import { qliphoth } from '@/data/qliphoth';
import { qliphothPaths } from '@/data/qliphothPaths';
import QliphothPaths from '@/components/QliphothTree/QliphothPaths';

/**
 * Combined view: Tree of Life on top, Tree of Death below inverted.
 * Malkuth (Life bottom) → Nahemoth (Death 10) at top of inverted tree.
 * Thaumiel (Death 1) at the very bottom.
 */

// Inverted positions: Nahemoth at top, Thaumiel at bottom
const TREE_WIDTH = 800;
const TREE_HEIGHT = 1540;
const NODE_SIZE = 170;

const invertedPositions: Record<string, { x: number; y: number }> = {
  nahemoth:       { x: 400, y: 100 },   // was bottom, now top
  gamaliel:       { x: 400, y: 380 },
  samael:         { x: 110, y: 560 },
  gharab:         { x: 690, y: 560 },
  tagimron:       { x: 400, y: 740 },
  golohab:        { x: 110, y: 910 },
  ghagsheblah:    { x: 690, y: 910 },
  daath_qliphoth: { x: 400, y: 1060 },
  satariel:       { x: 110, y: 1220 },
  ghogiel:        { x: 690, y: 1220 },
  thaumiel:       { x: 400, y: 1430 },   // was top, now bottom
};

export default function CombinedTree() {
  return (
    <div className="flex flex-col items-center">
      {/* Tree of Life — normal */}
      <div className="relative">
        <KabbalahTree />
      </div>

      {/* Connector */}
      <div className="w-[4px] h-[40px] bg-gradient-to-b from-[#795548] to-[#660000] opacity-70" />

      {/* Tree of Death — inverted (Nahemoth at top, Thaumiel at bottom) */}
      <div className="relative mx-auto" style={{ width: TREE_WIDTH, height: TREE_HEIGHT }}>
        <QliphothPaths positions={invertedPositions} width={TREE_WIDTH} height={TREE_HEIGHT} paths={qliphothPaths} />

        {Object.entries(invertedPositions).map(([id, pos]) => {
          const data = qliphoth[id];
          if (!data) return null;
          return (
            <div
              key={id}
              className="absolute z-[15]"
              style={{
                left: pos.x - NODE_SIZE / 2,
                top: pos.y - NODE_SIZE / 2,
                width: NODE_SIZE,
                height: NODE_SIZE,
              }}
            >
              <Sephirot data={data} size={NODE_SIZE} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
