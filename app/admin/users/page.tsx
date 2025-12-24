"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RoleBadge from "@/components/admin/RoleBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  emailVerified: string | null;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users?page=${page}&limit=50&search=${search}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
        setTotal(data.total);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      const res = await fetch(`/api/admin/users/${userToDelete.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchUsers(); // Refresh list
        setDeleteDialogOpen(false);
        setUserToDelete(null);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete user");
      }
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">Users</h1>
        <p className="text-sm text-neutral-600">{total} total</p>
      </div>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Search by email or name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
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
                  Email
                </th>
                <th className="border-b border-neutral-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Name
                </th>
                <th className="border-b border-neutral-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Role
                </th>
                <th className="border-b border-neutral-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Verified
                </th>
                <th className="border-b border-neutral-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Created
                </th>
                <th className="border-b border-neutral-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-neutral-100">
                  <td className="px-4 py-3 text-sm text-neutral-900">{user.email}</td>
                  <td className="px-4 py-3 text-sm text-neutral-600">{user.name || "-"}</td>
                  <td className="px-4 py-3 text-sm">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {user.emailVerified ? (
                      <span className="text-emerald-600">✓</span>
                    ) : (
                      <span className="text-neutral-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="text-amber-600 hover:text-amber-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          setUserToDelete(user);
                          setDeleteDialogOpen(true);
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="mt-6 text-center text-sm text-neutral-600">No users found</p>
          )}
        </div>
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete User"
        message={`Are you sure you want to delete ${userToDelete?.email}? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setUserToDelete(null);
        }}
      />
    </div>
  );
}
