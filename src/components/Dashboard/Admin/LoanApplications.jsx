import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaFilter } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Payment/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const LoanApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [viewingLoan, setViewingLoan] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/loan-applications`);
      setApplications(res.data);
      setFilteredApps(res.data);
    } catch {
      toast.error("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    if (status === "all") {
      setFilteredApps(applications);
    } else {
      setFilteredApps(
        applications.filter(
          (app) => app.status?.toLowerCase() === status.toLowerCase()
        )
      );
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Loan Applications
          </h2>
          <p className="text-gray-500 text-sm">Review borrower submissions</p>
        </div>

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

      <div className="overflow-x-auto border border-gray-100 rounded-xl">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
              <th className="py-4 px-6">Loan ID</th>
              <th>User</th>
              <th className="text-center">Status</th>
              <th className="text-center">Payment</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredApps.map((app) => (
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
                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      app.status?.toLowerCase() === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : app.status?.toLowerCase() === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="text-center">
                  {app.paymentStatus === "paid" ? (
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200">
                      PAID
                    </span>
                  ) : (
                    <button
                      onClick={() => setSelectedLoan(app)}
                      className="btn btn-xs btn-primary text-white"
                    >
                      Pay Fee
                    </button>
                  )}
                </td>
                <td className="text-center">
                  <button
                    onClick={() => setViewingLoan(app)}
                    className="btn btn-sm btn-circle btn-ghost text-indigo-500"
                  >
                    <FaEye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      {viewingLoan && (
        <div className="modal modal-open">
          <div className="modal-box bg-white">
            <h3 className="font-bold text-xl mb-4 border-b pb-2">
              Application Info
            </h3>
            <div className="space-y-3">
              <p>
                <strong>Name:</strong> {viewingLoan.firstName}{" "}
                {viewingLoan.lastName}
              </p>
              <p>
                <strong>Email:</strong> {viewingLoan.userEmail}
              </p>
              <p>
                <strong>Loan:</strong> {viewingLoan.loanTitle}
              </p>
              <p>
                <strong>Amount:</strong> ${viewingLoan.loanAmount}
              </p>
            </div>
            <div className="modal-action">
              <button
                onClick={() => setViewingLoan(null)}
                className="btn btn-sm btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT MODAL */}
      {selectedLoan && (
        <div className="modal modal-open">
          <div className="modal-box bg-white max-w-md relative">
            <button
              onClick={() => setSelectedLoan(null)}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg mb-4 text-center">
              Application Fee
            </h3>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                loan={selectedLoan}
                onPaymentSuccess={() => {
                  setSelectedLoan(null);
                  fetchApplications();
                }}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanApplications;
