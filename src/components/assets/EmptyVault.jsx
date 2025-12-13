import React from 'react';

/**
 * Component: EmptyVault
 * A purely presentational SVG component.
 * Displays an empty, dark vault to represent the "Bust" (Goat/Zonk).
 * Uses dark colors and "cobweb" lines to imply emptiness.
 */
export const EmptyVault = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full opacity-80">
    <defs>
      <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#94A3B8" />
        <stop offset="50%" stopColor="#475569" />
        <stop offset="100%" stopColor="#1E293B" />
      </linearGradient>
    </defs>
    
    {/* Empty Vault / Safe Interior */}
    <rect x="20" y="20" width="160" height="160" rx="10" fill="#0F172A" stroke="#334155" strokeWidth="4" />
    
    {/* Cobwebs / Dust */}
    <path d="M20 20 L60 60" stroke="#334155" strokeWidth="2" />
    <path d="M180 20 L140 60" stroke="#334155" strokeWidth="2" />
    <path d="M20 180 L60 140" stroke="#334155" strokeWidth="2" />
    <path d="M180 180 L140 140" stroke="#334155" strokeWidth="2" />
    
    {/* Big Red X or "BUST" text */}
    <text x="100" y="110" textAnchor="middle" fill="#EF4444" fontSize="40" fontWeight="bold" fontFamily="sans-serif" style={{ textShadow: '0 0 10px #7F1D1D' }}>BUST</text>
    <text x="100" y="140" textAnchor="middle" fill="#94A3B8" fontSize="14" fontFamily="sans-serif">EMPTY VAULT</text>
  </svg>
);
