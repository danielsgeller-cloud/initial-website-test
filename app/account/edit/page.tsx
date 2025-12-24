"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");

  const [nameLoading, setNameLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const [nameMessage, setNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/account/edit");
    }
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [status, session, router]);

  const handleNameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameLoading(true);
    setNameMessage("");
    setNameError("");

    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (res.ok) {
        setNameMessage("Name updated successfully");
      } else {
        setNameError(data.error || "Failed to update name");
      }
    } catch (err) {
      setNameError("Something went wrong");
    } finally {
      setNameLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage("");
    setPasswordError("");

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      setPasswordLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setPasswordMessage("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordError(data.error || "Failed to update password");
      }
    } catch (err) {
      setPasswordError("Something went wrong");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    setEmailMessage("");
    setEmailError("");

    try {
      const res = await fetch("/api/auth/change-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newEmail, password: emailPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setEmailMessage(data.message || "Verification email sent to new address");
        setNewEmail("");
        setEmailPassword("");
      } else {
        setEmailError(data.error || "Failed to change email");
      }
    } catch (err) {
      setEmailError("Something went wrong");
    } finally {
      setEmailLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6">
        <Link href="/account" className="text-sm text-amber-600 hover:text-amber-700">
          ← Back to account
        </Link>
      </div>

      <h1 className="text-2xl font-semibold text-neutral-900">Edit Profile</h1>

      {/* Personal Information Section */}
      <section className="mt-6 rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Personal Information</h2>
        <p className="mt-1 text-sm text-neutral-600">Update your name</p>

        <form onSubmit={handleNameUpdate} className="mt-4 grid gap-4">
          {nameMessage && (
            <div className="rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {nameMessage}
            </div>
          )}
          {nameError && (
            <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
              {nameError}
            </div>
          )}

          <label className="grid gap-1 text-sm">
            <span className="text-xs font-medium text-neutral-700">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Your name"
            />
          </label>

          <button
            type="submit"
            disabled={nameLoading}
            className="w-full rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-black hover:bg-amber-400 disabled:opacity-60"
          >
            {nameLoading ? "Updating..." : "Update name"}
          </button>
        </form>
      </section>

      {/* Change Password Section */}
      <section className="mt-4 rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Change Password</h2>
        <p className="mt-1 text-sm text-neutral-600">Update your password</p>

        <form onSubmit={handlePasswordUpdate} className="mt-4 grid gap-4">
          {passwordMessage && (
            <div className="rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {passwordMessage}
            </div>
          )}
          {passwordError && (
            <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
              {passwordError}
            </div>
          )}

          <label className="grid gap-1 text-sm">
            <span className="text-xs font-medium text-neutral-700">Current password</span>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span className="text-xs font-medium text-neutral-700">New password</span>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="At least 8 characters"
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span className="text-xs font-medium text-neutral-700">Confirm new password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </label>

          <button
            type="submit"
            disabled={passwordLoading}
            className="w-full rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-black hover:bg-amber-400 disabled:opacity-60"
          >
            {passwordLoading ? "Updating..." : "Update password"}
          </button>
        </form>
      </section>

      {/* Change Email Section */}
      <section className="mt-4 rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Change Email</h2>
        <p className="mt-1 text-sm text-neutral-600">
          We'll send a verification link to your new email address
        </p>

        <form onSubmit={handleEmailChange} className="mt-4 grid gap-4">
          {emailMessage && (
            <div className="rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {emailMessage}
            </div>
          )}
          {emailError && (
            <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
              {emailError}
            </div>
          )}

          <label className="grid gap-1 text-sm">
            <span className="text-xs font-medium text-neutral-700">New email</span>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="newemail@example.com"
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span className="text-xs font-medium text-neutral-700">Confirm password</span>
            <input
              type="password"
              value={emailPassword}
              onChange={(e) => setEmailPassword(e.target.value)}
              required
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Enter your password"
            />
          </label>

          <button
            type="submit"
            disabled={emailLoading}
            className="w-full rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-black hover:bg-amber-400 disabled:opacity-60"
          >
            {emailLoading ? "Sending..." : "Change email"}
          </button>
        </form>
      </section>
    </main>
  );
}
