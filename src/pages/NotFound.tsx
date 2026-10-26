import { Link } from 'react-router-dom';
import '@/styles/portfolio-redesign.css';
import { contactMailto } from '@/config/contact';

export function NotFound() {
  return (
    <div className="portfolio-redesign" style={{ minHeight: '100vh' }}>
      <header className="hdr">
        <div className="wrap">
          <Link className="mark" to="/" aria-label="Markus Fourie, home">
            Markus Fourie <span>Pretoria</span>
          </Link>
          <Link className="btn btn-dark" to="/#contact">Get in touch</Link>
        </div>
      </header>
      <main id="main" className="sec" style={{ paddingTop: 96, paddingBottom: 96 }}>
        <div className="wrap" style={{ maxWidth: 720 }}>
          <h1 className="h2" style={{ marginBottom: 24 }}>This page isn&apos;t here.</h1>
          <p className="lead muted" style={{ marginBottom: 40 }}>
            The link may be old or mistyped. The homepage and resume are still where you expect them.
          </p>
          <div className="ctas" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link className="btn btn-primary" to="/">Back to homepage</Link>
            <a className="btn btn-ghost" href={contactMailto}>Email me</a>
          </div>
        </div>
      </main>
    </div>
  );
}
