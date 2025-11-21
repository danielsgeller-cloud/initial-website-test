"use client";

import { FormEvent, useState } from "react";

export default function Page() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        console.error("API error", await res.text());
        setStatus("error");
        return;
      }

      setStatus("ok");
      form.reset();
    } catch (err) {
      console.error("Network error", err);
      setStatus("error");
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Pictures in Ceramic</h1>

      <h2>Order Form</h2>
      <p>Please submit your order details below.</p>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", marginTop: 20 }}>
        <label>Name</label>
        <input
          name="name"
          required
          style={{ width: "100%", marginBottom: 10 }}
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          required
          style={{ width: "100%", marginBottom: 10 }}
        />

        <label>Message</label>
        <textarea
          name="message"
          required
          style={{ width: "100%", height: 120, marginBottom: 10 }}
        />

        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send"}
        </button>
      </form>

      {status === "ok" && (
        <p style={{ marginTop: 15, color: "green" }}>Message sent.</p>
      )}
      {status === "error" && (
        <p style={{ marginTop: 15, color: "red" }}>Error sending message.</p>
      )}
    </div>
  );
}
