"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/admin/StatCard";

interface Stats {
  totalUsers: number;
  verifiedUsers: number;
  totalOrders: number;
  recentUsers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-neutral-600">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value={stats?.totalUsers || 0} />
        <StatCard title="Verified Users" value={stats?.verifiedUsers || 0} />
        <StatCard title="Total Orders" value={stats?.totalOrders || 0} />
        <StatCard title="Recent Users (7d)" value={stats?.recentUsers || 0} />
      </div>
    </div>
  );
}
