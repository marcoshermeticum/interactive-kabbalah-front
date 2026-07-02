'use client';

import Sephirot from '@/components/Sephirot/Sephirot';
import { useTranslations } from 'next-intl';
import { sephirots } from '@/data/sephirots';
import TreePaths from './TreePaths';

// Tree coordinate system: 800w x 1600h
// Wider tree, shorter vertical gaps for paths 21/23, more space for Yesod→Malkuth
export const positions: Record<string, { x: number; y: number }> = {
  kether:  { x: 400, y: 100 },
  binah:   { x: 110, y: 310 },
  chokmah: { x: 690, y: 310 },
  daath:   { x: 400, y: 470 },
  gevurah: { x: 110, y: 620 },
  chesed:  { x: 690, y: 620 },
  tiferet: { x: 400, y: 790 },
  hod:     { x: 110, y: 970 },
  netzach: { x: 690, y: 970 },
  yesod:   { x: 400, y: 1150 },
  malkuth: { x: 400, y: 1430 },
};

const TREE_WIDTH = 800;
const TREE_HEIGHT = 1540;
const NODE_SIZE = 170;

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

export default function KabbalahTree() {
  return (
    <div className="relative mx-auto" style={{ width: TREE_WIDTH, height: TREE_HEIGHT }}>
      {/* Connection paths (drawn behind) */}
      <TreePaths positions={positions} width={TREE_WIDTH} height={TREE_HEIGHT} />

      {/* Sephirot nodes — above hit areas (z-5) but below text overlay (z-20) */}
      {Object.entries(positions).map(([id, pos]) => (
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
          <TranslatedSephirot id={id} />
        </div>
      ))}
    </div>
  );
}
