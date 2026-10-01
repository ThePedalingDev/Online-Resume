import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

async function login(password: string) {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ password }),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error || `Login failed (${res.status})`);
  }
}

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();

  const canSubmit = useMemo(() => password.trim().length >= 6 && !submitting, [password, submitting]);

  return (
    <div className="editorial">
      <section>
        <div className="ed-shell">
          <div className="eyebrow-row">
            <span className="section-marker">CMS · Sign in</span>
            <span className="num">Admin · Local</span>
          </div>

          <div className="ed-grid12">
            <div style={{ gridColumn: '1 / span 12' }}>
              <div className="ed-admin-card">
                <div className="ed-admin-title">Access</div>
                <div className="ed-admin-sub">Enter the admin password to manage content and integrations.</div>

                <div className="ed-admin-field">
                  <label className="ed-admin-label" htmlFor="admin-password">Password</label>
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="ed-admin-input"
                    autoComplete="current-password"
                  />
                </div>

                {error ? <div className="ed-admin-error">{error}</div> : null}

                <div className="ed-admin-actions">
                  <Button
                    onClick={async () => {
                      try {
                        setSubmitting(true);
                        setError(null);
                        await login(password);
                        nav('/admin');
                      } catch (e: unknown) {
                        const msg = e instanceof Error ? e.message : 'Login failed';
                        setError(msg);
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                    disabled={!canSubmit}
                  >
                    {submitting ? 'Signing in…' : 'Sign in'}
                  </Button>
                  <a className="ed-admin-link" href="/">Back to site</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

