"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Show loading state while checking auth
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error if not authenticated or not an admin
  if (status === "unauthenticated" || (session?.user as any)?.role !== "ADMIN") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-white p-8 text-center shadow-lg">
          <div className="mb-4 text-5xl">🚫</div>
          <h1 className="text-2xl font-bold text-neutral-900">Access Denied</h1>
          <p className="mt-3 text-neutral-600">
            You don't have permission to access the admin panel.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/login?callbackUrl=/admin"
              className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400"
            >
              Sign in as admin
            </Link>
            <Link
              href="/"
              className="text-sm text-neutral-600 hover:text-amber-600"
            >
              Return to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/orders", label: "Orders" },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 border-r border-neutral-200 bg-neutral-50 md:block">
        <div className="p-6">
          <h1 className="text-lg font-semibold text-neutral-900">Admin Panel</h1>
          <p className="mt-1 text-xs text-neutral-600">{session?.user?.email}</p>
        </div>

        <nav className="space-y-1 px-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-md px-3 py-2 text-sm font-medium ${
                isActive(link.href)
                  ? "bg-amber-100 text-amber-900"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-0 right-0 px-6">
          <Link
            href="/"
            className="block rounded-md px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100"
          >
            ← Back to site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-2 w-full rounded-md bg-neutral-800 px-3 py-2 text-sm font-semibold text-white hover:bg-neutral-700"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(true)}
          className="fixed left-4 top-4 z-40 rounded-md bg-white p-2 shadow-md"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-72 bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold text-neutral-900">Admin Panel</h1>
                <p className="mt-1 text-xs text-neutral-600">{session?.user?.email}</p>
              </div>
              <button onClick={() => setMenuOpen(false)} className="text-neutral-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${
                    isActive(link.href)
                      ? "bg-amber-100 text-amber-900"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6">
              <Link
                href="/"
                className="block rounded-md px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100"
                onClick={() => setMenuOpen(false)}
              >
                ← Back to site
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="mt-2 w-full rounded-md bg-neutral-800 px-3 py-2 text-sm font-semibold text-white hover:bg-neutral-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
