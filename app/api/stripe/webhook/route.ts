import { NextResponse } from "next/server";
import Stripe from "stripe";
import { upsertRecord } from "@/lib/stripeStore";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing webhook signature" }, { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const reference = session.metadata?.reference || "";
    const paymentIntentId = session.payment_intent as string;

    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);

    const customerId = typeof pi.customer === "string" ? pi.customer : pi.customer?.id || "";
    const paymentMethodId =
      typeof pi.payment_method === "string" ? pi.payment_method : pi.payment_method?.id || "";

    console.log("DEPOSIT PAID", { reference, paymentIntentId, customerId, paymentMethodId, amount: pi.amount });

    if (reference && customerId && paymentMethodId) {
      await upsertRecord({
        reference,
        customerId,
        paymentMethodId,
        depositPaymentIntentId: paymentIntentId,
        depositAmountCents: pi.amount,
        updatedAt: new Date().toISOString(),
      });
      console.log("SAVED STRIPE RECORD", { reference });
    } else {
      console.error("Missing fields, not saved", { reference, customerId, paymentMethodId });
    }
  }

  return NextResponse.json({ received: true });
}
