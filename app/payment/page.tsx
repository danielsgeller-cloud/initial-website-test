"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";

type Status = "idle" | "loading" | "error" | "ready";

function toCents(dollars: number) {
  return Math.max(0, Math.round(dollars * 100));
}

export default function PaymentPage() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const [orderRef, setOrderRef] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [depositAmount, setDepositAmount] = useState<string>("100");

  const depositCents = useMemo(() => {
    const n = Number(depositAmount);
    return Number.isFinite(n) ? toCents(n) : 0;
  }, [depositAmount]);

  async function startDepositCheckout() {
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/stripe/create-deposit-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: orderRef.trim(),
          email: email.trim(),
          depositAmount: depositCents / 100,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json?.ok || !json?.url) {
        throw new Error(json?.error || "Could not start checkout.");
      }

      setStatus("ready");
      window.location.href = json.url as string;
    } catch (e: any) {
      setStatus("error");
      setError(e?.message || "Something went wrong.");
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 py-12">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="mb-6 flex justify-end">
          <Link
            href="/login"
            className="text-sm text-neutral-600 hover:text-amber-600 transition-colors font-medium"
          >
            {t("payment_admin_login")}
          </Link>
        </div>

        <header className="text-center">
          <h1 className="font-serif text-3xl font-semibold text-neutral-900 md:text-4xl">
            {t("payment_title")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-600 md:text-base">
            {t("payment_subtitle")}
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-neutral-500">
            {t("payment_warning")}
          </p>
        </header>

        <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm shadow-neutral-200 md:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
            {t("payment_deposit_title")}
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-medium text-neutral-700">
                {t("payment_order_ref")}
              </label>
              <input
                value={orderRef}
                onChange={(e) => setOrderRef(e.target.value)}
                placeholder={t("payment_order_ref_placeholder")}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-700">{t("payment_email")}</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder={t("payment_email_placeholder")}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-700">
                {t("payment_amount")}
              </label>
              <input
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                inputMode="decimal"
                placeholder={t("payment_amount_placeholder")}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <p className="mt-1 text-[11px] text-neutral-500">
                {t("payment_amount_note")}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              {t("payment_next_title")}
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
              <li>{t("payment_next_step1")}</li>
              <li>{t("payment_next_step2")}</li>
              <li>{t("payment_next_step3")}</li>
            </ol>
          </div>

          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <button
              type="button"
              onClick={startDepositCheckout}
              disabled={
                status === "loading" ||
                !email.trim() ||
                depositCents <= 0 ||
                !orderRef.trim()
              }
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-8 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-md hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? t("payment_redirecting") : t("payment_pay_button")}
            </button>

            {error && <div className="text-sm text-red-600">{error}</div>}
          </div>
        </section>
      </div>
    </main>
  );
}
