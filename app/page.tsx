// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[480px] w-full">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-cemetery-soft.jpg"
            alt="Soft focus cemetery with headstones"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto flex max-w-5xl flex-col items-center px-4 text-center text-white md:px-6">
            <h1 className="font-serif text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Elegant enamel photo cameos that honor a life forever
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-neutral-100 md:text-base">
              Custom kiln fired portraits created for outdoor monuments. Each
              cameo is crafted to stay bright on the stone in every season.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-black shadow-md transition hover:bg-amber-400"
              >
                Order a cameo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="font-serif text-2xl font-semibold text-neutral-900 md:text-3xl">
            Custom enamel photo memorial cameos for headstones and mausoleums
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600 md:text-base">
            We transform your favorite photograph into a kiln fired enamel
            portrait that bonds glass and color to porcelain. The result is a
            cameo that resists fading, moisture, and freezing temperatures while
            preserving a clear, dignified likeness. Families choose our studio
            for careful retouching, color work, and reliable craftsmanship on
            every order.
          </p>

          {/* Thin divider similar to competitor style */}
          <div className="mt-8 flex justify-center">
            <div className="h-px w-24 bg-neutral-300" />
          </div>
        </div>
      </section>

      {/* THREE IMAGE BLOCKS */}
      <section className="bg-neutral-100 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                label: "About us",
                href: "/about",
                image: "/images/about-studio.jpg",
              },
              {
                label: "Why our cameos",
                href: "/why-our-cameos",
                image: "/images/why-cameos-closeup.jpg",
              },
              {
                label: "Contact us",
                href: "/contact",
                image: "/images/contact-headstone-flowers.jpg",
              },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative block aspect-square overflow-hidden rounded-md shadow-sm"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/45" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="rounded-full border border-white/70 bg-black/30 px-6 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                    {item.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE SECTION – HOW IT WORKS */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:px-6 md:items-center">
          {/* Left - process explanation */}
          <div className="space-y-5">
            <h2 className="font-serif text-2xl font-semibold text-neutral-900 md:text-3xl">
              How your custom enamel cameo is created
            </h2>
            <p className="text-sm text-neutral-600 md:text-base">
              We guide you from the first photo you send to a finished cameo
              that arrives ready for installation. The process is personal and
              straightforward.
            </p>
            <ol className="space-y-4 text-sm text-neutral-700 md:text-base">
              <li>
                <span className="font-semibold text-amber-600">1. Upload a photo</span>
                <br />
                Share a digital file or a scan of a printed photo. We can work
                with older or slightly damaged images.
              </li>
              <li>
                <span className="font-semibold text-amber-600">
                  2. Choose shape and size
                </span>
                <br />
                Select oval, rectangular, or square formats that match your
                monument and cemetery guidelines.
              </li>
              <li>
                <span className="font-semibold text-amber-600">
                  3. We craft your enamel cameo
                </span>
                <br />
                The image is retouched, color balanced, and fired multiple
                times in the kiln to fuse pigment and glass.
              </li>
              <li>
                <span className="font-semibold text-amber-600">
                  4. We ship ready for installation
                </span>
                <br />
                Your cameo is inspected by hand and shipped with mounting
                guidance for you or your monument dealer.
              </li>
            </ol>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-full border border-neutral-300 px-6 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-900 transition hover:border-amber-500 hover:text-amber-600"
            >
              View pricing and sizes
            </Link>
          </div>

          {/* Right - cameo image on stone */}
          <div className="relative mx-auto h-80 w-full max-w-md overflow-hidden rounded-md shadow-lg">
            <Image
              src="/images/cameo-on-headstone.jpg"
              alt="Enamel photo cameo mounted on a granite headstone"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* CALL TO ACTION – FULL WIDTH IMAGE */}
      <section className="relative w-full">
        <div className="absolute inset-0">
          <Image
            src="/images/cta-background-flowers.jpg"
            alt="Sunset light over cemetery with flowers"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-16 text-center text-white md:px-6 md:py-20">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            Ready to order a cameo or request more information
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-neutral-100 md:text-base">
            Share your photo, stone details, and any questions. We reply
            personally with options, pricing, and a clear next step.
          </p>
          <Link
            href="/contact"
            className="mt-8 rounded-full bg-amber-500 px-10 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-md transition hover:bg-amber-400"
          >
            Order a cameo
          </Link>
        </div>
      </section>
    </main>
  );
}