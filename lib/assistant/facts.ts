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

AVAILABILITY AND WORKING ARRANGEMENT — confirmed by Ana. Quote it directly and
without hedging; this is one of the first things a recruiter filters on.
- Start date: immediately available, no notice period to serve.
- Arrangement: remote, or hybrid. For hybrid she is available in Madrid, Seville
  and elsewhere in Andalusia.
- She works with companies based outside Spain.
- The list above is where she is available, not a ranked preference. Say "she is
  available for hybrid in…", never "she prefers…".
- Not stated: whether she would relocate, whether she would consider hybrid in a
  city not listed, and any preference between remote and hybrid. Do not infer any
  of it — say it is not covered and offer to ask her.

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
business-outcome mindset:
- Insurance Agent at Ocaso.
- Exclusive Agent and Customer Service (Claims) at Seguros Caracas de Liberty Mutual.
- Executive Assistant at Corredores de Seguros Rodolfo Aguilar.
- Accounting Assistant at Aero Expresos Ejecutivo.

EDUCATION & CERTIFICATIONS
- Licenciatura en Contaduría Pública (BSc equivalent, Public Accounting),
  Universidad Centro Occidental "Lisandro Alvarado", 09/2010 – 07/2015.
- Platzi: Frontend Developer; Practical Frontend Developer; JavaScript (fundamentals,
  DOM, closures & scope, async, ECMAScript 6+, testing); React.js; Next.js;
  TypeScript; Node.js; Docker; professional Git & GitHub; Design Systems; Figma;
  Photoshop; Software Engineering Fundamentals.
  Full list: platzi.com/p/suarez.anakarina
- She is self-taught in front-end and AI engineering; her degree is in accounting.
  State this plainly if asked — it is not a gap to hide.

SKILLS — each line is "Tool (level): how she actually works with it".
Quote the level exactly as written. Never upgrade, downgrade or invent a level.

- Figma (Expert): designs from low-fidelity wireframes that define information
  architecture and user flows, then high-fidelity screens built on a Design System
  for consistency and scale. Builds interactive prototypes to validate the
  experience before development. Focuses on accessibility and close developer
  collaboration.
- HTML5 (Expert): semantic, accessible structure using header, nav, section and
  footer. Applies ARIA attributes and accessibility best practice, for a base
  optimised for SEO and maintainability.
- CSS3 (Expert): scalable, system-driven interfaces, mobile-first. Layouts with
  Flexbox and Grid; styles structured through design tokens (CSS variables) to
  stay consistent with the Design System.
- JavaScript (Expert): interactive logic and dynamic application behaviour.
  Handles asynchrony with Promises and async/await. Applies modularity and
  scalability principles, favouring clean, maintainable code aligned with modern
  architectures.
- React (Expert): dynamic applications built from reusable components. Encapsulates
  logic in custom hooks, manages global state with Zustand, and uses React 19
  Server Components to improve load time and performance.
- Next.js (Expert): fullstack applications on the App Router, using Server
  Components, streaming and client/server boundaries for performance. Applies SSR,
  SSG and ISR alongside caching and revalidation for UX and SEO.
- Git (Expert): version control with a feature-branch strategy that keeps work
  isolated, integrating with merge or rebase depending on context to keep a clean
  commit history.
- GitHub (Expert): Pull Request workflow with review and discussion before merge.
  Takes part in code reviews and wires CI/CD to run automated tests on each PR.
- TypeScript (Advanced): static typing for robustness — interfaces and types that
  set clear contracts across layers, improving maintainability, scalability and
  early error detection.
- Tailwind CSS (Advanced): responsive utility-first UIs built fast. Its token-based
  approach fits her design-system workflow, and the JIT compiler keeps production
  CSS minimal.
