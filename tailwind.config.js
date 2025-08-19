/**
 * TailwindCSS configuration
 *
 * This file defines the project’s design tokens and configuration for
 * TailwindCSS. Two custom color palettes (jedi and sith) are added to
 * support the light side and dark side themes. The dark mode is enabled
 * using the class strategy, allowing React to toggle themes by adding or
 * removing a `dark` class on the root element.
 */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light side (Jedi) palette
        jedi: {
          primary: '#3fb0f7',
          secondary: '#d5e8ff',
          accent: '#8cd3ff',
          background: '#000000',
          foreground: '#edf2f8',
        },
        // Dark side (Sith) palette
        sith: {
          primary: '#e63946',
          secondary: '#370617',
          accent: '#a4161a',
          background: '#000000',
          foreground: '#f8f8f2',
        },
      },
      fontFamily: {
        orbitron: ['"Orbitron"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        hyperspace: 'hyperspace 30s linear infinite',
        scroll: 'scroll 80s linear infinite',
        'starwars-crawl': 'starwars-crawl 48s linear forwards',
      },
      keyframes: {
        // Hyperspace background movement
        hyperspace: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 1000px' },
        },
        // Star Wars style text crawl animation (THIS IS THE IMPORTANT BIT)
        'starwars-crawl': {
  '0%': {
    transform: 'translateY(70%) perspective(650px) rotateX(10deg) scale(1.12)',
    opacity: '1',
  },
  '95%': {
    opacity: '1',
  },
  '100%': {
    transform: 'translateY(-135%) perspective(650px) rotateX(10deg) scale(0.55)',
    opacity: '0.02',
  },
},


        
        // Old scroll animation (can remove if not needed)
        scroll: {
          '0%': { transform: 'translate3d(0, 100%, 0) rotateX(20deg)' },
          '100%': { transform: 'translate3d(0, -400%, 0) rotateX(25deg)' },
        },
      },
    },
  },
  plugins: [],
};
