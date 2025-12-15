"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage, LangCode } from "../components/LanguageProvider";

function tFor(
  lang: LangCode,
  values: { en: string; ru: string; uk: string },
): string {
  return values[lang];
}

export default function HomePage() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/field-hero.jpg"
            alt={tFor(lang, {
              en: "Night sky over a quiet landscape",
              ru: "Ночное небо над тихим пейзажем",
              uk: "Нічне небо над тихим краєвидом",
            })}
            fill
            priority
            className="hero-bg-image object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center md:px-6 md:py-28">
          <h1 className="max-w-3xl font-serif text-3xl font-semibold leading-tight md:text-5xl">
            {tFor(lang, {
              en: "Elegant enamel photo cameos that honor a life forever",
              ru: "Элегантные эмалевые фото-камеи в память на всю жизнь",
              uk: "Вишукані емалеві фотокамеї на спомин на все життя",
            })}
          </h1>
          <p className="mt-5 max-w-2xl text-sm text-neutral-100 md:text-base">
            {tFor(lang, {
              en: "Custom kiln fired enamel photo medallions created for outdoor monuments and private homes. Each piece is built to stay clear and bright in every season.",
              ru: "Индивидуальные обожжённые в печи эмалевые фотомедальоны для уличных памятников и домашних мемориалов. Каждое изделие сохраняет ясность и яркость в любую погоду.",
              uk: "Індивідуальні емалеві фотомедальйони, випалені в печі, для надгробків та домашніх меморіалів. Кожен виріб зберігає чіткість і яскравість у будь-яку пору року.",
            })}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/order-form"
              className="rounded-full bg-amber-500 px-10 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-lg shadow-amber-500/40 transition hover:bg-amber-400 hover:shadow-amber-400/50"
            >
              {tFor(lang, {
                en: "Order a cameo",
                ru: "Заказать камею",
                uk: "Замовити камею",
              })}
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-white/60 bg-white/5 px-8 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm hover:border-amber-300 hover:text-amber-200"
            >
              {tFor(lang, {
                en: "View medallion pricing",
                ru: "Посмотреть цены на медальоны",
                uk: "Переглянути ціни на медальйони",
              })}
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="bg-neutral-50 py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:px-6 md:items-center">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-neutral-900 md:text-3xl">
              {tFor(lang, {
                en: "Custom enamel memorial cameos for headstones, mausoleums, and home memorials",
                ru: "Индивидуальные эмалевые мемориальные камеи для памятников, склепов и домашних мемориалов",
                uk: "Індивідуальні емалеві меморіальні камеї для надгробків, мавзолеїв та домашніх меморіалів",
              })}
            </h2>
            <p className="mt-4 text-sm text-neutral-700 md:text-base">
              {tFor(lang, {
                en: "Every medallion begins with your photograph and is created on site in our family studio in New Jersey. We work directly with monument dealers and with families who are updating existing stones.",
                ru: "Каждый медальон начинается с вашей фотографии и изготавливается на месте в нашей семейной мастерской в Нью-Джерси. Мы работаем как с памятниковыми фирмами, так и с семьями, обновляющими уже установленные памятники.",
                uk: "Кожен медальйон починається з вашої фотографії та виготовляється в нашій сімейній майстерні в Нью-Джерсі. Ми працюємо і з виробниками пам’ятників, і безпосередньо з родинами, які оновлюють існуючі пам’ятники.",
              })}
            </p>
            <p className="mt-3 text-sm text-neutral-700 md:text-base">
              {tFor(lang, {
                en: "Our proprietary firing chemistry bonds the image to high quality enamel on a bronze or brass base, creating a surface designed to last for generations.",
                ru: "Собственная технология обжига связывает изображение с высококачественной эмалью на бронзовой или латунной основе, создавая поверхность, рассчитанную на многие поколения.",
                uk: "Власна технологія випалу з’єднує зображення з високоякісною емаллю на бронзовій або латунній основі, утворюючи поверхню, розраховану на багато поколінь.",
              })}
            </p>
          </div>

          <div className="relative h-64 w-full overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.2)]">
            <Image
              src="/images/cameo-on-headstone.jpg"
              alt={tFor(lang, {
                en: "Example enamel photo cameo on granite headstone",
                ru: "Пример эмалевой фото-камеи на гранитном памятнике",
                uk: "Приклад емалевої фотокамеї на гранітному пам’ятнику",
              })}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* THREE IMAGE LINKS */}
      <section className="relative bg-gradient-to-b from-neutral-100 via-neutral-50 to-neutral-100 py-12 md:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-amber-100/25 via-transparent to-transparent" />
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                label: tFor(lang, {
                  en: "About us",
                  ru: "О нас",
                  uk: "Про нас",
                }),
                href: "/about",
                image: "/images/about-studio.jpg",
              },
              {
                label: tFor(lang, {
                  en: "Why our cameos",
                  ru: "Почему наши камеи",
                  uk: "Чому наші камеї",
                }),
                href: "/why-our-cameos",
                image: "/images/why-cameos-closeup.jpg",
              },
              {
                label: tFor(lang, {
                  en: "Contact us",
                  ru: "Связаться с нами",
                  uk: "Звʼязатися з нами",
                }),
                href: "/contact",
                image: "/images/contact-headstone-flowers.jpg",
              },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative block aspect-square overflow-hidden rounded-md shadow-md shadow-neutral-300/40"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/10 transition group-hover:from-black/60 group-hover:via-black/35" />
                <div className="absolute inset-0 flex items-end justify-center pb-6">
                  <span className="rounded-full border border-white/80 bg-black/35 px-6 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-md">
                    {item.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="relative py-12 md:py-16">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Image
            src="/images/granite-texture.jpg"
            alt={tFor(lang, {
              en: "Granite stone texture",
              ru: "Фактура гранитного камня",
              uk: "Текстура гранітного каменю",
            })}
            fill
            className="stone-bg-pan"
          />
          <div className="absolute inset-0 bg-white/80" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:px-6 md:items-center">
          <div className="rounded-2xl bg-white/95 px-6 py-7 shadow-[0_16px_32px_rgba(15,23,42,0.18)] backdrop-blur-sm md:px-8 md:py-8">
            <h2 className="font-serif text-2xl font-semibold text-neutral-900 md:text-3xl">
              {tFor(lang, {
                en: "How your custom enamel cameo is created",
                ru: "Как создаётся ваша индивидуальная эмалевая камея",
                uk: "Як створюється ваша індивідуальна емалева камея",
              })}
            </h2>
            <p className="mt-4 text-sm text-neutral-600 md:text-base">
              {tFor(lang, {
                en: "We guide you from the first photo you send to a finished medallion that arrives ready for installation.",
                ru: "Мы сопровождаем вас от первой присланной фотографии до готового медальона, который приходит полностью подготовленным к установке.",
                uk: "Ми супроводжуємо вас від першої надісланої фотографії до готового медальйона, який надходить повністю підготовленим до встановлення.",
              })}
            </p>
            <ol className="mt-5 space-y-4 text-sm text-neutral-700 md:text-base">
              <li>
                <span className="font-semibold text-amber-600">
                  {tFor(lang, {
                    en: "1. Upload a photo",
                    ru: "1. Завантажте фотографию",
                    uk: "1. Завантажте фотографію",
                  })}
                </span>
                <br />
                {tFor(lang, {
                  en: "Share a digital file or a scan of a printed photo. We can work with older or slightly damaged images.",
                  ru: "Отправьте цифровой файл или скан напечатанной фотографии. Мы можем работать со старыми или немного повреждёнными снимками.",
                  uk: "Надішліть цифровий файл або скан надрукованої фотографії. Ми можемо працювати зі старими чи трохи пошкодженими знімками.",
                })}
              </li>
              <li>
                <span className="font-semibold text-amber-600">
                  {tFor(lang, {
                    en: "2. Choose shape and size",
                    ru: "2. Выберите форму и размер",
                    uk: "2. Оберіть форму та розмір",
                  })}
                </span>
                <br />
                {tFor(lang, {
                  en: "Select oval, rectangular, heart, or round formats that match your monument and cemetery guidelines.",
                  ru: "Выберите овальную, прямоугольную, сердцевидную или круглую форму, подходящую к памятнику и требованиям кладбища.",
                  uk: "Оберіть овальну, прямокутну, серцеподібну чи круглу форму, що відповідає пам’ятнику та вимогам цвинтаря.",
                })}
              </li>
              <li>
                <span className="font-semibold text-amber-600">
                  {tFor(lang, {
                    en: "3. We craft your enamel cameo",
                    ru: "3. Мы изготавливаем вашу эмалевую камею",
                    uk: "3. Ми виготовляємо вашу емалеву камею",
                  })}
                </span>
                <br />
                {tFor(lang, {
                  en: "The image is retouched, balanced, and fired multiple times to fuse the pigments into the enamel surface.",
                  ru: "Изображение ретушируется, выравнивается по цвету и несколько раз обжигается, чтобы пигменты прочно зафиксировались в слое эмали.",
                  uk: "Зображення ретушується, коригується за кольором і кілька разів випалюється, щоб пігменти надійно закріпилися в шарі емалі.",
                })}
              </li>
              <li>
                <span className="font-semibold text-amber-600">
                  {tFor(lang, {
                    en: "4. We ship ready for installation",
                    ru: "4. Мы отправляем готовое изделие для установки",
                    uk: "4. Ми надсилаємо готовий виріб для встановлення",
                  })}
                </span>
                <br />
                {tFor(lang, {
                  en: "Each cameo is inspected by hand and shipped with clear mounting guidance for you or your monument dealer.",
                  ru: "Каждая камея проходит ручной контроль и отправляется с подробными рекомендациями по установке для вас или вашего установщика памятника.",
                  uk: "Кожна камея проходить ручний контроль і надсилається з докладними рекомендаціями щодо встановлення для вас або вашого майстра з пам’ятників.",
                })}
              </li>
            </ol>
            <Link
              href="/pricing"
              className="mt-5 inline-flex items-center rounded-full border border-neutral-300 bg-white/80 px-6 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-900 transition hover:border-amber-500 hover:text-amber-600"
            >
              {tFor(lang, {
                en: "View pricing and sizes",
                ru: "Посмотреть размеры и цены",
                uk: "Переглянути розміри та ціни",
              })}
            </Link>
          </div>

          <div className="relative mx-auto h-80 w-full max-w-md overflow-hidden rounded-3xl border border-white/80 bg-white/50 shadow-[0_18px_40px_rgba(15,23,42,0.25)] backdrop-blur-sm">
            <Image
              src="/images/field-soft-repeat.jpg"
              alt={tFor(lang, {
                en: "Soft landscape behind enamel cameo display",
                ru: "Мягкий пейзаж за стендом с эмалевыми камеями",
                uk: "Мʼякий краєвид за стендом з емалевими камеями",
              })}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/field-sunset-wide.jpg"
            alt={tFor(lang, {
              en: "Field at sunset",
              ru: "Поле на закате",
              uk: "Поле на заході сонця",
            })}
            fill
            className="cta-bg-image"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-16 text-center text-white md:px-6 md:py-20">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            {tFor(lang, {
              en: "Ready to order a cameo or request more information",
              ru: "Готовы заказать камею или узнать больше",
              uk: "Готові замовити камею або дізнатися більше",
            })}
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-neutral-100 md:text-base">
            {tFor(lang, {
              en: "Share your photo, stone details, and any questions. We reply personally with options, pricing, and a clear next step.",
              ru: "Пришлите фотографию, информацию о памятнике и ваши вопросы. Мы лично ответим, предложим варианты, ориентировочную цену и чёткие следующие шаги.",
              uk: "Надішліть фотографію, інформацію про пам’ятник та ваші запитання. Ми особисто відповімо, запропонуємо варіанти, орієнтовну ціну та зрозумілі подальші кроки.",
            })}
          </p>
          <Link
            href="/contact"
            className="mt-8 rounded-full bg-amber-500 px-10 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-lg shadow-amber-500/40 transition hover:bg-amber-400 hover:shadow-amber-400/50"
          >
            {tFor(lang, {
              en: "Contact us",
              ru: "Связаться с нами",
              uk: "Звʼязатися з нами",
            })}
          </Link>
        </div>
      </section>
    </main>
  );
}
