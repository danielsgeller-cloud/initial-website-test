import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = {
  orderRef?: string;
  email?: string;
  depositAmount?: number | string;
};

function toIntDollars(v: unknown): number {
  const n = typeof v === "string" ? Number(v) : typeof v === "number" ? v : NaN;
  if (!Number.isFinite(n)) return NaN;
  return Math.round(n);
}

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { ok: false, error: "Missing STRIPE_SECRET_KEY in environment" },
        { status: 500 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    const body = (await req.json().catch(() => ({}))) as Body;

    const depositDollars = toIntDollars(body.depositAmount);
    if (!Number.isFinite(depositDollars) || depositDollars <= 0) {
      return NextResponse.json(
        { ok: false, error: "Invalid depositAmount" },
        { status: 400 }
      );
    }

    const stripe = new Stripe(secretKey, { apiVersion: "2024-06-20" });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      customer_email: body.email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Deposit for enamel memorial medallion",
              description: body.orderRef ? `Order reference: ${body.orderRef}` : undefined,
            },
            unit_amount: depositDollars * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderRef: body.orderRef || "",
        email: body.email || "",
        depositAmount: String(depositDollars),
      },
      success_url: `${siteUrl}/payment?status=success`,
      cancel_url: `${siteUrl}/payment?status=cancel`,
    });

    if (!session.url) {
      return NextResponse.json(
        { ok: false, error: "Stripe did not return a checkout URL" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, url: session.url });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
