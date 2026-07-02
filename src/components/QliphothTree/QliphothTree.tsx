'use client';

import Sephirot from '@/components/Sephirot/Sephirot';
import { qliphoth } from '@/data/qliphoth';
import { qliphothPaths } from '@/data/qliphothPaths';
import QliphothPaths from './QliphothPaths';

// Same geometry as Tree of Life
export const positions: Record<string, { x: number; y: number }> = {
  thaumiel:       { x: 400, y: 100 },
  satariel:       { x: 110, y: 310 },
  ghogiel:        { x: 690, y: 310 },
  daath_qliphoth: { x: 400, y: 470 },
  golohab:        { x: 110, y: 620 },
  ghagsheblah:    { x: 690, y: 620 },
  tagimron:       { x: 400, y: 790 },
  samael:         { x: 110, y: 970 },
  gharab:         { x: 690, y: 970 },
  gamaliel:       { x: 400, y: 1150 },
  nahemoth:       { x: 400, y: 1430 },
};

const TREE_WIDTH = 800;
const TREE_HEIGHT = 1540;
const NODE_SIZE = 170;

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
