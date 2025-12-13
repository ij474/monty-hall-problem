import React from 'react';

export const CashStack = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FCD34D" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Stack of Cash / Gold Bars */}
    <g filter="url(#glow)">
      {/* Bottom Bar */}
      <path d="M40 140 L160 140 L180 120 L60 120 Z" fill="url(#goldGradient)" stroke="#78350F" strokeWidth="2" />
      <rect x="40" y="140" width="120" height="20" fill="#D97706" stroke="#78350F" strokeWidth="2" />
      <path d="M160 140 L180 120 L180 140 L160 160 Z" fill="#92400E" stroke="#78350F" strokeWidth="2" />
      
      {/* Middle Bar */}
      <path d="M40 110 L160 110 L180 90 L60 90 Z" fill="url(#goldGradient)" stroke="#78350F" strokeWidth="2" />
      <rect x="40" y="110" width="120" height="20" fill="#D97706" stroke="#78350F" strokeWidth="2" />
      <path d="M160 110 L180 90 L180 110 L160 130 Z" fill="#92400E" stroke="#78350F" strokeWidth="2" />

      {/* Top Bar */}
      <path d="M40 80 L160 80 L180 60 L60 60 Z" fill="url(#goldGradient)" stroke="#78350F" strokeWidth="2" />
      <rect x="40" y="80" width="120" height="20" fill="#D97706" stroke="#78350F" strokeWidth="2" />
      <path d="M160 80 L180 60 L180 80 L160 100 Z" fill="#92400E" stroke="#78350F" strokeWidth="2" />
      
      {/* Sparkles */}
      <circle cx="50" cy="50" r="5" fill="white" className="animate-pulse" />
      <circle cx="150" cy="100" r="3" fill="white" className="animate-pulse delay-75" />
      <circle cx="100" cy="150" r="4" fill="white" className="animate-pulse delay-150" />
    </g>
    
    <text x="100" y="190" textAnchor="middle" fill="#FCD34D" fontSize="24" fontWeight="bold" fontFamily="sans-serif">WINNER</text>
  </svg>
);
