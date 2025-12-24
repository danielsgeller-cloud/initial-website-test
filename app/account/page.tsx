"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function AccountPage() {
  const router = useRouter();
  const { data, status } = useSession();
  const { t } = useLanguage();

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
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">{t("account_title")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-md">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">
            {t("account_profile")}
          </h2>
          <div className="space-y-3 text-sm text-neutral-700">
            <div>
              <span className="font-medium">{t("account_email")}:</span>{" "}
              <span className="text-neutral-600">{user?.email || "Unknown"}</span>
            </div>
            {user?.name && (
              <div>
                <span className="font-medium">{t("account_name")}:</span>{" "}
                <span className="text-neutral-600">{user.name}</span>
              </div>
            )}
          </div>

          <div className="mt-6">
            <Link
              href="/account/edit"
              className="inline-block rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 transition-colors"
            >
              {t("account_edit_profile")}
            </Link>
          </div>
        </div>

        {/* Order History Card */}
        <Link
          href="/account/orders"
          className="rounded-xl border border-neutral-200 bg-white p-6 shadow-md hover:shadow-lg hover:border-amber-200 transition-all group"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-amber-600 transition-colors">
                {t("account_orders")}
              </h2>
              <p className="text-sm text-neutral-600">
                {t("account_orders_desc")}
              </p>
            </div>
            <svg
              className="w-6 h-6 text-neutral-400 group-hover:text-amber-500 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div className="mt-4 text-sm font-medium text-amber-600 group-hover:text-amber-700">
            {t("account_view_orders")} →
          </div>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-md">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          {t("account_quick_actions")}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/order-form"
            className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 text-sm font-semibold text-white hover:from-amber-600 hover:to-amber-700 transition-all shadow-md hover:shadow-lg"
          >
            {t("account_new_order")}
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-lg border border-neutral-300 bg-white px-6 py-2.5 text-sm font-semibold text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 transition-all"
          >
            {t("nav_signout")}
          </button>
        </div>
      </div>
    </main>
  );
}
