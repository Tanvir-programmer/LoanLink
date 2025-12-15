import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUserEdit, FaBan, FaSearch, FaUserShield } from "react-icons/fa";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  const updateUserRole = async (id, newRole) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/role/${id}`,
        { role: newRole }
      );
      if (res.status === 200) {
        toast.success(`User updated to ${newRole}`);
        fetchUsers();
      }
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading users...</div>;

  return (
    <div className="p-6 bg-white min-h-screen rounded-xl shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Manage Users
          </h2>
          <p className="text-gray-500">
            Admin control panel for user roles and permissions.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-100 rounded-xl">
        <table className="table w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase">
                User Info
              </th>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase">
                Role
              </th>
              <th className="text-center text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="text-center text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : user.role === "manager"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="text-center">
                  <div
                    className={`badge badge-sm ${
                      user.status === "suspended"
                        ? "badge-error"
                        : "badge-success"
                    } gap-1`}
                  >
                    {user.status || "active"}
                  </div>
                </td>
                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() =>
                        updateUserRole(
                          user._id,
                          user.role === "borrower" ? "manager" : "borrower"
                        )
                      }
                      className="btn btn-sm btn-ghost text-indigo-600"
                      title="Change Role"
                    >
                      <FaUserShield size={18} />
                    </button>
                    <button
                      className="btn btn-sm btn-ghost text-red-500"
                      title="Suspend User"
                    >
                      <FaBan size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
