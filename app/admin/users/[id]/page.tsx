"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  emailVerified: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/admin/users/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setName(data.user.name || "");
          setEmail(data.user.email);
          setRole(data.user.role);
          setEmailVerified(!!data.user.emailVerified);
        }
      } catch (err) {
        setError("Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, emailVerified }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("User updated successfully");
        setUser(data.user);
      } else {
        setError(data.error || "Failed to update user");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/admin/users");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete user");
        setDeleteDialogOpen(false);
      }
    } catch (err) {
      alert("Failed to delete user");
      setDeleteDialogOpen(false);
    }
  };

  if (loading) {
    return <p className="text-neutral-600">Loading...</p>;
  }

  if (!user) {
    return <p className="text-red-600">User not found</p>;
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/users" className="text-sm text-amber-600 hover:text-amber-700">
          ← Back to users
        </Link>
      </div>

      <h1 className="text-2xl font-semibold text-neutral-900">Edit User</h1>

      <form onSubmit={handleSave} className="mt-6 max-w-2xl space-y-6">
        {message && (
          <div className="rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {message}
          </div>
        )}

        {error && (
          <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <div className="rounded-lg border border-neutral-200 bg-white p-6">
          <div className="grid gap-4">
            <label className="grid gap-1 text-sm">
              <span className="text-xs font-medium text-neutral-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </label>

            <label className="grid gap-1 text-sm">
              <span className="text-xs font-medium text-neutral-700">Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </label>

            <label className="grid gap-1 text-sm">
              <span className="text-xs font-medium text-neutral-700">Role</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={emailVerified}
                onChange={(e) => setEmailVerified(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-amber-500 focus:ring-amber-500"
              />
              <span className="text-xs font-medium text-neutral-700">Email Verified</span>
            </label>

            <div className="text-xs text-neutral-500">
              <div>Created: {new Date(user.createdAt).toLocaleString()}</div>
              <div>Updated: {new Date(user.updatedAt).toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-black hover:bg-amber-400 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => setDeleteDialogOpen(true)}
            className="rounded-full bg-red-600 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-red-700"
          >
            Delete User
          </button>
        </div>
      </form>

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete User"
        message={`Are you sure you want to delete ${user.email}? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </div>
  );
}
