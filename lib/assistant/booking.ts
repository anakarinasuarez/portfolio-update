import type { Booking } from "./types";

/** Marca que el modelo emite en su última línea cuando ya tiene todos los datos. */
export const BOOKING_TAG = "BOOKING:";

/** Los tres formatos que ofrece el asistente, ya normalizados. */
export type MeetingFormat = "video" | "phone" | "inPerson";

/**
 * El formato llega como texto libre del modelo y en dos idiomas
 * ("videollamada", "phone call", "entrevista presencial"). Se clasifica por
 * palabra clave. El vídeo se comprueba primero a propósito: "videollamada"
 * contiene "llamada" y si no, acabaría clasificada como teléfono.
 */
export function classifyFormat(format: string | undefined): MeetingFormat {
  const t = (format ?? "").toLowerCase();
  if (/v[ií]deo/.test(t)) return "video";
  if (/tel[eé]fon|phone|llamada/.test(t)) return "phone";
  if (/presencial|in[- ]?person|en persona|onsite/.test(t)) return "inPerson";
  return "video";
}

/**
 * Cada formato necesita su propio event type en Cal: la ubicación (Cal Video,
 * teléfono, presencial) es una propiedad del event type y no se puede cambiar
 * por query param, así que un enlace único mandaba a videollamada a quien había
 * pedido una llamada. Si el enlace de ese formato no está configurado se cae al
 * general, que es el comportamiento de siempre.
 */
export function pickCalendarUrl(
  format: string | undefined,
  urls: { video?: string; phone?: string; inPerson?: string },
): string | undefined {
  return urls[classifyFormat(format)] ?? urls.video;
}

/**
 * Enlace de Cal.com con los datos ya rellenados: el reclutador solo elige hora.
 * Cal.com prerrellena por query params cuyo nombre coincide con el campo
 * (`name`, `email`, `notes`). Devuelve null si aún no hay calendario configurado.
 */
export function buildBookingUrl(booking: Booking, base: string | undefined): string | null {
  if (!base) return null;

  let url: URL;
  try {
    url = new URL(base);
  } catch {
    console.error("[assistant] CAL_BOOKING_URL no es una URL válida:", base);
    return null;
  }

  if (booking.name) url.searchParams.set("name", booking.name);
  if (booking.email) url.searchParams.set("email", booking.email);

  const notes = [
    booking.topic ? `Tema: ${booking.topic}` : null,
    booking.format ? `Formato preferido: ${booking.format}` : null,
    "Solicitud enviada desde el asistente del portfolio.",
  ]
    .filter(Boolean)
    .join("\n");
  url.searchParams.set("notes", notes);

  return url.toString();
}

/**
 * La burbuja del chat pinta texto plano, así que un **negrita** del modelo se
 * vería con asteriscos. Se limpian aquí y no pidiéndoselo al prompt: es
 * determinista y no gasta tokens.
 */
export function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/(^|\s)\*(\S[^*]*?)\*(?=\s|$)/g, "$1$2")
    .replace(/(^|\n)\s*[-*]\s+/g, "$1• ")
    .replace(SENTENCES_STUCK, "$1 $2");
}

/**
 * A veces el modelo pega dos frases sin separador ("…desarrollo.¿Te gustaría?")
 * y la burbuja lo pinta tal cual. Se exige minúscula antes del punto para no
 * romper lo que sí va junto: "Next.js" (minúscula detrás) o siglas tipo "U.S.A".
 * El cierre opcional cubre el caso real que se colaba: "(indícame tu
 * número).Excelente" — el paréntesis separaba la minúscula del punto.
 */
const SENTENCES_STUCK = /([a-záéíóúñü]{2}[)\]"'»”]?[.!?…])([¿¡A-ZÁÉÍÓÚÑ])/g;

/** Rellenos que el modelo cuela cuando aún no tiene el dato real. */
const PLACEHOLDER = /^\s*(\.{2,}|-+|n\/?a|unknown|desconocido|pendiente|por (determinar|definir)|sin (especificar|definir)|\?+)\s*$/i;

/**
 * Un campo es válido si el visitante lo dijo de verdad. El modelo tiende a
 * emitir la reserva antes de tiempo poniendo su propia pregunta como valor
 * ("¿Cuál es el tema?"), y esa reunión acabaría en el calendario de Ana.
 */
function isRealValue(v: string | undefined): v is string {
  if (!v) return false;
  const t = v.trim();
  if (t.length < 2 || PLACEHOLDER.test(t)) return false;
  return !t.includes("?") && !t.includes("¿");
}

/**
 * El modelo cuela la fecha de hoy al final del tema ("…en Sevilla, 2026-08-09")
 * porque la tiene en el prompt. Acaba en las notas del calendario de Ana.
 */
export function cleanTopic(topic: string): string {
  return topic.replace(/[,;\s]+\d{4}-\d{2}-\d{2}\s*$/, "").trim();
}

/**
 * El modelo a veces adjunta la reserva en el mismo turno en que todavía está
 * preguntando por un dato, rellenando por su cuenta lo que le falta: la tarjeta
 * sale con un formato o un tema que el visitante nunca dijo, y esa reunión
 * acabaría en el calendario de Ana. Si el texto visible aún pregunta, no está
 * lista. En 10 turnos con reserva legítima el texto visible nunca llevó
 * pregunta —llega vacío—, así que el filtro no cuesta nada en el camino bueno.
 */
export function stillAsking(reply: string): boolean {
  return reply.includes("?") || reply.includes("¿");
}

/** La tarjeta solo aparece con los cuatro datos reales y un correo plausible. */
export function isUsableBooking(b: Booking | null): b is Booking {
  if (!b) return false;
  if (!isRealValue(b.name) || !isRealValue(b.format) || !isRealValue(b.topic)) return false;
  return isRealValue(b.email) && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(b.email.trim());
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
