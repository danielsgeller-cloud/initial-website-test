import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const path = req.nextUrl.pathname;

      // Admin routes require ADMIN role
      if (path.startsWith('/admin')) {
        return (token as any)?.role === 'ADMIN';
      }

      // Other protected routes just need authentication
      return !!token;
    },
  },
});

export const config = {
  matcher: ['/admin/:path*', '/account/:path*'],
};
