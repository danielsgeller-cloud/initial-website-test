"use client";

import { useLanguage } from "../../components/LanguageProvider";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="bg-neutral-50 pb-16 pt-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-3xl font-semibold text-neutral-900 md:text-4xl">
            {t({ en: "About", ru: "О нас", uk: "Про нас" })}
          </h1>
          <p className="mt-4 text-sm text-neutral-600 md:text-base">
            {t({
              en: "Family-owned enamel memorial medallions made in the United States since the early 1990s.",
              ru: "Семейное производство эмалевых мемориальных медальонов в США с начала 1990-х годов.",
              uk: "Сімейне виробництво емальованих меморіальних медальйонів у США з початку 1990-х років.",
            })}
          </p>
        </header>

        <section className="mt-10 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="aspect-[4/3] w-full bg-neutral-200/70 flex items-center justify-center text-neutral-500 text-sm">
              {t({
                en: "Placeholder image: Studio / family photo",
                ru: "Заглушка: Фото мастерской / семьи",
                uk: "Заглушка: Фото майстерні / родини",
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm shadow-neutral-200 md:p-8">
            <h2 className="font-serif text-2xl font-semibold text-neutral-900">
              {t({
                en: "A craft carried across generations",
                ru: "Мастерство, переданное через поколения",
                uk: "Майстерність, що передається поколіннями",
              })}
            </h2>
            <p className="mt-4 text-sm text-neutral-700 md:text-base">
              {t({
                en: "The owner began learning the medallion-making technique in Ukraine over 40 years ago. After coming to America, he restarted the work here and built a family business that has served monument dealers and families nationwide ever since.",
                ru: "Владелец начал изучать технику изготовления медальонов в Украине более 40 лет назад. После переезда в США он возобновил работу здесь и создал семейное дело, которое с тех пор обслуживает как мастерские памятников, так и семьи по всей стране.",
                uk: "Власник почав вивчати техніку виготовлення медальйонів в Україні понад 40 років тому. Після переїзду до США він відновив роботу тут і створив сімейний бізнес, який відтоді обслуговує як майстерні пам’ятників, так і родини по всій країні.",
              })}
            </p>

            <p className="mt-4 text-sm text-neutral-700 md:text-base">
              {t({
                en: "Our medallions are built for outdoor permanence. The image is fired onto high-quality enamel applied in multiple coats, and the picture is produced using our proprietary polymer formulation and process to achieve clarity, depth, and long-term durability.",
                ru: "Наши медальоны рассчитаны на долговечность на улице. Изображение обжигается на высококачественной эмали, нанесенной в несколько слоев, а картинка создается с использованием нашей фирменной полимерной формулы и процесса для четкости, глубины и стойкости на годы.",
                uk: "Наші медальйони створені для довговічності на вулиці. Зображення випалюється на високоякісній емалі, нанесеній у кілька шарів, а картинка створюється за допомогою нашої фірмової полімерної формули та процесу для чіткості, глибини та стійкості на роки.",
              })}
            </p>

            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-900">
                {t({
                  en: "Lifetime warranty",
                  ru: "Пожизненная гарантия",
                  uk: "Довічна гарантія",
                })}
              </p>
              <p className="mt-1 text-sm text-amber-900/80">
                {t({
                  en: "We stand behind our craftsmanship. If there is an issue with manufacturing quality, we will make it right.",
                  ru: "Мы отвечаем за качество. Если возникнет проблема с качеством изготовления, мы исправим ее.",
                  uk: "Ми відповідаємо за якість. Якщо виникне проблема з якістю виготовлення, ми все виправимо.",
                })}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            {
              title: t({
                en: "For monuments and more",
                ru: "Для памятников и не только",
                uk: "Для пам’ятників і не тільки",
              }),
              body: t({
                en: "Headstones, mausoleums, plaques, and indoor memorial displays.",
                ru: "Надгробия, мавзолеи, таблички и домашние мемориалы.",
                uk: "Надгробки, мавзолеї, таблички та домашні меморіали.",
              }),
            },
            {
              title: t({
                en: "Dealers and families",
                ru: "Для дилеров и семей",
                uk: "Для дилерів і родин",
              }),
              body: t({
                en: "We work with monument dealers and also directly with individuals.",
                ru: "Мы работаем с мастерскими памятников и напрямую с семьями.",
                uk: "Ми працюємо з майстернями пам’ятників і напряму з родинами.",
              }),
            },
            {
              title: t({
                en: "Made with care",
                ru: "С заботой",
                uk: "З турботою",
              }),
              body: t({
                en: "We treat each memorial as if it were for our own family.",
                ru: "Мы относимся к каждому заказу как к памяти нашей семьи.",
                uk: "Ми ставимося до кожного замовлення як до пам’яті нашої родини.",
              }),
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-serif text-lg font-semibold text-neutral-900">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600">{c.body}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
