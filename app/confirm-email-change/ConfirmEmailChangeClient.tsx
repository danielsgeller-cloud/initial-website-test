"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function ConfirmEmailChangeClient() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"working" | "success" | "error">("working");
  const [message, setMessage] = useState("");

  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (!token || !userId) {
      setStatus("error");
      setMessage(t("confirm_email_failed"));
      return;
    }

    const confirmEmailChange = async () => {
      try {
        const res = await fetch("/api/auth/confirm-email-change", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, userId }),
        });

        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(data.message || t("confirm_email_success"));
        } else {
          setStatus("error");
          setMessage(data.error || t("confirm_email_failed"));
        }
      } catch (err) {
        setStatus("error");
        setMessage(t("confirm_email_failed"));
      }
    };

    confirmEmailChange();
  }, [token, userId, t]);

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold text-neutral-900">{t("confirm_email_title")}</h1>

      <div className="mt-6">
        {status === "working" && (
          <div className="rounded-md border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
            {t("confirm_email_verifying")}
          </div>
        )}

        {status === "success" && (
          <div className="rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {message}
          </div>
        )}

        {status === "error" && (
          <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
            {message}
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-sm">
        {status === "success" ? (
          <Link href="/account" className="text-amber-600 hover:text-amber-700">
            {t("confirm_email_login")}
          </Link>
        ) : (
          <Link href="/account/edit" className="text-amber-600 hover:text-amber-700">
            {t("account_back")}
          </Link>
        )}
      </div>
    </main>
  );
}
