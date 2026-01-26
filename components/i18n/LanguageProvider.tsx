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
  },
  phone_display: { en: "(732) 297-6008", es: "(732) 297-6008" },
  email_display: { en: "info@picturesinceramic.com", es: "info@picturesinceramic.com" },
  brand_tagline: { en: "Enamel memorial medallions", es: "Medallones conmemorativos de esmalte" },
  nav_order: { en: "Order Form", es: "Formulario de Pedido" },
  // Header / top bar
  top_language_label: { en: "Language", es: "Idioma" },
  top_service_line: {
    en: "Service available in English and Spanish",
    es: "Servicio disponible en inglés y español",
  },
  nav_home: { en: "Home", es: "Inicio" },
  nav_about: { en: "About", es: "Nosotros" },
  nav_faq: { en: "FAQ", es: "Preguntas" },
  nav_why: { en: "Payment", es: "Pago" },
  nav_pricing: { en: "Medallion Pricing", es: "Precios de Medallones" },
  nav_contact: { en: "Contact", es: "Contacto" },
  nav_order_form: { en: "Order Form", es: "Formulario de Pedido" },
  nav_cta: { en: "Order a cameo", es: "Ordenar un camafeo" },
  nav_account: { en: "Account", es: "Cuenta" },
  nav_signout: { en: "Sign out", es: "Cerrar sesión" },

  // Home page keys used by app/page.tsx
  home_hero_image_alt: {
    en: "Soft focus field with warm light",
    es: "Campo de enfoque suave con luz cálida",
  },
  home_hero_title: {
    en: "Elegant enamel photo cameos that honor a life forever",
    es: "Elegantes camafeos fotográficos de esmalte que honran una vida para siempre",
  },
  home_hero_subtitle: {
    en: "Custom kiln fired enamel photo medallions created for outdoor monuments and private homes. Each piece is built to stay clear and bright in every season.",
    es: "Medallones fotográficos de esmalte horneado personalizados para monumentos al aire libre y hogares privados. Cada pieza está diseñada para mantenerse clara y brillante en todas las estaciones.",
  },
  home_intro_bg_alt: {
    en: "Soft field texture",
    es: "Textura suave de campo",
  },
  home_intro_title: {
    en: "Custom enamel photo memorial cameos for headstones and mausoleums",
    es: "Camafeos fotográficos conmemorativos de esmalte personalizados para lápidas y mausoleos",
  },
  home_intro_body: {
    en: "We transform your favorite photograph into a kiln fired enamel portrait on a metal medallion for outdoor monuments and home memorials. We work with monument dealers and individual families, and every order receives careful retouching and inspection.",
    es: "Transformamos su fotografía favorita en un retrato de esmalte horneado sobre un medallón de metal para monumentos al aire libre y memoriales en el hogar. Trabajamos con distribuidores de monumentos y familias individuales, y cada pedido recibe un cuidadoso retoque e inspección.",
  },
  home_tile_about: { en: "About us", es: "Nosotros" },
  home_tile_why: { en: "Payment", es: "Pago" },
  home_tile_contact: { en: "Contact us", es: "Contáctanos" },
  home_tile_about_alt: {
    en: "About our studio",
    es: "Sobre nuestro estudio",
  },
  home_tile_why_alt: {
    en: "Closeup of an enamel cameo",
    es: "Primer plano de un camafeo de esmalte",
  },
  home_tile_contact_alt: {
    en: "Headstone flowers at a memorial",
    es: "Flores en lápida en un memorial",
  },
  home_cta_bg_alt: {
    en: "Field at sunset with soft light",
    es: "Campo al atardecer con luz suave",
  },
  home_cta_title: {
    en: "Ready to order a cameo or request more information",
    es: "¿Listo para ordenar un camafeo o solicitar más información?",
  },
  home_cta_body: {
    en: "Share your photo, stone details, and any questions. We reply personally with options, pricing, and a clear next step.",
    es: "Comparta su foto, detalles de la lápida y cualquier pregunta. Responderemos personalmente con opciones, precios y el siguiente paso claro.",
  },

  // Generic CTA label used across pages
  cta_order: { en: "Order a cameo", es: "Ordenar un camafeo" },
  cart_label: { en: "Cart", es: "Carrito" },
  search_label: { en: "Search", es: "Buscar" },

  // Account pages
  account_title: { en: "My Account", es: "Mi Cuenta" },
  account_profile: { en: "Profile Information", es: "Información del Perfil" },
  account_email: { en: "Email", es: "Correo Electrónico" },
  account_name: { en: "Name", es: "Nombre" },
  account_edit_profile: { en: "Edit Profile", es: "Editar Perfil" },
  account_orders: { en: "Order History", es: "Historial de Pedidos" },
  account_orders_desc: { en: "View all your past orders and reorder easily", es: "Ver todos sus pedidos anteriores y volver a ordenar fácilmente" },
  account_view_orders: { en: "View Orders", es: "Ver Pedidos" },
  account_quick_actions: { en: "Quick Actions", es: "Acciones Rápidas" },
  account_new_order: { en: "New Order", es: "Nuevo Pedido" },
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
