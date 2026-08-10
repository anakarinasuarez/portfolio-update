/**
 * Colores de marca para las imágenes que se generan en build (icono de pestaña,
 * icono de iOS y tarjeta Open Graph).
 *
 * Existen aparte de app/styles/tokens.css porque Satori —el motor de next/og—
 * rasteriza sin navegador y no puede leer variables CSS. Si cambias el acento
 * aquí, cámbialo también en tokens.css: son el mismo color en dos mundos que no
 * se hablan.
 */
export const brand = {
  /** --accent */
  accent: "#EF5143",
  /** Fondo oscuro de las piezas de marca. */
  ink: "#1C1714",
  /** Texto sobre fondo oscuro. */
  paper: "#F2EDE9",
} as const;
