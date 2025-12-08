export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Hero Section */}
      <section className="relative h-[320px] w-full overflow-hidden bg-neutral-900 md:h-[420px]">
        {/* Placeholder Hero Image */}
        <div className="absolute inset-0 bg-neutral-800">
          <img
            src="/images/about-hero-placeholder.jpg"
            alt="Studio placeholder"
            className="h-full w-full object-cover opacity-40"
          />
        </div>

        <div className="relative mx-auto flex h-full max-w-5xl flex-col justify-center px-4 text-white md:px-6">
          <h1 className="font-serif text-3xl font-bold md:text-5xl">
            About Our Studio
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-neutral-200 md:text-base">
            A family tradition of craftsmanship, care, and kiln fired enamel
            portraiture.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="mx-auto max-w-5xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          {/* Image Placeholder 1 */}
          <div className="relative h-72 w-full overflow-hidden rounded-xl bg-neutral-100 shadow-md md:h-full">
            <img
              src="/images/about-placeholder-1.jpg"
              alt="Family studio placeholder"
              className="h-full w-full object-cover opacity-80"
            />
          </div>

          {/* Story Left Column */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold md:text-3xl">
              A craft learned over decades
            </h2>
            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              Over forty years ago, <span className="font-semibold">[OWNER NAME]</span> began
              learning the art of enamel memorial medallion creation in Ukraine.
              What started as a deep respect for memorial traditions became a
              lifelong dedication to a rare and highly technical craft.
            </p>

            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              After immigrating to the United States, <span className="font-semibold">[OWNER NAME]</span>{" "}
              rebuilt the studio from the ground up. By the early 1990s, our
              family opened the workshop that continues its work today, now
              serving families and monument dealers across the country.
            </p>
          </div>
        </div>

        {/* Second Block: Process + Materials */}
        <div className="mt-20 grid gap-14 md:grid-cols-2 md:gap-20">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold md:text-3xl">
              High quality enamel on precisely finished metal
            </h2>
            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              Each portrait begins with a carefully prepared{" "}
              <span className="font-semibold">[BRASS_OR_BRONZE]</span> medallion
              blank that is cut and finished for mounting on granite, marble,
              bronze markers, or indoor displays. The surface is coated multiple
              times with high quality enamel to create a stable, durable base.
            </p>

            <h2 className="font-serif text-xl font-semibold md:text-2xl">
              Proprietary chemistry that fixes the image for generations
            </h2>
            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              The photograph is translated into an enamel image using a
              proprietary, complex polymerization and formulation process. This
              chemistry is what fuses the color permanently to the enamel
              surface on the medallion. It has been refined over decades so that
              every portrait remains clear, stable, and faithful to the original
              image.
            </p>

            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              The result is a memorial portrait that is engineered to endure
              outdoor conditions and everyday weather. We stand behind every
              piece with a <span className="font-semibold">lifetime warranty</span>, so families and
              dealers can order with confidence.
            </p>
          </div>

          {/* Image Placeholder 2 */}
          <div className="relative h-72 w-full overflow-hidden rounded-xl bg-neutral-100 shadow-md md:h-full">
            <img
              src="/images/about-placeholder-2.jpg"
              alt="Craftsmanship placeholder"
              className="h-full w-full object-cover opacity-80"
            />
          </div>
        </div>

        {/* Third Block: Family Values */}
        <div className="mt-20 flex flex-col items-center text-center">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">
            A memorial treated like our own family
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-700 md:text-base">
            As a family owned studio, we know that every photograph sent to us
            carries a story that cannot be replaced. Each memorial is handled
            with the same care we would give to our own loved ones. This is not
            just production work, it is personal work, and we approach it with
            respect, patience, and attention to detail.
          </p>

          {/* Image Placeholder 3 */}
          <div className="mt-10 h-64 w-full max-w-3xl overflow-hidden rounded-xl bg-neutral-100 shadow-md md:h-80">
            <img
              src="/images/about-placeholder-3.jpg"
              alt="Family placeholder"
              className="h-full w-full object-cover opacity-80"
            />
          </div>
        </div>
      </section>
    </main>
  );
}