'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
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
  const [hoveredPath, setHoveredPath] = useState<number | null>(null);
  const [pinnedPath, setPinnedPath] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);

  const activePath = pinnedPath ?? hoveredPath;
  const ui = useTranslations('ui');

  const handleMouse = useCallback((e: React.MouseEvent, num: number) => {
    if (pinnedPath !== null) return;
    setHoveredPath(num);
    setTooltipPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }, [pinnedPath]);

  const handleClick = useCallback((e: React.MouseEvent, num: number) => {
    if (pinnedPath === num) { setPinnedPath(null); }
    else { setPinnedPath(num); setTooltipPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }); }
  }, [pinnedPath]);

  const handleCopy = async () => {
    const p = paths.find(pp => pp.number === activePath);
    if (!p) return;
    const text = `${ui('tunnel')} ${p.number} — ${p.letter} (${p.letterName}) — ${p.sign}\n${p.tunnel}\n${p.meaning}\n${p.from} → ${p.to}\n${ui('latentVirtue')}: ${p.virtue}\n${ui('shadowVice')}: ${p.vice}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  useEffect(() => {
    if (!pinnedPath) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setPinnedPath(null); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [pinnedPath]);

  const renderBar = (path: QliphothPathDef) => {
    const from = positions[path.from];
    const to = positions[path.to];
    if (!from || !to) return null;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const barHeight = 24;
    const nodeRadius = 72;
    const actualLength = length - nodeRadius * 2;
    if (actualLength <= 10) return null;
    const isHovered = activePath === path.number;
    return (
      <g key={`bar-${path.number}`}>
        <rect x={midX - actualLength / 2} y={midY - barHeight / 2 - 1} width={actualLength} height={barHeight + 2} rx={5} fill="rgba(0,0,0,0.6)" transform={`rotate(${angle}, ${midX}, ${midY})`} />
        <rect x={midX - actualLength / 2} y={midY - barHeight / 2} width={actualLength} height={barHeight} rx={4} fill={path.color} opacity={isHovered ? 1 : 0.85} transform={`rotate(${angle}, ${midX}, ${midY})`} />
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
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
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
    <div className="absolute inset-0" style={{ width, height }}>
      <svg className="absolute inset-0 pointer-events-none" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 0 }}>{bgPaths.map(renderBar)}</svg>
      <svg className="absolute inset-0 pointer-events-none" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 2 }}>{fgPaths.map(renderBar)}</svg>
      <svg className="absolute inset-0 pointer-events-none" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 12 }}>{paths.map(renderTexts)}</svg>
      <svg className="absolute inset-0" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 5 }}>
        {paths.map((path) => {
          const from = positions[path.from]; const to = positions[path.to];
          if (!from || !to) return null;
          const dx = to.x - from.x; const dy = to.y - from.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const midX = (from.x + to.x) / 2; const midY = (from.y + to.y) / 2;
          const actualLength = length - 144;
          if (actualLength <= 10) return null;
          return (<rect key={`hit-${path.number}`} x={midX - actualLength / 2} y={midY - 16} width={actualLength} height={32} rx={4} fill="transparent" transform={`rotate(${angle}, ${midX}, ${midY})`} className="cursor-pointer" onMouseEnter={(e) => handleMouse(e, path.number)} onMouseMove={(e) => { if (!pinnedPath) setTooltipPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }); }} onMouseLeave={() => { if (!pinnedPath) setHoveredPath(null); }} onClick={(e) => handleClick(e, path.number)} />);
        })}
      </svg>

      {activePath !== null && (
        <div className={`absolute z-[500] ${pinnedPath ? '' : 'pointer-events-none'}`} style={{ left: tooltipPos.x + 20, top: tooltipPos.y - 20 }}>
          <div className={`bg-black/95 backdrop-blur text-white text-xs rounded-lg px-4 py-3 shadow-2xl border ${pinnedPath ? 'border-red-500/50' : 'border-red-900/30'} whitespace-nowrap select-text max-w-[340px]`}>
            {(() => {
              const p = paths.find(pp => pp.number === activePath);
              if (!p) return null;
              return (<>
                <p className="font-bold text-sm text-red-300">{ui('tunnel')} {p.number} — {p.letter} ({p.letterName}) — {p.sign}</p>
                <p className="text-orange-200 mt-1">🕯️ {p.tunnel}</p>
                <p className="text-white/60 mt-1">{p.meaning}</p>
                <p className="text-white/50 text-[10px] mt-1">{p.from} → {p.to}</p>
                <div className="mt-2 pt-1 border-t border-white/10">
                  <p className="text-green-300">✦ {ui('latentVirtue')}: {p.virtue}</p>
                  <p className="text-red-300">✧ {ui('shadowVice')}: {p.vice}</p>
                </div>
                {pinnedPath && (
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                    <button onClick={handleCopy} className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition">{copied ? `✓ ${ui('copied')}` : `📋 ${ui('copy')}`}</button>
                    <button onClick={() => setPinnedPath(null)} className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition">✕ {ui('close')}</button>
                  </div>
                )}
              </>);
            })()}
          </div>
          {!pinnedPath && <p className="text-center text-[9px] text-white/40 mt-1">{ui('clickToPin')}</p>}
        </div>
      )}
    </div>
  );
}
