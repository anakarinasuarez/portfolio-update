import Groq from "groq-sdk";

import { splitBooking, systemPrompt, type Booking, type Lang } from "@/lib/assistant";

/** Endpoint público: acotamos la entrada para no quemar la cuota gratuita. */
const MAX_MESSAGES = 40;
const MAX_CHARS = 2000;
const MAX_COMPLETION_TOKENS = 800;

// Versión fijada a propósito: así el tono de las respuestas no cambia solo.
const MODEL = "llama-3.3-70b-versatile";

type ClientMessage = { role: "user" | "assistant"; text: string };
type ChatResponse = { reply: string; booking: Booking | null };

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

  try {
    const completion = await groq.chat.completions.create({
      model: MODEL,
      max_completion_tokens: MAX_COMPLETION_TOKENS,
      messages: [
        { role: "system", content: systemPrompt(input.lang) },
        ...input.messages.map((m) => ({ role: m.role, content: m.text })),
      ],
    });

    const raw = (completion.choices[0]?.message?.content ?? "").trim();
    if (!raw) return Response.json({ error: "empty" }, { status: 502 });

    const payload: ChatResponse = splitBooking(raw);
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
