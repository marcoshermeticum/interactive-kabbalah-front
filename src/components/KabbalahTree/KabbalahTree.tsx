'use client';

import Sephirot from '@/components/Sephirot/Sephirot';
import { useTranslations } from 'next-intl';
import { sephirots } from '@/data/sephirots';
import { kabbalahTreeLayout } from '@/data/tree-layout';
import TreePaths from './TreePaths';
import TreeOrnaments from './TreeOrnaments';

// Use centralized layout config
export const positions = kabbalahTreeLayout.positions;

const TREE_WIDTH = kabbalahTreeLayout.width;
const TREE_HEIGHT = kabbalahTreeLayout.height;
const NODE_SIZE = kabbalahTreeLayout.nodeSize;

function TranslatedSephirot({ id }: { id: string }) {
  const data = sephirots[id];
  const t = useTranslations(id);

  let translated;
  try {
    translated = {
      name: t('sephirot.name'),
      valor: t('sephirot.valor'),
      regent: {
        title: t('regent.title'),
        name: t('regent.name'),
        defect: t('regent.defect'),
      },
      world: data.world ? {
        title: t('world.title'),
        aspect: t('world.aspect'),
      } : undefined,
    };
  } catch {
    translated = undefined;
  }

  return <Sephirot data={data} size={NODE_SIZE} translated={translated} />;
}

export default function KabbalahTree({ showVeils = true, showPillars = true }: { showVeils?: boolean; showPillars?: boolean }) {
  return (
    <div className="relative mx-auto" style={{ width: TREE_WIDTH, height: TREE_HEIGHT }}>
      {/* Ornamental frame: veils, pillars, labels — with interactive tooltips */}
      <TreeOrnaments width={TREE_WIDTH} height={TREE_HEIGHT} showVeils={showVeils} showPillars={showPillars} />

      {/* Connection paths (drawn behind) */}
      <TreePaths positions={positions} width={TREE_WIDTH} height={TREE_HEIGHT} />

      {/* Sephirot nodes — single container so tooltips share one stacking context */}
      <div className="absolute inset-0 z-[15]" style={{ pointerEvents: 'none' }}>
        {Object.entries(positions).map(([id, pos]) => (
          <div
            key={id}
            className="absolute"
            data-sephirot-id={id}
            style={{
              left: pos.x - NODE_SIZE / 2,
              top: pos.y - NODE_SIZE / 2,
              width: NODE_SIZE,
              height: NODE_SIZE,
              pointerEvents: 'auto',
            }}
          >
            <TranslatedSephirot id={id} />
          </div>
        ))}
      </div>
    </div>
  );
}
