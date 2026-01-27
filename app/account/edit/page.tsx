"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function EditProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const { t } = useLanguage();

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
        setNameMessage(t("account_name_updated"));
        // Update the session to reflect the new name immediately
        await update({ name });
      } else {
        setNameError(data.error || t("account_name_failed"));
      }
    } catch (err) {
      setNameError(t("account_error"));
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
      setPasswordError(t("account_passwords_no_match"));
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
        setPasswordMessage(t("account_password_updated"));
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordError(data.error || t("account_password_failed"));
      }
    } catch (err) {
      setPasswordError(t("account_error"));
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
        setEmailMessage(data.message || t("account_email_sent"));
        setNewEmail("");
        setEmailPassword("");
      } else {
        setEmailError(data.error || t("account_email_failed"));
      }
    } catch (err) {
      setEmailError(t("account_error"));
    } finally {
      setEmailLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p>{t("loading")}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6">
        <Link href="/account" className="text-sm text-amber-600 hover:text-amber-700">
          {t("account_back")}
        </Link>
      </div>

      <h1 className="text-2xl font-semibold text-neutral-900">{t("account_edit_title")}</h1>

      {/* Personal Information Section */}
      <section className="mt-6 rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">{t("account_personal_info")}</h2>
        <p className="mt-1 text-sm text-neutral-600">{t("account_update_name_desc")}</p>

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
            <span className="text-xs font-medium text-neutral-700">{t("account_name_label")}</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder={t("account_name_placeholder")}
            />
          </label>

          <button
            type="submit"
            disabled={nameLoading}
            className="w-full rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-black hover:bg-amber-400 disabled:opacity-60"
          >
            {nameLoading ? t("account_updating") : t("account_update_name")}
          </button>
        </form>
      </section>

      {/* Change Password Section */}
      <section className="mt-4 rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">{t("account_change_password")}</h2>
        <p className="mt-1 text-sm text-neutral-600">{t("account_update_password_desc")}</p>

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
            <span className="text-xs font-medium text-neutral-700">{t("account_current_password")}</span>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span className="text-xs font-medium text-neutral-700">{t("account_new_password")}</span>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder={t("account_password_min")}
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span className="text-xs font-medium text-neutral-700">{t("account_confirm_new_password")}</span>
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
            {passwordLoading ? t("account_updating") : t("account_update_password")}
          </button>
        </form>
      </section>

      {/* Change Email Section */}
      <section className="mt-4 rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">{t("account_change_email")}</h2>
        <p className="mt-1 text-sm text-neutral-600">
          {t("account_email_verification_desc")}
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
            <span className="text-xs font-medium text-neutral-700">{t("account_new_email")}</span>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder={t("account_new_email_placeholder")}
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span className="text-xs font-medium text-neutral-700">{t("account_confirm_password_label")}</span>
            <input
              type="password"
              value={emailPassword}
              onChange={(e) => setEmailPassword(e.target.value)}
              required
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder={t("account_enter_password")}
            />
          </label>

          <button
            type="submit"
            disabled={emailLoading}
            className="w-full rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-black hover:bg-amber-400 disabled:opacity-60"
          >
            {emailLoading ? t("account_sending") : t("account_change_email_btn")}
          </button>
        </form>
      </section>
    </main>
  );
}
