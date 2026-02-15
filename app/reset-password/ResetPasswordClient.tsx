"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function ResetPasswordClient() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!token || !email) {
      setError(t("reset_password_invalid_token"));
    }
  }, [token, email, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError(t("reset_password_mismatch"));
      return;
    }

    if (newPassword.length < 8) {
      setError(t("register_password_length_error"));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login?message=Password reset successful");
        }, 2000);
      } else {
        setError(data.error || t("reset_password_failed"));
      }
    } catch (err) {
      setError(t("reset_password_failed"));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-800">
          {t("reset_password_success")}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold text-neutral-900">{t("reset_password_title")}</h1>
      <p className="mt-2 text-sm text-neutral-600">
        {t("reset_password_subtitle")}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        {error && (
          <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <label className="grid gap-1 text-sm">
          <span className="text-xs font-medium text-neutral-700">{t("reset_password_new")}</span>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder={t("reset_password_new_placeholder")}
            disabled={!token || !email}
          />
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-xs font-medium text-neutral-700">{t("reset_password_confirm")}</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder={t("reset_password_confirm_placeholder")}
            disabled={!token || !email}
          />
        </label>

        <button
          type="submit"
          disabled={loading || !token || !email}
          className="w-full rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-black hover:bg-amber-400 disabled:opacity-60"
        >
          {loading ? t("reset_password_submitting") : t("reset_password_submit")}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <Link href="/forgot-password" className="text-amber-600 hover:text-amber-700">
          {t("forgot_password_send")}
        </Link>
      </div>
    </main>
  );
}
