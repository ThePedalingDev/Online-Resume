# markusfourie.dev

Personal portfolio for Markus Fourie, a full-stack developer in Pretoria. Live at [markusfourie.dev](https://markusfourie.dev/).

## Stack

- React 19, TypeScript, Vite 7
- Tailwind CSS 4 (legacy pages) and a hand-written stylesheet for the home page
- GSAP and Lenis for scroll and motion, all disabled under `prefers-reduced-motion`
- React Router 7
- Hosted on Vercel

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check, then production build into dist/
npm run preview  # serve the production build locally
npm run lint
```

Requires Node 20 or newer.

## Layout

```
src/
  pages/Home.tsx            The home page (hero, work, approach, stack, journey, life, contact)
  pages/home/               Home page parts: gallery data, lightbox, typed text, hooks
  styles/portfolio-redesign.css   All home page styles and design tokens
  content/                  Copy and project data (site.ts, work.ts)
  data/projectTags.ts       One shared list of tech tags per project
  components/               Shared components (SmoothScroll, BrandMarks, ui/)
  config/                   Contact details and availability
  ssg/homeShellHtml.ts      Static HTML embedded at build time for crawlers
  assets/                   Images, logos and gear photos
public/                     Static files: favicon, share image, sitemap, robots, résumé PDF
design-systems/markus-cv/   Design tokens and usage notes
vercel.json                 SPA rewrites and static-file headers
```

Other routes (`/about`, `/projects`, `/skills`, `/contact`, `/social`, `/uses`) use the older Tailwind layout.

## Content

Project copy lives in `src/content/work.ts` and `src/content/site.ts`, and tech tags in `src/data/projectTags.ts`. Gallery photos are listed in `src/pages/home/gallery.ts`. Each photo has a full-size file in `src/assets/images/` and an 800px thumbnail in `src/assets/images/thumbs/`.

## Accessibility and SEO

- Semantic landmarks, a skip link, visible focus styles and keyboard-operable menus and lightbox
- Checked with axe (WCAG 2.2 AA) with no violations at phone width
- Canonical URL, Open Graph and Twitter tags, JSON-LD (`Person`), sitemap and `robots.txt`
- Home page content is prerendered into `index.html` at build time

## Contact

[fourie.markus@outlook.com](mailto:fourie.markus@outlook.com) · [LinkedIn](https://www.linkedin.com/in/markus-fourie/) · [GitHub](https://github.com/ThePedalingDev)
