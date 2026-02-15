"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function ShopPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-neutral-900 mb-6">{t("shop_title")}</h1>
        <p className="text-lg text-neutral-600 mb-8">
          {t("shop_placeholder_message")}
        </p>

        <section className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">{t("shop_typical_options")}</h2>
          <ul className="list-disc list-inside space-y-2 text-neutral-700">
            <li>{t("shop_option1")}</li>
            <li>{t("shop_option2")}</li>
            <li>{t("shop_option3")}</li>
            <li>{t("shop_option4")}</li>
          </ul>
        </section>

        <p className="text-neutral-700 mb-6">
          {t("shop_order_instructions")}
        </p>

        <Link
          href="/order-form"
          className="inline-block rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-black hover:bg-amber-400 shadow-md transition-colors"
        >
          {t("nav_order_form")}
        </Link>
      </div>
    </main>
  );
}
