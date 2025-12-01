"use client";

import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.log("Client received:", data);

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Unknown error");
        return;
      }

      console.log("SES accepted message with ID:", data.messageId);
      setStatus("sent");
      form.reset();

    } catch (err: any) {
      console.error("Client error:", err);
      setErrorMessage(err?.message ?? "Unknown client error");
      setStatus("error");
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Contact Pictures in Ceramic
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="px-4 py-2 rounded bg-black text-white"
        >
          {status === "sending" ? "Sending..." : "Send"}
        </button>

        {status === "sent" && (
          <p className="text-green-600 text-sm mt-2">
            Email accepted by SES. Check your inbox.
          </p>
        )}

        {status === "error" && (
          <p className="text-red-600 text-sm mt-2">
            Failed to send: {errorMessage}
          </p>
        )}
      </form>
    </main>
  );
}
