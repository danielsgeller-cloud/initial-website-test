"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || t("forgot_password_success"));
        setEmail("");
      } else {
        setError(data.error || t("forgot_password_error"));
      }
    } catch (err) {
      setError(t("forgot_password_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold text-neutral-900">{t("forgot_password_title")}</h1>
      <p className="mt-2 text-sm text-neutral-600">
        {t("forgot_password_subtitle")}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        {message && (
          <div className="rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {message}
          </div>
        )}

        {error && (
          <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <label className="grid gap-1 text-sm">
          <span className="font-medium text-neutral-700">{t("forgot_password_email")}</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={t("forgot_password_email_placeholder")}
            className="rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-amber-500 px-6 py-2 text-sm font-semibold text-black hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? t("forgot_password_sending") : t("forgot_password_send")}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <Link href="/login" className="text-amber-600 hover:underline">
          {t("forgot_password_back")}
        </Link>
      </div>
    </main>
  );
}
