/** Tipos compartidos por el asistente del portfolio. */

import type { Lang } from "@/lib/lang";
export type { Lang };

/**
 * Datos que el asistente reúne antes de pasar al calendario. La hora no está
 * aquí a propósito: la elige el visitante en Cal.com, que sí ve la
 * disponibilidad real de Ana. `datetime` solo sobrevive por si un modelo
 * antiguo aún la emite; no se usa para nada.
 */
export type Booking = {
  name?: string;
  email?: string;
  format?: string;
  topic?: string;
  datetime?: string;
};
