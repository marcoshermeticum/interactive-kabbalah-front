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
    <div
      className="relative mx-auto overflow-hidden"
      style={{
        width: TREE_WIDTH,
        height: TREE_HEIGHT,
        background: 'radial-gradient(circle at 50% 22%, rgba(250,245,228,0.97) 0%, rgba(245,236,214,0.96) 28%, rgba(235,224,202,0.94) 100%)',
        borderRadius: 28,
        border: '3px solid rgba(62,50,36,0.8)',
        boxShadow: 'inset 0 0 0 2px rgba(212,175,55,0.18), 0 18px 48px rgba(31,24,19,0.08)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.36), rgba(255,255,255,0) 24%, rgba(92,69,43,0.06) 100%)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        className="absolute inset-[10px] rounded-[18px] pointer-events-none"
        style={{
          border: '1px solid rgba(102,84,61,0.26)',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.25), inset 0 18px 30px rgba(255,255,255,0.18)',
          background: 'radial-gradient(circle at 50% 18%, rgba(255,255,255,0.22), transparent 32%)',
        }}
      />

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
