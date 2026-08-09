/**
 * Todo lo que el asistente sabe de Ana. Solo se importa desde el servidor:
 * estos datos no viajan al bundle del cliente.
 */

export const ASSISTANT_FACTS = `
ABOUT ANA KARINA SUÁREZ GONZÁLEZ
- Frontend Developer, UX/UI Designer and AI Engineer based in Seville, Spain. Works remotely worldwide.
- Email: karinasuarezdos@gmail.com. Languages: Spanish (native), English (intermediate).
- LinkedIn: linkedin.com/in/ana-karina-suárez · GitHub: github.com/anakarinasuarez
- Open to roles, freelance work and collaborations.
- Do not give out a phone number. If asked for one, point to the email.

AVAILABILITY AND WORKING ARRANGEMENT — confirmed by Ana; quote it directly, no
hedging. This is the first thing a recruiter filters on.
- Start date: available immediately, no notice period.
- Arrangement: remote, or hybrid in Madrid, Seville and elsewhere in Andalusia.
- Works with companies based outside Spain.
- These are the places she is available, not a ranked preference: say "available
  for hybrid in…", never "prefers…".
- Not stated: relocation, hybrid in a city not listed, and any preference between
  remote and hybrid. Say it is not covered and offer to ask her.

POSITIONING
- Builds digital products that move real business numbers, not just interfaces.
- Designs AND ships: UX/UI in Figma + front-end in React/Next.js (one profile, no handoff gaps).
- Designs and orchestrates AI agents with Claude Code (automating coding, testing, refactoring, review) with a human in the loop.

EXPERIENCE
- Evolution POS (Sep 2022–present): table-side ordering & payment for restaurants; token-based design system that brands a restaurant page in minutes; AI agent workflows with Claude Code. Outcomes: +23.1% revenue YoY, −40% customer wait times, −40% production bugs, +31.2% scalability.
  Stack there: AI agents, multi-agent orchestration, Claude Code, MCP, LLM APIs,
  Figma, Next.js, React, JavaScript, TypeScript, HTML, CSS, Zustand, Vitest,
  Cypress, Git, GitHub, Jira, Docker.
- Freelance Developer & AI Builder (2023–present): DeepFilm (deepfilm.ai) — designed
  and built the landing page for an AI video-creation platform, including the UX/UI
  and a responsive, high-performance front end with cinematic video sections. Also
  delivers end-to-end web products for freelance clients, from Figma UX/UI to a
  deployed front end, plus personal projects exploring multi-agent orchestration,
  loop engineering and AI-native development.

EARLIER CAREER (2009–2022) — insurance and administration, the origin of her
business-outcome mindset: insurance agent at Ocaso; exclusive agent and claims
support at Seguros Caracas (Liberty Mutual); executive assistant at Corredores de
Seguros Rodolfo Aguilar; accounting assistant at Aero Expresos Ejecutivo.

EDUCATION & CERTIFICATIONS
- Licenciatura en Contaduría Pública (Public Accounting), Universidad Centro
  Occidental "Lisandro Alvarado", 2010–2015.
- Platzi: Frontend Developer, JavaScript (fundamentals to testing), React, Next.js,
  TypeScript, Node.js, Docker, Git & GitHub, Design Systems, Figma, Photoshop,
  software engineering fundamentals. Full list: platzi.com/p/suarez.anakarina
- Self-taught in front-end and AI engineering; her degree is in accounting. Say so
  plainly if asked — it is not a gap to hide.

SKILLS — "Tool (level): how she works with it". Quote the level exactly; never
upgrade, downgrade or invent one.

- Figma (Expert): low-fi wireframes defining information architecture and user
  flows, then hi-fi screens on a design system; interactive prototypes to validate
  before development; accessibility and close developer collaboration.
- HTML5 (Expert): semantic structure (header, nav, section, footer), ARIA and
  accessibility best practice, optimised for SEO and maintainability.
- CSS3 (Expert): mobile-first, system-driven interfaces; Flexbox and Grid; styles
  structured through design tokens (CSS variables).
- JavaScript (Expert): interactive logic and dynamic behaviour; Promises and
  async/await; modular, clean, scalable code.
- React (Expert): reusable components, logic in custom hooks, global state with
  Zustand, React 19 Server Components for load time and performance.
- Next.js (Expert): fullstack on the App Router — Server Components, streaming,
  client/server boundaries; SSR, SSG and ISR with caching and revalidation for UX
  and SEO.
- Git (Expert): feature-branch strategy, merge or rebase by context, clean commit
  history.
- GitHub (Expert): Pull Request workflow with review before merge; code reviews;
  CI/CD running automated tests on every PR.
- TypeScript (Advanced): static typing, interfaces and clear contracts across
  layers; maintainability and early error detection.
- Tailwind CSS (Advanced): responsive utility-first UIs; token-based, fits her
  design-system workflow; JIT keeps production CSS minimal.
- Claude Code (Advanced): AI-assisted development and agent orchestration. Defines
  project-level rules and custom skills so generated code follows the team's
  architecture, naming and testing conventions; designs specialised subagents
  (design review, frontend, code review, SEO) with a human in the loop; structured
  prompt engineering and context injection; connects tooling via MCP servers.
  Automates code generation, refactoring, test writing and review.
- Zustand (Proficient): minimal, fast global state — no boilerplate, none of the
  complexity of context.
- Docker (Intermediate): containerised apps for consistent dev/test/prod
  environments; optimised images, Docker Compose, dependency isolation.
OTHER TOOLS SHE LISTS (no proficiency level stated — say so if asked):
Vitest/Jest, Cypress, Node.js, REST APIs, SQL & NoSQL, Webflow, Photoshop, Jira.

PROJECTS — all hers; details come from the repositories, so they are safe to quote.
Give links exactly as written.

- Evolution POS — see EXPERIENCE. Her deepest work, and the one with measured
  business outcomes.
- ReadEasily (read-easily.vercel.app) — learn English through short illustrated
  stories: CEFR-graded (A1–C1), synchronised narration that highlights words as
  spoken, tap-to-translate (ES/FR/PT), saved words, practice sentences from Gemini
  Flash with a template fallback so it works with no API. Next.js 16, React 19,
  strict TypeScript, Tailwind v4, Radix, Storybook, MSW, Sentry.
  Her strongest technical reference, for two reasons:
  (a) Figma is the source of truth — tokens generated from it, never hand-edited;
  each component sits with its story, test and Figma mapping. The
  designer-who-codes pipeline working end to end, not a claim.
  (b) It is BUILT BY a roster of specialist agents she designed — working evidence
  of the AI orchestration on her CV. Be precise: the agents are her development
  process, not a product feature. They write, review and test the code; they do not
  run inside the app and users never meet them. The only AI the app itself runs is
  Gemini writing practice sentences. Never say the app "uses agents to generate
  content" or "automate tasks" for its users — an interviewer will catch it.
  Quality: 686 unit/component tests, Playwright e2e, jest-axe with full keyboard
  operability, WCAG AA, and CI running lint, typecheck, tests, build and a
  dependency audit on every PR.
- Chef at Home (chef-at-home-v1.vercel.app) — turns the ingredients you have into
  full recipes as structured JSON from Gemini 2.5 Flash. JWT auth, save/edit/delete,
  design system in code with light/dark tokens, mobile-first matched to Figma, SEO
  with metadata, Open Graph, sitemap and PWA manifest. Next.js 15, React 19,
  Tailwind v4, Zustand, Prisma + PostgreSQL, Vitest, Cypress.
- DeepFilm (deepfilm.ai) — client work: UX/UI and front end of the landing page for
  an AI video platform, with cinematic video sections.
`;

/**
 * Año en que Ana empezó con cada bloque. Los años de experiencia se calculan
 * aquí y no en el prompt: pedirle la resta al modelo es pedirle que se
 * equivoque delante de un reclutador.
 */
const EXPERIENCE_SINCE: ReadonlyArray<readonly [string, number]> = [
  ["Front-end (HTML, CSS, JavaScript)", 2022],
  ["React", 2022],
  ["Next.js", 2023],
  ["AI, agents and AI-assisted development", 2025],
];

export function experienceLines(now: Date): string {
  const year = now.getUTCFullYear();
  return EXPERIENCE_SINCE.map(([area, since]) => {
    const years = year - since;
    const span = years <= 0 ? "under a year" : `~${years} year${years === 1 ? "" : "s"}`;
    return `- ${area}: since ${since} (${span}).`;
  }).join("\n");
}
