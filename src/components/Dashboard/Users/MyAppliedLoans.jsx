import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaTrashAlt, FaCreditCard, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../../context/AuthContext";

const MyAppliedLoans = () => {
  const { user, loading } = useContext(AuthContext);

  const [myLoans, setMyLoans] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchMyLoans();
    } else if (!loading) {
      setLoadingData(false);
    }
  }, [user, loading]);

  const fetchMyLoans = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/loan-applications/user/${user.email}`
      );
      setMyLoans(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch loan applications");
    } finally {
      setLoadingData(false);
    }
  };

  const handleCancel = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this loan application?"
    );
    if (!confirm) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/loan-applications/${id}`
      );

      toast.success("Application cancelled");
      setMyLoans((prev) => prev.filter((loan) => loan._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel application");
    }
  };

  if (loading || loadingData) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-indigo-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        Please login to view your loan applications.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen rounded-2xl shadow-sm">
      <div className="mb-8 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">
          My Loan Applications
        </h2>
        <p className="text-gray-500">Track and manage your loan requests</p>
      </div>

      <div className="overflow-x-auto border rounded-xl">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-50 text-xs uppercase text-gray-600">
              <th className="px-6 py-4">Loan ID</th>
              <th>Details</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Status</th>
              <th className="text-center">Fee</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {myLoans.length > 0 ? (
              myLoans.map((loan) => (
                <tr key={loan._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-xs font-mono text-indigo-600">
                    #{loan._id.slice(-8).toUpperCase()}
                  </td>

                  <td>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">
                        {loan.loanTitle}
                      </span>
                      <span className="text-xs text-gray-400 capitalize">
                        {loan.category}
                      </span>
                    </div>
                  </td>

                  <td className="text-center font-bold">
                    ${loan.loanAmount?.toLocaleString()}
                  </td>

                  <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        loan.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : loan.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>

                  <td className="text-center">
                    {loan.applicationFeeStatus === "paid" ? (
                      <span className="flex items-center justify-center gap-1 text-green-600 text-xs font-bold">
                        <FaCheckCircle /> Paid
                      </span>
                    ) : (
                      <span className="text-red-500 text-xs font-bold uppercase">
                        Unpaid
                      </span>
                    )}
                  </td>

                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <button className="btn btn-sm btn-ghost text-blue-500">
                        <FaEye />
                      </button>

                      {loan.applicationFeeStatus !== "paid" && (
                        <Link
                          to={`/dashboard/payment/${loan._id}`}
                          className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white text-[10px]"
                        >
                          <FaCreditCard className="mr-1" /> PAY $10
                        </Link>
                      )}

                      {loan.status === "pending" && (
                        <button
                          onClick={() => handleCancel(loan._id)}
                          className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50"
                        >
                          <FaTrashAlt />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-20 text-center text-gray-400">
                  No loan applications found
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
