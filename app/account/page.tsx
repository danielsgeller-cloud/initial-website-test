"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login?callbackUrl=/account");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-neutral-600">Loading...</p>
      </main>
    );
  }

  if (status !== "authenticated") return null;

  const user = data?.user;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-neutral-900">Account</h1>

      <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-6">
        <div className="text-sm text-neutral-700">
          <div>
            <span className="font-medium">Email:</span> {user?.email || "Unknown"}
          </div>
          {user?.name && (
            <div className="mt-1">
              <span className="font-medium">Name:</span> {user.name}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-6 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 hover:border-amber-500 hover:text-amber-600"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}
