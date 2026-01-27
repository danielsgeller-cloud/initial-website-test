"use client";

import { useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

type Lang = "en" | "es" | "ru" | "uk";

const COPY: Partial<Record<
  Lang,
  {
    title: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    sending: string;
    send: string;
    success: string;
    error: string;
  }
>> = {
  en: {
    title: "Contact Pictures in Ceramic",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    sending: "Sending...",
    send: "Send",
    success: "Thank you. Your message has been sent.",
    error: "Something went wrong. Please try again later.",
  },
  es: {
    title: "Contactar Pictures in Ceramic",
    nameLabel: "Nombre",
    emailLabel: "Correo Electrónico",
    messageLabel: "Mensaje",
    sending: "Enviando...",
    send: "Enviar",
    success: "Gracias. Su mensaje ha sido enviado.",
    error: "Algo salió mal. Por favor, inténtelo de nuevo más tarde.",
  },
  ru: {
    title: "Связаться с Pictures in Ceramic",
    nameLabel: "Имя",
    emailLabel: "Электронная почта",
    messageLabel: "Сообщение",
    sending: "Отправка...",
    send: "Отправить",
    success: "Спасибо. Ваше сообщение отправлено.",
    error: "Что-то пошло не так. Пожалуйста, попробуйте позже.",
  },
  uk: {
    title: "Зв'язатися з Pictures in Ceramic",
    nameLabel: "Ім'я",
    emailLabel: "Електронна пошта",
    messageLabel: "Повідомлення",
    sending: "Відправка...",
    send: "Відправити",
    success: "Дякуємо. Ваше повідомлення надіслано.",
    error: "Щось пішло не так. Будь ласка, спробуйте пізніше.",
  },
};

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = COPY[(lang as Lang) || "en"] ?? COPY.en;

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
      } else {
        setStatus("sent");
        form.reset();
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">{t.title}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="name">
            {t.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="email">
            {t.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="message">
            {t.messageLabel}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {status === "sending" ? t.sending : t.send}
        </button>

        {status === "sent" && (
          <p className="mt-2 text-sm text-green-600">{t.success}</p>
        )}
        {status === "error" && (
          <p className="mt-2 text-sm text-red-600">{t.error}</p>
        )}
      </form>
    </main>
  );
}
