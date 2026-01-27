"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "es" | "ru" | "uk";

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
    en: "Service available in English and Spanish",
    es: "Servicio disponible en inglés y español",
    ru: "Сервис доступен на английском и испанском языках",
    uk: "Сервіс доступний англійською та іспанською мовами",
  },
  phone_display: { en: "(732) 297-6008", es: "(732) 297-6008", ru: "(732) 297-6008", uk: "(732) 297-6008" },
  email_display: { en: "info@picturesinceramic.com", es: "info@picturesinceramic.com", ru: "info@picturesinceramic.com", uk: "info@picturesinceramic.com" },
  brand_tagline: { en: "Enamel memorial medallions", es: "Medallones conmemorativos de esmalte", ru: "Эмалевые мемориальные медальоны", uk: "Емалеві меморіальні медальйони" },
  nav_order: { en: "Order Form", es: "Formulario de Pedido", ru: "Форма заказа", uk: "Форма замовлення" },
  // Header / top bar
  top_language_label: { en: "Language", es: "Idioma", ru: "Язык", uk: "Мова" },
  top_service_line: {
    en: "Service available in English and Spanish",
    es: "Servicio disponible en inglés y español",
    ru: "Сервис доступен на английском и испанском языках",
    uk: "Сервіс доступний англійською та іспанською мовами",
  },
  nav_home: { en: "Home", es: "Inicio", ru: "Главная", uk: "Головна" },
  nav_about: { en: "About", es: "Nosotros", ru: "О нас", uk: "Про нас" },
  nav_faq: { en: "FAQ", es: "Preguntas", ru: "Вопросы", uk: "Питання" },
  nav_why: { en: "Payment", es: "Pago", ru: "Оплата", uk: "Оплата" },
  nav_pricing: { en: "Medallion Pricing", es: "Precios de Medallones", ru: "Цены на медальоны", uk: "Ціни на медальйони" },
  nav_contact: { en: "Contact", es: "Contacto", ru: "Контакты", uk: "Контакти" },
  nav_order_form: { en: "Order Form", es: "Formulario de Pedido", ru: "Форма заказа", uk: "Форма замовлення" },
  nav_cta: { en: "Order a cameo", es: "Ordenar un camafeo", ru: "Заказать камею", uk: "Замовити камею" },
  nav_account: { en: "Account", es: "Cuenta", ru: "Аккаунт", uk: "Акаунт" },
  nav_signout: { en: "Sign out", es: "Cerrar sesión", ru: "Выйти", uk: "Вийти" },

  // Home page keys used by app/page.tsx
  home_hero_image_alt: {
    en: "Soft focus field with warm light",
    es: "Campo de enfoque suave con luz cálida",
    ru: "Поле с мягким фокусом и теплым светом",
    uk: "Поле з м'яким фокусом і теплим світлом",
  },
  home_hero_title: {
    en: "Elegant enamel photo cameos that honor a life forever",
    es: "Elegantes camafeos fotográficos de esmalte que honran una vida para siempre",
    ru: "Элегантные эмалевые фото-камеи, которые навсегда почитают жизнь",
    uk: "Елегантні емалеві фото-камеї, що шанують життя назавжди",
  },
  home_hero_subtitle: {
    en: "Custom kiln fired enamel photo medallions created for outdoor monuments and private homes. Each piece is built to stay clear and bright in every season.",
    es: "Medallones fotográficos de esmalte horneado personalizados para monumentos al aire libre y hogares privados. Cada pieza está diseñada para mantenerse clara y brillante en todas las estaciones.",
    ru: "Индивидуальные эмалевые фото-медальоны для уличных памятников и частных домов. Каждое изделие создано, чтобы оставаться ясным и ярким в любое время года.",
    uk: "Індивідуальні емалеві фото-медальйони для вуличних пам'ятників та приватних будинків. Кожен виріб створено, щоб залишатися чітким і яскравим у будь-яку пору року.",
  },
  home_intro_bg_alt: {
    en: "Soft field texture",
    es: "Textura suave de campo",
    ru: "Мягкая текстура поля",
    uk: "М'яка текстура поля",
  },
  home_intro_title: {
    en: "Custom enamel photo memorial cameos for headstones and mausoleums",
    es: "Camafeos fotográficos conmemorativos de esmalte personalizados para lápidas y mausoleos",
    ru: "Индивидуальные эмалевые мемориальные фото-камеи для надгробий и мавзолеев",
    uk: "Індивідуальні емалеві меморіальні фото-камеї для надгробків та мавзолеїв",
  },
  home_intro_body: {
    en: "We transform your favorite photograph into a kiln fired enamel portrait on a metal medallion for outdoor monuments and home memorials. We work with monument dealers and individual families, and every order receives careful retouching and inspection.",
    es: "Transformamos su fotografía favorita en un retrato de esmalte horneado sobre un medallón de metal para monumentos al aire libre y memoriales en el hogar. Trabajamos con distribuidores de monumentos y familias individuales, y cada pedido recibe un cuidadoso retoque e inspección.",
    ru: "Мы превращаем вашу любимую фотографию в обожженный эмалевый портрет на металлическом медальоне для уличных памятников и домашних мемориалов. Мы работаем с дилерами памятников и отдельными семьями, и каждый заказ получает тщательную ретушь и проверку.",
    uk: "Ми перетворюємо вашу улюблену фотографію на обпалений емалевий портрет на металевому медальйоні для вуличних пам'ятників та домашніх меморіалів. Ми працюємо з дилерами пам'ятників та окремими сім'ями, і кожне замовлення отримує ретельну ретуш та перевірку.",
  },
  home_tile_about: { en: "About us", es: "Nosotros", ru: "О нас", uk: "Про нас" },
  home_tile_why: { en: "Payment", es: "Pago", ru: "Оплата", uk: "Оплата" },
  home_tile_contact: { en: "Contact us", es: "Contáctanos", ru: "Свяжитесь с нами", uk: "Зв'яжіться з нами" },
  home_tile_about_alt: {
    en: "About our studio",
    es: "Sobre nuestro estudio",
    ru: "О нашей студии",
    uk: "Про нашу студію",
  },
  home_tile_why_alt: {
    en: "Closeup of an enamel cameo",
    es: "Primer plano de un camafeo de esmalte",
    ru: "Крупный план эмалевой камеи",
    uk: "Крупний план емалевої камеї",
  },
  home_tile_contact_alt: {
    en: "Headstone flowers at a memorial",
    es: "Flores en lápida en un memorial",
    ru: "Цветы на надгробии в мемориале",
    uk: "Квіти на надгробку в меморіалі",
  },
  home_cta_bg_alt: {
    en: "Field at sunset with soft light",
    es: "Campo al atardecer con luz suave",
    ru: "Поле на закате с мягким светом",
    uk: "Поле на заході з м'яким світлом",
  },
  home_cta_title: {
    en: "Ready to order a cameo or request more information",
    es: "¿Listo para ordenar un camafeo o solicitar más información?",
    ru: "Готовы заказать камею или запросить дополнительную информацию",
    uk: "Готові замовити камею або запитати додаткову інформацію",
  },
  home_cta_body: {
    en: "Share your photo, stone details, and any questions. We reply personally with options, pricing, and a clear next step.",
    es: "Comparta su foto, detalles de la lápida y cualquier pregunta. Responderemos personalmente con opciones, precios y el siguiente paso claro.",
    ru: "Поделитесь своей фотографией, деталями камня и любыми вопросами. Мы ответим лично с вариантами, ценами и четким следующим шагом.",
    uk: "Поділіться своєю фотографією, деталями каменю та будь-якими питаннями. Ми відповімо особисто з варіантами, цінами та чітким наступним кроком.",
  },

  // Generic CTA label used across pages
  cta_order: { en: "Order a cameo", es: "Ordenar un camafeo", ru: "Заказать камею", uk: "Замовити камею" },
  cart_label: { en: "Cart", es: "Carrito", ru: "Корзина", uk: "Кошик" },
  search_label: { en: "Search", es: "Buscar", ru: "Поиск", uk: "Пошук" },

  // Account pages
  account_title: { en: "My Account", es: "Mi Cuenta", ru: "Мой аккаунт", uk: "Мій акаунт" },
  account_profile: { en: "Profile Information", es: "Información del Perfil", ru: "Информация профиля", uk: "Інформація профілю" },
  account_email: { en: "Email", es: "Correo Electrónico", ru: "Электронная почта", uk: "Електронна пошта" },
  account_name: { en: "Name", es: "Nombre", ru: "Имя", uk: "Ім'я" },
  account_edit_profile: { en: "Edit Profile", es: "Editar Perfil", ru: "Редактировать профиль", uk: "Редагувати профіль" },
  account_orders: { en: "Order History", es: "Historial de Pedidos", ru: "История заказов", uk: "Історія замовлень" },
  account_orders_desc: { en: "View all your past orders and reorder easily", es: "Ver todos sus pedidos anteriores y volver a ordenar fácilmente", ru: "Просмотрите все прошлые заказы и легко заказывайте снова", uk: "Переглядайте всі минулі замовлення та легко замовляйте знову" },
  account_view_orders: { en: "View Orders", es: "Ver Pedidos", ru: "Просмотр заказов", uk: "Переглянути замовлення" },
  account_quick_actions: { en: "Quick Actions", es: "Acciones Rápidas", ru: "Быстрые действия", uk: "Швидкі дії" },
  account_new_order: { en: "New Order", es: "Nuevo Pedido", ru: "Новый заказ", uk: "Нове замовлення" },
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
      if (saved === "en" || saved === "es" || saved === "ru" || saved === "uk") setLangState(saved);
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
