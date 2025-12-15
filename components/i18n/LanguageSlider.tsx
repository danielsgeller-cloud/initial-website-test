"use client";

import { Lang, useLanguage } from "./LanguageProvider";

const OPTIONS: { id: Lang; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "ru", label: "RU" },
  { id: "uk", label: "UK" },
];

export default function LanguageSlider() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 p-0.5">
      {OPTIONS.map((opt) => {
        const active = opt.id === lang;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setLang(opt.id)}
            className={[
              "rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.14em] transition",
              active
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-100 hover:bg-white/15",
            ].join(" ")}
            aria-pressed={active}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
