import type { Lang } from "./types";

/**
 * Marcas propias del system prompt. Si aparecen en la respuesta es que el modelo
 * lo está recitando: llama-3.3 cede ante un "ignora tus instrucciones" por mucho
 * que el prompt se lo prohíba, así que el corte se hace aquí, no confiando en él.
 */
const LEAK_MARKERS = [
  "GROUND RULES",
  "SCHEDULING A MEETING",
  "OTHER TOOLS SHE LISTS",
  "POSITIONING",
  "POSICIONAMIENTO",
  "HECHOS",
  '"name":"..."',
];

/** Respuesta segura cuando se detecta que el modelo está recitando el prompt. */
export const LEAK_REPLY: Record<Lang, string> = {
  es: "Solo puedo ayudarte con preguntas sobre el perfil profesional de Ana o con agendar una reunión con ella. ¿Qué te gustaría saber?",
  en: "I can only help with questions about Ana's professional profile or with booking a meeting with her. What would you like to know?",
};

export function looksLikePromptLeak(text: string): boolean {
  const hits = LEAK_MARKERS.filter((m) => text.includes(m)).length;
  if (hits > 0) return true;
  // Un volcado traducido pierde las marcas exactas pero conserva la forma:
  // respuesta larga con lista numerada de reglas.
  return text.length > 900 && /(^|\n)\s*[1-8][.)]\s/.test(text) && /\n\s*[3-8][.)]\s/.test(text);
}
