import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';

function YodaIcon(props) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" {...props}>
      <ellipse cx="32" cy="32" rx="26" ry="22" fill="#7fe87c"/>
      <ellipse cx="32" cy="40" rx="16" ry="8" fill="#bfffa7"/>
      <ellipse cx="18" cy="20" rx="8" ry="3" fill="#a7ffb5" />
      <ellipse cx="46" cy="20" rx="8" ry="3" fill="#a7ffb5" />
      <ellipse cx="32" cy="28" rx="18" ry="15" fill="#bfffa7"/>
      <ellipse cx="26" cy="35" rx="3" ry="4" fill="#2e2e2e"/>
      <ellipse cx="38" cy="35" rx="3" ry="4" fill="#2e2e2e"/>
      <ellipse cx="32" cy="46" rx="4" ry="2" fill="#444" />
    </svg>
  );
}

function DarthVaderIcon(props) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" {...props}>
      <ellipse cx="32" cy="40" rx="22" ry="16" fill="#212121"/>
      <ellipse cx="32" cy="25" rx="15" ry="18" fill="#373737"/>
      <ellipse cx="32" cy="28" rx="12" ry="15" fill="#212121"/>
      <ellipse cx="24" cy="34" rx="2" ry="4" fill="#ccc"/>
      <ellipse cx="40" cy="34" rx="2" ry="4" fill="#ccc"/>
      <ellipse cx="32" cy="48" rx="7" ry="2" fill="#eee"/>
      <rect x="29" y="44" width="6" height="7" rx="2" fill="#333"/>
      <rect x="24" y="20" width="4" height="4" rx="1" fill="#444"/>
      <rect x="36" y="20" width="4" height="4" rx="1" fill="#444"/>
      {/* Mask lines */}
      <rect x="30" y="37" width="1" height="7" rx="0.5" fill="#ccc"/>
      <rect x="33" y="37" width="1" height="7" rx="0.5" fill="#ccc"/>
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const jediColor = '#50b8ff';
  const sithColor = '#ff4050';
  const accentColor = theme === 'jedi' ? jediColor : sithColor;

  return (
    <button
      onClick={toggleTheme}
      className={`
        fixed right-4 top-4 z-50
        flex flex-col items-center justify-center
        w-12 h-12
        rounded-full
        transition-shadow
        border-2
        backdrop-blur
        hover:scale-110
        shadow-[0_0_14px_4px]
      `}
      style={{
        background: 'rgba(0,0,0,0.85)',
        borderColor: accentColor,
        boxShadow: `0 0 14px 4px ${accentColor}bb`,
        color: accentColor,
      }}
      aria-label="Toggle Theme"
    >
      {theme === 'jedi' ? (
        <YodaIcon className="h-7 w-7" />
      ) : (
        <DarthVaderIcon className="h-7 w-7" />
      )}
      {/* Optional label below */}
      <span
        className="text-[10px] mt-1 font-bold select-none"
        style={{
          color: accentColor,
          textShadow: `0 0 7px ${accentColor}`,
          letterSpacing: 1,
        }}
      >
        {theme === 'jedi' ? "Jedi" : "Sith"}
      </span>
    </button>
  );
}
