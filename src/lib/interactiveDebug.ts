import { sephirots } from '@/data/sephirots';

export type DebugOffsetKey = 'icon' | 'number' | 'subtitle' | 'title' | 'valor' | 'world';

export type DebugOffsetValue = { x: number; y: number; size: number };

export type DebugOffsets = Record<DebugOffsetKey, DebugOffsetValue>;

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
    colors: Record<string, string>;
    panelPosition: { x: number; y: number };
    visible: boolean;
  };
  setOffsets: (offsets: DebugOffsets) => void;
  setColors: (colors: Record<string, string>) => void;
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

/** Default offsets shared by all sephirots. Override per-sephirah if needed in the future. */
const DEFAULT_DEBUG_OFFSETS: DebugOffsets = {
  icon: { x: 0, y: -2, size: 38 },
  number: { x: 0, y: 12, size: 24 },
  subtitle: { x: 0, y: -8, size: 15 },
  title: { x: 0, y: -35, size: 15 },
  valor: { x: 0, y: 50, size: 16 },
  world: { x: 0, y: 59, size: 14 },
};

/** Per-sephirah overrides (add entries here when individual tuning is needed). */
const SEPHIROT_OFFSET_OVERRIDES: Partial<Record<string, Partial<DebugOffsets>>> = {
  // Example: kether: { title: { x: 0, y: -40, size: 15 } },
};

export function getDefaultDebugOffsets(sephirahName: string): DebugOffsets {
  const normalized = sephirahName.toLowerCase();
  const overrides = SEPHIROT_OFFSET_OVERRIDES[normalized];
  if (!overrides) return { ...DEFAULT_DEBUG_OFFSETS };
  return { ...DEFAULT_DEBUG_OFFSETS, ...overrides };
}

export class InteractiveDebug {
  private dragEnabled = true;
  private treeTooltipsEnabled = true;
  private treeTextFontFamily = TREE_FONT_DEFAULT;
  private previousTreeTextFontFamily = TREE_FONT_PREVIOUS;
  private treeBorderOpacity = 1;
  private treeBorderColor = '#ffffff';
  private treeBorderWidth = 1;
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

  public getTreeTextFontFamily(): string {
    return this.treeTextFontFamily;
  }

  public getPreviousTreeTextFontFamily(): string {
    return this.previousTreeTextFontFamily;
  }

  public getTreeTextFontOptions() {
    return [...TREE_FONT_OPTIONS];
  }

