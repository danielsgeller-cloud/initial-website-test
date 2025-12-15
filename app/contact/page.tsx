"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "../../components/LanguageProvider";

export default function ContactPage() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Server error");

      setStatus("success");
      setStatusMessage(
        t({
          en: "Thanks. Your message was sent. We will reply by email.",
          ru: "Спасибо. Сообщение отправлено. Мы ответим по email.",
          uk: "Дякуємо. Повідомлення надіслано. Ми відповімо на email.",
        }),
      );
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setStatus("error");
      setStatusMessage(
        err?.message ||
          t({
            en: "There was a problem sending your message.",
            ru: "Не удалось отправить сообщение.",
            uk: "Не вдалося надіслати повідомлення.",
          }),
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-neutral-50 pb-16 pt-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-3xl font-semibold text-neutral-900 md:text-4xl">
            {t({ en: "Contact", ru: "Контакты", uk: "Контакт" })}
          </h1>
          <p className="mt-4 text-sm text-neutral-600 md:text-base">
            {t({
              en: "Questions about sizes, pricing, or placing an order? Send us a message and we will reply personally.",
              ru: "Вопросы по размерам, цене или заказу? Напишите нам, мы ответим лично.",
              uk: "Питання щодо розмірів, ціни або замовлення? Напишіть нам, ми відповімо особисто.",
            })}
          </p>
        </header>

        <section className="mt-10 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="rounded-2xl bg-white p-6 shadow-sm shadow-neutral-200 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-700">
                    {t({ en: "Name*", ru: "Имя*", uk: "Ім’я*" })}
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-700">
                    {t({ en: "Email*", ru: "Email*", uk: "Email*" })}
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">
                  {t({ en: "Message*", ru: "Сообщение*", uk: "Повідомлення*" })}
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-full bg-amber-500 px-8 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-md hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? t({ en: "Sending...", ru: "Отправка...", uk: "Надсилання..." })
                  : t({ en: "Send message", ru: "Отправить", uk: "Надіслати" })}
              </button>

              {status && (
                <div
                  className={[
                    "rounded-md border px-3 py-2 text-sm",
                    status === "success"
                      ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                      : "border-red-300 bg-red-50 text-red-800",
                  ].join(" ")}
                >
                  {statusMessage}
                </div>
              )}
            </form>
          </div>

          <aside className="rounded-2xl bg-white p-6 shadow-sm shadow-neutral-200 md:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
              {t({ en: "Studio", ru: "Мастерская", uk: "Майстерня" })}
            </h2>
            <div className="mt-4 space-y-2 text-sm text-neutral-700">
              <p className="font-medium">11 Doran Ct</p>
              <p>South Brunswick, NJ 08852</p>
              <p className="pt-2">
                <a className="text-amber-700 hover:text-amber-600" href="tel:17322976008">
                  (732) 297-6008
                </a>
              </p>
              <p>
                <a className="text-amber-700 hover:text-amber-600" href="mailto:info@picturesinceramic.com">
                  info@picturesinceramic.com
                </a>
              </p>

              <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-600">
                <p className="font-semibold text-neutral-700">
                  {t({ en: "Hours", ru: "Часы", uk: "Години" })}
                </p>
                <p className="mt-1">
                  {t({
                    en: "Mon–Fri: 9:00 am–5:00 pm",
                    ru: "Пн–Пт: 9:00–17:00",
                    uk: "Пн–Пт: 9:00–17:00",
                  })}
                </p>
                <p>{t({ en: "Sat: By appointment", ru: "Сб: По записи", uk: "Сб: За записом" })}</p>
                <p>{t({ en: "Sun: By appointment", ru: "Вс: По записи", uk: "Нд: За записом" })}</p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
