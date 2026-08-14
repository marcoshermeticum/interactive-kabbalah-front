'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { sephirotCorrespondences } from '@/data/correspondences';
import Tooltip from '@/components/Tooltip/Tooltip';
import { daemons } from '@/data/daemons';
import { SigilImage } from '@/components/Search/SigilImage';
import { ExpandableSection } from '@/components/ExpandableSection/ExpandableSection';
import { getDefaultDebugOffsets, interactiveDebug, registerSephirotDebugEntry, unregisterSephirotDebugEntry } from '@/lib/interactiveDebug';
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
  const { colors } = data;
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
  type DebugOffsets = {
    icon: number;
    number: number;
    subtitle: number;
    title: number;
    valor: number;
    world: number;
  };

  const [debugOffsets, setDebugOffsets] = useState<DebugOffsets>(() => getDefaultDebugOffsets(data.name));
  const [, setDebugVisibilityVersion] = useState(0);
  const [panelPosition, setPanelPosition] = useState({ x: 80, y: -72 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ offsetX: number; offsetY: number } | null>(null);

  const updateDebugOffset = (key: keyof DebugOffsets, value: number) => {
    setDebugOffsets((prev) => ({ ...prev, [key]: value }));
  };

  const handleDebugPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('input') || target.closest('label')) return;

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

    setPanelPosition({
      x: Math.max(-120, Math.min(containerRect.width - 120, nextX)),
      y: Math.max(-180, Math.min(containerRect.height - 20, nextY)),
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
  const showDebugTextControls = typeof window !== 'undefined'
    && window.location.search.includes('debug-sephirot-text=1')
    && (debugVisibilityState?.visible ?? true)
    && (!debugVisibilityState?.sephirah || debugVisibilityState.sephirah.toLowerCase() === data.name.toLowerCase());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentWindow = window as typeof window & {
      __sephirotTextDebug?: {
        all: () => Record<string, { name: string; offsets: DebugOffsets }>;
        get: (id?: string) => { name: string; offsets: DebugOffsets } | undefined;
        reset: () => void;
        toggle: (sephirah?: string, force?: boolean) => boolean;
        show: (sephirah?: string) => boolean;
        hide: (sephirah?: string) => boolean;
        setAll: (visible: boolean, sephirah?: string) => boolean;
      };
      __sephirotTextDebugRegistry?: Array<{ id: string; name: string; offsets: DebugOffsets }>;
      __sephirotDebugVisibility?: { visible: boolean; sephirah?: string | null };
    };

    const registry = currentWindow.__sephirotTextDebugRegistry ??= [];
    const registryEntry = { id: uid, name, offsets: debugOffsets };
    const existingIndex = registry.findIndex((entry) => entry.id === uid);
    if (existingIndex >= 0) registry[existingIndex] = registryEntry;
    else registry.push(registryEntry);

    const entry = {
      id: uid,
      name,
      getState: () => ({
        offsets: debugOffsets,
        panelPosition,
        visible: showDebugTextControls,
      }),
      setOffsets: (next: DebugOffsets) => setDebugOffsets(next),
      setPanelPosition: (next: { x: number; y: number }) => setPanelPosition(next),
      setVisible: (visible: boolean) => {
        currentWindow.__sephirotDebugVisibility = {
          visible,
          sephirah: data.name.toLowerCase(),
        };
        window.dispatchEvent(new CustomEvent('sephirot-debug-visibility-change'));
      },
    };

    registerSephirotDebugEntry(entry);

    const dispatchVisibilityChange = () => {
      window.dispatchEvent(new CustomEvent('sephirot-debug-visibility-change'));
    };

    const debugApi = {
      all: () => Object.fromEntries(
        registry.map((entryItem) => [entryItem.id, { name: entryItem.name, offsets: { ...entryItem.offsets } }])
      ),
      get: (id = uid) => {
        const entryItem = registry.find((item) => item.id === id);
        return entryItem ? { name: entryItem.name, offsets: { ...entryItem.offsets } } : undefined;
      },
      reset: () => {
        const nextOffsets = getDefaultDebugOffsets(data.name);
        registry.forEach((entryItem) => {
          entryItem.offsets = nextOffsets;
        });
        setDebugOffsets(nextOffsets);
      },
      toggle: (sephirah?: string, force?: boolean) => {
        const target = (sephirah ?? currentWindow.__sephirotDebugVisibility?.sephirah ?? 'all').toLowerCase();
        const baseVisible = currentWindow.__sephirotDebugVisibility?.visible ?? true;
        const nextVisible = typeof force === 'boolean' ? force : !baseVisible;
        currentWindow.__sephirotDebugVisibility = {
          visible: nextVisible,
          sephirah: target === 'all' ? null : target,
        };
        dispatchVisibilityChange();
        return nextVisible;
      },
      show: (sephirah?: string) => {
        const target = sephirah ? sephirah.toLowerCase() : 'all';
        currentWindow.__sephirotDebugVisibility = { visible: true, sephirah: target === 'all' ? null : target };
        dispatchVisibilityChange();
        return true;
      },
      hide: (sephirah?: string) => {
        const target = sephirah ? sephirah.toLowerCase() : 'all';
        currentWindow.__sephirotDebugVisibility = {
          visible: target === 'all' ? false : true,
          sephirah: target === 'all' ? null : target,
        };
        dispatchVisibilityChange();
        return false;
      },
      setAll: (visible: boolean, sephirah?: string) => {
        currentWindow.__sephirotDebugVisibility = {
          visible,
          sephirah: sephirah ? sephirah.toLowerCase() : null,
        };
        dispatchVisibilityChange();
        return visible;
      },
    };

    currentWindow.__sephirotTextDebug = debugApi;
    currentWindow.__sephirotDebugVisibility ??= { visible: true, sephirah: null };
    interactiveDebug.setDebugTextVisible(currentWindow.__sephirotDebugVisibility.visible ?? true, currentWindow.__sephirotDebugVisibility.sephirah ?? undefined);

    return () => {
      const index = registry.findIndex((entryItem) => entryItem.id === uid);
      if (index >= 0) registry.splice(index, 1);
      unregisterSephirotDebugEntry(uid);
      if (currentWindow.__sephirotTextDebug?.all) {
        currentWindow.__sephirotTextDebug = undefined;
      }
    };
  }, [uid, name, debugOffsets, panelPosition, showDebugTextControls, data.name]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleVisibilityChange = () => setDebugVisibilityVersion((prev) => prev + 1);
    window.addEventListener('sephirot-debug-visibility-change', handleVisibilityChange);
    return () => window.removeEventListener('sephirot-debug-visibility-change', handleVisibilityChange);
  }, []);
  const titleFontSize = Math.max(20, Math.min(28, 28 - Math.max(0, name.length - 7) * 1.1));
  const subtitleFontSize = regentTitle && regentName ? Math.max(11, Math.min(15, 15 - Math.max(0, regentName.length - 11) * 0.35)) : 0;
  const isKether = data.name.toLowerCase() === 'kether';
  const lowerTextLift = isKether ? -23 : -12;
  const subtitleArc = `M 90 ${180 + debugOffsets.subtitle} A 170 170 0 0 1 410 ${180 + debugOffsets.subtitle}`;
  const titleArc = `M 150 ${220 + debugOffsets.title} A 110 110 0 0 1 350 ${220 + debugOffsets.title}`;
  const valorArc = `M 125 ${285 + lowerTextLift + debugOffsets.valor} A 140 140 0 0 0 375 ${285 + lowerTextLift + debugOffsets.valor}`;
  const worldArc = `M 90 ${305 + lowerTextLift + debugOffsets.world} A 175 175 0 0 0 410 ${305 + lowerTextLift + debugOffsets.world}`;

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
              <div style={{ fontWeight: 700, textAlign: 'center' }}>{name} debug</div>
            </div>
            <div style={{ display: 'grid', gap: 4 }}>
              {[
                { key: 'icon', label: 'icone' },
                { key: 'number', label: 'numero' },
                { key: 'subtitle', label: 'subtitulo' },
                { key: 'title', label: 'titulo' },
                { key: 'valor', label: 'virtude' },
                { key: 'world', label: 'descrição' },
              ].map(({ key, label }) => (
                <label key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <span>{label}</span>
                  <input
                    type="range"
                    min={-80}
                    max={80}
                    value={debugOffsets[key as keyof DebugOffsets]}
                    onChange={(event) => updateDebugOffset(key as keyof DebugOffsets, Number(event.target.value))}
                    style={{ width: '92px' }}
                  />
                </label>
              ))}
            </div>
            <div style={{ marginTop: 6, opacity: 0.8, textAlign: 'center' }}>
              {JSON.stringify(debugOffsets)}
            </div>
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
            <radialGradient id={`${uid}-grad-outer`} cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor={colors.middle} stopOpacity="0.82" />
              <stop offset="42%" stopColor={colors.middle} stopOpacity="0.98" />
              <stop offset="100%" stopColor={colors.outer} />
            </radialGradient>
            <radialGradient id={`${uid}-grad-mid`} cx="42%" cy="38%" r="62%">
              <stop offset="0%" stopColor={colors.middle} stopOpacity="0.9" />
              <stop offset="100%" stopColor={colors.outer} stopOpacity="0.96" />
            </radialGradient>
            <radialGradient id={`${uid}-grad-inner`} cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor={colors.inner} stopOpacity="0.85" />
              <stop offset="100%" stopColor={colors.inner} />
            </radialGradient>
            <path id={`${uid}-regent`} d={subtitleArc} fill="none" />
            <path id={`${uid}-name`} d={titleArc} fill="none" />
            <path id={`${uid}-valor`} d={valorArc} fill="none" />
            <path id={`${uid}-world`} d={worldArc} fill="none" />
          </defs>

          <circle cx={cx} cy={cy} r={236} fill="rgba(17,13,10,0.76)" />
          <circle cx={cx} cy={cy} r={220} fill={`url(#${uid}-grad-outer)`} stroke={colors.stroke} strokeWidth="5" filter={`url(#${uid}-soft-glow)`} />
          <circle cx={cx} cy={cy} r={214} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />

          <circle cx={cx} cy={cy} r={173} fill={`url(#${uid}-grad-mid)`} stroke={colors.stroke} strokeWidth="3.5" strokeOpacity="0.8" />
          <circle cx={cx} cy={cy} r={166} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

          <circle cx={cx} cy={cy} r={110} fill={`url(#${uid}-grad-inner)`} stroke={colors.stroke} strokeWidth="3.5" strokeOpacity="0.75" />
          <circle cx={cx} cy={cy} r={100} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />

          <circle cx={cx} cy={cy} r={86} fill="rgba(250, 245, 220, 0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

          <text x={cx} y={cy - 10 + debugOffsets.icon} textAnchor="middle" dominantBaseline="central" fill={colors.text} fontSize="76" fontFamily="Georgia, serif">{data.icon}</text>
          <text x={cx} y={cy + 48 + debugOffsets.number} textAnchor="middle" dominantBaseline="central" fill={colors.text} fontSize="34" fontFamily="Georgia, serif" fontWeight="700" opacity="0.95">{data.number}</text>

          {regentTitle && regentName && (
            <text fill={colors.text} fontSize={subtitleFontSize} fontFamily="Georgia, serif" letterSpacing="0.8" opacity="0.9" fontStyle="italic">
              <textPath href={`#${uid}-regent`} startOffset="50%" textAnchor="middle">{regentTitle} - {regentName}</textPath>
            </text>
          )}
          <text fill={colors.text} fontSize={titleFontSize} fontWeight="700" fontFamily="Georgia, serif" letterSpacing="1.2">
            <textPath href={`#${uid}-name`} startOffset="50%" textAnchor="middle">{name}</textPath>
          </text>
          <text fill={colors.text} fontSize="20" fontFamily="Georgia, serif" letterSpacing="1.3" opacity="0.9">
            <textPath href={`#${uid}-valor`} startOffset="50%" textAnchor="middle">{valor}</textPath>
          </text>
          {worldAspect && (
            <text fill={colors.text} fontSize="15" fontFamily="Georgia, serif" letterSpacing="1" opacity="0.7">
              <textPath href={`#${uid}-world`} startOffset="50%" textAnchor="middle">{worldAspect}</textPath>
            </text>
          )}
        </svg>
      </div>
    </Tooltip>
  );
}
