'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  children: ReactNode;
  content: ReactNode;
}

export default function Tooltip({ children, content }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const ui = useTranslations('ui');

  const show = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setIsVisible(true);
  };

  const scheduleHide = () => {
    if (isPinned) return;
    hideTimeout.current = setTimeout(() => setIsVisible(false), 200);
  };

  const handleClick = () => {
    if (!isPinned) {
      setIsPinned(true);
      setIsVisible(true);
    }
  };

  useEffect(() => {
    if (!isPinned) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current && !containerRef.current.contains(e.target as Node) &&
        tooltipRef.current && !tooltipRef.current.contains(e.target as Node)
      ) {
        setIsPinned(false);
        setIsVisible(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isPinned]);

  const handleCopy = async () => {
    const el = tooltipRef.current;
    if (!el) return;
    const text = el.innerText;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClose = () => {
    setIsPinned(false);
    setIsVisible(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={scheduleHide}
      onClick={handleClick}
    >
      {children}

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-[500] ${isPinned ? '' : 'pointer-events-none'}`}
          onMouseEnter={show}
          onMouseLeave={scheduleHide}
        >
          <div className={`bg-gray-900/95 backdrop-blur text-white text-xs rounded-lg px-4 py-3 shadow-2xl border ${isPinned ? 'border-yellow-400/50' : 'border-white/10'} min-w-[220px] max-w-[340px] select-text`}>
            {content}
            {isPinned && (
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                <button
                  onClick={handleCopy}
                  className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition flex items-center gap-1"
                >
                  {copied ? `✓ ${ui('copied')}` : `📋 ${ui('copy')}`}
                </button>
                <button
                  onClick={handleClose}
                  className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition"
                >
                  ✕ {ui('close')}
                </button>
              </div>
            )}
          </div>
          {!isPinned && (
            <p className="text-center text-[9px] text-white/40 mt-1">{ui('clickToPin')}</p>
          )}
        </div>
      )}
    </div>
  );
}
