import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CmsFields } from '@/components/CmsFields';
import { apiUrl } from '@/lib/api';
import { resolveDraft, SECTION_LABELS } from '@/lib/siteDefaults';

type CmsKey = 'hero' | 'about' | 'journey' | 'cycling' | 'gallery' | 'stack' | 'gearCoding' | 'gearCycling' | 'docs';
type AdminPanel = CmsKey | 'integrations';

type ContentResponse = {
  key: CmsKey;
  value: unknown;
  updatedAt: string | null;
};

async function me(): Promise<{ authed: boolean }> {
  const res = await fetch(apiUrl('/api/admin/me'), { credentials: 'include' });
  if (!res.ok) throw new Error(`Auth check failed (${res.status})`);
  return (await res.json()) as { authed: boolean };
}

async function logout() {
  await fetch(apiUrl('/api/admin/logout'), { method: 'POST', credentials: 'include' });
}

async function getContent(key: CmsKey): Promise<ContentResponse> {
  const res = await fetch(apiUrl(`/api/content/${key}`), { credentials: 'include' });
  if (!res.ok) throw new Error(`Load failed (${res.status})`);
  return (await res.json()) as ContentResponse;
}

async function putContent(key: CmsKey, value: unknown) {
  const res = await fetch(apiUrl(`/api/content/_admin/${key}`), {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value }),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error || `Save failed (${res.status})`);
  }
}

async function uploadFile(file: File): Promise<{ url: string }> {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch(apiUrl('/api/admin/uploads'), { method: 'POST', body: fd, credentials: 'include' });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error || `Upload failed (${res.status})`);
  }
  return (await res.json()) as { url: string };
}

const keys: CmsKey[] = ['hero', 'about', 'journey', 'cycling', 'gallery', 'stack', 'gearCoding', 'gearCycling', 'docs'];

async function getIntegrationsStatus(): Promise<{
  strava: { connected: boolean; updatedAt: string | null };
  instagram: { configured: boolean; updatedAt: string | null };
}> {
  const res = await fetch(apiUrl('/api/admin/integrations/status'), { credentials: 'include' });
  if (!res.ok) throw new Error(`Load failed (${res.status})`);
  return (await res.json()) as any;
}

async function saveInstagramConfig(token: string, userId: string) {
  const res = await fetch(apiUrl('/api/admin/integrations/instagram'), {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, userId }),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error || `Save failed (${res.status})`);
  }
}

