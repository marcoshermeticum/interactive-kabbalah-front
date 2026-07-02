'use client';

import { useState, useCallback } from 'react';

type Positions = Record<string, { x: number; y: number }>;

interface PathDef {
  from: string;
  to: string;
  number: number;
  letter: string;
  sign: string;
  arcane: string;
  meaning: string;
  color: string;
}

const paths: PathDef[] = [
  { from: 'kether', to: 'chokmah', number: 11, letter: 'א', sign: '🜁', arcane: '0 - O Louco', meaning: 'Ar / Espírito', color: '#c9b800' },
  { from: 'kether', to: 'binah', number: 12, letter: 'ב', sign: '☿', arcane: 'I - O Mago', meaning: 'Mercúrio', color: '#c9b800' },
  { from: 'kether', to: 'tiferet', number: 13, letter: 'ג', sign: '☽', arcane: 'II - A Sacerdotisa', meaning: 'Lua', color: '#3b82c4' },
  { from: 'chokmah', to: 'binah', number: 14, letter: 'ד', sign: '♀', arcane: 'III - A Imperatriz', meaning: 'Vênus', color: '#1d7a3f' },
  { from: 'chokmah', to: 'tiferet', number: 15, letter: 'ה', sign: '♈', arcane: 'IV - O Imperador', meaning: 'Áries', color: '#b52a1c' },
  { from: 'chokmah', to: 'chesed', number: 16, letter: 'ו', sign: '♉', arcane: 'V - O Hierofante', meaning: 'Touro', color: '#cc7a00' },
  { from: 'binah', to: 'tiferet', number: 17, letter: 'ז', sign: '♊', arcane: 'VI - Os Amantes', meaning: 'Gêmeos', color: '#cc7a00' },
  { from: 'binah', to: 'gevurah', number: 18, letter: 'ח', sign: '♋', arcane: 'VII - O Carro', meaning: 'Câncer', color: '#cc7a00' },
  { from: 'gevurah', to: 'chesed', number: 19, letter: 'ט', sign: '♌', arcane: 'VIII - A Força', meaning: 'Leão', color: '#c9b800' },
  { from: 'chesed', to: 'tiferet', number: 20, letter: 'י', sign: '♍', arcane: 'IX - O Eremita', meaning: 'Virgem', color: '#1d7a3f' },
  { from: 'chesed', to: 'netzach', number: 21, letter: 'כ', sign: '♃', arcane: 'X - A Roda', meaning: 'Júpiter', color: '#6b2d8b' },
  { from: 'gevurah', to: 'tiferet', number: 22, letter: 'ל', sign: '♎', arcane: 'XI - A Justiça', meaning: 'Libra', color: '#1d7a3f' },
  { from: 'gevurah', to: 'hod', number: 23, letter: 'מ', sign: '🜄', arcane: 'XII - O Enforcado', meaning: 'Água', color: '#2471a3' },
  { from: 'tiferet', to: 'netzach', number: 24, letter: 'נ', sign: '♏', arcane: 'XIII - A Morte', meaning: 'Escorpião', color: '#1a6b35' },
  { from: 'tiferet', to: 'yesod', number: 25, letter: 'ס', sign: '♐', arcane: 'XIV - Temperança', meaning: 'Sagitário', color: '#2471a3' },
  { from: 'tiferet', to: 'hod', number: 26, letter: 'ע', sign: '♑', arcane: 'XV - O Diabo', meaning: 'Capricórnio', color: '#6b2d8b' },
  { from: 'hod', to: 'netzach', number: 27, letter: 'פ', sign: '♂', arcane: 'XVI - A Torre', meaning: 'Marte', color: '#b52a1c' },
  { from: 'netzach', to: 'yesod', number: 28, letter: 'צ', sign: '♒', arcane: 'XVII - A Estrela', meaning: 'Aquário', color: '#6b2d8b' },
  { from: 'netzach', to: 'malkuth', number: 29, letter: 'ק', sign: '♓', arcane: 'XVIII - A Lua', meaning: 'Peixes', color: '#cc7a00' },
  { from: 'hod', to: 'yesod', number: 30, letter: 'ר', sign: '☉', arcane: 'XIX - O Sol', meaning: 'Sol', color: '#cc7a00' },
  { from: 'hod', to: 'malkuth', number: 31, letter: 'ש', sign: '🜂', arcane: 'XX - O Julgamento', meaning: 'Fogo', color: '#b52a1c' },
  { from: 'yesod', to: 'malkuth', number: 32, letter: 'ת', sign: '♄', arcane: 'XXI - O Mundo', meaning: 'Saturno', color: '#2471a3' },
];

const centralPaths = new Set([13, 25, 32]);

interface Props {
  positions: Positions;
  width: number;
  height: number;
}

