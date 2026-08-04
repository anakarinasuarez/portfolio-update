/**
 * Conocimiento y reglas del asistente del portfolio.
 * Solo se importa desde el route handler: los datos y el system prompt NO
 * viajan al bundle del cliente (antes estaban dentro de Chat.tsx).
 */

export type Lang = "es" | "en";

/** Datos de la reunión que el asistente reúne antes de cerrar la solicitud. */
export type Booking = {
  name?: string;
  email?: string;
  datetime?: string;
  format?: string;
  topic?: string;
};

const ASSISTANT_FACTS = `
ABOUT ANA KARINA SUÁREZ GONZÁLEZ
- Frontend Developer, UX/UI Designer and AI Engineer based in Seville, Spain. Works remotely worldwide.
- Email: karinasuarezdos@gmail.com. Languages: Spanish (native), English (intermediate).
- Open to roles, freelance work and collaborations.

POSITIONING
- Builds digital products that move real business numbers, not just interfaces.
- Designs AND ships: UX/UI in Figma + front-end in React/Next.js (one profile, no handoff gaps).
- Designs and orchestrates AI agents with Claude Code (automating coding, testing, refactoring, review) with a human in the loop.

EXPERIENCE
- Evolution POS (Sep 2022–present): table-side ordering & payment for restaurants; token-based design system that brands a restaurant page in minutes; AI agent workflows with Claude Code. Outcomes: +23.1% revenue YoY, −40% customer wait times, −40% production bugs, +31.2% scalability.
- Freelance Developer & AI Builder (2023–present): DeepFilm (deepfilm.ai) landing for an AI video platform; end-to-end client web products; personal AI/agent projects.
- 10+ years earlier in finance & insurance, the origin of her business-outcome mindset.

SKILLS
- AI & Agents: Claude Code, agent orchestration, custom workflows, prompt engineering, AI-assisted development.
- Frontend: React, Next.js, TypeScript, JavaScript, Zustand, Vitest/Jest, Cypress, HTML5/CSS.
- Design: UX/UI, Figma, Design Systems, Webflow, Photoshop.
- Backend & tooling: Node.js, REST APIs, SQL & NoSQL, Git/GitHub, Docker, Jira.

PROJECTS: Evolution POS, DeepFilm, Home at Chef (AI recipe app), ReadEasily (AI graded-reading app).
`;

/** Marca que el modelo emite en su última línea cuando ya tiene todos los datos. */
const BOOKING_TAG = "BOOKING:";

/**
 * El modelo no sabe qué día es: sin esta referencia resuelve "el martes que
 * viene" inventándose el año y Ana recibe la solicitud con una fecha falsa.
 */
function todayLine(now: Date): string {
  const iso = now.toISOString().slice(0, 10);
  const weekday = now.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
  return `Today is ${weekday}, ${iso}. Resolve any relative date the visitor gives you ("next Tuesday", "the 12th") against it, and always include the full year in the BOOKING datetime.`;
}

export function systemPrompt(lang: Lang, now: Date = new Date()): string {
  const langLine = lang === "es" ? "Reply ONLY in Spanish." : "Reply ONLY in English.";
  return `You are the friendly, professional assistant on Ana Karina Suárez González's portfolio website. ${langLine}
${todayLine(now)}
Keep replies concise (2–4 sentences), warm and confident. Use only the facts below, never invent details. If you don't know something, say you'll pass the question to Ana.
${ASSISTANT_FACTS}
SCHEDULING A MEETING: If the visitor wants to talk, meet or interview Ana, ask which format they prefer: an in-person interview, a video call, or a phone call. Collect, one or two at a time: (1) name, (2) email (and a phone number if they pick a phone call), (3) preferred date & time with timezone, (4) meeting format (interview / video call / phone call), (5) topic or role. Once you have ALL of these, confirm briefly and then append on a NEW LINE exactly:
${BOOKING_TAG} {"name":"...","email":"...","datetime":"...","format":"...","topic":"..."}
Output that ${BOOKING_TAG} line only when everything is known. Never show the ${BOOKING_TAG} line before then.`;
}

/**
 * Separa el texto visible de la línea BOOKING. Si el JSON viene malformado se
 * descarta la reserva y se conserva la respuesta: el visitante nunca ve la marca.
 */
export function splitBooking(raw: string): { reply: string; booking: Booking | null } {
  const idx = raw.indexOf(BOOKING_TAG);
  if (idx === -1) return { reply: raw.trim(), booking: null };

  const reply = raw.slice(0, idx).trim();
  const jsonPart = raw.slice(idx + BOOKING_TAG.length).trim();
  const candidate = jsonPart.match(/\{[\s\S]*\}/)?.[0];
  if (!candidate) return { reply, booking: null };

  try {
    return { reply, booking: JSON.parse(candidate) as Booking };
  } catch {
    return { reply, booking: null };
  }
}
