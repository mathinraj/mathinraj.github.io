// Build-time refresh of figures that change between deploys. Every source is
// optional: a failed or slow request falls back to config.json, so a network
// hiccup can never fail the build. The deploy workflow rebuilds daily.
import config from './config.json';

type ExtKey = keyof typeof config.extensions;

const TIMEOUT_MS = 8000;
const githubToken = process.env.GITHUB_TOKEN;
const contribToken = process.env.CONTRIB_TOKEN;

async function fetchText(url: string, init: RequestInit = {}): Promise<string | null> {
  try {
    const res = await fetch(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (err) {
    console.warn(`[live] ${url} unavailable (${(err as Error).message}); using fallback`);
    return null;
  }
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  const text = await fetchText(url, init);
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

const clean = (v: unknown) => (typeof v === 'string' ? v.trim().replace(/^v/i, '') : null);

function compareSemver(a: string, b: string): number {
  const pa = a.split(/[.-]/).map((n) => parseInt(n, 10) || 0);
  const pb = b.split(/[.-]/).map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d) return d;
  }
  return 0;
}

const highest = (versions: (string | null)[]) =>
  versions.filter((v): v is string => !!v && /^\d+(\.\d+)*/.test(v)).sort(compareSemver).pop() ?? null;

// versions.json carries a flat "<key>": "x.y.z" and, for some extensions, a
// "<key>_release" block with per-browser versions. Any of them may lag.
function versionsFromFile(file: Record<string, any> | null, key: string): (string | null)[] {
  if (!file) return [];
  const release = file[`${key}_release`];
  const browsers = release?.browsers ? Object.values(release.browsers).map((b: any) => clean(b?.version)) : [];
  return [clean(file[key]), clean(release?.version), ...browsers];
}

async function latestRelease(repo: string): Promise<string | null> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (githubToken) headers.Authorization = `Bearer ${githubToken}`;
  const data = await fetchJson<{ tag_name?: string }>(`https://api.github.com/repos/${repo}/releases/latest`, { headers });
  return clean(data?.tag_name);
}

async function loadVersions(): Promise<Record<ExtKey, string>> {
  const file = await fetchJson<Record<string, any>>(config.live.versionsUrl);
  const keys = Object.keys(config.extensions) as ExtKey[];
  const releases = await Promise.all(keys.map((k) => latestRelease(config.extensions[k].repo)));
  return Object.fromEntries(
    keys.map((k, i) => {
      const manual = config.extensions[k].version;
      return [k, highest([manual, ...versionsFromFile(file, k), releases[i]]) ?? manual];
    }),
  ) as Record<ExtKey, string>;
}

// With CONTRIB_TOKEN (a personal token of the profile owner) the count includes
// private contributions. Without it, the public profile figure is used.
async function loadContributions(): Promise<number> {
  const user = config.live.githubUser;
  const floor = config.live.githubContributionsFloor;
  let count: number | null = null;

  if (contribToken) {
    const data = await fetchJson<any>('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `Bearer ${contribToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions}}}}',
        variables: { login: user },
      }),
    });
    count = data?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? null;
  }

  if (count === null) {
    const html = await fetchText(`https://github.com/users/${user}/contributions`);
    const match = html?.match(/([\d,]+)\s+contributions?\s+in the last year/);
    if (match) count = parseInt(match[1].replace(/,/g, ''), 10);
  }

  return Math.max(count ?? 0, floor);
}

const [versions, githubContributions] = await Promise.all([loadVersions(), loadContributions()]);

export { versions, githubContributions };
