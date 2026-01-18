import { getServerSession } from "next-auth";
import { authOptions } from "./auth-config";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  return session;
}
