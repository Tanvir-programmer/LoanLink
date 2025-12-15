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
      // Assuming your API handles status filtering or you filter on client side
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/loan-applications`
      );
      const pending = res.data.filter((loan) => loan.status === "Pending");
      setPendingLoans(pending);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch pending applications");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const updateData = {
        status: newStatus,
        approvedAt: newStatus === "Approved" ? new Date() : null,
      };

      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/loan-applications/${id}`,
        updateData
      );

      if (res.status === 200) {
        toast.success(`Application ${newStatus} successfully!`);
        // Remove from current list locally
        setPendingLoans(pendingLoans.filter((loan) => loan._id !== id));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  if (loading)
    return <div className="text-center py-10">Loading Applications...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Pending Loan Applications
        </h2>
        <p className="text-gray-500 text-sm">
          Review and manage incoming loan requests.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Loan ID</th>
              <th className="py-3 px-6 text-left">Borrower Info</th>
              <th className="py-3 px-6 text-center">Amount</th>
              <th className="py-3 px-6 text-center">Date Applied</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {pendingLoans.length > 0 ? (
              pendingLoans.map((application) => (
                <tr
                  key={application._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                    #{application._id.slice(-6)}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-700">
                        {application.firstName} {application.lastName}
                      </span>
                      <span className="text-xs text-gray-400">
                        {application.userEmail}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-bold">
                      ${application.loanAmount}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center space-x-3">
                      {/* View Button */}
                      <button
                        title="View Details"
                        className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition"
                      >
                        <FaEye size={16} />
                      </button>

                      {/* Approve Button */}
                      <button
                        onClick={() =>
                          handleStatusUpdate(application._id, "Approved")
                        }
                        title="Approve"
                        className="p-2 text-green-500 hover:bg-green-100 rounded-full transition"
                      >
                        <FaCheck size={16} />
                      </button>

                      {/* Reject Button */}
                      <button
                        onClick={() =>
                          handleStatusUpdate(application._id, "Rejected")
                        }
                        title="Reject"
                        className="p-2 text-red-500 hover:bg-red-100 rounded-full transition"
                      >
                        <FaTimes size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-gray-400">
                  No pending applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingApplications;
