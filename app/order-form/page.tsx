"use client";

import { FormEvent, useMemo, useState } from "react";

type Finish = "bw" | "color";

type PriceOption = {
  code: string;
  label: string;
  size: string;
  bw: number;
  color: number;
  mountingNote?: string;
};

type ShapeGroup = {
  id: string;
  label: string;
  description: string;
  options: PriceOption[];
};

const SHAPES: ShapeGroup[] = [
  {
    id: "oval",
    label: "Oval",
    description: "Classic oval medallions for most headstones and mausoleums.",
    options: [
      { code: "1L", label: "#1L – 8\" x 10\"", size: "8 x 10", bw: 220, color: 420 },
      { code: "1a", label: "#1a – 5\" x 7\"", size: "5 x 7", bw: 125, color: 220 },
      { code: "1", label: "#1 – 6 1/8\" x 4 3/8\"", size: "6 1/8 x 4 3/8", bw: 104, color: 197 },
      { code: "2", label: "#2 – 5 1/8\" x 3 7/8\"", size: "5 1/8 x 3 7/8", bw: 90, color: 155 },
      { code: "3", label: "#3 – 4 1/4\" x 3 3/8\"", size: "4 1/4 x 3 3/8", bw: 71, color: 115 },
      { code: "4", label: "#4 – 3 1/2\" x 2 3/4\"", size: "3 1/2 x 2 3/4", bw: 63, color: 107 },
      { code: "5", label: "#5 – 2 7/8\" x 2 3/8\"", size: "2 7/8 x 2 3/8", bw: 60, color: 102 },
    ],
  },
  {
    id: "rectangle",
    label: "Rectangle",
    description: "Rectangular medallions for larger photos or inscriptions.",
    options: [
      {
        code: "6L",
        label: "#6L – 8\" x 10\" (tape only)",
        size: "8 x 10",
        bw: 220,
        color: 420,
        mountingNote: "Tape only. Mounting tape add $18.00.",
      },
      { code: "6a", label: "#6a – 5\" x 7\"", size: "5 x 7", bw: 125, color: 220 },
      { code: "6", label: "#6 – 6 1/8\" x 4 3/8\"", size: "6 1/8 x 4 3/8", bw: 104, color: 197 },
      { code: "7", label: "#7 – 5 1/8\" x 3 7/8\"", size: "5 1/8 x 3 7/8", bw: 90, color: 155 },
      { code: "8", label: "#8 – 4 1/4\" x 3 3/8\"", size: "4 1/4 x 3 3/8", bw: 71, color: 115 },
      { code: "9", label: "#9 – 3 1/2\" x 2 3/4\"", size: "3 1/2 x 2 3/4", bw: 63, color: 107 },
      { code: "9a", label: "#9a – 2 7/8\" x 2 3/8\"", size: "2 7/8 x 2 3/8", bw: 60, color: 102 },
    ],
  },
  {
    id: "heart",
    label: "Heart",
    description: "Heart-shaped medallion for especially personal memorials.",
    options: [
      {
        code: "10",
        label: "#10 – 3 1/2\" x 3 3/4\"",
        size: "3 1/2 x 3 3/4",
        bw: 71,
        color: 120,
        mountingNote: "Fastener or tape add $18.00.",
      },
    ],
  },
  {
    id: "round",
    label: "Round",
    description: "Round medallions suited for certain monuments and plaques.",
    options: [
      {
        code: "R1",
        label: "#R1 – 2 1/2\"",
        size: "2 1/2",
        bw: 63,
        color: 107,
        mountingNote: "Tape only. Mounting tape add $18.00.",
      },
      {
        code: "R2",
        label: "#R2 – 2\"",
        size: "2",
        bw: 60,
        color: 102,
        mountingNote: "Tape only. Mounting tape add $18.00.",
      },
    ],
  },
  {
    id: "additional-oval",
    label: "Additional oval sizes",
    description: "Additional oval sizes from the wholesale list.",
    options: [
      {
        code: "M2",
        label: "M2 – 3 1/2\" x 3 3/4\"",
        size: "3 1/2 x 3 3/4",
        bw: 115,
        color: 155,
        mountingNote: "Tape only. Mounting tape add $18.00.",
      },
      {
        code: "M3",
        label: "M3 – 3 3/4\" x 3 1/8\"",
        size: "3 3/4 x 3 1/8",
        bw: 71,
        color: 115,
        mountingNote: "Tape only. Mounting tape add $18.00.",
      },
      {
        code: "M5",
        label: "M5 – 2 3/8\" x 3 1/4\"",
        size: "2 3/8 x 3 1/4",
        bw: 63,
        color: 107,
        mountingNote: "Tape only. Mounting tape add $18.00.",
      },
    ],
  },
];

