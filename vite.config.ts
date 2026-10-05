import path from "path"
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { HOME_SHELL_HTML } from './src/ssg/homeShellHtml'
import { siteMetaDescription } from './src/config/availability'

/**
 * Embed real homepage content into the built index.html so the first HTML
 * response includes an H1 and landmark copy (fixes empty SPA shell / axe
 * page-has-heading-one). React replaces #root on boot.
 *
 * Chosen over vite-react-ssg (RR6-only; breaks on react-router-dom v7) and
 * Next.js static export (full framework rewrite for a Vite SPA).
 */
function prerenderHomeShell(): Plugin {
  return {
    name: 'prerender-home-shell',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const description = siteMetaDescription()
        return html
          .replace(
            /<meta name="description" content="[^"]*" \/>/,
            `<meta name="description" content="${description}" />`,
          )
          .replace(
            /<meta property="og:description" content="[^"]*" \/>/,
            `<meta property="og:description" content="${description}" />`,
          )
          .replace(
            /<meta property="twitter:description" content="[^"]*" \/>/,
            `<meta property="twitter:description" content="${description}" />`,
          )
          .replace(
            /<meta name="keywords" content="[^"]*" \/>/,
            '<meta name="keywords" content="Markus Fourie, Full-Stack Developer, React, Node.js, ASP.NET, Pretoria, Portfolio" />',
          )
          .replace(
            '<div id="root"></div>',
            `<div id="root">${HOME_SHELL_HTML}</div>`,
          )
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderHomeShell()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-animation': ['gsap', '@gsap/react'],
          'vendor-three': ['three'],
          'vendor-ui': ['lucide-react', '@radix-ui/react-slot', '@radix-ui/react-label'],
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'vendor-utils': ['clsx', 'tailwind-merge', 'class-variance-authority']
        }
      }
    },
    target: 'esnext',
    minify: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'gsap', '@gsap/react', 'three']
  },
})
