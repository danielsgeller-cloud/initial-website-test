"use client";

import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Why Our Cameos", href: "/why-our-cameos" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full border-b border-neutral-200 bg-white/95 backdrop-blur">
      {/* Top bar */}
      <div className="border-b border-neutral-200 bg-neutral-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-[11px] text-neutral-700 md:px-6">
          <span>Se habla español - atención disponible en español</span>
          <div className="flex flex-wrap items-center gap-4">
            <a href="tel:+17325551234" className="hover:text-amber-600">
              (732) 555-1234
            </a>
            <a
              href="mailto:info@picturesinceramic.com"
              className="hover:text-amber-600"
            >
              info@picturesinceramic.com
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-neutral-100">
            <span className="font-serif text-lg font-semibold text-amber-600">
              P
            </span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-sm font-semibold text-neutral-900">
              Pictures in Ceramic
            </span>
            <span className="text-[11px] text-neutral-500">
              Enamel memorial cameos
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-5 text-sm font-medium text-neutral-900">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition hover:text-amber-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search icon */}
          <button
            type="button"
            aria-label="Search"
            className="rounded-full border border-neutral-300 p-2 text-neutral-700 hover:border-amber-500 hover:text-amber-600"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
              focusable="false"
            >
              <path
                d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 0 0 1.57-4.23 6.5 6.5 0 1 0-6.5 6.5 6.471 6.471 0 0 0 4.23-1.57l.27.28v.79L20 20.49 21.49 19 15.5 14zm-5 0A4.5 4.5 0 1 1 15 9.5 4.505 4.505 0 0 1 10.5 14z"
                fill="currentColor"
              />
            </svg>
          </button>

          {/* Primary CTA */}
          <Link
            href="/contact"
            className="rounded-full bg-amber-500 px-6 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-black shadow-sm transition hover:bg-amber-400"
          >
            Order a cameo
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label="Search"
            className="rounded-full border border-neutral-300 p-2 text-neutral-700"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
              focusable="false"
            >
              <path
                d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 0 0 1.57-4.23 6.5 6.5 0 1 0-6.5 6.5 6.471 6.471 0 0 0 4.23-1.57l.27.28v.79L20 20.49 21.49 19 15.5 14zm-5 0A4.5 4.5 0 1 1 15 9.5 4.505 4.505 0 0 1 10.5 14z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-neutral-300 p-2 text-neutral-800"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5"
              focusable="false"
            >
              {open ? (
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <ul className="flex flex-col gap-3 text-sm font-medium text-neutral-900">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block py-1"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="block rounded-full bg-amber-500 px-6 py-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-black"
                  onClick={() => setOpen(false)}
                >
                  Order a cameo
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
