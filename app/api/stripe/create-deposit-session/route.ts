import { NextResponse } from "next/server";
import Stripe from "stripe";

const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
  return new Stripe(key, { apiVersion: "2025-11-17.clover" });
};

export async function POST(req: Request) {
  try {
    const stripe = getStripe();
    const body = await req.json();

    // Accept both 'depositCents' (from frontend) and 'depositAmount' for flexibility
    const depositCents = Number(body.depositCents || body.depositAmount || 0);
    const depositAmount = depositCents / 100; // Convert to dollars for validation
    const email = String(body.email || "").trim();
    // Accept both 'orderRef' (from frontend) and 'reference' for flexibility
    const reference = String(body.orderRef || body.reference || "").trim();

    // Validate required fields
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email address is required" }, { status: 400 });
    }

    if (!reference || reference.length < 3) {
      return NextResponse.json({ error: "Order reference is required" }, { status: 400 });
    }

    if (!depositAmount || depositAmount <= 0) {
      return NextResponse.json({ error: "Invalid deposit amount" }, { status: 400 });
    }

    // Validate deposit amount is reasonable (prevent accidental large payments)
    if (depositAmount > 10000) {
      return NextResponse.json({ error: "Deposit amount exceeds maximum allowed ($10,000). Please contact us for large orders." }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl) throw new Error("Missing NEXT_PUBLIC_SITE_URL");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      customer_creation: "always",
      payment_intent_data: {
        setup_future_usage: "off_session",
        metadata: { reference, kind: "deposit" },
      },
      metadata: { reference, kind: "deposit" },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: depositCents,
            product_data: {
              name: "Deposit for approved cameo order",
              description: `Order reference: ${reference}`,
            },
          },
        },
      ],
      success_url: `${siteUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/payment?canceled=1`,
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (e: any) {
    console.error("create-deposit-session failed:", e);
    return NextResponse.json(
      { ok: false, error: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
