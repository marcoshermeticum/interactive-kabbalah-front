'use client';

import { useTranslations } from 'next-intl';
import { sephirotCorrespondences } from '@/data/correspondences';
import Tooltip from '@/components/Tooltip/Tooltip';
import type { SephirotData } from './types';

interface Props {
  data: SephirotData;
  size?: number;
  translated?: {
    name?: string;
    valor?: string;
    regent?: { title?: string; name?: string; defect?: string };
    world?: { title?: string; aspect?: string };
  };
}

export default function Sephirot({ data, size = 160, translated }: Props) {
  const { colors } = data;
  const ui = useTranslations('ui');

  const name = translated?.name || data.name;
  const valor = translated?.valor || data.valor;
  const regentTitle = translated?.regent?.title || data.regent.title;
  const regentName = translated?.regent?.name || data.regent.name;
  const regentDefect = translated?.regent?.defect || data.regent.defect;
  const worldTitle = translated?.world?.title || data.world?.title;
  const worldAspect = translated?.world?.aspect || data.world?.aspect;

  const cx = 250;
  const cy = 250;
  const uid = `s-${data.name.toLowerCase()}`;

  const tooltipContent = (
    <>
      <p className="font-bold text-sm">{name} — {data.number}</p>
      <p className="text-white/80">{valor}</p>
      <p className="mt-1">{data.icon} ({data.planetName})</p>
      {regentTitle && regentName && (
        <p className="mt-1">🔱 {regentTitle} — {regentName}</p>
      )}
      {regentDefect && regentDefect.trim() && (
        <p className="text-red-300">⚠️ {ui('defect')}: {regentDefect}</p>
      )}
      {worldTitle && <p className="mt-1 text-blue-300">🌍 {worldTitle}</p>}
      {worldAspect && <p className="text-blue-200">{worldAspect}</p>}
      {data.archetypes.length > 0 && (
        <div className="mt-2 pt-1 border-t border-white/10">
          <p className="text-white/60 text-[10px] uppercase tracking-wide">{ui('archetypes')}</p>
          <p className="text-white/90">{data.archetypes.join(', ')}</p>
        </div>
      )}
      {data.minorArcana.length > 0 && (
        <div className="mt-2 pt-1 border-t border-white/10">
          <p className="text-white/60 text-[10px] uppercase tracking-wide">{ui('minorArcana')}</p>
          <ul className="mt-0.5 space-y-0.5">
            {data.minorArcana.map((a, i) => (
              <li key={i} className="text-white/80">🃏 {a}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Correspondences */}
      {(() => {
        const corr = sephirotCorrespondences[data.name.toLowerCase()];
        if (!corr) return null;
        return (
          <div className="mt-2 pt-1 border-t border-white/10 space-y-1">
            {corr.animals.length > 0 && <p className="text-white/80">🐾 {corr.animals.join(', ')}</p>}
            {corr.stones.length > 0 && <p className="text-white/80">💎 {corr.stones.join(', ')}</p>}
            {corr.bodyParts.length > 0 && <p className="text-white/80">🫀 {corr.bodyParts.join(', ')}</p>}
          </div>
        );
      })()}
    </>
  );

  return (
    <Tooltip content={tooltipContent}>
      <div style={{ width: size, height: size }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 500 500"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id={`${uid}-grad-outer`} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor={colors.middle} stopOpacity="0.6" />
              <stop offset="100%" stopColor={colors.outer} />
            </radialGradient>
            <radialGradient id={`${uid}-grad-mid`} cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor={colors.middle} />
              <stop offset="100%" stopColor={colors.outer} stopOpacity="0.9" />
            </radialGradient>
            <radialGradient id={`${uid}-grad-inner`} cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor={colors.inner} stopOpacity="0.8" />
              <stop offset="100%" stopColor={colors.inner} />
            </radialGradient>
            <path id={`${uid}-regent`} d="M 95 210 A 180 180 0 0 1 405 210" fill="none" />
            <path id={`${uid}-name`} d="M 120 235 A 145 145 0 0 1 380 235" fill="none" />
            <path id={`${uid}-valor`} d="M 125 275 A 140 140 0 0 0 375 275" fill="none" />
            <path id={`${uid}-world`} d="M 90 290 A 175 175 0 0 0 410 290" fill="none" />
          </defs>

          {/* Outer armored ring — double border for "board game" feel */}
          <circle cx={cx} cy={cy} r={230} fill="none" stroke={colors.stroke} strokeWidth="3" strokeOpacity="0.3" />
          <circle cx={cx} cy={cy} r={220} fill={`url(#${uid}-grad-outer)`} stroke={colors.stroke} strokeWidth="5" />
          <circle cx={cx} cy={cy} r={215} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          
          {/* Middle ring — defined border */}
          <circle cx={cx} cy={cy} r={168} fill={`url(#${uid}-grad-mid)`} stroke={colors.stroke} strokeWidth="3.5" strokeOpacity="0.8" />
          <circle cx={cx} cy={cy} r={163} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          
          {/* Inner core — solid presence */}
          <circle cx={cx} cy={cy} r={108} fill={`url(#${uid}-grad-inner)`} stroke={colors.stroke} strokeWidth="3" strokeOpacity="0.7" />
          <circle cx={cx} cy={cy} r={104} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

          <text x={cx} y={cy - 12} textAnchor="middle" dominantBaseline="central" fill={colors.text} fontSize="78" fontFamily="Arial, sans-serif">{data.icon}</text>
          <text x={cx} y={cy + 48} textAnchor="middle" dominantBaseline="central" fill={colors.text} fontSize="34" fontFamily="Arial, sans-serif" opacity="0.9">{data.number}</text>

          {regentTitle && regentName && (
            <text fill={colors.text} fontSize="17" fontFamily="Arial, sans-serif" letterSpacing="1" opacity="0.8" fontStyle="italic">
              <textPath href={`#${uid}-regent`} startOffset="50%" textAnchor="middle">{regentTitle} - {regentName}</textPath>
            </text>
          )}
          <text fill={colors.text} fontSize="30" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="2">
            <textPath href={`#${uid}-name`} startOffset="50%" textAnchor="middle">{name}</textPath>
          </text>
          <text fill={colors.text} fontSize="22" fontFamily="Arial, sans-serif" letterSpacing="1.5" opacity="0.85">
            <textPath href={`#${uid}-valor`} startOffset="50%" textAnchor="middle">{valor}</textPath>
          </text>
          {worldAspect && (
            <text fill={colors.text} fontSize="16" fontFamily="Arial, sans-serif" letterSpacing="1" opacity="0.65">
              <textPath href={`#${uid}-world`} startOffset="50%" textAnchor="middle">{worldAspect}</textPath>
            </text>
          )}
        </svg>
      </div>
    </Tooltip>
  );
}