  public setTreeTextFontFamily(fontFamily: string): string {
    const next = fontFamily?.trim();
    if (!next) return this.treeTextFontFamily;

    if (next !== this.treeTextFontFamily) {
      this.previousTreeTextFontFamily = this.treeTextFontFamily;
      this.treeTextFontFamily = next;
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('tree-font-family-change', {
          detail: { fontFamily: next, previous: this.previousTreeTextFontFamily },
        }));
      }
    }

    return this.treeTextFontFamily;
  }

  public resetTreeTextFontFamily(): string {
    this.previousTreeTextFontFamily = this.treeTextFontFamily;
    this.treeTextFontFamily = TREE_FONT_DEFAULT;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('tree-font-family-change', {
        detail: { fontFamily: this.treeTextFontFamily, previous: this.previousTreeTextFontFamily },
      }));
    }
    return this.treeTextFontFamily;
  }

  /**
   * Control decorative border opacity (0 = hidden, 1 = full).
   * Affects the white/gray decorative rings around sephirots and path outlines.
   */
  public setTreeBorderOpacity(opacity: number): number {
    this.treeBorderOpacity = Math.max(0, Math.min(1, opacity));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('tree-border-opacity-change', {
        detail: { opacity: this.treeBorderOpacity },
      }));
    }
    return this.treeBorderOpacity;
  }

  public getTreeBorderOpacity(): number {
    return this.treeBorderOpacity;
  }

  public hideTreeBorders(): number {
    return this.setTreeBorderOpacity(0);
  }

  public showTreeBorders(): number {
    return this.setTreeBorderOpacity(1);
  }

  /** Set global border color (any CSS color). */
  public setTreeBorderColor(color: string): string {
    this.treeBorderColor = color.trim() || '#ffffff';
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('tree-border-style-change', {
        detail: { color: this.treeBorderColor, width: this.treeBorderWidth },
      }));
    }
    return this.treeBorderColor;
  }

  public getTreeBorderColor(): string {
    return this.treeBorderColor;
  }

  /** Set global border width (0–10). */
  public setTreeBorderWidth(width: number): number {
    this.treeBorderWidth = Math.max(0, Math.min(10, width));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('tree-border-style-change', {
        detail: { color: this.treeBorderColor, width: this.treeBorderWidth },
      }));
    }
    return this.treeBorderWidth;
  }

  public getTreeBorderWidth(): number {
    return this.treeBorderWidth;
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
          colors: { ...state.colors },
        }];
      })
    );
  }

  /** Returns a full snapshot of all tree-level debug settings + per-sephirot overrides. */
  public getAllTreeDebugData() {
    return {
      global: {
        fontFamily: this.treeTextFontFamily,
        borderColor: this.treeBorderColor,
        borderWidth: this.treeBorderWidth,
        borderOpacity: this.treeBorderOpacity,
      },
      sephirots: this.getAllSephirotDebugData(),
    };
  }

  /**
   * Update a single offset for a sephirah's debug text element.
   * 
   * @param value - A number (shortcut for `{ y: value }`), a partial offset, or a full `{x, y, size}`.
   */
  public setDebugTextOffset(sephirotName: string, key: DebugOffsetKey, value: number | Partial<DebugOffsetValue> | DebugOffsetValue): boolean {
    const entry = this.resolveTarget(sephirotName);
    if (!entry) return false;
    const current = entry.getState().offsets[key];
    const next = {
      ...entry.getState().offsets,
      [key]: typeof value === 'number'
        ? { ...current, y: value }
        : { ...current, ...value },
    };
    entry.setOffsets(next);
    return true;
  }

  public getDebugTextOffset(sephirotName: string, key: DebugOffsetKey): DebugOffsetValue | undefined {
    const entry = this.resolveTarget(sephirotName);
    if (!entry) return undefined;
    return { ...entry.getState().offsets[key] };
  }

  public getDebugOffsets(sephirotName: string): DebugOffsets | undefined {
    const entry = this.resolveTarget(sephirotName);
    if (!entry) return undefined;
    return Object.fromEntries(
      Object.entries(entry.getState().offsets).map(([k, v]) => [k, { x: v.x, y: v.y, size: v.size }])
    ) as DebugOffsets;
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

  /**
   * Set a debug color override for a sephirah.
   * @param key - One of: outer, middle, inner, stroke, text
   * @param color - Any valid CSS color (hex, rgb, named). Pass empty string to clear.
   */
  public setDebugColor(sephirotName: string, key: string, color: string): boolean {
    const entry = this.resolveTarget(sephirotName);
    if (!entry) return false;
    const current = { ...entry.getState().colors };
    if (!color.trim()) {
      delete current[key];
    } else {
      current[key] = color.trim();
    }
    entry.setColors(current);
    return true;
  }

  /**
   * Set all debug color overrides for a sephirah at once.
   * Pass partial object — only provided keys are overridden.
   */
  public setDebugColors(sephirotName: string, colors: Record<string, string>): boolean {
    const entry = this.resolveTarget(sephirotName);
    if (!entry) return false;
    const current = { ...entry.getState().colors };
    for (const [k, v] of Object.entries(colors)) {
      if (!v.trim()) delete current[k];
      else current[k] = v.trim();
    }
    entry.setColors(current);
    return true;
  }

  /** Get current debug color overrides for a sephirah. */
  public getDebugColors(sephirotName: string): Record<string, string> | undefined {
    const entry = this.resolveTarget(sephirotName);
    if (!entry) return undefined;
    return { ...entry.getState().colors };
  }

  /** Reset all debug color overrides for a sephirah (or all if no name given). */
  public resetDebugColors(sephirotName?: string): boolean {
    if (sephirotName) {
      const entry = this.resolveTarget(sephirotName);
      if (!entry) return false;
      entry.setColors({});
      return true;
    }
    let didReset = false;
    for (const entry of debugRegistry.values()) {
      entry.setColors({});
      didReset = true;
    }
    return didReset;
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

  public showDebugTooltips(sephirotName?: string): boolean {
    return this.showDebugText(sephirotName);
  }

  public hideDebugText(sephirotName?: string): boolean {
    return this.setDebugTextVisible(false, sephirotName);
  }

  public hideDebugTooltips(sephirotName?: string): boolean {
    return this.hideDebugText(sephirotName);
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

  public toggleDebugTooltips(sephirotName?: string): boolean {
    return this.toggleDebugText(sephirotName);
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

export const TREE_FONT_DEFAULT = "'EB Garamond', 'Cormorant Garamond', Georgia, serif";
export const TREE_FONT_PREVIOUS = 'Georgia, serif';

export const TREE_FONT_OPTIONS = [
  { label: 'EB Garamond', value: "'EB Garamond', 'Cormorant Garamond', Georgia, serif" },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Cormorant Garamond', value: "'Cormorant Garamond', Georgia, serif" },
  { label: 'Libre Baskerville', value: "'Libre Baskerville', Georgia, serif" },
  { label: 'Gilda Display', value: "'Gilda Display', Georgia, serif" },
  { label: 'Iowan Old Style', value: "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', serif" },
  { label: 'Times New Roman', value: "'Times New Roman', Times, serif" },
  { label: 'Alegreya', value: "'Alegreya', Georgia, serif" },
] as const;

export const interactiveDebug = new InteractiveDebug();

declare global {
  interface Window {
    InteractiveDebug: InteractiveDebug;
  }
}

if (typeof window !== 'undefined') {
  window.InteractiveDebug = interactiveDebug;
}
