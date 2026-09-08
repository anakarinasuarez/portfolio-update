import { NextResponse, type NextRequest } from "next/server";

import { DEFAULT_LANG, LANGS, isLang } from "@/lib/lang";

/**
 * En Next 16 este fichero se llama `proxy`, no `middleware`.
 *
 * Solo actúa en la raíz: manda al visitante a /es o /en según el idioma de su
 * navegador. Si pide /es o /en explícitamente, se respeta — la URL manda sobre
 * la preferencia, porque quien abre un enlace compartido quiere ese idioma.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const yaTieneIdioma = LANGS.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (yaTieneIdioma) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${detectarIdioma(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

/** Primer idioma soportado del header Accept-Language; si no, el por defecto. */
function detectarIdioma(request: NextRequest): string {
  const header = request.headers.get("accept-language") ?? "";
  for (const parte of header.split(",")) {
    const code = parte.split(";")[0].trim().slice(0, 2).toLowerCase();
    if (isLang(code)) return code;
  }
  return DEFAULT_LANG;
}

export const config = {
  // Fuera lo que no es una página: API, estáticos y ficheros sueltos como el de
  // verificación de Google o los PDF del CV, que se reconocen por la extensión.
  //
  // `icon` y `apple-icon` van aparte porque NO tienen extensión: Next sirve los
  // iconos generados en /icon y /apple-icon, sin punto, así que el filtro de
  // ficheros no los veía y acababan redirigidos a /es/icon, que no existe. El
  // navegador se quedaba sin favicon. Anclados con `$` para no capturar de paso
  // /icons/… , que sí es una carpeta real de public.
  matcher: ["/((?!api|_next|icon$|apple-icon$|.*\\..*).*)"],
};