- Claude Code (Advanced): AI-assisted development and agent orchestration. Defines
  project-level rules and custom skills so generated code follows the team's
  architecture, naming and testing conventions. Designs specialised subagents —
  design review, frontend implementation, code review, SEO — with a human in the
  loop on every merge. Applies structured prompt engineering and technical context
  injection, and connects external tooling through MCP servers. Uses it to automate
  code generation, refactoring, test writing and review.
- Zustand (Proficient): global state in React with a minimal, fast store — no
  boilerplate and none of the complexity of context.
- Docker (Intermediate): containerises applications for consistent environments
  across development, testing and production. Defines optimised images and manages
  services with Docker Compose for scalability, dependency isolation and portability.

OTHER TOOLS SHE LISTS (no proficiency level stated — say so if asked):
Vitest/Jest, Cypress, Node.js, REST APIs, SQL & NoSQL, Webflow, Photoshop, Jira.

PROJECTS — all of these are hers; the detail below is drawn from the repositories
themselves, so it is safe to quote.

- Evolution POS — see EXPERIENCE above. Her deepest piece of work and the one with
  measured business outcomes.
- ReadEasily (read-easily.vercel.app) — an app to learn English through short
  illustrated stories: read, listen, translate, save words, practice. Stories graded
  by CEFR level (A1–C1); narration with a synchronized accessible player that
  highlights words as they are spoken; tap-to-translate (Spanish, French,
  Portuguese); a saved-words list; and practice sentences generated on the fly with
  Google Gemini Flash, with a template fallback so it still works with no API.
  Next.js 16 (App Router, React Server Components), React 19, strict TypeScript,
  Tailwind v4, Radix UI primitives, Storybook, Zustand, TanStack Query, MSW,
  Sentry for errors and Web Vitals, deployed on Vercel.
  Two things make this her strongest technical reference:
  (a) Figma is the source of truth — the design tokens are generated from it and
  never hand-edited, and each component sits with everything it owns beside it
  (component, story, test, Figma mapping). The build order is fixed: tokens → ui
  → composites → features → flows → e2e. This is the designer-who-codes pipeline
  working end to end, not a claim.
  (b) The app is BUILT BY a roster of specialist agents she designed (see its
  .claude/agents/ and CONTRIBUTING.md). It is working evidence of the AI
  orchestration on her CV — a shipped, tested, accessible product produced that
  way, not a demo.
  Be precise about (b): the agents are her development process, not a feature of
  the product. They write, review and test the code; they do not run inside the
  app and users never interact with them. The only AI the app itself runs is
  Gemini Flash generating practice sentences. Never say the app "uses agents to
  generate content" or "automate tasks" for its users — that is false and a
  technical interviewer will catch it.
  Quality: 686 unit and component tests (Vitest + React Testing Library),
  Playwright end-to-end over browse → read → save → practice, jest-axe checks plus
  keyboard operability and visible focus on every interactive component, WCAG AA
  with prefers-reduced-motion honoured and AA-contrast tokens. CI runs lint,
  typecheck, tests, build and a dependency-vulnerability audit on every pull
  request; every PR gets a preview deploy and there is a documented rollback
  runbook. The live demo runs on mocked data, so it is fully clickable with no
  sign-in.
- Chef at Home (chef-at-home-v1.vercel.app) — turns the ingredients you have into
  full recipes with AI: title, ingredients, steps and timing as structured JSON from
  Google Gemini 2.5 Flash, on the free tier so it stays free and unlimited. Includes
  JWT authentication, saving/editing/deleting recipes, a design system in code with
  semantic tokens and light/dark theming, mobile-first from 390px to 1280px matched
  to Figma, and SEO with per-route metadata, Open Graph, sitemap and PWA manifest.
  Next.js 15, React 19, Tailwind v4, Zustand, Prisma + PostgreSQL (Neon), Vitest,
  Cypress, deployed on Vercel.
- DeepFilm (deepfilm.ai) — client work: she designed and built the landing page for
  an AI video-creation platform, covering the UX/UI and a responsive,
  high-performance front end with cinematic video sections.

If asked for links, give them exactly as written above.
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
