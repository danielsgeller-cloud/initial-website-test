"use client";

import { useMemo, useState } from "react";

type Status = "idle" | "loading" | "error" | "ready";

function toCents(dollars: number) {
  return Math.max(0, Math.round(dollars * 100));
}

export default function PaymentPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const [orderRef, setOrderRef] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // You can keep this simple for now: customer enters an approved deposit amount from your email/quote.
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
          depositAmount: depositCents / 100, // Convert cents to dollars
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
        <header className="text-center">
          <h1 className="font-serif text-3xl font-semibold text-neutral-900 md:text-4xl">
            Payment
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-600 md:text-base">
            We collect a deposit after we accept your artwork for production, then we charge the remaining balance when your cameo ships.
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-neutral-500">
            If you have not received an approval email from us yet, do not pay here.
          </p>
        </header>

        <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm shadow-neutral-200 md:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Pay your deposit
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-medium text-neutral-700">
                Order reference (from our email)
              </label>
              <input
                value={orderRef}
                onChange={(e) => setOrderRef(e.target.value)}
                placeholder="For example: PIC-2025-00123"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-700">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-700">
                Deposit amount (USD)
              </label>
              <input
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                inputMode="decimal"
                placeholder="100"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <p className="mt-1 text-[11px] text-neutral-500">
                Enter the deposit amount you were approved for. We will confirm the final total before shipping.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              What happens next
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
              <li>You pay the deposit through Stripe Checkout.</li>
              <li>We begin production and keep you updated if we need clarification.</li>
              <li>When your cameo ships, we charge the remaining balance using the payment method saved with your deposit.</li>
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
              {status === "loading" ? "Redirecting to Stripe..." : "Pay deposit"}
            </button>

            <p className="text-xs text-neutral-500">
              Secure payments powered by Stripe.
            </p>
          </div>

          {status === "error" && (
            <div className="mt-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
