'use client';

import Sephirot from '@/components/Sephirot/Sephirot';
import { qliphoth } from '@/data/qliphoth';
import { qliphothPaths } from '@/data/qliphothPaths';
import { qliphothTreeLayout } from '@/data/tree-layout';
import QliphothPaths from './QliphothPaths';

// Use centralized layout config
export const positions = qliphothTreeLayout.positions;

const TREE_WIDTH = qliphothTreeLayout.width;
const TREE_HEIGHT = qliphothTreeLayout.height;
const NODE_SIZE = qliphothTreeLayout.nodeSize;

export default function QliphothTree() {
  return (
    <div className="relative mx-auto" style={{ width: TREE_WIDTH, height: TREE_HEIGHT }}>
      <QliphothPaths positions={positions} width={TREE_WIDTH} height={TREE_HEIGHT} paths={qliphothPaths} />

      {Object.entries(positions).map(([id, pos]) => {
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
  );
}
