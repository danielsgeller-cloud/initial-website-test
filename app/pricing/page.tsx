"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";

type Lang = "en" | "ru" | "uk";

const COPY: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    intro: string;
    ovalTitle: string;
    rectTitle: string;
    squareTitle: string;
    pricePlaceholder: string;
    size1: string;
    size2: string;
    size3: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  }
> = {
  en: {
    title: "Pricing and Sizes",
    subtitle: "Clear, straightforward pricing for enamel portrait medallions.",
    intro:
      "Below are our most common sizes and shapes. Each portrait is enamel-coated, kiln fired, retouched by hand, and backed by our lifetime warranty. Custom sizes available.",
    ovalTitle: "Oval Medallions",
    rectTitle: "Rectangular Medallions",
    squareTitle: "Square Medallions",
    pricePlaceholder: "[PRICE RANGE]",
    size1: "2 × 3 in",
    size2: "3 × 4 in",
    size3: "5 × 7 in",
    ctaTitle: "Need a custom size or special shape?",
    ctaBody:
      "We produce custom enamel medallions for headstones, mausoleums, homes, and custom installations.",
    ctaButton: "Request a quote",
  },
  ru: {
    title: "Цены и размеры",
    subtitle: "Понятные и прозрачные цены на эмалевые фото-медальоны.",
    intro:
      "Ниже представлены самые популярные размеры и формы. Каждый портрет покрывается эмалью, обжигается в печи, ретушируется вручную и сопровождается пожизненной гарантией. Возможны нестандартные размеры.",
    ovalTitle: "Овальные медальоны",
    rectTitle: "Прямоугольные медальоны",
    squareTitle: "Квадратные медальоны",
    pricePlaceholder: "[ДИАПАЗОН ЦЕН]",
    size1: "2 × 3 дюйма",
    size2: "3 × 4 дюйма",
    size3: "5 × 7 дюймов",
    ctaTitle: "Нужен нестандартный размер или форма?",
    ctaBody:
      "Мы изготавливаем эмалевые медальоны для надгробий, мавзолеев, домашних мемориалов и индивидуальных проектов.",
    ctaButton: "Запросить расчет",
  },
  uk: {
    title: "Ціни та розміри",
    subtitle: "Чіткі та зрозумілі ціни на емалеві фото-медальйони.",
    intro:
      "Нижче наведені найпоширеніші розміри та форми. Кожен портрет покривається емаллю, випалюється, ретушується вручну та має довічну гарантію. Доступні індивідуальні розміри.",
    ovalTitle: "Овальні медальйони",
    rectTitle: "Прямокутні медальйони",
    squareTitle: "Квадратні медальйони",
    pricePlaceholder: "[ДІАПАЗОН ЦІН]",
    size1: "2 × 3 дюйми",
    size2: "3 × 4 дюйми",
    size3: "5 × 7 дюймів",
    ctaTitle: "Потрібен індивідуальний розмір або форма?",
    ctaBody:
      "Ми виготовляємо емалеві медальйони для надгробків, мавзолеїв, домашніх меморіалів та індивідуальних встановлень.",
    ctaButton: "Запросити прорахунок",
  },
};

export default function PricingPage() {
  const { lang } = useLanguage();
  const t = COPY[(lang as Lang) || "en"] ?? COPY.en;

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Hero */}
      <section className="relative h-[260px] w-full overflow-hidden bg-neutral-900 md:h-[320px]">
        <div className="absolute inset-0 bg-neutral-800">
          <img
            src="/images/pricing-hero-placeholder.jpg"
            alt="Pricing hero placeholder"
            className="h-full w-full object-cover opacity-45"
          />
        </div>

        <div className="relative mx-auto flex h-full max-w-5xl flex-col justify-center px-4 text-white md:px-6">
          <h1 className="font-serif text-3xl font-bold md:text-4xl">
            {t.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-neutral-200 md:text-base">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-5xl px-4 py-14 md:px-6 md:py-20">
        {/* Intro */}
        <div className="text-center">
          <p className="mx-auto max-w-3xl text-sm text-neutral-700 md:text-base">
            {t.intro}
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {/* Oval */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="h-40 w-full overflow-hidden rounded-md bg-neutral-100">
              <img
                src="/images/oval-placeholder.jpg"
                alt="Oval medallion placeholder"
                className="h-full w-full object-cover opacity-80"
              />
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold">
              {t.ovalTitle}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              <li>
                {t.size1} — <span className="font-semibold">{t.pricePlaceholder}</span>
              </li>
              <li>
                {t.size2} — <span className="font-semibold">{t.pricePlaceholder}</span>
              </li>
              <li>
                {t.size3} — <span className="font-semibold">{t.pricePlaceholder}</span>
              </li>
            </ul>
          </div>

          {/* Rectangular */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="h-40 w-full overflow-hidden rounded-md bg-neutral-100">
              <img
                src="/images/rect-placeholder.jpg"
                alt="Rectangular medallion placeholder"
                className="h-full w-full object-cover opacity-80"
              />
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold">
              {t.rectTitle}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              <li>
                2 × 2.5 in — <span className="font-semibold">{t.pricePlaceholder}</span>
              </li>
              <li>
                {t.size2} — <span className="font-semibold">{t.pricePlaceholder}</span>
              </li>
              <li>
                {t.size3} — <span className="font-semibold">{t.pricePlaceholder}</span>
              </li>
            </ul>
          </div>

          {/* Square */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="h-40 w-full overflow-hidden rounded-md bg-neutral-100">
              <img
                src="/images/square-placeholder.jpg"
                alt="Square medallion placeholder"
                className="h-full w-full object-cover opacity-80"
              />
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold">
              {t.squareTitle}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              <li>
                2 × 2 in — <span className="font-semibold">{t.pricePlaceholder}</span>
              </li>
              <li>
                3 × 3 in — <span className="font-semibold">{t.pricePlaceholder}</span>
              </li>
              <li>
                4 × 4 in — <span className="font-semibold">{t.pricePlaceholder}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">
            {t.ctaTitle}
          </h2>
          <p className="mt-3 text-sm text-neutral-600 md:text-base">
            {t.ctaBody}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-amber-500 px-10 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-lg hover:bg-amber-400"
          >
            {t.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  );
}
