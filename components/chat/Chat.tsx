"use client";

/* ============================================================
   AI assistant — answers questions about Ana Karina and helps
   visitors request an interview. Talks to /api/chat, which holds
   the system prompt and the model credential server-side.
   ============================================================ */

import { useState, useEffect, useRef } from "react";
import { useLang, type Lang } from "@/components/i18n/lang";
import { Arrow } from "@/components/ui/Arrow";
import type { Booking } from "@/lib/assistant";

type ChatMsg = { role: "user" | "assistant"; text: string; mail?: boolean };
type ChatResponse = { reply: string; booking: Booking | null; bookingUrl: string | null };


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
    pickSlot: string;
    booked: string;
    bookedSlot: string;
    errorNoAPI: string;
    error: string;
    thinking: string;
  }
> = {
  en: {
    title: "Ana's Assistant",
    sub: "Ask anything · Book an interview",
    greeting:
      "Hi! 👋 I'm Ana Karina's assistant. Ask me about her work, AI-agent experience or stack, or I can help you book an interview, video call or phone call with her.",
    chips: ["What's her AI experience?", "Book a call or interview", "Tech stack?"],
    placeholder: "Type your message…",
    send: "Send",
    open: "Chat with Ana's assistant",
    confirm: "Confirm & send request to Ana",
    pickSlot: "Pick a time in Ana's calendar",
    booked: "Request ready, your email app will open so Ana receives the details. ✅",
    bookedSlot: "All set — just pick a time that suits you in Ana's calendar. ✅",
    errorNoAPI: "The live assistant isn't available here. You can email Ana directly:",
    error: "Sorry, something went wrong. You can also email Ana directly:",
    thinking: "Thinking…",
  },
  es: {
    title: "Asistente de Ana",
    sub: "Pregunta lo que quieras · Agenda una entrevista",
    greeting:
      "¡Hola! 👋 Soy el asistente de Ana Karina. Pregúntame por su trabajo, su experiencia con agentes de IA o su stack, o te ayudo a agendar una entrevista, videollamada o llamada telefónica con ella.",
    chips: ["¿Qué experiencia tiene con IA?", "Agendar llamada o entrevista", "¿Su stack técnico?"],
    placeholder: "Escribe tu mensaje…",
    send: "Enviar",
    open: "Chatea con el asistente de Ana",
    confirm: "Confirmar y enviar solicitud a Ana",
    pickSlot: "Elegir hora en el calendario de Ana",
    booked: "Solicitud lista, se abrirá tu correo para que Ana reciba los detalles. ✅",
    bookedSlot: "Listo — solo falta que elijas la hora que mejor te venga en el calendario de Ana. ✅",
    errorNoAPI: "El asistente en vivo no está disponible aquí. Puedes escribir a Ana directamente:",
    error: "Lo siento, algo salió mal. También puedes escribir a Ana directamente:",
    thinking: "Pensando…",
  },
};

export function Chat() {
  const { lang } = useLang();
  const c = CHAT_COPY[lang];
  const [open, setOpen] = useState<boolean>(false);
  const [msgs, setMsgs] = useState<ChatMsg[]>([{ role: "assistant", text: c.greeting }]);
  const [input, setInput] = useState<string>("");
  const [busy, setBusy] = useState<boolean>(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [bookingUrl, setBookingUrl] = useState<string | null>(null);
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
      `${b.format ? b.format + " request" : "Meeting request"}: ${b.name || "Portfolio visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${b.name || ""}\nEmail: ${b.email || ""}\nFormat: ${b.format || ""}\nTopic: ${b.topic || ""}\n\nSent from the portfolio assistant.`
    );
    return `mailto:karinasuarezdos@gmail.com?subject=${subject}&body=${body}`;
  };

  async function send(text?: string) {
    const content = (text != null ? text : input).trim();
    if (!content || busy) return;
    setInput("");
    setBooking(null);
    setBookingUrl(null);
    const visible: ChatMsg[] = [...msgs, { role: "user", text: content }];
    setMsgs(visible);
    setBusy(true);

    try {
      // El saludo inicial es UI, no un turno del modelo, y las burbujas de
      // error tampoco: la conversación debe empezar por el visitante.
      const history = visible.filter((m) => !m.mail).slice(1);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          messages: history.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      if (!res.ok) {
        const copy = res.status === 503 ? c.errorNoAPI : c.error;
        setMsgs([...visible, { role: "assistant", text: copy, mail: true }]);
        return;
      }

      const data = (await res.json()) as ChatResponse;
      // A veces el modelo devuelve solo la reserva, sin texto: el relleno debe
      // decir lo que hace el boton que se acaba de pintar, no otra cosa.
      const fallback = data.bookingUrl ? c.bookedSlot : c.booked;
      setMsgs([...visible, { role: "assistant", text: data.reply || fallback }]);
      if (data.booking) {
        setBooking(data.booking);
        setBookingUrl(data.bookingUrl);
      }
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
                <div className="chat-booking-row chat-booking-topic">{booking.topic}</div>
                {/* Con calendario, el visitante elige hora libre; sin él, correo. */}
                <a
                  className="chat-confirm"
                  href={bookingUrl ?? mailtoFor(booking)}
                  {...(bookingUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {bookingUrl ? c.pickSlot : c.confirm} <Arrow size={14} />
                </a>
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
