'use client';

import { useTranslations } from 'next-intl';
import { usePathTooltips } from '@/components/Tooltip/usePathTooltips';
import PathTooltip from '@/components/Tooltip/PathTooltip';
import type { QliphothPathDef } from '@/data/qliphothPaths';

type Positions = Record<string, { x: number; y: number }>;

interface Props {
  positions: Positions;
  width: number;
  height: number;
  paths: QliphothPathDef[];
}

const centralPaths = new Set([13, 25, 32]);

export default function QliphothPaths({ positions, width, height, paths }: Props) {
  const { rootRef, hovered, pinned, copiedPath, getHitProps, unpin, copy } = usePathTooltips();
  const hoveredPath = hovered?.pathNumber ?? null;
  const ui = useTranslations('ui');

  const handleCopy = (pathNumber: number) => {
    const p = paths.find((pp) => pp.number === pathNumber);
    if (!p) return;
    const text = `${ui('tunnel')} ${p.number} — ${p.letter} (${p.letterName}) — ${p.sign}\n${p.tunnel}\n${p.meaning}\n${p.from} → ${p.to}\n${ui('latentVirtue')}: ${p.virtue}\n${ui('shadowVice')}: ${p.vice}`;
    return copy(pathNumber, text);
  };
  const renderBar = (path: QliphothPathDef) => {
    const from = positions[path.from];
    const to = positions[path.to];
    if (!from || !to) return null;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.round(Math.atan2(dy, dx) * (180 / Math.PI) * 1000) / 1000;
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const barHeight = 26;
    const nodeRadius = 72;
    const actualLength = length - nodeRadius * 2;
    if (actualLength <= 10) return null;
    const isHovered = hoveredPath === path.number || pinned.some((t) => t.pathNumber === path.number);
    return (
      <g key={`bar-${path.number}`}>
        <rect x={midX - actualLength / 2 - 2} y={midY - barHeight / 2 - 3} width={actualLength + 4} height={barHeight + 6} rx={6} fill="rgba(0,0,0,0.7)" transform={`rotate(${angle}, ${midX}, ${midY})`} />
        <rect x={midX - actualLength / 2 - 1} y={midY - barHeight / 2 - 2} width={actualLength + 2} height={barHeight + 4} rx={5} fill="none" stroke="rgba(255,100,100,0.12)" strokeWidth="1.5" transform={`rotate(${angle}, ${midX}, ${midY})`} />
        <rect x={midX - actualLength / 2} y={midY - barHeight / 2} width={actualLength} height={barHeight} rx={4} fill={path.color} opacity={isHovered ? 1 : 0.88} transform={`rotate(${angle}, ${midX}, ${midY})`} />
        <rect x={midX - actualLength / 2 + 3} y={midY - barHeight / 2 + 2} width={actualLength - 6} height={3} rx={1.5} fill="rgba(255,255,255,0.08)" transform={`rotate(${angle}, ${midX}, ${midY})`} />
      </g>
    );
  };

  const renderTexts = (path: QliphothPathDef) => {
    const from = positions[path.from];
    const to = positions[path.to];
    if (!from || !to) return null;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.round(Math.atan2(dy, dx) * (180 / Math.PI) * 1000) / 1000;
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const nodeRadius = 72;
    const actualLength = length - nodeRadius * 2;
    if (actualLength <= 10) return null;
    const isVertical = Math.abs(Math.abs(angle) - 90) < 10;
    const needsFlip = angle > 90 || angle < -90;
    const items = [
      { text: String(path.number), size: 13, bold: true },
      { text: path.letter, size: 15, bold: true },
      { text: path.sign, size: 14, bold: false },
      { text: path.tunnel.substring(0, 6), size: 10, bold: false },
    ];
    if (isVertical) {
      const totalSpan = actualLength * 0.8;
      const step = totalSpan / (items.length - 1);
      const startY = -totalSpan / 2;
      return (
        <g key={`txt-${path.number}`}>
          {items.map((item, i) => (
            <text key={i} x={midX} y={midY + startY + step * i} textAnchor="middle" dominantBaseline="central" fill="#ccc" fontSize={item.size} fontWeight={item.bold ? 'bold' : 'normal'} fontFamily="Arial, sans-serif">{item.text}</text>
          ))}
        </g>
      );
    } else {
      const textAngle = needsFlip ? angle + 180 : angle;
      const spacing = actualLength * 0.25;
      const xPositions = [-spacing * 1.4, -spacing * 0.45, spacing * 0.45, spacing * 1.4];
      return (
        <g key={`txt-${path.number}`} transform={`translate(${midX}, ${midY}) rotate(${textAngle})`}>
          {items.map((item, i) => (
            <text key={i} x={xPositions[i]} y={0} textAnchor="middle" dominantBaseline="central" fill="#ccc" fontSize={item.size} fontWeight={item.bold ? 'bold' : 'normal'} fontFamily="Arial, sans-serif">{item.text}</text>
          ))}
        </g>
      );
    }
  };

  const bgPaths = paths.filter(p => centralPaths.has(p.number));
  const fgPaths = paths.filter(p => !centralPaths.has(p.number));

  return (
    <div ref={rootRef} className="absolute inset-0" style={{ width, height }}>
      <svg className="absolute inset-0 pointer-events-none" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 0 }}>{bgPaths.map(renderBar)}</svg>
      <svg className="absolute inset-0 pointer-events-none" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 2 }}>{fgPaths.map(renderBar)}</svg>
      <svg className="absolute inset-0 pointer-events-none" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 12 }}>{paths.map(renderTexts)}</svg>

      {/* Hit areas */}
      <svg className="absolute inset-0" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 5 }}>
        {paths.map((path) => {
          const from = positions[path.from]; const to = positions[path.to];
          if (!from || !to) return null;
          const dx = to.x - from.x; const dy = to.y - from.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.round(Math.atan2(dy, dx) * (180 / Math.PI) * 1000) / 1000;
          const midX = (from.x + to.x) / 2; const midY = (from.y + to.y) / 2;
          const actualLength = length - 144;
          if (actualLength <= 10) return null;
          return (
            <rect
              key={`hit-${path.number}`}
              x={midX - actualLength / 2} y={midY - 16}
              width={actualLength} height={32} rx={4}
              fill="transparent"
              transform={`rotate(${angle}, ${midX}, ${midY})`}
              className="cursor-pointer"
              data-path-number={`tunnel-${path.number}`}
              {...getHitProps(path.number)}
            />
          );
        })}
      </svg>

      {/* Pinned tooltips */}
      {pinned.map((pin) => {
        const p = paths.find((pp) => pp.number === pin.pathNumber);
        if (!p) return null;
        return (
          <PathTooltip key={`pinned-${pin.pathNumber}`} pos={pin.pos} boundsWidth={width} boundsHeight={height} pinned maxWidth={340}>
            <div className="bg-black/95 backdrop-blur text-white text-xs rounded-lg px-4 py-3 shadow-2xl border border-red-500/50 select-text">
              <p className="font-bold text-sm text-red-300">{ui('tunnel')} {p.number} — {p.letter} ({p.letterName}) — {p.sign}</p>
              <p className="text-orange-200 mt-1">🕯️ {p.tunnel}</p>
              <p className="text-white/60 mt-1">{p.meaning}</p>
              <p className="text-white/50 text-[10px] mt-1">{p.from} → {p.to}</p>
              <div className="mt-2 pt-1 border-t border-white/10">
                <p className="text-green-300">✦ {ui('latentVirtue')}: {p.virtue}</p>
                <p className="text-red-300">✧ {ui('shadowVice')}: {p.vice}</p>
              </div>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                <button type="button" onClick={() => handleCopy(pin.pathNumber)} className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition">
                  {copiedPath === pin.pathNumber ? `✓ ${ui('copied')}` : `📋 ${ui('copy')}`}
                </button>
                <button type="button" onClick={() => unpin(pin.pathNumber)} className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition">
                  ✕ {ui('close')}
                </button>
              </div>
            </div>
          </PathTooltip>
        );
      })}

      {/* Hover tooltip — mouse preview only (not shown on touch or when already pinned) */}
      {hovered && !pinned.some((t) => t.pathNumber === hovered.pathNumber) && (() => {
        const p = paths.find((pp) => pp.number === hovered.pathNumber);
        if (!p) return null;
        return (
          <PathTooltip pos={hovered.pos} boundsWidth={width} boundsHeight={height} maxWidth={340}>
            <div className="bg-black/95 backdrop-blur text-white text-xs rounded-lg px-4 py-3 shadow-2xl border border-red-900/30 select-text">
              <p className="font-bold text-sm text-red-300">{ui('tunnel')} {p.number} — {p.letter} ({p.letterName}) — {p.sign}</p>
              <p className="text-orange-200 mt-1">🕯️ {p.tunnel}</p>
              <p className="text-white/60 mt-1">{p.meaning}</p>
              <p className="text-white/50 text-[10px] mt-1">{p.from} → {p.to}</p>
              <div className="mt-2 pt-1 border-t border-white/10">
                <p className="text-green-300">✦ {ui('latentVirtue')}: {p.virtue}</p>
                <p className="text-red-300">✧ {ui('shadowVice')}: {p.vice}</p>
              </div>
            </div>
            <p className="text-center text-[9px] text-white/40 mt-1">{ui('clickToPin')}</p>
          </PathTooltip>
        );
      })()}
    </div>
  );
}