"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

type Lang = "en" | "ru" | "uk";

function pick(lang: Lang, m: { en: string; ru: string; uk: string }) {
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
            src="/images/about-hero-placeholder.jpg"
            alt={pick(lang, {
              en: "Studio placeholder",
              ru: "Место для фото студии",
              uk: "Місце для фото майстерні",
            })}
            className="h-full w-full object-cover opacity-40"
          />
        </div>

        <div className="relative mx-auto flex h-full max-w-5xl flex-col justify-center px-4 text-white md:px-6">
          <h1 className="font-serif text-3xl font-bold md:text-5xl">
            {pick(lang, {
              en: "About Our Studio",
              ru: "О нашей мастерской",
              uk: "Про нашу майстерню",
            })}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-neutral-200 md:text-base">
            {pick(lang, {
              en: "A family tradition of craftsmanship, care, and kiln fired enamel portraiture.",
              ru: "Семейная традиция мастерства, заботы и портретов на эмали, обожженных в печи.",
              uk: "Сімейна традиція майстерності, турботи та портретів на емалі, випалених у печі.",
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
              src="/images/about-placeholder-1.jpg"
              alt={pick(lang, {
                en: "Family studio placeholder",
                ru: "Место для фото семейной мастерской",
                uk: "Місце для фото сімейної майстерні",
              })}
              className="h-full w-full object-cover opacity-80"
            />
          </div>

          {/* Story Left Column */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold md:text-3xl">
              {pick(lang, {
                en: "A craft learned over decades",
                ru: "Ремесло, отточенное десятилетиями",
                uk: "Мистецтво, відточене десятиліттями",
              })}
            </h2>

            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              {pick(lang, {
                en: 'Over forty years ago, [OWNER NAME] began learning the art of enamel memorial medallion creation in Ukraine. What started as deep respect for memorial traditions became a lifelong dedication to a rare and highly technical craft.',
                ru: "Более сорока лет назад [OWNER NAME] начал(а) изучать искусство изготовления мемориальных эмалевых медальонов в Украине. То, что началось с уважения к традициям памяти, стало делом всей жизни и редким, технически сложным ремеслом.",
                uk: "Понад сорок років тому [OWNER NAME] почав(ла) опановувати мистецтво створення меморіальних емалевих медальйонів в Україні. Те, що починалося з поваги до традицій вшанування, стало справою життя та рідкісним, технічно складним ремеслом.",
              })}
            </p>

            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              {pick(lang, {
                en: "After immigrating to the United States, [OWNER NAME] rebuilt the studio from the ground up. By the early 1990s, our family opened the workshop that continues its work today, serving families and monument dealers across the country.",
                ru: "После переезда в США [OWNER NAME] восстановил(а) мастерскую с нуля. В начале 1990-х наша семья открыла производство, которое работает и сегодня, обслуживая семьи и дилеров памятников по всей стране.",
                uk: "Після переїзду до США [OWNER NAME] відбудував(ла) майстерню з нуля. На початку 1990-х наша сімʼя відкрила виробництво, яке працює й сьогодні, обслуговуючи родини та дилерів памʼятників по всій країні.",
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
                ru: "Высококачественная эмаль на точно обработанном металле",
                uk: "Високоякісна емаль на точно обробленому металі",
              })}
            </h2>

            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              {pick(lang, {
                en: "Each portrait begins with a carefully prepared [BRASS_OR_BRONZE] medallion blank that is cut and finished for mounting on granite, marble, bronze markers, or indoor displays. The surface is coated multiple times with high quality enamel to create a stable, durable base.",
                ru: "Каждый портрет начинается с тщательно подготовленной заготовки медальона из [BRASS_OR_BRONZE], вырезанной и обработанной для крепления на граните, мраморе, бронзовых маркерах или для размещения в интерьере. Поверхность многократно покрывается высококачественной эмалью, создавая прочную и стабильную основу.",
                uk: "Кожен портрет починається з ретельно підготовленої заготовки медальйона з [BRASS_OR_BRONZE], вирізаної та обробленої для монтажу на граніті, мармурі, бронзових маркерах або для інтерʼєрних експозицій. Поверхню кілька разів покривають високоякісною емаллю, створюючи міцну та стабільну основу.",
              })}
            </p>

            <h2 className="font-serif text-xl font-semibold md:text-2xl">
              {pick(lang, {
                en: "Proprietary chemistry that fixes the image for generations",
                ru: "Собственная химия, закрепляющая изображение на поколения",
                uk: "Власна хімія, що закріплює зображення на покоління",
              })}
            </h2>

            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              {pick(lang, {
                en: "The photograph is translated into an enamel image using a proprietary, complex polymerization and formulation process. This chemistry is what permanently fuses the color to the enamel surface on the medallion. It has been refined over decades so that every portrait remains clear, stable, and faithful to the original image.",
                ru: "Фотография переводится в эмалевое изображение с помощью фирменного сложного процесса полимеризации и рецептур. Именно эта химия навсегда закрепляет цвет на поверхности эмали медальона. Метод оттачивался десятилетиями, чтобы каждый портрет оставался четким, стабильным и максимально близким к оригиналу.",
                uk: "Фотографія перетворюється на емалеве зображення за допомогою фірмового складного процесу полімеризації та рецептур. Саме ця хімія назавжди закріплює колір на поверхні емалі медальйона. Метод відточували десятиліттями, щоб кожен портрет залишався чітким, стабільним і максимально близьким до оригіналу.",
              })}
            </p>

            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              {pick(lang, {
                en: "The result is a memorial portrait engineered to endure outdoor conditions and everyday weather. We stand behind every piece with a lifetime warranty, so families and dealers can order with confidence.",
                ru: "В результате получается мемориальный портрет, рассчитанный на улицу и любую погоду. Мы подтверждаем качество каждой работы пожизненной гарантией, чтобы семьи и дилеры заказывали уверенно.",
                uk: "У результаті виходить меморіальний портрет, розрахований на вулицю та будь-яку погоду. Ми підтверджуємо якість кожної роботи довічною гарантією, щоб родини та дилери замовляли впевнено.",
              })}
            </p>
          </div>

          {/* Image Placeholder 2 */}
          <div className="relative h-72 w-full overflow-hidden rounded-xl bg-neutral-100 shadow-md md:h-full">
            <img
              src="/images/about-placeholder-2.jpg"
              alt={pick(lang, {
                en: "Craftsmanship placeholder",
                ru: "Место для фото процесса",
                uk: "Місце для фото процесу",
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
              ru: "Память, к которой мы относимся как к своей",
              uk: "Памʼять, до якої ми ставимося як до своєї",
            })}
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-700 md:text-base">
            {pick(lang, {
              en: "As a family owned studio, we know every photograph carries a story that cannot be replaced. Each memorial is handled with the same care we would give to our own loved ones. This is not production work. It is personal work, approached with respect, patience, and attention to detail.",
              ru: "Как семейная мастерская, мы понимаем, что каждая фотография несет историю, которую невозможно заменить. Мы относимся к каждому заказу так же бережно, как к памяти о собственных близких. Это не конвейер. Это личная работа, выполненная с уважением, терпением и вниманием к деталям.",
              uk: "Як сімейна майстерня, ми розуміємо, що кожна фотографія несе історію, яку неможливо замінити. Ми ставимося до кожного замовлення так само дбайливо, як до памʼяті про власних близьких. Це не конвеєр. Це особиста робота, виконана з повагою, терпінням і увагою до деталей.",
            })}
          </p>

          {/* Image Placeholder 3 */}
          <div className="mt-10 h-64 w-full max-w-3xl overflow-hidden rounded-xl bg-neutral-100 shadow-md md:h-80">
            <img
              src="/images/about-placeholder-3.jpg"
              alt={pick(lang, {
                en: "Family placeholder",
                ru: "Место для семейного фото",
                uk: "Місце для сімейного фото",
              })}
              className="h-full w-full object-cover opacity-80"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
