/**
 * Clipboard helper that works in secure and insecure contexts.
 *
 * `navigator.clipboard` is only available in secure contexts (HTTPS or
 * localhost). When the app is opened over plain HTTP — for example
 * `http://192.168.x.x:3000` while testing on a phone — the Clipboard API is
 * missing, so we fall back to a hidden textarea plus
 * `document.execCommand('copy')`, which still works on Android Chrome.
 *
 * Returns `true` when the text was copied.
 */
export async function copyText(text: string): Promise<boolean> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  // Preferred path. Skip it entirely on insecure origins: `writeText` is
  // either absent or rejected without user activation there.
  if (window.isSecureContext && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Permission denied or API blocked — try the legacy fallback below.
    }
  }

  return legacyCopy(text);
}

/**
 * Legacy copy path: a 1×1 off-screen textarea, selected and copied with
 * `document.execCommand('copy')`. Must run inside the user gesture (or shortly
 * after it) for Chrome to allow the operation.
 */
function legacyCopy(text: string): boolean {
  const activeElement =
    document.activeElement instanceof HTMLElement ? document.activeElement : null;

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.setAttribute('aria-hidden', 'true');
  textarea.tabIndex = -1;
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.width = '1px';
  textarea.style.height = '1px';
  textarea.style.padding = '0';
  textarea.style.border = 'none';
  textarea.style.outline = 'none';
  textarea.style.boxShadow = 'none';
  textarea.style.background = 'transparent';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';

  document.body.appendChild(textarea);

  let copied = false;
  try {
    textarea.focus({ preventScroll: true });
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    copied = document.execCommand('copy');
  } catch {
    copied = false;
  } finally {
    textarea.remove();
    activeElement?.focus({ preventScroll: true });
  }

  return copied;
}
