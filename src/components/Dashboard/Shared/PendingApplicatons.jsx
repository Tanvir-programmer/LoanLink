import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";

const PendingApplications = () => {
  const [pendingLoans, setPendingLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. New State for the Modal
  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => {
    fetchPendingLoans();
  }, []);

  const fetchPendingLoans = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/loan-applications`,
      );
      const pending = res.data.filter((loan) => loan.status === "pending");
      setPendingLoans(pending);
    } catch (error) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const updateData = {
        status: newStatus,
        approvedAt: newStatus === "Approved" ? new Date().toISOString() : null,
      };

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/loan-applications/${id}`,
        updateData,
      );

      toast.success(`Application ${newStatus} successfully!`);
      setPendingLoans((prev) => prev.filter((loan) => loan._id !== id));
      // Close modal if it was open for this loan
      setSelectedLoan(null);
    } catch (error) {
      toast.error(error.response?.data?.error || "Update failed");
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
                    {/* 2. Added onClick to open Modal */}
                    <button
                      onClick={() => setSelectedLoan(app)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                      title="View"
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

      {/* 3. The Details Modal */}
      {selectedLoan && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl bg-white">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="font-bold text-xl text-gray-800">
                Application Details
              </h3>
              <button
                onClick={() => setSelectedLoan(null)}
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 py-6">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase">
                  Full Name
                </p>
                <p className="text-gray-700 font-medium">
                  {selectedLoan.firstName} {selectedLoan.lastName}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase">
                  Email Address
                </p>
                <p className="text-gray-700 font-medium">
                  {selectedLoan.userEmail}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase">
                  Requested Amount
                </p>
                <p className="text-blue-600 font-bold text-lg">
                  ${selectedLoan.loanAmount}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase">
                  Application Date
                </p>
                <p className="text-gray-700 font-medium">
                  {new Date(selectedLoan.application_date).toLocaleString()}
                </p>
              </div>
              <div className="col-span-2 bg-gray-50 p-3 rounded-lg">
                <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                  Reason for Loan
                </p>
                <p className="text-gray-600 italic">
                  "{selectedLoan.reason || "No reason provided"}"
                </p>
              </div>
            </div>

            <div className="modal-action">
              <button
                onClick={() => handleStatusUpdate(selectedLoan._id, "Rejected")}
                className="btn btn-error btn-outline"
              >
                Reject
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedLoan._id, "Approved")}
                className="btn btn-success text-white"
              >
                Approve Now
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setSelectedLoan(null)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default PendingApplications;
