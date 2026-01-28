"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

function money(cents: number) {
  return (cents / 100).toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export default function CartPage() {
  const { items, itemCount, subtotalCents, setQty, removeItem, clear } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Customer info fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  async function handlePlaceOrder() {
    if (items.length === 0) return;

    // Validate required fields
    if (!name || !email) {
      setError("Please provide your name and email address");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Submit each cart item as a separate order
      const orderPromises = items.map(async (item) => {
        const orderBody = {
          shape: item.name.split(" ")[0] || "Oval", // Extract shape from name
          size: item.name,
          finish: item.name.toLowerCase().includes("color") ? "color" : "bw",
          mounting: item.name.includes("Tape") ? "tape" : item.name.includes("Fastener") ? "fastener" : null,
          combinePhotos: item.name.includes("Combined Photos"),
          proofOption: item.name.includes("Email Proof") ? "email" : item.name.includes("Printed Proof") ? "printed" : null,
          customerName: name,
          customerEmail: email,
          customerPhone: phone || null,
          cemetery: null,
          shipToAddress: null,
          neededByDate: null,
          additionalNotes: notes || null,
          basePrice: item.priceCents / 100,
          mountingPrice: 0,
          proofPrice: 0,
          baseFee: 0,
          combineAdjust: 0,
          totalPrice: item.priceCents / 100,
        };

        const res = await fetch("/api/orders/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderBody),
        });

        if (!res.ok) {
          const json = await res.json();
          throw new Error(json.error || "Failed to submit order");
        }

        return res.json();
      });

      await Promise.all(orderPromises);

      setSuccess(true);
      clear();

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setError(err?.message || "Failed to submit order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-3xl font-semibold">Cart</h1>
        <div className="text-sm text-neutral-600">{itemCount} item{itemCount === 1 ? "" : "s"}</div>
      </div>

      {success && (
        <div className="mt-6 rounded-lg border border-emerald-300 bg-emerald-50 p-4">
          <p className="font-semibold text-emerald-900">Order submitted successfully!</p>
          <p className="mt-1 text-sm text-emerald-800">
            We've received your order request and will contact you via email with pricing confirmation and next steps.
          </p>
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4">
          <p className="font-semibold text-red-900">Error</p>
          <p className="mt-1 text-sm text-red-800">{error}</p>
        </div>
      )}

      {items.length === 0 ? (
        <div className="mt-10 rounded-lg border border-neutral-200 bg-white p-8">
          <div className="text-neutral-900">Your cart is empty.</div>
          <div className="mt-4">
            <Link href="/order-form" className="rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-black hover:bg-amber-400">
              Place an Order
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
              <div className="divide-y divide-neutral-200">
                {items.map((it) => (
                  <div key={it.id} className="flex gap-4 p-5">
                    <div className="h-20 w-20 flex-none overflow-hidden rounded-md border border-neutral-200 bg-neutral-50">
                      {it.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={it.imageUrl} alt={it.name} className="h-full w-full object-cover" />
                      ) : null}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate font-medium text-neutral-900">{it.name}</div>
                          <div className="mt-1 text-sm text-neutral-600">
                            {money(it.priceCents)} - {money(Math.round(it.priceCents * 1.3))}
                          </div>
                          <div className="mt-0.5 text-xs text-neutral-500">
                            Price range (final price confirmed via email)
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(it.id)}
                          className="text-sm font-medium text-neutral-600 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setQty(it.id, (it.quantity || 1) - 1)}
                            className="h-9 w-9 rounded-md border border-neutral-200 bg-white text-neutral-900 hover:border-amber-500"
                          >
                            -
                          </button>
                          <input
                            value={String(it.quantity)}
                            onChange={(e) => setQty(it.id, Number(e.target.value))}
                            className="h-9 w-16 rounded-md border border-neutral-300 px-2 text-center text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            inputMode="numeric"
                          />
                          <button
                            type="button"
                            onClick={() => setQty(it.id, (it.quantity || 1) + 1)}
                            className="h-9 w-9 rounded-md border border-neutral-200 bg-white text-neutral-900 hover:border-amber-500"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-sm font-medium text-neutral-900">
                          {money(it.priceCents * (it.quantity || 0))} - {money(Math.round(it.priceCents * 1.3 * (it.quantity || 0)))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={clear}
                className="rounded-full border border-neutral-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-800 hover:border-amber-500 hover:text-amber-600"
              >
                Clear cart
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Customer Information */}
            <div className="rounded-lg border border-neutral-200 bg-white p-6">
              <div className="text-sm font-medium text-neutral-600 mb-4">Your Information</div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    placeholder="(555) 555-5555"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Additional Notes (optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    placeholder="Cemetery location, shipping address, deadline, photo modification requests, etc."
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="rounded-lg border border-neutral-200 bg-white p-6">
              <div className="text-sm font-medium text-neutral-600">Order summary</div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-neutral-700">Estimated Range</div>
                <div className="text-sm font-semibold text-neutral-900">
                  {money(subtotalCents)} - {money(Math.round(subtotalCents * 1.3))}
                </div>
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                Final pricing will be confirmed via email based on your specific requirements
              </p>

              <div className="mt-6">
                <button
                  onClick={handlePlaceOrder}
                  disabled={submitting || items.length === 0}
                  className="w-full text-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-md hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {submitting ? "Submitting..." : "Place Order Request"}
                </button>

              <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm font-semibold text-blue-900">Payment Process</p>
                <p className="mt-2 text-xs text-blue-800 leading-relaxed">
                  After you submit your order request, we will review your selections and contact you with final pricing and next steps. We will send you a secure payment link via email when your order is ready to proceed.
                </p>
              </div>

              <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-4">
                <p className="text-xs font-semibold text-amber-900">Deposit Required</p>
                <p className="mt-1 text-xs text-amber-800">
                  A deposit (counted towards the final cost) is required before work begins on your order. The payment link we send will include deposit information.
                </p>
              </div>

              <div className="mt-4 text-xs text-neutral-500">
                Taxes and shipping, if applicable, are calculated after we review your order.
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
