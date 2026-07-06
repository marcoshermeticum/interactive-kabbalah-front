'use client';

import KabbalahTree from '@/components/KabbalahTree/KabbalahTree';
import Sephirot from '@/components/Sephirot/Sephirot';
import { qliphoth } from '@/data/qliphoth';
import { qliphothPaths } from '@/data/qliphothPaths';
import { qliphothInvertedLayout } from '@/data/tree-layout';
import QliphothPaths from '@/components/QliphothTree/QliphothPaths';

/**
 * Combined view: Tree of Life on top, Tree of Death below inverted.
 * Malkuth (Life bottom) → Nahemoth (Death 10) at top of inverted tree.
 * Thaumiel (Death 1) at the very bottom.
 */

const TREE_WIDTH = qliphothInvertedLayout.width;
const TREE_HEIGHT = qliphothInvertedLayout.height;
const NODE_SIZE = qliphothInvertedLayout.nodeSize;
const invertedPositions = qliphothInvertedLayout.positions;

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
