"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageSlider from "./i18n/LanguageSlider";
import { useLanguage } from "./i18n/LanguageProvider";
import { useSession, signOut } from "next-auth/react";



import { useCart } from "@/components/cart/CartProvider";
import Link from "next/link";
export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { data: session, status } = useSession();


  const { itemCount } = useCart();
  const isAuthed = status === "authenticated";
  const displayName =
    session?.user?.name?.trim() ||
    session?.user?.email?.trim() ||
    "Account";

  return (
    <header className="w-full border-b border-neutral-200 bg-white">
      <div className="bg-neutral-900 text-xs text-neutral-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 md:px-6">
          <div className="flex items-center gap-3">
            <LanguageSlider />
            <p className="hidden text-[11px] md:block">{t("topbar_service")}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <a href="tel:17322976008" className="hover:text-amber-300">
              {t("phone_display")}
            </a>
            <span className="hidden text-neutral-500 md:inline">|</span>
            <a
              href="mailto:info@picturesinceramic.com"
              className="hidden hover:text-amber-300 md:inline"
            >
              {t("email_display")}
            </a>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-2 md:hidden md:px-6">
          <p className="text-[11px] text-neutral-200">{t("topbar_service")}</p>
        </div>
      </div>

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
              {t("brand_tagline")}
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-5 text-sm text-neutral-700">
            <Link href="/" className="hover:text-amber-600">
              {t("nav_home")}
            </Link>
            <Link href="/about" className="hover:text-amber-600">
              {t("nav_about")}
            </Link>
            <Link href="/payment" className="hover:text-amber-600">
              {t("nav_why")}
            </Link>
            <Link href="/contact" className="hover:text-amber-600">
              {t("nav_contact")}
            </Link>
            <Link href="/order-form" className="hover:text-amber-600">
              {t("nav_order")}
            </Link>

            {isAuthed ? (
              <>
                <Link href="/account" className="hover:text-amber-600">
                  {displayName}
                </Link>
                {(session?.user as any)?.role === "ADMIN" && (
                  <Link href="/admin" className="hover:text-amber-600">
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <Link href="/login" className="hover:text-amber-600">
                {t("nav_account")}
              </Link>
            )}
          </nav>

          
          <Link
            href="/cart"
            aria-label={t("cart_label") || "Cart"}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 hover:border-amber-500 hover:text-amber-600"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.2 6h14.3l-1.7 7.2c-.2.8-.9 1.3-1.7 1.3H9c-.8 0-1.5-.5-1.7-1.3L5.1 3H2V1h4.6l.6 2.5z"
                fill="currentColor"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold leading-none text-black">
                {itemCount}
              </span>
            )}
          </Link>

<button
            type="button"
            aria-label={t("search_label")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 hover:border-amber-500 hover:text-amber-600"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14zM10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                fill="currentColor"
              />
            </svg>
          </button>

          {isAuthed ? (
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-full border border-neutral-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-800 shadow-sm hover:border-amber-500 hover:text-amber-600"
            >
              {t("nav_signout")}
            </button>
          ) : (
            <Link
              href="/order-form"
              className="rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-black shadow-sm hover:bg-amber-400"
            >
              {t("cta_order")}
            </Link>
          )}
        </div>

        <button
          className="rounded-md border border-neutral-300 p-2 md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          type="button"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" aria-hidden="true">
            <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {menuOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/40"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  Menu
                </span>
                <button
                  className="rounded-md border border-neutral-300 px-3 py-1 text-xs"
                  onClick={() => setMenuOpen(false)}
                  type="button"
                >
                  Close
                </button>
              </div>

              <div className="mt-4">
                <LanguageSlider />
              </div>

              <nav className="mt-6 grid gap-4 text-sm text-neutral-700">
                <Link href="/cart" onClick={() => setMenuOpen(false)}>
                  Cart
                  {itemCount > 0 ? ` (${itemCount})` : ""}
                </Link>
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  {t("nav_home")}
                </Link>
                <Link href="/about" onClick={() => setMenuOpen(false)}>
                  {t("nav_about")}
                </Link>
                <Link href="/payment" onClick={() => setMenuOpen(false)}>
                  {t("nav_why")}
                </Link>
                <Link href="/contact" onClick={() => setMenuOpen(false)}>
                  {t("nav_contact")}
                </Link>
                <Link href="/order-form" onClick={() => setMenuOpen(false)}>
                  {t("nav_order")}
                </Link>

                {isAuthed ? (
                  <>
                    <Link href="/account" onClick={() => setMenuOpen(false)}>
                      {displayName}
                    </Link>
                    {(session?.user as any)?.role === "ADMIN" && (
                      <Link href="/admin" onClick={() => setMenuOpen(false)}>
                        Admin
                      </Link>
                    )}
                  </>
                ) : (
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    {t("nav_account")}
                  </Link>
                )}

                {isAuthed && (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="text-left"
                  >
                    {t("nav_signout")}
                  </button>
                )}
              </nav>

              {!isAuthed && (
                <Link
                  href="/order-form"
                  className="mt-6 block rounded-full bg-amber-500 px-5 py-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-black shadow-sm hover:bg-amber-400"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("cta_order")}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
