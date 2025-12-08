import Link from "next/link";

export default function PricingPage() {
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
            Pricing and Sizes
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-neutral-200 md:text-base">
            Clear, straightforward pricing for enamel portrait medallions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-5xl px-4 py-14 md:px-6 md:py-20">
        {/* Intro */}
        <div className="text-center">
          <p className="mx-auto max-w-3xl text-sm text-neutral-700 md:text-base">
            Below are our most common sizes and shapes. Each portrait is
            enamel-coated, kiln fired, retouched by hand, and backed by our
            lifetime warranty. Custom sizes available.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {/* Oval */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="h-40 w-full overflow-hidden rounded-md bg-neutral-100">
              <img
                src="/images/oval-placeholder.jpg"
                alt="Oval cameo placeholder"
                className="h-full w-full object-cover opacity-80"
              />
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold">Oval Cameos</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              <li>2 × 3 in — <span className="font-semibold">[PRICE]</span></li>
              <li>3 × 4 in — <span className="font-semibold">[PRICE]</span></li>
              <li>4 × 6 in — <span className="font-semibold">[PRICE]</span></li>
            </ul>
          </div>

          {/* Rectangular */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="h-40 w-full overflow-hidden rounded-md bg-neutral-100">
              <img
                src="/images/rect-placeholder.jpg"
                alt="Rectangular cameo placeholder"
                className="h-full w-full object-cover opacity-80"
              />
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold">Rectangular Cameos</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              <li>2 × 2.5 in — <span className="font-semibold">[PRICE]</span></li>
              <li>3 × 4 in — <span className="font-semibold">[PRICE]</span></li>
              <li>5 × 7 in — <span className="font-semibold">[PRICE]</span></li>
            </ul>
          </div>

          {/* Square */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="h-40 w-full overflow-hidden rounded-md bg-neutral-100">
              <img
                src="/images/square-placeholder.jpg"
                alt="Square cameo placeholder"
                className="h-full w-full object-cover opacity-80"
              />
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold">Square Cameos</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              <li>2 × 2 in — <span className="font-semibold">[PRICE]</span></li>
              <li>3 × 3 in — <span className="font-semibold">[PRICE]</span></li>
              <li>4 × 4 in — <span className="font-semibold">[PRICE]</span></li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">
            Need a custom size or special shape?
          </h2>
          <p className="mt-3 text-sm text-neutral-600 md:text-base">
            We produce custom enamel medallions for headstones, mausoleums,
            homes, and custom installations.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-amber-500 px-10 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-lg hover:bg-amber-400"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </main>
  );
}
