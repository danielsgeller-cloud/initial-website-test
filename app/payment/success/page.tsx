export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Deposit received</h1>
      <p className="mt-4 text-neutral-700">
        Thank you. Your deposit payment was successful.
      </p>
      {searchParams?.session_id && (
        <p className="mt-2 text-sm text-neutral-500">
          Session: {searchParams.session_id}
        </p>
      )}
    </main>
  );
}
