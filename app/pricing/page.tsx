"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/components/I18n";

export default function Page() {
  const { lang } = useLanguage();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="font-serif text-3xl font-semibold text-neutral-900">
        {t({ en: "Page", ru: "Страница", uk: "Сторінка" }, lang)}
      </h1>
      <p className="mt-3 text-neutral-700">
        {t(
          {
            en: "This page is now wired to the language slider. Replace this content with your real copy in EN/RU/UK.",
            ru: "Эта страница теперь подключена к переключателю языка. Замените этот текст на ваш реальный контент EN/RU/UK.",
            uk: "Ця сторінка тепер підключена до перемикача мови. Замініть цей текст на ваш реальний контент EN/RU/UK.",
          },
          lang,
        )}
      </p>
    </main>
  );
}
