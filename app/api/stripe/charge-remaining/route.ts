import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getRecord } from "@/lib/stripeStore";

export const runtime = "nodejs";

export async function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}


const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
  return new Stripe(key, { apiVersion: "2025-11-17.clover" });
};

export async function POST(req: Request) {
  const stripe = getStripe();
  const body = await req.json();

  const reference = String(body.reference || "").trim();
  const remainingAmount = Number(body.remainingAmount); // dollars

  if (!reference) return NextResponse.json({ error: "Missing reference" }, { status: 400 });
  if (!Number.isFinite(remainingAmount) || remainingAmount <= 0) {
    return NextResponse.json({ error: "Invalid remainingAmount" }, { status: 400 });
  }

  const rec = await getRecord(reference);
  if (!rec) return NextResponse.json({ error: "No saved Stripe record for reference" }, { status: 404 });

  const amountCents = Math.round(remainingAmount * 100);

  try {
    const pi = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "usd",
      customer: rec.customerId,
      payment_method: rec.paymentMethodId,
      off_session: true,
      confirm: true,
      metadata: {
        reference,
        kind: "final",
      },
    });

    return NextResponse.json({ ok: true, paymentIntentId: pi.id, status: pi.status });
  } catch (err: any) {
    console.error("charge-remaining failed:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "charge-remaining failed" },
      { status: 500 }
    );
  }
}
