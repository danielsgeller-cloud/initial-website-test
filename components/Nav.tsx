"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage, type Lang } from "./LanguageProvider";

function LangPill({
  code,
  active,
  onClick,
}: {
  code: Lang;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border px-3 py-1 text-xs font-semibold",
        active
          ? "border-amber-500 bg-white text-neutral-900"
          : "border-neutral-700 bg-transparent text-neutral-200 hover:border-neutral-500",
      ].join(" ")}
      aria-pressed={active}
    >
      {code.toUpperCase()}
    </button>
  );
}

export default function Nav() {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-neutral-200 bg-white">
      {/* Top bar */}
      <div className="bg-neutral-900 text-xs text-neutral-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 md:px-6">
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-neutral-300">Language</span>
            <div className="flex items-center gap-2 rounded-full bg-neutral-800 p-1">
              <LangPill code="en" active={lang === "en"} onClick={() => setLang("en")} />
              <LangPill code="ru" active={lang === "ru"} onClick={() => setLang("ru")} />
              <LangPill code="uk" active={lang === "uk"} onClick={() => setLang("uk")} />
            </div>
          </div>

          <p className="hidden text-[11px] text-neutral-200 md:block">
            {t({
              en: "Service available in English, Ukrainian, and Russian",
              ru: "Обслуживание на английском, украинском и русском языках",
              uk: "Обслуговування англійською, українською та російською мовами",
            })}
          </p>

          <div className="flex items-center gap-3">
            <a href="tel:17322976008" className="hover:text-amber-300">
              (732) 297-6008
            </a>
            <span className="text-neutral-500">|</span>
            <a href="mailto:info@picturesinceramic.com" className="hover:text-amber-300">
              info@picturesinceramic.com
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-sm font-semibold text-amber-800">
            P
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-base font-semibold text-neutral-900 md:text-lg">
              Pictures in Ceramic
            </span>
            <span className="text-[11px] text-neutral-500 md:text-xs">
              {t({
                en: "Enamel memorial medallions",
                ru: "Эмалевые мемориальные медальоны",
                uk: "Емальовані меморіальні медальйони",
              })}
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-5 text-sm text-neutral-700">
            <Link href="/" className="hover:text-amber-600">
              {t({ en: "Home", ru: "Главная", uk: "Головна" })}
            </Link>
            <Link href="/about" className="hover:text-amber-600">
              {t({ en: "About", ru: "О нас", uk: "Про нас" })}
            </Link>
            <Link href="/why-our-cameos" className="hover:text-amber-600">
              {t({ en: "Why Our Cameos", ru: "Почему наши камеи", uk: "Чому наші камеї" })}
            </Link>
            <Link href="/pricing" className="hover:text-amber-600">
              {t({ en: "Medallion Pricing", ru: "Цены на медальоны", uk: "Ціни на медальйони" })}
            </Link>
            <Link href="/contact" className="hover:text-amber-600">
              {t({ en: "Contact", ru: "Контакты", uk: "Контакт" })}
            </Link>
            <Link href="/order-form" className="hover:text-amber-600">
              {t({ en: "Order Form", ru: "Форма заказа", uk: "Форма замовлення" })}
            </Link>
          </nav>

          <Link
            href="/order-form"
            className="rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-black shadow-sm hover:bg-amber-400"
          >
            {t({ en: "Order a cameo", ru: "Заказать камею", uk: "Замовити камею" })}
          </Link>
        </div>

        <button
          className="rounded-md border border-neutral-300 p-2 md:hidden"
          onClick={() => setMenuOpen(true)}
          type="button"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor">
            <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setMenuOpen(false)}>
            <div
              className="absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="mb-6 rounded-md border border-neutral-300 p-2 text-sm"
                onClick={() => setMenuOpen(false)}
                type="button"
              >
                {t({ en: "Close", ru: "Закрыть", uk: "Закрити" })}
              </button>

              <nav className="grid gap-4 text-sm text-neutral-800">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  {t({ en: "Home", ru: "Главная", uk: "Головна" })}
                </Link>
                <Link href="/about" onClick={() => setMenuOpen(false)}>
                  {t({ en: "About", ru: "О нас", uk: "Про нас" })}
                </Link>
                <Link href="/why-our-cameos" onClick={() => setMenuOpen(false)}>
                  {t({ en: "Why Our Cameos", ru: "Почему наши камеи", uk: "Чому наші камеї" })}
                </Link>
                <Link href="/pricing" onClick={() => setMenuOpen(false)}>
                  {t({ en: "Medallion Pricing", ru: "Цены на медальоны", uk: "Ціни на медальйони" })}
                </Link>
                <Link href="/contact" onClick={() => setMenuOpen(false)}>
                  {t({ en: "Contact", ru: "Контакты", uk: "Контакт" })}
                </Link>
                <Link href="/order-form" onClick={() => setMenuOpen(false)}>
                  {t({ en: "Order Form", ru: "Форма заказа", uk: "Форма замовлення" })}
                </Link>
              </nav>

              <Link
                href="/order-form"
                className="mt-6 block rounded-full bg-amber-500 px-5 py-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-black shadow-sm hover:bg-amber-400"
                onClick={() => setMenuOpen(false)}
              >
                {t({ en: "Order a cameo", ru: "Заказать камею", uk: "Замовити камею" })}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
