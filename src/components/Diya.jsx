import React from 'react';
import { playDiyaLightSound } from '../utils/soundEffects';

export const DIYA_STYLES = {
  TERRACOTTA: {
    id: 'terracotta',
    name: 'Clay Mitti Diya',
    bodyColor: '#A0522D',
    rimColor: '#D2691E',
    patternColor: '#F5C75E',
  },
  GOLDEN_ROYAL: {
    id: 'golden',
    name: 'Royal Brass Diya',
    bodyColor: '#D4AF37',
    rimColor: '#F5C75E',
    patternColor: '#FFF4DD',
  },
  PEACOCK: {
    id: 'peacock',
    name: 'Mayur Teal Diya',
    bodyColor: '#005F73',
    rimColor: '#0A9396',
    patternColor: '#E9D8A6',
  },
  KUNDAN_RUBY: {
    id: 'ruby',
    name: 'Kundan Ruby Diya',
    bodyColor: '#9B2226',
    rimColor: '#AE2012',
    patternColor: '#F5C75E',
  },
  PURPLE_MAJESTY: {
    id: 'purple',
    name: 'Shahi Royal Diya',
    bodyColor: '#3C096C',
    rimColor: '#5A189A',
    patternColor: '#FFD166',
  },
};

export default function Diya({
  isLit = false,
  onToggle,
  styleKey = 'TERRACOTTA',
  name = '',
  size = 'md', // sm, md, lg, xl
  interactive = true,
}) {
  const currentStyle = DIYA_STYLES[styleKey] || DIYA_STYLES.TERRACOTTA;

  const sizeClasses = {
    sm: 'w-16 h-14',
    md: 'w-24 h-20',
    lg: 'w-36 h-28',
    xl: 'w-48 h-36',
  };

  const handleClick = () => {
    if (!interactive) return;
    if (!isLit) {
      playDiyaLightSound();
    }
    if (onToggle) {
      onToggle(!isLit);
    }
  };

  return (
    <div className="flex flex-col items-center select-none group">
      <div
        onClick={handleClick}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={isLit ? "Extinguish Diya" : "Light Diya"}
        onKeyDown={(e) => {
          if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleClick();
          }
        }}
        className={`relative ${sizeClasses[size]} flex items-center justify-center transition-transform ${
          interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
        }`}
      >
        {/* Flame Graphic */}
        {isLit && (
          <div className="absolute -top-7 md:-top-9 flex flex-col items-center pointer-events-none animate-flame z-20">
            {/* Outer Aura Glow */}
            <div className="absolute w-12 h-14 bg-amber-400/30 rounded-full blur-md -top-2" />
            
            {/* SVG Realistic Flame */}
            <svg
              className="w-7 h-10 md:w-9 md:h-12 overflow-visible"
              viewBox="0 0 100 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="flameInner" cx="50%" cy="80%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#FFF4DD" />
                  <stop offset="70%" stopColor="#F5C75E" />
                  <stop offset="100%" stopColor="#F28C28" />
                </radialGradient>
                <radialGradient id="flameOuter" cx="50%" cy="80%" r="70%">
                  <stop offset="0%" stopColor="#F5C75E" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#F28C28" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#E63946" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Flame Outer Corona */}
              <path
                d="M50 0 C 15 50, 10 110, 50 145 C 90 110, 85 50, 50 0 Z"
                fill="url(#flameOuter)"
              />
              {/* Flame Core */}
              <path
                d="M50 15 C 25 55, 22 105, 50 135 C 78 105, 75 55, 50 15 Z"
                fill="url(#flameInner)"
              />
              {/* Wick Base Ember */}
              <ellipse cx="50" cy="142" rx="6" ry="3" fill="#3D0000" />
              <rect x="48" y="132" width="4" height="12" rx="2" fill="#1A1A1A" />
            </svg>
          </div>
        )}

        {/* Diya Clay Bowl SVG */}
        <svg
          className="w-full h-full drop-shadow-xl"
          viewBox="0 0 200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Diya Base Shadow */}
          <ellipse cx="100" cy="112" rx="70" ry="8" fill="rgba(0,0,0,0.5)" />

          {/* Diya Body */}
          <path
            d="M20 50 Q 100 120 180 50 Q 150 110 50 110 Z"
            fill={currentStyle.bodyColor}
          />

          {/* Diya Rim Upper Lip */}
          <path
            d="M15 50 C 40 35, 160 35, 185 50 C 170 65, 30 65, 15 50 Z"
            fill={currentStyle.rimColor}
          />

          {/* Wick Spout / Beak */}
          <path
            d="M92 42 L 100 32 L 108 42 Z"
            fill={currentStyle.rimColor}
          />

          {/* Traditional Decorative Floral Dot Ornaments */}
          <circle cx="60" cy="72" r="3.5" fill={currentStyle.patternColor} />
          <circle cx="80" cy="82" r="4" fill={currentStyle.patternColor} />
          <circle cx="100" cy="86" r="4.5" fill={currentStyle.patternColor} />
          <circle cx="120" cy="82" r="4" fill={currentStyle.patternColor} />
          <circle cx="140" cy="72" r="3.5" fill={currentStyle.patternColor} />

          {/* Inner Oil Basin */}
          <ellipse cx="100" cy="50" rx="65" ry="10" fill="rgba(36, 16, 57, 0.4)" />
          {isLit && (
            <ellipse cx="100" cy="50" rx="55" ry="8" fill="rgba(242, 140, 40, 0.55)" />
          )}
        </svg>

        {/* Hover Cue when unlit */}
        {!isLit && interactive && (
          <span className="absolute -bottom-6 text-[10px] text-amber-300/80 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Click to Light
          </span>
        )}
      </div>

      {/* Name Label */}
      {name && (
        <span className="mt-2 text-xs font-medium px-2 py-0.5 rounded-full bg-[#241039]/80 border border-[#F5C75E]/40 text-[#FFF4DD] shadow max-w-[130px] truncate">
          {name}
        </span>
      )}
    </div>
  );
}

