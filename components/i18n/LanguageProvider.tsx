"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "ru" | "uk";

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  forLang: (valueByLang: Partial<Record<Lang, string>> & { en: string }) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "pic_lang";

const DICT: Record<string, Partial<Record<Lang, string>>> = {
  topbar_service: {
    en: "Service available in English, Ukrainian, and Russian",
    ru: "Обслуживание на английском, украинском и русском языках",
    uk: "Обслуговування англійською, українською та російською мовами",
  },
  phone_display: { en: "(732) 297-6008", ru: "(732) 297-6008", uk: "(732) 297-6008" },
  email_display: { en: "info@picturesinceramic.com", ru: "info@picturesinceramic.com", uk: "info@picturesinceramic.com" },
  brand_tagline: { en: "Enamel memorial medallions", ru: "Эмалевые мемориальные медальоны", uk: "Емальовані меморіальні медальйони" },
  nav_order: { en: "Order Form", ru: "Форма заказа", uk: "Форма замовлення" },
  // Header / top bar
  top_language_label: { en: "Language", ru: "Язык", uk: "Мова" },
  top_service_line: {
    en: "Service available in English, Ukrainian, and Russian",
    ru: "Обслуживание на английском, украинском и русском языках",
    uk: "Обслуговування англійською, українською та російською мовами",
  },
  nav_home: { en: "Home", ru: "Главная", uk: "Головна" },
  nav_about: { en: "About", ru: "О нас", uk: "Про нас" },
  nav_why: { en: "Payment", ru: "Оплата", uk: "Оплата" },
  nav_pricing: { en: "Medallion Pricing", ru: "Цены на медальоны", uk: "Ціни на медальйони" },
  nav_contact: { en: "Contact", ru: "Контакт", uk: "Контакт" },
  nav_order_form: { en: "Order Form", ru: "Форма заказа", uk: "Форма замовлення" },
  nav_cta: { en: "Order a cameo", ru: "Заказать камею", uk: "Замовити камею" },

  // Home page keys used by app/page.tsx
  home_hero_image_alt: {
    en: "Soft focus field with warm light",
    ru: "Поле в мягком фокусе при тёплом свете",
    uk: "Поле з м’яким фокусом і теплим світлом",
  },
  home_hero_title: {
    en: "Elegant enamel photo cameos that honor a life forever",
    ru: "Элегантные эмалевые фотокамеи, которые сохраняют память навсегда",
    uk: "Елегантні емальовані фотокамеї, що вшановують пам’ять назавжди",
  },
  home_hero_subtitle: {
    en: "Custom kiln fired enamel photo medallions created for outdoor monuments and private homes. Each piece is built to stay clear and bright in every season.",
    ru: "Индивидуальные эмалевые фотомедальоны, обожжённые в печи, для наружных памятников и домашних мемориалов. Каждое изделие сохраняет чёткость и яркость в любое время года.",
    uk: "Індивідуальні емальовані фотомедальйони, випалені в печі, для зовнішніх пам’ятників і домашніх меморіалів. Кожен виріб зберігає чіткість і яскравість у будь-яку пору року.",
  },
  home_intro_bg_alt: {
    en: "Soft field texture",
    ru: "Мягкая текстура поля",
    uk: "М’яка текстура поля",
  },
  home_intro_title: {
    en: "Custom enamel photo memorial cameos for headstones and mausoleums",
    ru: "Индивидуальные эмалевые фото-камеи для надгробий и мавзолеев",
    uk: "Індивідуальні емальовані фотокамеї для надгробків і мавзолеїв",
  },
  home_intro_body: {
    en: "We transform your favorite photograph into a kiln fired enamel portrait on a metal medallion for outdoor monuments and home memorials. We work with monument dealers and individual families, and every order receives careful retouching and inspection.",
    ru: "Мы превращаем вашу любимую фотографию в эмалевый портрет, обожжённый в печи, на металлическом медальоне для памятников и домашних мемориалов. Мы работаем и с мастерскими, и с семьями, а каждый заказ проходит ретушь и контроль качества.",
    uk: "Ми перетворюємо вашу улюблену фотографію на емальований портрет, випалений у печі, на металевому медальйоні для пам’ятників і домашніх меморіалів. Ми працюємо з майстернями та з родинами, а кожне замовлення проходить ретуш і контроль якості.",
  },
  home_tile_about: { en: "About us", ru: "О нас", uk: "Про нас" },
  home_tile_why: { en: "Payment", ru: "Оплата", uk: "Оплата" },
  home_tile_contact: { en: "Contact us", ru: "Связаться", uk: "Контакт" },
  home_tile_about_alt: {
    en: "About our studio",
    ru: "О нашей мастерской",
    uk: "Про нашу майстерню",
  },
  home_tile_why_alt: {
    en: "Closeup of an enamel cameo",
    ru: "Крупный план эмалевой камеи",
    uk: "Крупний план емальованої камеї",
  },
  home_tile_contact_alt: {
    en: "Headstone flowers at a memorial",
    ru: "Цветы у памятника",
    uk: "Квіти біля пам’ятника",
  },
  home_cta_bg_alt: {
    en: "Field at sunset with soft light",
    ru: "Поле на закате при мягком свете",
    uk: "Поле на заході сонця з м’яким світлом",
  },
  home_cta_title: {
    en: "Ready to order a cameo or request more information",
    ru: "Готовы заказать камею или задать вопрос",
    uk: "Готові замовити камею або поставити запитання",
  },
  home_cta_body: {
    en: "Share your photo, stone details, and any questions. We reply personally with options, pricing, and a clear next step.",
    ru: "Отправьте фото, информацию о памятнике и вопросы. Мы ответим лично с вариантами, ценами и следующим шагом.",
    uk: "Надішліть фото, деталі пам’ятника та запитання. Ми відповімо особисто з варіантами, цінами та наступним кроком.",
  },

  // Generic CTA label used across pages
  cta_order: { en: "Order a cameo", ru: "Заказать камею", uk: "Замовити камею" },
};

function safeT(key: string, lang: Lang): string {
  const entry = DICT[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en ?? key;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "en" || saved === "ru" || saved === "uk") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  };

  const value = useMemo<LanguageContextValue>(() => {
    return {
      lang,
      setLang,
      t: (key: string) => safeT(key, lang),
      forLang: (valueByLang) => valueByLang[lang] ?? valueByLang.en,
    };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      lang: "en",
      setLang: () => {},
      t: (key: string) => key,
      forLang: (valueByLang) => valueByLang.en,
    };
  }
  return ctx;
}
