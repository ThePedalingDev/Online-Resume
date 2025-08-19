/**
 * PostCSS configuration file
 *
 * This file defines PostCSS plugins used when building the project. The two
 * plugins specified here are TailwindCSS and Autoprefixer. TailwindCSS
 * processes the custom utility classes defined in the project's templates,
 * while Autoprefixer ensures cross‑browser compatibility by adding vendor
 * prefixes where necessary.
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};