export default function TreePaths({ positions, width, height }: Props) {
  const [hoveredPath, setHoveredPath] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e: React.MouseEvent, num: number) => {
    setHoveredPath(num);
    setTooltipPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }, []);

  const renderBar = (path: PathDef) => {
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

    const isHovered = hoveredPath === path.number;

    return (
      <g key={`bar-${path.number}`}>
        <rect
          x={midX - actualLength / 2}
          y={midY - barHeight / 2 - 1}
          width={actualLength}
          height={barHeight + 2}
          rx={5}
          fill="rgba(0,0,0,0.5)"
          transform={`rotate(${angle}, ${midX}, ${midY})`}
        />
        <rect
          x={midX - actualLength / 2}
          y={midY - barHeight / 2}
          width={actualLength}
          height={barHeight}
          rx={4}
          fill={path.color}
          opacity={isHovered ? 1 : 0.9}
          transform={`rotate(${angle}, ${midX}, ${midY})`}
        />
      </g>
    );
  };

  const renderTexts = (path: PathDef) => {
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
      { text: path.arcane.split(' - ')[0], size: 11, bold: true },
    ];

    if (isVertical) {
      // Vertical: stack items top-to-bottom, each character stays horizontal
      const totalSpan = actualLength * 0.8;
      const step = totalSpan / (items.length - 1);
      const startY = -totalSpan / 2;

      return (
        <g
          key={`txt-${path.number}`}
          className="cursor-pointer"
          onMouseEnter={(e) => handleMouse(e, path.number)}
          onMouseMove={(e) => setTooltipPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
          onMouseLeave={() => setHoveredPath(null)}
        >
          {items.map((item, i) => (
            <text
              key={i}
              x={midX}
              y={midY + startY + step * i}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize={item.size}
              fontWeight={item.bold ? 'bold' : 'normal'}
              fontFamily="Arial, sans-serif"
            >
              {item.text}
            </text>
          ))}
        </g>
      );
    } else {
      // Non-vertical: text along the bar, flipped if needed to read left→right
      const textAngle = needsFlip ? angle + 180 : angle;
      const spacing = actualLength * 0.25;
      const positions_x = [-spacing * 1.4, -spacing * 0.45, spacing * 0.45, spacing * 1.4];

      return (
        <g
          key={`txt-${path.number}`}
          transform={`translate(${midX}, ${midY}) rotate(${textAngle})`}
          className="cursor-pointer"
          onMouseEnter={(e) => handleMouse(e, path.number)}
          onMouseMove={(e) => setTooltipPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
          onMouseLeave={() => setHoveredPath(null)}
        >
          {items.map((item, i) => (
            <text
              key={i}
              x={positions_x[i]}
              y={0}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize={item.size}
              fontWeight={item.bold ? 'bold' : 'normal'}
              fontFamily="Arial, sans-serif"
            >
              {item.text}
            </text>
          ))}
        </g>
      );
    }
  };

  const bgPaths = paths.filter(p => centralPaths.has(p.number));
  const fgPaths = paths.filter(p => !centralPaths.has(p.number));

  return (
    <div className="absolute inset-0" style={{ width, height }}>
      {/* Background bars (central pillar) — behind sephirots */}
      <svg className="absolute inset-0 pointer-events-none" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 0 }}>
        {bgPaths.map(renderBar)}
      </svg>

      {/* Foreground bars */}
      <svg className="absolute inset-0 pointer-events-none" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 2 }}>
        {fgPaths.map(renderBar)}
      </svg>

      {/* Text layer — visible on top, but no pointer events (tooltip handled by hit areas below) */}
      <svg className="absolute inset-0 pointer-events-none" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 20 }}>
        {paths.map(renderTexts)}
      </svg>

      {/* Invisible hit areas for tooltip — between bars and sephirots */}
      <svg className="absolute inset-0" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 5 }}>
        {paths.map((path) => {
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
          return (
            <rect
              key={`hit-${path.number}`}
              x={midX - actualLength / 2}
              y={midY - 16}
              width={actualLength}
              height={32}
              rx={4}
              fill="transparent"
              transform={`rotate(${angle}, ${midX}, ${midY})`}
              className="cursor-pointer"
              onMouseEnter={(e) => handleMouse(e, path.number)}
              onMouseMove={(e) => setTooltipPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
              onMouseLeave={() => setHoveredPath(null)}
            />
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredPath !== null && (
        <div
          className="absolute z-[200] pointer-events-none"
          style={{ left: tooltipPos.x + 20, top: tooltipPos.y - 20 }}
        >
          <div className="bg-gray-900/95 backdrop-blur text-white text-xs rounded-lg px-4 py-3 shadow-2xl border border-white/20 whitespace-nowrap">
            {(() => {
              const p = paths.find(pp => pp.number === hoveredPath);
              if (!p) return null;
              return (
                <>
                  <p className="font-bold text-sm mb-1">Caminho {p.number}</p>
                  <p className="text-lg mb-1">{p.letter} — {p.sign}</p>
                  <p className="text-yellow-200">🃏 {p.arcane}</p>
                  <p className="text-white/70 mt-1">{p.meaning}</p>
                  <p className="text-white/50 mt-1 text-[10px]">{p.from} → {p.to}</p>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
