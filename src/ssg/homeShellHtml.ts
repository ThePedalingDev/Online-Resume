/** Static HTML embedded into index.html at build time so crawlers and no-JS clients see real content. */
export const HOME_SHELL_HTML = `
<main class="editorial" data-prerender="home">
  <nav class="ed-nav" aria-label="Primary">
    <div class="ed-nav-inner">
      <a href="#top" class="ed-nav-brand">Markus Fourie</a>
      <div class="ed-nav-links">
        <a href="#work">Work</a>
        <a href="#approach">Approach</a>
        <a href="#stack">Stack</a>
        <a href="#journey">Journey</a>
        <a href="#life">Life</a>
        <a href="#contact">Contact</a>
      </div>
      <a class="ed-nav-cta" href="#contact">Get in touch</a>
    </div>
  </nav>
  <section id="top" class="hero" aria-labelledby="hero-name">
    <div class="hero-inner">
      <div class="hero-intro">
        <h1 id="hero-name" class="hero-name">Markus Fourie</h1>
        <p class="hero-role">Full-stack developer in Pretoria</p>
        <p class="hero-status"><span class="hero-status-dot" aria-hidden="true"></span>Katanga Contracting Services · Open to new work and new experiences</p>
        <p class="hero-tagline">Software that holds up outside the office.</p>
      </div>
      <picture class="hero-photo">
        <source type="image/avif" srcset="/images/hero/hero-480.avif 480w, /images/hero/hero-720.avif 720w, /images/hero/hero-1024.avif 1024w" sizes="(max-width: 1023px) min(100vw, 420px), min(42vw, 560px)" />
        <source type="image/webp" srcset="/images/hero/hero-480.webp 480w, /images/hero/hero-720.webp 720w, /images/hero/hero-1024.webp 1024w" sizes="(max-width: 1023px) min(100vw, 420px), min(42vw, 560px)" />
        <img src="/images/hero/hero-720.webp" width="1024" height="1536" alt="Markus Fourie in profile, wearing a cap and a dark polo shirt" fetchpriority="high" decoding="async" />
      </picture>
      <div class="hero-actions">
        <p class="hero-subline">Right now that's the Resource Management System Katanga Contracting Services runs its sites, assets and shifts on. Before it: a fleet alarm desk, a UK charity's website and a freelance marketplace.</p>
        <ul class="hero-ctas">
          <li><a class="hero-pill primary" href="#work">See what I've built <span aria-hidden="true">→</span></a></li>
          <li><a class="hero-pill" href="mailto:markusfourie@icloud.com">Start a conversation <span aria-hidden="true">→</span></a></li>
          <li><a class="hero-pill" href="/cert-docs/251024%20Markus%20Fourie%20CV.pdf" download>Download my CV (PDF) <span aria-hidden="true">→</span></a></li>
        </ul>
      </div>
    </div>
  </section>
</main>
`;
