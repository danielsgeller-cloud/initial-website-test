import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";

const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
  return new Stripe(key, { apiVersion: "2025-11-17.clover" });
};

export async function POST(req: Request) {
  try {
    const stripe = getStripe();
    const body = await req.json();
    const session = await getServerSession();

    // Get order details from request
    const {
      orderId,
      customerEmail,
      customerName,
      items, // Array of line items { name, amount, quantity }
      paymentType = "full", // "full" or "deposit"
    } = body;

    if (!customerEmail) {
      return NextResponse.json({ error: "Customer email required" }, { status: 400 });
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const siteUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      quantity: item.quantity || 1,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.amount * 100), // Convert dollars to cents
        product_data: {
          name: item.name,
          description: item.description || undefined,
        },
      },
    }));

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail,
      customer_creation: "if_required",
      payment_intent_data: {
        setup_future_usage: paymentType === "deposit" ? "off_session" : undefined,
        metadata: {
          orderId: orderId || "",
          paymentType,
          customerName: customerName || "",
        },
      },
      metadata: {
        orderId: orderId || "",
        paymentType,
        customerName: customerName || "",
      },
      line_items: lineItems,
      success_url: `${siteUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/payment?canceled=1`,
    });

    return NextResponse.json({ ok: true, url: checkoutSession.url });
  } catch (e: any) {
    console.error("create-checkout-session failed:", e);
    return NextResponse.json(
      { ok: false, error: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
