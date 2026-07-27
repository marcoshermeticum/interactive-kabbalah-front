/**
 * Global Tooltip Manager
 * 
 * Manages a stack of pinned tooltips. When the user taps/clicks outside
 * the tree context (without dragging), the most recently pinned tooltip
 * is closed first. Subsequent outside taps close the next one, etc.
 * 
 * This prevents all tooltips from closing simultaneously.
 */

type UnpinFn = () => void;

class TooltipManager {
  private stack: UnpinFn[] = [];

  /** Register a pinned tooltip. Returns a deregister function. */
  register(unpin: UnpinFn): () => void {
    this.stack.push(unpin);
    return () => {
      this.stack = this.stack.filter((fn) => fn !== unpin);
    };
  }

  /** Close the most recently pinned tooltip. Returns true if one was closed. */
  closeLatest(): boolean {
    if (this.stack.length === 0) return false;
    const latest = this.stack.pop()!;
    latest();
    return true;
  }

  /** Number of currently pinned tooltips */
  get count(): number {
    return this.stack.length;
  }
}

// Singleton
export const tooltipManager = new TooltipManager();
