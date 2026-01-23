"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

type Lang = "en" | "es";

function pick(lang: Lang, m: { en: string; es: string }) {
  return m[lang] ?? m.en;
}

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Hero Section */}
      <section className="relative h-[320px] w-full overflow-hidden bg-neutral-900 md:h-[420px]">
        <div className="absolute inset-0 bg-neutral-800">
          <img
            src="/images/field-sunset-wide.jpg"
            alt={pick(lang, {
              en: "Memorial landscape",
              es: "Paisaje conmemorativo",
            })}
            className="h-full w-full object-cover opacity-40"
          />
        </div>

        <div className="relative mx-auto flex h-full max-w-5xl flex-col justify-center px-4 text-white md:px-6">
          <h1 className="font-serif text-3xl font-bold md:text-5xl">
            {pick(lang, {
              en: "About Our Studio",
              es: "Sobre Nuestro Estudio",
            })}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-neutral-200 md:text-base">
            {pick(lang, {
              en: "A family tradition of craftsmanship, care, and kiln fired enamel portraiture.",
              es: "Una tradición familiar de artesanía, cuidado y retratos de esmalte horneado.",
            })}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="mx-auto max-w-5xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          {/* Image Placeholder 1 */}
          <div className="relative h-72 w-full overflow-hidden rounded-xl bg-neutral-100 shadow-md md:h-full">
            <img
              src="/images/about-studio.jpg"
              alt={pick(lang, {
                en: "Family studio",
                es: "Estudio familiar",
              })}
              className="h-full w-full object-cover opacity-80"
            />
          </div>

          {/* Story Left Column */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold md:text-3xl">
              {pick(lang, {
                en: "A craft learned over decades",
                es: "Un oficio aprendido a través de décadas",
              })}
            </h2>

            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              {pick(lang, {
                en: 'Over forty years ago, [OWNER NAME] began learning the art of enamel memorial medallion creation in Ukraine. What started as deep respect for memorial traditions became a lifelong dedication to a rare and highly technical craft.',
                es: "Hace más de cuarenta años, [OWNER NAME] comenzó a aprender el arte de crear medallones conmemorativos de esmalte en Ucrania. Lo que comenzó como un profundo respeto por las tradiciones conmemorativas se convirtió en una dedicación de toda la vida a un oficio raro y altamente técnico.",
              })}
            </p>

            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              {pick(lang, {
                en: "After immigrating to the United States, [OWNER NAME] rebuilt the studio from the ground up. By the early 1990s, our family opened the workshop that continues its work today, serving families and monument dealers across the country.",
                es: "Después de emigrar a los Estados Unidos, [OWNER NAME] reconstruyó el estudio desde cero. A principios de la década de 1990, nuestra familia abrió el taller que continúa su trabajo hoy, sirviendo a familias y distribuidores de monumentos en todo el país.",
              })}
            </p>
          </div>
        </div>

        {/* Second Block: Process + Materials */}
        <div className="mt-20 grid gap-14 md:grid-cols-2 md:gap-20">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold md:text-3xl">
              {pick(lang, {
                en: "High quality enamel on precisely finished metal",
                es: "Esmalte de alta calidad sobre metal terminado con precisión",
              })}
            </h2>

            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              {pick(lang, {
                en: "Each portrait begins with a carefully prepared [BRASS_OR_BRONZE] medallion blank that is cut and finished for mounting on granite, marble, bronze markers, or indoor displays. The surface is coated multiple times with high quality enamel to create a stable, durable base.",
                es: "Cada retrato comienza con una pieza de medallón de [BRASS_OR_BRONZE] cuidadosamente preparada que se corta y termina para montar en granito, mármol, marcadores de bronce o exhibiciones interiores. La superficie se recubre varias veces con esmalte de alta calidad para crear una base estable y duradera.",
              })}
            </p>

            <h2 className="font-serif text-xl font-semibold md:text-2xl">
              {pick(lang, {
                en: "Proprietary chemistry that fixes the image for generations",
                es: "Química patentada que fija la imagen por generaciones",
              })}
            </h2>

            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              {pick(lang, {
                en: "The photograph is translated into an enamel image using a proprietary, complex polymerization and formulation process. This chemistry is what permanently fuses the color to the enamel surface on the medallion. It has been refined over decades so that every portrait remains clear, stable, and faithful to the original image.",
                es: "La fotografía se traduce en una imagen de esmalte utilizando un proceso patentado y complejo de polimerización y formulación. Esta química es lo que fusiona permanentemente el color a la superficie de esmalte del medallón. Se ha refinado durante décadas para que cada retrato permanezca claro, estable y fiel a la imagen original.",
              })}
            </p>

            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              {pick(lang, {
                en: "The result is a memorial portrait engineered to endure outdoor conditions and everyday weather. We stand behind every piece with a lifetime warranty, so families and dealers can order with confidence.",
                es: "El resultado es un retrato conmemorativo diseñado para soportar condiciones al aire libre y el clima cotidiano. Respaldamos cada pieza con una garantía de por vida, para que las familias y distribuidores puedan ordenar con confianza.",
              })}
            </p>
          </div>

          {/* Image Placeholder 2 */}
          <div className="relative h-72 w-full overflow-hidden rounded-xl bg-neutral-100 shadow-md md:h-full">
            <img
              src="/images/granite-texture.jpg"
              alt={pick(lang, {
                en: "Granite memorial material",
                es: "Material de granito conmemorativo",
              })}
              className="h-full w-full object-cover opacity-80"
            />
          </div>
        </div>

        {/* Third Block: Family Values */}
        <div className="mt-20 flex flex-col items-center text-center">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">
            {pick(lang, {
              en: "A memorial treated like our own family",
              es: "Un memorial tratado como nuestra propia familia",
            })}
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-700 md:text-base">
            {pick(lang, {
              en: "As a family owned studio, we know every photograph carries a story that cannot be replaced. Each memorial is handled with the same care we would give to our own loved ones. This is not production work. It is personal work, approached with respect, patience, and attention to detail.",
              es: "Como un estudio familiar, sabemos que cada fotografía lleva una historia que no puede ser reemplazada. Cada memorial se maneja con el mismo cuidado que daríamos a nuestros propios seres queridos. Esto no es trabajo de producción. Es trabajo personal, abordado con respeto, paciencia y atención al detalle.",
            })}
          </p>

          {/* Image Placeholder 3 */}
          <div className="mt-10 h-64 w-full max-w-3xl overflow-hidden rounded-xl bg-neutral-100 shadow-md md:h-80">
            <img
              src="/images/field-soft-repeat.jpg"
              alt={pick(lang, {
                en: "Peaceful memorial landscape",
                es: "Paisaje conmemorativo tranquilo",
              })}
              className="h-full w-full object-cover opacity-80"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
