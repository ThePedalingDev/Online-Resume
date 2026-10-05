import { useRef, useState } from 'react';
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

export function HobbyCard({ variant }: HobbyCardProps) {
  if (variant !== 'referral') return null;

  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLSpanElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);

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
    window.setTimeout(() => {
      setCopied(false);
      if (liveRef.current) liveRef.current.textContent = '';
    }, 2000);
  };

  const { code, url } = lunoReferral;

  return (
    <article className="hobby-card" aria-labelledby="hobby-card-title">
      <p className="hobby-eyebrow">{lunoReferral.eyebrow}</p>
      <h3 id="hobby-card-title" className="hobby-title">{lunoReferral.title}</h3>
      <p className="hobby-body">{lunoReferral.body}</p>

      <div className="hobby-actions">
        <a
          className="hobby-btn-outline"
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
          <button
            type="button"
            className="hobby-copy-btn"
            onClick={copyCode}
            aria-label={`Copy referral code ${code}`}
          >
            {copied ? lunoReferral.copiedLabel : lunoReferral.copyLabel}
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
            <li key={step}>{step}</li>
          ))}
        </ol>
      </details>

      <p className="hobby-disclosure">{lunoReferral.disclosure}</p>
    </article>
  );
}
