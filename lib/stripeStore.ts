import { promises as fs } from "fs";
import path from "path";

export type StripeRecord = {
  reference: string;
  customerId: string;
  paymentMethodId: string;
  depositPaymentIntentId?: string;
  depositAmountCents?: number;
  updatedAt: string;
};

const STORE_PATH = path.join(process.env.TMPDIR || "/tmp", "stripe-store.json");

async function readStore(): Promise<Record<string, StripeRecord>> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    return JSON.parse(raw || "{}");
  } catch {
    return {};
  }
}

async function writeStore(store: Record<string, StripeRecord>) {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

export async function upsertRecord(rec: StripeRecord) {
  const store = await readStore();
  store[rec.reference] = rec;
  await writeStore(store);
}

export async function getRecord(reference: string): Promise<StripeRecord | null> {
  const store = await readStore();
  return store[reference] ?? null;
}

export async function readStripeStore(): Promise<Record<string, StripeRecord>> {
  return await readStore();
}
