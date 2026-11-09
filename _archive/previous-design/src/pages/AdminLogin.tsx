import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { apiUrl } from '@/lib/api';

type Status = { tone: 'bad' | 'ok'; text: string };

function failureMessage(status: number, error?: string): string {
  if (status === 401) return 'That password is not right.';
  if (status === 500) return 'The admin password is not set on the server.';
  return error || `Sign-in failed (${status}).`;
}

async function login(password: string): Promise<Status> {
  let res: Response;
  try {
    res = await fetch(apiUrl('/api/admin/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ password }),
    });
  } catch {
    return { tone: 'bad', text: 'The admin service did not answer. Try again.' };
  }
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    return { tone: 'bad', text: failureMessage(res.status, body?.error) };
  }
  const check = await fetch(apiUrl('/api/admin/me'), { credentials: 'include' });
  const session = check.ok ? ((await check.json()) as { authed?: boolean }) : null;
  if (!session?.authed) {
    return { tone: 'bad', text: 'The password was accepted, but the browser did not keep the session.' };
  }
  return { tone: 'ok', text: 'Signed in.' };
}

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();
  const bounced = (location.state as { reason?: string } | null)?.reason === 'session';
  const [status, setStatus] = useState<Status | null>(
    bounced ? { tone: 'bad', text: 'That session was not kept. Sign in again.' } : null,
  );
  const nav = useNavigate();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (submitting) return;
    if (!password) {
      setStatus({ tone: 'bad', text: 'Enter the admin password.' });
      return;
    }
    setSubmitting(true);
    setStatus(null);
    const result = await login(password);
    setStatus(result);
    setSubmitting(false);
    if (result.tone === 'ok') nav('/admin');
  }

  return (
    <div className="editorial">
      <section>
        <div className="ed-shell">
          <div className="eyebrow-row">
            <span className="section-marker">CMS · Sign in</span>
            <span className="num">Admin</span>
          </div>

          <div className="ed-grid12">
            <div style={{ gridColumn: '1 / span 12' }}>
              <form className="ed-admin-card" onSubmit={onSubmit}>
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
                    aria-invalid={status?.tone === 'bad' || undefined}
                    aria-describedby={status ? 'admin-login-status' : undefined}
                  />
                </div>

                {status ? (
                  <div id="admin-login-status" className={`ed-admin-status is-${status.tone}`} role="status">
                    {status.text}
                  </div>
                ) : null}

                <div className="ed-admin-actions">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? 'Signing in…' : 'Sign in'}
                  </Button>
                  <a className="ed-admin-link" href="/">Back to site</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

