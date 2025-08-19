const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

// Vite configuration for the Star Wars × Cycling portfolio.
// This CommonJS module exports the configuration object. The React plugin
// enables JSX and other React transformations. You can adjust the
// server settings as needed.
module.exports = defineConfig({
  base: '/Online-Resume/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});