"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Reexportado para no romper los imports existentes de los componentes.
import type { Lang } from "@/lib/lang";
export type { Lang };

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const STORAGE_KEY = "aks-lang";
const DEFAULT_LANG: Lang = "es";

const LangContext = createContext<LangContextValue>({
  lang: DEFAULT_LANG,
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  // Start from a fixed default so SSR and first client render match,
  // then adopt the persisted preference after mount.
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  // Read the persisted preference AFTER mount so SSR/first-render stay in sync
  // with the fixed default (avoids a hydration mismatch). Syncing external
  // (localStorage) state into React here is intentional.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === "es" || stored === "en") setLangState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}
