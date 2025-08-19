import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";
import yodaHologram from "../assets/yoda_hologram.png";
import sithHologram from "../assets/sith_hologram.png";

export default function Hologram() {
  const { theme } = useContext(ThemeContext);
  const src = theme === "jedi" ? yodaHologram : sithHologram;
  const accent = theme === "jedi" ? "#50b8ff" : "#ff4050";

  return (
    <div className="relative mx-auto flex flex-col items-center select-none">
      {/* --- Holo BEAM as an upside-down triangle --- */}
      <div
        className="absolute left-1/2 bottom-[34px] z-0 -translate-x-1/2 pointer-events-none"
        style={{
          width: "140px",    // base width of beam (change as needed)
          height: "112px",   // length of beam (change as needed)
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 140 112" style={{ display: "block" }}>
          <defs>
            <linearGradient id="beamGradient" x1="70" y1="112" x2="70" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={accent} stopOpacity="0.32" />
              <stop offset="68%" stopColor={accent} stopOpacity="0.11" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
            <radialGradient id="beamGlow" cx="50%" cy="80%" r="70%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.32" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Triangle beam */}
          <polygon
            points="0,112 140,112 70,12"
            fill="url(#beamGradient)"
            style={{ filter: `blur(1.2px)` }}
          />
          {/* Soft round glow at base */}
          <ellipse
            cx="70" cy="110" rx="55" ry="15"
            fill="url(#beamGlow)"
            style={{ filter: `blur(3.5px)` }}
          />
        </svg>
      </div>
      {/* --- Pulsing hologram figure --- */}
      <div className="relative z-10 h-32 w-32 md:h-40 md:w-40 flex flex-col items-center">
        <img
          src={src}
          alt="Holographic figure"
          className="h-full w-full object-contain animate-holo-pulse opacity-92 pointer-events-none select-none mix-blend-lighten"
          style={{
            filter: `
              blur(0.25px)
              drop-shadow(0 0 18px ${accent}cc)
              drop-shadow(0 0 40px ${accent}70)
              drop-shadow(0 0 3px #fff9)
            `,
          }}
        />
        {/* Scanline/flicker (optional, subtle) */}
        <div className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%">
            <rect
              y="65%"
              width="100%"
              height="3%"
              fill={accent}
              fillOpacity="0.21"
              className="animate-holo-scan"
            />
          </svg>
        </div>
      </div>
      {/* --- Projector beacon base --- */}
      <div className="relative z-20 -mt-3 h-6 w-24">
        <div
          className="absolute inset-x-0 bottom-1/2 mx-auto h-4 w-2/3 rounded-full"
          style={{
            background: `radial-gradient(ellipse at center, ${accent}99 0%, ${accent}11 75%, transparent 100%)`,
            filter: "blur(3px)",
            opacity: 0.9,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 mx-auto h-2 w-full rounded-full"
          style={{
            background: `radial-gradient(ellipse at center, #fff8 0%, ${accent}a0 70%, transparent 100%)`,
            filter: "blur(1.5px)",
            opacity: 0.68,
          }}
        />
      </div>
    </div>
  );
}
