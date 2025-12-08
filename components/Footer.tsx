import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left - logo and contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
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
            </div>

            <div className="space-y-1 text-sm text-neutral-600">
              <p>123 Memorial Lane</p>
              <p>Monument City, NJ 08888</p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+17325551234"
                  className="text-neutral-800 hover:text-amber-600"
                >
                  (732) 555-1234
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@picturesinceramic.com"
                  className="text-neutral-800 hover:text-amber-600"
                >
                  info@picturesinceramic.com
                </a>
              </p>
            </div>
          </div>

          {/* Middle - links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-neutral-900">Cameo information</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link href="/about" className="hover:text-amber-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/why-our-cameos" className="hover:text-amber-600">
                  Why our cameos
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-amber-600">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-amber-600">
                  Frequently asked questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Right - hours and socials */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-neutral-900">Studio hours</h3>
              <ul className="mt-2 space-y-1 text-sm text-neutral-600">
                <li>Monday - Friday: 9:00 am - 5:00 pm EST</li>
                <li>Saturday: By appointment</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900">Connect</h3>
              <div className="mt-2 flex gap-3">
                {[
                  { label: "Facebook", href: "#" },
                  { label: "Instagram", href: "#" },
                  { label: "Pinterest", href: "#" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 hover:border-amber-500 hover:text-amber-600"
                  >
                    <span className="text-xs font-semibold">
                      {item.label[0]}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-4 text-center text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} Pictures in Ceramic. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
