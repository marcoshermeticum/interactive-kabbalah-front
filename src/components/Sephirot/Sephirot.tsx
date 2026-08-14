'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { sephirotCorrespondences } from '@/data/correspondences';
import Tooltip from '@/components/Tooltip/Tooltip';
import { daemons } from '@/data/daemons';
import { SigilImage } from '@/components/Search/SigilImage';
import { ExpandableSection } from '@/components/ExpandableSection/ExpandableSection';
import { getDefaultDebugOffsets, interactiveDebug, registerSephirotDebugEntry, unregisterSephirotDebugEntry, type DebugOffsets, TREE_FONT_DEFAULT } from '@/lib/interactiveDebug';
import type { SephirotData } from './types';

function getDaemonsForQliphah(qliphahId: string) {
  return daemons.filter((d) =>
    d.associations.some((a) => a.type === 'qliphah' && a.refId === qliphahId)
  );
}

interface Props {
  data: SephirotData;
  size?: number;
  translated?: {
    name?: string;
    valor?: string;
    regent?: { title?: string; name?: string; defect?: string };
    world?: { title?: string; aspect?: string };
  };
}

export default function Sephirot({ data, size = 160, translated }: Props) {
  const ui = useTranslations('ui');
  const sephT = useTranslations(data.name.toLowerCase());

  const name = translated?.name || data.name;
  const valor = translated?.valor || data.valor;
  const regentTitle = translated?.regent?.title || data.regent.title;
  const regentName = translated?.regent?.name || data.regent.name;
  const regentDefect = translated?.regent?.defect || data.regent.defect;
  const worldTitle = translated?.world?.title || data.world?.title;
  const worldAspect = translated?.world?.aspect || data.world?.aspect;

  // Read integration and dailyLife from translations, fallback to data values
  // Only attempt i18n lookup if the data field exists (qliphoth only)
  let integration: string | undefined = data.integration;
  let dailyLife: string | undefined = data.dailyLife;

  if (data.integration) {
    try {
      const rawIntegration = sephT.raw('integration');
      if (typeof rawIntegration === 'string' && rawIntegration.trim() && !rawIntegration.includes('.integration')) {
        integration = rawIntegration;
      }
    } catch { /* fallback to data */ }
  }
  if (data.dailyLife) {
    try {
      const rawDailyLife = sephT.raw('dailyLife');
      if (typeof rawDailyLife === 'string' && rawDailyLife.trim() && !rawDailyLife.includes('.dailyLife')) {
        dailyLife = rawDailyLife;
      }
    } catch { /* fallback to data */ }
  }

  // Get translated labels for integration and dailyLife
  let integrationLabel = 'Integration';
  let dailyLifeLabel = 'Daily Life';
  try {
    const rawLabel = ui('integration');
    if (rawLabel) integrationLabel = rawLabel;
  } catch { /* fallback */ }
  try {
    const rawLabel = ui('dailyLife');
    if (rawLabel) dailyLifeLabel = rawLabel;
  } catch { /* fallback */ }

  // Read archetypes and minorArcana from translations (falls back to data)
  // Only attempt i18n lookups for sephirots (they have full translations).
  // Qliphoth namespaces only have integration/dailyLife keys.
  const isSephirot = !!sephirotCorrespondences[data.name.toLowerCase()];
  let archetypes: string[] = data.archetypes;
  let minorArcana: string[] = data.minorArcana;
  let planetName = data.planetName;
  let corrAnimals: string[] = [];
  let corrStones: string[] = [];
  let corrBodyParts: string[] = [];

  if (isSephirot) {
    try {
      const rawArch = sephT.raw('archetypes');
      if (Array.isArray(rawArch)) archetypes = rawArch;
    } catch { /* fallback to data */ }
    try {
      const rawMinor = sephT.raw('minorArcana');
      if (Array.isArray(rawMinor)) minorArcana = rawMinor;
    } catch { /* fallback to data */ }
    try {
      const rawPlanet = sephT.raw('planetName');
      if (typeof rawPlanet === 'string') planetName = rawPlanet;
    } catch { /* fallback to data */ }
    try {
      const rawCorr = sephT.raw('correspondences') as { animals?: string[]; stones?: string[]; bodyParts?: string[] } | undefined;
      if (rawCorr) {
        if (Array.isArray(rawCorr.animals)) corrAnimals = rawCorr.animals;
        if (Array.isArray(rawCorr.stones)) corrStones = rawCorr.stones;
        if (Array.isArray(rawCorr.bodyParts)) corrBodyParts = rawCorr.bodyParts;
      }
    } catch { /* fallback — will use correspondences.ts data below */ }
  }

  const cx = 250;
  const cy = 250;
  const uid = `s-${data.name.toLowerCase()}`;
  const [debugOffsets, setDebugOffsets] = useState<DebugOffsets>(() => getDefaultDebugOffsets(data.name));
  const [debugColors, setDebugColors] = useState<Record<string, string>>({});
  const [debugBorderOpacity, setDebugBorderOpacity] = useState<number | null>(null);
  const [debugBorderWidth, setDebugBorderWidth] = useState<number | null>(null);
  const [globalBorderOpacity, setGlobalBorderOpacity] = useState(() => typeof window === 'undefined' ? 1 : window.InteractiveDebug?.getTreeBorderOpacity?.() ?? 1);
  const [globalBorderColor, setGlobalBorderColor] = useState(() => typeof window === 'undefined' ? '#ffffff' : window.InteractiveDebug?.getTreeBorderColor?.() ?? '#ffffff');
  const [globalBorderWidth, setGlobalBorderWidth] = useState(() => typeof window === 'undefined' ? 1 : window.InteractiveDebug?.getTreeBorderWidth?.() ?? 1);
  const [debugPanelTab, setDebugPanelTab] = useState<'text' | 'design'>('text');
  const [isClient, setIsClient] = useState(false);
  const [treeFontFamily, setTreeFontFamily] = useState(() => typeof window === 'undefined' ? TREE_FONT_DEFAULT : window.InteractiveDebug?.getTreeTextFontFamily?.() ?? TREE_FONT_DEFAULT);
  const [, setDebugVisibilityVersion] = useState(0);
  const [panelPosition, setPanelPosition] = useState({ x: 80, y: -72 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ offsetX: number; offsetY: number } | null>(null);

  // Resolved colors: debug overrides take precedence over data.colors
  const colors = {
    outer: debugColors.outer || data.colors.outer,
    middle: debugColors.middle || data.colors.middle,
    inner: debugColors.inner || data.colors.inner,
    text: debugColors.text || data.colors.text,
    stroke: debugColors.stroke || data.colors.stroke,
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateDebugOffset = (key: keyof DebugOffsets, axis: 'x' | 'y' | 'size', value: number) => {
    setDebugOffsets((prev) => ({
      ...prev,
      [key]: { ...prev[key], [axis]: value },
    }));
  };

  const handleDebugPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('input') || target.closest('label') || target.closest('button')) return;

    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);

    const panelRect = panelRef.current?.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!panelRect || !containerRect) return;

    dragRef.current = {
      offsetX: event.clientX - panelRect.left,
      offsetY: event.clientY - panelRect.top,
    };
  };

  const handleDebugPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || !containerRef.current) return;

    event.preventDefault();
    event.stopPropagation();

    const containerRect = containerRef.current.getBoundingClientRect();
    const nextX = event.clientX - containerRect.left - dragRef.current.offsetX;
    const nextY = event.clientY - containerRect.top - dragRef.current.offsetY;

    // Allow free movement across the viewport (generous bounds)
    const viewW = window.innerWidth;
    const viewH = window.innerHeight;
    setPanelPosition({
      x: Math.max(-containerRect.left - 100, Math.min(viewW - containerRect.left, nextX)),
      y: Math.max(-containerRect.top - 100, Math.min(viewH - containerRect.top, nextY)),
    });
  };

  const handleDebugPointerUp = (event?: React.PointerEvent<HTMLDivElement>) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
  };

  const readDebugVisibilityState = () => {
    if (typeof window === 'undefined') return { visible: true, sephirah: null } as { visible: boolean; sephirah: string | null };
    return (window as typeof window & { __sephirotDebugVisibility?: { visible: boolean; sephirah?: string | null } }).__sephirotDebugVisibility ?? { visible: true, sephirah: null };
  };

  const debugVisibilityState = readDebugVisibilityState();
  const showDebugTextControls = isClient
    && typeof window !== 'undefined'
    && window.location.search.includes('debug-sephirot-text=1')
    && (debugVisibilityState?.visible ?? true)
    && (!debugVisibilityState?.sephirah || debugVisibilityState.sephirah.toLowerCase() === data.name.toLowerCase());

  // --- Debug registry: refs hold mutable state, effect registers once on mount ---
  const debugOffsetsRef = useRef(debugOffsets);
  debugOffsetsRef.current = debugOffsets;
  const debugColorsRef = useRef(debugColors);
  debugColorsRef.current = debugColors;
  const panelPositionRef = useRef(panelPosition);
  panelPositionRef.current = panelPosition;
  const showDebugRef = useRef(showDebugTextControls);
  showDebugRef.current = showDebugTextControls;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const entry = {
      id: uid,
      name,
      getState: () => ({
        offsets: debugOffsetsRef.current,
        colors: debugColorsRef.current,
        panelPosition: panelPositionRef.current,
        visible: showDebugRef.current,
      }),
      setOffsets: (next: DebugOffsets) => setDebugOffsets(next),
      setColors: (next: Record<string, string>) => setDebugColors(next),
      setPanelPosition: (next: { x: number; y: number }) => setPanelPosition(next),
      setVisible: (visible: boolean) => {
        (window as typeof window & { __sephirotDebugVisibility?: { visible: boolean; sephirah?: string | null } }).__sephirotDebugVisibility = {
          visible,
          sephirah: data.name.toLowerCase(),
        };
        window.dispatchEvent(new CustomEvent('sephirot-debug-visibility-change'));
      },
    };

    registerSephirotDebugEntry(entry);

    // Legacy API — thin wrapper around the unified InteractiveDebug API
    const currentWindow = window as typeof window & {
      __sephirotTextDebug?: {
        all: () => ReturnType<typeof interactiveDebug.getAllSephirotDebugData>;
        get: (id?: string) => ReturnType<typeof interactiveDebug.getDebugOffsets> | undefined;
        reset: () => void;
        toggle: (sephirah?: string, force?: boolean) => boolean;
        show: (sephirah?: string) => boolean;
        hide: (sephirah?: string) => boolean;
        setAll: (visible: boolean, sephirah?: string) => boolean;
      };
      __sephirotDebugVisibility?: { visible: boolean; sephirah?: string | null };
    };

    currentWindow.__sephirotTextDebug = {
      all: () => interactiveDebug.getAllSephirotDebugData(),
      get: (id = uid) => interactiveDebug.getDebugOffsets(id.replace('s-', '')),
      reset: () => { interactiveDebug.resetDebugOffsets(); },
      toggle: (sephirah?: string, force?: boolean) => {
        const base = currentWindow.__sephirotDebugVisibility?.visible ?? true;
        const next = typeof force === 'boolean' ? force : !base;
        return interactiveDebug.setDebugTextVisible(next, sephirah ?? undefined);
      },
      show: (sephirah?: string) => interactiveDebug.showDebugText(sephirah),
      hide: (sephirah?: string) => interactiveDebug.hideDebugText(sephirah),
      setAll: (visible: boolean, sephirah?: string) => interactiveDebug.setDebugTextVisible(visible, sephirah),
    };

    currentWindow.__sephirotDebugVisibility ??= { visible: true, sephirah: null };

    return () => {
      unregisterSephirotDebugEntry(uid);
      if (currentWindow.__sephirotTextDebug) {
        currentWindow.__sephirotTextDebug = undefined;
      }
    };
  // Mount/unmount only — refs keep getState() fresh without re-registering
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, name, data.name]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleVisibilityChange = () => setDebugVisibilityVersion((prev) => prev + 1);
    const handleTreeFontChange = () => setTreeFontFamily(window.InteractiveDebug?.getTreeTextFontFamily?.() ?? TREE_FONT_DEFAULT);
    const handleBorderOpacityChange = () => setGlobalBorderOpacity(window.InteractiveDebug?.getTreeBorderOpacity?.() ?? 1);
    const handleBorderStyleChange = () => {
      setGlobalBorderColor(window.InteractiveDebug?.getTreeBorderColor?.() ?? '#ffffff');
      setGlobalBorderWidth(window.InteractiveDebug?.getTreeBorderWidth?.() ?? 1);
    };
    window.addEventListener('sephirot-debug-visibility-change', handleVisibilityChange);
    window.addEventListener('tree-font-family-change', handleTreeFontChange);
    window.addEventListener('tree-border-opacity-change', handleBorderOpacityChange);
    window.addEventListener('tree-border-style-change', handleBorderStyleChange);
    return () => {
      window.removeEventListener('sephirot-debug-visibility-change', handleVisibilityChange);
      window.removeEventListener('tree-font-family-change', handleTreeFontChange);
      window.removeEventListener('tree-border-opacity-change', handleBorderOpacityChange);
      window.removeEventListener('tree-border-style-change', handleBorderStyleChange);
    };
  }, []);
  const titleFontSize = Math.max(20, Math.min(28, 28 - Math.max(0, name.length - 7) * 1.1)) + debugOffsets.title.size;
  const subtitleFontSize = regentTitle && regentName ? Math.max(11, Math.min(15, 15 - Math.max(0, regentName.length - 11) * 0.35)) + debugOffsets.subtitle.size : 0;
  const isKether = data.name.toLowerCase() === 'kether';
  const lowerTextLift = isKether ? -23 : -12;
  const subtitleArc = `M ${90 + debugOffsets.subtitle.x} ${180 + debugOffsets.subtitle.y} A 170 170 0 0 1 ${410 + debugOffsets.subtitle.x} ${180 + debugOffsets.subtitle.y}`;
  const titleArc = `M ${150 + debugOffsets.title.x} ${220 + debugOffsets.title.y} A 110 110 0 0 1 ${350 + debugOffsets.title.x} ${220 + debugOffsets.title.y}`;
  const valorArc = `M ${125 + debugOffsets.valor.x} ${285 + lowerTextLift + debugOffsets.valor.y} A 140 140 0 0 0 ${375 + debugOffsets.valor.x} ${285 + lowerTextLift + debugOffsets.valor.y}`;
  const worldArc = `M ${90 + debugOffsets.world.x} ${305 + lowerTextLift + debugOffsets.world.y} A 175 175 0 0 0 ${410 + debugOffsets.world.x} ${305 + lowerTextLift + debugOffsets.world.y}`;
  const iconFontSize = 76 + debugOffsets.icon.size;
  const numberFontSize = 34 + debugOffsets.number.size;
  const valorFontSize = 20 + debugOffsets.valor.size;
  const worldFontSize = 15 + debugOffsets.world.size;
  // Border: per-sephirot override > global setting
  const borderOpacity = debugBorderOpacity ?? globalBorderOpacity;
  const borderWidth = debugBorderWidth ?? globalBorderWidth;
  const borderColor = globalBorderColor;

  const tooltipContent = (
    <>
      <p className="font-bold text-sm">{name} — {data.number}</p>
      <p className="text-white/80">{valor}</p>
      <p className="mt-1">{data.icon} ({planetName})</p>
      {regentTitle && regentName && (
        <div className="mt-1 inline-flex items-center gap-1 flex-wrap">
          <span>🔱 {regentTitle} — {regentName}</span>
          {!isSephirot && getDaemonsForQliphah(data.name.toLowerCase()).map((daemon) => (
            <SigilImage
              key={daemon.id}
              url={daemon.sigilUrl}
              alt={daemon.canonicalName}
              size={28}
            />
          ))}
        </div>
      )}
      {regentDefect && regentDefect.trim() && (
        <p className="text-red-300">⚠️ {ui('defect')}: {regentDefect}</p>
      )}
      {(integration || dailyLife) && (
        <ExpandableSection>
          {integration && (
            <p className="text-green-300 text-xs mt-1">🌱 {integrationLabel}: {integration}</p>
          )}
          {dailyLife && (
            <p className="text-yellow-300 text-xs mt-1">🔄 {dailyLifeLabel}: {dailyLife}</p>
          )}
        </ExpandableSection>
      )}
      {worldTitle && <p className="mt-1 text-blue-300">🌍 {worldTitle}</p>}
      {worldAspect && <p className="text-blue-200">{worldAspect}</p>}
      {archetypes.length > 0 && (
        <div className="mt-2 pt-1 border-t border-white/10">
          <p className="text-white/60 text-[10px] uppercase tracking-wide">{ui('archetypes')}</p>
          <p className="text-white/90">{archetypes.join(', ')}</p>
        </div>
      )}
      {minorArcana.length > 0 && (
        <div className="mt-2 pt-1 border-t border-white/10">
          <p className="text-white/60 text-[10px] uppercase tracking-wide">{ui('minorArcana')}</p>
          <ul className="mt-0.5 space-y-0.5">
            {minorArcana.map((a, i) => (
              <li key={i} className="text-white/80">🃏 {a}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Correspondences */}
      {(() => {
        const corr = sephirotCorrespondences[data.name.toLowerCase()];
        // Use translated correspondences if available, otherwise fall back to data file
        const animals = corrAnimals.length > 0 ? corrAnimals : (corr?.animals || []);
        const stones = corrStones.length > 0 ? corrStones : (corr?.stones || []);
        const bodyParts = corrBodyParts.length > 0 ? corrBodyParts : (corr?.bodyParts || []);
        if (animals.length === 0 && stones.length === 0 && bodyParts.length === 0) return null;
        return (
          <div className="mt-2 pt-1 border-t border-white/10 space-y-1">
            {animals.length > 0 && <p className="text-white/80">🐾 {animals.join(', ')}</p>}
            {stones.length > 0 && <p className="text-white/80">💎 {stones.join(', ')}</p>}
            {bodyParts.length > 0 && <p className="text-white/80">🫀 {bodyParts.join(', ')}</p>}
          </div>
        );
      })()}
    </>
  );

  return (
    <Tooltip content={tooltipContent}>
      <div ref={containerRef} style={{ width: size, height: size, position: 'relative' }}>
        {showDebugTextControls && (
          <div
            ref={panelRef}
            data-no-pan
            onPointerDown={handleDebugPointerDown}
            onPointerMove={handleDebugPointerMove}
            onPointerUp={handleDebugPointerUp}
            onPointerLeave={handleDebugPointerUp}
            style={{
              position: 'absolute',
              left: `${panelPosition.x}px`,
              top: `${panelPosition.y}px`,
              width: '230px',
              padding: '8px 10px',
              borderRadius: '10px',
              background: 'rgba(12, 12, 12, 0.85)',
              border: '1px solid rgba(255,255,255,0.18)',
              boxShadow: '0 10px 24px rgba(0,0,0,0.3)',
              zIndex: 2147483647,
              color: '#fff',
              fontSize: '10px',
              lineHeight: 1.4,
              cursor: 'grab',
              userSelect: 'none',
              touchAction: 'none',
            }}
          >
            <div
              style={{
                margin: '-8px -10px 6px',
                padding: '6px 10px 8px',
                borderBottom: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px 10px 0 0',
                background: 'rgba(255,255,255,0.02)',
                cursor: 'grab',
                userSelect: 'none',
              }}
            >
              <div style={{ fontWeight: 700, textAlign: 'center', marginBottom: 4 }}>{name} debug</div>
              <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                <button
                  onClick={() => setDebugPanelTab('text')}
                  style={{
                    fontSize: 9, padding: '2px 8px', borderRadius: 4, border: 'none',
                    background: debugPanelTab === 'text' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                    color: '#fff', cursor: 'pointer',
                  }}
                >texto</button>
                <button
                  onClick={() => setDebugPanelTab('design')}
                  style={{
                    fontSize: 9, padding: '2px 8px', borderRadius: 4, border: 'none',
                    background: debugPanelTab === 'design' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                    color: '#fff', cursor: 'pointer',
                  }}
                >design</button>
              </div>
            </div>
            {debugPanelTab === 'text' && (
              <>
                <div style={{ display: 'grid', gap: 4 }}>
                  {[
                    { key: 'icon', label: 'icone' },
                    { key: 'number', label: 'numero' },
                    { key: 'subtitle', label: 'subtitulo' },
                    { key: 'title', label: 'titulo' },
                    { key: 'valor', label: 'virtude' },
                    { key: 'world', label: 'descrição' },
                  ].map(({ key, label }) => (
                    <div key={key} style={{ display: 'grid', gridTemplateColumns: '54px 1fr 1fr 1fr', alignItems: 'center', gap: 6 }}>
                      <span style={{ opacity: 0.8 }}>{label}</span>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: 9, opacity: 0.7 }}>X</span>
                        <input
                          type="number"
                          min={-200}
                          max={200}
                          step={1}
                          value={debugOffsets[key as keyof DebugOffsets].x}
                          onChange={(event) => updateDebugOffset(key as keyof DebugOffsets, 'x', Number(event.target.value))}
                          style={{ width: '48px', padding: '2px 4px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: '#fff' }}
                        />
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: 9, opacity: 0.7 }}>Y</span>
                        <input
                          type="number"
                          min={-200}
                          max={200}
                          step={1}
                          value={debugOffsets[key as keyof DebugOffsets].y}
                          onChange={(event) => updateDebugOffset(key as keyof DebugOffsets, 'y', Number(event.target.value))}
                          style={{ width: '48px', padding: '2px 4px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: '#fff' }}
                        />
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: 9, opacity: 0.7 }}>F</span>
                        <input
                          type="number"
                          min={-40}
                          max={80}
                          step={1}
                          value={debugOffsets[key as keyof DebugOffsets].size}
                          onChange={(event) => updateDebugOffset(key as keyof DebugOffsets, 'size', Number(event.target.value))}
                          style={{ width: '48px', padding: '2px 4px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: '#fff' }}
                        />
                      </label>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 6, opacity: 0.8, textAlign: 'center' }}>
                  {JSON.stringify(debugOffsets)}
                </div>
              </>
            )}
            {debugPanelTab === 'design' && (
              <>
                <div style={{ display: 'grid', gap: 8 }}>
                  {[
                    { key: 'outer', label: 'externo' },
                    { key: 'middle', label: 'médio' },
                    { key: 'inner', label: 'interno' },
                    { key: 'stroke', label: 'borda' },
                    { key: 'text', label: 'texto' },
                  ].map(({ key, label }) => {
                    const currentColor = debugColors[key] || data.colors[key as keyof typeof data.colors];
                    // Convert to hex for the native picker (best-effort)
                    const pickerValue = currentColor.startsWith('#') && (currentColor.length === 7 || currentColor.length === 4)
                      ? currentColor.length === 4
                        ? `#${currentColor[1]}${currentColor[1]}${currentColor[2]}${currentColor[2]}${currentColor[3]}${currentColor[3]}`
                        : currentColor
                      : '#888888';
                    return (
                      <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ opacity: 0.8, width: 50, flexShrink: 0 }}>{label}</span>
                          <input
                            type="color"
                            value={pickerValue}
                            onChange={(event) => {
                              setDebugColors((prev) => ({ ...prev, [key]: event.target.value }));
                            }}
                            style={{ width: 28, height: 22, padding: 0, border: '1px solid rgba(255,255,255,0.3)', borderRadius: 4, cursor: 'pointer', background: 'transparent' }}
                          />
                          <input
                            type="text"
                            placeholder={data.colors[key as keyof typeof data.colors]}
                            value={debugColors[key] || ''}
                            onChange={(event) => {
                              const val = event.target.value.trim();
                              setDebugColors((prev) => {
                                if (!val) {
                                  const next = { ...prev };
                                  delete next[key];
                                  return next;
                                }
                                return { ...prev, [key]: val };
                              });
                            }}
                            style={{ flex: 1, padding: '2px 6px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: 10 }}
                          />
                        </div>
                        <div style={{ display: 'flex', gap: 4, paddingLeft: 56 }}>
                          <div style={{ width: '100%', height: 4, borderRadius: 2, background: currentColor, border: '1px solid rgba(255,255,255,0.1)' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ opacity: 0.8, flexShrink: 0 }}>borda</span>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={debugBorderOpacity ?? globalBorderOpacity}
                      onChange={(event) => setDebugBorderOpacity(Number(event.target.value))}
                      style={{ flex: 1, cursor: 'pointer' }}
                    />
                    <span style={{ opacity: 0.7, width: 30, textAlign: 'right' }}>{((debugBorderOpacity ?? globalBorderOpacity) * 100).toFixed(0)}%</span>
                    {debugBorderOpacity !== null && (
                      <button
                        onClick={() => setDebugBorderOpacity(null)}
                        style={{ fontSize: 8, padding: '1px 4px', borderRadius: 3, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)', color: '#fff', cursor: 'pointer' }}
                      >↺</button>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                    <span style={{ opacity: 0.8, flexShrink: 0 }}>espess.</span>
                    <input
                      type="range"
                      min={0}
                      max={6}
                      step={0.25}
                      value={debugBorderWidth ?? globalBorderWidth}
                      onChange={(event) => setDebugBorderWidth(Number(event.target.value))}
                      style={{ flex: 1, cursor: 'pointer' }}
                    />
                    <span style={{ opacity: 0.7, width: 30, textAlign: 'right' }}>{(debugBorderWidth ?? globalBorderWidth).toFixed(1)}</span>
                    {debugBorderWidth !== null && (
                      <button
                        onClick={() => setDebugBorderWidth(null)}
                        style={{ fontSize: 8, padding: '1px 4px', borderRadius: 3, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)', color: '#fff', cursor: 'pointer' }}
                      >↺</button>
                    )}
                  </div>
                </div>
                <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center' }}>
                  <button
                    onClick={() => setDebugColors({})}
                    style={{ fontSize: 9, padding: '2px 10px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)', color: '#fff', cursor: 'pointer' }}
                  >reset cores</button>
                </div>
                <div style={{ marginTop: 6, opacity: 0.8, textAlign: 'center', wordBreak: 'break-all', fontSize: 9 }}>
                  {JSON.stringify({ ...data.colors, ...debugColors })}
                </div>
              </>
            )}
          </div>
        )}

        <svg
          width="100%"
          height="100%"
          viewBox="0 0 500 500"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id={`${uid}-soft-glow`} x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor={colors.middle} floodOpacity="0.35" />
            </filter>
            <path id={`${uid}-regent`} d={subtitleArc} fill="none" />
            <path id={`${uid}-name`} d={titleArc} fill="none" />
            <path id={`${uid}-valor`} d={valorArc} fill="none" />
            <path id={`${uid}-world`} d={worldArc} fill="none" />
          </defs>

          <circle cx={cx} cy={cy} r={236} fill={colors.stroke} opacity={borderOpacity} />
          <circle cx={cx} cy={cy} r={220} fill={colors.outer} stroke={borderColor} strokeWidth={borderWidth} strokeOpacity={0.72 * borderOpacity} filter={`url(#${uid}-soft-glow)`} />
          <circle cx={cx} cy={cy} r={214} fill="none" stroke={borderColor} strokeWidth={borderWidth * 0.6} opacity={borderOpacity} />

          <circle cx={cx} cy={cy} r={173} fill={colors.middle} stroke="#ffffff" strokeWidth={0.6} strokeOpacity={0.7 * borderOpacity} />
          <circle cx={cx} cy={cy} r={166} fill="none" stroke="#ffffff" strokeWidth={0.4} opacity={borderOpacity} />

          <circle cx={cx} cy={cy} r={110} fill={colors.inner} stroke="#ffffff" strokeWidth={0.6} strokeOpacity={0.66 * borderOpacity} />
          <circle cx={cx} cy={cy} r={100} fill="none" stroke="#ffffff" strokeWidth={0.4} opacity={borderOpacity} />

          <circle cx={cx} cy={cy} r={86} fill="rgba(250, 245, 220, 0.05)" stroke="#ffffff" strokeWidth={0.4} opacity={borderOpacity} />

          <text x={cx + debugOffsets.icon.x} y={cy - 10 + debugOffsets.icon.y} textAnchor="middle" dominantBaseline="central" fill={colors.text} fontSize={iconFontSize} fontFamily={treeFontFamily}>{data.icon}</text>
          <text x={cx + debugOffsets.number.x} y={cy + 48 + debugOffsets.number.y} textAnchor="middle" dominantBaseline="central" fill={colors.text} fontSize={numberFontSize} fontFamily={treeFontFamily} fontWeight="700" opacity="0.95">{data.number}</text>

          {regentTitle && regentName && (
            <text fill={colors.text} fontSize={subtitleFontSize} fontFamily={treeFontFamily} letterSpacing="0.8" opacity="0.9" fontStyle="italic">
              <textPath href={`#${uid}-regent`} startOffset="50%" textAnchor="middle">{regentTitle} - {regentName}</textPath>
            </text>
          )}
          <text fill={colors.text} fontSize={titleFontSize} fontWeight="700" fontFamily={treeFontFamily} letterSpacing="1.2">
            <textPath href={`#${uid}-name`} startOffset="50%" textAnchor="middle">{name}</textPath>
          </text>
          <text fill={colors.text} fontSize={valorFontSize} fontFamily={treeFontFamily} letterSpacing="1.3" opacity="0.9">
            <textPath href={`#${uid}-valor`} startOffset="50%" textAnchor="middle">{valor}</textPath>
          </text>
          {worldAspect && (
            <text fill={colors.text} fontSize={worldFontSize} fontFamily={treeFontFamily} letterSpacing="1" opacity="0.7">
              <textPath href={`#${uid}-world`} startOffset="50%" textAnchor="middle">{worldAspect}</textPath>
            </text>
          )}
        </svg>
      </div>
    </Tooltip>
  );
}
