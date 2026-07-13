"use client";

/* ============================================================
   AI assistant — answers questions about Ana Karina and helps
   visitors request an interview. Uses window.claude.complete.
   ============================================================ */

import { useState, useEffect, useRef } from "react";
import { useLang, type Lang } from "@/components/i18n/lang";
import { Arrow } from "@/components/ui/Arrow";

declare global {
  interface Window {
    claude?: {
      complete?: (args: {
        messages: { role: string; content: string }[];
      }) => Promise<string>;
    };
  }
}

type ChatMsg = { role: "user" | "assistant"; text: string; mail?: boolean };
type Booking = {
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
- 10+ years earlier in finance & insurance — the origin of her business-outcome mindset.

SKILLS
- AI & Agents: Claude Code, agent orchestration, custom workflows, prompt engineering, AI-assisted development.
- Frontend: React, Next.js, TypeScript, JavaScript, Zustand, Vitest/Jest, Cypress, HTML5/CSS.
- Design: UX/UI, Figma, Design Systems, Webflow, Photoshop.
- Backend & tooling: Node.js, REST APIs, SQL & NoSQL, Git/GitHub, Docker, Jira.

PROJECTS: Evolution POS, DeepFilm, Home at Chef (AI recipe app), ReadEasily (AI graded-reading app).
`;

const CHAT_COPY: Record<
  Lang,
  {
    title: string;
    sub: string;
    greeting: string;
    chips: string[];
    placeholder: string;
    send: string;
    open: string;
    confirm: string;
    booked: string;
    errorNoAPI: string;
    error: string;
    thinking: string;
  }
> = {
  en: {
    title: "Ana's Assistant",
    sub: "Ask anything · Book an interview",
    greeting:
      "Hi! 👋 I'm Ana Karina's assistant. Ask me about her work, AI-agent experience or stack — or I can help you book an interview, video call or phone call with her.",
    chips: ["What's her AI experience?", "Book a call or interview", "Tech stack?"],
    placeholder: "Type your message…",
    send: "Send",
    open: "Chat with Ana's assistant",
    confirm: "Confirm & send request to Ana",
    booked: "Request ready — your email app will open so Ana receives the details. ✅",
    errorNoAPI: "The live assistant isn't available here. You can email Ana directly:",
    error: "Sorry — something went wrong. You can also email Ana directly:",
    thinking: "Thinking…",
  },
  es: {
    title: "Asistente de Ana",
    sub: "Pregunta lo que quieras · Agenda una entrevista",
    greeting:
      "¡Hola! 👋 Soy el asistente de Ana Karina. Pregúntame por su trabajo, su experiencia con agentes de IA o su stack — o te ayudo a agendar una entrevista, videollamada o llamada telefónica con ella.",
    chips: ["¿Qué experiencia tiene con IA?", "Agendar llamada o entrevista", "¿Su stack técnico?"],
    placeholder: "Escribe tu mensaje…",
    send: "Enviar",
    open: "Chatea con el asistente de Ana",
    confirm: "Confirmar y enviar solicitud a Ana",
    booked: "Solicitud lista — se abrirá tu correo para que Ana reciba los detalles. ✅",
    errorNoAPI: "El asistente en vivo no está disponible aquí. Puedes escribir a Ana directamente:",
    error: "Lo siento — algo salió mal. También puedes escribir a Ana directamente:",
    thinking: "Pensando…",
  },
};

function systemPrompt(lang: Lang) {
  const langLine = lang === "es" ? "Reply ONLY in Spanish." : "Reply ONLY in English.";
  return `You are the friendly, professional assistant on Ana Karina Suárez González's portfolio website. ${langLine}
Keep replies concise (2–4 sentences), warm and confident. Use only the facts below — never invent details. If you don't know something, say you'll pass the question to Ana.
${ASSISTANT_FACTS}
SCHEDULING A MEETING: If the visitor wants to talk, meet or interview Ana, ask which format they prefer — an in-person interview, a video call, or a phone call. Collect, one or two at a time: (1) name, (2) email (and a phone number if they pick a phone call), (3) preferred date & time with timezone, (4) meeting format (interview / video call / phone call), (5) topic or role. Once you have ALL of these, confirm briefly and then append on a NEW LINE exactly:
BOOKING: {"name":"...","email":"...","datetime":"...","format":"...","topic":"..."}
Output that BOOKING line only when everything is known. Never show the BOOKING line before then.`;
}

export function Chat() {
  const { lang } = useLang();
  const c = CHAT_COPY[lang];
  const [open, setOpen] = useState<boolean>(false);
  const [msgs, setMsgs] = useState<ChatMsg[]>([{ role: "assistant", text: c.greeting }]);
  const [input, setInput] = useState<string>("");
  const [busy, setBusy] = useState<boolean>(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const greetedLang = useRef<Lang>(lang);

  // refresh greeting if language changes and convo not started
  useEffect(() => {
    if (greetedLang.current !== lang) {
      greetedLang.current = lang;
      setMsgs((m) => (m.length <= 1 ? [{ role: "assistant", text: c.greeting }] : m));
    }
  }, [lang, c.greeting]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, busy, booking]);

  const mailtoFor = (b: Booking) => {
    const subject = encodeURIComponent(
      `${b.format ? b.format + " request" : "Meeting request"} — ${b.name || "Portfolio visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${b.name || ""}\nEmail: ${b.email || ""}\nFormat: ${b.format || ""}\nPreferred time: ${b.datetime || ""}\nTopic: ${b.topic || ""}\n\nSent from the portfolio assistant.`
    );
    return `mailto:karinasuarezdos@gmail.com?subject=${subject}&body=${body}`;
  };

  async function send(text?: string) {
    const content = (text != null ? text : input).trim();
    if (!content || busy) return;
    setInput("");
    setBooking(null);
    const visible: ChatMsg[] = [...msgs, { role: "user", text: content }];
    setMsgs(visible);
    setBusy(true);

    // TODO: wire a /api/chat route to enable live answers
    if (!window.claude || !window.claude.complete) {
      setMsgs([...visible, { role: "assistant", text: c.errorNoAPI, mail: true }]);
      setBusy(false);
      return;
    }

    try {
      const apiMessages = [
        { role: "user", content: systemPrompt(lang) },
        { role: "assistant", content: "Understood. I'll help visitors and follow the scheduling rules." },
        ...visible.map((m) => ({ role: m.role, content: m.text })),
      ];
      const raw = await window.claude.complete({ messages: apiMessages });
      let reply = (raw || "").trim();
      let parsedBooking: Booking | null = null;
      const idx = reply.indexOf("BOOKING:");
      if (idx !== -1) {
        const jsonPart = reply.slice(idx + 8).trim();
        try {
          parsedBooking = JSON.parse(jsonPart) as Booking;
        } catch {
          const m = jsonPart.match(/\{[\s\S]*\}/);
          if (m) {
            try {
              parsedBooking = JSON.parse(m[0]) as Booking;
            } catch {
              /* ignore malformed booking JSON */
            }
          }
        }
        reply = reply.slice(0, idx).trim();
      }
      const next: ChatMsg[] = [...visible, { role: "assistant", text: reply || c.booked }];
      setMsgs(next);
      if (parsedBooking) setBooking(parsedBooking);
    } catch {
      setMsgs([...visible, { role: "assistant", text: c.error, mail: true }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={"chat" + (open ? " chat-open" : "")}>
      <button className="chat-fab" aria-label={c.open} onClick={() => setOpen((o) => !o)}>
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9A1.5 1.5 0 0 1 18.5 16H9l-4 3.5V16H5.5A1.5 1.5 0 0 1 4 14.5v-9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="9" cy="10" r="1" fill="currentColor" /><circle cx="12.5" cy="10" r="1" fill="currentColor" /><circle cx="16" cy="10" r="1" fill="currentColor" /></svg>
        )}
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label={c.title}>
          <div className="chat-head">
            <span className="chat-avatar">AK</span>
            <div className="chat-head-txt">
              <strong>{c.title}</strong>
              <span><span className="chat-online" /> {c.sub}</span>
            </div>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {msgs.map((m, i) => (
              <div className={"chat-msg chat-" + m.role} key={i}>
                <div className="chat-bubble">
                  {m.text}
                  {m.mail && (
                    <a className="chat-maillink" href={"mailto:karinasuarezdos@gmail.com"}>karinasuarezdos@gmail.com</a>
                  )}
                </div>
              </div>
            ))}
            {busy && (
              <div className="chat-msg chat-assistant">
                <div className="chat-bubble chat-typing"><span /><span /><span /></div>
              </div>
            )}
            {booking && (
              <div className="chat-booking">
                <div className="chat-booking-row"><b>{booking.name}</b> · {booking.email}</div>
                {booking.format && <div className="chat-booking-row chat-booking-format">{booking.format}</div>}
                <div className="chat-booking-row">{booking.datetime}</div>
                <div className="chat-booking-row chat-booking-topic">{booking.topic}</div>
                <a className="chat-confirm" href={mailtoFor(booking)}>{c.confirm} <Arrow size={14} /></a>
              </div>
            )}
          </div>

          {msgs.length <= 1 && !busy && (
            <div className="chat-chips">
              {c.chips.map((q) => (
                <button key={q} onClick={() => send(q)}>{q}</button>
              ))}
            </div>
          )}

          <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={c.placeholder}
              aria-label={c.placeholder}
            />
            <button type="submit" aria-label={c.send} disabled={busy || !input.trim()}>
              <Arrow size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
