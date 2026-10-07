import React from 'react';

// Logo en SVG: se ve nítido en cualquier tamaño y se adapta al color del header.
const Logo = ({ className = '' }) => (
  <span className={`flex items-center gap-2.5 ${className}`}>
    <svg viewBox="0 0 40 40" className="h-9 w-9 md:h-10 md:w-10" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#fff" />
      <path d="M10 19.5 20 11l10 8.5" fill="none" stroke="#1f3b66" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5 17.5V29h13V17.5" fill="none" stroke="#1f3b66" strokeWidth="2.6" strokeLinejoin="round" />
      <rect x="17.5" y="22" width="5" height="7" rx="1" fill="#1f3b66" />
    </svg>
    <span className="leading-none text-white">
      <span className="block text-lg font-bold tracking-tight md:text-xl">Inmobiliaria</span>
      <span className="block text-[11px] font-medium uppercase tracking-[0.25em] text-blue-100">SA</span>
    </span>
  </span>
);

export default Logo;
