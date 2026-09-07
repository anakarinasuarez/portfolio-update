/** Qué modelo responde en el chat y qué pasa cuando Groq lo retira. */

import Groq, { type APIError } from "groq-sdk";

/** Incluye el razonamiento, no solo el texto visible: con 800 se quedaba corto. */
const MAX_COMPLETION_TOKENS = 1200;

export type ChatMessage =
  | { role: "system"; content: string }
  | { role: "user"; content: string }
  | { role: "assistant"; content: string };

type ChatModel = {
  /** Identificador exacto en el catálogo de Groq. */
  id: string;
  /**
   * Estos modelos razonan antes de responder y, sin acotarlo, se gastan todo el
   * presupuesto pensando y devuelven una respuesta vacía.
   */
  reasoningEffort: "none" | "low" | "medium" | "high";
};

/**
 * Cadena de respaldo, en orden de preferencia: responde el primero que siga
 * vivo. Un modelo fijado es una dependencia que el proveedor puede retirar sin
 * avisar — Groq borró llama-3.3-70b-versatile del catálogo y el chat se cayó en
 * producción —, así que el asistente ya no depende de uno solo.
 *
 * El orden es por calidad de respuesta descendente y cada entrada lleva sus
 * propios parámetros, porque no todos los modelos aceptan lo mismo.
 */
export const CHAT_MODELS: readonly ChatModel[] = [
  { id: "openai/gpt-oss-120b", reasoningEffort: "low" },
  { id: "openai/gpt-oss-20b", reasoningEffort: "low" },
  { id: "qwen/qwen3.8-27b", reasoningEffort: "low" },
];

/** Lee el `code` del cuerpo JSON de Groq (`{ error: { message, type, code } }`). */
function errorCode(error: APIError): string {
  const body = error.error as { error?: { code?: unknown } } | undefined;
  const code = body?.error?.code;
  return typeof code === "string" ? code : "";
}

/**
 * ¿El fallo dice que ese modelo concreto ya no está? Groq devuelve 404
 * `model_not_found` cuando lo borra del catálogo y 400 `model_decommissioned`
 * mientras aún lo reconoce pero ya no lo sirve. Cualquier otro error —cuota,
 * credencial, red, petición mal formada— no se arregla cambiando de modelo y
 * debe propagarse tal cual.
 */
export function isModelGone(error: unknown): boolean {
  if (error instanceof Groq.NotFoundError) return true;
  if (error instanceof Groq.BadRequestError) return errorCode(error).includes("decommission");
  return false;
}

/**
 * Recorre la cadena y devuelve la primera respuesta que se obtenga, junto con
 * el modelo que la produjo. Si se agota entera, propaga el último error: ahí ya
 * no es un respaldo lo que falta, es actualizar la lista.
 */
export async function completeWithFallback(
  groq: Groq,
  messages: ChatMessage[],
): Promise<{ text: string; model: string }> {
  let lastError: unknown;

  for (const model of CHAT_MODELS) {
    try {
      const completion = await groq.chat.completions.create({
        model: model.id,
        max_completion_tokens: MAX_COMPLETION_TOKENS,
        reasoning_effort: model.reasoningEffort,
        messages,
      });
      if (model.id !== CHAT_MODELS[0].id) {
        console.warn(`[api/chat] respondiendo con el respaldo ${model.id}`);
      }
      return { text: (completion.choices[0]?.message?.content ?? "").trim(), model: model.id };
    } catch (error) {
      if (!isModelGone(error)) throw error;
      console.warn(`[api/chat] ${model.id} ya no existe en Groq; probando el siguiente`);
      lastError = error;
    }
  }

  console.error("[api/chat] ningún modelo de la cadena sigue disponible: hay que revisarla");
  throw lastError ?? new Error("cadena de modelos vacía");
}
