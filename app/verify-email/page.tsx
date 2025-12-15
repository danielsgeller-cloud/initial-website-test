"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
  const sp = useSearchParams();
  const token = sp.get("token") || "";
  const email = sp.get("email") || "";
  const [message, setMessage] = useState("Verifying...");
  const [status, setStatus] = useState<"loading" | "done">("loading");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, token }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed");
        setMessage("Email verified. You can sign in now.");
      } catch (e: any) {
        setMessage(e?.message || "Verification failed.");
      } finally {
        setStatus("done");
      }
    })();
  }, [email, token]);

  return (
    <main className="mx-auto max-w-md px-4 py-14">
      <h1 className="text-2xl font-semibold">Verify email</h1>
      <p className="mt-4 text-sm">{message}</p>

      <div className="mt-6 text-sm text-neutral-600">
        <Link className="hover:text-amber-600" href="/login">Go to login</Link>
        <span className="px-2">|</span>
        <Link className="hover:text-amber-600" href="/register">Back to register</Link>
      </div>

      {status === "loading" && <div className="mt-6 text-sm text-neutral-500">Working...</div>}
    </main>
  );
}
