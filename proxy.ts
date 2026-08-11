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
  // Fuera lo que no es una página: API, estáticos, iconos y ficheros sueltos
  // como el de verificación de Google o los PDF del CV.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
