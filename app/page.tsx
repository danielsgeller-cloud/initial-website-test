"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../components/i18n/LanguageProvider";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <main className="flex flex-col">
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/field-hero.jpg"
            alt={t("home_hero_image_alt")}
            fill
            priority
            className="hero-bg-image"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
        </div>

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto flex max-w-5xl flex-col items-center px-4 text-center text-white md:px-6">
            <h1 className="font-serif text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              {t("home_hero_title")}
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-neutral-100 md:text-base">
              {t("home_hero_subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/order-form"
                className="rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-black shadow-md transition hover:bg-amber-400"
              >
                {t("cta_order")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="relative bg-neutral-900/5 py-12 md:py-16">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
          <Image
            src="/images/field-soft-repeat.jpg"
            alt={t("home_intro_bg_alt")}
            fill
            className="section-bg-pan"
          />
          <div className="absolute inset-0 bg-white/60" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 md:px-6">
          <div className="rounded-2xl bg-white/90 px-6 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.18)] backdrop-blur-sm md:px-10 md:py-10">
            <h2 className="font-serif text-2xl font-semibold text-neutral-900 md:text-3xl">
              {t("home_intro_title")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 md:text-base">
              {t("home_intro_body")}
            </p>
            <div className="mt-8 flex justify-center">
              <div className="h-px w-24 bg-neutral-300" />
            </div>
          </div>
        </div>
      </section>

      {/* LINKS */}
      <section className="relative bg-gradient-to-b from-neutral-100 via-neutral-50 to-neutral-100 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                key: "about",
                label: t("home_tile_about"),
                href: "/about",
                image: "/images/medallions-showcase.jpg",
                alt: t("home_tile_about_alt"),
              },
              {
                key: "why",
                label: t("home_tile_why"),
                href: "/payment",
                image: "/images/why-cameos-closeup.jpg",
                alt: t("home_tile_why_alt"),
              },
              {
                key: "contact",
                label: t("home_tile_contact"),
                href: "/contact",
                image: "/images/contact-headstone-flowers.jpg",
                alt: t("home_tile_contact_alt"),
              },
            ].map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="group relative block aspect-square overflow-hidden rounded-md shadow-md shadow-neutral-300/40"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-contain transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-end justify-center pb-6">
                  <span className="rounded-full border border-white/80 bg-black/35 px-6 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                    {item.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/field-sunset-wide.jpg"
            alt={t("home_cta_bg_alt")}
            fill
            className="cta-bg-image"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-16 text-center text-white md:px-6 md:py-20">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            {t("home_cta_title")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-neutral-100 md:text-base">
            {t("home_cta_body")}
          </p>
          <Link
            href="/order-form"
            className="mt-8 rounded-full bg-amber-500 px-10 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-lg transition hover:bg-amber-400"
          >
            {t("cta_order")}
          </Link>
        </div>
      </section>
    </main>
  );
}
