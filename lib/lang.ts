/** Idiomas del sitio. Vive en lib/ y no en un componente porque lo necesitan
 *  tanto la UI ("use client") como el asistente, que corre solo en servidor. */
export type Lang = "es" | "en";
