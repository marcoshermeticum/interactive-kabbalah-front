'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';

type Positions = Record<string, { x: number; y: number }>;

interface PathDef {
  from: string;
  to: string;
  number: number;
  letter: string;
  letterName: string;
  sign: string;
  arcane: string;
  meaning: string;
  color: string;
  virtue: string;
  vice: string;
}

const paths: PathDef[] = [
  { from: 'kether', to: 'chokmah', number: 11, letter: 'א', letterName: 'Aleph', sign: '🜁', arcane: '0 - O Louco', meaning: 'Ar / Espírito', color: '#c9b800', virtue: 'Liberdade, fé no desconhecido', vice: 'Imprudência, irresponsabilidade' },
  { from: 'kether', to: 'binah', number: 12, letter: 'ב', letterName: 'Beth', sign: '☿', arcane: 'I - O Mago', meaning: 'Mercúrio', color: '#c9b800', virtue: 'Poder de vontade, habilidade', vice: 'Manipulação, charlatanismo' },
  { from: 'kether', to: 'tiferet', number: 13, letter: 'ג', letterName: 'Gimel', sign: '☽', arcane: 'II - A Sacerdotisa', meaning: 'Lua', color: '#3b82c4', virtue: 'Intuição, sabedoria interior', vice: 'Segredos, passividade excessiva' },
  { from: 'chokmah', to: 'binah', number: 14, letter: 'ד', letterName: 'Daleth', sign: '♀', arcane: 'III - A Imperatriz', meaning: 'Vênus', color: '#1d7a3f', virtue: 'Fertilidade, abundância, amor', vice: 'Vaidade, possessividade' },
  { from: 'chokmah', to: 'tiferet', number: 15, letter: 'ה', letterName: 'Heh', sign: '♈', arcane: 'IV - O Imperador', meaning: 'Áries', color: '#b52a1c', virtue: 'Autoridade, estrutura, liderança', vice: 'Tirania, rigidez' },
  { from: 'chokmah', to: 'chesed', number: 16, letter: 'ו', letterName: 'Vav', sign: '♉', arcane: 'V - O Hierofante', meaning: 'Touro', color: '#cc7a00', virtue: 'Ensinamento, tradição sagrada', vice: 'Dogmatismo, ortodoxia cega' },
  { from: 'binah', to: 'tiferet', number: 17, letter: 'ז', letterName: 'Zayin', sign: '♊', arcane: 'VI - Os Amantes', meaning: 'Gêmeos', color: '#cc7a00', virtue: 'Escolha consciente, união', vice: 'Indecisão, infidelidade' },
  { from: 'binah', to: 'gevurah', number: 18, letter: 'ח', letterName: 'Cheth', sign: '♋', arcane: 'VII - O Carro', meaning: 'Câncer', color: '#cc7a00', virtue: 'Triunfo pela disciplina', vice: 'Agressividade, conquista brutal' },
  { from: 'gevurah', to: 'chesed', number: 19, letter: 'ט', letterName: 'Teth', sign: '♌', arcane: 'VIII - A Força', meaning: 'Leão', color: '#c9b800', virtue: 'Coragem, domínio compassivo', vice: 'Crueldade, dominação' },
  { from: 'chesed', to: 'tiferet', number: 20, letter: 'י', letterName: 'Yod', sign: '♍', arcane: 'IX - O Eremita', meaning: 'Virgem', color: '#1d7a3f', virtue: 'Sabedoria solitária, guia interior', vice: 'Isolamento, misantropia' },
  { from: 'chesed', to: 'netzach', number: 21, letter: 'כ', letterName: 'Kaph', sign: '♃', arcane: 'X - A Roda', meaning: 'Júpiter', color: '#6b2d8b', virtue: 'Adaptação aos ciclos, sorte', vice: 'Passividade ante o destino' },
  { from: 'gevurah', to: 'tiferet', number: 22, letter: 'ל', letterName: 'Lamed', sign: '♎', arcane: 'XI - A Justiça', meaning: 'Libra', color: '#1d7a3f', virtue: 'Equilíbrio, verdade, equidade', vice: 'Julgamento severo, frieza' },
  { from: 'gevurah', to: 'hod', number: 23, letter: 'מ', letterName: 'Mem', sign: '🜄', arcane: 'XII - O Enforcado', meaning: 'Água', color: '#2471a3', virtue: 'Sacrifício, nova perspectiva', vice: 'Martírio, estagnação' },
  { from: 'tiferet', to: 'netzach', number: 24, letter: 'נ', letterName: 'Nun', sign: '♏', arcane: 'XIII - A Morte', meaning: 'Escorpião', color: '#1a6b35', virtue: 'Transformação, renovação', vice: 'Apego, medo da mudança' },
  { from: 'tiferet', to: 'yesod', number: 25, letter: 'ס', letterName: 'Samekh', sign: '♐', arcane: 'XIV - Temperança', meaning: 'Sagitário', color: '#2471a3', virtue: 'Equilíbrio, paciência, alquimia', vice: 'Extremismo, impaciência' },
  { from: 'tiferet', to: 'hod', number: 26, letter: 'ע', letterName: 'Ayin', sign: '♑', arcane: 'XV - O Diabo', meaning: 'Capricórnio', color: '#6b2d8b', virtue: 'Humor, libertação das ilusões', vice: 'Escravidão, materialismo' },
  { from: 'hod', to: 'netzach', number: 27, letter: 'פ', letterName: 'Peh', sign: '♂', arcane: 'XVI - A Torre', meaning: 'Marte', color: '#b52a1c', virtue: 'Destruição do falso, despertar', vice: 'Catástrofe, arrogância' },
  { from: 'netzach', to: 'yesod', number: 28, letter: 'צ', letterName: 'Tzaddi', sign: '♒', arcane: 'XVII - A Estrela', meaning: 'Aquário', color: '#6b2d8b', virtue: 'Esperança, inspiração divina', vice: 'Desconexão, idealismo vão' },
  { from: 'netzach', to: 'malkuth', number: 29, letter: 'ק', letterName: 'Qoph', sign: '♓', arcane: 'XVIII - A Lua', meaning: 'Peixes', color: '#cc7a00', virtue: 'Intuição, enfrentar a sombra', vice: 'Ilusão, medo, confusão' },
  { from: 'hod', to: 'yesod', number: 30, letter: 'ר', letterName: 'Resh', sign: '☉', arcane: 'XIX - O Sol', meaning: 'Sol', color: '#cc7a00', virtue: 'Alegria, vitalidade, clareza', vice: 'Vaidade, excesso de confiança' },
  { from: 'hod', to: 'malkuth', number: 31, letter: 'ש', letterName: 'Shin', sign: '🜂', arcane: 'XX - O Julgamento', meaning: 'Fogo', color: '#b52a1c', virtue: 'Renascimento, absolvição', vice: 'Autopunição, culpa' },
  { from: 'yesod', to: 'malkuth', number: 32, letter: 'ת', letterName: 'Tav', sign: '♄', arcane: 'XXI - O Mundo', meaning: 'Saturno', color: '#2471a3', virtue: 'Integração, completude', vice: 'Inércia, resistência à conclusão' },
];

