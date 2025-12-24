import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { readStripeStore } from "@/lib/stripeStore";

export async function GET(req: Request) {
  try {
    await requireAdmin();
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const store = await readStripeStore();

    // Convert store object to array
    const orders = Object.entries(store).map(([reference, data]) => ({
      reference,
      ...data,
    }));

    return NextResponse.json({ orders });
  } catch (err) {
    // If store doesn't exist, return empty array
    return NextResponse.json({ orders: [] });
  }
}
