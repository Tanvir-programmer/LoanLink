import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaFilter } from "react-icons/fa";

const LoanApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/loan-applications`
      );

      setApplications(res.data);
      setFilteredApps(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load loan applications");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (status) => {
    setFilterStatus(status);

    if (status === "all") {
      setFilteredApps(applications);
    } else {
      const filtered = applications.filter((app) => app.status === status);
      setFilteredApps(filtered);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Loan Applications
          </h2>
          <p className="text-gray-500 text-sm">
            Review and monitor all borrower submissions
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border">
          <FaFilter className="text-gray-400 ml-2" />
          <select
            className="bg-transparent outline-none text-sm font-medium text-gray-700 pr-4 cursor-pointer"
            value={filterStatus}
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-100 rounded-xl">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
              <th className="py-4 px-6">Loan ID</th>
              <th>User</th>
              <th>Loan Title</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-6 font-mono text-xs text-indigo-600">
                    #{app._id.slice(-8).toUpperCase()}
                  </td>

                  <td>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800">
                        {app.firstName} {app.lastName}
                      </span>
                      <span className="text-xs text-gray-400">
                        {app.userEmail}
                      </span>
                    </div>
                  </td>

                  <td className="text-sm text-gray-600">
                    {app.loanTitle || "N/A"}
                  </td>

                  <td className="text-center font-bold text-gray-700">
                    ${Number(app.loanAmount).toLocaleString()}
                  </td>

                  <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        app.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : app.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-circle btn-ghost text-indigo-500 hover:bg-indigo-50"
                      title="View Application"
                    >
                      <FaEye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-16 text-gray-400">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanApplications;