function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export default function OrderFormPage() {
  const [shapeId, setShapeId] = useState<string>("oval");
  const [sizeCode, setSizeCode] = useState<string>("1");
  const [finish, setFinish] = useState<Finish>("color");
  const [mounting, setMounting] = useState<string>("none");
  const [combinePhotos, setCombinePhotos] = useState<boolean>(false);
  const [proof, setProof] = useState<string>("none");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [dealerType, setDealerType] = useState<"dealer" | "individual">(
    "dealer",
  );
  const [cemetery, setCemetery] = useState<string>("");
  const [shipTo, setShipTo] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const selectedShape = useMemo(
    () => SHAPES.find((s) => s.id === shapeId) ?? SHAPES[0],
    [shapeId],
  );

  const selectedOption = useMemo(() => {
    return (
      selectedShape.options.find((o) => o.code === sizeCode) ??
      selectedShape.options[0]
    );
  }, [selectedShape, sizeCode]);

  const basePrice = finish === "color" ? selectedOption.color : selectedOption.bw;

  const totalRange = useMemo<{ min: number; max: number }>(() => {
    let min = basePrice;
    let max = basePrice;

    // Mounting hardware or tape
    if (mounting === "tape" || mounting === "fastener") {
      min += 18;
      max += 18;
    }

    // Printed proof
    if (proof === "printed") {
      min += 20;
      max += 20;
    }

    // Shipping per order
    min += 9;
    max += 9;

    // Combining multiple originals – only guaranteed as an upper bound
    if (combinePhotos) {
      max += basePrice * 0.5;
    }

    // Additional allowance for retouching / complex work on the high end
    max += basePrice * 0.25;

    return {
      min: Math.round(min),
      max: Math.round(max),
    };
  }, [basePrice, mounting, combinePhotos, proof]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    setStatusMessage("");

    try {
      const messageLines = [
        "New cameo order request from website:",
        "",
        `Customer name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : "",
        dealerType === "dealer"
          ? "Customer type: Monument dealer / trade"
          : "Customer type: Individual / family",
        cemetery ? `Cemetery / location: ${cemetery}` : "",
        shipTo ? `Ship to address: ${shipTo}` : "",
        deadline ? `Needed by: ${deadline}` : "",
        "",
        "Requested configuration:",
        `Shape group: ${selectedShape.label}`,
        `Size / code: ${selectedOption.label}`,
        `Finish: ${finish === "color" ? "Color" : "Black & white"}`,
        `Base price from list: $${basePrice.toFixed(2)}`,
        totalRange
          ? `Estimated total range (including shipping and common extras): ${formatCurrency(
              totalRange.min,
            )} – ${formatCurrency(totalRange.max)}`
          : "",
        mounting !== "none" ? `Mounting requested: ${mounting}` : "Mounting: not specified",
        selectedOption.mountingNote
          ? `Wholesale mounting note: ${selectedOption.mountingNote}`
          : "",
        combinePhotos
          ? "Combine multiple originals on same medallion: YES (add 50% of listed price)."
          : "Combine multiple originals: No.",
        proof === "email"
          ? "Proof requested: Email proof (no charge)."
          : proof === "printed"
            ? "Proof requested: Printed proof (add $20.00)."
            : "Proof requested: No proof requested.",
        "",
        "Pricing reminders from wholesale sheet:",
        "- Sizes or shapes other than those listed can be provided, call for details.",
        "- Shipping: add $9.00 per order shipped, regardless of number of units.",
        "- All orders typically ship within three weeks.",
        "",
        "Additional notes from customer:",
        notes || "(none)",
      ].filter(Boolean);

      const body = {
        name,
        email,
        message: messageLines.join("\n"),
      };

      const res = await fetch("/api/contact-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Server error");
      }

      setStatus("success");
      setStatusMessage(
        "Thank you. Your order request has been sent. You will receive a confirmation by email.",
      );
    } catch (err: any) {
      setStatus("error");
      setStatusMessage(
        err?.message || "There was a problem sending your order request.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-neutral-50 pb-16 pt-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Hero / intro */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-neutral-900 md:text-4xl">
              Order an enamel photo cameo
            </h1>
            <p className="mt-4 text-sm text-neutral-600 md:text-base">
              Use this form to build your cameo order using the wholesale price
              list. After you submit, we will review your selections, confirm
              pricing, and contact you with proofs and shipping details.
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-600">
              <li>Enamel medallions on copper base with durable outdoor finish.</li>
              <li>Headstones, mausoleums, home memorials, and custom projects.</li>
              <li>Trade work for monument dealers and direct orders from families.</li>
            </ul>
            <p className="mt-4 text-xs text-neutral-500">
              Final price depends on image quality, color or black and white,
              complexity of retouching, and installation details. The range
              below is an estimate based on the wholesale sheet.
            </p>
          </div>

          {/* Summary card */}
          <aside className="rounded-2xl bg-white p-5 shadow-sm shadow-neutral-200">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
              Selected configuration
            </h2>
            <div className="mt-4 space-y-2 text-sm text-neutral-700">
              <p>
                <span className="font-medium">Shape:</span> {selectedShape.label}
              </p>
              <p>
                <span className="font-medium">Size / code:</span>{" "}
                {selectedOption.label}
              </p>
              <p>
                <span className="font-medium">Finish:</span>{" "}
                {finish === "color" ? "Color" : "Black & white"}
              </p>
              <p>
                <span className="font-medium">Base wholesale price:</span>{" "}
                <span className="font-semibold text-amber-700">
                  ${basePrice.toFixed(2)}
                </span>
              </p>
              {combinePhotos && (
                <p className="text-xs text-neutral-600">
                  Combining separate originals on one cameo: add 50% of listed
                  price for same size and finish.
                </p>
              )}
              {selectedOption.mountingNote && (
                <p className="text-xs text-neutral-600">
                  Mounting: {selectedOption.mountingNote}
                </p>
              )}
              <p className="mt-2 text-xs text-neutral-500">
                Shipping from sheet: add $9.00 per order shipped. All orders
                typically ship within three weeks.
              </p>
            </div>
          </aside>
        </section>

        {/* Form */}
        <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm shadow-neutral-200 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Section 1: Customer info */}
            <fieldset className="grid gap-6 md:grid-cols-2">
              <legend className="mb-1 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Customer information
              </legend>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-medium text-neutral-700">
                  I am a
                </label>
                <div className="mt-1 flex flex-wrap gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => setDealerType("dealer")}
                    className={`rounded-full border px-3 py-1 ${
                      dealerType === "dealer"
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-neutral-300 text-neutral-700"
                    }`}
                  >
                    Monument dealer / trade
                  </button>
                  <button
                    type="button"
                    onClick={() => setDealerType("individual")}
                    className={`rounded-full border px-3 py-1 ${
                      dealerType === "individual"
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-neutral-300 text-neutral-700"
                    }`}
                  >
                    Individual / family
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">
                  Name*
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">
                  Email*
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">
                  Phone
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">
                  Cemetery / location (optional)
                </label>
                <input
                  value={cemetery}
                  onChange={(e) => setCemetery(e.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-medium text-neutral-700">
                  Ship to address (optional)
                </label>
                <textarea
                  value={shipTo}
                  onChange={(e) => setShipTo(e.target.value)}
                  rows={2}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">
                  Date needed (optional)
                </label>
                <input
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  placeholder="For example: three weeks from now"
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </fieldset>

            {/* Section 2: Shape, size, finish */}
            <fieldset className="space-y-6">
              <legend className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Cameo details
              </legend>

              {/* Shape selection */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-neutral-700">
                  Shape group
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  {SHAPES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setShapeId(s.id);
                        setSizeCode(s.options[0].code);
                      }}
                      className={`rounded-full border px-3 py-1 ${
                        s.id === shapeId
                          ? "border-amber-500 bg-amber-50 text-amber-700"
                          : "border-neutral-300 text-neutral-700"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-neutral-500">
                  {selectedShape.description}
                </p>
              </div>

              {/* Size selection */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-neutral-700">
                  Size / catalog number
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  {selectedShape.options.map((o) => (
                    <label
                      key={o.code}
                      className={`cursor-pointer rounded-md border px-3 py-2 text-sm shadow-sm ${
                        o.code === sizeCode
                          ? "border-amber-500 bg-amber-50"
                          : "border-neutral-200 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="sizeCode"
                        value={o.code}
                        checked={sizeCode === o.code}
                        onChange={() => setSizeCode(o.code)}
                        className="mr-2 align-middle"
                      />
                      <span className="font-medium">{o.label}</span>
                      <span className="mt-1 block text-xs text-neutral-500">
                        B/W ${o.bw.toFixed(2)} · Color ${o.color.toFixed(2)}
                      </span>
                      {o.mountingNote && (
                        <span className="mt-1 block text-[11px] text-neutral-500">
                          {o.mountingNote}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Finish */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-neutral-700">Finish</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => setFinish("color")}
                    className={`rounded-full border px-3 py-1 ${
                      finish === "color"
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-neutral-300 text-neutral-700"
                    }`}
                  >
                    Color
                  </button>
                  <button
                    type="button"
                    onClick={() => setFinish("bw")}
                    className={`rounded-full border px-3 py-1 ${
                      finish === "bw"
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-neutral-300 text-neutral-700"
                    }`}
                  >
                    Black & white
                  </button>
                </div>
              </div>

              {/* Mounting and extras */}
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-neutral-700">
                    Mounting
                  </p>
                  <select
                    value={mounting}
                    onChange={(e) => setMounting(e.target.value)}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="none">Not specified</option>
                    <option value="tape">Mounting tape (add $18.00)</option>
                    <option value="fastener">
                      Fastener / hardware (add $18.00)
                    </option>
                  </select>
                  <p className="text-[11px] text-neutral-500">
                    For sizes marked “tape only,” we will use tape mounting.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-neutral-700">
                    Combine photos
                  </p>
                  <label className="flex items-center gap-2 text-sm text-neutral-700">
                    <input
                      type="checkbox"
                      checked={combinePhotos}
                      onChange={(e) => setCombinePhotos(e.target.checked)}
                    />
                    Combine two or more originals on the same cameo
                  </label>
                  <p className="text-[11px] text-neutral-500">
                    Wholesale sheet: add 50% of listed price for same size and
                    finish when combining separate photos.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-neutral-700">Proof</p>
                  <select
                    value={proof}
                    onChange={(e) => setProof(e.target.value)}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="none">No proof needed</option>
                    <option value="email">Email proof (no charge)</option>
                    <option value="printed">Printed proof (add $20.00)</option>
                  </select>
                </div>
              </div>
            </fieldset>

            {/* Section 3: Extra notes */}
            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Additional information
              </legend>
              <p className="text-xs text-neutral-600">
                Use this area for photo notes (for example, “remove background,”
                “adjust color,” or “use person from second photo”) or any other
                details that affect the artwork.
              </p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </fieldset>

            {/* Estimated total range */}
            <div className="rounded-md border border-dashed border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-800">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Estimated total range
              </p>
              <p className="mt-1 text-lg font-semibold text-amber-700">
                {formatCurrency(totalRange.min)} – {formatCurrency(totalRange.max)}
              </p>
              <p className="mt-1 text-xs text-neutral-600">
                This range is based on the wholesale price list plus typical
                extras (mounting, printed proofs, and shipping). Final price
                will be confirmed after we review your photos, image quality,
                and any complex retouching.
              </p>
            </div>

            {/* Submit */}
            <div className="flex flex-col gap-3 border-t border-neutral-200 pt-4 md:flex-row md:items-center md:justify-between">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-full bg-amber-500 px-8 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-md hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending order request..." : "Submit order request"}
              </button>
              <p className="text-xs text-neutral-500">
                After we receive your form, we will email you with next steps,
                including how to upload or mail your photographs.
              </p>
            </div>

            {status && (
              <div
                className={`rounded-md border px-3 py-2 text-sm ${
                  status === "success"
                    ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                    : "border-red-300 bg-red-50 text-red-800"
                }`}
              >
                {statusMessage}
              </div>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}