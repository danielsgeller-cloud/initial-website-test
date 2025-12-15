export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Left column: brand and contact */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-sm font-semibold text-amber-800">
                P
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-base font-semibold text-neutral-900">
                  Pictures in Ceramic
                </span>
                <span className="text-[11px] text-neutral-500">
                  Enamel memorial cameos
                </span>
              </div>
            </div>
            <div className="text-sm text-neutral-600">
              <p>11 Doran Ct</p>
              <p>South Brunswick, NJ 08852</p>
              <p className="mt-2">
                Phone:{" "}
                <a
                  href="tel:17322976008"
                  className="text-amber-700 hover:text-amber-500"
                >
                  (732) 297-6008
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@picturesinceramic.com"
                  className="text-amber-700 hover:text-amber-500"
                >
                  info@picturesinceramic.com
                </a>
              </p>
            </div>
          </div>

          {/* Middle column: links */}
          <div className="text-sm text-neutral-600">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Cameo information
            </h3>
            <ul className="mt-3 space-y-1.5">
              <li>
                <a href="/about" className="hover:text-amber-600">
                  About
                </a>
              </li>
              <li>
                <a href="/payment" className="hover:text-amber-600">
                  Why our cameos
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-amber-600">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-amber-600">
                  Frequently asked questions
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-amber-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Right column: hours and social */}
          <div className="text-sm text-neutral-600">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Studio hours
            </h3>
            <ul className="mt-3 space-y-1.5">
              <li>Monday to Friday: 9:00 am to 5:00 pm EST</li>
              <li>Saturday: By appointment</li>
              <li>Sunday: By appointment</li>
            </ul>

            <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Connect
            </h3>
            <div className="mt-3 flex gap-3 text-sm">
              {/* Placeholder social links */}
              <a
                href="#"
                className="rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-700 hover:border-amber-500 hover:text-amber-600"
              >
                Facebook
              </a>
              <a
                href="#"
                className="rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-700 hover:border-amber-500 hover:text-amber-600"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-4 text-xs text-neutral-400">
          © {new Date().getFullYear()} Pictures in Ceramic. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
