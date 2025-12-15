"use client";

import { ReactNode } from "react";
import { LangCode, useLanguage } from "./LanguageProvider";

export function t(values: { en: string; ru: string; uk: string }, lang: LangCode) {
  return values[lang];
}

export default function I18n(props: { en: ReactNode; ru: ReactNode; uk: ReactNode }) {
  const { lang } = useLanguage();
  if (lang === "ru") return <>{props.ru}</>;
  if (lang === "uk") return <>{props.uk}</>;
  return <>{props.en}</>;
}
