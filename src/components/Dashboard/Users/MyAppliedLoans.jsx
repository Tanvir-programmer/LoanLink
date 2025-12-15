import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaTrashAlt, FaCreditCard, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router"; // Use react-router-dom for navigation
import { AuthContext } from "../../../context/AuthContext"; // Ensure correct path
import { useContext } from "react";

const MyAppliedLoans = () => {
  // Use useContext directly to ensure stability
  const authInfo = useContext(AuthContext);
  const user = authInfo?.user;
  const loadingAuth = authInfo?.loading;

  const [myLoans, setMyLoans] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchMyLoans();
    } else if (!loadingAuth && !user) {
      setLoadingData(false);
    }
  }, [user, loadingAuth]);

  const fetchMyLoans = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/loan-applications/user/${user.email}`
      );
      setMyLoans(res.data);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to fetch your loan applications");
    } finally {
      setLoadingData(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this application?"))
      return;

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/loan-applications/${id}`
      );
      if (res.status === 200) {
        toast.success("Application cancelled successfully");
        setMyLoans(myLoans.filter((loan) => loan._id !== id));
      }
    } catch (error) {
      toast.error("Could not cancel application");
    }
  };

  // Loading state for either Auth or Data fetching
  if (loadingAuth || loadingData) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        Access Denied. Please login to see your applications.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen rounded-2xl shadow-sm">
      <div className="mb-8 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">
          My Loan Applications
        </h2>
        <p className="text-gray-500">
          Track and manage your microloan requests.
        </p>
      </div>

      <div className="overflow-x-auto border border-gray-100 rounded-xl">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
              <th className="py-4 px-6">Loan ID</th>
              <th>Loan Details</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Status</th>
              <th className="text-center">Fee Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {myLoans.length > 0 ? (
              myLoans.map((loan) => (
                <tr
                  key={loan._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 font-mono text-xs text-indigo-600">
                    #{loan._id.slice(-8).toUpperCase()}
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800">
                        {loan.loanTitle}
                      </span>
                      <span className="text-xs text-gray-400 capitalize">
                        {loan.category}
                      </span>
                    </div>
                  </td>
                  <td className="text-center font-bold text-gray-700">
                    ${loan.loanAmount?.toLocaleString()}
                  </td>
                  <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        loan.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : loan.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td className="text-center">
                    {loan.paymentStatus === "Paid" ? (
                      <div className="flex items-center justify-center gap-1 text-green-600 font-bold text-xs">
                        <FaCheckCircle />{" "}
                        <span className="cursor-pointer hover:underline">
                          Paid
                        </span>
                      </div>
                    ) : (
                      <span className="text-red-500 font-bold text-xs uppercase">
                        Unpaid
                      </span>
                    )}
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      {/* View Button */}
                      <button
                        className="btn btn-sm btn-ghost text-blue-500"
                        title="View Details"
                      >
                        <FaEye size={16} />
                      </button>

                      {/* Pay Button - Only if Unpaid */}
                      {loan.paymentStatus !== "Paid" && (
                        <Link
                          to={`/dashboard/payment/${loan._id}`}
                          className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white border-none text-[10px]"
                        >
                          <FaCreditCard className="mr-1" /> PAY $10
                        </Link>
                      )}

                      {/* Cancel Button - Requirement: Only if Pending */}
                      {loan.status === "Pending" && (
                        <button
                          onClick={() => handleCancel(loan._id)}
                          className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50"
                          title="Cancel Application"
                        >
                          <FaTrashAlt size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-20 text-gray-400 font-medium"
                >
                  You have no active loan applications.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppliedLoans;
