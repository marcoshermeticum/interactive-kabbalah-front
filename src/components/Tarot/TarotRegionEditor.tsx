'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { copyText } from '@/lib/clipboard';
import type { TarotCard, TarotRegion, TarotShape } from '@/data/tarot/types';

type ShapeType = TarotShape['type'];
type Handle = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

interface Point {
  x: number;
  y: number;
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface EditRegion extends Box {
  id: string;
  icon?: string;
  i18nKey: string;
  type: ShapeType;
  /** Free-form polygon kept read-only; when present the box is just its bbox. */
  polygon?: string;
}

type Drag =
  | { mode: 'move'; id: string; start: Point; origin: Box }
  | { mode: 'resize'; id: string; handle: Handle; start: Point; origin: Box };

const SHAPE_TYPES: ShapeType[] = ['rect', 'circle', 'triangle'];
const HANDLES: Handle[] = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
const MIN_SIZE = 2;
const round1 = (n: number) => Math.round(n * 10) / 10;
const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

function polygonBBox(points: string): Box {
  const pairs = points
    .trim()
    .split(/\s+/)
    .map((pair) => pair.split(',').map(Number))
    .filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));
  const xs = pairs.map(([x]) => x);
  const ys = pairs.map(([, y]) => y);
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  return { x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y };
}

function toEditRegion(region: TarotRegion): EditRegion {
  const base = { id: region.id, icon: region.icon, i18nKey: region.i18nKey };

  if (region.shape) {
    const { type, x, y, width, height } = region.shape;
    return { ...base, type, x, y, w: width, h: height };
  }

  return { ...base, type: 'rect', ...polygonBBox(region.points ?? '0,0'), polygon: region.points };
}

/**
 * Development-only visual editor for the card's interactive regions.
 *
 * Drag a region to move it, drag its handles to resize, or edit the numbers
 * directly. "Copiar JSON" puts the `regions` array on the clipboard, ready to
 * paste into `src/data/tarot/<card>.ts`.
 */
