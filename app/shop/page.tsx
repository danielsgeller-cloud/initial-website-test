"use client";

import { useCart } from "@/components/cart/CartProvider";
import { useState } from "react";
import Link from "next/link";

// Product catalog for cameo manufacturing
const PRODUCTS = [
  {
    id: "oval-small-bw",
    name: "Small Oval Cameo - B&W",
    description: "Classic black and white oval cameo, perfect for individual monuments",
    priceCents: 8500, // $85.00
    imageUrl: "/images/cameo-oval-small.jpg",
    category: "Oval",
    finish: "Black & White",
    size: "Small (2x3 inches)",
  },
  {
    id: "oval-small-color",
    name: "Small Oval Cameo - Color",
    description: "Full color oval cameo with vibrant, lifelike detail",
    priceCents: 12500, // $125.00
    imageUrl: "/images/cameo-oval-small-color.jpg",
    category: "Oval",
    finish: "Full Color",
    size: "Small (2x3 inches)",
  },
  {
    id: "oval-medium-bw",
    name: "Medium Oval Cameo - B&W",
    description: "Medium black and white oval cameo for enhanced visibility",
    priceCents: 11500, // $115.00
    imageUrl: "/images/cameo-oval-medium.jpg",
    category: "Oval",
    finish: "Black & White",
    size: "Medium (3x4 inches)",
  },
  {
    id: "oval-medium-color",
    name: "Medium Oval Cameo - Color",
    description: "Medium full color oval cameo with exceptional detail",
    priceCents: 16500, // $165.00
    imageUrl: "/images/cameo-oval-medium-color.jpg",
    category: "Oval",
    finish: "Full Color",
    size: "Medium (3x4 inches)",
  },
  {
    id: "oval-large-bw",
    name: "Large Oval Cameo - B&W",
    description: "Large black and white oval cameo for premium monuments",
    priceCents: 15500, // $155.00
    imageUrl: "/images/cameo-oval-large.jpg",
    category: "Oval",
    finish: "Black & White",
    size: "Large (4x5 inches)",
  },
  {
    id: "oval-large-color",
    name: "Large Oval Cameo - Color",
    description: "Large full color oval cameo with stunning clarity",
    priceCents: 22500, // $225.00
    imageUrl: "/images/cameo-oval-large-color.jpg",
    category: "Oval",
    finish: "Full Color",
    size: "Large (4x5 inches)",
  },
  {
    id: "rect-medium-bw",
    name: "Medium Rectangular Cameo - B&W",
    description: "Modern rectangular design in classic black and white",
    priceCents: 12000, // $120.00
    imageUrl: "/images/cameo-rect-medium.jpg",
    category: "Rectangular",
    finish: "Black & White",
    size: "Medium (3x4 inches)",
  },
  {
    id: "rect-medium-color",
    name: "Medium Rectangular Cameo - Color",
    description: "Modern rectangular design with full color finish",
    priceCents: 17000, // $170.00
    imageUrl: "/images/cameo-rect-medium-color.jpg",
    category: "Rectangular",
    finish: "Full Color",
    size: "Medium (3x4 inches)",
  },
  {
    id: "custom-quote",
    name: "Custom Shape & Size",
    description: "Custom cameo in your specified shape and dimensions",
    priceCents: 0, // Quote-based pricing
    imageUrl: "/images/cameo-custom.jpg",
    category: "Custom",
    finish: "Your Choice",
    size: "Custom",
  },
];

function money(cents: number) {
  return (cents / 100).toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export default function ShopPage() {
  const { addItem } = useCart();
  const [filter, setFilter] = useState<string>("All");
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const categories = ["All", "Oval", "Rectangular", "Custom"];

  const filteredProducts =
    filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  function handleAddToCart(product: typeof PRODUCTS[0]) {
    if (product.priceCents === 0) {
      // Custom items need to go through order form
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      priceCents: product.priceCents,
      imageUrl: product.imageUrl,
    });

    // Show "Added!" feedback
    setAddedItems(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedItems(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 2000);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-neutral-900 md:text-4xl">Shop Cameos</h1>
        <p className="mt-2 text-sm text-neutral-600 md:text-base">
          Browse our selection of high-quality ceramic cameos. Choose your size, shape, and finish.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition ${
              filter === cat
                ? "bg-amber-500 text-black"
                : "border border-neutral-200 bg-white text-neutral-700 hover:border-amber-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
          >
            {/* Product Image */}
            <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
              {product.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-neutral-400">
                  <svg
                    className="h-24 w-24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-5">
              <div className="mb-2">
                <h3 className="font-semibold text-neutral-900">{product.name}</h3>
                <p className="mt-1 text-xs text-neutral-600">{product.description}</p>
              </div>

              <div className="mb-3 space-y-1 text-xs text-neutral-500">
                <div>Size: {product.size}</div>
                <div>Finish: {product.finish}</div>
              </div>

              {/* Price and Add to Cart */}
              <div className="flex items-center justify-between gap-3">
                <div className="text-lg font-semibold text-neutral-900">
                  {product.priceCents === 0 ? "Request Quote" : money(product.priceCents)}
                </div>

                {product.priceCents === 0 ? (
                  <Link
                    href="/order-form"
                    className="rounded-full border border-amber-500 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-amber-600 transition hover:bg-amber-50"
                  >
                    Order Form
                  </Link>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-black transition hover:bg-amber-400"
                  >
                    {addedItems.has(product.id) ? "Added!" : "Add to Cart"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Volume Pricing Note */}
      <div className="mt-12 rounded-lg border border-amber-200 bg-amber-50 p-6">
        <h2 className="font-semibold text-amber-900">Volume Pricing for Monument Shops</h2>
        <p className="mt-2 text-sm text-amber-800">
          Are you a monument shop looking to order in bulk? We offer special volume pricing for
          orders of 10 or more cameos.{" "}
          <Link href="/contact" className="font-semibold underline hover:text-amber-900">
            Contact us
          </Link>{" "}
          for a custom quote and to discuss your specific needs.
        </p>
      </div>

      {/* Info Section */}
      <div className="mt-12 rounded-lg bg-neutral-50 p-6">
        <h2 className="font-semibold text-neutral-900">About Our Cameos</h2>
        <div className="mt-3 space-y-2 text-sm text-neutral-700">
          <p>
            All cameos are professionally crafted on high-quality ceramic using advanced printing
            technology for lasting durability and clarity.
          </p>
          <p>
            <strong>Black & White:</strong> Classic, timeless finish perfect for traditional
            monuments.
          </p>
          <p>
            <strong>Full Color:</strong> Vibrant, lifelike reproduction with exceptional detail and
            color accuracy.
          </p>
          <p>
            Need a custom shape or size? Use our{" "}
            <Link href="/order-form" className="font-semibold text-amber-600 hover:underline">
              Order Form
            </Link>{" "}
            to request a personalized quote.
          </p>
        </div>
      </div>
    </main>
  );
}
