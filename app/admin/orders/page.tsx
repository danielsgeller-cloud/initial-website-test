"use client";

import { useEffect, useState } from "react";

interface Order {
  reference: string;
  customerId: string;
  paymentMethodId: string;
  depositPaymentIntentId?: string;
  depositAmountCents?: number;
  updatedAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.reference.toLowerCase().includes(search.toLowerCase()) ||
      order.customerId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">Orders</h1>
        <p className="text-sm text-neutral-600">{orders.length} total</p>
      </div>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Search by reference or customer ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>

      {loading ? (
        <p className="mt-6 text-neutral-600">Loading...</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-neutral-50">
              <tr>
                <th className="border-b border-neutral-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Reference
                </th>
                <th className="border-b border-neutral-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Customer ID
                </th>
                <th className="border-b border-neutral-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Payment Method
                </th>
                <th className="border-b border-neutral-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Deposit Amount
                </th>
                <th className="border-b border-neutral-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.reference} className="border-b border-neutral-100">
                  <td className="px-4 py-3 text-sm font-medium text-neutral-900">
                    {order.reference}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600">
                    {order.customerId}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600">
                    {order.paymentMethodId.substring(0, 20)}...
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600">
                    {order.depositAmountCents
                      ? `$${(order.depositAmountCents / 100).toFixed(2)}`
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600">
                    {new Date(order.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <p className="mt-6 text-center text-sm text-neutral-600">
              {search ? "No orders match your search" : "No orders found"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
