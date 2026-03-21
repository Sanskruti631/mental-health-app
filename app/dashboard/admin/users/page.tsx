"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import {
  UserPlus,
  Search,
  Edit2,
  Trash2,
  X
} from "lucide-react";

export default function App() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });
  const [editUser, setEditUser] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();

  // ✅ Load users from DB
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  // ✅ Delete user (DB)
  const handleDelete = async (id: string) => {
    await fetch("/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    fetchUsers(); // refresh
  };

  // ✅ Add user (DB)
  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    setNewUser({ name: "", email: "", role: "User" });
    setIsModalOpen(false);

    fetchUsers(); // refresh
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-900">
      <div className="max-w-6xl mx-auto">
     <div className="flex items-center justify-between mb-8">

  {/* LEFT SIDE */}
  <div className="flex items-center gap-3">

    {/* Back Button */}
    <button
      onClick={() => router.back()}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-100 hover:bg-emerald-200 transition"
    >
      <ArrowLeft size={18} className="text-emerald-600" />
    </button>

    {/* Title */}
    <div>
      <h1 className="text-3xl font-bold">User Management</h1>
      <p className="text-gray-500 text-sm">
        Manage your team members and their account permissions.
      </p>
    </div>

  </div>

  {/* RIGHT SIDE BUTTON */}
  <button
    onClick={() => setIsModalOpen(true)}
    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm"
  >
    <UserPlus size={18} />
    Add User
  </button>

</div>


        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500">Total Users</p>
            <h2 className="text-2xl font-bold">{users.length}</h2>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500">Active Users</p>
            <h2 className="text-2xl font-bold text-emerald-600">
              {users.filter(u => u.status === "Active").length}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500">Admins</p>
            <h2 className="text-2xl font-bold text-emerald-600">
              {users.filter(u => u.role === "Admin").length}
            </h2>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

          {/* Search */}
          <div className="p-4 border-b bg-gray-50">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 flex items-center gap-3">
                    <img src={user.avatar} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700 font-medium">
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="flex items-center gap-2 text-sm">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          user.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-yellow-400"
                        }`}
                      />
                      {user.status}
                    </span>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <button  onClick={() => {
    setEditUser(user);
    setIsEditMode(true);
    setIsModalOpen(true);
  }}
  className="p-2 hover:bg-emerald-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl w-full max-w-md border shadow-md">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold text-lg">Add User</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <input
                required
                placeholder="Name"
                className="w-full p-2 border rounded"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <input
                required
                placeholder="Email"
                className="w-full p-2 border rounded"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <select
                className="w-full p-2 border rounded"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              >
                <option>User</option>
                <option>Admin</option>
              </select>

              <button className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700">
                Create User
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
