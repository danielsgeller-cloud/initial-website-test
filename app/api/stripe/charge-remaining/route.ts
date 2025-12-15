import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("x-admin-token");
    if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    }

    const { email, amountCents, orderRef } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, error: "Missing email." }, { status: 400 });
    }
    if (!amountCents || typeof amountCents !== "number" || amountCents < 50) {
      return NextResponse.json({ ok: false, error: "Amount must be at least $0.50." }, { status: 400 });
    }

    const customers = await stripe.customers.list({ email, limit: 1 });
    const customer = customers.data[0];
    if (!customer) {
      return NextResponse.json({ ok: false, error: "No Stripe customer found for that email." }, { status: 404 });
    }

    const fullCustomer = await stripe.customers.retrieve(customer.id);
    // @ts-ignore
    const defaultPm = fullCustomer?.invoice_settings?.default_payment_method;

    if (!defaultPm || typeof defaultPm !== "string") {
      return NextResponse.json(
        { ok: false, error: "No saved payment method found. Customer must pay remainder manually." },
        { status: 400 },
      );
    }

    const pi = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "usd",
      customer: customer.id,
      payment_method: defaultPm,
      off_session: true,
      confirm: true,
      metadata: {
        type: "remainder",
        orderRef: orderRef || "",
      },
      description: orderRef ? `Remaining balance for ${orderRef}` : "Remaining balance for enamel cameo",
    });

    return NextResponse.json({ ok: true, paymentIntentId: pi.id, status: pi.status });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Stripe error." }, { status: 500 });
  }
}
