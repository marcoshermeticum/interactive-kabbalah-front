import { sephirots } from '@/data/sephirots';

export type DebugOffsetKey = 'icon' | 'number' | 'subtitle' | 'title' | 'valor' | 'world';

export type DebugOffsets = Record<DebugOffsetKey, number>;

export interface SephirotDebugInfo {
  name: string;
  number: number;
  icon: string;
  valor: string;
  planetName?: string;
  regentTitle?: string;
  regentName?: string;
  regentDefect?: string;
  worldTitle?: string;
  worldAspect?: string;
}

export interface SephirotDebugEntry {
  id: string;
  name: string;
  getState: () => {
    offsets: DebugOffsets;
    panelPosition: { x: number; y: number };
    visible: boolean;
  };
  setOffsets: (offsets: DebugOffsets) => void;
  setPanelPosition: (panelPosition: { x: number; y: number }) => void;
  setVisible: (visible: boolean) => void;
}

const debugRegistry = new Map<string, SephirotDebugEntry>();

export function registerSephirotDebugEntry(entry: SephirotDebugEntry) {
  debugRegistry.set(entry.id, entry);
}

export function unregisterSephirotDebugEntry(id: string) {
  debugRegistry.delete(id);
}

export function getDefaultDebugOffsets(sephirahName: string): DebugOffsets {
  const normalized = sephirahName.toLowerCase();
  const map: Record<string, DebugOffsets> = {
    kether: { icon: -3, number: -4, subtitle: -8, title: -33, valor: 59, world: 66 },
    chokmah: { icon: -2, number: -5, subtitle: -8, title: -35, valor: 46, world: 52 },
    binah: { icon: -2, number: -5, subtitle: -9, title: -30, valor: 41, world: 51 },
    daath: { icon: -1, number: -3, subtitle: -7, title: -34, valor: 48, world: 48 },
    chesed: { icon: -2, number: -5, subtitle: -8, title: -35, valor: 44, world: 31 },
    gevurah: { icon: -2, number: -5, subtitle: -8, title: -36, valor: 46, world: 41 },
    tiferet: { icon: -2, number: -5, subtitle: -7, title: -34, valor: 48, world: 43 },
    netzach: { icon: -2, number: -5, subtitle: -9, title: -36, valor: 44, world: 44 },
    hod: { icon: -2, number: -5, subtitle: -7, title: -35, valor: 45, world: 43 },
    yesod: { icon: -2, number: -5, subtitle: -8, title: -35, valor: 44, world: 43 },
    malkuth: { icon: -2, number: -5, subtitle: -8, title: -36, valor: 45, world: 51 },
  };

  return map[normalized] ?? {
    icon: -2,
    number: -5,
    subtitle: -9,
    title: -30,
    valor: 41,
    world: 51,
  };
}

export class InteractiveDebug {
  private dragEnabled = true;
  private treeTooltipsEnabled = true;
  private dragControllers = new Set<(enabled: boolean) => void>();

  public registerDragController(handler: (enabled: boolean) => void) {
    this.dragControllers.add(handler);
    handler(this.dragEnabled);
    return () => {
      this.dragControllers.delete(handler);
    };
  }

  public setDragEnabled(enabled: boolean): boolean {
    this.dragEnabled = enabled;
    this.dragControllers.forEach((handler) => handler(enabled));
    return enabled;
  }

  public enableDrag(): boolean {
    return this.setDragEnabled(true);
  }

  public disableDrag(): boolean {
    return this.setDragEnabled(false);
  }

  public getDragEnabled(): boolean {
    return this.dragEnabled;
  }

