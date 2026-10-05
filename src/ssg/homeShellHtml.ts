/** Static HTML embedded into index.html at build time so crawlers and no-JS clients see real content. */
export const HOME_SHELL_HTML = `
<main class="editorial" data-prerender="home">
  <nav class="ed-nav" aria-label="Primary">
    <div class="ed-nav-inner">
      <a href="#top" class="ed-nav-brand">Markus Fourie</a>
      <div class="ed-nav-links">
        <a href="#about">About</a>
        <a href="#journey">Journey</a>
        <a href="#projects">Work</a>
        <a href="#stack">Stack</a>
        <a href="#docs">Docs</a>
        <a href="#contact">Contact</a>
      </div>
      <a class="ed-nav-cta" href="#contact">Get in touch</a>
    </div>
  </nav>
  <section id="top" class="hero">
    <div class="ed-shell">
      <div class="hero-main">
        <h1 class="hero-name">Markus Fourie</h1>
        <p class="hero-kicker">Full-stack developer · Pretoria, ZA</p>
        <div class="hero-text">
          <p class="hero-lead">I build structured systems for the real world: resource platforms, operational tooling, and charity sites.</p>
          <p class="hero-sub">React, Node.js, and ASP.NET. BSc Computer &amp; Information Sciences.</p>
        </div>
        <div class="hero-actions">
          <a class="btn-solid" href="#projects">View work</a>
          <a class="btn-text" href="#contact">Get in touch</a>
        </div>
      </div>
      <div class="hero-media">
        <picture>
          <source type="image/avif" srcset="/images/hero/hero-444.avif 444w, /images/hero/hero-888.avif 888w" sizes="(max-width: 768px) min(88vw, 360px), 444px" />
          <source type="image/webp" srcset="/images/hero/hero-444.webp 444w, /images/hero/hero-888.webp 888w" sizes="(max-width: 768px) min(88vw, 360px), 444px" />
          <img src="/images/hero/hero-888.webp" width="888" height="1332" alt="Markus Fourie" fetchpriority="high" decoding="async" />
        </picture>
      </div>
    </div>
  </section>
  <section id="about"><h2>About</h2><p>I build operational software, and I race. Small steps, a long view.</p></section>
  <section id="journey"><h2>Journey</h2></section>
  <section id="projects"><h2>Selected work</h2><p>Platforms and tools shipped for operations, fleets, charities, and marketplaces.</p></section>
  <section id="stack"><h2>Stack</h2></section>
  <section id="docs"><h2>Docs</h2></section>
  <section id="contact"><h2>Contact</h2><p><a href="mailto:markusfourie@icloud.com">markusfourie@icloud.com</a></p></section>
</main>
`.trim();
