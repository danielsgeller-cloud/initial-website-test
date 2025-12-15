import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
});

export async function POST(req: Request) {
  const body = await req.json();

  const depositAmount = Number(body.depositAmount);
  const email = String(body.email || "").trim();
  const reference = String(body.reference || "").trim();

  if (!depositAmount || depositAmount <= 0) {
    return NextResponse.json({ error: "Invalid deposit amount" }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    customer_email: email,
    customer_creation: "always",

    payment_intent_data: {
      setup_future_usage: "off_session",
      metadata: {
        reference,
        kind: "deposit",
      },
    },

    metadata: {
      reference,
      kind: "deposit",
    },

    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(depositAmount * 100),
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
}
