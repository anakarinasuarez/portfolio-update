"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";

import { DEFAULT_LANG, isLang, type Lang } from "@/lib/lang";

export type { Lang };

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextValue>({
  lang: DEFAULT_LANG,
  setLang: () => {},
});

/**
 * El idioma lo manda la URL (/es, /en), no localStorage: así cada versión
 * tiene su dirección, Google puede indexar las dos y un enlace compartido
 * abre en el idioma que quien lo envió eligió.
 */
export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      // /es/proyectos/x → /en/proyectos/x, conservando dónde estaba el visitante.
      const rest = pathname.split("/").slice(2).join("/");
      router.push(`/${next}${rest ? `/${rest}` : ""}`);
    },
    [lang, pathname, router],
  );

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}

/** Prefija una ruta interna con el idioma activo. */
export function useLangHref(): (path: string) => string {
  const { lang } = useLang();
  return useCallback(
    (path: string) => (path.startsWith("/") ? `/${lang}${path === "/" ? "" : path}` : path),
    [lang],
  );
}

export { isLang };
