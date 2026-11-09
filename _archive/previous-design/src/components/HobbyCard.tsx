import { useEffect, useRef, useState } from 'react';
import { lunoReferral } from '@/content/site';

type HobbyCardProps = {
  variant: 'referral';
};

const externalArrow = (
  <svg aria-hidden="true" viewBox="0 0 16 16" className="hobby-arrow-ext">
    <path
      d="M5 11 11 5M6 5h5v5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const chevron = (
  <svg aria-hidden="true" viewBox="0 0 16 16" className="hobby-chevron">
    <path
      d="M4 6l4 4 4-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const referralLd = {
  '@context': 'https://schema.org',
  '@type': 'Offer',
  name: 'Luno referral',
  url: lunoReferral.url,
  description: `Referral code ${lunoReferral.code}. If you sign up and qualify, we both get R50 in Bitcoin.`,
  identifier: {
    '@type': 'PropertyValue',
    name: 'Referral code',
    value: lunoReferral.code,
  },
};

export function HobbyCard({ variant }: HobbyCardProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLSpanElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  if (variant !== 'referral') return null;

  const copyCode = async () => {
    const { code } = lunoReferral;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else if (codeRef.current) {
        const range = document.createRange();
        range.selectNodeContents(codeRef.current);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    } catch {
      if (codeRef.current) {
        const range = document.createRange();
        range.selectNodeContents(codeRef.current);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
    if (liveRef.current) liveRef.current.textContent = 'Code copied';
    setCopied(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setCopied(false);
      if (liveRef.current) liveRef.current.textContent = '';
      timerRef.current = null;
    }, 2000);
  };

  const { code, url } = lunoReferral;

  return (
    <article
      className="hobby-card"
      aria-labelledby="hobby-card-title"
      data-referral-code={code}
      data-referral-provider="Luno"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(referralLd) }} />
      <div className="hobby-main">
        <div className="hobby-heading">
          <img
            className="hobby-logo"
            src="/images/luno-logo.png"
            alt="Luno"
            width={409}
            height={128}
          />
          <h2 id="hobby-card-title" className="hobby-title">{lunoReferral.title}</h2>
        </div>
        <p className="hobby-body">{lunoReferral.body}</p>
        <p className="hobby-disclosure">{lunoReferral.disclosure}</p>
      </div>
      <div className="hobby-aside">
        <div className="hobby-actions">
          <a
            className="hobby-btn"
            href={url}
            target="_blank"
            rel="sponsored noopener noreferrer"
          >
            {lunoReferral.buttonLabel}
            {externalArrow}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <div className="hobby-code-chip">
            <span className="hobby-code-text">
              {lunoReferral.codeLabel}{' '}
              <span ref={codeRef} className="hobby-code-value">{code}</span>
            </span>
            <button type="button" className="hobby-copy-btn" onClick={copyCode}>
              {copied ? lunoReferral.copiedLabel : (
                <>
                  {lunoReferral.copyLabel}
                  <span className="sr-only"> {code}</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div ref={liveRef} className="hobby-live" aria-live="polite" />
        <details className="hobby-details">
          <summary className="hobby-summary">
            {lunoReferral.summaryLabel}
            {chevron}
          </summary>
          <ol className="hobby-steps">
            {lunoReferral.steps.map((step) => (
              <li key={step}>
                <span className="hobby-step-text">{step}</span>
              </li>
            ))}
          </ol>
        </details>
      </div>
    </article>
  );
}
