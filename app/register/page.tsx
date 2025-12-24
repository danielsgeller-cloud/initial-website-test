"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setErr(null);

    // Validate password confirmation
    if (password !== confirmPassword) {
      setErr("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      setErr("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password, phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Registration failed");
      }

      setMsg("Account created successfully! Check your email to verify your account before signing in.");
      setEmail("");
      setName("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");
    } catch (e: any) {
      setErr(e?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  const passwordsMatch = password === confirmPassword;
  const showPasswordMismatch = confirmPassword.length > 0 && !passwordsMatch;

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 py-12 px-4">
      <div className="mx-auto max-w-lg">
        <div className="bg-white rounded-2xl shadow-2xl border border-amber-100 p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-900">Create Account</h1>
            <p className="mt-3 text-sm text-neutral-600">
              Join Pictures in Ceramic to start ordering custom memorial portraits
            </p>
          </div>

          {/* Success/Error Messages */}
          {msg && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">{msg}</p>
            </div>
          )}
          {err && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{err}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                Full Name <span className="text-neutral-400 font-normal">(optional)</span>
              </label>
              <input
                id="name"
                type="text"
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                Phone Number <span className="text-neutral-400 font-normal">(optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="(123) 456-7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <p className="mt-1.5 text-xs text-neutral-500">
                Must be at least 8 characters long
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  showPasswordMismatch
                    ? "border-red-300 focus:ring-red-500"
                    : "border-neutral-300 focus:ring-amber-500"
                }`}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {showPasswordMismatch && (
                <p className="mt-1.5 text-xs text-red-600">
                  Passwords do not match
                </p>
              )}
              {passwordsMatch && confirmPassword.length > 0 && (
                <p className="mt-1.5 text-xs text-green-600">
                  Passwords match ✓
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || showPasswordMismatch}
              className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 px-6 py-3.5 font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <div className="flex flex-col gap-3 text-sm text-center">
              <Link
                href="/login"
                className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                Already have an account? Sign in
              </Link>
              <Link
                href="/"
                className="text-neutral-600 hover:text-neutral-700 transition-colors"
              >
                ← Return to home
              </Link>
            </div>
          </div>

          {/* Privacy Note */}
          <p className="mt-6 text-xs text-center text-neutral-500">
            By creating an account, you agree to receive order updates and account notifications via email.
          </p>
        </div>
      </div>
    </main>
  );
}
