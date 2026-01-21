import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email?.toLowerCase().trim();
          const password = credentials?.password ?? "";

          if (!email || !password) {
            console.error("[NextAuth] Missing email or password");
            return null;
          }

          const user = await prisma.user.findUnique({ where: { email } });
          if (!user) {
            console.error("[NextAuth] User not found:", email);
            return null;
          }

          if (!user.emailVerified) {
            console.error("[NextAuth] Email not verified:", email);
            return null;
          }

          const ok = await bcrypt.compare(password, user.passwordHash);
          if (!ok) {
            console.error("[NextAuth] Invalid password for:", email);
            return null;
          }

          console.log("[NextAuth] Login successful:", email);
          return {
            id: user.id,
            email: user.email,
            name: user.name ?? undefined,
            role: user.role,
          };
        } catch (error) {
          console.error("[NextAuth] Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as any).role;
        token.name = user.name;
      }
      // Handle session updates (e.g., when update() is called)
      if (trigger === "update" && session) {
        token.name = session.name;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        session.user.name = token.name as string | null | undefined;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};
