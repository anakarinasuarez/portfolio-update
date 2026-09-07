import Groq from "groq-sdk";

import {
  buildBookingUrl,
  cleanTopic,
  completeWithFallback,
  isUsableBooking,
  pickCalendarUrl,
  LEAK_REPLY,
  looksLikePromptLeak,
  splitBooking,
  stillAsking,
  stripMarkdown,
  systemPrompt,
  type Booking,
  type ChatMessage,
  type Lang,
} from "@/lib/assistant";

/** Endpoint público: acotamos la entrada para no quemar la cuota gratuita. */
const MAX_MESSAGES = 40;
const MAX_CHARS = 2000;

/**
 * Los tres calendarios. Solo CAL_BOOKING_URL es obligatorio: si falta el enlace
 * del formato concreto se cae a ese, y nada se rompe.
 */
function calendarUrlFor(format: string | undefined): string | undefined {
  return pickCalendarUrl(format, {
    video: process.env.CAL_BOOKING_URL,
    phone: process.env.CAL_BOOKING_URL_PHONE,
    inPerson: process.env.CAL_BOOKING_URL_INPERSON,
  });
}

type ClientMessage = { role: "user" | "assistant"; text: string };
type ChatResponse = {
  reply: string;
  booking: Booking | null;
  /** Enlace de Cal.com prerrellenado; null si no hay calendario configurado. */
  bookingUrl: string | null;
};

/** Valida el cuerpo recibido sin confiar en su forma (llega de la red). */
function parseBody(body: unknown): { messages: ClientMessage[]; lang: Lang } | null {
  if (typeof body !== "object" || body === null) return null;
  const { messages, lang } = body as { messages?: unknown; lang?: unknown };

  if (!Array.isArray(messages) || messages.length === 0) return null;
  if (messages.length > MAX_MESSAGES) return null;
  if (lang !== "es" && lang !== "en") return null;

  const parsed: ClientMessage[] = [];
  for (const item of messages) {
    if (typeof item !== "object" || item === null) return null;
    const { role, text } = item as { role?: unknown; text?: unknown };
    if (role !== "user" && role !== "assistant") return null;
    if (typeof text !== "string" || text.length === 0 || text.length > MAX_CHARS) return null;
    parsed.push({ role, text });
  }

  // La conversación debe arrancar con el visitante.
  if (parsed[0].role !== "user") return null;
  return { messages: parsed, lang };
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("[api/chat] falta GROQ_API_KEY");
    return Response.json({ error: "unavailable" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const input = parseBody(body);
  if (!input) return Response.json({ error: "invalid_body" }, { status: 400 });

  const groq = new Groq({ apiKey });

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt(input.lang) },
    ...input.messages.map((m): ChatMessage => ({ role: m.role, content: m.text })),
  ];

  try {
    // Si Groq ha retirado el modelo principal, responde el siguiente de la cadena.
    const { text: raw } = await completeWithFallback(groq, messages);
    if (!raw) return Response.json({ error: "empty" }, { status: 502 });

    if (looksLikePromptLeak(raw)) {
      console.warn("[api/chat] respuesta descartada: recitaba el system prompt");
      return Response.json({ reply: LEAK_REPLY[input.lang], booking: null, bookingUrl: null });
    }

    const { reply: rawReply, booking } = splitBooking(raw);
    const reply = stripMarkdown(rawReply);
    // Sin los cuatro datos reales no hay tarjeta, y tampoco si el texto visible
    // sigue preguntando: ahí el modelo se ha inventado lo que aún no le han dicho.
    const usable = isUsableBooking(booking) && !stillAsking(reply)
      ? { ...booking, topic: cleanTopic(booking.topic ?? "") }
      : null;
    const payload: ChatResponse = {
      reply,
      booking: usable,
      // El enlace depende del formato: cada uno es un event type distinto en Cal.
      bookingUrl: usable ? buildBookingUrl(usable, calendarUrlFor(usable.format)) : null,
    };
    return Response.json(payload);
  } catch (error) {
    // Al agotar la cuota el cliente ya ofrece el correo de Ana como salida.
    if (error instanceof Groq.RateLimitError) {
      console.warn("[api/chat] límite de Groq alcanzado");
      return Response.json({ error: "rate_limited" }, { status: 429 });
    }
    if (error instanceof Groq.AuthenticationError) {
      console.error("[api/chat] credencial de Groq inválida");
      return Response.json({ error: "unavailable" }, { status: 503 });
    }
    console.error("[api/chat]", error);
    return Response.json({ error: "upstream" }, { status: 502 });
  }
}
