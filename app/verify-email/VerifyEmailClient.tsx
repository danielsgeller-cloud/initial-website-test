"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmailClient() {
  const params = useSearchParams();
  const token = params.get("token") || "";
  const email = params.get("email") || "";

  const [state, setState] = useState<"idle" | "working" | "ok" | "fail">("idle");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!token || !email) return;

    (async () => {
      try {
        setState("working");
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ token, email }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || "Verification failed");

        setState("ok");
        setMsg("Email verified. You can sign in now.");
      } catch (e: any) {
        setState("fail");
        setMsg(e?.message || "Verification failed");
      }
    })();
  }, [token, email]);

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-2xl font-semibold">Verify email</h1>

      {!token || !email ? (
        <p className="mt-4 text-neutral-700">
          Missing token or email. Please use the link from your email.
        </p>
      ) : (
        <p className="mt-4 text-neutral-700">
          {state === "working" ? "Verifying..." : msg}
        </p>
      )}

      <div className="mt-6 text-sm">
        <Link className="hover:text-amber-600" href="/login">
          Go to login
        </Link>
      </div>
    </main>
  );
}
