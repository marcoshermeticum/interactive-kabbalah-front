'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface TooltipActionsProps {
  /** Function to get the text content to copy */
  onCopy: () => Promise<string> | string;
  /** Function called when closing/dismissing the tooltip */
  onClose: () => void;
}

/**
 * Reusable tooltip action buttons (Copy + Close).
 * Used by Sephirot tooltips, path tooltips, ornament tooltips, etc.
 * Standardized touch targets (min 44px height) and consistent styling.
 */
export function TooltipActions({ onCopy, onClose }: TooltipActionsProps) {
  const [copied, setCopied] = useState(false);
  const ui = useTranslations('ui');

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const text = await onCopy();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable — silent fail
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/10">
      <button
        onClick={handleCopy}
        className="min-h-[44px] text-xs bg-white/10 hover:bg-white/20 rounded-lg transition flex items-center justify-center gap-1.5"
        style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8 }}
      >
        {copied ? `✓ ${ui('copied')}` : `📋 ${ui('copy')}`}
      </button>
      <button
        onClick={handleClose}
        className="min-h-[44px] text-xs bg-white/10 hover:bg-white/20 rounded-lg transition flex items-center justify-center gap-1.5"
        style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8 }}
      >
        ✕ {ui('close')}
      </button>
    </div>
  );
}
