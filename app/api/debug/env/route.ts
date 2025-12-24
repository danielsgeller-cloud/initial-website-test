export const runtime = "nodejs";

export async function GET() {
  const raw = process.env.DATABASE_URL || "";
  let host: string | null = null;

  try {
    host = raw ? new URL(raw).host : null;
  } catch {
    host = "unparseable";
  }

  return Response.json({
    hasDatabaseUrl: !!raw,
    host,
  });
}
