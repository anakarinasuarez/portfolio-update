import { useState, useEffect, useRef } from "react";

import { useLang, type Lang } from "@/components/i18n/lang";
import { siteConfig } from "@/lib/site";
import type { Booking } from "@/lib/assistant";

import { CHAT_COPY } from "./copy";

/* Toda la conversación con /api/chat: estado, envío y manejo de errores. Vive
   fuera del componente porque es la parte que falla —y la que hay que poder
   leer entera— sin el ruido del marcado. */

export type ChatMsg = {
  role: "user" | "assistant";
  text: string;
  /** Burbuja de error que además ofrece el correo de Ana como salida. */
  mail?: boolean;
};

type ChatResponse = { reply: string; booking: Booking | null; bookingUrl: string | null };

/** Sin calendario configurado, la reserva se envía por correo. */
export function mailtoFor(b: Booking): string {
  const subject = encodeURIComponent(
    `${b.format ? b.format + " request" : "Meeting request"}: ${b.name || "Portfolio visitor"}`
  );
  const body = encodeURIComponent(
    `Name: ${b.name || ""}\nEmail: ${b.email || ""}\nFormat: ${b.format || ""}\nTopic: ${b.topic || ""}\n\nSent from the portfolio assistant.`
  );
  return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
}

export function useChat() {
  const { lang } = useLang();
  const c = CHAT_COPY[lang];
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
        // El 429 es temporal: la cuota por minuto de Groq se rellena sola. Decir
        // que algo se rompió y ofrecer el correo manda al visitante fuera del
        // chat cuando bastaba con esperar unos segundos, así que va sin enlace.
        if (res.status === 429) {
          setMsgs([...visible, { role: "assistant", text: c.errorBusy }]);
          return;
        }
        const copy = res.status === 503 ? c.errorNoAPI : c.error;
        setMsgs([...visible, { role: "assistant", text: copy, mail: true }]);
        return;
      }

      const data = (await res.json()) as ChatResponse;
      // A veces el modelo devuelve solo la reserva, sin texto: el relleno debe
      // decir lo que hace el boton que se acaba de pintar, no otra cosa. Y si la
      // reserva no pasó el filtro no hay tarjeta ninguna, asi que se piden los
      // datos que faltan en vez de dar por lista una solicitud que nadie puede enviar.
      const withCard = data.bookingUrl ? c.bookedSlot : c.booked;
      const fallback = data.booking ? withCard : c.needMore;
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

  return { c, msgs, input, setInput, busy, booking, bookingUrl, bodyRef, send } as const;
}
