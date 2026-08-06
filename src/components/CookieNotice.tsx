'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kabbalah-cookie-notice-dismissed';

/**
 * Minimal cookie/localStorage notice for LGPD compliance.
 * Only shows once — disappears permanently after dismissal.
 * Non-intrusive: small bar at the bottom, matches site visual identity.
 */
export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) setVisible(true);
    } catch {
      // localStorage unavailable — don't show
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {}
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[1000] px-4 py-2 flex items-center justify-center gap-3 text-xs"
      style={{
        background: 'rgba(10, 10, 20, 0.92)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(139, 92, 246, 0.15)',
        color: 'rgba(255, 255, 255, 0.5)',
      }}
    >
      <span>
        Este site usa armazenamento local para salvar suas preferências (tema, visualização). Nenhum dado pessoal é coletado.
      </span>
      <button
        onClick={dismiss}
        className="px-3 py-1 rounded text-xs transition-colors"
        style={{
          background: 'rgba(124, 58, 237, 0.2)',
          border: '1px solid rgba(124, 58, 237, 0.3)',
          color: '#c4b5fd',
        }}
      >
        OK
      </button>
    </div>
  );
}
