import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  RocketLaunchIcon,
  InformationCircleIcon,
  SparklesIcon,
  NewspaperIcon,
  EnvelopeIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';
import { ThemeContext } from '../context/ThemeContext.jsx';

export default function HUDNavigation() {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  if (location.pathname === '/') return null;

  const jediColor = '#50b8ff';
  const sithColor = '#ff4050';
  const accentColor = theme === 'jedi' ? jediColor : sithColor;

  const items = [
    { to: '/projects', icon: RocketLaunchIcon, label: 'Projects' },
    { to: '/about', icon: InformationCircleIcon, label: 'About' },
    { to: '/skill-tree', icon: SparklesIcon, label: 'Skills' },
    { to: '/cycling', icon: ClipboardDocumentIcon, label: 'Cycling' },
    { to: '/blog', icon: NewspaperIcon, label: 'Blog' },
    { to: '/contact', icon: EnvelopeIcon, label: 'Contact' },
  ];

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 group cursor-default"
      style={{ width: '12rem', height: '5rem' }} // Bigger hover area
      aria-label="HUD Navigation Wrapper"
    >
      {/* Hover zone and nav are siblings inside this container */}
      {/* The hover zone covers the entire container */}
      <div className="absolute inset-0" />

            {/* Persistent HUD Trigger */}
      <button
        className={`
          absolute left-1/2 bottom-3 -translate-x-1/2 z-20
          flex flex-col items-center
          p-1 rounded-full transition-shadow
          shadow-[0_0_16px_4px] 
        `}
        style={{
          background: 'rgba(0,0,0,0.78)',
          border: `2px solid ${accentColor}`,
          boxShadow: `0 0 12px 4px ${accentColor}b0`,
        }}
        aria-label="Show HUD Navigation"
        tabIndex={0}
      >
        {/* You can use a star, menu, or even a custom SVG! */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle
            cx="14" cy="14" r="9"
            fill={accentColor}
            fillOpacity="0.28"
            stroke={accentColor}
            strokeWidth="1.5"
          />
          <circle
            cx="14" cy="14" r="3"
            fill={accentColor}
            stroke={accentColor}
            strokeWidth="2"
          />
        </svg>
        {/* Optional: small text label for clarity */}
        <span
          className="text-[11px] mt-1 font-bold select-none"
          style={{ color: accentColor, textShadow: `0 0 8px ${accentColor}` }}
        >
          HUD
        </span>
      </button>


      {/* Nav appears when either hover zone or nav itself is hovered */}
      <nav
        className={`absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-6 rounded-full bg-black/40 p-3 shadow-inner backdrop-blur-md
          opacity-0 pointer-events-none
          group-hover:opacity-100 group-hover:pointer-events-auto
          transition-opacity duration-500 ease-in-out
        `}
        style={{
          boxShadow: `0 0 15px 4px ${accentColor}aa`,
          border: `1.5px solid ${accentColor}cc`,
          width: 'max-content',
          whiteSpace: 'nowrap',
        }}
        aria-label="HUD Navigation"
      >
        {items.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`group flex flex-col items-center justify-center rounded-full p-2 text-xs transition-transform focus:outline-none
                ${isActive ? 'scale-110' : 'hover:scale-105'}
              `}
              aria-current={isActive ? 'page' : undefined}
              style={{
                color: isActive ? accentColor : 'inherit',
                filter: isActive ? `drop-shadow(0 0 6px ${accentColor})` : undefined,
                textShadow: isActive ? `0 0 8px ${accentColor}` : undefined,
              }}
            >
              <Icon
                className="h-6 w-6"
                style={{
                  strokeWidth: 1.5,
                  filter: isActive ? `drop-shadow(0 0 6px ${accentColor})` : undefined,
                }}
              />
              <span className="mt-1 hidden text-[10px] font-medium md:block select-none">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
