import config from './config.json';

const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parseMonth(s: string): Date {
  const [m, y] = s.split(' ');
  return new Date(parseInt(y), MONTHS[m] ?? 0, 1);
}

export function duration(start: string, end: string | null = null): string {
  const a = parseMonth(start);
  const b = end ? parseMonth(end) : new Date();
  const months = Math.max(1, (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()));
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  const y = yrs ? `${yrs} yr${yrs > 1 ? 's' : ''}` : '';
  const m = mos ? `${mos} mo${mos > 1 ? 's' : ''}` : '';
  return [y, m].filter(Boolean).join(' ');
}

export const person = {
  name: 'Mathinraj Ramasamy',
  first: 'Mathinraj',
  last: 'Ramasamy',
  role: 'Full stack engineer at Cognizant',
  location: 'Coimbatore, Tamil Nadu',
  email: 'mathinraj7@gmail.com',
  resume: '/images/Mathinraj_Resume.pdf',
};

export const links = {
  github: 'https://github.com/mathinraj',
  linkedin: 'https://www.linkedin.com/in/mathinraj',
  leetcode: 'https://leetcode.com/Mathinraj',
  hackerrank: 'https://www.hackerrank.com/mathinraj',
  medium: 'https://medium.com/@mathinraj',
  instagram: 'https://www.instagram.com/mathin_spm/',
};

export const stack = [
  { label: 'Languages', items: 'Java, Python, JavaScript, C, SQL' },
  { label: 'Frameworks', items: 'Spring Boot, Spring Security, React, Next.js, Tailwind CSS' },
  { label: 'Platforms', items: 'AWS (EC2, RDS, IAM, DynamoDB), Docker, Kubernetes, Jenkins, ArgoCD, Maven' },
  { label: 'Working with', items: 'Claude, Cursor, Chrome extensions on Manifest V3' },
];

export const roles = [
  {
    role: 'Junior Software Engineer',
    company: 'Cognizant',
    place: 'Coimbatore',
    period: 'Oct 2025 – now',
    length: duration('Oct 2025'),
    summary: 'Enterprise fintech for a Fortune 500 client, across a microservices platform, front to back.',
    points: [
      'Built an AI-powered campaign tool for marketing teams. It takes an uploaded deck through Figma designs to a generated landing page, cutting campaign launch from days to minutes.',
      'Built Antidote, a compliance remediation tool that reads Jira tickets, identifies the security issue, applies the fix and updates the ticket, automating the team’s monthly security work.',
      'Daily work in Spring Boot microservices, React, Kubernetes, Jenkins pipelines and AWS.',
    ],
  },
  {
    role: 'Software Engineer Trainee',
    company: 'Cognizant',
    place: 'Coimbatore',
    period: 'Oct 2024 – Oct 2025',
    length: '1 yr',
    summary: 'Full Stack Developer program at Cognizant Academy, shipping real applications from the first week.',
    points: [
      'Built SmartSpend, a full-stack expense tracker on Spring Boot and React. It later became SpendTrak, an offline-first PWA.',
      'Trained in Spring Boot, Spring Security, React and SQL.',
    ],
  },
  {
    role: 'Assistant Engineer, Trainee',
    company: 'Delta Electronics',
    place: 'Krishnagiri',
    period: 'Jan 2024 – Oct 2024',
    length: duration('Jan 2024', 'Oct 2024'),
    summary: 'Engineering operations in an industrial manufacturing plant. Built internal tools that automated recurring manual processes.',
    points: [],
  },
];

export const cognizantTenure = duration('Oct 2024');

const real = (url?: string | null) => (url && !url.includes('placeholder') ? url : null);
const ext = config.extensions;

