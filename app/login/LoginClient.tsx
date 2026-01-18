"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginClient() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  const error = params.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(
    error === "CredentialsSignin" ? "Invalid email or password. Please verify your email before signing in." : null
  );

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold">Sign in</h1>

      {errorMsg && (
        <div className="mt-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMsg}
        </div>
      )}

      <form
        className="mt-6 grid gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setSubmitting(true);
          setErrorMsg(null);

          const result = await signIn("credentials", {
            email,
            password,
            callbackUrl,
            redirect: false,
          });

          if (result?.error) {
            setErrorMsg("Invalid email or password. Please verify your email before signing in.");
            setSubmitting(false);
          } else if (result?.url) {
            window.location.href = result.url;
          }
        }}
      >
        <label className="grid gap-1 text-sm">
          Email
          <input
            className="rounded-md border border-neutral-300 px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </label>

        <label className="grid gap-1 text-sm">
          Password
          <input
            className="rounded-md border border-neutral-300 px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </label>

        <div className="text-right text-sm">
          <Link href="/forgot-password" className="text-amber-600 hover:text-amber-700">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400 disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-neutral-600">
        <Link href="/register" className="text-amber-600 hover:text-amber-700">
          Don't have an account? Register
        </Link>
      </div>

      <div className="mt-4 text-center text-sm text-neutral-600">
        <Link className="hover:text-amber-600" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
