/** Static HTML embedded into index.html at build time so crawlers and no-JS clients see real content. */
export const HOME_SHELL_HTML = `
<main id="main" class="portfolio-redesign" data-prerender="home">
  <section class="hero" aria-labelledby="h1">
    <div class="wrap">
      <div>
        <h1 id="h1">Software that holds up outside the office.</h1>
        <p class="hero-subline">I build the Resource Management System that Katanga&apos;s site teams run on, plus internal tools like C-Flow.</p>
      </div>
    </div>
  </section>
</main>
`;
