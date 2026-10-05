import { lunoReferral } from '../content/lunoReferral';

const externalArrowSvg =
  '<svg aria-hidden="true" viewBox="0 0 16 16" class="hobby-arrow-ext"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const chevronSvg =
  '<svg aria-hidden="true" viewBox="0 0 16 16" class="hobby-chevron"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const stepsHtml = lunoReferral.steps
  .map((step: string) => `<li>${step}</li>`)
  .join('');

/** Static hobby card HTML for the prerendered home shell (Life section). */
export function hobbyCardShellHtml(): string {
  const { code, url } = lunoReferral;
  return `
  <section id="life" class="off-clock" aria-label="Life">
    <div class="ed-shell">
      <div class="ed-grid12">
        <div class="hobby-wrap reveal is-in">
          <article class="hobby-card" aria-labelledby="hobby-card-title">
            <p class="hobby-eyebrow">${lunoReferral.eyebrow}</p>
            <h3 id="hobby-card-title" class="hobby-title">${lunoReferral.title}</h3>
            <p class="hobby-body">${lunoReferral.body}</p>
            <div class="hobby-actions">
              <a class="hobby-btn-outline" href="${url}" target="_blank" rel="sponsored noopener noreferrer">
                ${lunoReferral.buttonLabel}
                ${externalArrowSvg}
                <span class="sr-only"> (opens in a new tab)</span>
              </a>
              <div class="hobby-code-chip">
                <span class="hobby-code-text">${lunoReferral.codeLabel} <span class="hobby-code-value">${code}</span></span>
                <button type="button" class="hobby-copy-btn" aria-label="Copy referral code ${code}">${lunoReferral.copyLabel}</button>
              </div>
            </div>
            <details class="hobby-details">
              <summary class="hobby-summary">
                ${lunoReferral.summaryLabel}
                ${chevronSvg}
              </summary>
              <ol class="hobby-steps">${stepsHtml}</ol>
            </details>
            <p class="hobby-disclosure">${lunoReferral.disclosure}</p>
          </article>
        </div>
      </div>
    </div>
  </section>`;
}
