'use client';

import { useState } from 'react';
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
  const [showTooltip, setShowTooltip] = useState(false);
  const { colors } = data;

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

  return (
    <div
      className="relative group cursor-pointer"
      style={{ width: size, height: size }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Radial gradients for depth */}
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

          {/* Regent path — tight arc at top between outer and middle ring */}
          <path
            id={`${uid}-regent`}
            d="M 95 210 A 180 180 0 0 1 405 210"
            fill="none"
          />
          {/* Name path — arc just above middle ring */}
          <path
            id={`${uid}-name`}
            d="M 120 235 A 145 145 0 0 1 380 235"
            fill="none"
          />
          {/* Valor path — arc below middle ring */}
          <path
            id={`${uid}-valor`}
            d="M 125 275 A 140 140 0 0 0 375 275"
            fill="none"
          />
          {/* World/aspect path — arc at bottom outer ring */}
          <path
            id={`${uid}-world`}
            d="M 90 290 A 175 175 0 0 0 410 290"
            fill="none"
          />
        </defs>

        {/* Outer ring with gradient */}
        <circle
          cx={cx} cy={cy} r={220}
          fill={`url(#${uid}-grad-outer)`}
          stroke={colors.stroke}
          strokeWidth="4"
        />
        {/* Middle ring with gradient */}
        <circle
          cx={cx} cy={cy} r={168}
          fill={`url(#${uid}-grad-mid)`}
          stroke={colors.stroke}
          strokeWidth="2.5"
          strokeOpacity="0.6"
        />
        {/* Inner circle with gradient */}
        <circle
          cx={cx} cy={cy} r={108}
          fill={`url(#${uid}-grad-inner)`}
          stroke={colors.stroke}
          strokeWidth="2"
          strokeOpacity="0.5"
        />

        {/* Planet icon — centered vertically slightly above center */}
        <text
          x={cx}
          y={cy - 12}
          textAnchor="middle"
          dominantBaseline="central"
          fill={colors.text}
          fontSize="78"
          fontFamily="Arial, sans-serif"
        >
          {data.icon}
        </text>

        {/* Number — directly below icon, centered */}
        <text
          x={cx}
          y={cy + 48}
          textAnchor="middle"
          dominantBaseline="central"
          fill={colors.text}
          fontSize="34"
          fontFamily="Arial, sans-serif"
          opacity="0.9"
        >
          {data.number}
        </text>

        {/* Regent text — curved at very top */}
        {regentTitle && regentName && (
          <text
            fill={colors.text}
            fontSize="17"
            fontFamily="Arial, sans-serif"
            letterSpacing="1"
            opacity="0.8"
            fontStyle="italic"
          >
            <textPath href={`#${uid}-regent`} startOffset="50%" textAnchor="middle">
              {regentTitle} - {regentName}
            </textPath>
          </text>
        )}

        {/* Sephirot name — curved above center area */}
        <text
          fill={colors.text}
          fontSize="30"
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          letterSpacing="2"
        >
          <textPath href={`#${uid}-name`} startOffset="50%" textAnchor="middle">
            {name}
          </textPath>
        </text>

        {/* Valor — curved below center area */}
        <text
          fill={colors.text}
          fontSize="22"
          fontFamily="Arial, sans-serif"
          letterSpacing="1.5"
          opacity="0.85"
        >
          <textPath href={`#${uid}-valor`} startOffset="50%" textAnchor="middle">
            {valor}
          </textPath>
        </text>

        {/* World aspect — curved at very bottom */}
        {worldAspect && (
          <text
            fill={colors.text}
            fontSize="16"
            fontFamily="Arial, sans-serif"
            letterSpacing="1"
            opacity="0.65"
          >
            <textPath href={`#${uid}-world`} startOffset="50%" textAnchor="middle">
              {worldAspect}
            </textPath>
          </text>
        )}
      </svg>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-[100] pointer-events-none">
          <div className="bg-gray-900/95 backdrop-blur text-white text-xs rounded-lg px-4 py-3 shadow-xl border border-white/10 whitespace-nowrap min-w-[200px]">
            <p className="font-bold text-sm">{name} — {data.number}</p>
            <p className="text-white/80 mb-1">{valor}</p>
            {regentTitle && regentName && (
              <p className="mt-1">🔱 {regentTitle} — {regentName}</p>
            )}
            {regentDefect && regentDefect.trim() && (
              <p className="text-red-300">⚠️ Defeito: {regentDefect}</p>
            )}
            {worldTitle && <p className="mt-1 text-blue-300">🌍 {worldTitle}</p>}
            {worldAspect && <p className="text-blue-200">{worldAspect}</p>}
            <p className="mt-1 text-white/50">Planeta: {data.icon}</p>
          </div>
        </div>
      )}
    </div>
  );
}