  public setTreeTooltipsEnabled(enabled: boolean): boolean {
    this.treeTooltipsEnabled = enabled;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('tree-tooltips-status-change', { detail: { enabled } }));
    }
    return enabled;
  }

  public enableTreeTooltips(): boolean {
    return this.setTreeTooltipsEnabled(true);
  }

  public disableTreeTooltips(): boolean {
    return this.setTreeTooltipsEnabled(false);
  }

  public getTreeTooltipsEnabled(): boolean {
    return this.treeTooltipsEnabled;
  }

  public getSephirotInformationByName(name: string): SephirotDebugInfo | undefined {
    const normalized = name.trim().toLowerCase();
    const entry = sephirots[normalized];
    if (!entry) return undefined;

    return {
      name: entry.name,
      number: entry.number,
      icon: entry.icon,
      valor: entry.valor,
      planetName: entry.planetName,
      regentTitle: entry.regent.title,
      regentName: entry.regent.name,
      regentDefect: entry.regent.defect,
      worldTitle: entry.world?.title,
      worldAspect: entry.world?.aspect,
    };
  }

  public getAllSephirotDebugData() {
    return Object.fromEntries(
      Array.from(debugRegistry.entries()).map(([id, entry]) => {
        const state = entry.getState();
        return [id, {
          name: entry.name,
          visible: state.visible,
          panelPosition: { ...state.panelPosition },
          offsets: { ...state.offsets },
        }];
      })
    );
  }

  public setDebugTextOffset(sephirotName: string, key: DebugOffsetKey, value: number): boolean {
    const entry = this.resolveTarget(sephirotName);
    if (!entry) return false;
    const next = { ...entry.getState().offsets, [key]: value };
    entry.setOffsets(next);
    return true;
  }

  public getDebugTextOffset(sephirotName: string, key: DebugOffsetKey): number | undefined {
    const entry = this.resolveTarget(sephirotName);
    if (!entry) return undefined;
    return entry.getState().offsets[key];
  }

  public getDebugOffsets(sephirotName: string): DebugOffsets | undefined {
    const entry = this.resolveTarget(sephirotName);
    if (!entry) return undefined;
    return { ...entry.getState().offsets };
  }

  public setDebugTextPosition(sephirotName: string, x: number, y: number): boolean {
    const entry = this.resolveTarget(sephirotName);
    if (!entry) return false;
    entry.setPanelPosition({ x, y });
    return true;
  }

  public getDebugTextPosition(sephirotName: string): { x: number; y: number } | undefined {
    const entry = this.resolveTarget(sephirotName);
    if (!entry) return undefined;
    return { ...entry.getState().panelPosition };
  }

  public setDebugTextVisible(visible: boolean, sephirotName?: string): boolean {
    if (typeof window === 'undefined') return visible;

    const current = window as typeof window & {
      __sephirotDebugVisibility?: { visible: boolean; sephirah?: string | null };
    };

    current.__sephirotDebugVisibility = {
      visible,
      sephirah: sephirotName ? sephirotName.toLowerCase() : null,
    };
    window.dispatchEvent(new CustomEvent('sephirot-debug-visibility-change'));
    return visible;
  }

  public showDebugText(sephirotName?: string): boolean {
    return this.setDebugTextVisible(true, sephirotName);
  }

  public hideDebugText(sephirotName?: string): boolean {
    return this.setDebugTextVisible(false, sephirotName);
  }

  public toggleDebugText(sephirotName?: string): boolean {
    if (typeof window === 'undefined') return false;
    const current = window as typeof window & {
      __sephirotDebugVisibility?: { visible: boolean; sephirah?: string | null };
    };
    const base = current.__sephirotDebugVisibility?.visible ?? true;
    const next = !base;
    return this.setDebugTextVisible(next, sephirotName);
  }

  public resetDebugOffsets(sephirotName?: string): boolean {
    if (sephirotName) {
      const entry = this.resolveTarget(sephirotName);
      if (!entry) return false;
      const next = getDefaultDebugOffsets(sephirotName);
      entry.setOffsets(next);
      return true;
    }

    let didReset = false;
    for (const [id, entry] of debugRegistry.entries()) {
      const next = getDefaultDebugOffsets(entry.name);
      entry.setOffsets(next);
      didReset = true;
      if (id !== entry.id) {
        // no-op; keeps the iteration stable
      }
    }
    return didReset;
  }

  private resolveTarget(sephirotName: string) {
    const normalized = sephirotName.trim().toLowerCase();
    const direct = Array.from(debugRegistry.values()).find((entry) => entry.id === normalized || entry.name.toLowerCase() === normalized);
    if (direct) return direct;
    return debugRegistry.get(normalized) ?? undefined;
  }
}

export const interactiveDebug = new InteractiveDebug();

declare global {
  interface Window {
    InteractiveDebug: InteractiveDebug;
  }
}

if (typeof window !== 'undefined') {
  window.InteractiveDebug = interactiveDebug;
}
