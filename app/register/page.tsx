"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setErr(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Registration failed");
      }

      setMsg("Check your email to verify your account before signing in.");
      setEmail("");
      setName("");
      setPassword("");
    } catch (e: any) {
      setErr(e?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-14">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <p className="mt-2 text-sm text-neutral-600">
        You must verify your email before logging in.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input
          className="w-full rounded-md border px-3 py-2"
          placeholder="Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full rounded-md border px-3 py-2"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full rounded-md border px-3 py-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-amber-500 px-4 py-2 font-semibold text-black"
        >
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>

      {msg && <p className="mt-4 text-sm text-green-700">{msg}</p>}
      {err && <p className="mt-4 text-sm text-red-700">{err}</p>}

      <div className="mt-6 flex flex-col gap-2 text-sm">
        <Link href="/login" className="text-amber-600">
          Already have an account? Sign in
        </Link>
        <Link href="/" className="text-neutral-600">
          Return home
        </Link>
      </div>
    </main>
  );
}
