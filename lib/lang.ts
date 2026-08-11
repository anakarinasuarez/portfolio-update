/** Idiomas del sitio. Vive en lib/ y no en un componente porque lo necesitan
 *  tanto la UI ("use client") como el asistente, que corre solo en servidor. */
export const LANGS = ["es", "en"] as const;

export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "es";

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}