export default function TarotRegionEditor({ card }: { card: TarotCard }) {
  const { width: vbW, height: vbH } = card.viewBox;

  const [regions, setRegions] = useState<EditRegion[]>(() => card.regions.map(toEditRegion));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drag, setDrag] = useState<Drag | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [copied, setCopied] = useState(false);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selected = useMemo(
    () => regions.find((region) => region.id === selectedId) ?? null,
    [regions, selectedId]
  );

  const updateRegion = useCallback((id: string, patch: Partial<EditRegion>) => {
    setRegions((current) =>
      current.map((region) => (region.id === id ? { ...region, ...patch } : region))
    );
  }, []);

  const pointFromEvent = useCallback(
    (event: React.PointerEvent): Point => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };
      const rect = svg.getBoundingClientRect();
      return {
        x: ((event.clientX - rect.left) / rect.width) * vbW,
        y: ((event.clientY - rect.top) / rect.height) * vbH,
      };
    },
    [vbW, vbH]
  );

  const capturePointer = useCallback((pointerId: number) => {
    try {
      svgRef.current?.setPointerCapture(pointerId);
    } catch {
      // Pointer capture can fail when the pointer is already gone; dragging
      // still works through the SVG's own pointermove handler.
    }
  }, []);

  const startMove = useCallback(
    (event: React.PointerEvent, region: EditRegion) => {
      if (region.polygon) return;
      event.preventDefault();
      event.stopPropagation();
      setSelectedId(region.id);
      capturePointer(event.pointerId);
      setDrag({
        mode: 'move',
        id: region.id,
        start: pointFromEvent(event),
        origin: { x: region.x, y: region.y, w: region.w, h: region.h },
      });
    },
    [capturePointer, pointFromEvent]
  );

  const startResize = useCallback(
    (event: React.PointerEvent, region: EditRegion, handle: Handle) => {
      event.preventDefault();
      event.stopPropagation();
      setSelectedId(region.id);
      capturePointer(event.pointerId);
      setDrag({
        mode: 'resize',
        id: region.id,
        handle,
        start: pointFromEvent(event),
        origin: { x: region.x, y: region.y, w: region.w, h: region.h },
      });
    },
    [capturePointer, pointFromEvent]
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!drag) return;
      const point = pointFromEvent(event);
      const { origin } = drag;

      if (drag.mode === 'move') {
        updateRegion(drag.id, {
          x: round1(clamp(origin.x + (point.x - drag.start.x), 0, vbW - origin.w)),
          y: round1(clamp(origin.y + (point.y - drag.start.y), 0, vbH - origin.h)),
        });
        return;
      }

      let { x, y, w, h } = origin;
      const handle = drag.handle;

      if (handle.includes('w')) {
        const right = x + w;
        x = clamp(point.x, 0, right - MIN_SIZE);
        w = right - x;
      }
      if (handle.includes('e')) {
        w = clamp(point.x - x, MIN_SIZE, vbW - x);
      }
      if (handle.includes('n')) {
        const bottom = y + h;
        y = clamp(point.y, 0, bottom - MIN_SIZE);
        h = bottom - y;
      }
      if (handle.includes('s')) {
        h = clamp(point.y - y, MIN_SIZE, vbH - y);
      }

      updateRegion(drag.id, {
        x: round1(x),
        y: round1(y),
        w: round1(w),
        h: round1(h),
      });
    },
    [drag, pointFromEvent, updateRegion, vbW, vbH]
  );

  const endDrag = useCallback((event: React.PointerEvent) => {
    try {
      if (svgRef.current?.hasPointerCapture(event.pointerId)) {
        svgRef.current.releasePointerCapture(event.pointerId);
      }
    } catch {
      // Ignore a pointer that is no longer captured.
    }
    setDrag(null);
  }, []);

  // Arrow keys nudge the selected region; Shift moves it faster.
  useEffect(() => {
    if (!selectedId) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)
      ) {
        return;
      }

      const step = event.shiftKey ? 2 : 0.5;
      const deltas: Record<string, [number, number]> = {
        ArrowLeft: [-step, 0],
        ArrowRight: [step, 0],
        ArrowUp: [0, -step],
        ArrowDown: [0, step],
      };
      const delta = deltas[event.key];
      if (!delta) return;

      event.preventDefault();
      const region = regions.find((item) => item.id === selectedId);
      if (!region || region.polygon) return;

      updateRegion(selectedId, {
        x: round1(clamp(region.x + delta[0], 0, vbW - region.w)),
        y: round1(clamp(region.y + delta[1], 0, vbH - region.h)),
      });
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [regions, selectedId, updateRegion, vbW, vbH]);

  useEffect(() => {
    return () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, []);

  const snippet = useMemo(() => {
    const lines = regions.map((region) => {
      const body = [`      id: '${region.id}',`];
      if (region.icon) body.push(`      icon: '${region.icon}',`);
      if (region.polygon) {
        body.push(`      points: '${region.polygon}',`);
      } else {
        body.push(
          `      shape: { type: '${region.type}', x: ${region.x}, y: ${region.y}, width: ${region.w}, height: ${region.h} },`
        );
      }
      body.push(`      i18nKey: '${region.i18nKey}',`);
      return ['    {', ...body, '    },'].join('\n');
    });

    return `  regions: [\n${lines.join('\n')}\n  ],`;
  }, [regions]);

  const handleCopy = useCallback(async () => {
    const ok = await copyText(snippet);
    setCopied(ok);
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(false), 2000);
  }, [snippet]);

  const handleReset = useCallback(() => {
    setRegions(card.regions.map(toEditRegion));
    setSelectedId(null);
  }, [card.regions]);

  const handleTypeChange = useCallback(
    (type: ShapeType) => {
      if (!selected) return;
      updateRegion(selected.id, { type });
    },
    [selected, updateRegion]
  );

  return (
    <div className="grid w-full items-start justify-center gap-6 md:grid-cols-[minmax(0,26rem)_minmax(0,24rem)] md:gap-8">
      {/* ─── Artwork + overlay ─── */}
      <section className="mx-auto w-full max-w-[360px] md:col-start-1 md:row-start-1 md:max-w-none">
        <div
          className="rounded-2xl p-2.5 sm:p-3"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div
            className="relative w-full select-none overflow-hidden rounded-xl"
            style={{
              aspectRatio: `${vbW} / ${vbH}`,
              border: '1px solid var(--border)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image}
              alt=""
              draggable={false}
              className="pointer-events-none absolute inset-0 h-full w-full object-contain"
            />

            <svg
              ref={svgRef}
              className="absolute inset-0 h-full w-full touch-none"
              viewBox={`0 0 ${vbW} ${vbH}`}
              preserveAspectRatio="none"
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              {showGrid && (
                <g pointerEvents="none" aria-hidden>
                  {Array.from({ length: Math.floor(vbW / 10) + 1 }, (_, i) => i * 10).map((x) => (
                    <line
                      key={`vx-${x}`}
                      x1={x}
                      x2={x}
                      y1={0}
                      y2={vbH}
                      stroke="rgba(255,255,255,0.22)"
                      strokeWidth={x % 50 === 0 ? 0.25 : 0.12}
                    />
                  ))}
                  {Array.from({ length: Math.floor(vbH / 10) + 1 }, (_, i) => i * 10).map((y) => (
                    <line
                      key={`hy-${y}`}
                      x1={0}
                      x2={vbW}
                      y1={y}
                      y2={y}
                      stroke="rgba(255,255,255,0.22)"
                      strokeWidth={y % 50 === 0 ? 0.25 : 0.12}
                    />
                  ))}
                </g>
              )}

              {[...regions]
                .sort((a, b) => Number(a.id === selectedId) - Number(b.id === selectedId))
                .map((region) => {
                  const active = region.id === selectedId;
                  return (
                    <g key={region.id}>
                      <RegionOutline
                        region={region}
                        active={active}
                        onPointerDown={(event) => startMove(event, region)}
                      />
                      <text
                        x={region.x + region.w / 2}
                        y={region.y + region.h / 2}
                        fill={active ? '#f6efe3' : 'rgba(246,239,227,0.85)'}
                        fontSize={2.4}
                        fontWeight={600}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        pointerEvents="none"
                        style={{ paintOrder: 'stroke', stroke: 'rgba(20,16,10,0.65)', strokeWidth: 0.5 }}
                      >
                        {region.id}
                      </text>

                      {active && !region.polygon && (
                        <g>
                          {HANDLES.map((handle) => {
                            const { hx, hy, cursor } = handlePosition(handle, region);
                            const size = 2.6;
                            return (
                              <rect
                                key={handle}
                                x={hx - size / 2}
                                y={hy - size / 2}
                                width={size}
                                height={size}
                                rx={0.4}
                                fill="#d4af37"
                                stroke="rgba(20,16,10,0.8)"
                                strokeWidth={0.35}
                                style={{ cursor }}
                                onPointerDown={(event) => startResize(event, region, handle)}
                              />
                            );
                          })}
                        </g>
                      )}
                    </g>
                  );
                })}
            </svg>
          </div>
        </div>

        <p className="mt-3 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
          Arraste para mover · alças para redimensionar · setas para ajuste fino
        </p>
      </section>

      {/* ─── Controls ─── */}
      <div className="mx-auto w-full max-w-[360px] space-y-4 md:col-start-2 md:row-start-1 md:max-w-none">
        <div
          className="rounded-2xl p-4"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
              Editor de destaques
            </h2>
            <label className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(event) => setShowGrid(event.target.checked)}
              />
              grade
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            {regions.map((region) => {
              const active = region.id === selectedId;
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setSelectedId(active ? null : region.id)}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                  style={{
                    background: active ? 'var(--gold)' : 'var(--bg-primary)',
                    color: active ? '#1c1917' : 'var(--text-secondary)',
                    border: `1px solid ${active ? 'var(--gold)' : 'var(--border)'}`,
                  }}
                >
                  {region.icon && <span aria-hidden>{region.icon}</span>}
                  {region.id}
                </button>
              );
            })}
          </div>

          {selected ? (
            <div className="mt-4 space-y-3">
              {selected.polygon ? (
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Região poligonal — edite os `points` manualmente.
                </p>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                      Forma
                    </span>
                    {SHAPE_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleTypeChange(type)}
                        className="rounded-md px-2.5 py-1 text-xs"
                        style={{
                          background:
                            selected.type === type ? 'var(--gold)' : 'var(--bg-primary)',
                          color: selected.type === type ? '#1c1917' : 'var(--text-secondary)',
                          border: `1px solid ${
                            selected.type === type ? 'var(--gold)' : 'var(--border)'
                          }`,
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {(
                      [
                        ['x', selected.x, 0, vbW, (v: number) => updateRegion(selected.id, { x: v })],
                        ['y', selected.y, 0, vbH, (v: number) => updateRegion(selected.id, { y: v })],
                        ['w', selected.w, MIN_SIZE, vbW, (v: number) => updateRegion(selected.id, { w: v })],
                        ['h', selected.h, MIN_SIZE, vbH, (v: number) => updateRegion(selected.id, { h: v })],
                      ] as const
                    ).map(([label, value, min, max, onChange]) => (
                      <label key={label} className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                        {label.toUpperCase()}
                        <input
                          type="number"
                          step={0.1}
                          min={min}
                          max={max}
                          value={value}
                          onChange={(event) => {
                            const next = event.currentTarget.valueAsNumber;
                            if (Number.isFinite(next)) onChange(round1(clamp(next, min, max)));
                          }}
                          className="mt-1 w-full rounded-md px-2 py-1.5 text-sm"
                          style={{
                            background: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border)',
                          }}
                        />
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <p className="mt-4 text-xs" style={{ color: 'var(--text-muted)' }}>
              Selecione um destaque na imagem ou na lista para ajustar.
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-full px-4 py-2 text-sm font-medium"
              style={{ background: 'var(--gold)', color: '#1c1917' }}
            >
              {copied ? '✓ Copiado' : 'Copiar JSON'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full px-4 py-2 text-sm font-medium"
              style={{
                background: 'var(--bg-primary)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
              }}
            >
              Restaurar
            </button>
          </div>
        </div>

        <textarea
          readOnly
          value={snippet}
          spellCheck={false}
          className="h-56 w-full resize-none rounded-2xl p-3 font-mono text-[11px] leading-relaxed"
          style={{
            background: 'var(--bg-secondary)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
          }}
        />
      </div>
    </div>
  );
}

/** Renders the (non-interactive) outline for one region in the editor. */
function RegionOutline({
  region,
  active,
  onPointerDown,
}: {
  region: EditRegion;
  active: boolean;
  onPointerDown: (event: React.PointerEvent) => void;
}) {
  const style = {
    cursor: region.polygon ? 'default' : 'move',
    fill: active ? 'rgba(212, 175, 55, 0.24)' : 'rgba(212, 175, 55, 0.10)',
    stroke: active ? 'var(--gold)' : 'rgba(246, 239, 227, 0.85)',
    strokeWidth: active ? 0.8 : 0.45,
    strokeDasharray: active ? 'none' : '2 1.5',
    pointerEvents: 'all' as const,
  };

  if (region.polygon) {
    return <polygon points={region.polygon} style={style} onPointerDown={onPointerDown} />;
  }

  const { type, x, y, w, h } = region;

  if (type === 'circle') {
    return (
      <ellipse
        cx={x + w / 2}
        cy={y + h / 2}
        rx={w / 2}
        ry={h / 2}
        style={style}
        onPointerDown={onPointerDown}
      />
    );
  }

  if (type === 'triangle') {
    return (
      <polygon
        points={`${x + w / 2},${y} ${x + w},${y + h} ${x},${y + h}`}
        style={style}
        onPointerDown={onPointerDown}
      />
    );
  }

  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      style={style}
      onPointerDown={onPointerDown}
    />
  );
}

function handlePosition(handle: Handle, region: EditRegion) {
  const { x, y, w, h } = region;
  const midX = x + w / 2;
  const midY = y + h / 2;

  const positions: Record<Handle, { hx: number; hy: number; cursor: string }> = {
    nw: { hx: x, hy: y, cursor: 'nwse-resize' },
    n: { hx: midX, hy: y, cursor: 'ns-resize' },
    ne: { hx: x + w, hy: y, cursor: 'nesw-resize' },
    e: { hx: x + w, hy: midY, cursor: 'ew-resize' },
    se: { hx: x + w, hy: y + h, cursor: 'nwse-resize' },
    s: { hx: midX, hy: y + h, cursor: 'ns-resize' },
    sw: { hx: x, hy: y + h, cursor: 'nesw-resize' },
    w: { hx: x, hy: midY, cursor: 'ew-resize' },
  };

  return positions[handle];
}
