'use client';

import Sephirot from '@/components/Sephirot/Sephirot';
import { useTranslations } from 'next-intl';
import { sephirots } from '@/data/sephirots';
import { kabbalahTreeLayout } from '@/data/tree-layout';
import TreePaths from './TreePaths';

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

// Ornamental elements: Veils, Pillars, Ain Soph labels
function TreeOrnaments({ width, height, showVeils = true, showPillars = true }: { width: number; height: number; showVeils?: boolean; showPillars?: boolean }) {
  const col = '#7c5e3c'; // accent color for ornaments
  
  // Pillar rendering — Ionic/Masonic column with capital, shaft with fluting, and base
  const renderPillar = (x: number, letter: string) => {
    const topY = 260;
    const bottomY = 1560;
    const shaftHeight = bottomY - topY - 100; // minus capital + base heights
    const shaftWidth = 28;
    const capitalWidth = 52;
    const baseWidth = 56;
    
    return (
      <g opacity="0.55">
        {/* === CAPITAL (top) — Ionic style with volutes === */}
        {/* Abacus (top plate) */}
        <rect x={x - capitalWidth / 2} y={topY} width={capitalWidth} height={8} rx={1} fill="none" stroke={col} strokeWidth="1.8" />
        {/* Echinus (curved molding) */}
        <path d={`M ${x - capitalWidth / 2 + 4} ${topY + 8} Q ${x} ${topY + 22} ${x + capitalWidth / 2 - 4} ${topY + 8}`} fill="none" stroke={col} strokeWidth="1.5" />
        {/* Volutes (spirals) — left */}
        <circle cx={x - capitalWidth / 2 + 8} cy={topY + 16} r={6} fill="none" stroke={col} strokeWidth="1.2" />
        <circle cx={x - capitalWidth / 2 + 8} cy={topY + 16} r={3} fill="none" stroke={col} strokeWidth="0.8" />
        {/* Volutes — right */}
        <circle cx={x + capitalWidth / 2 - 8} cy={topY + 16} r={6} fill="none" stroke={col} strokeWidth="1.2" />
        <circle cx={x + capitalWidth / 2 - 8} cy={topY + 16} r={3} fill="none" stroke={col} strokeWidth="0.8" />
        {/* Neck (below capital) */}
        <rect x={x - shaftWidth / 2 - 2} y={topY + 26} width={shaftWidth + 4} height={10} rx={2} fill="none" stroke={col} strokeWidth="1.2" />
        {/* Decorative ring under capital */}
        <line x1={x - shaftWidth / 2 - 4} y1={topY + 38} x2={x + shaftWidth / 2 + 4} y2={topY + 38} stroke={col} strokeWidth="1" />
        <line x1={x - shaftWidth / 2 - 2} y1={topY + 41} x2={x + shaftWidth / 2 + 2} y2={topY + 41} stroke={col} strokeWidth="0.7" />

        {/* === SHAFT — with vertical fluting lines === */}
        <rect x={x - shaftWidth / 2} y={topY + 44} width={shaftWidth} height={shaftHeight} fill="none" stroke={col} strokeWidth="1.8" />
        {/* Fluting — vertical grooves */}
        <line x1={x - 8} y1={topY + 50} x2={x - 8} y2={topY + 44 + shaftHeight - 6} stroke={col} strokeWidth="0.5" opacity="0.5" />
        <line x1={x - 3} y1={topY + 50} x2={x - 3} y2={topY + 44 + shaftHeight - 6} stroke={col} strokeWidth="0.5" opacity="0.5" />
        <line x1={x + 3} y1={topY + 50} x2={x + 3} y2={topY + 44 + shaftHeight - 6} stroke={col} strokeWidth="0.5" opacity="0.5" />
        <line x1={x + 8} y1={topY + 50} x2={x + 8} y2={topY + 44 + shaftHeight - 6} stroke={col} strokeWidth="0.5" opacity="0.5" />
        {/* Entasis — subtle widening at center */}
        <line x1={x - shaftWidth / 2 - 1} y1={topY + 44 + shaftHeight * 0.4} x2={x - shaftWidth / 2 - 1} y2={topY + 44 + shaftHeight * 0.6} stroke={col} strokeWidth="0.6" opacity="0.3" />
        <line x1={x + shaftWidth / 2 + 1} y1={topY + 44 + shaftHeight * 0.4} x2={x + shaftWidth / 2 + 1} y2={topY + 44 + shaftHeight * 0.6} stroke={col} strokeWidth="0.6" opacity="0.3" />

        {/* === BASE — Attic style with torus and plinth === */}
        {/* Ring above base */}
        <line x1={x - shaftWidth / 2 - 4} y1={topY + 44 + shaftHeight + 2} x2={x + shaftWidth / 2 + 4} y2={topY + 44 + shaftHeight + 2} stroke={col} strokeWidth="1" />
        <line x1={x - shaftWidth / 2 - 2} y1={topY + 44 + shaftHeight + 5} x2={x + shaftWidth / 2 + 2} y2={topY + 44 + shaftHeight + 5} stroke={col} strokeWidth="0.7" />
        {/* Torus (rounded molding) */}
        <ellipse cx={x} cy={topY + 44 + shaftHeight + 14} rx={shaftWidth / 2 + 6} ry={8} fill="none" stroke={col} strokeWidth="1.3" />
        {/* Scotia (concave molding) */}
        <path d={`M ${x - shaftWidth / 2 - 4} ${topY + 44 + shaftHeight + 22} Q ${x} ${topY + 44 + shaftHeight + 18} ${x + shaftWidth / 2 + 4} ${topY + 44 + shaftHeight + 22}`} fill="none" stroke={col} strokeWidth="0.8" />
        {/* Plinth (bottom plate) */}
        <rect x={x - baseWidth / 2} y={topY + 44 + shaftHeight + 24} width={baseWidth} height={12} rx={2} fill="none" stroke={col} strokeWidth="1.8" />
        {/* Base decoration line */}
        <rect x={x - baseWidth / 2 + 4} y={topY + 44 + shaftHeight + 28} width={baseWidth - 8} height={4} rx={1} fill="none" stroke={col} strokeWidth="0.6" />

        {/* === LETTER === */}
        <text x={x} y={bottomY + 20} textAnchor="middle" fill={col} fontSize="24" fontFamily="'EB Garamond', Georgia, serif" fontWeight="bold" opacity="0.7">{letter}</text>
      </g>
    );
  };

  return (
    <svg className="absolute inset-0 pointer-events-none" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 1 }}>
      {/* === AIN SOPH AUR — in the top margin above Kether (y=200) === */}
      <text x={width / 2} y={40} textAnchor="middle" fill={col} fontSize="11" opacity="0.5" fontFamily="'EB Garamond', Georgia, serif" letterSpacing="3">
        AIN — NADA — 0
      </text>
      <text x={width / 2} y={60} textAnchor="middle" fill={col} fontSize="11" opacity="0.5" fontFamily="'EB Garamond', Georgia, serif" letterSpacing="2.5">
        AIN SOPH — ILIMITADO — 00
      </text>
      <text x={width / 2} y={80} textAnchor="middle" fill={col} fontSize="11" opacity="0.5" fontFamily="'EB Garamond', Georgia, serif" letterSpacing="2">
        AIN SOPH AUR — LUZ ILIMITADA — 000
      </text>

      {/* Lemniscata (infinity) between Ain Soph and Kether */}
      <text x={width / 2} y={105} textAnchor="middle" fill={col} fontSize="24" opacity="0.45">∞</text>

      {/* === VEILS === */}
      {showVeils && <>
      {/* Veil of the Abyss — between supernal triad and ethical triad */}
      <line x1={60} y1={520} x2={width - 60} y2={520} stroke={col} strokeWidth="1.2" opacity="0.35" strokeDasharray="10 5" />
      <text x={12} y={516} fill={col} fontSize="11" opacity="0.55" fontFamily="'EB Garamond', Georgia, serif" fontStyle="italic">Véu do Abismo</text>

      {/* Veil of Parokhet — between ethical triad and astral triad */}
      <line x1={60} y1={980} x2={width - 60} y2={980} stroke={col} strokeWidth="1.2" opacity="0.35" strokeDasharray="10 5" />
      <text x={12} y={976} fill={col} fontSize="11" opacity="0.55" fontFamily="'EB Garamond', Georgia, serif" fontStyle="italic">Véu de Parokhet</text>

      {/* Veil of Nephesch — between Yesod and Malkuth */}
      <line x1={60} y1={1390} x2={width - 60} y2={1390} stroke={col} strokeWidth="1.2" opacity="0.35" strokeDasharray="10 5" />
      <text x={12} y={1386} fill={col} fontSize="11" opacity="0.55" fontFamily="'EB Garamond', Georgia, serif" fontStyle="italic">Véu de Nephesch</text>
      </>}

      {/* === PILLARS === */}
      {showPillars && <>
      {renderPillar(32, 'B')}
      {renderPillar(width - 32, 'J')}
      </>}

      {/* === SOUL LABELS === */}
      <text x={width / 2} y={120} textAnchor="middle" fill={col} fontSize="10" opacity="0.4" fontFamily="'EB Garamond', Georgia, serif" fontStyle="italic">
        Jechidah
      </text>
      <text x={68} y={370} textAnchor="middle" fill={col} fontSize="10" opacity="0.4" fontFamily="'EB Garamond', Georgia, serif" fontStyle="italic">
        Neschamah
      </text>
      <text x={width - 68} y={370} textAnchor="middle" fill={col} fontSize="10" opacity="0.4" fontFamily="'EB Garamond', Georgia, serif" fontStyle="italic">
        Chiah
      </text>
      <text x={68} y={1440} textAnchor="middle" fill={col} fontSize="10" opacity="0.4" fontFamily="'EB Garamond', Georgia, serif" fontStyle="italic">
        Ruach
      </text>
      <text x={width / 2} y={1610} textAnchor="middle" fill={col} fontSize="10" opacity="0.4" fontFamily="'EB Garamond', Georgia, serif" fontStyle="italic">
        Nephesch
      </text>
    </svg>
  );
}

export default function KabbalahTree({ showVeils = true, showPillars = true }: { showVeils?: boolean; showPillars?: boolean }) {
  return (
    <div className="relative mx-auto" style={{ width: TREE_WIDTH, height: TREE_HEIGHT }}>
      {/* Ornamental frame: veils, pillars, labels */}
      <TreeOrnaments width={TREE_WIDTH} height={TREE_HEIGHT} showVeils={showVeils} showPillars={showPillars} />

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
