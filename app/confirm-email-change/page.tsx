import { Suspense } from "react";
import ConfirmEmailChangeClient from "./ConfirmEmailChangeClient";

export default function ConfirmEmailChangePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-6 py-16">Loading...</div>}>
      <ConfirmEmailChangeClient />
    </Suspense>
  );
}
