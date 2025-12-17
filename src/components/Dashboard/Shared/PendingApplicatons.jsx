import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";

const PendingApplications = () => {
  const [pendingLoans, setPendingLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingLoans();
  }, []);

  const fetchPendingLoans = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/loan-applications`
      );
      // Matches the "pending" status found in your MongoDB screenshot
      const pending = res.data.filter((loan) => loan.status === "pending");
      setPendingLoans(pending);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const updateData = {
        status: newStatus,
        // Assignment requirement: log approvedAt timestamp on approval
        approvedAt: newStatus === "Approved" ? new Date() : null,
      };

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/loan-applications/${id}`,
        updateData
      );

      toast.success(`Application ${newStatus} successfully!`);
      // Optimistic UI update: remove from current list
      setPendingLoans((prev) => prev.filter((loan) => loan._id !== id));
    } catch (error) {
      toast.error(error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Pending Loan Applications
        </h2>
        <p className="text-gray-500">
          Review borrower requests and take action.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
              <th className="py-4 px-6 text-left">Loan ID</th>
              <th className="text-left">Borrower Details</th>
              <th className="text-center">Requested Amount</th>
              <th className="text-center">Apply Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingLoans.map((app) => (
              <tr
                key={app._id}
                className="bg-white border border-gray-100 hover:shadow-md transition-shadow"
              >
                <td className="px-6 py-4 font-mono text-xs text-blue-600">
                  #{app._id.slice(-6).toUpperCase()}
                </td>
                <td>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-700">
                      {app.firstName} {app.lastName}
                    </span>
                    <span className="text-xs text-gray-400">
                      {app.userEmail}
                    </span>
                  </div>
                </td>
                <td className="text-center font-bold text-gray-800">
                  ${app.loanAmount?.toLocaleString()}
                </td>
                <td className="text-center text-gray-500">
                  {new Date(app.application_date).toLocaleDateString()}
                </td>
                <td className="text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      title="View"
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(app._id, "Approved")}
                      className="p-2 text-green-500 hover:bg-green-50 rounded-lg"
                      title="Approve"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(app._id, "Rejected")}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      title="Reject"
                    >
                      <FaTimes />
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

export default PendingApplications;
