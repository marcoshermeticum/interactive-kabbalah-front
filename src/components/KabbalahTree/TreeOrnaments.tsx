'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
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

const pillarData = {
  boaz: {
    name: 'Pilar da Severidade',
    hebrewName: 'Boaz (בעז)',
    letter: 'B',
    side: 'Esquerda',
    icon: '⚡',
    element: '🜄 Água',
    gender: '♀ Feminino',
    color: 'Preto',
    description: 'O Pilar da Severidade representa a força restritiva, a forma, a disciplina e o rigor divino. É o pilar feminino, passivo e receptivo.',
    sephirots: ['Binah (Entendimento)', 'Gevurah (Força)', 'Hod (Glória)'],
    principle: 'Contração, Forma, Julgamento',
  },
  jachin: {
    name: 'Pilar da Misericórdia',
    hebrewName: 'Jachin (יכין)',
    letter: 'J',
    side: 'Direita',
    icon: '☀️',
    element: '🜂 Fogo',
    gender: '♂ Masculino',
    color: 'Branco',
    description: 'O Pilar da Misericórdia representa a força expansiva, a energia, a compaixão e a graça divina. É o pilar masculino, ativo e projetivo.',
    sephirots: ['Chokmah (Sabedoria)', 'Chesed (Misericórdia)', 'Netzach (Eternidade)'],
    principle: 'Expansão, Força, Graça',
  },
};

const veilData = {
  abyss: {
    name: 'Véu do Abismo', hebrewName: 'Masach (מסך)', icon: '🕳️', element: '🜁 Ar',
    description: 'Separa a Tríade Superna (o Divino Incognoscível) do restante da Árvore. Cruzá-lo exige a dissolução completa do ego.',
    above: ['Kether', 'Chokmah', 'Binah'], below: ['Chesed', 'Gevurah', 'Tiferet', 'Netzach', 'Hod', 'Yesod', 'Malkuth'],
    guardian: 'Choronzon (333)', paths: ['14 (Daleth)', '17 (Zayin)', '13 (Gimel)'], world: 'Fronteira Atziluth → Briah',
  },
  parokhet: {
    name: 'Véu de Parokhet', hebrewName: 'Parokhet (פרכת)', icon: '🪬', element: '🜂 Fogo',
    description: 'O véu do Templo Interior. Separa o Self Superior (alma consciente) do mundo astral. É o portal da iniciação.',
    above: ['Chesed', 'Gevurah', 'Tiferet'], below: ['Netzach', 'Hod', 'Yesod', 'Malkuth'],
    guardian: 'Raphael (Tiferet)', paths: ['24 (Nun)', '25 (Samekh)', '26 (Ayin)'], world: 'Fronteira Briah → Yetzirah',
  },
  nephesch: {
    name: 'Véu de Nephesch', hebrewName: 'Qesheth (קשת)', icon: '🌈', element: '🜃 Terra',
    description: 'O Arco-Íris que separa o mundo astral (inconsciente) do mundo físico. É a fronteira entre sonho e matéria.',
    above: ['Yesod (Fundação)'], below: ['Malkuth (Reino)'],
    guardian: 'Gabriel (Yesod)', paths: ['29 (Qoph)', '30 (Resh)', '31 (Shin)', '32 (Tav)'], world: 'Fronteira Yetzirah → Assiah',
  },
};

