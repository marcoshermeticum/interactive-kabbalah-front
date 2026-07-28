'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { tooltipManager } from '@/components/Tooltip/TooltipManager';

interface Props {
  width: number;
  height: number;
  showVeils?: boolean;
  showPillars?: boolean;
}

interface PinnedOrnament {
  id: string;
  pos: { x: number; y: number };
}

export default function TreeOrnaments({ width, height, showVeils = true, showPillars = true }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [pinnedOrnaments, setPinnedOrnaments] = useState<PinnedOrnament[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const deregisterRefs = useRef<Map<string, () => void>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('ornaments');
  const ui = useTranslations('ui');

  const col = '#c9a033';
  const pillarTopY = 130;
  const pillarBottomY = height - 80;
  const pillarW = 52;

  const unpinOrnament = useCallback((id: string) => {
    setPinnedOrnaments((prev) => prev.filter((t) => t.id !== id));
    const dereg = deregisterRefs.current.get(id);
    if (dereg) { dereg(); deregisterRefs.current.delete(id); }
  }, []);

  const getLocalPos = useCallback((e: React.MouseEvent) => {
    const parent = containerRef.current;
    if (!parent) return { x: e.clientX, y: e.clientY };
    const rect = parent.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent, id: string) => {
    setHoveredId(id);
    setHoverPos(getLocalPos(e));
  }, [getLocalPos]);

  const handleClick = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const alreadyPinned = pinnedOrnaments.some((t) => t.id === id);
    if (alreadyPinned) {
      unpinOrnament(id);
    } else {
      const pos = getLocalPos(e);
      setPinnedOrnaments((prev) => [...prev, { id, pos }]);
      const dereg = tooltipManager.register(() => unpinOrnament(id));
      deregisterRefs.current.set(id, dereg);
    }
  }, [pinnedOrnaments, unpinOrnament, getLocalPos]);

  const handleCopy = async (id: string) => {
    let text = '';
    if (id.startsWith('pillar-')) {
      const key = id.replace('pillar-', '') as 'boaz' | 'jachin';
      text = `${t(`pillars.${key}.name`)}\n${t(`pillars.${key}.description`)}`;
    } else if (id.startsWith('veil-')) {
      const key = id.replace('veil-', '') as 'abyss' | 'parokhet' | 'nephesch';
      text = `${t(`veils.${key}.name`)}\n${t(`veils.${key}.description`)}`;
    } else if (id === 'ain' || id === 'ain-soph' || id === 'ain-soph-aur') {
      const key = id === 'ain-soph-aur' ? 'ainSophAur' : id === 'ain-soph' ? 'ainSoph' : 'ain';
      text = `${t(`ainSoph.${key}.name`)} (${t(`ainSoph.${key}.subtitle`)})\n${t(`ainSoph.${key}.description`)}\n\nGolden Dawn: ${t(`ainSoph.${key}.goldenDawn`)}`;
    }
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  useEffect(() => {
    return () => { deregisterRefs.current.forEach((d) => d()); deregisterRefs.current.clear(); };
  }, []);

  const renderTooltipContent = (id: string) => {
    if (id.startsWith('pillar-')) {
      const key = id.replace('pillar-', '') as 'boaz' | 'jachin';
      const icon = key === 'boaz' ? '⚡' : '☀️';
      return (<>
        <p className="font-bold text-sm">{icon} {t(`pillars.${key}.name`)}</p>
        <p className="text-white/60 text-[11px]">{key === 'boaz' ? 'Boaz (בעז)' : 'Jachin (יכין)'} — {t(`pillars.${key}.side`)}</p>
        <p className="mt-1.5 text-white/80 whitespace-normal">{t(`pillars.${key}.description`)}</p>
        <div className="mt-2 pt-1.5 border-t border-white/10 space-y-0.5">
          <p className="text-white/70"><span className="text-white/40 text-[10px]">{ui('planet')}:</span> {t(`pillars.${key}.element`)}</p>
          <p className="text-white/70"><span className="text-white/40 text-[10px]">♀/♂:</span> {t(`pillars.${key}.gender`)}</p>
          <p className="text-white/70"><span className="text-white/40 text-[10px]">⚙:</span> {t(`pillars.${key}.principle`)}</p>
        </div>
      </>);
    } else if (id === 'ain' || id === 'ain-soph' || id === 'ain-soph-aur') {
      const key = id === 'ain-soph-aur' ? 'ainSophAur' : id === 'ain-soph' ? 'ainSoph' : 'ain';
      const icons: Record<string, string> = { ain: '∅', ainSoph: '∞', ainSophAur: '☀' };
      const numbers: Record<string, string> = { ain: '0', ainSoph: '00', ainSophAur: '000' };
      return (<>
        <p className="font-bold text-sm">{icons[key]} {t(`ainSoph.${key}.name`)}</p>
        <p className="text-white/60 text-[11px]">{t(`ainSoph.${key}.subtitle`)} — {numbers[key]}</p>
        <p className="mt-1.5 text-white/80 whitespace-normal">{t(`ainSoph.${key}.description`)}</p>
        <div className="mt-2 pt-1.5 border-t border-white/10">
          <p className="text-amber-300/80 text-[10px] uppercase tracking-wide mb-0.5">✡ Golden Dawn</p>
          <p className="text-white/70 text-[11px] whitespace-normal">{t(`ainSoph.${key}.goldenDawn`)}</p>
        </div>
        <div className="mt-2 pt-1.5 border-t border-white/10 space-y-0.5">
          <p className="text-white/70"><span className="text-white/40 text-[10px]">⚙:</span> {t(`ainSoph.${key}.principle`)}</p>
          <p className="text-white/70"><span className="text-white/40 text-[10px]">↔:</span> {t(`ainSoph.${key}.relation`)}</p>
        </div>
      </>);
    } else {
      const key = id.replace('veil-', '') as 'abyss' | 'parokhet' | 'nephesch';
      const icons: Record<string, string> = { abyss: '🕳️', parokhet: '🪬', nephesch: '🌈' };
      const hebrewNames: Record<string, string> = { abyss: 'Masach (מסך)', parokhet: 'Parokhet (פרכת)', nephesch: 'Qesheth (קשת)' };
      return (<>
        <p className="font-bold text-sm">{icons[key]} {t(`veils.${key}.name`)}</p>
        <p className="text-white/60 text-[11px]">{hebrewNames[key]}</p>
        <p className="mt-1.5 text-white/80 whitespace-normal">{t(`veils.${key}.description`)}</p>
        <div className="mt-2 pt-1.5 border-t border-white/10 space-y-0.5">
          <p className="text-white/70"><span className="text-white/40 text-[10px]">{ui('planet')}:</span> {t(`veils.${key}.element`)}</p>
          <p className="text-white/70"><span className="text-white/40 text-[10px]">🌍:</span> {t(`veils.${key}.world`)}</p>
          <p className="text-white/70"><span className="text-white/40 text-[10px]">🛡:</span> {t(`veils.${key}.guardian`)}</p>
        </div>
      </>);
    }
  };

  // Render a detailed Ionic pillar SVG at given x position
  const renderPillarSVG = (x: number, letter: string) => {
    const capH = 40; // capital height
    const baseH = 40; // base height
    const shaftTop = pillarTopY + capH;
    const shaftBot = pillarBottomY - baseH;
    const sw = pillarW; // shaft width
    const cx = x + sw / 2; // center x
    return (
      <g opacity="0.75" key={`pillar-${letter}`}>
        {/* === CAPITAL — Ionic volutes and abacus === */}
        {/* Abacus (top plate) */}
        <rect x={x - 4} y={pillarTopY} width={sw + 8} height={8} rx={2} fill="none" stroke={col} strokeWidth="1.6" />
        {/* Volute band */}
        <rect x={x} y={pillarTopY + 9} width={sw} height={6} rx={1} fill="none" stroke={col} strokeWidth="1" />
        {/* Left volute */}
        <circle cx={x + 8} cy={pillarTopY + 22} r={7} fill="none" stroke={col} strokeWidth="1.2" />
        <circle cx={x + 8} cy={pillarTopY + 22} r={3} fill="none" stroke={col} strokeWidth="0.7" />
        {/* Right volute */}
        <circle cx={x + sw - 8} cy={pillarTopY + 22} r={7} fill="none" stroke={col} strokeWidth="1.2" />
        <circle cx={x + sw - 8} cy={pillarTopY + 22} r={3} fill="none" stroke={col} strokeWidth="0.7" />
        {/* Echinus curve */}
        <path d={`M ${x + 2} ${pillarTopY + 16} Q ${cx} ${pillarTopY + 30} ${x + sw - 2} ${pillarTopY + 16}`} fill="none" stroke={col} strokeWidth="1" />
        {/* Neck moldings */}
        <line x1={x + 4} y1={pillarTopY + 34} x2={x + sw - 4} y2={pillarTopY + 34} stroke={col} strokeWidth="1" />
        <line x1={x + 6} y1={pillarTopY + 37} x2={x + sw - 6} y2={pillarTopY + 37} stroke={col} strokeWidth="0.6" />

        {/* === SHAFT — with fluting === */}
        <rect x={x + 2} y={shaftTop} width={sw - 4} height={shaftBot - shaftTop} fill="none" stroke={col} strokeWidth="1.5" rx="1" />
        {/* Fluting lines */}
        {[0.2, 0.35, 0.5, 0.65, 0.8].map((f, i) => (
          <line key={i} x1={x + sw * f} y1={shaftTop + 6} x2={x + sw * f} y2={shaftBot - 6} stroke={col} strokeWidth="0.4" opacity="0.4" />
        ))}

        {/* === BASE — Torus, scotia, plinth === */}
        {/* Upper torus */}
        <ellipse cx={cx} cy={shaftBot + 8} rx={sw / 2 + 2} ry={6} fill="none" stroke={col} strokeWidth="1.2" />
        {/* Scotia */}
        <path d={`M ${x - 2} ${shaftBot + 16} Q ${cx} ${shaftBot + 12} ${x + sw + 2} ${shaftBot + 16}`} fill="none" stroke={col} strokeWidth="0.8" />
        {/* Lower torus */}
        <ellipse cx={cx} cy={shaftBot + 22} rx={sw / 2 + 4} ry={5} fill="none" stroke={col} strokeWidth="1" />
        {/* Plinth */}
        <rect x={x - 6} y={shaftBot + 28} width={sw + 12} height={10} rx={2} fill="none" stroke={col} strokeWidth="1.6" />

        {/* Letter */}
        <text x={cx} y={pillarBottomY + 16} textAnchor="middle" fill={col} fontSize="24" fontFamily="'EB Garamond', Georgia, serif" fontWeight="bold" opacity="0.85">{letter}</text>
      </g>
    );
  };

  return (
    <div ref={containerRef} className="absolute inset-0" style={{ width, height }}>
      {/* === SVG decorations === */}
      <svg className="absolute inset-0 pointer-events-none" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 1 }}>
        {/* Ain Soph Aur */}
        <text x={width / 2} y={40} textAnchor="middle" fill={col} fontSize="11" opacity="0.75" fontFamily="'EB Garamond', Georgia, serif" letterSpacing="3">{t('svgLabels.ain')}</text>
        <text x={width / 2} y={60} textAnchor="middle" fill={col} fontSize="11" opacity="0.75" fontFamily="'EB Garamond', Georgia, serif" letterSpacing="2.5">{t('svgLabels.ainSoph')}</text>
        <text x={width / 2} y={80} textAnchor="middle" fill={col} fontSize="11" opacity="0.75" fontFamily="'EB Garamond', Georgia, serif" letterSpacing="2">{t('svgLabels.ainSophAur')}</text>
        <text x={width / 2} y={105} textAnchor="middle" fill={col} fontSize="24" opacity="0.7">∞</text>
        <text x={width / 2} y={120} textAnchor="middle" fill={col} fontSize="10" opacity="0.6" fontFamily="'EB Garamond', Georgia, serif" fontStyle="italic">Jechidah</text>

        {/* Veils */}
        {showVeils && <>
          <line x1={60} y1={520} x2={width - 60} y2={520} stroke={col} strokeWidth="1.2" opacity="0.55" strokeDasharray="10 5" />
          <text x={12} y={516} fill={col} fontSize="11" opacity="0.75" fontFamily="'EB Garamond', Georgia, serif" fontStyle="italic">{t('svgLabels.veilAbyss')}</text>
          <line x1={60} y1={980} x2={width - 60} y2={980} stroke={col} strokeWidth="1.2" opacity="0.55" strokeDasharray="10 5" />
          <text x={12} y={976} fill={col} fontSize="11" opacity="0.75" fontFamily="'EB Garamond', Georgia, serif" fontStyle="italic">{t('svgLabels.veilParokhet')}</text>
          <line x1={60} y1={1390} x2={width - 60} y2={1390} stroke={col} strokeWidth="1.2" opacity="0.55" strokeDasharray="10 5" />
          <text x={12} y={1386} fill={col} fontSize="11" opacity="0.75" fontFamily="'EB Garamond', Georgia, serif" fontStyle="italic">{t('svgLabels.veilNephesch')}</text>
        </>}

        {/* Pillars */}
        {showPillars && <>
          {renderPillarSVG(6, 'B')}
          {renderPillarSVG(width - pillarW - 6, 'J')}
        </>}
      </svg>

      {/* === Interactive hit areas (z-20) === */}
      {showPillars && (<>
        <div className="absolute cursor-pointer z-[20]" style={{ left: 2, top: pillarTopY, width: pillarW + 10, height: pillarBottomY - pillarTopY }} data-tooltip-container data-ornament-id="pillar-boaz"
          onMouseMove={(e) => handleMouseMove(e, 'pillar-boaz')} onMouseLeave={() => setHoveredId(null)} onClick={(e) => handleClick(e, 'pillar-boaz')} />
        <div className="absolute cursor-pointer z-[20]" style={{ left: width - pillarW - 12, top: pillarTopY, width: pillarW + 10, height: pillarBottomY - pillarTopY }} data-tooltip-container data-ornament-id="pillar-jachin"
          onMouseMove={(e) => handleMouseMove(e, 'pillar-jachin')} onMouseLeave={() => setHoveredId(null)} onClick={(e) => handleClick(e, 'pillar-jachin')} />
      </>)}

      {showVeils && (<>
        {/* Full-width veil hit areas — the entire dashed line is interactive */}
        <div className="absolute cursor-pointer z-[20]" style={{ left: 0, top: 520 - 14, width, height: 28 }} data-tooltip-container data-ornament-id="veil-abyss"
          onMouseMove={(e) => handleMouseMove(e, 'veil-abyss')} onMouseLeave={() => setHoveredId(null)} onClick={(e) => handleClick(e, 'veil-abyss')} />
        <div className="absolute cursor-pointer z-[20]" style={{ left: 0, top: 980 - 14, width, height: 28 }} data-tooltip-container data-ornament-id="veil-parokhet"
          onMouseMove={(e) => handleMouseMove(e, 'veil-parokhet')} onMouseLeave={() => setHoveredId(null)} onClick={(e) => handleClick(e, 'veil-parokhet')} />
        <div className="absolute cursor-pointer z-[20]" style={{ left: 0, top: 1390 - 14, width, height: 28 }} data-tooltip-container data-ornament-id="veil-nephesch"
          onMouseMove={(e) => handleMouseMove(e, 'veil-nephesch')} onMouseLeave={() => setHoveredId(null)} onClick={(e) => handleClick(e, 'veil-nephesch')} />
      </>)}

      {/* Ain Soph Aur hit areas — the three negative existence labels at the top */}
      <div className="absolute cursor-pointer z-[20]" style={{ left: width / 2 - 120, top: 28, width: 240, height: 18 }} data-tooltip-container data-ornament-id="ain"
        onMouseMove={(e) => handleMouseMove(e, 'ain')} onMouseLeave={() => setHoveredId(null)} onClick={(e) => handleClick(e, 'ain')} />
      <div className="absolute cursor-pointer z-[20]" style={{ left: width / 2 - 140, top: 48, width: 280, height: 18 }} data-tooltip-container data-ornament-id="ain-soph"
        onMouseMove={(e) => handleMouseMove(e, 'ain-soph')} onMouseLeave={() => setHoveredId(null)} onClick={(e) => handleClick(e, 'ain-soph')} />
      <div className="absolute cursor-pointer z-[20]" style={{ left: width / 2 - 160, top: 68, width: 320, height: 18 }} data-tooltip-container data-ornament-id="ain-soph-aur"
        onMouseMove={(e) => handleMouseMove(e, 'ain-soph-aur')} onMouseLeave={() => setHoveredId(null)} onClick={(e) => handleClick(e, 'ain-soph-aur')} />

      {/* Pinned tooltips */}
      {pinnedOrnaments.map((pinned) => (
        <div key={pinned.id} className="absolute z-[500]" data-pinned-tooltip style={{ left: Math.max(10, Math.min(pinned.pos.x + 15, width - 300)), top: Math.max(10, pinned.pos.y - 40) }}>
          <div className="bg-gray-900/95 backdrop-blur text-white text-xs rounded-lg px-4 py-3 shadow-2xl border border-yellow-400/50 select-text w-[270px]">
            {renderTooltipContent(pinned.id)}
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
              <button onClick={() => handleCopy(pinned.id)} className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition">{copiedId === pinned.id ? `✓ ${ui('copied')}` : `📋 ${ui('copy')}`}</button>
              <button onClick={() => unpinOrnament(pinned.id)} className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition">✕ {ui('close')}</button>
            </div>
          </div>
        </div>
      ))}

      {/* Hover tooltip — follows cursor */}
      {hoveredId && !pinnedOrnaments.some((t) => t.id === hoveredId) && (
        <div className="absolute z-[490] pointer-events-none" style={{ left: Math.max(10, Math.min(hoverPos.x + 15, width - 300)), top: Math.max(10, hoverPos.y - 40) }}>
          <div className="bg-gray-900/95 backdrop-blur text-white text-xs rounded-lg px-4 py-3 shadow-2xl border border-white/10 select-text w-[270px]">
            {renderTooltipContent(hoveredId)}
          </div>
          <p className="text-center text-[9px] text-white/40 mt-1">{ui('clickToPin')}</p>
        </div>
      )}
    </div>
  );
}
