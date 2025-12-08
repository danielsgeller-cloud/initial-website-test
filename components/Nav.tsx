import Link from "next/link";

export default function Nav() {
  return (
    <header className="w-full border-b border-neutral-200 bg-white">
      {/* Top language and contact bar */}
      <div className="bg-neutral-900 text-xs text-neutral-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 md:px-6">
          <p className="text-[11px] md:text-xs">
            Service available in English, Ukrainian, and Russian
          </p>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <a
              href="tel:17322976008"
              className="hover:text-amber-300"
            >
              (732) 297-6008
            </a>
            <span className="hidden text-neutral-500 md:inline">|</span>
            <a
              href="mailto:info@picturesinceramic.com"
              className="hidden hover:text-amber-300 md:inline"
            >
              info@picturesinceramic.com
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        {/* Logo block */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-sm font-semibold text-amber-800">
            P
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-base font-semibold text-neutral-900 md:text-lg">
              Pictures in Ceramic
            </span>
            <span className="text-[11px] text-neutral-500 md:text-xs">
              Enamel memorial cameos
            </span>
          </div>
        </Link>

        {/* Nav links and actions */}
        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-5 text-sm text-neutral-700">
            <Link href="/" className="hover:text-amber-600">
              Home
            </Link>
            <Link href="/about" className="hover:text-amber-600">
              About
            </Link>
            <Link href="/why-our-cameos" className="hover:text-amber-600">
              Why Our Cameos
            </Link>
            <Link href="/pricing" className="hover:text-amber-600">
              Pricing
            </Link>
            <Link href="/contact" className="hover:text-amber-600">
              Contact
            </Link>
          </nav>

          {/* Search icon */}
          <button
            type="button"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 hover:border-amber-500 hover:text-amber-600"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14zM10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                fill="currentColor"
              />
            </svg>
          </button>

          {/* Order button */}
          <Link
            href="/contact"
            className="rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-black shadow-sm hover:bg-amber-400"
          >
            Order a cameo
          </Link>
        </div>
      </div>
    </header>
  );
}
