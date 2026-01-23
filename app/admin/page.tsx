"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/admin/StatCard";
import Link from "next/link";

interface Stats {
  totalUsers: number;
  verifiedUsers: number;
  totalOrders: number;
  recentUsers: number;
}

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  emailVerified: string | null;
  createdAt: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  shape: string;
  size: string;
  totalPrice: number;
  status: string;
  imageUrls: string[];
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "orders">("overview");
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, usersRes, ordersRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/users"),
          fetch("/api/orders"),
        ]);

        if (statsRes.ok) {
          const data = await statsRes.json();
          setStats(data);
        }

        if (usersRes.ok) {
          const data = await usersRes.json();
          setUsers(data.users || []);
        }

        if (ordersRes.ok) {
          const data = await ordersRes.json();
          setOrders(data.orders || []);
        }
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-neutral-600">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="mt-6 border-b border-neutral-200">
        <nav className="-mb-px flex gap-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
              activeTab === "overview"
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
              activeTab === "users"
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
            }`}
          >
            Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
              activeTab === "orders"
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
            }`}
          >
            Orders ({orders.length})
          </button>
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Users" value={stats?.totalUsers || 0} />
            <StatCard title="Verified Users" value={stats?.verifiedUsers || 0} />
            <StatCard title="Total Orders" value={stats?.totalOrders || 0} />
            <StatCard title="Recent Users (7d)" value={stats?.recentUsers || 0} />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Recent Users */}
            <div className="rounded-lg border border-neutral-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-neutral-900">Recent Users</h2>
              <div className="mt-4 space-y-3">
                {users.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center justify-between border-b border-neutral-100 pb-2">
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{user.email}</p>
                      <p className="text-xs text-neutral-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        user.emailVerified
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {user.emailVerified ? "Verified" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="rounded-lg border border-neutral-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-neutral-900">Recent Orders</h2>
              <div className="mt-4 space-y-3">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="border-b border-neutral-100 pb-2">
                    <p className="text-sm font-medium text-neutral-900">{order.customerName}</p>
                    <p className="text-xs text-neutral-600">
                      {order.shape} · {order.size} · ${order.totalPrice}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="mt-6">
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-600">
                      {user.name || "—"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          user.role === "ADMIN"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          user.emailVerified
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {user.emailVerified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="mt-6">
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-neutral-900">
                      {order.customerName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-600">
                      {order.customerEmail}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {order.shape} · {order.size}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-neutral-900">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          order.status === "completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : order.status === "processing"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
