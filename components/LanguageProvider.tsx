"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "ru" | "uk";

type TDict = { en: string; ru: string; uk: string };

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (dict: TDict) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function safeLang(input: unknown): Lang {
  return input === "ru" || input === "uk" || input === "en" ? input : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Hydrate from localStorage once on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem("pic_lang");
      if (stored) setLangState(safeLang(stored));
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("pic_lang", l);
    } catch {}
  };

  const t = (dict: TDict) => {
    // No markers, no fallback prefixes
    if (lang === "ru") return dict.ru || dict.en;
    if (lang === "uk") return dict.uk || dict.en;
    return dict.en;
  };

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
