/**
 * Global Tooltip Manager
 * 
 * Manages a stack of pinned tooltips. When the user taps/clicks outside
 * the tree context (without dragging), the most recently pinned tooltip
 * is closed first. Subsequent outside taps close the next one, etc.
 * 
 * Features:
 * - Stack-based close order (most recent first)
 * - Maximum pinned tooltip limit (default: 4, configurable via NEXT_PUBLIC_MAX_PINNED_TOOLTIPS)
 * - When limit is reached, oldest tooltip is automatically closed
 */

type UnpinFn = () => void;

/** Max pinned tooltips. Set NEXT_PUBLIC_MAX_PINNED_TOOLTIPS env var to override (default: 4) */
const MAX_PINNED = parseInt(process.env.NEXT_PUBLIC_MAX_PINNED_TOOLTIPS || '4', 10);

class TooltipManager {
  private stack: UnpinFn[] = [];

  /** Register a pinned tooltip. Returns a deregister function. 
   *  If the max limit is reached, the oldest tooltip is closed automatically. */
  register(unpin: UnpinFn): () => void {
    // Enforce max limit — close the oldest tooltip if at capacity
    if (this.stack.length >= MAX_PINNED) {
      const oldest = this.stack.shift();
      if (oldest) oldest();
    }

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

  /** Max allowed pinned tooltips */
  get maxPinned(): number {
    return MAX_PINNED;
  }
}

// Singleton
export const tooltipManager = new TooltipManager();