const ainSophData = {
  ain: {
    name: 'Ain',
    hebrewName: 'אין (Nada)',
    number: '0',
    icon: '∅',
    description: 'O Nada Absoluto — o estado primordial anterior a qualquer manifestação. Na tradição da Golden Dawn, Ain representa a Negatividade Pura, o Vazio inconcebível que precede até mesmo a potencialidade. Não é o vazio como ausência, mas como a raiz sem raiz de toda existência, além de qualquer atributo ou definição.',
    goldenDawn: 'O primeiro véu da existência negativa. Ain é descrito nos documentos da Golden Dawn como aquilo que transcende completamente a compreensão humana — nem ser, nem não-ser, mas o estado que antecede ambos.',
    principle: 'Negatividade Absoluta — além de existência e não-existência',
    relation: 'Precede Ain Soph — é a raiz inconcebível do Ilimitado',
  },
  ainSoph: {
    name: 'Ain Soph',
    hebrewName: 'אין סוף (Sem Fim)',
    number: '00',
    icon: '∞',
    description: 'O Ilimitado — a expansão infinita sem forma, sem medida, sem atributo. Na Golden Dawn, Ain Soph representa a segunda abstração negativa: o Infinito potencial que contém todas as possibilidades mas não manifesta nenhuma. É o Oceano sem margens do qual toda criação emergirá.',
    goldenDawn: 'O segundo véu da existência negativa. Mathers e Westcott descrevem Ain Soph como a extensão ilimitada — sem começo, sem fim, sem direção. É o conceito de infinitude pura antes que a Luz se concentre.',
    principle: 'Infinitude sem atributo — potencial puro não manifestado',
    relation: 'Entre Ain e Ain Soph Aur — o infinito que precede a Luz',
  },
  ainSophAur: {
    name: 'Ain Soph Aur',
    hebrewName: 'אין סוף אור (Luz Ilimitada)',
    number: '000',
    icon: '☀',
    description: 'A Luz Ilimitada — a primeira irradiação do Infinito, o impulso criativo primordial. Na Golden Dawn, representa o momento em que o Absoluto decide emanar: a Luz concentra-se num ponto (Kether) e a Árvore da Vida nasce. É a ponte entre o Nada e o Algo.',
    goldenDawn: 'O terceiro véu da existência negativa. Os rituais da Golden Dawn ensinam que Ain Soph Aur é a Luz Ilimitada que se concentra num único ponto — formando Kether, a Coroa. Este é o Tzimtzum da Kabbalah Luriana: a contração que permite a criação.',
    principle: 'Luz Primordial — o primeiro impulso de manifestação',
    relation: 'Precede diretamente Kether — é a fonte da primeira Sephirah',
  },
};

