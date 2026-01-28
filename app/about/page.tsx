"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

type Lang = "en" | "es" | "ru" | "uk";

function pick(lang: Lang, m: { en: string; es: string; ru?: string; uk?: string }) {
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
              ru: "Памятный пейзаж",
              uk: "Пам'ятний пейзаж",
            })}
            className="h-full w-full object-cover opacity-40"
          />
        </div>

        <div className="relative mx-auto flex h-full max-w-5xl flex-col justify-center px-4 text-white md:px-6">
          <h1 className="font-serif text-3xl font-bold md:text-5xl">
            {pick(lang, {
              en: "About Our Studio",
              es: "Sobre Nuestro Estudio",
              ru: "О нашей студии",
              uk: "Про нашу студію",
            })}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-neutral-200 md:text-base">
            {pick(lang, {
              en: "A family tradition of craftsmanship, care, and kiln fired enamel portraiture.",
              es: "Una tradición familiar de artesanía, cuidado y retratos de esmalte horneado.",
              ru: "Семейная традиция мастерства, заботы и эмалевой портретной живописи, обожженной в печи.",
              uk: "Сімейна традиція майстерності, турботи та емалевого портретного мистецтва, випаленого в печі.",
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
              src="/images/medallions-showcase.jpg"
              alt={pick(lang, {
                en: "Ceramic photo medallions showcase",
                es: "Exhibición de medallones fotográficos de cerámica",
                ru: "Витрина керамических фото-медальонов",
                uk: "Вітрина керамічних фото-медальйонів",
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
                ru: "Ремесло, освоенное десятилетиями",
                uk: "Ремесло, освоєне десятиліттями",
              })}
            </h2>

            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              {pick(lang, {
                en: 'Over forty years ago, we began learning the art of enamel memorial medallion creation in Ukraine. What started as deep respect for memorial traditions became a lifelong dedication to a rare and highly technical craft.',
                es: "Hace más de cuarenta años, comenzamos a aprender el arte de crear medallones conmemorativos de esmalte en Ucrania. Lo que comenzó como un profundo respeto por las tradiciones conmemorativas se convirtió en una dedicación de toda la vida a un oficio raro y altamente técnico.",
                ru: "Более сорока лет назад мы начали изучать искусство создания эмалевых памятных медальонов в Украине. То, что началось как глубокое уважение к памятным традициям, превратилось в пожизненную преданность редкому и высокотехничному ремеслу.",
                uk: "Понад сорок років тому ми почали вивчати мистецтво створення емалевих пам'ятних медальйонів в Україні. Те, що почалося як глибока повага до пам'ятних традицій, перетворилося на довічну відданість рідкісному та високотехнічному ремеслу.",
              })}
            </p>

            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              {pick(lang, {
                en: "After immigrating to the United States, we rebuilt the studio from the ground up. By the early 1990s, our family opened the workshop that continues its work today, serving families and monument dealers across the country.",
                es: "Después de emigrar a los Estados Unidos, reconstruimos el estudio desde cero. A principios de la década de 1990, nuestra familia abrió el taller que continúa su trabajo hoy, sirviendo a familias y distribuidores de monumentos en todo el país.",
                ru: "После иммиграции в Соединенные Штаты мы восстановили студию с нуля. К началу 1990-х годов наша семья открыла мастерскую, которая продолжает свою работу сегодня, обслуживая семьи и продавцов памятников по всей стране.",
                uk: "Після імміграції до Сполучених Штатів ми відновили студію з нуля. На початку 1990-х років наша сім'я відкрила майстерню, яка продовжує свою роботу сьогодні, обслуговуючи сім'ї та продавців пам'ятників по всій країні.",
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
                ru: "Высококачественная эмаль на точно обработанном металле",
                uk: "Високоякісна емаль на точно обробленому металі",
              })}
            </h2>

            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              {pick(lang, {
                en: "Each portrait begins with a carefully prepared copper medallion blank that is cut and finished for mounting on granite, marble, bronze markers, or indoor displays. The surface is coated multiple times with high quality enamel to create a stable, durable base.",
                es: "Cada retrato comienza con una pieza de medallón de cobre cuidadosamente preparada que se corta y termina para montar en granito, mármol, marcadores de bronce o exhibiciones interiores. La superficie se recubre varias veces con esmalte de alta calidad para crear una base estable y duradera.",
                ru: "Каждый портрет начинается с тщательно подготовленной медной заготовки медальона, которая вырезается и обрабатывается для крепления на гранит, мрамор, бронзовые маркеры или для использования в помещении. Поверхность покрывается высококачественной эмалью несколько раз для создания стабильной, прочной основы.",
                uk: "Кожен портрет починається з ретельно підготовленої мідної заготовки медальйона, яка вирізається і обробляється для кріплення на граніт, мармур, бронзові маркери або для використання в приміщенні. Поверхня покривається високоякісною емаллю кілька разів для створення стабільної, міцної основи.",
              })}
            </p>

            <h2 className="font-serif text-xl font-semibold md:text-2xl">
              {pick(lang, {
                en: "Proprietary chemistry that fixes the image for generations",
                es: "Química patentada que fija la imagen por generaciones",
                ru: "Запатентованная химия, закрепляющая изображение на поколения",
                uk: "Запатентована хімія, що закріплює зображення на покоління",
              })}
            </h2>

            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              {pick(lang, {
                en: "The photograph is translated into an enamel image using a proprietary, complex polymerization and formulation process. This chemistry is what permanently fuses the color to the enamel surface on the medallion. It has been refined over decades so that every portrait remains clear, stable, and faithful to the original image.",
                es: "La fotografía se traduce en una imagen de esmalte utilizando un proceso patentado y complejo de polimerización y formulación. Esta química es lo que fusiona permanentemente el color a la superficie de esmalte del medallón. Se ha refinado durante décadas para que cada retrato permanezca claro, estable y fiel a la imagen original.",
                ru: "Фотография переносится на эмалевое изображение с использованием запатентованного сложного процесса полимеризации и формулирования. Именно эта химия навсегда соединяет цвет с эмалевой поверхностью медальона. Она совершенствовалась десятилетиями, чтобы каждый портрет оставался четким, стабильным и верным оригинальному изображению.",
                uk: "Фотографія переноситься на емалеве зображення з використанням запатентованого складного процесу полімеризації та формулювання. Саме ця хімія назавжди з'єднує колір з емалевою поверхнею медальйона. Вона вдосконалювалася десятиліттями, щоб кожен портрет залишався чітким, стабільним і вірним оригінальному зображенню.",
              })}
            </p>

            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              {pick(lang, {
                en: "The result is a memorial portrait engineered to endure outdoor conditions and everyday weather. We stand behind every piece with a lifetime warranty, so families and dealers can order with confidence.",
                es: "El resultado es un retrato conmemorativo diseñado para soportar condiciones al aire libre y el clima cotidiano. Respaldamos cada pieza con una garantía de por vida, para que las familias y distribuidores puedan ordenar con confianza.",
                ru: "Результатом является памятный портрет, созданный для использования на открытом воздухе и в любых погодных условиях. Мы гарантируем пожизненную гарантию на каждое изделие, чтобы семьи и продавцы могли заказывать с уверенностью.",
                uk: "Результатом є пам'ятний портрет, створений для використання на відкритому повітрі та в будь-яких погодних умовах. Ми гарантуємо довічну гарантію на кожен виріб, щоб сім'ї та продавці могли замовляти з упевненістю.",
              })}
            </p>
          </div>

          {/* Image Placeholder 2 */}
          <div className="relative h-72 w-full overflow-hidden rounded-xl bg-neutral-100 shadow-md md:h-full">
            <img
              src="/images/contact-headstone-flowers.jpg"
              alt={pick(lang, {
                en: "Memorial with flowers",
                es: "Memorial con flores",
                ru: "Памятник с цветами",
                uk: "Пам'ятник з квітами",
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
              ru: "Памятник, к которому относятся как к своей семье",
              uk: "Пам'ятник, до якого ставляться як до своєї сім'ї",
            })}
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-700 md:text-base">
            {pick(lang, {
              en: "As a family owned studio, we know every photograph carries a story that cannot be replaced. Each memorial is handled with the same care we would give to our own loved ones. This is not production work. It is personal work, approached with respect, patience, and attention to detail.",
              es: "Como un estudio familiar, sabemos que cada fotografía lleva una historia que no puede ser reemplazada. Cada memorial se maneja con el mismo cuidado que daríamos a nuestros propios seres queridos. Esto no es trabajo de producción. Es trabajo personal, abordado con respeto, paciencia y atención al detalle.",
              ru: "Как семейная студия, мы знаем, что каждая фотография несет историю, которую невозможно заменить. С каждым памятником мы обращаемся с той же заботой, что и с нашими собственными близкими. Это не массовое производство. Это личная работа, выполняемая с уважением, терпением и вниманием к деталям.",
              uk: "Як сімейна студія, ми знаємо, що кожна фотографія несе історію, яку неможливо замінити. З кожним пам'ятником ми поводимося з тією ж турботою, що і з нашими власними близькими. Це не масове виробництво. Це особиста робота, виконувана з повагою, терпінням і увагою до деталей.",
            })}
          </p>

          {/* Image Placeholder 3 */}
          <div className="mt-10 h-64 w-full max-w-3xl overflow-hidden rounded-xl bg-neutral-100 shadow-md md:h-80">
            <img
              src="/images/field-soft-repeat.jpg"
              alt={pick(lang, {
                en: "Peaceful memorial landscape",
                es: "Paisaje conmemorativo tranquilo",
                ru: "Спокойный памятный пейзаж",
                uk: "Спокійний пам'ятний пейзаж",
              })}
              className="h-full w-full object-cover opacity-80"
            />
          </div>
        </div>

        {/* Fourth Block: Company Info and Warranty */}
        <div className="mt-20 grid gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl bg-white shadow-md">
            <img
              src="/images/company-warranty.jpg"
              alt={pick(lang, {
                en: "Pictures in Ceramic company information and lifetime warranty",
                es: "Información de la empresa Pictures in Ceramic y garantía de por vida",
                ru: "Информация о компании Pictures in Ceramic и пожизненная гарантия",
                uk: "Інформація про компанію Pictures in Ceramic та довічна гарантія",
              })}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="overflow-hidden rounded-xl bg-white shadow-md">
            <img
              src="/images/process-description.jpg"
              alt={pick(lang, {
                en: "Kiln-fired porcelain enamel process description",
                es: "Descripción del proceso de esmalte de porcelana cocido en horno",
                ru: "Описание процесса обжига фарфоровой эмали в печи",
                uk: "Опис процесу випалу порцелянової емалі в печі",
              })}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Fifth Block: Optional Frames */}
        <div className="mt-10 overflow-hidden rounded-xl bg-white shadow-md">
          <img
            src="/images/frames-modifications.jpg"
            alt={pick(lang, {
              en: "Optional bronze frames and photo modification services",
              es: "Marcos de bronce opcionales y servicios de modificación de fotos",
              ru: "Дополнительные бронзовые рамки и услуги редактирования фотографий",
              uk: "Додаткові бронзові рамки та послуги редагування фотографій",
            })}
            className="w-full object-contain"
          />
        </div>
      </section>
    </main>
  );
}
