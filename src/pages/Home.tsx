import { Link } from 'react-router-dom';
import '@/styles/portfolio-redesign.css';
import capeFriends from '@/assets/images/cape-friends.webp';
import deskSetup from '@/assets/images/desk-setup.webp';
import graduation from '@/assets/images/graduation.webp';
import longRide from '@/assets/images/long-ride.webp';
import raceReady from '@/assets/images/race-ready.webp';
import sworksUpgrades from '@/assets/images/sworks-upgrades.webp';
import trailseekerWellington from '@/assets/images/trailseeker-wellington.webp';
import { CONTACT_EMAIL, contactMailto } from '@/config/contact';
import { availability } from '@/config/availability';
import { approachCopy, paperTrail, stackCopy, stackGroups, workCopy } from '@/content/site';
import { workProjects } from '@/content/work';
import {
  useCopyEmail,
  useHeroLogLines,
  useNavSectionActive,
  usePortfolioDocument,
  useReveal,
} from '@/pages/home/usePortfolioPage';

const HERO_IMG = '/images/hero/hero-720.webp';
const GITHUB = 'https://github.com/ThePedalingDev';
const LINKEDIN = 'https://www.linkedin.com/in/markus-fourie/';
const STRAVA = 'https://www.strava.com/athletes/7756913';
const INSTAGRAM = 'https://www.instagram.com/markuss.fourie/';

const JOURNEY = [
  {
    year: '2020',
    where: 'Potchefstroom',
    title: 'Physics and maths at NWU',
    body:
      'I went to North-West University planning on mechanical engineering. I passed eight semester subjects, then left, because software was the bigger brief.',
  },
  {
    year: '2023',
    where: 'Pretoria',
    title: 'Switching to computing',
    body:
      'I started a BSc in Computer and Information Science at Varsity College (now Emeris) in Pretoria, learning C#, Java and the web stack. I was a student tutor there from 2023 to 2025.',
  },
  {
    year: '2024',
    where: 'First production work',
    title: 'Real users, real stakes',
    body:
      'I shipped the Eridge RDA site and CMS for a UK charity, so volunteers could keep programmes and events current.',
  },
  {
    year: '2025',
    where: 'Degree and first role',
    title: 'Cum Laude, and a first full-time role',
    body:
      'I completed my BSc in December 2025, Cum Laude, at Varsity College (now Emeris). I was a Varsity College Top Achiever in 2025 and a Golden Key member. I started as a full-stack software developer at Katanga Contracting Services (KCS) / Rimitso, and handed over the Afrisist fleet alarm desk in October 2025.',
  },
  {
    year: '2026',
    where: 'Now',
    title: 'All in on operations software',
    body:
      "I'm a full-stack software developer at KCS / Rimitso, and RMS is live in production. I'm open to new work and new experiences.",
  },
] as const;

const GALLERY = [
  { src: trailseekerWellington, w: 1200, h: 799, alt: 'Trailseeker #6, Wellington', cap: 'Trailseeker #6, Wellington · 12 Sep 2026' },
  { src: capeFriends, w: 960, h: 1280, alt: 'Markus Fourie and Matthew Waldeck cycling on the Cape Peninsula', cap: 'Cape Peninsula, with Matthew Waldeck' },
  { src: deskSetup, w: 768, h: 1024, alt: 'The home desk', cap: 'The home desk' },
  { src: sworksUpgrades, w: 1000, h: 1333, alt: "Markus's S-Works mountain bike, freshly upgraded", cap: 'My S-Works, freshly upgraded' },
  { src: raceReady, w: 768, h: 1024, alt: 'Race morning', cap: 'Race morning' },
  { src: longRide, w: 620, h: 1024, alt: 'A long gravel day', cap: 'A long gravel day' },
] as const;

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function WorkTile({
  className,
  image,
  imageAlt,
  kind,
  title,
  body,
  stack,
  href,
  linkLabel,
  external,
  stats,
}: {
  className: string;
  image?: string;
  imageAlt?: string;
  kind: string;
  title: string;
  body: string;
  stack: string;
  href: string;
  linkLabel: string;
  external?: boolean;
  stats?: string;
}) {
  return (
    <article className={`tile ${className} reveal`}>
      {image ? (
        <div className="media">
          <img src={image} width={1600} height={1000} loading="lazy" decoding="async" alt={imageAlt ?? ''} />
        </div>
      ) : null}
      <div className="body">
        <p className="kind">{kind}</p>
        <h3 className="h3">{title}</h3>
        <p>{body}</p>
        {stats ? <p className="rms-stats">{stats}</p> : null}
        <p className="stack">{stack}</p>
        <p className="go">
          {external ? (
            <a className="tlink" href={href} target="_blank" rel="noopener noreferrer">
              {linkLabel}
            </a>
          ) : href.startsWith('mailto:') ? (
            <a className="tlink" href={href}>{linkLabel}</a>
          ) : (
            <a className="tlink" href={href}>{linkLabel}</a>
          )}
        </p>
      </div>
    </article>
  );
}

