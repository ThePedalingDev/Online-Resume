import type { CmsKey } from '@/lib/content';

type Draft = Record<string, unknown>;
type Row = Record<string, unknown>;

function text(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function Field({ label, value, onChange, area = false }: { label: string; value: string; onChange: (next: string) => void; area?: boolean }) {
  return (
    <label className="ed-admin-field">
      <span className="ed-admin-label">{label}</span>
      {area ? (
        <textarea className="ed-admin-textarea is-short" value={value} onChange={(e) => onChange(e.target.value)} rows={4} />
      ) : (
        <input className="ed-admin-input" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function patch<T>(list: T[], index: number, next: T): T[] {
  return list.map((item, i) => (i === index ? next : item));
}

export function CmsFields({ section, value, onChange }: { section: CmsKey; value: unknown; onChange: (next: unknown) => void }) {
  if (section === 'hero' || section === 'cycling' || section === 'docs' || section === 'about') {
    const draft = (value && typeof value === 'object' ? value : {}) as Draft;
    const set = (key: string, next: unknown) => onChange({ ...draft, [key]: next });
    if (section === 'hero') {
      return (
        <div className="ed-admin-stack">
          <Field label="Kicker" value={text(draft.kicker)} onChange={(v) => set('kicker', v)} />
          <Field label="Lead" value={text(draft.lead)} onChange={(v) => set('lead', v)} area />
          <Field label="Second line" value={text(draft.sub)} onChange={(v) => set('sub', v)} area />
          <Field label="Work" value={text(draft.work)} onChange={(v) => set('work', v)} />
          <Field label="Employment" value={text(draft.employment)} onChange={(v) => set('employment', v)} />
          <Field label="Portrait address" value={text(draft.imageUrl)} onChange={(v) => set('imageUrl', v)} />
          <p className="ed-admin-note">Leave the portrait address empty to keep the photo already on the site.</p>
          <Field label="Portrait description" value={text(draft.imageAlt)} onChange={(v) => set('imageAlt', v)} />
        </div>
      );
    }
    if (section === 'cycling') {
      return (
        <div className="ed-admin-stack">
          <Field label="Intro" value={text(draft.introHtml)} onChange={(v) => set('introHtml', v)} area />
          <p className="ed-admin-note">The ride totals stay live from Strava. This text is the paragraph beside them.</p>
        </div>
      );
    }
    if (section === 'docs') {
      const items = Array.isArray(draft.items) ? draft.items as Row[] : [];
      return (
        <div className="ed-admin-stack">
          <Field label="Intro" value={text(draft.intro)} onChange={(v) => set('intro', v)} area />
          {items.map((item, index) => (
            <div className="ed-admin-panel" key={index}>
              <Field label="Label" value={text(item.label)} onChange={(v) => set('items', patch(items, index, { ...item, label: v }))} />
              <Field label="Address" value={text(item.href)} onChange={(v) => set('items', patch(items, index, { ...item, href: v }))} />
              <Field label="Note" value={text(item.note)} onChange={(v) => set('items', patch(items, index, { ...item, note: v }))} />
            </div>
          ))}
        </div>
      );
    }
    const images = Array.isArray(draft.images) ? draft.images as Row[] : [];
    const sides = Array.isArray(draft.sideHtml) ? draft.sideHtml as string[] : [];
    return (
      <div className="ed-admin-stack">
        <Field label="Opening line" value={text(draft.ledeHtml)} onChange={(v) => set('ledeHtml', v)} area />
        {sides.map((paragraph, index) => (
          <Field
            key={index}
            label={`Paragraph ${index + 1}`}
            value={paragraph}
            area
            onChange={(v) => set('sideHtml', patch(sides, index, v))}
          />
        ))}
        {images.map((image, index) => (
          <div className="ed-admin-panel" key={text(image.slot) || index}>
            <div className="ed-admin-panel-title">Photo {index + 1}</div>
            <Field label="Caption" value={text(image.label)} onChange={(v) => set('images', patch(images, index, { ...image, label: v }))} />
            <Field label="Meta" value={text(image.meta)} onChange={(v) => set('images', patch(images, index, { ...image, meta: v }))} />
            <Field label="Image address" value={text(image.url)} onChange={(v) => set('images', patch(images, index, { ...image, url: v }))} />
          </div>
        ))}
        <p className="ed-admin-note">Leave an image address empty to keep the photo already on the site. Links in a paragraph can stay as HTML.</p>
      </div>
    );
  }

  if (section === 'journey') {
    const items = Array.isArray(value) ? value as Row[] : [];
    const set = (next: Row[]) => onChange(next);
    return (
      <div className="ed-admin-stack">
        {items.map((item, index) => (
          <div className="ed-admin-panel" key={index}>
            <div className="ed-admin-grid2">
              <Field label="Year" value={text(item.year)} onChange={(v) => set(patch(items, index, { ...item, year: v }))} />
              <Field label="Chip" value={text(item.chip)} onChange={(v) => set(patch(items, index, { ...item, chip: v }))} />
            </div>
            <Field label="Title" value={text(item.title)} onChange={(v) => set(patch(items, index, { ...item, title: v }))} />
            <Field label="Description" value={text(item.desc)} onChange={(v) => set(patch(items, index, { ...item, desc: v }))} area />
            <Field
              label="Tags"
              value={Array.isArray(item.tags) ? (item.tags as string[]).join(', ') : ''}
              onChange={(v) => set(patch(items, index, { ...item, tags: v.split(',').map((tag) => tag.trim()).filter(Boolean) }))}
            />
          </div>
        ))}
      </div>
    );
  }

  if (section === 'gearCoding' || section === 'gearCycling') {
    const items = Array.isArray(value) ? value as Row[] : [];
    const set = (next: Row[]) => onChange(next);
    return (
      <div className="ed-admin-stack">
        {items.map((item, index) => (
          <div className="ed-admin-panel" key={index}>
            <Field label="Name" value={text(item.name)} onChange={(v) => set(patch(items, index, { ...item, name: v }))} />
            <Field label="Spec" value={text(item.spec)} onChange={(v) => set(patch(items, index, { ...item, spec: v }))} />
            <div className="ed-admin-grid2">
              <Field label="Category" value={text(item.cat)} onChange={(v) => set(patch(items, index, { ...item, cat: v }))} />
              <Field label="Link" value={text(item.href)} onChange={(v) => set(patch(items, index, { ...item, href: v }))} />
            </div>
          </div>
        ))}
        <p className="ed-admin-note">Photos stay tied to the item name. Renaming an item hides its photo until the name matches again.</p>
      </div>
    );
  }

  if (section === 'gallery') {
    const items = Array.isArray(value) ? value as Row[] : [];
    const set = (next: Row[]) => onChange(next);
    return (
      <div className="ed-admin-stack">
        {items.map((item, index) => (
          <div className="ed-admin-panel" key={text(item.cls) || index}>
            <Field label="Date or label" value={text(item.n)} onChange={(v) => set(patch(items, index, { ...item, n: v }))} />
            <Field label="Caption" value={text(item.l)} onChange={(v) => set(patch(items, index, { ...item, l: v }))} />
            <Field label="Image address" value={text(item.url)} onChange={(v) => set(patch(items, index, { ...item, url: v }))} />
          </div>
        ))}
        <p className="ed-admin-note">Leave an image address empty to keep the photo already on the site.</p>
      </div>
    );
  }

  const cats = Array.isArray(value) ? value as Row[] : [];
  const set = (next: Row[]) => onChange(next);
  return (
    <div className="ed-admin-stack">
      {cats.map((cat, index) => {
        const items = Array.isArray(cat.items) ? cat.items as Row[] : [];
        return (
          <div className="ed-admin-panel" key={index}>
            <Field label="Group" value={text(cat.name)} onChange={(v) => set(patch(cats, index, { ...cat, name: v }))} />
            {items.map((item, itemIndex) => (
              <div className="ed-admin-grid2" key={itemIndex}>
                <Field
                  label="Tool"
                  value={text(item.n)}
                  onChange={(v) => set(patch(cats, index, { ...cat, items: patch(items, itemIndex, { ...item, n: v }) }))}
                />
                <Field
                  label="Time"
                  value={text(item.y)}
                  onChange={(v) => set(patch(cats, index, { ...cat, items: patch(items, itemIndex, { ...item, y: v }) }))}
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
