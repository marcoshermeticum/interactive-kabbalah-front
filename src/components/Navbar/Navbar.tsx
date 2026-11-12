'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Search from '@/components/Search/Search';
import type { SearchResult } from '@/data/searchIndex';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import NotificationButton from '@/components/Notifications/NotificationButton';
import NotificationDialog from '@/components/Notifications/NotificationDialog';
import OrientationGuideDialog from '@/components/Notifications/OrientationGuideDialog';
import { useVakinhaCampaignDialog } from '@/components/Notifications/VakinhaCampaignProvider';
import { useNotificationState } from '@/hooks/useNotificationState';
import { notifications } from '@/data/notifications';

type Props =
  | {
      variant: 'catalog';
    }
  | {
      variant?: 'tree';
      view: 'life' | 'death' | 'both';
      onViewChange: (view: 'life' | 'death' | 'both') => void;
      showVeils: boolean;
      onShowVeilsChange: (v: boolean) => void;
      showPillars: boolean;
      onShowPillarsChange: (v: boolean) => void;
      onSearchSelect?: (result: SearchResult) => void;
    };

const BRAND_TITLE = 'Interactive Kabbalah';

export default function Navbar(props: Props) {
  const variant = props.variant ?? 'tree';
  const treeProps = props.variant === 'catalog' ? null : props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const ui = useTranslations('ui');
  const portal = useTranslations('portal');

  const { unreadCount, readIds, markAsRead, isGuideRead, markGuideRead } = useNotificationState(notifications);

  const { openDialog: openVakinhaCampaign } = useVakinhaCampaignDialog();

  const totalUnread = unreadCount + (isGuideRead ? 0 : 1);

  const handleOpenGuide = () => {
    setIsNotificationDialogOpen(false);
    setIsGuideOpen(true);
    markGuideRead();
  };

  const handleNotificationAction = (id: string) => {
    if (id === 'vakinha-campaign-v1') {
      setIsNotificationDialogOpen(false);
      openVakinhaCampaign();
    }
  };

  const handleGuideClose = () => {
    setIsGuideOpen(false);
  };

  const handleNotificationDialogClose = () => {
    setIsNotificationDialogOpen(false);
  };

  // Close sidebar on Escape
  useEffect(() => {
    if (!sidebarOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSidebarOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [sidebarOpen]);

  return (
    <>
      {/* === TOP BAR === */}
      <header
        className="shrink-0 z-50 px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-2"
        style={{ background: 'var(--header-bg)', borderBottom: '1px solid var(--border)' }}
      >
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-2 min-w-0 no-underline">
          <div className="shrink-0 flex items-center justify-center">
            <img src="/mrviniciux.png" alt="" className="h-7 sm:h-8 w-auto object-contain" />
          </div>
          <h1
            className="text-sm sm:text-base md:text-lg font-semibold tracking-tight truncate"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--header-text)' }}
          >
            {ui('title')}
          </h1>
        </Link>

        {/* Right: logo/title stay left; only notifications, theme, language and menu are always visible */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {treeProps && <Search onSelectResult={treeProps.onSearchSelect} />}
          <NotificationButton
            unreadCount={totalUnread}
            onClick={() => setIsNotificationDialogOpen(true)}
          />
          <ThemeToggle />
          <LanguageSelector />

          {/* Hamburger — opens the menu with everything else */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all text-white/50 hover:text-white"
            aria-label={ui('menu')}
            aria-haspopup="dialog"
            aria-expanded={sidebarOpen}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
        {/* Donation panel (desktop) */}
        {showDonation && <DonationPanel onClose={() => setShowDonation(false)} />}
      </header>

      {/* === MOBILE SIDEBAR — slides from right === */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[800]" role="dialog" aria-modal="true" aria-label={ui('menu')}>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar panel */}
          <div
            ref={sidebarRef}
            className="absolute right-0 top-0 bottom-0 w-[280px] max-w-[85vw] bg-gray-950/98 backdrop-blur-xl border-l border-white/10 shadow-2xl animate-slideInRight overflow-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-sm font-semibold text-white/90" style={{ fontFamily: 'var(--font-heading)' }}>{ui('menu')}</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="p-4 space-y-5">
              {/* Pages — same destinations as the landing page */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3 font-medium">{portal('navPortals')}</p>
                <nav className="space-y-1">
                  <Link href="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-sm text-white/80 no-underline">
                    <span aria-hidden="true">🏠</span>
                    <span>{portal('brand')}</span>
                  </Link>
                  <Link href="/tree" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-sm text-white/80 no-underline">
                    <span aria-hidden="true">🌳</span>
                    <span>{portal('filterKabbalah')} - {portal('cards.treeOfLife.title')}</span>
                  </Link>
                  <Link href="/tarot" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-sm text-white/80 no-underline">
                    <span aria-hidden="true">🃏</span>
                    <span>{portal('cards.tarotWaite.title')}</span>
                  </Link>
                  <Link href="/alchemical-symbols" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-sm text-white/80 no-underline">
                    <span aria-hidden="true">⚗️</span>
                    <span>{portal('cards.alchemicalSymbols.title')}</span>
                  </Link>
                </nav>
              </div>

              {/* Tree view (hidden on mobile: the bottom tab bar already has it) */}
              {treeProps && <div className="hidden sm:block">
                <div className="grid grid-cols-3 gap-1">
                  {(['life', 'death', 'both'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => { treeProps.onViewChange(v); setSidebarOpen(false); }}
                      aria-pressed={treeProps.view === v}
                      className={`flex flex-col items-center gap-0.5 py-2 rounded-xl text-xs transition ${
                        treeProps.view === v ? 'bg-white/15 text-white' : 'text-white/50 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-lg">{v === 'life' ? '🌳' : v === 'death' ? '💀' : '☯'}</span>
                      <span>{ui(v)}</span>
                    </button>
                  ))}
                </div>
              </div>}

              {/* Settings */}
              {treeProps && <div>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3 font-medium">{ui('settings')}</p>
                <div className="space-y-2">
                  <label className="flex items-center justify-between px-1 py-1.5 cursor-pointer">
                    <span className="text-sm text-white/80">{ui('showVeils')}</span>
                    <ToggleSwitch checked={treeProps.showVeils} onChange={treeProps.onShowVeilsChange} />
                  </label>
                  <label className="flex items-center justify-between px-1 py-1.5 cursor-pointer">
                    <span className="text-sm text-white/80">{ui('showPillars')}</span>
                    <ToggleSwitch checked={treeProps.showPillars} onChange={treeProps.onShowPillarsChange} />
                  </label>
                </div>
              </div>}
              {/* Links */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3 font-medium">{ui('links')}</p>
                <div className="space-y-1">
                  <SidebarLink href="https://github.com/mrviniciux" icon={<GithubIcon />} label="GitHub" subtitle="@mrviniciux" />
                  <SidebarLink href="https://linkedin.com/in/mrviniciux" icon={<LinkedInIcon />} label="LinkedIn" subtitle="@mrviniciux" />
                  <SidebarLink href="https://instagram.com/mrviniciux" icon={<InstagramIcon />} label="Instagram" subtitle="@mrviniciux" />
                </div>
              </div>

              {/* Donation */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3 font-medium">{ui('support')}</p>
                <button
                  onClick={() => { setShowDonation(true); setSidebarOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-amber-900/20 border border-amber-700/30 hover:bg-amber-900/30 transition text-sm text-amber-200"
                >
                  <span className="text-lg">❤️</span>
                  <div className="text-left">
                    <span className="block font-medium">{ui('vakinhaLink')}</span>
                    <span className="text-[11px] text-amber-300/60">Vakinha</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === MOBILE BOTTOM TAB BAR === */}
      {treeProps && <nav
        className="sm:hidden fixed bottom-0 inset-x-0 z-50 flex items-center justify-center gap-1 px-4 py-2 safe-area-bottom"
        style={{ background: 'var(--header-bg)', borderTop: '1px solid var(--border)' }}
      >
        {(['life', 'death', 'both'] as const).map((v) => (
          <button
            key={v}
            onClick={() => treeProps.onViewChange(v)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-xl transition-all duration-200 ${
              treeProps.view === v
                ? v === 'death'
                  ? 'bg-red-900/30 text-red-200'
                  : v === 'both'
                    ? 'bg-purple-900/30 text-purple-200'
                    : 'bg-white/10 text-white'
                : 'text-white/40'
            }`}
          >
            <span className="text-lg">{v === 'life' ? '🌳' : v === 'death' ? '💀' : '☯'}</span>
            <span className="text-[10px] font-medium">{ui(v)}</span>
          </button>
        ))}
      </nav>}

      {/* Notification Dialog */}
      <NotificationDialog
        isOpen={isNotificationDialogOpen}
        onClose={handleNotificationDialogClose}
        notifications={notifications}
        readIds={readIds}
        onMarkRead={markAsRead}
        onOpenGuide={handleOpenGuide}
        onNotificationAction={handleNotificationAction}
      />

      {/* Orientation Guide Dialog */}
      <OrientationGuideDialog
        isOpen={isGuideOpen}
        onClose={handleGuideClose}
      />

    </>
  );
}

/* --- Sub-components --- */

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
        checked ? 'bg-amber-600' : 'bg-white/20'
      }`}
    >
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

function SidebarLink({ href, icon, label, subtitle }: { href: string; icon: React.ReactNode; label: string; subtitle: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition"
    >
      <span className="text-white/60">{icon}</span>
      <div>
        <span className="text-sm text-white/80 block">{label}</span>
        <span className="text-[11px] text-white/40">{subtitle}</span>
      </div>
    </a>
  );
}

const VAKINHA_URL = "https://www.vakinha.com.br/vaquinha/interactive-kabbalah-redesign-e-plataformizacao";
const VAKINHA_PIX = "6257640@vakinha.com.br";

function DonationPanel({ onClose }: { onClose: () => void }) {
  const ui = useTranslations('ui');
  const [copied, setCopied] = useState(false);
  const [clipboardUnavailable, setClipboardUnavailable] = useState(false);

  const handleCopyPix = async () => {
    try {
      if (!navigator.clipboard) {
        setClipboardUnavailable(true);
        return;
      }
      await navigator.clipboard.writeText(VAKINHA_PIX);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setClipboardUnavailable(true);
    }
  };

  return (
    <div className="absolute top-14 right-4 z-[600] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-5 w-[280px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>Vakinha ☕</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-sm" aria-label={ui('close')}>✕</button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{ui('donate')}</p>
      <a
        href={VAKINHA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition mb-3"
        aria-label={ui('vakinhaLink')}
      >
        {ui('vakinhaLink')} 🔗
      </a>
      <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-3">{ui('vakinhaPurpose')}</p>
      <div className="flex flex-col items-center gap-3">
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{ui('pixKey')}</p>
          {clipboardUnavailable ? (
            <input
              type="text"
              readOnly
              value={VAKINHA_PIX}
              className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-gray-800 dark:text-gray-200 w-full text-center select-all border border-gray-300 dark:border-gray-600"
              onClick={(e) => (e.target as HTMLInputElement).select()}
              aria-label={`${ui('pixKey')} ${VAKINHA_PIX}`}
            />
          ) : (
            <button
              onClick={handleCopyPix}
              className={`text-sm font-mono px-3 py-1.5 rounded-lg transition ${
                copied
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              title={ui('clickToCopy')}
              aria-label={`${ui('clickToCopy')} ${VAKINHA_PIX}`}
            >
              {copied ? `${VAKINHA_PIX} ✓` : `${VAKINHA_PIX} 📋`}
            </button>
          )}
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-1">{ui('donateThank')}</p>
      </div>
    </div>
  );
}

function GithubIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>; }
function LinkedInIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>; }
function InstagramIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>; }
