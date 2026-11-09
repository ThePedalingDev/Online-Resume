import { useEffect, useState } from 'react';

type Day = { date: string; count: number; level: number };

const USER = 'ThePedalingDev';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function toWeeks(days: Day[]): Array<Array<Day | null>> {
  const lead = parseDate(days[0].date).getDay();
  const cells: Array<Day | null> = [...Array.from({ length: lead }, () => null), ...days];
  const weeks: Array<Array<Day | null>> = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function monthLabel(week: Array<Day | null>, prev: Array<Day | null> | undefined): string {
  const day = week.find((cell) => cell);
  if (!day) return '';
  const month = parseDate(day.date).getMonth();
  const prevDay = prev?.find((cell) => cell);
  if (prevDay && parseDate(prevDay.date).getMonth() === month) return '';
  return MONTHS[month];
}

export function GithubActivity() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ac = new AbortController();
    fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`, { signal: ac.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub activity failed (${res.status})`);
        return res.json() as Promise<{ total?: { lastYear?: number }; contributions?: Day[] }>;
      })
      .then((data) => {
        const contributions = data.contributions ?? [];
        if (!contributions.length) throw new Error('Empty activity');
        setDays(contributions);
        setTotal(typeof data.total?.lastYear === 'number' ? data.total.lastYear : null);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setFailed(true);
      });
    return () => ac.abort();
  }, []);

  const weeks = days ? toWeeks(days) : [];

  return (
    <a
      className="about-pattern"
      href={`https://github.com/${USER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={total != null ? `${total} GitHub contributions in the last year` : 'GitHub contributions'}
    >
      <span className="gh-kicker">GitHub · {USER}</span>
      {failed ? <span className="gh-empty">Activity unavailable</span> : null}
      {days ? (
        <span className="gh-scroll">
          <span className="gh-months">
            {weeks.map((week, index) => (
              <span key={days[Math.min(index * 7, days.length - 1)].date + index}>
                {monthLabel(week, weeks[index - 1])}
              </span>
            ))}
          </span>
          <span className="gh-board">
            <span className="gh-dow" aria-hidden="true">
              <i>Mon</i>
              <i>Wed</i>
              <i>Fri</i>
            </span>
            <span className="gh-weeks">
              {weeks.map((week, index) => (
                <span className="gh-week" key={index}>
                  {Array.from({ length: 7 }, (_, row) => {
                    const cell = week[row];
                    if (!cell) return <i key={row} className="gh-day is-pad" />;
                    return (
                      <i
                        key={cell.date}
                        className={`gh-day lv-${cell.level}`}
                        title={`${cell.count} on ${cell.date}`}
                      />
                    );
                  })}
                </span>
              ))}
            </span>
          </span>
          <span className="gh-foot">
            <span>{total != null ? `${total.toLocaleString('en-ZA')} this year` : 'Last year'}</span>
            <span className="gh-legend" aria-hidden="true">
              Less
              <i className="gh-day lv-0" />
              <i className="gh-day lv-1" />
              <i className="gh-day lv-2" />
              <i className="gh-day lv-3" />
              <i className="gh-day lv-4" />
              More
            </span>
          </span>
        </span>
      ) : null}
    </a>
  );
}
