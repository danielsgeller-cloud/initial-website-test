import { getServerSession } from "next-auth";

export async function requireAdmin() {
  const session = await getServerSession();
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  return session;
}