const centralPaths = new Set([13, 25, 32]);

interface Props {
  positions: Positions;
  width: number;
  height: number;
}

export default function TreePaths({ positions, width, height }: Props) {
  const [hoveredPath, setHoveredPath] = useState<number | null>(null);
  const [pinnedPath, setPinnedPath] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const ui = useTranslations('ui');
  const pathsT = useTranslations('paths');

  const activePath = pinnedPath ?? hoveredPath;

  const handleMouse = useCallback((e: React.MouseEvent, num: number) => {
    if (pinnedPath !== null) return;
    setHoveredPath(num);
    setTooltipPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }, [pinnedPath]);

  const handleClick = useCallback((e: React.MouseEvent, num: number) => {
    if (pinnedPath === num) {
      setPinnedPath(null);
    } else {
      setPinnedPath(num);
      setTooltipPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }
  }, [pinnedPath]);

  const handleCopy = async () => {
    const p = paths.find(pp => pp.number === activePath);
    if (!p) return;
    const arcaneText = pathsT(`${p.number}.arcane`);
    const meaningText = pathsT(`${p.number}.meaning`);
    const text = `${ui('path')} ${p.number} — ${p.letter} (${p.letterName}) — ${p.sign} (${meaningText})\n${arcaneText}\n${p.from} → ${p.to}\n${ui('virtue')}: ${p.virtue}\n${ui('vice')}: ${p.vice}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Close pinned tooltip on Escape
  useEffect(() => {
    if (!pinnedPath) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPinnedPath(null);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [pinnedPath]);

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

    const barHeight = 32;
    const nodeRadius = 72;
    const actualLength = length - nodeRadius * 2;
    if (actualLength <= 10) return null;

    const isHovered = hoveredPath === path.number;

    return (
      <g key={`bar-${path.number}`}>
        {/* Outer shadow/border — gives the "armored" depth */}
        <rect
          x={midX - actualLength / 2 - 2}
          y={midY - barHeight / 2 - 3}
          width={actualLength + 4}
          height={barHeight + 6}
          rx={6}
          fill="rgba(0,0,0,0.6)"
          transform={`rotate(${angle}, ${midX}, ${midY})`}
        />
        {/* Outer border ring */}
        <rect
          x={midX - actualLength / 2 - 1}
          y={midY - barHeight / 2 - 2}
          width={actualLength + 2}
          height={barHeight + 4}
          rx={5}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.5"
          transform={`rotate(${angle}, ${midX}, ${midY})`}
        />
        {/* Main colored bar */}
        <rect
          x={midX - actualLength / 2}
          y={midY - barHeight / 2}
          width={actualLength}
          height={barHeight}
          rx={4}
          fill={path.color}
          opacity={isHovered ? 1 : 0.92}
          transform={`rotate(${angle}, ${midX}, ${midY})`}
        />
        {/* Inner highlight — top edge gleam */}
        <rect
          x={midX - actualLength / 2 + 3}
          y={midY - barHeight / 2 + 2}
          width={actualLength - 6}
          height={4}
          rx={2}
          fill="rgba(255,255,255,0.15)"
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
      { text: String(path.number), size: 15, bold: true },
      { text: path.letter, size: 18, bold: true },
      { text: path.sign, size: 16, bold: false },
      { text: path.arcane.split(' - ')[0], size: 13, bold: true },
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
      <svg className="absolute inset-0 pointer-events-none" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 12 }}>
        {paths.map(renderTexts)}
      </svg>

      {/* Invisible hit areas for tooltip */}
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
              onMouseMove={(e) => { if (!pinnedPath) setTooltipPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }); }}
              onMouseLeave={() => { if (!pinnedPath) setHoveredPath(null); }}
              onClick={(e) => handleClick(e, path.number)}
            />
          );
        })}
      </svg>

      {/* Tooltip */}
      {activePath !== null && (
        <div
          className={`absolute z-[500] ${pinnedPath ? '' : 'pointer-events-none'}`}
          style={{ left: tooltipPos.x + 20, top: tooltipPos.y - 20 }}
          onMouseEnter={() => { /* keep visible */ }}
          onMouseLeave={() => { if (!pinnedPath) setHoveredPath(null); }}
        >
          <div className={`bg-gray-900/95 backdrop-blur text-white text-xs rounded-lg px-4 py-3 shadow-2xl border ${pinnedPath ? 'border-yellow-400/50' : 'border-white/20'} whitespace-nowrap select-text max-w-[320px]`}>
            {(() => {
              const p = paths.find(pp => pp.number === activePath);
              if (!p) return null;
              const arcaneText = pathsT(`${p.number}.arcane`);
              const meaningText = pathsT(`${p.number}.meaning`);
              return (
                <>
                  <p className="font-bold text-sm">{ui('path')} {p.number} — {p.letter} ({p.letterName}) — {p.sign} ({meaningText})</p>
                  <p className="text-yellow-200 mt-1">🃏 {arcaneText}</p>
                  <p className="text-white/60 mt-1">{p.from} → {p.to}</p>
                  <div className="mt-2 pt-1 border-t border-white/10">
                    <p className="text-green-300">✦ {ui('virtue')}: {p.virtue}</p>
                    <p className="text-red-300">✧ {ui('vice')}: {p.vice}</p>
                  </div>
                  {pinnedPath && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                      <button onClick={handleCopy} className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition">
                        {copied ? `✓ ${ui('copied')}` : `📋 ${ui('copy')}`}
                      </button>
                      <button onClick={() => setPinnedPath(null)} className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition">
                        ✕ {ui('close')}
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
          {!pinnedPath && (
            <p className="text-center text-[9px] text-white/40 mt-1">{ui('clickToPin')}</p>
          )}
        </div>
      )}
    </div>
  );
}