export function Home() {
  useReveal();
  useNavSectionActive();
  useHeroLogLines();
  usePortfolioDocument();
  const { label: copyLabel, copy } = useCopyEmail();

  const rms = workProjects.find((p) => p.id === 'katanga-rms')!;
  const afrisist = workProjects.find((p) => p.id === 'afrisist')!;
  const eridge = workProjects.find((p) => p.id === 'eridge-rda')!;
  const skillance = workProjects.find((p) => p.id === 'skillance')!;
  const lab = workProjects.find((p) => p.id === 'home-lab')!;

  const rmsStats = rms.stats ? `${rms.stats[0][0]} assets and ${rms.stats[1][0]} users on RMS today.` : '';

  const mergedStackGroups = (() => {
    const groups = [...stackGroups];
    const sec = groups.find((g) => g.name === 'Security');
    const learn = groups.find((g) => g.name === 'Learning now');
    if (sec && learn) {
      return groups
        .filter((g) => g.name !== 'Security' && g.name !== 'Learning now')
        .concat({
          name: 'Security, and learning now',
          items: [...sec.items, ...learn.items],
        });
    }
    return groups;
  })();

  return (
    <div className="portfolio-redesign" id="top">
      <a className="skip" href="#main">Skip to content</a>

      <header className="hdr">
        <div className="wrap">
          <a className="mark" href="#top" aria-label="Markus Fourie, back to top">
            Markus Fourie <span>Pretoria</span>
          </a>
          <nav className="nav" aria-label="Sections">
            <a href="#work">Work</a>
            <a href="#approach">Approach</a>
            <a href="#stack">Stack</a>
            <a href="#journey">Journey</a>
            <a href="#life">Life</a>
          </nav>
          <a className="btn btn-dark" href="#contact">Get in touch</a>
        </div>
        <nav className="mob" aria-label="Sections (mobile)">
          <a href="#work">Work</a>
          <a href="#approach">Approach</a>
          <a href="#stack">Stack</a>
          <a href="#journey">Journey</a>
          <a href="#life">Life</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="h1">
          <div className="wrap">
            <div>
              <h1 id="h1">Software that holds up outside the office.</h1>
              <p className="sub">
                Full-stack developer in Pretoria, building the Resource Management System for Katanga site teams.
              </p>
              <div className="ctas">
                <a className="btn btn-primary" href={contactMailto}>
                  <EnvelopeIcon />
                  Email me
                </a>
                <a className="btn btn-ghost" href="#work">See my work</a>
              </div>
              <div className="meta">
                <a className="tlink" href="/cert-docs/markus-fourie-resume.pdf">Resume (PDF)</a>
                <a className="tlink" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a className="tlink" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
            <div className="visual">
              <div className="block" aria-hidden="true" />
              <div className="photo">
                <img
                  src={HERO_IMG}
                  width={720}
                  height={1080}
                  alt="Markus Fourie in profile, wearing a cap and a dark polo shirt"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              <div className="panel" aria-label="Example deploy log from the Resource Management System">
                <div className="ttl">
                  <span>markus@fedora: ~</span>
                  <span>rms</span>
                </div>
                <div className="line">$ ./deploy rms --env prod</div>
                <div className="line">→ running migrations (017_audit_trail)</div>
                <div className="line">→ health check: api, worker, gateway</div>
                <div className="line ok">✓ deploy complete · 14.2s · 0 errors</div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" id="work" aria-labelledby="work-h">
          <div className="wrap">
            <div className="work-head reveal">
              <h2 className="h2" id="work-h">{workCopy.title}</h2>
              <p className="muted">{workCopy.intro}</p>
            </div>
            <div className="bento">
              <WorkTile
                className="t-rms"
                image="/images/work/rms-1600.webp"
                imageAlt="Resource Management System landing page with sign-in, API and system health links"
                kind="Featured · For Katanga Contracting Services · Since 2025"
                title="Resource Management System"
                body={rms.outcome}
                stats={rmsStats}
                stack="React · ASP.NET Core · EF Core · PostgreSQL · SignalR · Azure"
                href={rms.cta.href}
                linkLabel={rms.cta.label}
              />
              <WorkTile
                className="t-a"
                image="/images/work/afrisist-1600.webp"
                imageAlt="A truck on a mountain pass at sunrise, from the Afrisist brand imagery"
                kind="Fleet alarm desk · Private · 2025"
                title="Afrisist"
                body={afrisist.outcome}
                stack="React · Node.js · Supabase · WebSocket · Azure"
                href={afrisist.cta.href}
                linkLabel={afrisist.cta.label}
              />
              <WorkTile
                className="t-b"
                image="/images/work/eridge-1600.webp"
                imageAlt="Eridge RDA home page: More than a ride, with volunteers in yellow beside a pony"
                kind="UK charity site and CMS · 2024"
                title="Eridge RDA"
                body={eridge.outcome}
                stack="React · Vite · Tailwind CSS · Supabase · Vercel"
                href={eridge.cta.href}
                linkLabel="Visit eridgerda.org.uk"
                external
              />
              <WorkTile
                className="t-c"
                image="/images/work/skillance-1600.webp"
                imageAlt="Skillance home page: The community designed for trust"
                kind="Freelance marketplace · Co-built with Kyle Nel · Ongoing"
                title="Skillance"
                body={skillance.outcome}
                stack="React · Fastify · PostgreSQL"
                href={skillance.cta.href}
                linkLabel="Visit skillance.co.za"
                external
              />
              <article className="tile t-lab reveal">
                <div className="body">
                  <div>
                    <p className="kind">Personal infrastructure · Ongoing</p>
                    <h3 className="h3" style={{ margin: '8px 0 12px' }}>Home lab</h3>
                    <p>{lab.outcome}</p>
                  </div>
                  <div>
                    <p className="stack">Linux · Plex · Ollama (Gemma, Qwen)</p>
                    <p className="go">
                      <a className="tlink" href="#stack">See my stack</a>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="sec appr" id="approach" aria-labelledby="appr-h">
          <div className="wrap grid">
            <div className="side reveal">
              <h2 className="h2" id="appr-h">{approachCopy.title}</h2>
              <p className="muted" style={{ marginTop: 24 }}>
                Most of what I build never makes it into a demo. It&apos;s the approval step before a report, the audit log that shows who changed what, and the dashboard someone reads on a bad screen in a site office.
              </p>
            </div>
            <div>
              <ol className="rows">
                {approachCopy.capabilities.map((c) => (
                  <li key={c.name} className="reveal">
                    <span className="nm">{c.name}</span>
                    <p>{c.line}</p>
                  </li>
                ))}
              </ol>
              <p className="quote reveal">
                Good systems are a chain of small, repeated decisions. The log line written for whoever is debugging at 2 am.
              </p>
              <div className="princ">
                {approachCopy.principles.map((p) => (
                  <div key={p.title} className="reveal">
                    <h3>{p.title.replace(/^\d+\s*·\s*/, '')}</h3>
                    <p>{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="band-h">
          <div className="wrap">
            <div>
              <h2 className="h2" id="band-h" style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}>
                Want to see RMS running?
              </h2>
              <p>
                I&apos;m happy to walk you through the Resource Management System, from the approval step to the audit log.
              </p>
            </div>
            <a
              className="btn btn-primary"
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Walkthrough: Resource Management System')}`}
            >
              Ask for a walkthrough
            </a>
          </div>
        </section>

        <section className="sec stk" id="stack" aria-labelledby="stk-h">
          <div className="wrap grid">
            <div className="reveal">
              <h2 className="h2" id="stk-h">{stackCopy.title}</h2>
              <p style={{ marginTop: 24 }}>{stackCopy.intro}</p>
              <div className="note small">
                {stackCopy.atHome}
                <br />
                <br />
                <a className="tlink" href={GITHUB} target="_blank" rel="noopener noreferrer">
                  GitHub · ThePedalingDev
                </a>
              </div>
            </div>
            <div className="groups">
              {mergedStackGroups.map((group) => (
                <div key={group.name} className="group reveal">
                  <h3>{group.name}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.n}>
                        <span>{item.n}</span>
                        <span>{item.y}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec jr" id="journey" aria-labelledby="jr-h">
          <div className="wrap grid">
            <div>
              <div className="reveal">
                <h2 className="h2" id="jr-h">How I got here</h2>
                <p className="lead" style={{ marginTop: 24 }}>
                  I didn&apos;t take the straight road into software. I started in physics and maths, switched to a computing degree, and was shipping production work before I graduated.
                </p>
              </div>
              <ol className="tl">
                {JOURNEY.map((j) => (
                  <li key={j.year} className="reveal">
                    <span className="yr">{j.year}</span>
                    <div>
                      <p className="where">{j.where}</p>
                      <h3>{j.title}</h3>
                      <p>{j.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <aside>
              <figure className="reveal">
                <div className="fr">
                  <img
                    src={graduation}
                    width={459}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                    alt="Markus Fourie in his graduation gown"
                  />
                </div>
                <figcaption>Graduation, Varsity College (now Emeris)</figcaption>
              </figure>
              <div className="reveal">
                <h3 style={{ fontSize: '1.25rem', marginBottom: 12 }}>The paper trail</h3>
                <ul className="paper">
                  {paperTrail.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {item.label} <span>{item.note}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section className="sec life" id="life" aria-labelledby="life-h">
          <div className="wrap">
            <div className="head reveal">
              <h2 className="h2" id="life-h">Off the clock, on the bike</h2>
              <p>
                When I close the laptop, I ride: mostly cross-country marathons and long endurance days. In 2024 I rode the{' '}
                <a className="tlink" href="https://transbaviaans.co.za/" target="_blank" rel="noopener noreferrer">
                  Trans Baviaans
                </a>
                , the 24-hour mountain bike marathon. This year I rode the full Ford Trailseeker series, including #6 Wellington on 12 September.
              </p>
            </div>
            <div className="gal">
              {GALLERY.map((g) => (
                <figure key={g.cap} className="reveal">
                  <div className="fr">
                    <img src={g.src} width={g.w} height={g.h} loading="lazy" decoding="async" alt={g.alt} />
                  </div>
                  <figcaption>{g.cap}</figcaption>
                </figure>
              ))}
            </div>
            <div className="links">
              <a className="tlink" href={STRAVA} target="_blank" rel="noopener noreferrer">
                Follow the riding on Strava
              </a>
              <a className="tlink" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a>
              <Link className="tlink" to="/uses">See my desk and bike setup</Link>
            </div>
          </div>
        </section>

        <section className="closer" id="contact" aria-labelledby="ct-h">
          <div className="bg" aria-hidden="true">
            <img src={capeFriends} width={960} height={1280} loading="lazy" decoding="async" alt="" />
          </div>
          <div className="wrap">
            <h2 id="ct-h">Let&apos;s talk.</h2>
            <p>
              Building something that has to work in the real world, or hiring someone who enjoys that kind of problem? Email me.
            </p>
            <p className="addr">{CONTACT_EMAIL}</p>
            <div className="ctas">
              <a className="btn btn-primary" href={contactMailto}>Email me</a>
              <button className="btn btn-ghost-light" type="button" onClick={() => void copy()}>
                {copyLabel}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="ftr">
        <div className="wrap">
          <p className="big" aria-hidden="true">Markus Fourie</p>
          <div className="cols">
            <div>
              <p>Full-stack developer · Pretoria</p>
              <p className="muted">{availability.employer} · {availability.status}.</p>
            </div>
            <div>
              <h3>Sections</h3>
              <ul>
                <li><a href="#work">Work</a></li>
                <li><a href="#approach">Approach</a></li>
                <li><a href="#stack">Stack</a></li>
                <li><a href="#journey">Journey</a></li>
              </ul>
            </div>
            <div>
              <h3>Elsewhere</h3>
              <ul>
                <li><a href={LINKEDIN}>LinkedIn</a></li>
                <li><a href={GITHUB}>GitHub</a></li>
                <li><a href={STRAVA}>Strava</a></li>
              </ul>
            </div>
            <div>
              <h3>Contact</h3>
              <ul>
                <li><a href={contactMailto}>Email</a></li>
                <li><a href="/cert-docs/markus-fourie-resume.pdf">Resume</a></li>
                <li><a href="#top">Back to top</a></li>
              </ul>
            </div>
          </div>
          <p className="small muted" style={{ marginTop: 40 }}>© 2026 Markus Fourie</p>
        </div>
      </footer>
    </div>
  );
}
