"use client";

import Link from "next/link";
import { useLanguage } from "../../components/LanguageProvider";

export default function WhyOurCameosPage() {
  const { t } = useLanguage();

  const points = [
    {
      title: t({ en: "Outdoor permanence", ru: "Для улицы", uk: "Для вулиці" }),
      body: t({
        en: "Designed for headstones and monuments. Built to remain clear and bright through seasons.",
        ru: "Для надгробий и памятников. Яркость и четкость сохраняются по сезонам.",
        uk: "Для надгробків і пам’ятників. Яскравість і чіткість зберігаються по сезонах.",
      }),
    },
    {
      title: t({ en: "Multi-coat enamel", ru: "Многослойная эмаль", uk: "Багатошарова емаль" }),
      body: t({
        en: "High-quality enamel applied in multiple coats for depth and durability.",
        ru: "Высококачественная эмаль наносится в несколько слоев для глубины и стойкости.",
        uk: "Високоякісна емаль наноситься у кілька шарів для глибини та стійкості.",
      }),
    },
    {
      title: t({ en: "Proprietary image process", ru: "Фирменный процесс", uk: "Фірмовий процес" }),
      body: t({
        en: "Our polymer formulation and process supports faithful detail and long-term performance.",
        ru: "Наша полимерная формула и процесс обеспечивают детализацию и долгий срок службы.",
        uk: "Наша полімерна формула та процес забезпечують деталізацію і довгий строк служби.",
      }),
    },
    {
      title: t({ en: "Lifetime warranty", ru: "Пожизненная гарантия", uk: "Довічна гарантія" }),
      body: t({
        en: "If manufacturing quality is the issue, we will make it right.",
        ru: "Если проблема в качестве изготовления, мы исправим.",
        uk: "Якщо проблема у якості виготовлення, ми виправимо.",
      }),
    },
  ];

  return (
    <main className="bg-neutral-50 pb-16 pt-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-3xl font-semibold text-neutral-900 md:text-4xl">
            {t({ en: "Why Our Cameos", ru: "Почему наши камеи", uk: "Чому наші камеї" })}
          </h1>
          <p className="mt-4 text-sm text-neutral-600 md:text-base">
            {t({
              en: "A clear, durable memorial image is not an accident. It is the result of materials, experience, and careful process control.",
              ru: "Четкое и долговечное изображение для памяти не бывает случайным. Это результат материалов, опыта и точного контроля процесса.",
              uk: "Чітке й довговічне зображення для пам’яті не є випадковістю. Це результат матеріалів, досвіду та точного контролю процесу.",
            })}
          </p>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {points.map((p) => (
            <div key={p.title} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-lg font-semibold text-neutral-900">{p.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{p.body}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="aspect-[4/3] bg-neutral-200/70 flex items-center justify-center text-neutral-500 text-sm">
              {t({ en: "Placeholder image: Close-up cameo", ru: "Заглушка: Крупный план", uk: "Заглушка: Крупний план" })}
            </div>
            <div className="p-6 md:p-8">
              <h2 className="font-serif text-2xl font-semibold text-neutral-900">
                {t({ en: "Have a custom request?", ru: "Нужен нестандартный размер?", uk: "Потрібен нестандартний розмір?" })}
              </h2>
              <p className="mt-3 text-sm text-neutral-600">
                {t({
                  en: "If you need a size or shape not shown on the site, contact us. We can often accommodate custom dimensions.",
                  ru: "Если нужен размер или форма, которых нет на сайте, напишите нам. Часто можем сделать под заказ.",
                  uk: "Якщо потрібен розмір або форма, яких немає на сайті, напишіть нам. Часто можемо зробити під замовлення.",
                })}
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-amber-500 px-8 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-md hover:bg-amber-400"
              >
                {t({ en: "Contact us", ru: "Связаться", uk: "Зв’язатися" })}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
