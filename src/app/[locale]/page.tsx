'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import DraggableArea from '@/components/DraggableArea/DraggableArea';
import KabbalahTree from '@/components/KabbalahTree/KabbalahTree';
import QliphothTree from '@/components/QliphothTree/QliphothTree';
import CombinedTree from '@/components/CombinedTree/CombinedTree';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Search from '@/components/Search/Search';

export default function HomePage() {
  const [view, setView] = useState<'life' | 'death' | 'both'>('life');
  const [showVeils, setShowVeils] = useState(true);
  const [showPillars, setShowPillars] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const ui = useTranslations('ui');

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header
        className="shrink-0 z-50 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-3"
        style={{ background: 'var(--header-bg)', borderBottom: '1px solid var(--border)' }}
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center">
            <span className="text-white text-sm sm:text-base">✡</span>
          </div>
          <h1
            className="text-base sm:text-lg md:text-xl font-semibold tracking-tight"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--header-text)' }}
          >
            {ui('title')}
          </h1>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* View switcher */}
          <nav className="flex items-center rounded-full p-1" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {(['life', 'death', 'both'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full transition-all duration-200 font-medium whitespace-nowrap ${
                  view === v
                    ? v === 'death'
                      ? 'bg-red-900/40 text-red-200 shadow-sm'
                      : v === 'both'
                        ? 'bg-purple-900/40 text-purple-200 shadow-sm'
                        : 'bg-white/15 text-white shadow-sm'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {v === 'life' && '🌳'} {v === 'death' && '💀'} {v === 'both' && '☯'}
                <span className="hidden sm:inline ml-1">{ui(v)}</span>
              </button>
            ))}
          </nav>

          {/* Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Search />
            {/* Settings button */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-200 text-white/50 hover:text-white"
              aria-label="Settings"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            {/* Donation button */}
            <button
              onClick={() => setShowDonation(!showDonation)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-200 text-white/50 hover:text-amber-300"
              aria-label="Donate"
              title="Buy me a therapy session ☕"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>
            <ThemeToggle />
            <LanguageSelector />
          </div>

          {/* Social — desktop only */}
          <div className="hidden md:flex items-center gap-2 ml-1 pl-3" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
            <SocialLink href="https://github.com/mrviniciux" label="GitHub" icon={<GithubIcon />} />
            <SocialLink href="https://linkedin.com/in/mrviniciux" label="LinkedIn" icon={<LinkedInIcon />} />
            <SocialLink href="https://instagram.com/mrviniciux" label="Instagram" icon={<InstagramIcon />} />
          </div>
        </div>
      </header>

      {/* Settings panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 z-[600] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 w-[260px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>Configurações</h3>
            <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-sm">✕</button>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700 dark:text-gray-300">Exibir Véus</span>
              <input
                type="checkbox"
                checked={showVeils}
                onChange={(e) => setShowVeils(e.target.checked)}
                className="w-4 h-4 accent-amber-600 rounded"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700 dark:text-gray-300">Exibir Pilares</span>
              <input
                type="checkbox"
                checked={showPillars}
                onChange={(e) => setShowPillars(e.target.checked)}
                className="w-4 h-4 accent-amber-600 rounded"
              />
            </label>
          </div>
        </div>
      )}

      {/* Donation panel */}
      {showDonation && (
        <div className="absolute top-16 right-4 z-[600] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-5 w-[300px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>Buy me a therapy session 🧘</h3>
            <button onClick={() => setShowDonation(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-sm">✕</button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Se este projeto te ajudou na jornada, considere apoiar com qualquer valor via PIX.
          </p>
          {/* QR Code PIX — generated as SVG */}
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <PixQRCode />
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Chave PIX (telefone):</p>
              <button
                onClick={() => { navigator.clipboard.writeText('48991913318'); }}
                className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                title="Clique para copiar"
              >
                48991913318 📋
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-1">
              Qualquer valor é bem-vindo. Obrigado! 🙏
            </p>
          </div>
        </div>
      )}

      {/* Canvas */}
      <main className="flex-1 relative">
        <DraggableArea>
          {view === 'life' && <KabbalahTree showVeils={showVeils} showPillars={showPillars} />}
          {view === 'death' && <QliphothTree />}
          {view === 'both' && <CombinedTree />}
        </DraggableArea>
      </main>
    </div>
  );
}

/* --- Sub-components --- */

function PixQRCode() {
  // Simple visual placeholder for PIX QR code
  // In production, generate a real PIX QR code using the payload standard
  // For now, using a visual representation that communicates the intent
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
      {/* PIX logo stylized */}
      <rect width="140" height="140" fill="white" rx="4" />
      {/* Border pattern suggesting QR code */}
      <rect x="10" y="10" width="30" height="30" rx="2" fill="#333" />
      <rect x="14" y="14" width="22" height="22" rx="1" fill="white" />
      <rect x="18" y="18" width="14" height="14" rx="1" fill="#333" />
      
      <rect x="100" y="10" width="30" height="30" rx="2" fill="#333" />
      <rect x="104" y="14" width="22" height="22" rx="1" fill="white" />
      <rect x="108" y="18" width="14" height="14" rx="1" fill="#333" />
      
      <rect x="10" y="100" width="30" height="30" rx="2" fill="#333" />
      <rect x="14" y="104" width="22" height="22" rx="1" fill="white" />
      <rect x="18" y="108" width="14" height="14" rx="1" fill="#333" />
      
      {/* PIX diamond icon in center */}
      <g transform="translate(70, 70)">
        <path d="M-12 0L0-12L12 0L0 12Z" fill="#32BCAD" />
        <path d="M-6 0L0-6L6 0L0 6Z" fill="white" />
        <path d="M-3 0L0-3L3 0L0 3Z" fill="#32BCAD" />
      </g>
      
      {/* Data pattern (decorative) */}
      {[45, 50, 55, 60, 65, 80, 85, 90].map((x) => 
        [45, 50, 55, 60, 65, 80, 85, 90].map((y) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" fill={(x + y) % 10 === 0 ? '#333' : 'transparent'} />
        ))
      )}
      
      {/* Text */}
      <text x="70" y="135" textAnchor="middle" fontSize="8" fill="#666" fontFamily="Inter, sans-serif">PIX: 48991913318</text>
    </svg>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
      aria-label={label}
    >
      {icon}
    </a>
  );
}

function GithubIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>;
}

function LinkedInIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
}

function InstagramIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>;
}