export function Admin() {
  const nav = useNavigate();
  const [activeKey, setActiveKey] = useState<AdminPanel>('journey');
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<unknown>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [igToken, setIgToken] = useState('');
  const [igUserId, setIgUserId] = useState('');
  const [integrations, setIntegrations] = useState<null | {
    strava: { connected: boolean; updatedAt: string | null };
    instagram: { configured: boolean; updatedAt: string | null };
  }>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const r = await me();
        if (!r.authed) {
          nav('/admin/login', { replace: true, state: { reason: 'session' } });
          return;
        }
        if (!mounted) return;
        setLoading(false);
      } catch {
        nav('/admin/login', { replace: true, state: { reason: 'session' } });
      }
    })();
    return () => {
      mounted = false;
    };
  }, [nav]);

  useEffect(() => {
    const ac = new AbortController();
    setError(null);
    setNotice(null);
    setSavedAt(null);
    (async () => {
      try {
        if (activeKey === 'integrations') {
          const st = await getIntegrationsStatus();
          setIntegrations(st);
          setSavedAt(st.instagram.updatedAt ?? st.strava.updatedAt ?? null);
          setDraft(null);
          return;
        }

        const data = await getContent(activeKey);
        setDraft(resolveDraft(activeKey, data.value));
        setSavedAt(data.updatedAt);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Failed to load';
        setError(msg);
      }
    })();
    return () => ac.abort();
  }, [activeKey]);

  if (loading) return null;

  return (
    <div className="editorial">
      <section>
        <div className="ed-shell">
          <div className="eyebrow-row">
            <span className="section-marker">CMS</span>
            <span className="num">Admin</span>
          </div>

          <div className="ed-grid12">
            <div className="ed-admin-layout">
              <aside className="ed-admin-aside">
                <div className="ed-admin-kicker">Sections</div>
                <div className="ed-admin-nav">
                  {keys.map((k) => (
                    <button
                      key={k}
                      onClick={() => setActiveKey(k)}
                      className={`ed-admin-nav-item ${k === activeKey ? 'is-active' : ''}`}
                    >
                      {SECTION_LABELS[k]}
                    </button>
                  ))}
                  <button
                    onClick={() => setActiveKey('integrations')}
                    className={`ed-admin-nav-item ${activeKey === 'integrations' ? 'is-active' : ''}`}
                  >
                    integrations
                  </button>
                </div>

                <div className="ed-admin-divider" />

                <div className="ed-admin-kicker">Uploads</div>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    try {
                      setBusy(true);
                      const { url } = await uploadFile(f);
                      await navigator.clipboard.writeText(url);
                      setError(null);
                      setSavedAt(`Uploaded · copied URL: ${url}`);
                    } catch (err: unknown) {
                      setError(err instanceof Error ? err.message : 'Upload failed');
                    } finally {
                      setBusy(false);
                      e.target.value = '';
                    }
                  }}
                  disabled={busy}
                  className="ed-admin-upload"
                />
                <div className="ed-admin-note">
                  The file is stored on the API. Its address is copied so you can paste it into an image field.
                </div>

                <div className="ed-admin-divider" />

                <Button
                  variant="outline"
                  onClick={async () => {
                    await logout();
                    nav('/admin/login');
                  }}
                >
                  Sign out
                </Button>
              </aside>

              <div className="ed-admin-main">
                <div className="ed-admin-head">
                  <div>
                    <div className="ed-admin-title">{activeKey === 'integrations' ? 'Integrations' : SECTION_LABELS[activeKey]}</div>
                    <div className="ed-admin-meta">
                      {savedAt ? `Stored · ${savedAt}` : 'Showing the copy already on the site. Save to keep edits.'}
                    </div>
                  </div>
                  <div>
                    {activeKey === 'integrations' ? null : (
                      <Button
                        variant="outline"
                        disabled={draft == null || busy}
                        onClick={async () => {
                          try {
                            setBusy(true);
                            await putContent(activeKey, draft);
                            const refreshed = await getContent(activeKey);
                            setDraft(resolveDraft(activeKey, refreshed.value));
                            setSavedAt(refreshed.updatedAt);
                            setNotice('Saved. The site is using this copy.');
                            setError(null);
                          } catch (e: unknown) {
                            setNotice(null);
                            setError(e instanceof Error ? e.message : 'Save failed');
                          } finally {
                            setBusy(false);
                          }
                        }}
                      >
                        {busy ? 'Saving…' : 'Save'}
                      </Button>
                    )}
                  </div>
                </div>

                {error ? <div className="ed-admin-status is-bad" role="status">{error}</div> : null}
                {notice ? <div className="ed-admin-status is-ok" role="status">{notice}</div> : null}

                {activeKey === 'integrations' ? (
                  <div className="ed-admin-stack">
                    <div className="ed-admin-panel">
                      <div className="ed-admin-panel-title">Strava</div>
                      <div className="ed-admin-panel-sub">
                        {integrations?.strava.connected ? 'Connected' : 'Not connected'}
                      </div>
                      <div className="ed-admin-row">
                        <Button asChild>
                          <a href={apiUrl('/api/strava/auth')} target="_blank" rel="noopener noreferrer">
                            Connect Strava
                          </a>
                        </Button>
                        <div className="ed-admin-note">
                          If scope is missing, revoke the app in Strava settings and reconnect here.
                        </div>
                      </div>
                    </div>

                    <div className="ed-admin-panel">
                      <div className="ed-admin-panel-title">Instagram</div>
                      <div className="ed-admin-panel-sub">
                        {integrations?.instagram.configured ? 'Configured (images only)' : 'Not configured'}
                      </div>
                      <div className="ed-admin-grid2">
                        <div>
                          <label className="ed-admin-label">IG_LONG_LIVED_TOKEN</label>
                          <input
                            value={igToken}
                            onChange={(e) => setIgToken(e.target.value)}
                            className="ed-admin-input"
                            placeholder="Paste token"
                          />
                        </div>
                        <div>
                          <label className="ed-admin-label">IG_USER_ID</label>
                          <input
                            value={igUserId}
                            onChange={(e) => setIgUserId(e.target.value)}
                            className="ed-admin-input"
                            placeholder="Instagram business account id"
                          />
                        </div>
                      </div>
                      <div className="ed-admin-row">
                        <Button
                          variant="outline"
                          disabled={busy || !igToken.trim() || !igUserId.trim()}
                          onClick={async () => {
                            try {
                              setBusy(true);
                              await saveInstagramConfig(igToken.trim(), igUserId.trim());
                              const st = await getIntegrationsStatus();
                              setIntegrations(st);
                              setError(null);
                            } catch (e: unknown) {
                              setError(e instanceof Error ? e.message : 'Save failed');
                            } finally {
                              setBusy(false);
                            }
                          }}
                        >
                          Save
                        </Button>
                        <div className="ed-admin-note">Stored in SQLite (admin-only).</div>
                      </div>
                    </div>
                  </div>
                ) : draft == null ? (
                  <p className="ed-admin-note">Loading the copy on the site.</p>
                ) : (
                  <CmsFields section={activeKey} value={draft} onChange={setDraft} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