export const extensions = [
  {
    key: 'touchlock',
    name: ext.touchlock.name,
    tagline: ext.touchlock.tagline,
    about: 'Locks Chrome and Firefox behind Touch ID, Windows Hello or a 6-digit PIN.',
    users: ext.touchlock.users,
    rating: ext.touchlock.rating,
    version: ext.touchlock.version,
    icon: ext.touchlock.icon,
    store: real(ext.touchlock.storeUrl),
    site: real(ext.touchlock.siteUrl),
    code: 'https://github.com/mathinraj/TouchLock',
  },
  {
    key: 'repolens',
    name: ext.repolens.name,
    tagline: ext.repolens.tagline,
    about: 'Ask about any repo, pull request, file or commit in a side panel, with your own Claude, ChatGPT or Gemini key. No servers, no tracking.',
    users: ext.repolens.users,
    rating: ext.repolens.rating,
    version: ext.repolens.version,
    icon: ext.repolens.icon,
    store: real(ext.repolens.storeUrl),
    site: real(ext.repolens.siteUrl),
    code: 'https://github.com/mathinraj/RepoLens',
  },
  {
    key: 'bingit',
    name: ext.bingit.name,
    tagline: ext.bingit.tagline,
    about: 'Runs Bing searches with human-like typing, natural scrolling and real trending queries.',
    users: ext.bingit.users,
    rating: ext.bingit.rating,
    version: ext.bingit.version,
    icon: ext.bingit.icon,
    store: real(ext.bingit.storeUrl),
    site: real(ext.bingit.siteUrl),
    code: 'https://github.com/mathinraj/BingAutoSearch',
  },
  {
    key: 'autoprompt',
    name: ext.autoprompt.name,
    tagline: ext.autoprompt.tagline,
    about: 'Batch-prompts Microsoft Copilot, M365, GitHub and Teams Copilot, with 5,700+ built-in prompts.',
    users: ext.autoprompt.users,
    rating: ext.autoprompt.rating,
    version: ext.autoprompt.version,
    icon: ext.autoprompt.icon,
    store: real(ext.autoprompt.storeUrl),
    site: real(ext.autoprompt.siteUrl),
    code: 'https://github.com/mathinraj/copilot-batch-search',
  },
];

export const totalUsers = config.stats.totalExtensionUsers;

export const builds = [
  {
    name: 'SpendTrak',
    kind: 'Progressive web app',
    about: 'Offline-first expense tracking with Google Drive sync, split expenses, bill reminders and multiple currencies. No backend: the data stays on the device.',
    made: 'Next.js 15, React 19, Recharts, Google Drive API',
    live: 'https://spendtrak.vercel.app',
    code: 'https://github.com/mathinraj/SmartSpend-2.0',
  },
  {
    name: 'AIArena',
    kind: 'Web app',
    about: 'Sends one prompt to several language models in parallel and streams their answers side by side.',
    made: 'React, streaming APIs',
    live: null,
    code: 'https://github.com/mathinraj/tri-llm',
  },
  {
    name: 'Undrive',
    kind: 'Web app',
    about: 'Stores files in Google Drive’s hidden appDataFolder, out of sight of the normal Drive interface.',
    made: 'Next.js, Google Drive API, OAuth 2.0',
    live: 'https://undrive-app.vercel.app',
    code: 'https://github.com/mathinraj/Undrive-App',
  },
];

export const counts = [
  { value: '212', label: 'LeetCode problems solved', href: links.leetcode },
  { value: '319', label: 'GitHub contributions', href: links.github },
  { value: '7', label: 'HackerRank badges, Java and React at 5 stars', href: links.hackerrank },
  { value: '2', label: 'IEEE publications', href: null },
];

export const awards = [
  { title: 'Hall of Fame, Emerging Talent Award', org: 'Cognizant ADM & DE', date: 'Apr 2026', note: 'Monthly winner in the Emerging Talent (PA & A) category.' },
  { title: 'Best Performer, coding contest', org: 'Kongu Engineering College', date: '2023', note: 'Department level, annual contest.' },
  { title: 'Second Prize, Codeville', org: 'College of Engineering, Guindy', date: '2022', note: 'Inter-college coding competition.' },
];

export const papers = [
  {
    title: 'Automatic Flood Alert System Using IoT',
    venue: '9th International Conference on Electrical Energy Systems (ICEES), IEEE',
    note: 'Connects hydropower stations to one database and alerts residents in high-risk areas as dam water levels rise.',
  },
  {
    title: 'Development of Chain Link Twister Machine for Land Fencing Applications',
    venue: '7th ICECA, 2023, IEEE',
    note: 'An automated chain link twisting machine with adjustable length control for small fencing businesses.',
  },
];

export const certificates = [
  { title: 'Claude Certified Architect, Professional', org: 'Anthropic', date: '2026' },
  { title: 'Claude Certified Architect, Foundations', org: 'Anthropic', date: '2026' },
];

export const education = [
  { title: 'Full Stack Developer Program', org: 'Cognizant Academy', date: 'Oct 2024 – Jan 2025' },
  { title: 'B.E. Electrical and Electronics Engineering', org: 'Kongu Engineering College', date: '2020 – 2024' },
  { title: 'Higher Secondary', org: 'Malar Matriculation Hr Sec School', date: '2018 – 2020' },
];

export const chapters = [
  { id: 'top', numeral: '', title: 'Mathinraj Ramasamy' },
  { id: 'engineer', numeral: 'I', title: 'The engineer' },
  { id: 'work', numeral: 'II', title: 'Day job' },
  { id: 'after-hours', numeral: 'III', title: 'After hours' },
  { id: 'builds', numeral: 'IV', title: 'Other builds' },
  { id: 'record', numeral: 'V', title: 'On the record' },
  { id: 'contact', numeral: 'HEAD', title: 'Write to me' },
];
