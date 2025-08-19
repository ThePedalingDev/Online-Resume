import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';

const JEDI_COLOR = '#50b8ff';
const SITH_COLOR = '#ff4050';

const JEDI_BG =
  'linear-gradient(120deg, rgba(20,40,70,0.58) 0%, rgba(10,26,43,0.82) 85%, rgba(20,40,70,0.67) 100%)';
const SITH_BG =
  'linear-gradient(120deg, rgba(70,30,30,0.58) 0%, rgba(52,7,14,0.85) 85%, rgba(65,22,34,0.7) 100%)';

const scanlines = `
  repeating-linear-gradient(
    to bottom,
    rgba(255,255,255,0.035) 0px,    /* less bright */
    rgba(255,255,255,0.07) 2px,
    transparent 4px,
    transparent 14px
  )
`;

const flickerKeyframes = `
@keyframes holo-flicker {
  0%, 100% { filter: brightness(1) blur(0.4px);}
  7% { filter: brightness(0.96) blur(0.8px);}
  12% { filter: brightness(1.06) blur(0.15px);}  /* less jump */
  21% { filter: brightness(1.03) blur(0.2px);}
  32% { filter: brightness(0.97);}
  43% { filter: brightness(1.08) blur(0.1px);}
  55% { filter: brightness(0.96);}
  66% { filter: brightness(1.05);}
  88% { filter: brightness(0.98) blur(0.25px);}
}
`;

export default function HoloPanel({ children }) {
  const { theme } = useContext(ThemeContext);
  const color = theme === 'jedi' ? JEDI_COLOR : SITH_COLOR;
  const bg = theme === 'jedi' ? JEDI_BG : SITH_BG;

  return (
    <div className="w-full flex items-center justify-center relative z-10">
      <style>{flickerKeyframes}</style>
      <div
        className="relative max-w-5xl w-full mx-auto rounded-2xl p-6 md:p-12 shadow-xl overflow-hidden"
        style={{
          background: `${bg}, ${scanlines}`,
          border: `2.5px solid ${color}80`, // less strong border
          boxShadow: `
            0 0 0 3px ${color}19,
            0 0 28px 2px ${color}44,
            0 0 70px 24px ${color}16
          `,
          animation: "holo-flicker 2.6s infinite linear",
          backdropFilter: "blur(13px) brightness(1.08) saturate(1.2)",
          WebkitBackdropFilter: "blur(13px) brightness(1.08) saturate(1.2)",
        }}
      >
        {/* Top holo beam */}
        <div
          className="absolute left-0 top-0 w-full h-[14px] pointer-events-none"
          style={{
            background: `linear-gradient(180deg,${color}77 0%,transparent 100%)`, // less strong
            filter: 'blur(2px)',
            opacity: 0.15,
          }}
        />
        {/* Bottom holo beam */}
        <div
          className="absolute left-0 bottom-0 w-full h-[22px] pointer-events-none"
          style={{
            background: `linear-gradient(0deg,${color}88 0%,transparent 80%)`, // less strong
            filter: 'blur(4px)',
            opacity: 0.13,
          }}
        />
        {/* Scanlines overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: scanlines,
            opacity: 0.10, // less visible
            mixBlendMode: 'screen'
          }}
        />
        {/* Panel content */}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