export default function TreeOrnaments({ width, height, showVeils = true, showPillars = true }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [pinnedOrnaments, setPinnedOrnaments] = useState<PinnedOrnament[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const deregisterRefs = useRef<Map<string, () => void>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  const col = '#c9a033'; // Vibrant gold for better visibility in dark mode
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
      const data = pillarData[id.replace('pillar-', '') as keyof typeof pillarData];
      if (data) text = `${data.name}\n${data.description}`;
    } else if (id.startsWith('veil-')) {
      const data = veilData[id.replace('veil-', '') as keyof typeof veilData];
      if (data) text = `${data.name}\n${data.description}`;
    } else if (id === 'ain' || id === 'ain-soph' || id === 'ain-soph-aur') {
      const key = id === 'ain-soph-aur' ? 'ainSophAur' : id === 'ain-soph' ? 'ainSoph' : 'ain';
      const data = ainSophData[key];
      if (data) text = `${data.name} (${data.hebrewName})\n${data.description}\n\nGolden Dawn: ${data.goldenDawn}`;
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
      const d = pillarData[id.replace('pillar-', '') as keyof typeof pillarData];
      return (<>
        <p className="font-bold text-sm">{d.icon} {d.name}</p>
        <p className="text-white/60 text-[11px]">{d.hebrewName} — {d.side}</p>
        <p className="mt-1.5 text-white/80 whitespace-normal">{d.description}</p>
        <div className="mt-2 pt-1.5 border-t border-white/10 space-y-0.5">
          <p className="text-white/70"><span className="text-white/40 text-[10px]">Elemento:</span> {d.element}</p>
          <p className="text-white/70"><span className="text-white/40 text-[10px]">Gênero:</span> {d.gender}</p>
          <p className="text-white/70"><span className="text-white/40 text-[10px]">Princípio:</span> {d.principle}</p>
        </div>
        <div className="mt-2 pt-1.5 border-t border-white/10">
          <p className="text-white/40 text-[10px] uppercase tracking-wide mb-0.5">Sephirots</p>
          {d.sephirots.map((s, i) => <p key={i} className="text-white/70 text-[11px]">• {s}</p>)}
        </div>
      </>);
    } else if (id === 'ain' || id === 'ain-soph' || id === 'ain-soph-aur') {
      const key = id === 'ain-soph-aur' ? 'ainSophAur' : id === 'ain-soph' ? 'ainSoph' : 'ain';
      const d = ainSophData[key];
      return (<>
        <p className="font-bold text-sm">{d.icon} {d.name}</p>
        <p className="text-white/60 text-[11px]">{d.hebrewName} — {d.number}</p>
        <p className="mt-1.5 text-white/80 whitespace-normal">{d.description}</p>
        <div className="mt-2 pt-1.5 border-t border-white/10">
          <p className="text-amber-300/80 text-[10px] uppercase tracking-wide mb-0.5">✡ Golden Dawn</p>
          <p className="text-white/70 text-[11px] whitespace-normal">{d.goldenDawn}</p>
        </div>
        <div className="mt-2 pt-1.5 border-t border-white/10 space-y-0.5">
          <p className="text-white/70"><span className="text-white/40 text-[10px]">Princípio:</span> {d.principle}</p>
          <p className="text-white/70"><span className="text-white/40 text-[10px]">Relação:</span> {d.relation}</p>
        </div>
      </>);
    } else {
      const d = veilData[id.replace('veil-', '') as keyof typeof veilData];
      return (<>
        <p className="font-bold text-sm">{d.icon} {d.name}</p>
        <p className="text-white/60 text-[11px]">{d.hebrewName}</p>
        <p className="mt-1.5 text-white/80 whitespace-normal">{d.description}</p>
        <div className="mt-2 pt-1.5 border-t border-white/10 space-y-0.5">
          <p className="text-white/70"><span className="text-white/40 text-[10px]">Elemento:</span> {d.element}</p>
          <p className="text-white/70"><span className="text-white/40 text-[10px]">Mundo:</span> {d.world}</p>
          <p className="text-white/70"><span className="text-white/40 text-[10px]">Guardião:</span> {d.guardian}</p>
        </div>
        <div className="mt-2 pt-1.5 border-t border-white/10">
          <p className="text-white/40 text-[10px] uppercase tracking-wide mb-0.5">Caminhos</p>
          <p className="text-white/70 text-[11px]">{d.paths.join(', ')}</p>
        </div>
        <div className="mt-1"><p className="text-white/40 text-[10px]">Acima: <span className="text-white/70">{d.above.join(', ')}</span></p></div>
        <div className="mt-0.5"><p className="text-white/40 text-[10px]">Abaixo: <span className="text-white/70">{d.below.join(', ')}</span></p></div>
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
        <text x={width / 2} y={40} textAnchor="middle" fill={col} fontSize="11" opacity="0.75" fontFamily="'EB Garamond', Georgia, serif" letterSpacing="3">AIN — NADA — 0</text>
        <text x={width / 2} y={60} textAnchor="middle" fill={col} fontSize="11" opacity="0.75" fontFamily="'EB Garamond', Georgia, serif" letterSpacing="2.5">AIN SOPH — ILIMITADO — 00</text>
        <text x={width / 2} y={80} textAnchor="middle" fill={col} fontSize="11" opacity="0.75" fontFamily="'EB Garamond', Georgia, serif" letterSpacing="2">AIN SOPH AUR — LUZ ILIMITADA — 000</text>
        <text x={width / 2} y={105} textAnchor="middle" fill={col} fontSize="24" opacity="0.7">∞</text>
        <text x={width / 2} y={120} textAnchor="middle" fill={col} fontSize="10" opacity="0.6" fontFamily="'EB Garamond', Georgia, serif" fontStyle="italic">Jechidah</text>

        {/* Veils */}
        {showVeils && <>
          <line x1={60} y1={520} x2={width - 60} y2={520} stroke={col} strokeWidth="1.2" opacity="0.55" strokeDasharray="10 5" />
          <text x={12} y={516} fill={col} fontSize="11" opacity="0.75" fontFamily="'EB Garamond', Georgia, serif" fontStyle="italic">Véu do Abismo</text>
          <line x1={60} y1={980} x2={width - 60} y2={980} stroke={col} strokeWidth="1.2" opacity="0.55" strokeDasharray="10 5" />
          <text x={12} y={976} fill={col} fontSize="11" opacity="0.75" fontFamily="'EB Garamond', Georgia, serif" fontStyle="italic">Véu de Parokhet</text>
          <line x1={60} y1={1390} x2={width - 60} y2={1390} stroke={col} strokeWidth="1.2" opacity="0.55" strokeDasharray="10 5" />
          <text x={12} y={1386} fill={col} fontSize="11" opacity="0.75" fontFamily="'EB Garamond', Georgia, serif" fontStyle="italic">Véu de Nephesch</text>
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
              <button onClick={() => handleCopy(pinned.id)} className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition">{copiedId === pinned.id ? '✓ Copiado' : '📋 Copiar'}</button>
              <button onClick={() => unpinOrnament(pinned.id)} className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition">✕ Fechar</button>
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
          <p className="text-center text-[9px] text-white/40 mt-1">clique para fixar</p>
        </div>
      )}
    </div>
  );
}
