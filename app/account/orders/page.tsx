"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Order {
  id: string;
  shape: string;
  size: string;
  finish: string;
  mounting: string | null;
  combinePhotos: boolean;
  proofOption: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  cemetery: string | null;
  shipToAddress: string | null;
  neededByDate: string | null;
  additionalNotes: string | null;
  basePrice: number;
  mountingPrice: number;
  proofPrice: number;
  baseFee: number;
  combineAdjust: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrderHistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchOrders();
    }
  }, [status]);

  async function fetchOrders() {
    try {
      setLoading(true);
      const res = await fetch("/api/orders");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch orders");
      }

      setOrders(data.orders);
    } catch (err: any) {
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  if (status === "loading" || loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Order History</h1>
            <p className="mt-2 text-neutral-600">
              View and track all your orders
            </p>
          </div>
          <Link
            href="/order-form"
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            New Order
          </Link>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <svg
              className="mx-auto h-16 w-16 text-neutral-400"
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
            <h3 className="mt-4 text-lg font-semibold text-neutral-900">
              No orders yet
            </h3>
            <p className="mt-2 text-neutral-600">
              Start by creating your first order
            </p>
            <Link
              href="/order-form"
              className="mt-6 inline-block px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
            >
              Create Your First Order
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-md border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-neutral-900">
                        Order #{order.id.slice(0, 8)}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-neutral-600">
                          <span className="font-medium">Shape:</span> {order.shape}
                        </p>
                        <p className="text-neutral-600">
                          <span className="font-medium">Size:</span> {order.size}
                        </p>
                        <p className="text-neutral-600">
                          <span className="font-medium">Finish:</span>{" "}
                          {order.finish === "color" ? "Color" : "Black & White"}
                        </p>
                        {order.mounting && (
                          <p className="text-neutral-600">
                            <span className="font-medium">Mounting:</span>{" "}
                            {order.mounting}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-neutral-600">
                          <span className="font-medium">Date:</span>{" "}
                          {formatDate(order.createdAt)}
                        </p>
                        <p className="text-neutral-600">
                          <span className="font-medium">Total:</span> $
                          {order.totalPrice.toFixed(2)}
                        </p>
                        {order.neededByDate && (
                          <p className="text-neutral-600">
                            <span className="font-medium">Needed by:</span>{" "}
                            {order.neededByDate}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setSelectedOrder(
                        selectedOrder?.id === order.id ? null : order
                      )
                    }
                    className="ml-4 text-amber-600 hover:text-amber-700 font-medium text-sm"
                  >
                    {selectedOrder?.id === order.id ? "Hide Details" : "View Details"}
                  </button>
                </div>

                {/* Expanded Details */}
                {selectedOrder?.id === order.id && (
                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <h4 className="font-semibold text-neutral-900 mb-3">
                      Order Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <p className="text-neutral-600">
                          <span className="font-medium">Customer Name:</span>{" "}
                          {order.customerName}
                        </p>
                        <p className="text-neutral-600">
                          <span className="font-medium">Email:</span>{" "}
                          {order.customerEmail}
                        </p>
                        {order.customerPhone && (
                          <p className="text-neutral-600">
                            <span className="font-medium">Phone:</span>{" "}
                            {order.customerPhone}
                          </p>
                        )}
                        {order.cemetery && (
                          <p className="text-neutral-600">
                            <span className="font-medium">Cemetery:</span>{" "}
                            {order.cemetery}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        {order.shipToAddress && (
                          <p className="text-neutral-600">
                            <span className="font-medium">Ship to:</span>{" "}
                            {order.shipToAddress}
                          </p>
                        )}
                        {order.combinePhotos && (
                          <p className="text-neutral-600">
                            <span className="font-medium">Combining photos:</span> Yes
                          </p>
                        )}
                        {order.proofOption && (
                          <p className="text-neutral-600">
                            <span className="font-medium">Proof option:</span>{" "}
                            {order.proofOption}
                          </p>
                        )}
                      </div>
                    </div>

                    {order.additionalNotes && (
                      <div className="mt-4">
                        <p className="font-medium text-neutral-900">
                          Additional Notes:
                        </p>
                        <p className="mt-1 text-neutral-600 text-sm">
                          {order.additionalNotes}
                        </p>
                      </div>
                    )}

                    {/* Price Breakdown */}
                    <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                      <h5 className="font-semibold text-neutral-900 mb-2">
                        Price Breakdown
                      </h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Base Price:</span>
                          <span className="text-neutral-900">
                            ${order.basePrice.toFixed(2)}
                          </span>
                        </div>
                        {order.mountingPrice > 0 && (
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Mounting:</span>
                            <span className="text-neutral-900">
                              ${order.mountingPrice.toFixed(2)}
                            </span>
                          </div>
                        )}
                        {order.proofPrice > 0 && (
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Proof:</span>
                            <span className="text-neutral-900">
                              ${order.proofPrice.toFixed(2)}
                            </span>
                          </div>
                        )}
                        {order.combineAdjust > 0 && (
                          <div className="flex justify-between">
                            <span className="text-neutral-600">
                              Combine Photos Adjustment:
                            </span>
                            <span className="text-neutral-900">
                              ${order.combineAdjust.toFixed(2)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Base Fee:</span>
                          <span className="text-neutral-900">
                            ${order.baseFee.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-neutral-200 font-semibold">
                          <span className="text-neutral-900">Total:</span>
                          <span className="text-amber-600">
                            ${order.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Reorder Button */}
                    <div className="mt-4">
                      <Link
                        href={`/order-form?reorder=${order.id}`}
                        className="inline-block px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
                      >
                        Reorder
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back to Account */}
      <div className="mt-8">
        <Link
          href="/account"
          className="text-amber-600 hover:text-amber-700 font-medium"
        >
          ← Back to Account
        </Link>
      </div>
    </main>
  );
}
