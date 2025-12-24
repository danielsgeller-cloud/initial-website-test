"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ConfirmEmailChangeClient() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"working" | "success" | "error">("working");
  const [message, setMessage] = useState("");

  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (!token || !userId) {
      setStatus("error");
      setMessage("Invalid confirmation link");
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
          setMessage(data.message || "Email updated successfully");
        } else {
          setStatus("error");
          setMessage(data.error || "Failed to confirm email change");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Something went wrong");
      }
    };

    confirmEmailChange();
  }, [token, userId]);

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold text-neutral-900">Email Confirmation</h1>

      <div className="mt-6">
        {status === "working" && (
          <div className="rounded-md border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
            Confirming your new email address...
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
            Go to your account
          </Link>
        ) : (
          <Link href="/account/edit" className="text-amber-600 hover:text-amber-700">
            Back to edit profile
          </Link>
        )}
      </div>
    </main>
  );
}
